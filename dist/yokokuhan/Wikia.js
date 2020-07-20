var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');
 
$('.vine-embed').each(function() {
    var embedurl = $(this).text(),
        embedcode = '<iframe class="vine-embed" src="' + embedurl + '" width="300" height="300" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>';
    $(this).html(embedcode);
});