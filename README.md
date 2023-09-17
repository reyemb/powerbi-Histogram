# PowerBI Custom Visual: Histogram

This repository was created to address the need for updated custom visuals in Power BI. Microsoft's [current selection of custom visuals](https://github.com/MicrosoftDocs/powerbi-docs/blob/live/powerbi-docs/developer/visuals/samples.md) seems to be outdated, and the services used in these visuals do not match with the current version of Power BI services. In addition, the [official Power BI documentation](https://learn.microsoft.com/en-us/power-bi/developer/visuals/) is not always detailed, which can make developing your own custom visuals challenging.

One specific issue encountered was that creating formatting groups is not possible with the formatting model utils, despite this being the recommended approach by Microsoft. To address this, I integrated a solution from [this pull request](https://github.com/microsoft/powerbi-visuals-utils-formattingmodel/pull/7) into my custom visual. Thanks to liprec, it is now possible to use the formatting model utils with groups as intended. You can find more information on this [here](https://learn.microsoft.com/en-us/power-bi/developer/visuals/format-pane).

## Changelog

05.09.2023
   - Added Field so that vertical lines based on Input can be drawn
   - Added Custom Settings to adjust coloring, width and linestyle of the vertical line
   - Also Added show label options (JSON and true to all or false to all)
   
## Features

- Crossfiltering
- Various formatting options to style the chart to your needs
- Multilanguage support (English, German, French, Spanish, Italian)

## Demo

To evaluate the capabilities of this custom visual, check out the video file at `/demo/demo.mp4`.

https://github.com/reyemb/powerbi-Histogram/assets/60140509/36cb3a85-9630-4827-90b3-69beea628570

## Changelog

Version 1.0 - Initial Commit

## Next Steps

Enable Drillthrough

## Installation

1. Download the `PowerBI_Histogram_{version}.pbiviz` file.
2. Open Power BI Desktop.
3. In the Home tab, look for the Visualizations pane. At the bottom, you will find an ellipsis (...) button.
4. Click the ellipsis (...) button to open the menu.
5. Select the Import from file option.
6. Browse to the location where your `.pbiviz` file is saved.
7. Click the `.pbiviz` file you want to import and select Open.
8. A prompt will appear asking to import the file. Click Import.
9. After the visualization is successfully imported, it will appear in the Visualizations pane and you can use it like any other visualization.

## Usage

To see how the visual can be used, check out the video file at `/demo/usage.mp4`.

https://github.com/reyemb/powerbi-Histogram/assets/60140509/2ec07e5b-b401-4069-aaa6-2328d9cf7451

## Development

1. Install `pbiviz` by running `npm install -g powerbi-visuals-tools`.
2. Start a development server by running `npm run start`.
3. Go to Power BI service (app.powerbi.com).
4. Navigate to your report (you might need to create a new one or edit an existing one).
5. In the Visualizations pane, you will find an icon for the Developer visual. It's the icon with the "< >" symbol. If you don't see it, you might need to enable it in the settings. You can do this by going to File > Options and settings > Options > Preview features and then enable the Developer visual for testing option.
6. Add the Developer visual to your report.
7. If your visual project is running (you've started it with `pbiviz start`), your visual will render in the Developer visual placeholder.

## Dependencies

This project depends on several libraries, such as `d3`, `powerbi-models`, `powerbi-visuals-api`, and `powerbi-visuals-utils-formattingutils`, as well as the great work of liprec in [this pull request](https://github.com/microsoft/powerbi-visuals-utils-formattingmodel/pull/7). All dependencies are listed in the `package.json` file.

## Support

For support, please open an issue on GitHub. Thank you.

## Contributing

Contributions are welcomed in the form of pull requests or translations into different languages.

For more details about the implementation of this custom visual, refer to the `pbiviz.json` and `package.json` files.
