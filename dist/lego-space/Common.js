/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('MediaWiki:Common.js/ajaxrefresh.js', 'lego-space');

// Automatically uncheck "Leave a redirect behind" on files
if (wgPageName.indexOf("Special:MovePage/File:") != -1) {
 $('input#wpLeaveRedirect').removeAttr('checked');
}

// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
if ($(".toc-multicol #toc").size() != 0) {
  $(document).ready(function(){
    $(function(){
      $("#toc").css("width","100%");
      var wholeList = $("#toc ul");
      wholeList.html("<table><tr><td>" + wholeList.html() + "</td></tr></table>");
      var liList = $("#toc ul li").toArray();
      var x; // I could not come up with a way to do the perCol logic in one declaration. Annoying.
      var tdToAppend;
      var listToAppend;
      $('table#toc ul').remove();
      if (liList.length % 3 == 0) {
        x = 0;
      } else if (liList.length % 3 == 1) {
        x = 2;
      } else if (liList.length % 3 == 2) {
        x = 1;
      }
      var perCol = (liList.length + x) / 3;
 
      for (var colNum=0; colNum < 3; colNum++){
         listToAppend = "";
         for (var i=0+(colNum*perCol); i<(perCol*(colNum+1)); i++){
            if (typeof(liList[i]) == "undefined"){break; }
            tempElement = "";
            tempElement = document.createElement("div");
            tempElement.appendChild(liList[i]);
            listToAppend += tempElement.innerHTML;
         }
         tdToAppend += '<td style="vertical-align: top; width: 33%;"><ul><table><tbody><tr><td><table><tbody><tr><td><table><tbody><tr><td>'+listToAppend+'</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></ul></td>';
      }
 
    $('#toc tbody').append('<tr>'+tdToAppend+'</tr>');
    $('#toc tbody tr:eq(0) td').attr("colspan", "3");
    $("#toc li").each(function(){
      var indentAmount = $(this).children("a").children("span:first").html().split(".").length - 1;
      $(this).css("margin-left",indentAmount.toString()+" em");
    });
    });
  });
}

/* Lock Old Blogs */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn't been commented on for over 30 days. There is no need to comment."
};
importScriptPage('LockOldBlogs/code.js','dev' );