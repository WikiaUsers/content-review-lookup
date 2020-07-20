// Feedback modal (uses localStorage approved by staff - NOT A VIOLATION
// author: @Original Authority
// last updated: 05.01.17
$(document).ready(function() {   
    if(localStorage.getItem("feedbackgiven") === null) { 
    	require(["wikia.ui.factory"], function(uiFactory) {
    		uiFactory.init(["modal"]).then(function(uiModal) {
    			$.msg = function() {
    				return mw.message.call(this, arguments).text();
    			};
    			var config = {
    				type: "default",
    				vars: {
    					id: "my-modals-element-id",
    					title: "Content Feedback",
    					content: (	
    							"<p style=\"font-size: 12px; line-height: 20px;\">Welcome to the wiki! Please note that this wiki is relativley new and in bad shape." +
                                "We're doing all that we can to update articles and get a good theme going." +
                                "It is for this reason that  I'm gathering information about any articles that you feel should be updated, or created." +
                                "This can include anything from episodes, characters or locations. This will give us a better idea of which articles you'd like to see updated on the wiki and we can focus on those instead of ones that nobody is interested in.</p>" + '\n' +
                                "<h2 style=\"font-weight: bold; text-align:center;\">Please note that clicking 'confirm', will publish an edit under your IP.</h2>" + '\n\n' +
                                "<form>" +
                                        "<textarea class=\"articles\" style=\"margin: 0px;width: 100% ;height: 150px; overflow: auto; float: z-index:0; background:inherit; font-family:Helvetica; font-weight: bold; color: inherit;\"></textarea>" +
                                        "</form>" +
                                "<p style=\"text-align: center; font-weight:bold;\">Please give articles in the form of <span style=\"color: green; font-weight: bold;\">\*ARTICLE</span> each on a new line.</p>"
    					),
    					size: "medium",
    					buttons: [
    						{vars: {
    							value: "Cancel",
    							data: [
    								{key: "event", value: "close"}
    							]
    						}},
    						{vars: {
    							value: "Confirm!",
    							data: [
    								{key: "event", value: "confirm"}
    							]
    						}},
    					]
    				}
    	};
    	uiModal.createComponent(config, function(modal) {
    
    
    
    		// when pressing esc - clsoe modal
    		modal.$element.keydown(function(e) {
    			if (e.which == 27) {
    				e.preventDefault();
    				console.log("User closed modal by pressing the 'X' icon, by pressing around the modal's blackout or using 'Esc'");
    				modal.trigger("close");
    			}
    		});
    		// cancel - user clicked 'Cancel'
    		modal.bind("close", function(e) {
    			e.preventDefault();
    			console.log("User pressed 'Cancel'");
    			modal.trigger("close");
    			localStorage.setItem("feedbackgiven", "yes");
    		});
    		// confirm - user clicked 'Ok'
    		modal.bind("confirm", function(e) {
    			e.preventDefault();
    			var $article =  modal.$element.find('.articles').val();
    			new mw.Api().post({
    					action: 'edit',
    					title: 'User:Original Authority',
    					summary: 'Adding articles to be edited.',
    					text: $article,
    					token: mw.user.tokens.get('editToken')
    			}).done(function(d) {
    					if(d.error) {
    							new BannerNotification('Error while adding suggestions: ' + d.error.code, 'error').show();
    					} else {
    							new BannerNotification('Successfully added your suggestions!', 'success').show();
    					}
    			}).fail(function() {
    					new BannerNotification('Error while adding suggestions', 'error').show();
    			});
    
    			modal.trigger("close");
                localStorage.setItem("feedbackgiven", "Yes");
    		});
    
    
    
    		// show modal
    		modal.show();
    	});
    });
    });
} else {
    return; 
    }
});