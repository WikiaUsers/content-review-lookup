(function(window, $, mw){
    function WorldClock(){
        this.loaded = false;
    }

    WorldClock.timezones = {
        "Greenwich Mean Time": {
            alias: "Universal Coordinated Time",
            abbreviations: ["GMT", "UTC"],
            relativeToUTC: "UTC"
        },
        "European Central Time": {
            abbreviation: "ECT",
            relativeToUTC: "UTC"
        },
        "Eastern European Time": {
            aliases: ["Arabic Standard Time", "Egypt Standard Time", "(Arabic) Egypt Standard Time"],
            abbreviations: ["EET", "ART"],
            relativeToUTC: "UTC+2"
        },
        "Eastern African Time": {
            abbreviation: "EAT",
            relativeToUTC: "UTC+3"
        },
        "Middle East Time": {
            abbreviation: "MET",
            relativeToUTC: "UTC+3:30"
        },
        "Near East Time": {
            abbreviation: "NET",
            relativeToUTC: "UTC+4"
        },
        "Pakistan Lahore Time": {
            abbreviation: "PLT",
            relativeToUTC: "UTC+5"
        },
        "India Standard Time": {
            abbreviation: "IST",
            relativeToUTC: "UTC+5:30"
        },
        "Bangladesh Standard Time": {
            abbreviation: "BST",
            relativeToUTC: "UTC+6"
        },
        "Vietnam Standard Time": {
            abbreviation: "VST",
            relativeToUTC: "UTC+7"
        },
        "China Taiwan Time": {
            abbreviation: "CTT",
            relativeToUTC: "UTC+8"
        },
        "Japan Standard Time": {
            abbreviation: "JST",
            relativeToUTC: "UTC+9"
        },
        "Australia Central Time": {
            abbreviation: "ACT",
            relativeToUTC: "UTC+9:30"
        },
        "Australia Eastern Time": {
            abbreviation: "AET",
            relativeToUTC: "UTC+10"
        },
        "Solomon Standard Time": {
            abbreviation: "SST",
            relativeToUTC: "UTC+11"
        },
        "New Zealand Standard Time": {
            abbreviation: "NST",
            relativeToUTC: "UTC+12"
        },
        "Midway Islands Time": {
            abbreviation: "MIT",
            relativeToUTC: "UTC-11"
        },
        "Hawaii Standard Time": {
            abbreviation: "HST",
            relativeToUTC: "UTC-10"
        },
        "Alaska Standard Time": {
            abbreviation: "AST",
            relativeToUTC: "UTC-9"
        },
        "Pacific Standard Time": {
            abbreviation: "PST",
            relativeToUTC: "UTC-8"
        },
        "Mountain Standard Time": {
            abbreviation: "MST",
            relativeToUTC: "UTC-7"
        },
        "Central Standard Time": {
            abbreviation: "CST",
            relativeToUTC: "UTC-6"
        },
        "Eastern Standard Time": {
            abbreviation: "EST",
            relativeToUTC: "UTC-5"
        },
        "Puerto Rico and US Virgin Islands Time": {
            abbreviation: "PRT",
            relativeToUTC: "UTC-4"
        },
        "Canada Newfoundland Time": {
            abbreviation: "CNT",
            relativeToUTC: "UTC-3:30"
        },
        "Argentina Standard Time": {
            alias: "Brazil Eastern Time",
            abbreviations: ["AGT", "BET"],
            relativeToUTC: "UTC-3"
        },
        "Central African Time": {
            abbreviation: "CAT",
            relativeToUTC: "UTC-1"
        }
    };
})(window, jQuery, mediaWiki);