//adds link to Emoticons and Chat rules
var div = document.createElement('div');
div.className = 'tooltip-wrap';
div.innerHTML = '<a href="http://communaute.wikia.com/wiki/MediaWiki:Emoticons" target="_blank"><span class="leftpopper">Émoticônes</span></a><span class="popperblack">  /  </span><a href="http://communaute.wikia.com/wiki/project:Règles_du_tchat" target="_blank"><span class="popper">Règles du tchat</span></a>';
$('#ChatHeader').find('.wordmark').append(div);