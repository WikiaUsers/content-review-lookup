importScriptPage('ShowHide/code.js', 'dev');

$('.cfUserTweetsTag li').each(function() { $(this).html($(this).html().replace(/&nbsp;/g ,' ')) });