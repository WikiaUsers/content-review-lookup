/* Any JavaScript here will be loaded for all users on every page load. */
window.customCommentGroups = [ { group: "Admins", users: ["Joshuabirger", "AviatorPhil"] }, { group: "Moderators", users: ["LibertyTrooper"] }, [ { group: "Bots", users: ["ERLCcleanupbot"] } ];
window.MessageBlock = { title : 'Block', message : 'You have been blocked for $2 because due to $1, please respond to appeal.', autocheck : true };

window.ArticleRating = { title: 'Rate This Article', values: ['Worst', 'Bad', 'Average', 'Good', 'Great'], starSize: [24, 24], starColor: ['#ccc', '#ffba01'], starStroke: '#000', exclude: ['Page A', 'Page B'], excludeCats: ['Category:A', 'Category:B'], location: 'top-rail' }
function getAction(id) {
		return actions.filter(function(action){return action.id === "page:"+id})[0]
	}

	function renderSVGs(wds) {
		wds.render(".UserProfileMasthead .wds-button-group")
	}

	if(mw.config.get("wgNamespaceNumber") == 2 && oldbtn.length && masthead.length) {
		importArticle({type: "style", article: "u:dev:MediaWiki:ModernProfile/EditButton.css"})

		oldbtn.remove();

		if(actions) {
			var newbtn, drop, dropbtns = [];

			var a_edit = getAction("Edit")
			if(a_edit) {
				newbtn = $("<a>").attr({
					"class": "wds-button wds-is-secondary wds-is-squished",
					"id": "ca-edit",
					"href": a_edit.href
				}).append(
					$("<span>").attr({
						"class": "dev-wds-icon",
						"id": "dev-wds-icons-pencil-small"
					}),
					$("<span>").text(a_edit.caption)
				)
			}

			["History", "Move", "Protect", "Delete"].forEach(function(id){
				var a = getAction(id);
				if(a) dropbtns.push($("<li>").append($("<a>").attr("href", a.href).text(a.caption)))
			})

			if(dropbtns.length) {
				var dropcontent = $("<ul>").attr("class", "wds-list wds-is-linked")
				drop = $("<div>").attr("class", "wds-dropdown").append(
					$("<div>")
					.attr("class", "wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle")
					.append(
						$("<span>").attr({
							"class": "dev-wds-icon",
							"id": "dev-wds-icons-dropdown-tiny"
						})
					),
					$("<div>")
					.attr("class", "wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned")
					.append(dropcontent)
				);
				dropbtns.forEach(function(e){dropcontent.append(e)})
			}

			masthead.prepend(
				$("<div>")
				.attr("class", "wds-button-group")
				.css({"float": "right"})
				.append(newbtn, drop)
			)

			if(!window.dev || !window.dev.wds) {
				mw.hook("dev.wds").add(renderSVGs);
				importArticle({type: "script", articles: "u:dev:WDSIcons/code.js"})
			} else renderSVGs(window.dev.wds)
		}
	}
});

