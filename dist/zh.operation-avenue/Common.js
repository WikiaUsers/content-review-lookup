/* Security Instructions */
/* The following source code controls the behavior of the web page which is affecting the cybersecurity of this website. According to Site Rules, title 4, section 8 and title 10, section 6, the editing or infiltration of information contained herein, in any manner, by an unauthorized person is prohibited. */
/* Le code source suivant contrôle le comportement de la page Web qui affecte la cybersécurité de ce site Web. Selon les règles du site, titre 4, section 8 et titre 10, section 6, il est interdit de modifier ou d’infiltrer les informations contenues dans le présent document, de quelque manière que ce soit, par une personne non autorisée. */
/* Der folgende Quellcode steuert das Verhalten der Webseite, was die Cybersicherheit dieser Website beeinträchtigt. Gemäß den Site-Regeln, Titel 4, Abschnitt 8 und Titel 10, Abschnitt 6, ist die Bearbeitung oder Infiltration der hierin enthaltenen Informationen in irgendeiner Weise durch eine unbefugte Person verboten. */
/* 下列源代码中含有控制网页行为的语句，其可能会对网络安全造成影响。依据本站站规第四部分第8条与第十部分第6条，未经授权人员以任何方式对于本页面信息进行编辑与渗透均不被允许。 */
/* 下列原代碼中含有控制網頁行為的語句，其可能會對網路安全造成影響。依據本站站規第四部分第8條與第十部分第6條，未經授權人員以任何方式對於本頁面信息進行編輯與滲透均不被允許。*/

/* JavaScript of Operation Avenue Wiki */
/* October 2025 (Version:2.0) */

/* Basic JavaScript Feature, by M.E.G.CN & C.H.P.*/
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

/* Back To Top Button, by WikiMedia Inc. & Fandom Developers Wiki */
window.BackToTopSpeed = 100;
window.BackToTopText = "Back To Top";
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ModernBackToTopButton/code.js',
    ]
});

/* Wallgreeting, by WikiMedia Inc. & Fandom Developers Wiki */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});

/* Import Scripts, by C.H.P. */
mw.hook("wikipage.content").add(function () {

    $("span.import-script").each(function () {
        var $this = $(this);
        var scriptContent = $this.attr("data-script");
        var pageName = $this.attr("data-page");
        
        if (scriptContent) {
            try {
                (new Function(scriptContent))();
                console.log("JavaScript加载成功: " + pageName);
            } catch (error) {
                console.error("JavaScript执行错误 (" + pageName + "):", error);
                $this.after('<strong class="error">JavaScript执行错误: ' + error.message + '</strong>');
            }
        }
    });
});