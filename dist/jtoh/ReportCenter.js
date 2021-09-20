/** <nowiki>
 * @name: ReportCenter.js
 * @description: Creates a form for making reports.
 * @author: TheAnanymousMaster (borrows lots of code from Community Central's "Adoptions.js" Modal form, created by Pcj)
 */

mw.hook('dev.modal').add(function(modal) {
	let reportFormModal = new window.dev.modal.Modal({
		title: 'Creat a User Report',
		content: '<form class="WikiaForm" id="reportUser" method="" name=""> <div class="form-section"> <label>User URL(s)</label><br><input id="userURLs" type="text" placeholder="https://jtoh.fandom.com/User:Example (Add more users on a new line)"/><br><label>Reason</label><br><input id="reason" type="text" placeholder="Vandalism"/></div></form>',
		id: 'reportCenterWindow',
		size: 'large',
		buttons: [{
			id: 'submitButton',
			text: 'Generate Report',
			primary: true,
			event: 'createReportForm',
		}],
		closeTitle: 'Cancel Report',
		events: {
			createReportForm: function() {
				new BannerNotification('Testing!', 'confirm').show();
			}
		}
	});
	reportFormModal.create();
        $('#reportCenter')
            .attr('class', 'wds-button btn-large')
            .text('Create a Report')
            .wrap($('<div>').css('text-align', 'center'))
            .css('cursor', 'pointer')
            .on('click', function() {
                reportFormModal.show();
            });
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Modal.js'
});