/*** Convert all loading throbbers into modern spinners ***/
/* For blog comments/Message wall editor */
.MiniEditorWrapper .loading-indicator .loading-message {
    top: 5% !important;
}
.MiniEditorWrapper .loading-indicator .loading-message .loading-throbber {
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .8s linear infinite;
    height: 60px !important;
    padding-top: 10px !important;
    width: 90px !important;
    padding-right: 30px;
    background-size: 86px !important;
    opacity: .7 !important;
}
.MiniEditorWrapper .loading-indicator .loading-message .loading-text {
    display: none !important;
}
.modal.medium.inactive .wikiaThrobber {
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat scroll center !important;
    animation: rotator .8s linear infinite;
    opacity: 0.7 !important;
}
/* Wikia's side rail */
.WikiaRail .loading { 
    height: 88px;
    margin: 10px;
    padding-top: 10px;
    animation: rotator .5s linear infinite;
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center / 120px !important;
    opacity: .7 !important;
}
/* Classic editor and switching from Rich-text to source mode and vice versa*/
.EditPageEditor .loading-indicator .loading-message .loading-throbber {
    height: 146px;
    width: 145px;
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .9s linear infinite;
    margin-left: 2px;
    background-size: 100% !important;
    margin-bottom: -10px !important;
    opacity: .7 !important;
}
.EditPageEditor .loading-indicator .loading-message .loading-text {
    display: block !important;
    color: #3a3a3a !important;
}
form#WikiaPhotoGalleryImageUploadForm .WikiaPhotoGalleryProgress {
    background: transparent url(https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg) no-repeat 60% 60% !important;
    width: 0;
    height: 0;
    padding: 19px 0 0 20px;
    margin-left: -8px !important;
    opacity: .7 !important;
}
.WikiaPhotoGalleryProgress {
    background: transparent url(https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg) no-repeat 50% 50% !important;
    background-size: 8.8em !important;
}
.mainpage #EditPageDialog .wikiaThrobber {
    margin-left: 425px;
}
.mainpage .modal.large.inactive .wikiaThrobber {
    margin-left: 535px !important;
}
/* For the preview modules in the Classic editor */
.ArticlePreviewInner .wikiaThrobber {
    top: 0;
    z-index: 2;
    height: 400px;
    width: 185px;
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .9s linear infinite;
    margin-left: 270px;
    background-size: 100% !important;
    margin-bottom: -10px !important;
    opacity: .7 !important;
    position: absolute;
}
.ArticlePreview .wikiaThrobber {
    top: 0;
    z-index: 2;
    height: 400px;
    width: 185px;
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .9s linear infinite;
    margin-left: 270px;
    background-size: 100% !important;
    margin-bottom: -10px !important;
    opacity: .7 !important;
    position: absolute;
}
.modal.large.inactive .wikiaThrobber {
    top: 0;
    z-index: 2;
    width: 185px;
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .9s linear infinite;
    margin-left: 570px;
    background-size: 100% !important;
    opacity: .7 !important;
    position: absolute;
}
/* For article comments when loading */
.WikiaArticleComments.loading {
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .8s linear infinite;
    height: 60px !important;
    width: 90px !important;
    padding-right: 30px;
    background-size: 86px !important;
    padding-left: 550px;
    margin-top: -5px !important;
    border-top: 0 !important;
    opacity: .7 !important;
}
/* The one that appears when pressing the "Reply" button on forums-like environment. */
.Wall .loadingAjax {
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg');
    background-repeat: no-repeat;
    margin: 15px 0 0 0 !important;
}
/* The one that appears in the file viewer */
.LightboxModal .wikiaThrobber {
    left: 0;
    top: 0;
    z-index: 2;
    top: 0;
    z-index: 2;
    height: 610px;
    width: 185px;
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .9s linear infinite;
    margin-left: 400px;
    background-size: 100% !important;
    margin-bottom: -50px !important;
    opacity: .7 !important;
    position: absolute;
}
/* The one that appears when uploading a file using Special:Images */
.ajaxwait {
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat scroll center !important;
    padding-left: 500px;
    position: absolute;
    display: inline;
    width: 0;
    height: 0;
    padding: 28px 0 0 100px;
}
/* The one that appears during the load of the "All contributors" list of Special:Community */
.throbber-placeholder .wikiaThrobber {
    background: url('https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg') no-repeat center !important;
    animation: rotator .8s linear infinite;
    height: 85px !important;
    width: 90px !important;
    padding-right: 30px;
    background-size: 86px !important;
    padding-left: 555px;
    margin-top: -5px !important;
    opacity: 0.7 !important;
}
/* The one that appears on category pages when browsing into another set of items */
.category-gallery .wikiaThrobber {
    background: #fff url(https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg) no-repeat 50% 50% !important;
    background-size: 6.8em !important;
    opacity: .7 !important;
}
/* The one that appears when applying new categories to an article's category bar */
.article-categories.CategorySelect.articlePage.userCanEdit.modified .wikiaThrobber, 
.page-list-content.WikiaGrid .wikiaThrobber {
    background: #fff url(https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg) no-repeat 50% 50% !important;
    background-size: 6.2em !important;
    opacity: .7 !important;
}
/* Special:ListUsers */
.dataTables_processing img {
    width: 0;
    height: 0;
    padding: 19px 0 0 20px;
    margin-left: -3px !important;
    background: transparent url(https://images.wikia.nocookie.net/speedit/images/0/0b/Spinner.svg) no-repeat 60% 60% !important;
    margin-bottom: 5px;
}

/** <nowiki>
 *
 * @title           FandomizedTabs/tabviews.css
 * @description     Modernizes <tabview>.
 * @author          JustLeafy
 * @author          Speedit
 * @license         CC-BY-SA 3.0
 */

 /**
 * @section         Tabber redesign
 * @element         .tabs
 */
#mw-content-text .tabs {
    border: none;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 0 0.4em;
    font-family: Rubik,"Helvetica Neue",Helvetica,Arial,sans-serif;
    overflow: auto;
}