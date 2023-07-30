/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { formattingSettings } from "./utils/formattingmodels/index";

import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsGroup = formattingSettings.Group;
import { SimpleCard } from "./utils/formattingmodels/FormattingSettingsComponents";

/**
 * Histogram Visual Settings
 */

export class GeneralSettings extends formattingSettings.SimpleCard {
    public fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayNameKey: "FontSizeKey",
        descriptionKey: "FontSizeDescriptionKey",
        value: 12,
    });
    public fontColor = new formattingSettings.ColorPicker({
        name: "fontColor",
        displayNameKey: "TextColorKey",
        descriptionKey: "TextColorDescriptionKey",
        value:  { value: "#000000" }
    });
    public numberOfDecimalPlaces = new formattingSettings.NumUpDown({
        name: "numberOfDecimalPlaces",
        displayNameKey: "NumberOfDecimalPlacesKey",
        descriptionKey: "NumberOfDecimalPlacesDescriptionKey",
        value: 2,
    });
    name: string = "general";
    displayNameKey: string = "GeneralKey";
    descriptionKey: string = "GeneralDescriptionKey";
    slices: Array<FormattingSettingsSlice> = [this.fontSize, this.fontColor, this.numberOfDecimalPlaces];
}

/**
 * Bin Settings
 */

export class BinSettings extends formattingSettings.SimpleCard {
    public binCount = new formattingSettings.NumUpDown({
        name: "binCount",
        displayNameKey: "BinCountKey",
        descriptionKey: "BinCountDescriptionKey",
        value: 20,
    });
    public useBinSize = new formattingSettings.ToggleSwitch({
        name: "useBinSize",
        displayNameKey: "UseBinSizeKey",
        descriptionKey: "UseBinSizeDescriptionKey",
        value: false,
    });
    public binSize = new formattingSettings.NumUpDown({
        name: "binSize",
        displayNameKey: "BinSizeKey",
        descriptionKey: "BinSizeDescriptionKey",
        value: 5,
    });
    public binColour = new formattingSettings.ColorPicker({
        name: "binColour",
        displayNameKey: "BinColourKey",
        descriptionKey: "BinColourDescriptionKey",
        value:  { value: "#69b3a2" }
    });
    name: string = "bins";
    displayNameKey: string = "BinsKey";
    descriptionKey: string = "BinsDescriptionKey";
    analyticsPane: boolean = false;
    slices: Array<formattingSettings.Slice> = [
        this.binCount, 
        this.useBinSize,
        this.binSize,
        this.binColour
    ];
}

/**
 * Histocram Analysis Settings
 */

export class ShowMedianSettings extends FormattingSettingsGroup {
    public showMedian = new formattingSettings.ToggleSwitch({
        name: "showMedian",
        displayNameKey: "ShowMedianKey",
        descriptionKey: "ShowMedianDescriptionKey",
        value: false,
    });
    topLevelSlice = this.showMedian;
    analyticsPane: boolean = true;
    name: string = "ShowMedian";
    displayNameKey: string = "ShowMedianKey";
    descriptionKey: string = "ShowMedianDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.showMedian];
}

export class DrawMedianSettings extends FormattingSettingsGroup {
    public drawMedian = new formattingSettings.ToggleSwitch({
        name: "drawMedian",
        displayNameKey: "DrawMedianKey",
        descriptionKey: "DrawMedianDescriptionKey",
        value: false,
    });
    public medianColor = new formattingSettings.ColorPicker({
        name: "medianColor",
        displayNameKey: "MedianColorKey",
        descriptionKey: "MedianColorDescriptionKey",
        value:  { value: "#0000FF" }
    });
    public medianLineWidth = new formattingSettings.NumUpDown({
        name: "medianLineWidth",
        displayNameKey: "MedianLineWidthKey",
        descriptionKey: "MedianLineWidthDescriptionKey",
        value: 1,
    });
    topLevelSlice = this.drawMedian;
    name: string = "DrawMedian";
    displayNameKey: string = "DrawMedianKey";
    descriptionKey: string = "DrawMedianDescriptionKey";
    analyticsPane: boolean = true;
    slices: Array<formattingSettings.Slice> = [this.drawMedian, this.medianColor, this.medianLineWidth];
} 

export class ShowMeanSettings extends FormattingSettingsGroup {
    public showMean = new formattingSettings.ToggleSwitch({
        name: "showMean",
        displayNameKey: "ShowMeanKey",
        descriptionKey: "ShowMeanDescriptionKey",
        value: false,
    });
    topLevelSlice = this.showMean;
    name: string = "ShowMean";
    displayNameKey: string = "ShowMeanKey";
    descriptionKey: string = "ShowMeanDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.showMean];
}

export class DrawMeanSettings extends FormattingSettingsGroup {
    public drawMean = new formattingSettings.ToggleSwitch({
        name: "drawMean",
        displayNameKey: "DrawMeanKey",
        descriptionKey: "DrawMeanDescriptionKey",
        value: false,
    });
    public meanColor = new formattingSettings.ColorPicker({
        name: "meanColor",
        displayNameKey: "MeanColorKey",
        descriptionKey: "MeanColorDescriptionKey",
        value:  { value: "#FFA500" } // orange
    });
    public meanLineWidth = new formattingSettings.NumUpDown({
        name: "meanLineWidth",
        displayNameKey: "MeanLineWidthKey",
        descriptionKey: "MeanLineWidthDescriptionKey",
        value: 1,
    });
    topLevelSlice = this.drawMean;
    name: string = "DrawMean";
    displayNameKey: string = "DrawMeanKey";
    descriptionKey: string = "DrawMeanDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.drawMean, this.meanColor, this.meanLineWidth];
}

