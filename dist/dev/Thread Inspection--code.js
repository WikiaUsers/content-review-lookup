var ThreadInspection = {},
    mw = window.mw,
    $ = window.jQuery;

/* ========= *\
	# i18n
\* ========= */

// wiki language
ThreadInspection.lang = mw.config.get("wgContentLanguage");

// i18n
ThreadInspection.i18n = {
	// english
	en: {
		reviewAll: "Review all messages",
		reviewTitle: "Review current message",
		viewText: "v",
		viewTitle: "View",
		editText: "e",
		editTitle: "Edit",
		deleteText: "d",
		deleteTitle: "Delete"
	},
	tr: {
		reviewAll: "Tüm mesajları inceleyin",
		reviewTitle: "Mevcut mesajı inceleyin",
		viewText: "g",
		viewTitle: "Görüntüle",
		editText: "d",
		editTitle: "Düzenle",
		deleteText: "s",
		deleteTitle: "Sil"
	},
    zh: {
        "reviewAll": "查看所有留言",
        "reviewTitle": "查看当前留言",
        "viewText": "查",
        "viewTitle": "查看",
        "editText": "编",
        "editTitle": "编辑",
        "deleteText": "删",
        "deleteTitle": "删除"
    },
    'zh-hans': {
        "reviewAll": "查看所有留言",
        "reviewTitle": "查看当前留言",
        "viewText": "查",
        "viewTitle": "查看",
        "editText": "编",
        "editTitle": "编辑",
        "deleteText": "删",
        "deleteTitle": "删除"
    },
    'zh-hant': {
        "reviewAll": "查看所有留言",
        "reviewTitle": "查看當前留言",
        "viewText": "查",
        "viewTitle": "查看",
        "editText": "編",
        "editTitle": "編輯",
        "deleteText": "刪",
        "deleteTitle": "刪除"
        
    },
	'pt-br': {
		"reviewAll": "Revisar todas as mensagens",
		"reviewTitle": "Revisar a mensagem atual",
		"viewText": "v",
		"viewTitle": "Visualizar",
		"editText": "e",
		"editTitle": "Editar",
		"deleteText": "d",
		"deleteTitle": "Excluir"
    },
};

// local messages (english if local language not available)
ThreadInspection.local = ThreadInspection.i18n[ThreadInspection.lang] || ThreadInspection.i18n.en;

/* ================ *\
	# functions
\* ================ */

ThreadInspection.fn = {};

// get json
ThreadInspection.fn.miniJsonXhr = function(url, cb) {
	var a = new XMLHttpRequest();
	a.open("GET", url, true);
	a.onload = function() {
		cb(JSON.parse(a.responseText));
	};
	a.send();
};

// add ti buttons to messages by message ids
ThreadInspection.fn.buttonfy = function(ids) {
	ThreadInspection.fn.miniJsonXhr(mw.config.get("wgScriptPath") + "/api/v1/Articles/Details?ids=" + ids.join(","), function(data) {
		for (var i = 0; i < ids.length; i++) {
			var url = data.items[ids[i]].url.replace(/ /g, "_"),
				msgView = url + "?redirect=no",
				msgEdit = url + "?redirect=no&action=edit",
				msgDelete = url + "?redirect=no&action=delete",
				markup = '&nbsp;&nbsp;&nbsp;' +
						'<span style="font-size: 11px; line-height: 8px">(' +
							'<a href="' + msgView + '" title="' + ThreadInspection.local.viewTitle + '">' + ThreadInspection.local.viewText + '</a>' +
							' <span style="font-size: 7px;">&#x2022;</span> '	+
							'<a href="' + msgEdit + '" title="' + ThreadInspection.local.editTitle + '">' + ThreadInspection.local.editText + '</a>' +
							' <span style="font-size: 7px;">&#x2022;</span> '	+
							'<a href="' + msgDelete + '" title="' + ThreadInspection.local.deleteTitle + '">' + ThreadInspection.local.deleteText + '</a>' +
						')</span>',
				nest = $('li[data-id="' + ids[i] + '"].message');
			if (i === 0) {
				$(nest).find("a.permalink").first().after(markup);
			} else {
				$(nest).find("a.permalink").after(markup);
			}
			console.info({
				nest: $(nest).html(),
				markup: $(markup).html(),
				id: ids[i]
			});
		}
	});
};

/* ====================================================== *\
	# the ability to review deleted messages in the forum
\* ====================================================== */

