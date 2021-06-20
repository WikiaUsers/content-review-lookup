/* Any JavaScript here will be loaded for all users on every page load. */
/* Code from Against the Gods Wiki  */
$(function addPageBottom() {
        $("#WikiaRail").append('<div style="width:auto; height:auto; margin-bottom:10px; padding:2px 5px; text-align:center; font-size:130%;"><div style="color: #721410; font-size: 150%; font-weight: bold; margin-bottom:-15px;">ATTENTION!</div><br>This wiki contains information that is <span style="font-weight:bold;">NOT</span> in the current translations!<br><br><span style="font-style:italic;">Read at your own risk.</span></div>');
});

/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

/* WAM Site-wide Installation */
window.railWAM = {
    logPage:"Project:WAM Log"
};