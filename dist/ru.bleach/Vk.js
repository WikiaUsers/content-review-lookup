/* Код, отвечающий за вставку видео из ВКонтакте */

function vkvideo() {
    while(1) {
	var tempNode = document.getElementById('vkframe');
	if (!tempNode) return false;

	var url = tempNode.innerHTML;
	var siz = url.substr(0,1);
	url = url.substr(1);

	var height = '360';
	var width  = '607'; 
	switch (siz) {
	   case '0':
		height = '150';
		width = '300';
		break;
	   case '1':
		height = '225';
		width = '300';
		break;
	   case '2':
		height = '265';
		width = '450';
		break;
	   case '4':
		height = '600';
		width = '800';
		break;
	   case '5':
		height = '768';
		width = '1024';
		break;
	}

	if (url.substr(0,27)!='http://vk.com/video_ext.php') return false;

	url = url.split('&amp;').join('&');

	var contentNode = tempNode.parentNode;
	contentNode.removeChild(tempNode);

	var vkframe = document.createElement('iframe');
	vkframe.setAttribute('width', width);
	vkframe.setAttribute('height', height);
        vkframe.setAttribute('frameBorder', '0');
	vkframe.style.border = 'none';
	vkframe.setAttribute('src', url);
        vkframe.setAttribute('style', 'display:block');

	contentNode.appendChild(vkframe);
    }
    return false;
}

if (window.addEventListener) // W3C standard
{
  window.addEventListener('load', vkvideo, false);
} 
else if (window.attachEvent) // Microsoft
{
  window.attachEvent('onload', vkvideo);
}
/* Конец ВК */