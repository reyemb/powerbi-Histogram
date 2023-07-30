import * as d3 from 'd3';
import { Stats } from './interfaces';

export function calculateStats(data: number[]): any {
    const mean = d3.mean(data);
    const median = d3.median(data);
    const deviation = d3.deviation(data);
    const variance = d3.variance(data);

    // Create the stats object
    const stats: Stats = {
        median: median,
        mean: mean,
        deviation: deviation,
        variance: variance
    };
    return stats
}
export function drawStatLines(stats: Stats, settings, drawHistogram){
    let statsSettings = [
        {
            setting: settings.drawMedianSettings.drawMedian.value,
            value: stats.median,
            name: "median",
            color: settings.drawMedianSettings.medianColor.value.value,
            fontSize: settings.drawMedianSettings.medianLineWidth.value,
        },
        {
            setting: settings.drawMeanSettings.drawMean.value,
            value: stats.mean,
            name: "mean",
            color: settings.drawMeanSettings.meanColor.value.value,
            fontSize: settings.drawMeanSettings.meanLineWidth.value,
        },
        {
            setting: settings.drawStdSettings.drawStd.value,
            value: stats.deviation,
            name: "std",
            color: settings.drawStdSettings.stdColor.value.value,
            fontSize: settings.drawStdSettings.stdLineWidth.value,
        },
        {
            setting: settings.drawVarianceSettings.drawVariance.value,
            value: stats.variance,
            name: "variance",
            color: settings.drawVarianceSettings.varianceColor.value.value,
            fontSize: settings.drawVarianceSettings.varianceLineWidth.value,
        }
    ];
    
    for (let statSetting of statsSettings) {
        if (statSetting.setting && statSetting.value !== null) {  // Correction here
            
            if (statSetting.name === "std" || statSetting.name === "variance") {
                drawHistogram.drawLine(stats.mean- statSetting.value, statSetting.color, `${statSetting.fontSize}px`);
                drawHistogram.drawLine(stats.mean + statSetting.value, statSetting.color, `${statSetting.fontSize}px`);
            } else {
                drawHistogram.drawLine(statSetting.value, statSetting.color, `${statSetting.fontSize}px`);
            }
        }
    }
}

export function addLegend(stats: {[key: string]: number}, statsSettings, width: number, formatter, svg): void {

        // iterate over the stats object and create a new object with only the stats that should be shown
        const stats_vis: Stats = {

            median: statsSettings.showMedianSettings.showMedian.value ? (stats.median !== undefined ? stats.median : null) : null,
            mean: statsSettings.showMeanSettings.showMean.value ? (stats.mean !== undefined ? stats.mean : null) : null,
            deviation: statsSettings.showStdSettings.showStd.value ? (stats.deviation !== undefined ? stats.deviation : null) : null,
            variance: statsSettings.showVarianceSettings.showVariance.value ? (stats.variance !== undefined ? stats.variance : null) : null
        }

        // Filter null values and calculate the length of the longest key and value
        const longestKeyLength = Math.max(...Object.entries(stats_vis)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => key.length)
        );
        const longestValueLength = Math.max(...Object.entries(stats_vis)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => formatter(value).length)
        );
        // Create the legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width}, 0)`);

        let yPos = 0;
        Object.entries(stats_vis).forEach(([key, value]) => {
            if (value !== null) {
                const extraSpaces = "\u00A0".repeat(longestValueLength - value.length);
                legend.append("text")
                    .attr("y", yPos * 20)
                    .attr("text-anchor", "end")
                    .style("font-size", "12px")
                    .style("font-family", "monospace")
                    .text(`${key.padEnd(longestKeyLength)} : ${extraSpaces}${formatter(value)}`);
                yPos++;
            }
        });
    }
    