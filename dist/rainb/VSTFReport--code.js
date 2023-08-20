/**
 * Saved as backup so I still have the small buttons :3
 * Name:        VSTFReport
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description:
 *      Used for easier reporting vandalism to VSTF.
 *      Adds a "Report to VSTF" link to user's contributions
 *      The link automatically opens the VSTF vandalism report page
 *      and auto-fills the window with information about the user that is reported
 *      The whole process isn't automatical, as description for vandalism still needs to
 *      be filled in and the form isn't auto-submitted.
 * Version:     v1.2
 */
(function() {
    var VSTFReport = {
        config: mw.config.get([
            'wgCanonicalSpecialPageName',
            'wgCityId',
            'wgPageName',
            'wgServer',
            'wgSiteName'
        ]),
        data: $.getUrlVars(),
        init: function() {
            if(this.config.wgCityId === '65099') {
                this.initVSTF();
            } else if(this.config.wgCanonicalSpecialPageName === 'Contributions') {
                this.initContribs();
            }
        },
        initVSTF: function() {
            if(
                   this.data.report === 'yes'
                && this.data.cb !== localStorage.getItem('rvcachebuster')
                && (
                       this.config.wgPageName === 'Report:Vandalism'
                    || this.config.wgPageName === 'Report:Spam'
                )
            ) {
                this.interval = setInterval($.proxy(this.waitForButton, this), 100);
            }
        },
        waitForButton: function() {
            if($('#vstf-report-spam, #vstf-report-vandalism').exists) {
                $('#requestWindow #submit').click($.proxy(this.setCachebuster, this));
                $('#vstf-report-spam, #vstf-report-vandalism').click();
                $('#wikiname').val(this.data.name);
                $('#wikiurl').val(this.data.url);
                $('#user').val(this.data.vandal);
                clearInterval(this.interval);
            }
        },
        setCachebuster: function() {
            localStorage.setItem('rvcachebuster', this.data.cb);
        },
        initContribs: function() {
            var baseURL = 'http://vstf.wikia.com/wiki/',
                vandalLink = new mw.Uri(baseURL + 'Report:Vandalism'),
                spamLink = new mw.Uri(baseURL + 'Report:Spam'),
                server = this.config.wgServer;
            vandalLink.query = spamLink.query = {
                report: 'yes',
                name: this.config.wgSiteName,
                url: server.substring(7, server.length - 10),
                vandal: this.data.target ?
                    this.data.target.replace(/\+/g, ' ') :
                    this.config.wgPageName.split('/')[1],
                cb: Math.random() * 10000000000000000
            };
            mw.util.addCSS(
                '.VSTFReportButtonContainer {' +
                    'width: 100%;' +
                    'text-align: center;' +
                '}'
            );
            $('<div>', { class: 'VSTFReportButtonContainer' })
                .append(
                    $('<a>', {
                        class: 'VSTFReportButton wikia-button vandalism',
                        href: vandalLink.toString()
                    }).text('Report vandalism')
                )
                .append('&nbsp;•&nbsp;')
                .append(
                    $('<a>', {
                        class: 'VSTFReportButton wikia-button spam',
                        href: spamLink.toString()
                    }).text('Report spam')
                )
                .insertAfter('#contentSub');
        }
    };
    VSTFReport.init();
})();