(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
		var container = $(this);
		function switchTab(offset) {
			return function() {
				var tabs = container.children(".sitenotice-tab").toArray();
				var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
				var count = tabs.length;
				if (no < 1) no = count;
				else if (no > count) no = 1;
				for (var i = 0; i < count; i++)
					tabs[i].style.display = (i + 1 == no ? null : "none");
				container.find(".sitenotice-tab-no")[0].innerText = no;
			};
		}
		container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
		container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
	});
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});

function getIeVersion() {
            var userAgent = navigator.userAgent; 
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; 
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion > 6){
                    return fIEVersion;
                }else{
                    return 6;
                }
            } else if(isEdge) {
                return 'edge';
            } else if(isIE11) {
                return 11;  
            }else{
                return -1;
            }
        }

        function setClipboardText(event, maxCount){
            var IEVersion = getIeVersion();
            if(IEVersion>-1 && IEVersion!='edge' && IEVersion<11){
                window.event.returnValue = false;
            }else{
                event.preventDefault();
            }

            var textData = '';
            var htmlData = '';
            if(IEVersion>-1 && IEVersion!='edge' && IEVersion<11){
                textData = document.selection.createRange().text;
                htmlData = document.selection.createRange().htmlText;
            }else{

                var selectRange = window.getSelection().getRangeAt(0);

                textData = selectRange.toString();

                var node = document.createElement('div');
                node.appendChild(selectRange.cloneContents());
                htmlData = node.innerHTML;

            }

            if(textData.length >= 1){
                var url = window.location.href;
                var appendText =
                    '\n------------------------------------\n'
                    + '此引用内容源自天堂侦探社数据资料库\n'
                    + 'Copyright © Heaven Detective Agency\n';

                textData += appendText;
                htmlData = '<div>' + htmlData + appendText.replace(/\n/g, '<br>'); + '</div>';
            }
            if(IEVersion>-1 && IEVersion!='edge'){
                return window.clipboardData.setData("text", textData);
            } else {
                event.clipboardData.setData("text/html", htmlData);
                event.clipboardData.setData("text/plain",textData);
            }
        }

        document.body.oncopy = function(e) {
            setClipboardText(e, 1);
        }