! function(e, i, r) {
	(r = e.extend(r, {})).run = !1;
	var a = {
		be: {
			expiry: "Заканчэнне блакавання: ",
			reason: "Прычына блакавання: ",
			success: "Карыстальнік быў заблакаваны",
			emptyvariables: "Вам трэба пазначыць тэрмін блакавання і нікнэйм карыстальніка.",
			blockbutton: "Заблакаваць удзельніка",
			cancelbutton: "Зачыніць",
			rollbacksuccess: "Праўка была откачена",
			loading: "Загружаецца. Калі ласка, пачакайце...",
			errorapi: "Памылка: Вернутая памылка API",
			namebutton: "Адлюстраваць назву",
			previewbutton: "Паказаць старонку",
			diffpreviewof: "Адлюстраванне праўкі на старонцы: ",
			diffpreview: "Адлюстраванне праўкі",
			pageviewver: "Прагляд старонкі",
			vandalism: "Вандалізм"
		},
		de: {
			expiry: "Sperrdauer: ",
			reason: "Sperrgrund: ",
			success: "Benutzer wurde gesperrt.",
			emptyvariables: "Du musst den zu sperrenden Benutzer und die Sperrdauer angeben.",
			blockbutton: "Sperre den Benutzer",
			cancelbutton: "Abbrechen",
			rollbacksuccess: "Bearbeitung wurde zurückgesetzt",
			loading: "Wird geladen, bitte warten...",
			errorapi: "Fehler: die API gab einen Fehlercode zurück",
			namebutton: "Zeige den Namen der Seite",
			previewbutton: "Zeige Vorschau der Seite",
			diffpreviewof: "Vorschau der Änderungen von: ",
			diffpreview: "Vorschau der Änderungen",
			pageviewver: "Seiten-Anzeiger",
			vandalism: "Vandalismus"
		},
		en: {
			expiry: "Block duration: ",
			reason: "Block reason: ",
			success: "User has been blocked",
			emptyvariables: "You have to enter block's expiry and user to block.",
			blockbutton: "Block the user",
			cancelbutton: "Cancel",
			rollbacksuccess: "Edit has been rollbacked",
			loading: "Loading, please wait...",
			errorapi: "Error: API returned error code",
			namebutton: "Display page's name",
			previewbutton: "Preview the page",
			diffpreviewof: "Diff Preview of: ",
			diffpreview: "Diff Preview",
			pageviewver: "Page Viewer",
			vandalism: "Vandalism"
		},
		es: {
			expiry: "Duración de bloqueo: ",
			reason: "Razon de bloqueo: ",
			success: "El usuario há sido bloqueado.",
			emptyvariables: "Debes definir la duración del bloqueo y el usuario a bloquear.",
			blockbutton: "Bloquear usuario",
			cancelbutton: "Cancelar",
			rollbacksuccess: "La edición ha sido revertida.",
			loading: "Cargando, por favor espere...",
			errorapi: "Error: el API devolvio un codigo de error",
			namebutton: "Mostrar el nombre de la pagina",
			previewbutton: "Mostrar la pagina",
			diffpreviewof: "Ver dif de: ",
			diffpreview: "Demuestración de dif",
			pageviewver: "Vistazo de la pagina",
			vandalism: "Vandalismo"
		},
		fr: {
			expiry: "Durée du blocage :",
			reason: "Motif du blocage :",
			success: "L'utilisateur a été bloqué avec succès.",
			emptyvariables: "Merci de rentrer la durée du blocage ainsi que l'utilisateur à bloquer",
			blockbutton: "Bloquer l'utilisateur",
			cancelbutton: "Annuler",
			rollbacksuccess: "La modification a été révoqué",
			loading: "Chargement, merci de patienter...",
			errorapi: "Erreur: l'API a retourné le code d'erreur",
			namebutton: "Afficher le nom de la page",
			previewbutton: "Afficher la page",
			diffpreviewof: "Diff Preview of: ",
			diffpreview: "Diff Preview",
			pageviewver: "Page Viewer",
			vandalism: "Vandalism"
		},
		pl: {
			expiry: "Czas trwania blokady: ",
			reason: "Powód blokady: ",
			success: "Użytkownik został zablokowany",
			emptyvariables: "Musisz wprowadzić czas trwania i użytkownika, aby zablokować.",
			blockbutton: "Zablokuj użytkownika",
			cancelbutton: "Anuluj",
			rollbacksuccess: "Edycja została cofnięta",
			loading: "Ładowanie, proszę czekać...",
			errorapi: "Błąd: API zwróciło błąd",
			namebutton: "Wyświetl nazwę strony",
			previewbutton: "Podgląd strony",
			diffpreviewof: "Podgląd zmian dla: ",
			diffpreview: "Podgląd zmian",
			pageviewver: "Podgląd strony",
			vandalism: "Wandalizm"
		},
		ru: {
			expiry: "Окончание блокировки: ",
			reason: "Причина блокировки: ",
			success: "Пользователь был заблокирован",
			emptyvariables: "Вам нужно указать срок блокировки и никнейм пользователя.",
			blockbutton: "Заблокировать участника",
			cancelbutton: "Закрыть",
			rollbacksuccess: "Правка была откачена",
			loading: "Загружается. Пожалуйста, подождите...",
			errorapi: "Ошибка: Возвращённая ошибка API",
			namebutton: "Отобразить название",
			previewbutton: "Показать страницу",
			diffpreviewof: "Отображение правки на странице: ",
			diffpreview: "Отображение правки",
			pageviewver: "Просмотр страницы",
			vandalism: "Вандализм"
		},
		uk: {
			expiry: "Закінчення блокування: ",
			reason: "Причина блокування: ",
			success: "Користувач був заблокований",
			emptyvariables: "Вам потрібно вказати термін блокування і нікнейм користувача.",
			blockbutton: "Заблокувати користувача",
			cancelbutton: "Закрити",
			rollbacksuccess: "Редагування було відкочено",
			loading: "Завантажується. Будь ласка, зачекайте...",
			errorapi: "Помилка: Повернута помилка API",
			namebutton: "Відобразити назву",
			previewbutton: "Показати сторінку",
			diffpreviewof: "Відображення редагування на сторінці: ",
			diffpreview: "Відображення редагування",
			pageviewver: "Переглянути сторінки",
			vandalism: "Вандалізм"
		},
		zh: {
			expiry: "封禁期限: ",
			reason: "封禁原因: ",
			success: "封禁用户成功",
			emptyvariables: "您必须输入封禁'的期限和原因才能封禁",
			blockbutton: "封禁用戶",
			cancelbutton: "取消",
			rollbacksuccess: "编辑已经回退",
			loading: "读取中，请稍候...",
			errorapi: "发生错误: API已返回至错误代码",
			namebutton: "显示页面'的名称",
			previewbutton: "预览页面",
			diffpreviewof: "预览差异",
			diffpreview: "预览差异",
			pageviewver: "页面查看器",
			vandalism: "破坏行为"
		},
		"zh-hant": {
			expiry: "封禁期限: ",
			reason: "封禁原因: ",
			success: "封禁用戶成功",
			emptyvariables: "您必須輸入封禁'的期限和原因才能封禁",
			blockbutton: "封禁用戶",
			cancelbutton: "取消",
			rollbacksuccess: "編輯已經回退",
			loading: "讀取中，請稍候...",
			errorapi: "發生錯誤: API已返回至錯誤代碼",
			namebutton: "顯示頁面'的名稱",
			previewbutton: "預覽頁面",
			diffpreviewof: "預覽差異",
			diffpreview: "預覽差異",
			pageviewver: "頁面查看器",
			vandalism: "破壞行為"
		}
	};
	if (r.expiry = r.expiry || "3 days", r.reason = r.reason || a.vandalism, a = e.extend(a.en, a[i.config.get("wgContentLanguage")], a[i.config.get("wgUserLanguage")]), "WikiActivity" !== wgCanonicalSpecialPageName || !0 === r.run) return !1;

	function t(i) {
		if (0 === e("#DiffView").length) {
			e.showCustomModal(a.pageviewver, '  <form method="" name="" class="WikiaForm ">     <div id="DiffView" style="width:975px; border:3px solid black; word-wrap: break-word;"/>   </form>', {
				id: "page-viewer",
				width: 1e3,
				buttons: [{
					message: a.cancelbutton,
					handler: function() {
						e("#page-viewer").closeModal()
					}
				}]
			}), e("#DiffView").html(i)
		} else e("#DiffView").html(i)
	}

	function o(o) {
		if (0 === e("#diff-preview").length) {
			e.showCustomModal(a.diffpreview, '  <form method="" name="" class="WikiaForm ">     <div id="DiffPreview"/>   </form>', {
				id: "diff-preview",
				width: 900,
				buttons: [{
					message: a.cancelbutton,
					handler: function() {
						e("#diff-preview").closeModal()
					}
				}, {
					id: "shownamebutton",
					message: a.namebutton,
					defaultButton: !1,
					handler: function() {
						! function() {
							e(".mw-rev-head-action > a").eq(0).length > 0 && e("#diff-preview > h1").hide().html(a.diffpreviewof + e(".mw-rev-head-action > a").eq(0).attr("title")).fadeIn(1500);
							var i = e("#diff-preview").css("top").replace("px", "");
							e("html, body").animate({
								scrollTop: i
							}, "fast")
						}()
					}
				}, {
					id: "previewpagebutton",
					message: a.previewbutton,
					defaultButton: !1,
					handler: function() {
						var r, o = e("#mw-diff-ntitle1 > strong > a").attr("title");
						r = i.util.getUrl(o), t('<img src="https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427024725&path-prefix=pl"> ' + a.loading), e.ajax({
							type: "GET",
							url: r,
							success: function(i) {
								var i = e(i).find("#WikiaArticle").html();
								t(i)
							},
							error: function(e) {
								alert(a.errorapi + " : " + e.error.info)
							}
						})
					}
				}, {
					id: "blockbutton",
					message: a.blockbutton,
					defaultButton: !0,
					handler: function() {
						e(this).hasClass("disabled") || function(t, o, n) {
							o || (o = prompt(a.expiry, r.expiry));
							n || (n = prompt(a.reason, r.reason));
							if (!t || !o) return alert(a.emptyvariables), !1;
							e.getJSON(i.util.wikiScript("api"), {
								action: "query",
								prop: "info",
								intoken: "block",
								titles: "User:" + t,
								format: "json"
							}, function(r) {
								var s = r.query.pages;
								e.post(i.util.wikiScript("api"), {
									action: "block",
									user: t,
									expiry: o,
									reason: n,
									nocreate: !0,
									autoblock: !0,
									format: "json",
									token: r.query.pages[Object.keys(s)[0]].blocktoken
								}, function(i) {
									if (i.error) return alert(a.errorapi + " : " + i.error.info), !1;
									alert(a.success), e("#blockbutton").addClass("disabled")
								})
							})
						}(e("#mw-diff-ntitle2 > .mw-userlink").html())
					}
				}]
			}), e("#DiffPreview").html(o)
		} else e("#DiffPreview").html(o);
		if (e("#diff-preview > h1").html(a.diffpreview), o == '<img src="https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427024725&path-prefix=pl"> ' + a.loading) return !1;
		e("#blockbutton").html(a.blockbutton + " (" + e("#mw-diff-ntitle2 > .mw-userlink").html() + ")"), wgUserGroups.indexOf("staff") + wgUserGroups.indexOf("util") + wgUserGroups.indexOf("sysop") + wgUserGroups.indexOf("helper") + wgUserGroups.indexOf("VSTF") === -5 && e("#blockbutton").addClass("disabled"), e("#mw-diff-otitle4").find("a").replaceWith('<a id="diffprev" href="javascript:void(0)" links="' + e("#mw-diff-otitle4").find("a").attr("href") + '">' + e("#mw-diff-otitle4").find("a").html() + "</a>"), e("#mw-diff-ntitle4").find("a").replaceWith('<a id="diffnext" href="javascript:void(0)" links="' + e("#mw-diff-ntitle4").find("a").attr("href") + '">' + e("#mw-diff-ntitle4").find("a").html() + "</a>"), e("#mw-diff-otitle1").prepend('<a id="previousedit" href="javascript:void(0)"> ↑ </a>'), e("#mw-diff-otitle1").prepend('<a id="nextedit" href="javascript:void(0)">↓</a>'), e("#previousedit").click(function() {
			if (e(this).hasClass("disabled")) return !1;
			var i = e('.activityfeed-diff[href*="' + e("span.mw-rev-head-action > a").attr("href").split("oldid=")[1] + '"]').parents("li.activity-type-edit").prevAll("li.activity-type-edit").find(".activityfeed-diff").attr("href");
			if (!i) return e(this).addClass("disabled"), !1;
			n(i)
		}), e("#nextedit").click(function() {
			if (e(this).hasClass("disabled")) return !1;
			var i = e('.activityfeed-diff[href*="' + e("span.mw-rev-head-action > a").attr("href").split("oldid=")[1] + '"]').parents("li.activity-type-edit").nextAll("li.activity-type-edit").find(".activityfeed-diff").attr("href");
			if (!i) return e(this).addClass("disabled"), !1;
			n(i)
		}), e("#diffprev, #diffnext").click(function() {
			if (e(this).hasClass("disabled")) return !1;
			e("#DiffPreview").html('<img src="https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427024725&path-prefix=pl"> ' + a.loading);
			var i = e(this).attr("links");
			setTimeout(n(i), 1e3)
		}), e(".mw-rollback-link > a").replaceWith('<a class="rollbackbutton" title="' + e(".mw-rollback-link > a").attr("title") + '" href="' + e(".mw-rollback-link > a").attr("href") + '">' + e(".mw-rollback-link > a").html() + "</a>"), e(".rollbackbutton").click(function(i) {
			if (e(this).hasClass("disabled")) return !1;
			i.preventDefault(), e.post(e(this).attr("href")), alert(a.rollbacksuccess), e(this).removeAttr("href"), e(this).addClass("disabled")
		}), a.diffpreviewof, e("span.mw-rev-head-action > a").eq(1).attr("title")
	}

	function n(i) {
		o('<img src="https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427024725&path-prefix=pl"> ' + a.loading), e.ajax({
			type: "GET",
			url: i,
			success: function(i) {
				o(i = e(i).find("table.diff").html())
			},
			error: function(e) {
				alert(a.errorapi + " : " + e.error.info)
			}
		})
	}
	r.run = !0, e(".WikiaArticle").on("click", ".activityfeed-diff", function(i) {
		i.preventDefault(), n(e(this).attr("href"))
	}), i.util.addCSS("div#DiffPreview,\n div#DiffView {\n\tmax-height:" + (e(window).height() - 200) + "px;\n}"), window.AjaxDiff = r
}(this.jQuery, this.mediaWiki, window.AjaxDiff)