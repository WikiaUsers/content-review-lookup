$(document).ready(function() {
    if (window.CreateNewArticleLoaded) {
        return;
    }
    window.CreateNewArticleLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('CreateNewArticle').then(function(i18n) {
        $("#my-tools-menu").prepend('<li class="custom">' + mw.html.element('a', { id: 'createnew' }, i18n.msg('createNewArticle').escape()) + '</li>');
    		$('#createnew').click(function() {
    		    require(["wikia.ui.factory"], function(uiFactory) {
    			      uiFactory.init(["modal"]).then(function(uiModal) {
    				        $.msg = function() {
      					        return mw.message.call(this, arguments).text();
    	    			    };
            				var config = {
    	          				type: "default",
    				          	vars: {
            		    				id: "my-modals-element-id",
    		        		    		title: i18n.msg('createNewArticle').escape(),
    						            content: (	
            								    "<div style=\"width:50%; float: left; display:inline-block;\">" +
	    	        						        "<h2>" + i18n.msg('articleTitleHeading').escape() + "</h2>" +
                						        "<p>" + i18n.msg('insertArticleTitle').escape() + "</p>"+
                        						"<form>" +
    		                    		    		"<textarea class=\"title\" name=\"Insert Title\" id=\"title\" style=\"margin: 0px;width: 200px;height: 20px; background:inherit; font-family:Helvetica; font-weight: bold; color: inherit;\"></textarea>" +
    				    		            		"</form>" +
            		    						"</div>" +
    		        		    				// Edit summary for the page creation
    						            		"<div style=\"width:50%; float: right; display:inline-block;\">" +
            								    	  "<h2 style=\"float:right;\">" + i18n.msg('editSummaryHeading').escape() + "</h2><br />" +
    		        							      "<p style=\"float:right;margin-left:50%\">" + i18n.msg('insertEditSummary').escape() + "</p><br />" +
        						          			"<form>" +
                									      "<textarea class=\"summary\" name=\"Edit summary\" id=\"summary\" style=\"margin: 0px;width: 200px;height: 20px; float:right; background:inherit; font-family:Helvetica; font-weight: bold; color: inherit;\">Creating article!</textarea>" +
	    	            						  	"</form><br />"+
    				    		        		"</div>" +
    						    		        // Article text
        						    			"<h2 style=\"text-align:center; clear:both;\">" + i18n.msg('articleTextHeading').escape() + "</h2>" +
      									    	"<p style=\"text-align:center; padding: 5px;\">" + i18n.msg('insertArticleText').escape() + "</p>" +
          										"<form>" +
              										"<textarea class=\"summary\" name=\"Edit summary\" id=\"articletext\" style=\"margin: 0px;width: 100% ;height: 500px; overflow: auto; float: z-index:0; background:inherit; font-family:Helvetica; font-weight: bold; color: inherit;\"></textarea>" +
    		    	  							"</form>"
      	        					),
    	      		    			size: "large",
    				      	    	buttons: [
            						    	{ vars: {
    								              value: i18n.msg('cancel').escape(),
        								          data: [
        									            { key: "event", value: "close" }
    		    						          ]
	    			    			        }},
    						    	        { vars: {
    								              value: i18n.msg('create').escape(),
    							              	data: [
                						    			{ key: "event", value: "confirm" }
        						          		]
        							        }},
	    	    				      ]
    				    	    }
                  };
 
        			    uiModal.createComponent(config, function(modal) {
    	        		    // when pressing esc - close modal
        		    	    modal.$element.keydown(function(e) {
              	    			if (e.which == 27) {
    	            	    			e.preventDefault();
                				    	console.log(i18n.msg('userClosedModal').escape());
        		            			modal.trigger("close");
              	    			}
            	    		});
                			// cancel - user clicked 'Cancel'
        		        	modal.bind("confirm", function(e) {
          			        	e.preventDefault();
        	    		      	console.log(i18n.msg('userPressedCancel').escape());
                  				modal.trigger("close");
    	            		});
    			            // confirm - user clicked 'Create'
            		    	modal.bind("confirm", function(e) {
              			    	e.preventDefault();
        		    	      	var $articletext =  modal.$element.find('#articletext').val(),
               	      				$createsummary =  modal.$element.find('#summary').val(),
    		    	              	$articletitle =  modal.$element.find('#title').val();
                					new mw.Api().post({
              	    					action: 'edit',
	    	    	          			title: $articletitle,
    				    		          summary: $createsummary,
              			    			text: $articletext,
        	      				    	token: mw.user.tokens.get('editToken')
            				      }).done(function(d) {
                  						if(d.error) {
    	              							new BannerNotification(i18n.msg('creationError').escape() + ": " + d.error.code, 'error').show();
	    			              		} else {
                                  new BannerNotification(i18n.msg('creationSuccess').escape()).show();
                                  window.location = "/wiki/" + encodeURIComponent($articletitle);
              					    	}
            	      			}).fail(function() {
            				      		new BannerNotification(i18n.msg('creationError').escape(), 'error').show();
      	            			});
 
                   				modal.trigger("close");
            	    		});
 
 
            			    // show modal
            			    modal.show();
    		            });
                });
            });
        });
    });
});});