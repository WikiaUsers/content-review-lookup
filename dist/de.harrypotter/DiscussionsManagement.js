var discuData = JSON.parse($('script[id="head-data-store"][type="x-head-data-store"]').text());
var discuURL = 'https://services.fandom.com/discussion/' + discuData.wikiVariables.id + '/';
var apiURL = '//' + discuData.wikiVariables.dbName.replace(new RegExp('(' + discuData.wikiVariables.language.content + ')'), discuData.wikiVariables.language.content + '.') + '.fandom.com/api.php';
var userInfo = JSON.parse($('script[id="shoebox-user"][type="fastboot/shoebox"]').text());

function getReports(callback) {
	$.getJSON(apiURL,{
        action: 'query',
        prop: 'revisions',
        rvprop: 'content',
        titles: 'MediaWiki:Custom-Discussions-Reports.json',
        format: 'json',
        indexpageids: true
    }, function(result) {
        var pageId = result.query.pageids[0];
        if(pageId === '-1' && result.query.pages[pageId].hasOwnProperty('missing')) {
            callback([]);
        }
        else {
            callback(JSON.parse(result.query.pages[result.query.pageids[0]].revisions[0]['*']));
        }
    });
}
 
function discussionsNotification(addRemove, id, content) {
    if (addRemove) {
        if(!$('#discussions-notification-area').length) {
            $('.discussion-wrapper').prepend(
                $('<div />', { id: 'discussions-notification-area' }).css({
                    'background-color': '#731111',
                    color: 'white',
                    padding: '20px 10px'
                })
            );
        }
        $('#discussions-notification-area').append(
            $('<p />', { id: 'discussion-notification-' + id }).html(content)
        );
    }
    else {
        if(!!$('#discussions-notification-area > #discussion-notification-' + id)) {
            $('#discussions-notification-area > #discussion-notification-' + id).remove();
            if (!$('#discussions-notification-area').children().length) {
                $('#discussions-notification-area').remove();
            }
        }
        else {
            console.error('Could not find notification with it "' + id + '"');
        }
    }
}

$(document).ready(function() {
    $('.post-reply').on('click','.report-link', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var postId = $(this).closest('.discussion-reply').attr('id').replace('reply-','');
        $(this).closest('.more-options-pop-over').html('<!---->\<!---->');
        modalDialog = openModalDialog('report-post-modal', $('<div />').append(
            'Soll diese Antwort den Moderatoren gemeldet werden? Diese Aktion kann nicht rückgängig gemacht werden.',
            $('<input />', { type: 'hidden', value: postId, id: 'report-post-id' }),
            $('<select />', { id: 'report-reason-select' }).append(
                $('<option />', { text: "Select", disabled: true, selected: true }),
                $('<option />', { text: "A" }),
                $('<option />', { text: "B" })
            )
        ).html(), function(modalDialog) {
            modalDialog.el.find('.confirm-button').prop('disabled', true);
            modalDialog.el.find('#report-reason-select').on('change',function() {
                $('.discussion-dialog #report-post-modal .confirm-button').prop('disabled', false);
            });
        }, function(modalDialog) {
            //reportPost($('#report-post-id').val());
            storeReport($('#report-post-id').val(), userInfo.userId, $('#report-reason-select').val());
            modalDialog.close();
        }, 'Antwort melden');
    });
     
    $('.post-reply').on('click', '.validate-link', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var postId = $(this).closest('.discussion-reply').attr('id').replace('reply-','');
        $(this).closest('.more-options-pop-over').html('<!---->\<!---->');
        modalDialog = openModalDialog('validate-post-modal', $('<div />').append(
            $('<h3 />', { text: 'Antwort genehmigen???' }),
            'Wenn du diese Antwort genehmigst, wird die Markierung entfernt.',
            $('<input />', { type: 'hidden', value: postId, id: 'validate-post-id' }),
            $('<select />', { id: 'validate-reason-select' }).append(
                $('<option />', { text: "Select", disabled: true, selected: true }),
                $('<option />', { text: "A" }),
                $('<option />', { text: "B" })
            )
        ).html(), function(modalDialog) {
            modalDialog.el.find('.confirm-button').prop('disabled', true);
            modalDialog.el.find('#validate-reason-select').on('change',function() {
                $('.discussion-dialog #validate-post-modal .confirm-button').prop('disabled', false);
            });
        }, function() {
            reportPost(postId, true);
            rejectReport($('#report-post-id').val(), userInfo.userId, $('#report-reason-select').val());
        }, 'Genehmigen');
    });
 
    $('.post-reply.is-reported').each(function() {
        var id = $('.discussion-reply').attr('id').replace('reply-','');
        console.log(id);
    });
});
 
function reportPost(postId,_valid) {
    if(arguments.length == 1 || _valid) {
        isValid = (arguments.length == 2 && _valid ? '/valid' : '');
        $.ajax({
            url: discuURL + 'posts/' + postId + '/report' + isValid,
            method: 'PUT',
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true
        });
    }
    else if(arguments.length == 2 && !!_valid) {
        deletePost(postId,true);
    }
}
 
function storeReport(postId, userId, reason) {
    var date = new Date();
	getReports(function(reports) {
        var report = {
            id: reports.length,
            postId: postId,
            userId: userId,
            reason: reason,
            date: date.toISOString()
        };
		reports.push(report);
		setReports(reports);
    });
}

function setReports(reports, callback) {
    var date = new Date();
	getEditToken(function(editToken) {
        $.post(apiURL, {
            action: 'edit',
            title: 'MediaWiki:Custom-Discussions-Reports.json',
            summary: 'report something"',
            text: JSON.stringify(reports),
            basetimestamp: date.getTime(),
            starttimestamp: date.getTime(),
            tags: 'apiedit',
            token: editToken,
            format: 'json'
        });
    });
}
 
function rejectReport(postId, userId, reason) {	
	var date = (new Date()).toISOString();
	getReports(function(reports) {
		var reportIdx = reports.findIndex(function(report) {
			return report.postId === postId;
        });
		if (reportIdx !== -1) {
			reports[reports].validation = {
				userId: userId,
				date: date.toISOString(),
				reason: reason
            };
			setReports(reports);
        }
    });
	console.log(arguments, date);
}
 
function openModalDialog(id, content, callback, onClick, submitLabel) {
    modalDialog = {};
    modalDialog.close = function() {
        $(this).closest('.discussion-dialog').empty().hide();
    };
    modalDialog.el = $('<div />',{ id: id, class: "modal-dialog-wrapper info modal-dialog-posting-not-allowed ember-view" }).append(
        $('<div />',{ class: "modal-dialog-layover" }),
        $('<div />',{ class: "modal-dialog" }).append(
            $('<div />', { class: "modal-dialog-content" }).append(content),
            $('<footer />').append(
                $('<button />', { class: "active-element-theme-color cancel-button", text: 'Abbrechen', click: modalDialog.close }),
                $('<button />', { class: "active-element-theme-color confirm-button", text: submitLabel, click: onClick.bind(this, modalDialog) })
            )
        )
    );
    $('.discussion-wrapper > .ember-view > .discussion-dialog').show().html(modalDialog.el);
    if (typeof callback === "function") {
        callback(modalDialog);
    }
    return modalDialog;
}

function getEditToken(callback) {
    $.getJSON(apiURL, {
        action: 'query',
        prop: 'info',
        titles: 'MediaWiki:Custom-Discussions-Reports.json',
        intoken: 'edit',
        indexpageids: true,
        format: 'json'
    }, function(res) {
        callback(res.query.pages[res.query.pageids[0]].edittoken);
    });
}