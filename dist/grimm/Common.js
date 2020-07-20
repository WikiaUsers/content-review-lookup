/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
    ]
});

importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});

//courtesy of User:Bobogoobo. Source: http://community.wikia.com/wiki/Thread:521658#8
//code that tells the button how to work
$('.comic-button').click(function(){
    $('.TV').each(function(){
        $(this).css('display', 'none');
    });
    $('.Comic').each(function(){
        $(this).css('display', 'inline');
    });
    $('.Novel').each(function(){
        $(this).css('display', 'none');
    });
    $('.Common').each(function(){
        $(this).css('display', 'none');
    });
});

$('.tv-button').click(function(){
    $('.TV').each(function(){
        $(this).css('display', 'inline');
    });
    $('.Comic').each(function(){
        $(this).css('display', 'none');
    });
    $('.Novel').each(function(){
        $(this).css('display', 'none');
    });
    $('.Common').each(function(){
        $(this).css('display', 'none');
    });
});

$('.common-button').click(function(){
    $('.TV').each(function(){
        $(this).css('display', 'none');
    });
    $('.Comic').each(function(){
        $(this).css('display', 'none');
    });
    $('.Novel').each(function(){
        $(this).css('display', 'none');
    });
    $('.Common').each(function(){
        $(this).css('display', 'inline');
    });
});

$('.novel-button').click(function(){
    $('.TV').each(function(){
        $(this).css('display', 'none');
    });
    $('.Comic').each(function(){
        $(this).css('display', 'none');
    });
    $('.Novel').each(function(){
        $(this).css('display', 'inline');
    });
    $('.Common').each(function(){
        $(this).css('display', 'none');
    });
});

// Auto refresh
 
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';