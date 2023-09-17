"use strict";

import powerbi from "powerbi-visuals-api";

// custom imports
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel-community";
import { PreparedData, VisualDataPoint } from './interfaces';
import { DrawHistogram } from './draw';
import { prepareData } from './dataPreparation';
import { addTooltip } from './tooltip';
import { getLocaleFormat } from './locales';
import { drawStatLines, calculateStats, addLegend } from './statistics';
import "./../style/visual.less";
import { VisualFormattingSettingsModel } from "./settings";
import { HistogramBehavior } from "./behavior";

// d3.js
import * as d3 from 'd3';

// powerbi.extensibility.visual
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

// powerbi-visuals-utils-interactivityutils
import { interactivitySelectionService, interactivityBaseService} from "powerbi-visuals-utils-interactivityutils";
import IInteractiveBehavior = interactivityBaseService.IInteractiveBehavior;
import IInteractivityService = interactivityBaseService.IInteractivityService;
import createInteractivitySelectionService = interactivitySelectionService.createInteractivitySelectionService;
import { BaseDataPoint } from "powerbi-visuals-utils-interactivityutils/lib/interactivityBaseService";

import { BaseBehaviorOptions } from "powerbi-visuals-utils-interactivityutils/lib/baseBehavior";

export class Visual implements IVisual {
    private drawHistogram: DrawHistogram;
    target: HTMLElement;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private behavior: IInteractiveBehavior;
    private host: IVisualHost;
    private root: any;
    private formatterFloat: (n: number) => string;
    private formatterInt: (n: number) => string;
    private interactivityService: IInteractivityService<BaseDataPoint> | any;
    private localizationManager: powerbi.extensibility.ILocalizationManager;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.localizationManager = options.host.createLocalizationManager();
        this.formattingSettingsService = new FormattingSettingsService(this.localizationManager);
        this.target = options.element;
        this.host = options.host;
        this.behavior = new HistogramBehavior();
        this.interactivityService = createInteractivitySelectionService(this.host);
        if (document) {
            this.init()
        
            this.drawHistogram = new DrawHistogram(this.target);
        }
    }


    public update(options: powerbi.extensibility.visual.VisualUpdateOptions): void {
        this.reset();
        console.log('Visual update', options);
        // Get the settings from the DataView
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
            VisualFormattingSettingsModel,
            options.dataViews[0]
        );   
        this.formatterFloat = getLocaleFormat(this.formattingSettings.generalSettings.numberOfDecimalPlaces.value);
        this.formatterInt = getLocaleFormat(0);

        // Prepare the data
        const preparedData: PreparedData = prepareData(options, this.host);
        const { data, datapoints } = preparedData;

        this.drawHistogram.init(options, this.formattingSettings, this.formatterFloat, this.formatterInt);            
        this.drawHistogram.createAxes(data);
        
        

        const binColor = this.formattingSettings.binSettings.binColour.value.value;
        // if usebinsize is true, use the binsize, else use the number of bins
        if (this.formattingSettings.binSettings.useBinSize.value) {
            // calculate the number of bins
            const numberOfBins = Math.ceil((d3.max(data) - d3.min(data)) / this.formattingSettings.binSettings.binSize.value);
            this.drawHistogram.createHistogram(datapoints, numberOfBins, binColor);
        } else {
            this.drawHistogram.createHistogram(datapoints, this.formattingSettings.binSettings.binCount.value, binColor);
        }

        const stats = calculateStats(data);     
        const verticalFieldIndexes = options.dataViews[0].table.columns.map((column, index) => column.roles['VerticalLines'] ? index : -1).filter(index => index !== -1);
        this.drawHistogram.drawVerticalLines(verticalFieldIndexes, options.dataViews[0].table.rows);

        addLegend(stats, this.formattingSettings.statsSettings, this.drawHistogram.width, this.formatterFloat, this.drawHistogram.svg);
        drawStatLines(stats, this.formattingSettings.statsSettings, this.drawHistogram);    
        addTooltip(this.drawHistogram.bars, this.host, this.localizationManager, this.formatterFloat, this.formatterInt);

        this.interactivityService.bind(<BaseBehaviorOptions<VisualDataPoint>>{
                behavior: this.behavior,
                dataPoints: datapoints,
                clearCatcherSelection: this.root,
                target: this.drawHistogram.target,
                elementsSelection: this.drawHistogram.bars,
                bars: this.drawHistogram.bars,
                interactivityService: this.interactivityService,
                verticalLines: this.drawHistogram.svg.selectAll(".vertical-line")
            });

        this.interactivityService.applySelectionStateToData(datapoints);
        this.applySelectionAfterResizing();
    }

    public applySelectionAfterResizing() {
        this.drawHistogram.bars.style("opacity", (category: any) => {
            if (!this.interactivityService.hasSelection()) {
              return 1;
            } else if (category.datapoints.some((d) => d.selected)) {
              return 1;
            } else {
              return 0.5;
            }
          });
    }

    public init() {
        const div: HTMLElement = document.createElement("div");
        div.id = "histogram"
        document.body.appendChild(div);         
        const margin = {top: 10, right: 30, bottom: 30, left: 40}    
        this.root = d3.select("#histogram")
            .append("svg")
                .attr("width", 400 + margin.left + margin.right)
                .attr("height", 400 + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);    
    }

    public reset(){
        while (this.target.firstChild) {
            this.target.removeChild(this.target.firstChild);
        }
        const div: HTMLElement = document.createElement("div");
        div.id = "my_histogram";
        this.target.appendChild(div); 
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}