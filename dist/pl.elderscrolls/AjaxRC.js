!function(e,a,t,r){
	"use strict";

	function i(a,t){
		if(t&&"string"==typeof e[t])return e[t];
		var r=h.wgUserLanguage,
			i=r.split("-")[0];
		return g[r]&&g[r][a]?g[r][a]:g[i]&&g[i][a]?g[i][a]:g.pl[a]
	}

	function o(e){
		return null===localStorage.getItem("AjaxRC-refresh") && localStorage.setItem("AjaxRC-refresh",!0),!0 !== e && !1 !== e || localStorage.setItem("AjaxRC-refresh",e),JSON.parse(localStorage.getItem("AjaxRC-refresh"))
	}

	function n(){
		var e;
		return(e=a(".firstHeading")).length?e:!!(e=a("#PageHeader .page-header__page-subtitle")).length && e
	}

	function l(){
		var e=a("<div>");
		e.load(A+" #mw-content-text",function(){
			var r=e.children("#mw-content-text");
			r.length && (a("#mw-content-text").replaceWith(r),t.util.$content=r),c=setTimeout(l,3e5)
		}),e.remove()
	}

	function s(){
		a("#ajaxToggle").prop("checked")?(o(!0),l()):(o(!1),clearTimeout(c))
	}

	function u(){
		var u,c=n(),
			g=a('<span id="ajaxRefresh">').append(a('<label id="ajaxToggleText" for="ajaxToggle" title="'+i("refreshHover")+'">'+i("refreshText")+":</label>"),a('<input id="ajaxToggle" type="checkbox">'),a('<span id="ajaxLoadProgress" style="display:none">').append(a('<img alt="'+i("loadStatusAlt",!1)+'" src="'+f+'">')));
		!1===c?a("#WikiaArticle").prepend(g):c.append(g),u=g.find("#ajaxLoadProgress"),a(document).ajaxSend(function(e,a,t){
			A===t.url && u.show()
		}).ajaxComplete(function(i,o,n){
			var l,s=a("#mw-content-text").find(".mw-collapsible"),
				c=e.ajaxCallAgain || [];
			if(A===n.url)
				for(u.hide(),s.length && s.makeCollapsible(),"Recentchanges"===h.wgCanonicalSpecialPageName && (t.special.recentchanges.init(),a(".mw-recentchanges-table").find(".WikiaDropdown").length && r.RecentChanges.init()),"WikiActivity"===h.wgCanonicalSpecialPageName && e.WikiActivity.init(),l=0; l < c.length; l++) a.isFunction(c[l])?c[l]():console.log("AjaxRC Error: Could not call non-function after reload.")
		}),a("#ajaxToggle").attr("checked",o()).click(s),o() && l()
	}
	var c,g ={
			en:{
				refreshText: "AJAX",
				loadStatusAlt: "Refreshing page",
				refreshHover: "Enable page auto-refresh"
			},
			be:{
				loadStatusAlt: "Абнаўленне старонак",
				refreshHover: "Ўключыць аўтаматычнае абнаўленне загружанай старонкі"
			},
			bg:{
				refreshHover: "Обнови тази страница автоматично"
			},
			bs:{
				refreshHover: "Uključi auto-ažuriranje za ovu stranicu"
			},
			ca:{
				refreshHover: "Actualiza aquesta pàgina automàticament"
			},
			cs:{
				loadStatusAlt: "Obnovování stránky",
				refreshHover: "Automaticky obnovit tuto stránku"
			},
			da:{
				refreshHover: "Opdater siden automatisk"
			},
			de:{
				loadStatusAlt: "Aktualisiere Seite",
				refreshHover: "Aktiviere die automatische Aktualisierung der Seite"
			},
			el:{
				refreshHover: "Ανανέωση αυτής σελίδας"
			},
			eo:{
				refreshHover: "Ĝisdatigu ĉi tiun paĝon aŭtomate"
			},
			es:{
				loadStatusAlt: "Actualizando página",
				refreshHover: "Actualizar esta página automáticamente"
			},
			eu:{
				refreshHover: "Orrialde hau automatikoki eguneratu"
			},
			fr:{
				refreshHover: "Actualiser automatiquement la page"
			},
			fy:{
				loadStatusAlt: "Side ferfarskje",
				refreshHover: "Ferfarskje dizze side Automatysk"
			},
			ga:{
				refreshHover: "Athnuaigh an leathanach seo go huathoibríoch"
			},
			gl:{
				refreshHover: "Actualizar a páxina automaticamente"
			},
			hr:{
				refreshHover: "Uključi auto-ažuriranje za ovu stranicu"
			},
			it:{
				refreshHover: "Aggiorna automaticamente la pagina"
			},
			ja:{
				loadStatusAlt: "自動更新",
				refreshHover: "このページを自動的に更新します"
			},
			ko:{
				loadStatusAlt: "문서 새로고침",
				refreshHover: "문서 자동 새로고침 활성화"
			},
			la:{
				refreshHover: "Hanc paginam automatice renovare"
			},
			mo:{
				refreshHover: "Актуализаци ачастэ паӂинэ ын мод аутомат"
			},
			nl:{
				loadStatusAlt: "Pagina verversen",
				refreshHover: "Ververs deze pagina automatisch"
			},
			"nl-informal":{
				loadStatusAlt: "Pagina verversen",
				refreshHover: "Ververs deze pagina automatisch"
			},
			no:{
				refreshHover: "Oppdater siden automatisk"
			},
			oc:{
				refreshHover: "Actualizatz aquesta pagina automaticament"
			},
			pl:{
				loadStatusAlt: "Odświeżanie strony",
				refreshHover: "Aktywuj automatyczne odświeżanie strony",
				refreshText: "Auto-odświeżanie"
			},
			pt:{
				refreshHover: "Actualizar a página automaticamente"
			},
			"pt-br":{
				loadStatusAlt: "Atualizando página",
				refreshHover: "Ativa a atualização automática da página"
			},
			ro:{
				refreshHover: "Actualizaţi această pagină în mod automat"
			},
			ru:{
				loadStatusAlt: "Обновление страниц",
				refreshHover: "Включить автоматическое обновление загружаемой страницы"
			},
			sr:{
				refreshHover: "Укључи ауто-ажурирање за ову страницу"
			},
			sv:{
				refreshHover: "Uppdatera sidan automatiskt"
			},
			tr:{
				refreshHover: "Otomatik yenilenen sayfa yüklemelerine izin ver"
			},
			uk:{
				loadStatusAlt: "Оновлення сторінок",
				refreshHover: "Увімкнути автоматичне оновлення завантаженої сторінки"
			},
			val:{
				refreshHover: "Actualisar esta pàgina automàticament"
			},
			zh:{
				loadStatusAlt: "正在刷新页面",
				refreshHover: "自动刷新页面"
			},
			"zh-hant":{
				loadStatusAlt: "正在重整頁面",
				refreshHover: "自動重新載入頁面更動"
			}
		},
		h=t.config.get(["stylepath","wgAction","wgCanonicalSpecialPageName","wgPageName","wgUserLanguage"]),
		f="https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427024725&path-prefix=pl",
		p=["Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony","Specjalna:Aktywność_na_wiki/activity","Specjalna:Aktywność_na_wiki/watchlist"],
		A=location.href.replace(/#[\S]*/,"");
	a(function(){(p.indexOf(h.wgPageName)>-1)&&!a("#ajaxToggle").length&&-1===["delete","edit","protect","revisiondelete"].indexOf(h.wgAction)&&u()})
}(this,jQuery,mediaWiki,Wikia);