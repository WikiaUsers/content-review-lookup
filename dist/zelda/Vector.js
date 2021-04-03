/* Any JavaScript here will be loaded for users using the Vector skin */

/* Add Curse ads to wiki pages */
//Logged in users don't get ads
if (mw.config.get("wgUserName") != null)
{
  $(".curse-ad").css("display","none"); //remove ad from Main Page
}
else {
    //Header and footer ads
    $("#content").prepend("<div id='aft-lb'><div id='cdm-zone-01'></div></div>"); //top banner
    $("<div id='btf-lb' style='padding-top:10px' ><div id='cdm-zone-04'></div></div>").insertAfter( "#mw-content-text" ); //footer rectangle
    $("#footer").prepend("<div id='btf-mrec' style='float:right'><div id='cdm-zone-03'></div></div>"); //bottom banner 
    
    //In-content ad
    var namespace = mw.config.get("wgCanonicalNamespace");
    //Once we upgrade to MW 1.23+, wgContentNamespaces should be used instead of hardcoded namespace values.
    var isContentNamespace = namespace == "" || namespace == "Community"; //the empty string represents the mainspace
    if(isContentNamespace && mw.config.get("wgIsArticle")) {
		if(mw.config.get("wgPageName") == "Main_Page") {
			$("#mf-incontentad").append("<div id='cdm-zone-02'></div>");
		}
        // Automatically place an ad inside every infobox. If the infobox doesn't exist on that page, create a cheap and simple box for the ad.
        else if ($(".infobox-curse-ad").length == 0){
            $("#mw-content-text").prepend('<div class="infobox" style="float:right"><div id="cdm-zone-02"></div></div>');
        }
        else {
            $(document).ready($(".infobox-curse-ad").append('<tr><td colspan=2><div><div id="cdm-zone-02"></div></div></td></tr>'));
        }
    }
    //Ads will not function without this before the </body> tag
    $("body").append("<div id='cdm-zone-end'></div>"); 
    // Requested site class for body
    $("body").addClass("site-zeldawiki");
}