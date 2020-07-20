;(function(mw, $, config){
    var partyMode = $.extend(config, {
        version: '0.0.1 alpha',
        defaultSkin: 'Normal',
        musicOnInit: false,
        skins: ['Normal', 'Neon', 'Metallic'],
        disco: ['White', 'Colored', 'Monochrome', 'Monochrome 2'],
        holidays: {
            'April 1': 'April Fools',
            'July 4': 'Fourth of July',
            'October 31': 'Halloween',
            'December 25': 'Christmas'
        },
        date: new Date(),
        date_md: [['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][(new Date()).getMonth()], (new Date()).getDate()].join(' ')
    });
    
    if (partyMode.holidays.hasOwnProperty(partyMode.date_md)){
        var holiday = partyMode.holidays[partyMode.date_md];
        partyMode.skins[partyMode.skins.length] = holiday;
        partyMode.disco[partyMode.disco.length] = holiday;
    }
})(this.mediaWiki, this.jQuery, (this.ChatParty = this.ChatParty || {}));