/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to VSTF by VegaDark
@ License: CC-BY-NC-SA
*/


// Variables for later on
// Keep these in an object for organization
var fil = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    username: mw.config.get('wgUserName')
};


// Add buttons 
if (fil.pagename === "Report:Spam_filter_problems") {
    var buttonappend = '<a class="wikia-button" id="spam-submit" onclick="openFormFilter()">Report False Positives</a>';
    document.getElementById("lang-EN").innerHTML = buttonappend;
}


// This opens the form for the users to fill out

function openFormFilter() {
    $.showCustomModal('Report Spam Filter', '<form class="WikiaForm" method="" name="" id="filter"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Wiki Name</span><br><input id="wikiname" type="text" placeholder="VSTF Wiki" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Wiki URL and Pagename</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="vstf" style="width:100px"/><span style="color:gray">.wikia.com/wiki/</span><input id="wikipagename" type="text" placeholder="Report:Spam_filter_problems" style="width:200px"/><br><span style="font-weight:bold">Block ID Number</span><br><input id="block" type="text" placeholder="12345 (without #)" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">What did you try to do?</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Add your comments here"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancel",
            handler: function () {
                cancelformFilter();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Save",
            handler: function () {
                submitformFilter();
            }
        }]
    });
}

// Closes the form

function cancelformFilter() {
    $("#requestWindow").closeModal();
}

// Submits the form

function submitformFilter() {
    console.log('Saving...');
    var $form = $('#filter'),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
		pagename = $form.find("#wikipagename").val(),
        block = $form.find('#block').val(),
        comments = $form.find('#comment').val(),
        page = '*Wiki: http://' + url + '.wikia.com\n*Page: http://' + url + '.wikia.com/wiki/' + encodeURIComponent(pagename) + '\n*Block ID: http://community.wikia.com/wiki/Special:PhalanxStats/' + block + '\n\n*What did you try to do?: ' + comments + '\n*Signature: ' + fil.signature + '';
    // If url or header is blank, return alerts
    if (!url) {
        alert('You forgot a link!');
        return;
    }
    if (!wikiname) {
        alert('You forgot a name!');
        return;
    }
	if (!pagename) {
		alert('You forgot the pagename!');
		return;
	}
    if (!block) {
        alert('You forgot the block ID!');
        return;
    }
    if ( url.match( /(\/| |%20|_)/ ) ) {
        alert('Incorrectly entered the Wiki URL. Please do NOT copy/paste the URL, but just type in the suddomain (ie VSTF in http://vstf.wikia.com/wiki/Report:Spam_filter_problems) Do NOT use spaces, use dashes (-) instead');
        return;
    }
    console.log('Checking...');


    // Ajax URL
    url = fil.server + '/api.php?action=edit&token=' + encodeURIComponent(fil.edittoken) + '&title=Report:Spam_filter_problems&section=new&sectiontitle=' + wikiname + '&text=' + encodeURIComponent(page) + '&summary=New+filter+problem+(' + wikiname + ',%20%23' + block + ')';
    console.log('Got the url: ', url);

    $.post(url, function (r) {
        console.log('Should be done now:', r);
        cancelformFilter();
        window.location.reload();
    });
    console.log('Sent request...');
}
/*</nowiki>*/