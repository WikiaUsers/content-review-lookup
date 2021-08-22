/*
Darstellung dieses Gadgets nicht korrekt in Firefox ≤ 32, Internet Explorer und Edge (Stand 7. April 2017)
Sollte fehlerfrei funktionieren:
 Desktop
  Chrome ≥ 1
  Edge ≥ 18
  Firefox ≥ 53
  Opera ≥ 15
  Safari ≥ 4

 Mobil
  Android webview ≥ 2
  Chrome für Android ≥ 18
  Firefox für Android ≥ 53
  Opera für Android ≥ 14
  Safari auf iOS ≥ 3.2
  Samsung Internet ≥ 1.0

Source: (Stand 17. Nov 2020)
 https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image
 https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position
*/
'use strict';
var enchantedGrids = document.querySelectorAll('.page-content .enchanted');
for (var i = 0; i < enchantedGrids.length; i++){
	var link = enchantedGrids[i].querySelector('.sprite').style.getPropertyValue('background-image');
	var pos = enchantedGrids[i].querySelector('.sprite').style.getPropertyValue('background-position');
	var node = document.createElement('span');
    node.className = 'glint';
    node.setAttribute('style', 'mask-image: ' + link + '; mask-position: ' + pos + '; -webkit-mask-image: ' + link + '; -webkit-mask-position: ' + pos );
    enchantedGrids[i].appendChild(node);
}