import powerbi from "powerbi-visuals-api";
import { interactivitySelectionService } from "powerbi-visuals-utils-interactivityutils";
import { Selection, BaseType } from 'd3-selection';
import { BaseDataPoint, IBehaviorOptions } from "powerbi-visuals-utils-interactivityutils/lib/interactivityBaseService";

export interface BinObject extends d3.Bin<number, number>  {
    datapoints: VisualDataPoint[];
    selected: boolean;
}
export interface VerticalLinesData extends BaseDataPoint {
    value: number;
    type: string;
}

export interface PreparedData {
    // category: powerbi.DataViewCategoryColumn;
    datapoints: VisualDataPoint[];
    data: number[];
}
export interface Stats {
    median: number | null;
    mean: number | null;
    deviation: number | null;
    variance: number | null;
}
export interface VisualDataPoint extends interactivitySelectionService.SelectableDataPoint {
    value: number;
}

export interface HistogramBehaviorOptions<SelectableDataPointType extends BaseDataPoint> extends IBehaviorOptions<SelectableDataPointType>{
    elementsSelection: Selection<any, SelectableDataPointType, any, any>;
    bars: Selection<BaseType, BinObject, BaseType, BinObject>;
    clearCatcherSelection: d3.Selection<any, any, any, any>;
    verticalLines: Selection<BaseType, VerticalLinesData, BaseType, BinObject>;
}
export interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}