/* manual removal - view a removed message by clicking it */
$(function() {
	$("#Wall .replies .hide").attr({
		title: ThreadInspection.local.reviewTitle,
		style: "cursor: hand; cursor: pointer;"
	});
	$("#Wall .replies .hide").one("mousedown", function() {
		var msg = this,
			//msg = $('[data-id="494269"]').eq(0), //@@@
			pageid = Number($(msg).attr("data-id"));
		$(msg).css("cursor", "wait");
		ThreadInspection.fn.miniJsonXhr(mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&prop=revisions&rvprop=ids|user&rvparse&rvlimit=1&rvdir=newer&pageids=" + pageid, function(data) {
			var rev0 = data.query.pages[pageid].revisions[0];
			ThreadInspection.fn.miniJsonXhr(mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&prop=revisions&rvprop=ids|user|content|timestamp&rvparse&rvlimit=1&rvdir=older&pageids=" + pageid, function(data) {
				var revZ = data.query.pages[pageid].revisions[0];
				window.rev0 = rev0;window.revZ = revZ;
				ThreadInspection.fn.miniJsonXhr(mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&list=users&ususers=" + encodeURIComponent(rev0.user), function(data) {
					ThreadInspection.fn.miniJsonXhr(mw.config.get("wgScriptPath") + "/api/v1/User/Details?size=30&ids=" + data.query.users[0].userid, function(data) {
						var userData = data.items[0],
							date = revZ.timestamp.match(/(\d{4,})\-(\d{2})\-(\d{2})T(\d{2}\:\d{2})/).slice(1), // [year, month, day, hh:mm]
							time = date[3] + ", " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Number(date[1])-1] + " " + Number(date[2]) + ", " + date[0];
						window.userData = userData;
						$(msg).append(
							'<div class="speech-bubble-avatar"><a href="' + mw.util.getUrl("User:" + rev0.user) + '"><img src="' + userData.avatar + '" class="avatar" alt="' + rev0.user + '"></a></div>',
							'<div class="speech-bubble-message">' +
								'<div class="MiniEditorWrapper" data-min-height="100" data-max-height="400"><div class="edited-by">' +
									'<a href="' + mw.util.getUrl("User:" + rev0.user) + '">' + rev0.user + '</a></div>' +
										'<div class="editarea" data-space-type="editarea">' +
											'<div class="msg-body" id="WallMessage_' + pageid + '">' +
												revZ["*"] +
											'</div>' +
									'</div>' +
									'<div class="msg-toolbar">' +
										'<div class="timestamp">' +
											(rev0.revid != revZ.revid ? (revZ.comment || "Edited") + ' by <a class="username" href="' + mw.util.getUrl("User:" + revZ.user) + '">' + revZ.user + '</a> ' : "") +
											'<a class="permalink"><span>' + time + '</span></a>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>'
						);
						ThreadInspection.fn.buttonfy([pageid]);
						$(msg).removeClass("hide").removeAttr("title style");
					});
				});
			});
		});
	});
});

/* absolute removal - view all removed messages at once */
if ($("body.ns-1201 #Wall .replies .hide").length > 0) { 
	$("#my-tools-menu").prepend('<li class="overflow"><a style="cursor: hand; cursor: pointer;" data-name="undeleteBoardThreadMessages">' + ThreadInspection.local.reviewAll + '</a></li>\n');
	$('#my-tools-menu .overflow a[data-name="undeleteBoardThreadMessages"]').click(function() {
		$("#Wall .replies .hide")
			.removeClass("hide")
			.removeAttr("title style");
	});
}

/* ============================================= *\
	# adding quick links to delete + view + edit
\* ============================================= */

$(function() {
	// set static variables
	var a = []; // list of article ids of the comments
	$("li[id].message").each(function() {
		a.push($(this).attr("data-id"));
	});
	ThreadInspection.fn.buttonfy(a);
});

/* ======================================== *\
	# warn users upon omitting ac_metadata tag
\* ======================================== */

if (mw.config.get("wgNamespaceNumber") == 2001 && ["edit", "submit"].indexOf(mw.config.get("wgAction")) > -1 && mw.config.get("wgTitle").split("/").length == 2) {
	$("form#editform .module_content").append(
		'<div id="boardthread-acmetadata-warning" style="display: none; margin-top: 5px; padding: 2px 4px; background: #f90; border: 1px solid #f52; color: #754;">' +
			'Your message is missing the <code class="explain" title="All main messages in a forum thread require the ac_metadata tag. Omitting it could cause issues with the forum and may require undoing your edit.">ac_metadata</code> tag!' +
		'</div>'
	);
	$("#wpTextbox1").on("keyup", function() {
		var containsACMetaData = /\<ac_metadata/.test(this.value);
		$("#boardthread-acmetadata-warning")[containsACMetaData ? "hide" : "show"]();
	});
}