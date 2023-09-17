import powerbi from "powerbi-visuals-api";
import ISelectionId = powerbi.visuals.ISelectionId;
import { VisualDataPoint, PreparedData } from './interfaces';

function generateSelectionId(data: any, host:any, rowIndex: number): ISelectionId {
    return host.createSelectionIdBuilder().withTable(data.table, rowIndex)
    .createSelectionId();
}

export function prepareData(options: powerbi.extensibility.visual.VisualUpdateOptions, host: powerbi.extensibility.visual.IVisualHost): PreparedData {
    const valueFieldIndex = options.dataViews[0].table.columns.findIndex((column) => column.roles['Values']);
    let data: number[] = [];
    const rows = options.dataViews[0].table.rows;
    let datapoints: VisualDataPoint[] = [];
    for (let row of rows) {
        const value = row[valueFieldIndex] as number;
        data.push(value);  // push the value into the data array
        const selectionId: ISelectionId = generateSelectionId(options.dataViews[0], host, rows.indexOf(row));
        datapoints.push({
            value: value,
            identity: selectionId,
            selected: false
        });
    }
    return {
        data,
        datapoints
    };
}

