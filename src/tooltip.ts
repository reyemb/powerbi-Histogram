import { BinObject } from './interfaces';
import {createTooltipServiceWrapper, ITooltipServiceWrapper} from "powerbi-visuals-utils-tooltiputils";
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import powerbi from "powerbi-visuals-api";

export function addTooltip(bars: any, host: IVisualHost, localizationManager: powerbi.extensibility.ILocalizationManager, formatterFloat: (n: number) => string, formatterInt: (n: number) => string  ) {
    const tooltipServiceWrapper: ITooltipServiceWrapper = createTooltipServiceWrapper(host.tooltipService, bars);
    tooltipServiceWrapper.addTooltip(
        bars,
        (tooltipEvent: BinObject) => getTooltipData(Number(tooltipEvent.x0), Number(tooltipEvent.x1), Number(tooltipEvent.datapoints.length), localizationManager, formatterFloat, formatterInt),
    );
}

function getTooltipData(x0: number, x1:number, length:number, localizationManager: powerbi.extensibility.ILocalizationManager, formatterFloat: (n: number) => string, formatterInt: (n: number) => string): powerbi.extensibility.VisualTooltipDataItem[] {
    const range = `${formatterFloat(x0)} - ${formatterFloat(x1)}`;
    const count = formatterInt(length);
    return [{
        displayName: localizationManager.getDisplayName('Range'),
        value: range,
    }, {
        displayName: localizationManager.getDisplayName('Count'),
        value: count
    }];
}
