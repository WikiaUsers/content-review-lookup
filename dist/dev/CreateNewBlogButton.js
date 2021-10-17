$(function () {
	var user = mw.config.get('wgUserName');
	var namespace = mw.config.get('wgCanonicalNamespace');
	if ((user !== null) && (namespace === "Blog")) {
		$('.page-header__bottom #p-views').after(
			$('<div>', {'class': 'page-header__actions'}).prepend(
				$('<button>', {
					id: 'AddNewBlogButton',
					'class': 'wds-button wds-is-text page-header__action-button has-label',
					text: 'Create blog post'
				} )
			)
		);
		var editurl = 'placeholder';
		if ((mw.user.options.get('editor') === "2") && (mw.user.options.get('editortype') === "2")) {
			editurl = "?veaction=edit";	
		}
		else {
			editurl = "?action=edit";
		}
		$('#AddNewBlogButton').click(function t() {
			OO.ui.prompt(mw.message("create-blog-form-post-title").text(), {
    			textInput: {
    				placeholder: mw.message("create-blog-form-post-placeholder").text()
    			}
			}).done((function(t) {
    			t && (window.location.href = function(t) {
    			const e = mw.config.get("wgArticlePath").replace("$1", 'User_blog:'+user);
    			return "".concat(e, "/").concat(encodeURIComponent(t), editurl);
    			}(t));
			}));
		} );	
	}
} );