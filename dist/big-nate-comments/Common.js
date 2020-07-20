/* Any JavaScript here will be loaded for all users on every page load. */
//IIFE to prevent polluting global namespace
;(function(root, console, udf){
    //Variables:
    var debug = true;//set to false for released code
    
    //Actual Code:
    
    /*Utility Functions:*/
    
    //use this function for debugging to the console
    function log(){
        debug && console && console.log && console.log.apply(console, Array.prototype.slice.call(arguments));
    }
    //executes a function when the DOM is ready
    function ready(fn){
        /in/.test(document.readyState)?setTimeout(ready.bind(null, fn), 10):fn();
    }
    
    /*Polyfills:*/
    
    Array.isArray || (Array.isArray = function(obj){
        return {}.toString.call(obj) == "[object Array]";
    });
})(this, this.console);

window.UserTagsJS = {
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
        metafilter: {
            sysop: ['bureaucrat'],
            'content-moderator': ['bureaucrat', 'sysop'], 
            chatmoderator: ['bureaucrat', 'sysop', 'content-moderator'],
            threadmoderator: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator'],
            rollback: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator', 'threadmoderator']
        }
    }
};

/* Articles are interwiki links so that other wikis can use them. */
    articles = [
        'MediaWiki:Common.js/Protection.js',
    ];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
    ]
});
dev:Medals/code.js
function startGame() { myGamePiece = new component(30, 30, "red", 10, 120); myGamePiece.gravity = 0.05; myScore = new component("30px", "Consolas", "black", 280, 40, "text"); myGameArea.start(); } var myGameArea = { canvas : document.createElement("canvas"), start : function() { this.canvas.width = 480; this.canvas.height = 270; this.context = this.canvas.getContext("2d"); document.body.insertBefore(this.canvas, document.body.childNodes[0]); this.frameNo = 0; }, clear : function() { this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); } }
dev:RailWAM/code.js