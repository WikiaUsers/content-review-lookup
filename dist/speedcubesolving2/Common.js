/* Any JavaScript here will be loaded for all users on every page load. */
;(function(root, $, udf){
    "use strict";
    //Prevent links that act like buttons from scrolling to the top of the page
    $(function(){
        $('a.button[href="#"], #WikiaBar a.global-shortcuts-help-entry-point[href="#"]').prop("href", "javascript:;");
    });
    mw.hook('AllPagesHideRedirect.loaded').add(function(){
        $('a.button[href="#"]').prop("href", "javascript:;");
    });
    if(!Array.isArray){
        Array.isArray = function(obj){
            return Object.prototype.toString.call(obj) === "[object Array]";
        }
    }
    //fix body size on mobile
    $("head").append('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>');
    mw.hook('jsspecialpage.ready').add(function(e){
        e("AllActivity", '<div class="rc-content-multiple"><ul style="display: none;"><li>https://speedcubesolving.fandom.com/</li></ul></div>');
        e("AssociatesActivity", '<div class="rc-content-multiple"><ul style="display: none;"><li>https://bignate.fandom.com/</li><li>https://speedcubesolving.fandom.com/</li><li>https://big-nate-comments.fandom.com/</li><li>https://fowl-language.fandom.com/</li></ul></div>');
        e("NewPagesUser", '<div id="js-newpagesuser"></div>');
    });
    root.UserTagsJS = {
    	modules: {
    	    mwGroups: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'chatmoderator',
                'threadmoderator',
                'rollback',
                'bot',
                'bot-global'
            ],
            nonuser: true,
            custom: {
                "7o'clock": ["Clock"],
                "19o'clock": ["Clock"],
                "Spyroclub": ["Professional Cuber"],
                "ItsP-dog": ["Dog"],
                "Positive Elixir Trade": ["CSS Guru"]
            }
    	},
    	tags: {
    	    "Clock": {
    	        u: "Clock"
    	    },
    	    "Professional Cuber": {
    	        u: "Professional Cuber"
    	    },
    	    "Dog": {
    	        u: "Dog"
    	    },
    	    "CSS Guru": {
    	        u: "CSS Guru"
    	    },
    	    "founder": {
    	        order: -1
    	    },
    	    "bureaucrat": {
    	        order: 0
    	    },
    	    "sysop": {
    	        order: 1
    	    },
    	    "content-moderator": {
    	        order: 2
    	    },
    	    "threadmoderator": {
    	        order: 3
    	    },
    	    "chatmoderator": {
    	        order: 4
    	    },
    	    "rollback": {
    	        order: 5
    	    }
    	},
    	oasisPlaceBefore: ''
    };
    root.BackToTopModern = true;
})(this, this.jQuery);