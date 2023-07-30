import powerbi from "powerbi-visuals-api";
import ISelectionId = powerbi.visuals.ISelectionId;
import { VisualDataPoint, PreparedData } from './interfaces';

export function prepareData(options: powerbi.extensibility.visual.VisualUpdateOptions, host: powerbi.extensibility.visual.IVisualHost): PreparedData {
    const category = options.dataViews[0].categorical.categories[0]
    const data: number[] = category.values as number[];

    let datapoints: VisualDataPoint[] = [];
    for (let i = 0; i < data.length; i++) {
        const selectionId: ISelectionId = host.createSelectionIdBuilder()
            .withCategory(category, i)
            .createSelectionId();
        datapoints.push({
            value: data[i],
            identity: selectionId,
            selected: false
        });
    }
    return {
        data,
        datapoints
    };
}
