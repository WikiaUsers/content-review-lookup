/* Facebook box */
$(window).load(function(){
    $('#wikia-recent-activity').before('<section class="module" id="facebookmodule"><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDeath-Note-Wiki-1371576839576699%2F&tabs&width=280&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="280" height="214" style="border:none;overflow:hidden;" scrolling="no" frameborder="0" allowTransparency="true"></iframe></section>');
});

// Nowy przycisk edycji profilu
// by [[User:Luqgreg]]
$(function() {
    if(mw.config.get("wgNamespaceNumber") == 2 & $(".UserProfileActionButton").length & $(".masthead-info hgroup").length) {
        var actions = mw.config.get("wgWikiaPageActions");
        var curAction;
 
        $('.UserProfileActionButton').remove();
 
        if(actions) {
            var button = '<div class="page-header__contribution-buttons" style="float: right; margin-top: 2px;"><div class="wds-button-group">'
 
            curAction = actions.filter(function(action){return action.id === "page:Edit";})[0];
            if(curAction) button += '<a href="'+curAction.href+'" class="wds-is-squished wds-is-secondary wds-button" id="ca-edit" data-tracking="ca-edit" accesskey="e"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small"><path d="M9.1 4.5l-7.8 7.8c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4zm7.6-.2l-3-3c-.4-.4-1-.4-1.4 0l-1.8 1.8 4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z" fill-rule="evenodd"></path></svg><span>'+curAction.caption+'</span></a>';
            else button += '<a href="?action=edit" class="wds-is-squished wds-is-secondary wds-button" id="ca-viewsource" data-tracking="ca-viewsource"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-lock-small"><path d="M11 6H7V5c0-1.1.9-2 2-2s2 .9 2 2v1zm-1 6.7V14H8v-1.3c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .7-.4 1.4-1 1.7zM9 1C6.8 1 5 2.8 5 5v1H3c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1h-2V5c0-2.2-1.8-4-4-4z" fill-rule="evenodd"></path></svg><span>Tekst źródłowy</span></a>';
 
            button += '<div class="wds-dropdown"><div class="wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"></path></svg></div><div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned"><ul class="wds-list wds-is-linked">';
 
            curAction = actions.filter(function(action){return action.id === "page:History";})[0];
            if(curAction) button += '<li><a id="ca-history" href="'+curAction.href+'" data-tracking="ca-history-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Move";})[0];
            if(curAction) button += '<li><a id="ca-move" href="'+curAction.href+'" data-tracking="ca-move-dropdown">'+curAction.caption+'</a></li>'
 
            curAction = actions.filter(function(action){return action.id === "page:Protect";})[0];
            if(curAction) button += '<li><a id="ca-protect" href="'+curAction.href+'" data-tracking="ca-protect-dropdown">'+curAction.caption+'</a></li>';
 
            curAction = actions.filter(function(action){return action.id === "page:Delete";})[0];
            if(curAction) button += '<li><a id="ca-delete" href="'+curAction.href+'" data-tracking="ca-delete-dropdown">'+curAction.caption+'</a></li>';
 
            button += '</ul></div></div></div>';
            $(button).appendTo(".masthead-info hgroup").css({float: "right"});
        }
    }
});