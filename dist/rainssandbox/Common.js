/*************************/
/* On The Wiki additions */
/*************************/
   $('.WikiNav ul li:first-child a[href="/wiki/Special:Random"]').remove();
   $('.WikiNav ul li:first-child a[href="/wiki/Special:Videos"]').remove();
   $('.WikiNav ul li:first-child a[href="/wiki/Special:Forum"]').remove();
   $('.WikiNav ul li:first-child a[href="/wiki/Special:WikiActivity"]').remove();
   $('.WikiNav ul li:first-child a[href="/wiki/Special:NewFiles"]').remove();
   $('.WikiNav ul li:first-child a[href="/wiki/Special:Chat"]').remove();
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:WikiActivity">Wiki Activity</a></li>');
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:RecentChanges">Recent Changes</a></li>');
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:NewPages">New Pages</a></li>');
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:NewFiles">New Files</a></li>');
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:Forum">Forum</a></li>');
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:Chat">Chat</a></li>');

/**********/
/* Switch */
/**********/
$('.old-button').click(function(){
    $('.New').each(function(){
        $(this).css('display', 'none');
    });
    $('.Old').each(function(){
        $(this).css('display', 'inline');
    });
});
 
$('.new-button').click(function(){
    $('.New').each(function(){
        $(this).css('display', 'inline');
    });
    $('.Old').each(function(){
        $(this).css('display', 'none');
    });
});