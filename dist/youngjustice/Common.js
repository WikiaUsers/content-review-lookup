/* To replace the now dead "welcome bot" */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:New user}}',
        3: false
    },
    summary: 'Script: Creating user profile'
};

/* Auto-refreshing recent changes */
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');

/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'User:Thailog/EditSummaries'
};

/* Custom buttons 
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/5/57/CIT_Button.png",
        "speedTip": "Canon-In-Training",
        "tagOpen": "{{CIT|",
        "tagClose": "}}",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/2f/TS_Button.png",
        "speedTip": "Timestamp",
        "tagOpen": "{{TS|",
        "tagClose": "|Date|Time|Timezone}}",
        "sampleText": "Place"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/c/ce/Ep_ref_Button.png",
        "speedTip": "Episode/issue reference tag",
        "tagOpen": "<ref name=>{{ep ref|",
        "tagClose": "}}</ref>",
        "sampleText": "number"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/24/AG_Button.png",
        "speedTip": "Ask Greg reference",
        "tagOpen": "<ref name=id>{{askgreg|QID|2020-MONTH-DAY|2020-",
        "tagClose": "}}</ref>",
        "sampleText": "MONTH-DAY"
    }

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/2d/Tweet_Button.png",
        "speedTip": "Tweet reference",
        "tagOpen": "<ref>{{tweet|poster|username|url id|2020-MONTH-DAY|2020-",
        "tagClose": "}}</ref>",
        "sampleText": "MONTH-DAY"
    }

}*/