$('#ChatHeader').append('<form style="display:inline-block;position:absolute;top:7px;right:152px;z-index:9001;" method="get" action="/Special:Search?title=Special:Search" class="WikiaSearch" id="WikiaSearch" target="_blank"><input type="text" accesskey="f" autocomplete="off" placeholder="Search" name="search"><input type="hidden" value="0" name="fulltext"><button class="secondary"><img height="14px" class="sprite search" src="https://vignette.wikia.nocookie.net/clubpenguin/images/4/48/Magnifying-glass-1083373_960_720.png"></button></form>');

$('.ChatHeader form.WikiaSearch').submit(function() {setTimeout("$('form.WikiaSearch input[name=\"search\"]').attr('value', '')", 500)});

console.log("[OPTIONS] Search Bar: Loaded");