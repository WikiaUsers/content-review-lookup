/**
 * Name:        SiderailSpoilerWarning
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds a dismissable spoiler warning to sidebar
 */
var mwApiCounterSiderailSpoilerWarning = setInterval(function()
{
    if(typeof mw !== 'undefined' && typeof mw.Api !== 'undefined')
    {
        clearInterval(mwApiCounterSiderailSpoilerWarning);
        if(localStorage.getItem("SiderailSpoilerWarningRead") === "yes" || $("#WikiaRail").length === 0) return;
        var SiderailSpoilerWarning = {
            api: new mw.Api(),
            config: $.extend({
                announceError: false,
                page: "custom-spoiler-warning",
                title: "WARNING",
                vocab: {
                    fetchError: "An error occurred while fetching spoiler warning page",
                    dismiss: "Dismiss",
                    pageNotFound: "The following page was not found"
                }
            }, window.SiderailSpoilerWarningConfig),
            init: function()
            {
                this.i18n = this.config.vocab;
                this.checkExist();
 
            },
            checkExist: function()
            {
                var url = mw.config.get('wgServer') + mw.config.get('wgArticlePath').replace(/\$1/, "MediaWiki:" + this.config.page);
                $.ajax({
                    url: url,
                    success: $.proxy(this.fetchPage, this),
                    error: $.proxy(function(d)
                    {
                        this.insertUI(this.i18n.pageNotFound + ": <a href='" + url + "'>MediaWiki:" + this.config.page + "</a>", 'error').show();
                    }, this)
                });
            },
            fetchPage: function()
            {
                this.api.get({
                    action: "parse",
                    text: "{{int:" + this.config.page + "}}"
                }).done($.proxy(function(d)
                {
                    if(d.error && this.config.announceError)
                        new BannerNotification(this.i18n.fetchError + ": " + d.error.code, 'error');
                    else this.insertUI(d.parse.text['*']);
                }, this)).fail($.proxy(function()
                {
                    if(this.config.announceError)
                        new BannerNotification(this.i18n.fetchError, 'error').show();
                }, this));
            },
            insertUI: function(html)
            {
 
                $("#WikiaRail").children().first().before("<div class='SiderailSpoilerWarningModule rail-module'>\
                    <h2 class='activity-heading'>" + this.config.title + "</h2>" + html + "</div>");
                $("#SiderailSpoilerWarningButton").click($.proxy(function()
                {
                    localStorage.setItem("SiderailSpoilerWarningRead", "yes");
                    $(".SiderailSpoilerWarningModule").slideToggle();
                }, this));
            }
        };
        $($.proxy(SiderailSpoilerWarning.init, SiderailSpoilerWarning));
    }
 
}, 100);