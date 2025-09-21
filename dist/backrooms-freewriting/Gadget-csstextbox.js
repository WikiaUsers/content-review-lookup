(function () {
    var $rail = $('#WikiaRail');
    if ($rail[0] && !$rail.filter('.loaded, .is-ready')[0]) {
        $rail.on('afterLoad.rail', function () {
	let customValue = {
	            	content:'/* quick CSS file */\nexample {example:example;}'
	            };
	        
	            const CSS = document.createElement('div');
	            CSS.setAttribute('id', 'quickCSS-parent');
	            CSS.style.height = '35vh';
	            CSS.style.width = '15.95vw';
	            CSS.style.border = 'solid white 2px';
	            CSS.style.borderRadius = '3px';
	            CSS.style.marginTop = '10px';
	            CSS.style.overflowX = 'hidden';
	            document.getElementsByClassName("rail-module recent-wiki-activity")[0].innerHTML = "";
	            document.getElementsByClassName("rail-module recent-wiki-activity")[0].appendChild(CSS);
	            const CSSEditor = document.createElement('textarea');
	            CSSEditor.setAttribute('id', 'quickCSS');
	            CSSEditor.style.height = '360vh';
	            CSSEditor.style.width = '15.95vw';
	        //    CSSEditor.style.marginTop = '10px';
	            CSSEditor.style.overflowX = 'hidden';
	            CSSEditor.style.background = 'black';
	            CSSEditor.style.color = '#ffffff';
	            CSSEditor.style.fontSize = '120%';
	            document.getElementById("quickCSS-parent").appendChild(CSSEditor);
	            const cssE = document.createElement('style');
	            cssE.setAttribute('id', 'quickcssid');
	            document.body.appendChild(cssE);
	             document.querySelector('#quickCSS').value = customValue.content;
	            function enableCSS() {
	            	document.getElementById('quickcssid').innerHTML = document.querySelector('#quickCSS').value;
	            	setTimeout(enableCSS, 100);
	            } 
	           enableCSS();
	        });
    }
})();