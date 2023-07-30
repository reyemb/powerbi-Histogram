import { ISelectionHandler } from "powerbi-visuals-utils-interactivityutils/lib/interactivityBaseService";
import { baseBehavior } from "powerbi-visuals-utils-interactivityutils";
import { VisualDataPoint } from "./interfaces";
import { HistogramBehaviorOptions } from "./interfaces";

export class HistogramBehavior extends baseBehavior.BaseBehavior<VisualDataPoint> {
  protected options: HistogramBehaviorOptions<VisualDataPoint>;
  protected selectionHandler: ISelectionHandler;
  protected bindClick() {
    const { bars, elementsSelection } = this.options;

    bars.on("click", (event, data) => {
      const mouseEvent: MouseEvent = event as MouseEvent;
      const statusSelected = !data.selected;
      if (mouseEvent) {
        if (!event.ctrlKey) {
          elementsSelection.each(function (d) {
            d.selected = false;
          });
        }
        data.selected = statusSelected;
        const datapoints = data.datapoints;
        const isCtrlPressed: boolean = (<MouseEvent>event).ctrlKey;
        this.selectionHandler.handleSelection(datapoints, isCtrlPressed);
      }
      event.stopPropagation();
    });
  }
  protected bindContextMenu() {
    const { elementsSelection } = this.options;
    elementsSelection.on("contextmenu", (event, data: VisualDataPoint) => {
      const mouseEvent: MouseEvent = event as MouseEvent;
      if (event) {
        this.selectionHandler.handleContextMenu(data, {
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
        });
        event.preventDefault();
      }
    });
  }
  protected bindClearCatcher() {
    const { clearCatcherSelection } = this.options;
    clearCatcherSelection.on("click", (event) => {
      const mouseEvent: MouseEvent = event as MouseEvent;
      if (mouseEvent) {
        this.selectionHandler.handleClearSelection();
      }
    });
  }

  public bindEvents(options: HistogramBehaviorOptions<VisualDataPoint>, selectionHandler: ISelectionHandler): void {
    this.options = options;
    this.selectionHandler = selectionHandler;
    this.bindClearCatcher();
    this.bindClick();
    this.bindContextMenu();
  }

  public renderSelection(hasSelection: boolean): void {
    this.options.elementsSelection.style("opacity", (category: any) => {
      if (!hasSelection) {
        return 1;
      } else if (category.datapoints.some((d) => d.selected)) {
        return 1;
      } else {
        return 0.5;
      }
    });
  }
}
