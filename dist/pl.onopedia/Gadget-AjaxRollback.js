var REV={
 post:function(){var a=this,b=a.href;$(a).parent().html("[<div title=\"Cofanie\" class=\"loadsq mini\"></div>]");$.post(b+"&format=json").done(function(m){REV.after(a,m);});return !1;},
 after:function(p,l){var e="error" in l?"rewert nie udał się":"rewert udany";$(p).parent().text("["+e+"]");},
 main:function(){$(".mw-rollback-link a").each(function(){this.innerHTML="rewertuj";this.title="Automatyczny rewert";this.href=this.href.replace(/.*wiki\/(.*)\?/gi,"/api.php?title=$1&").replace("from=","user=");
}).click(REV.post);}
};
(wgPageName == "Specjalna:Ostatnie_zmiany")&&$(document).ready(REV.main).bind("ajaxComplete",REV.main);