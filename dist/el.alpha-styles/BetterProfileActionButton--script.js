
// Nowy przycisk edycji profilu
$(function() {
if (window.SecondaryButton) {
    if(mw.config.get("wgNamespaceNumber") == 2 & $(".UserProfileActionButton").length & $(".masthead-info hgroup").length) {
        var actions = mw.config.get("wgWikiaPageActions");
        var curAction;
 
        $('.UserProfileActionButton').remove();
 
        if(actions) {
            var button = '<div class="page-header" id="PageHeader" style="padding:0; z-index:10000; position:relative;"> <div class="page-header__contribution-buttons" style="float: right; margin-top: 2px; z-index:10000; position:relative"><div class="wds-button-group">'
 
            curAction = actions.filter(function(action){return action.id === "page:Edit";})[0];
            if(curAction) button += '<a href="'+curAction.href+'" class="wds-is-squished wds-is-secondary wds-button" id="ca-edit" data-tracking="ca-edit" accesskey="e"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small"><path id="pencil-small" d="M14 8.586L9.414 4 11 2.414 15.586 7 14 8.586zM6.586 16H2v-4.586l6-6L12.586 10l-6 6zm11.121-9.707l-6-6a.999.999 0 0 0-1.414 0l-9.999 10a.99.99 0 0 0-.217.325A.991.991 0 0 0 0 11v6a1 1 0 0 0 1 1h6c.13 0 .26-.026.382-.077a.99.99 0 0 0 .326-.217l9.999-9.999a.999.999 0 0 0 0-1.414z"/></path></svg><span>'+curAction.caption+'</span></a>';
            else button += '<a href="?action=edit" class="wds-is-squished wds-is-secondary wds-button" id="ca-viewsource" data-tracking="ca-viewsource"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-lock-small"><path id="lock-small" d="M14 16H4V8h10v8zM7 4c0-1.104.897-2 2-2s2 .896 2 2v2H7V4zm8 2h-2V4c0-2.205-1.794-4-4-4S5 1.795 5 4v2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-5 4H8a1 1 0 1 0 0 2v1a1 1 0 1 0 2 0v-1a1 1 0 1 0 0-2"/></path></svg><span>View Source</span></a>';
 
            button += '<div class="wds-dropdown"><div class="wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path id="dropdown-tiny" d="M6 10a.997.997 0 0 1-.707-.293l-4-4A1 1 0 0 1 2 4h8a1 1 0 0 1 .707 1.707l-4 4A.997.997 0 0 1 6 10z"/></path></svg></div><div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned"><ul class="wds-list wds-is-linked">';
            curAction = actions.filter(function(action){return action.id === "page:History";})[0];
            if(curAction) button += '<li><a id="ca-history" href="'+curAction.href+'" data-tracking="ca-history-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Move";})[0];
            if(curAction) button += '<li><a id="ca-move" href="'+curAction.href+'" data-tracking="ca-move-dropdown">'+curAction.caption+'</a></li>'
 
            curAction = actions.filter(function(action){return action.id === "page:Protect";})[0];
            if(curAction) button += '<li><a id="ca-protect" href="'+curAction.href+'" data-tracking="ca-protect-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Delete";})[0];
            if(curAction) button += '<li><a id="ca-delete" href="'+curAction.href+'" data-tracking="ca-delete-dropdown">'+curAction.caption+'</a></li>';
            button += '</ul></div></div></div>';
            $(button).appendTo(".WikiaUserPagesHeader").css({float: "right"});
        }
    }
} else {
    if(mw.config.get("wgNamespaceNumber") == 2 & $(".UserProfileActionButton").length & $(".masthead-info hgroup").length) {
        var actions = mw.config.get("wgWikiaPageActions");
        var curAction;
 
        $('.UserProfileActionButton').remove();
 
        if(actions) {
            var button = '<div class="page-header" id="PageHeader" style="padding:0; z-index:10000; position:relative;"> <div class="page-header__contribution-buttons" style="float: right; margin-top: 2px; z-index:10000; position:relative"><div class="wds-button-group">'
 
            curAction = actions.filter(function(action){return action.id === "page:Edit";})[0];
            if(curAction) button += '<a href="'+curAction.href+'" class="wds-is-squished wds-button" id="ca-edit" data-tracking="ca-edit" accesskey="e"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small"><path id="pencil-small" d="M14 8.586L9.414 4 11 2.414 15.586 7 14 8.586zM6.586 16H2v-4.586l6-6L12.586 10l-6 6zm11.121-9.707l-6-6a.999.999 0 0 0-1.414 0l-9.999 10a.99.99 0 0 0-.217.325A.991.991 0 0 0 0 11v6a1 1 0 0 0 1 1h6c.13 0 .26-.026.382-.077a.99.99 0 0 0 .326-.217l9.999-9.999a.999.999 0 0 0 0-1.414z"/></path></svg><span>'+curAction.caption+'</span></a>';
            else button += '<a href="?action=edit" class="wds-is-squished wds-button" id="ca-viewsource" data-tracking="ca-viewsource"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-lock-small"><path id="lock-small" d="M14 16H4V8h10v8zM7 4c0-1.104.897-2 2-2s2 .896 2 2v2H7V4zm8 2h-2V4c0-2.205-1.794-4-4-4S5 1.795 5 4v2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-5 4H8a1 1 0 1 0 0 2v1a1 1 0 1 0 2 0v-1a1 1 0 1 0 0-2"/></path></svg><span>View Source</span></a>';
 
            button += '<div class="wds-dropdown"><div class="wds-button wds-is-squished wds-dropdown__toggle"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path id="dropdown-tiny" d="M6 10a.997.997 0 0 1-.707-.293l-4-4A1 1 0 0 1 2 4h8a1 1 0 0 1 .707 1.707l-4 4A.997.997 0 0 1 6 10z"/></path></svg></div><div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned"><ul class="wds-list wds-is-linked">';
            curAction = actions.filter(function(action){return action.id === "page:History";})[0];
            if(curAction) button += '<li><a id="ca-history" href="'+curAction.href+'" data-tracking="ca-history-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Move";})[0];
            if(curAction) button += '<li><a id="ca-move" href="'+curAction.href+'" data-tracking="ca-move-dropdown">'+curAction.caption+'</a></li>'
 
            curAction = actions.filter(function(action){return action.id === "page:Protect";})[0];
            if(curAction) button += '<li><a id="ca-protect" href="'+curAction.href+'" data-tracking="ca-protect-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Delete";})[0];
            if(curAction) button += '<li><a id="ca-delete" href="'+curAction.href+'" data-tracking="ca-delete-dropdown">'+curAction.caption+'</a></li>';
            button += '</ul></div></div></div></div></div>';
            $(button).appendTo(".WikiaUserPagesHeader").css({float: "right"});
        }
    }
}
});