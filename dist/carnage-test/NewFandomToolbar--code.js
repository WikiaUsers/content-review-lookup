/**
 * Codenamed "NewFandomToolbar"
 * 
 * Author:
 * - Ultimate Dark Carnage
 * 
 * Version:
 * v0.7.0
 **/

function FandomToolbar(){
    this.i18n = null;
    this.cityId = mw.config.get('wgCityId');
    this.username = mw.config.get('wgUserName');
    this.userdataLoaded = $.Deferred();
    this.colorsloaded = $.Deferred();
    this.wdsLoaded = $.Deferred();
    this.i18noLoaded = $.Deferred();
    this.i18nLoaded = $.Deferred();
    this.spinnerLoaded = $.Deferred();
    this.loaded = false;
    this.load.call(this);
    $.when(
        this.colorsLoaded,
        this.wdsLoaded,
        this.i18noLoaded,
        this.spinnerLoaded
    ).done($.proxy(this.setup, this));
}

FandomToolbar.prototype = {
    constructor: FandomToolbar,
    load: function(){
        ['loadI18no', 'loadWDS', 'loadColors', 'loadSpinner']
            .forEach($.proxy(function(fn){
                if (typeof this[fn] === 'function')
                    this[fn].call(this);
            }, this));
    },
    loadI18no: function(){
        mw.hook('dev.i18n').add($.proxy(function(i18no){
            this.i18noLoaded.resolve(i18no);
        }, this));
    },
    loadWDS: function(){
        mw.hook('dev.wds').add($.proxy(function(wds){
            this.wdsLoaded.resolve(wds);
        }, this));
    },
    loadColors: function(){
        mw.hook('dev.colors').add($.proxy(function(colors){
            this.colorsLoaded.resolve(colors);
        }, this));
    },
    loadSpinner: function(){
        require(['ext.wikia.design-system.loading-spinner'], 
            $.proxy(function(Spinner){
                this.spinnerLoaded.resolve(Spinner);
            }, this));
    },
    loadI18n: function(){
        $.when(
            this.i18no.loadMessages('FandomToolbar')
        ).done($.proxy(this.processI18n, this));
    },
    setup: function(colors, wds, i18no, spinner){
        this.colors = colors;
        this.wds = wds;
        this.i18no = i18no;
        this.spinner = spinner;
        this.loadI18n.call(this);
    },
    processI18n: function(i18n){
        this.i18n = i18n;
    }
};