//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/* 
 * Displays file usage information in the wiki and its global usage
 * (checks the file name only) around Wikia. Also highlights those 
 * that are used in templates or userpages to prevent breaking things.
 * @author: Noreplyz
 
 * This script is for PERSONAL use only! Please!
 */
/*global mediaWiki */
function getFirst(obj) {
    for (var i in obj) return i;
}
;(function($, mw) { 
    if (mw.config.get("wgCanonicalNamespace") != 'File') {
        return;
    }
    $(function() {
      	var imagename;
        if (mw.config.get('skin') === 'monobook') {
           imagename = $("#firstHeading").text();
           $('<div id="file-checker" style="padding:10px;border:1px rgb(0, 45, 85) dotted;margin-bottom:5px;"></div>').insertBefore("#bodyContent");
        } else {
           imagename = "File:" + mw.config.get( 'wgTitle' );
           $('<div id="file-checker" style="padding:10px;border:1px rgb(0, 45, 85) dotted;margin-bottom:5px;"></div>').insertAfter(".header-container");
           $('<div id="file-checker" style="padding:10px;border:1px rgb(0, 45, 85) dotted;margin-bottom:5px;"></div>').insertAfter("#PageHeader");
        }
        
        $.getJSON("/api.php?action=query&list=imageusage&iutitle="+imagename+"&format=json", function (json) {
            var localLen = json.query.imageusage.length;
            if (localLen) {
                $("#file-checker").append("Image is used in "+json.query.imageusage.length+ " places on "+wgServer+"<br/><ul>");
                for (var k = 0; k < localLen; k++) {
                    var pagename = json.query.imageusage[k].title;
                    $("#file-checker").append('<li>' + pagename);
                    if (pagename.substring(0, 9) == "Template:") {
                        $("#file-checker").append(' <font color="#F00"><b>Templateimage </b></font>');
                    } 
                    if (pagename.substring(0, 5) == "User:") {
                        $("#file-checker").append(' <font color="#F00"><b>Userpageimage </b></font>');
                    }
                    $("#file-checker").append('</li>');
                }
                $("#file-checker").append("</ul>");
            } else {
                $("#file-checker").append("Image is NOT USED in this wiki<br/>");
            }
        });
    });
})(this.jQuery, this.mediaWiki);
//</syntaxhighlight>