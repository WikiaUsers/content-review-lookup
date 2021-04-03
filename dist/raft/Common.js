/*************************
 * JQuery Random  Plugin *
 *************************/

/**
 * Adds a 'random' filter to jQuery, which selects 1 or more elements at random for the current jQuery set.
 * Defaults to 1 element if a amount isn't given.
 */

jQuery.fn.random = function(count) {
    var count = (typeof count !== 'undefined') ?  count : 1;
    // Return the current set if an invalid count is asked for.
    if ( count < 1 || count >= this.length || ! Number.isInteger(Number(count)) ) {
        return jQuery(this);
    }

    var indexes = [];
    var resultset = [];
    while ( indexes.length < count ) {
        // Generate a random index
        var index = Math.floor(Math.random() * this.length);
        
        // reroll the random index if it's already present
        var reroll = false;
        for (var i = 0; i < indexes.length; i++) {
            if ( indexes[i] == index ) {
                reroll = true;
            }
        }
        if (reroll) {
            continue;
        }

        // Add the index/element to the result set
        indexes.push(index);
        resultset.push(this[index]);
    }
    return jQuery(resultset);
}

/*****************
 * Random subset *
 *****************/

/**
 * A random subset of list elements within elements with the 'random-subset' class are show, while the rest are hidden.
 * The 'data-random-subset-count' attribute can be used to specify the number of elements to be displayed.
 */

$('.random-subset').each(function() {
    var count = 1;
    // If the data-random-subset-count attribute is present use that count
    if ($(this).attr('data-random-subset-count')) {
        count = $(this).attr('data-random-subset-count');
    }
    var entries = $(this).find('li');
    $(entries).random(entries.length - count).remove();
    // show the root element in case it was hidden while waiting for JS.
    $(this).show();
});

/*** DISMISS BUTTON  ***/
(function() {
      var node=document.getElementById("mw-dismissablenotice-anonplace");
          if (node) {
               node.outerHTML="\u003Cdiv class=\"mw-dismissable-notice\"\u003E\u003Cdiv class=\"mw-dismissable-notice-close\"\u003E[\u003Ca tabindex=\"0\"role=\"button\"\u003Edismiss\u003C/a\u003E]\u003C/div\u003E\u003Cdiv class=\"mw-dismissable-notice-body\"\u003E\u003Cdiv id=\"localNotice\" lang=\"en\" dir=\"ltr\"\u003E\u003C/div\u003E\u003C/div\u003E\u003C/div\u003E";
               }
    }
);

/*** Browser outdated messge ***/
function get_browser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

var browser=get_browser(); // Edge will be described as Chrome

console.log(browser); //test, if even this works
/*
if (browser.name = "IE") {
	var $warningIE = $(document.createElement('div'));
	$warningIE.attr('class','fpbox' ).html('<div class="fpbox" width="100%">You are using browser "Internet Explorer" which is <b>Outdated</b>. We reccomend using modern browser, as this browser will have some features missing</div>');
var Heading = document.getElementById('firstHeading');
	$warningIE.insertAfter(Heading);
	console.log("You are using outdated browser! Some functions may not work")
}
*/