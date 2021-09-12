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