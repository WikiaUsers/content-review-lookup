/**
 * Name:        VEParamNames
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Changes parameter names inside VisualEditor to match descriptions
 *              on the template documentation page.
 * Notes:       To be used sitewidely.
 */
var VEParamNames = {
    init: function() {
        this.interval = setInterval($.proxy(this.interval, this), 1000);
    },
    interval: function() {
        var currentWindow = ve.init.target.surface.dialogs.currentWindow,
            instance = (
            currentWindow instanceof ve.ui.WikiaInfoboxDialog ||
            currentWindow instanceof ve.ui.WikiaTransclusionDialog
        ) && currentWindow.$content.find('.ve-ui-mwParameterPage').length;
        if (this.inDialog) {
            if (!instance) {
                this.inDialog = false;
                this.currentWindow = null;
            }
        } else if (instance) {
            this.inDialog = true;
            this.initDialog();
        }
    },
    initDialog: function() {
        this.currentWindow = ve.init.target.surface.dialogs.currentWindow;
        if (this.currentWindow instanceof ve.ui.WikiaTransclusionDialog) {
            this.initTransclusionsDialog();
        } else {
            this.initInfoboxDialog();
        }
    },
    initTransclusionsDialog: function() {
        this.nameElementMap = {};
        this.currentWindow
            .$content
            .find('.ve-ui-mwParameterPage')
            .each($.proxy(this.mapTemplateElement, this));
        if (this.currentWindow.transclusionModel) {
            this.fetchParams(this.currentWindow.transclusionModel.parts[0].title);
        } else {
            var alias = this.currentWindow.onTransclusionReady;
            this.currentWindow.onTransclusionReady = $.proxy(function() {
                $.proxy(alias, this.currentWindow).call(this.currentWindow);
                this.fetchParams(this.currentWindow.transclusionModel.parts[0].title);
            }, this);
        }
    },
    mapTemplateElement: function(_, el) {
        var $this = $(el);
        this.nameElementMap[
            $this.find('.ve-ui-mwParameterPage-label').text()
        ] = $this;
    },
    initInfoboxDialog: function() {
        this.paramLabelMap = {};
        this.nameElementMap = {};
        for (var k in this.currentWindow.fullParamsList) {
            var param = this.currentWindow.fullParamsList[k];
            this.paramLabelMap[param.label || param.name] = param;
        }
        this.currentWindow
            .$content
            .find('.ve-ui-mwParameterPage')
            .each($.proxy(this.mapInfoboxElement, this));
        if (this.currentWindow.infoboxTemplate) {
            this.fetchParams(this.currentWindow.infoboxTemplate.title);
        } else {
            var alias = this.currentWindow.initializeTemplateParameters;
            this.currentWindow.initializeTemplateParameters = $.proxy(function() {
                $.proxy(alias, this.currentWindow).call(this.currentWindow);
                this.fetchParams(this.currentWindow.infoboxTemplate.title);
            }, this);
        }
    },
    mapInfoboxElement: function(_, el) {
        var $this = $(el);
        this.nameElementMap[
            this.paramLabelMap[
                $this.find('.ve-ui-mwParameterPage-label').text()
            ].name
        ] = $this;
    },
    fetchParams: function(template) {
        $.get(
            mw.util.getUrl(template + '/doc'),
            {
                action: 'render'
            },
            $.proxy(this.parameterCallback, this)
        );
    },
    parameterCallback: function(d) {
        $(d).closest('.template-documentation__parameters')
            .find('tr:not(:first)')
            .each($.proxy(function(_, el) {
            var $tds = $(el).find('> td'),
                text = $tds.first().text().trim();
            if (this.nameElementMap[text]) {
                this.nameElementMap[text]
                    .find('.ve-ui-mwParameterPage-label')
                    .html($tds.last().html().trim());
            }
        }, this));
    }
};
mw.hook('ve.activationComplete').add($.proxy(VEParamNames.init, VEParamNames));