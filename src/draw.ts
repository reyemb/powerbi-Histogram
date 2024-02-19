import * as d3 from 'd3';
import powerbi from "powerbi-visuals-api";
import {VisualDataPoint} from './interfaces';
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import {VisualFormattingSettingsModel} from "./settings";

export class DrawHistogram {
    svg: any;
    bars: any;
    target: HTMLElement;
    width: any;
    private margin: any;    
    private height: any;
    private formattingSettings: VisualFormattingSettingsModel;
    private formatterFloat: (n: number) => string;
    private formatterInt: (n: number) => string;
    private x: any;
    private y: any;
    private bins: any
    private binObjects: any

    constructor(target: HTMLElement) {
        this.target = target;
    }

    init(options: VisualUpdateOptions, formattingSettings, formatterFloat: (n: number) => string, formatterInt: (n: number) => string): void {
        this.formatterFloat = formatterFloat;
        this.formatterInt = formatterInt;
        this.formattingSettings = formattingSettings;
        const viewportWidth = options.viewport.width;
        const viewportHeight = options.viewport.height;
        this.margin = {
            top: this.formattingSettings.marginSettings.topMargin.value,
            right: this.formattingSettings.marginSettings.rightMargin.value,
            bottom: this.formattingSettings.marginSettings.bottomMargin.value,
            left: this.formattingSettings.marginSettings.leftMargin.value
        };
        this.width = viewportWidth - this.margin.left - this.margin.right;
        this.height = viewportHeight - this.margin.top - this.margin.bottom;

        this.svg = d3.select(this.target)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    }

    createAxes(data: any): void {   
        console.log(data)
        console.log(findNestedMin(data))
        console.log(findNestedMax(data))
        this.x = d3.scaleLinear()
            .domain([findNestedMin(data), findNestedMax(data)])
            .range([0, this.width]);
        this.svg.append("g")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.x).tickFormat(d => this.formatterFloat(Number(d))))
            .style("font-size", `${this.formattingSettings.generalSettings.fontSize.value}px`);            
    }

    createHistogram(datapoints: VisualDataPoint[], threshold, binColor): void {
        const histogram = d3.histogram<number, number>()
            .value(function (d) { return d; })
            .thresholds(this.x.ticks(threshold));
    
        this.bins = histogram(datapoints.map(d => Number(d.value)));

        this.y = d3.scaleLinear()
        .range([this.height, 0]);
        this.y.domain([0, d3.max(this.bins, function (d: { length: number }) { return d.length; })]);
    
        this.svg.append("g")
        .call(g => g
            .call(d3.axisLeft(this.y).tickFormat(d => this.formatterInt(Number(d))))
        ).style("font-size", `${this.formattingSettings.generalSettings.fontSize.value}px`);
        
        this.binObjects = this.bins.map(bin => {
            const datapointsInBin = datapoints.filter(d => d.value >= bin.x0 && d.value < bin.x1);
            return {
                ...bin,
                datapoints: datapointsInBin,
                selected: false
            };
        });

        this.bars = this.svg.selectAll("rect")
            .data(this.binObjects)
            .join("rect")
            .attr("x", 1)
            .attr("transform", (d) => `translate(${this.x(d.x0)}, ${this.y(d.datapoints.length)})`)
            .attr("width", (d) => `${this.x(d.x1) - this.x(d.x0) - 1}`)
            .attr("height", (d) => `${this.height - this.y(d.datapoints.length)}`)
            .style("fill", binColor);        
    }
    drawVerticalLines(verticalFieldIndexes: number[], data, columns, jsoncolor, useColorJson): void {
        for (let index of verticalFieldIndexes) {
          const value = data[0][index];
          let color;
          
          if (useColorJson) {
            // Only parse JSON if needed
            const colorjson = JSON.parse(jsoncolor); 
            color = colorjson[columns[index].displayName] ? colorjson[columns[index].displayName] : "red";

          } else {
            color = "red";
          }
      
          const lineWidth = "4px"; 
      
          // Consider adding validation for value and color here if needed
      
          this.drawLine(value, color, lineWidth); 
        }
      }
    
    /**
     * Draws a vertical line on the SVG.
     * @param {number} value - The x-axis value where the line should be drawn.
     * @param {string} color - The color of the line.
     * @param {string} lineWidth - The width of the line.
     */
    drawLine(value: number, color: string, lineWidth: string): void {
        const data = [{ value: value, type: "smallerEQ" }];
        this.svg.append("line")
        .data(data)  
        .attr("class", "vertical-line")
        .attr("x1", d => this.x(d.value))
        .attr("x2", d => this.x(d.value))
        .attr("y1", 0)
        .attr("y2", this.height)
        .style("stroke", color)
        .style("stroke-width", lineWidth)
        .style("stroke-dasharray", "5,5")
        .raise();
    }
    }  
    function findNestedMin(data, maxValue = Number.MAX_SAFE_INTEGER) {
        let min = Infinity;
        for (const item of data) {
            if (Array.isArray(item)) {
                min = Math.min(min, findNestedMin(item, maxValue));
            } else if (item < maxValue) { 
                min = Math.min(min, item);
            }
        }
        return min;
    }
    
    function findNestedMax(data, minValue = Number.MIN_SAFE_INTEGER) {
        let max = -Infinity; 
        for (const item of data) {
            if (Array.isArray(item)) {
                max = Math.max(max, findNestedMax(item, minValue));
            } else if (item > minValue) { 
                max = Math.max(max, item);
            }
        }
        return max;
    }
    

