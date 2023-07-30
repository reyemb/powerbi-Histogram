import * as d3 from 'd3-format';

const locales = {
    "en-US": {
        "decimal": ".",
        "thousands": ",",
        "grouping": [3],
        "currency": ["$", ""]
    },
    "de-DE": {
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["", "€"]
    },
    "fr-FR": {
        "decimal": ",",
        "thousands": " ",
        "grouping": [3],
        "currency": ["", "€"]
    },
    "es-ES": {
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["", "€"]
    },
    "it-IT": {
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["", "€"]
    }
};

export function getLocaleData() {
    let userLocale: string = navigator.language || (navigator as any).userLanguage;
    let localeData = locales[userLocale] || locales['en-US'];
    if (!localeData) {
        const languageCode = userLocale.split('-')[0];
        const matchingLocaleKey = Object.keys(locales).find(key => key.startsWith(languageCode));
        if (matchingLocaleKey) {
            localeData = locales[matchingLocaleKey];
        } else {
            localeData = locales['en-US'];
        }
    }
    return localeData;
}

export function getLocaleFormat(numberDecimals: number): (n: number) => string {
    // Ensure that number of decimals is a non-negative integer
    numberDecimals = Math.max(0, Math.floor(numberDecimals));
    const formatString = ',.' + numberDecimals + 'f';
    const formatter = d3.formatLocale(getLocaleData()).format(formatString);

    return (n: number) => {
        let formatted = formatter(n);
        if (numberDecimals > 0 && n % 1 === 0) {
            // This is an integer value, remove trailing zeroes and decimal point
            formatted = formatted.replace(/\.0+$/, '');
        }
        return formatted;
    };
}

export function formatNumber(n: number, numberDecimals: number): string {
    // Ensure that number of decimals is a non-negative integer
    numberDecimals = Math.max(0, Math.floor(numberDecimals));
    const formatString = ',' + '.' + numberDecimals + 'f';

    // Create a d3 formatter using the locale data
    const formatter = d3.formatLocale(getLocaleData()).format(formatString);

    // Format the number
    let formatted = formatter(n);
    if (numberDecimals > 0 && n % 1 === 0) {
        // This is an integer value, remove trailing zeroes and decimal point
        formatted = formatted.replace(/\.0+$/, '');
    }

    return formatted;
}