export class ShowStdSettings extends FormattingSettingsGroup {
    public showStd = new formattingSettings.ToggleSwitch({
        name: "showStd",
        displayNameKey: "ShowStdKey",
        descriptionKey: "ShowStdDescriptionKey",
        value: false,
    });
    topLevelSlice = this.showStd;
    name: string = "ShowStd";
    displayNameKey: string = "ShowStdKey";
    descriptionKey: string = "ShowStdDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.showStd];
}

export class DrawStdSettings extends FormattingSettingsGroup {
    public drawStd = new formattingSettings.ToggleSwitch({
        name: "drawStd",
        displayNameKey: "DrawStdKey",
        descriptionKey: "DrawStdDescriptionKey",
        value: false,
    });
    public stdColor = new formattingSettings.ColorPicker({
        name: "stdColor",
        displayNameKey: "StdColorKey",
        descriptionKey: "StdColorDescriptionKey",
        value:  { value: "#FF00FF" } // magenta
    });
    public stdLineWidth = new formattingSettings.NumUpDown({
        name: "stdLineWidth",
        displayNameKey: "StdLineWidthKey",
        descriptionKey: "StdLineWidthDescriptionKey",
        value: 1,
    });
    topLevelSlice = this.drawStd;
    name: string = "DrawStd";
    displayNameKey: string = "DrawStdKey";
    descriptionKey: string = "DrawStdDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.drawStd, this.stdColor, this.stdLineWidth];
}

export class ShowVarianceSettings extends FormattingSettingsGroup {
    public showVariance = new formattingSettings.ToggleSwitch({
        name: "showVariance",
        displayNameKey: "ShowVarianceKey",
        descriptionKey: "ShowVarianceDescriptionKey",
        value: false,
    });
    topLevelSlice = this.showVariance;
    name: string = "ShowVariance";
    displayNameKey: string = "ShowVarianceKey";
    descriptionKey: string = "ShowVarianceDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.showVariance];
}

export class DrawVarianceSettings extends FormattingSettingsGroup {
    public drawVariance = new formattingSettings.ToggleSwitch({
        name: "drawVariance",
        displayNameKey: "DrawVarianceKey",
        descriptionKey: "DrawVarianceDescriptionKey",
        value: false,
    });
    public varianceColor = new formattingSettings.ColorPicker({
        name: "varianceColor",
        displayNameKey: "VarianceColorKey",
        descriptionKey: "VarianceColorDescriptionKey",
        value:  { value: "#FF0000" } // red
    });
    public varianceLineWidth = new formattingSettings.NumUpDown({
        name: "varianceLineWidth",
        displayNameKey: "VarianceLineWidthKey",
        descriptionKey: "VarianceLineWidthDescriptionKey",
        value: 1,
    });
    topLevelSlice = this.drawVariance;
    name: string = "DrawVariance";
    displayNameKey: string = "DrawVarianceKey";
    descriptionKey: string = "DrawVarianceDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.drawVariance, this.varianceColor, this.varianceLineWidth];
}

export class MarginSettings extends SimpleCard {
    public leftMargin = new formattingSettings.NumUpDown({
        name: "leftMargin",
        displayNameKey: "LeftMarginKey",
        descriptionKey: "LeftMarginDescriptionKey",
        value: 50,
    });
    public rightMargin = new formattingSettings.NumUpDown({
        name: "rightMargin",
        displayNameKey: "RightMarginKey",
        descriptionKey: "RightMarginDescriptionKey",
        value: 10,
    });
    public topMargin = new formattingSettings.NumUpDown({
        name: "topMargin",
        displayNameKey: "TopMarginKey",
        descriptionKey: "TopMarginDescriptionKey",
        value: 10,
    });
    public bottomMargin = new formattingSettings.NumUpDown({
        name: "bottomMargin",
        displayNameKey: "BottomMarginKey",
        descriptionKey: "BottomMarginDescriptionKey",
        value: 20,
    });
    name: string = "Margin";
    displayNameKey: string = "MarginKey";
    descriptionKey: string = "MarginDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.leftMargin, this.rightMargin, this.topMargin, this.bottomMargin];
}

export class StatsSettings extends formattingSettings.CompositeCard {
    name: string = "Stats";
    displayNameKey: string = "StatsKey";
    descriptionKey: string = "StatsDescriptionKey";
    analyticsPane: boolean = true;

    public showMedianSettings: ShowMedianSettings = new ShowMedianSettings(Object());
    public drawMedianSettings: DrawMedianSettings = new DrawMedianSettings(Object());
    public showMeanSettings: ShowMeanSettings = new ShowMeanSettings(Object());
    public drawMeanSettings: DrawMeanSettings = new DrawMeanSettings(Object());
    public showStdSettings: ShowStdSettings = new ShowStdSettings(Object());
    public drawStdSettings: DrawStdSettings = new DrawStdSettings(Object());
    public showVarianceSettings: ShowVarianceSettings = new ShowVarianceSettings(Object());
    public drawVarianceSettings: DrawVarianceSettings = new DrawVarianceSettings(Object());

    groups = [
        this.showMedianSettings, this.drawMedianSettings, 
        this.showMeanSettings, this.drawMeanSettings, 
        this.showStdSettings, this.drawStdSettings, 
        this.showVarianceSettings, this.drawVarianceSettings
    ]
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    displayNameKey: string = "FormattingKey";
    discriptionKey: string = "FormattingDescriptionKey";
    public generalSettings: GeneralSettings = new GeneralSettings();
    public marginSettings: MarginSettings = new MarginSettings();
    public statsSettings: StatsSettings = new StatsSettings();
    public binSettings: BinSettings = new BinSettings();

    public cards: FormattingSettingsCard[] = [
        this.generalSettings,
        this.marginSettings,
        this.statsSettings,
        this.binSettings,
    ];
}
