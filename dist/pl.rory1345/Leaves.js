
var snowflake = new Object();

snowflake.small_path = 'http://tester2.synthasite.com/resources/halloween4.swf';
snowflake.small_width = '1920';
snowflake.small_height = '1200';


function sizeup987(){
	document.getElementById('jcornerBig').style.top = '0px';
	document.getElementById('jcornerSmall').style.top = '-1000px';
}

function sizedown987(){
	document.getElementById("jcornerSmall").style.top = "0px";
	document.getElementById("jcornerBig").style.top = "-1000px";
}

snowflake.putObjects = function () {
// <jcornerSmall>
document.write('<div id="jcornerSmall" style="position:fixed;width:'+ snowflake.small_width +'px;height:'+ snowflake.small_height +'px;z-index:-1;left:0px;bottom:0px;">');
// object
document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"');
document.write(' id="jcornerSmallObject" width="'+snowflake.small_width+'" height="'+snowflake.small_height+'">');
// object params
document.write(' <param name="allowScriptAccess" value="always"/> ');
document.write(' <param name="movie" value="'+ snowflake.small_path +'?'+ snowflake.small_params +'"/>');
document.write(' <param name="wmode" value="transparent" />');
document.write(' <param name="quality" value="high" /> ');
document.write(' <param name="FlashVars" value="'+snowflake.small_params+'"/>');
// embed
document.write('<embed src="'+ snowflake.small_path + '?' + snowflake.small_params +'" name="jcornerSmallObject" wmode="transparent" quality="high" width="'+ snowflake.small_width +'" height="'+ snowflake.small_height +'" flashvars="'+ snowflake.small_params +'" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
document.write('</object></div>');
document.write('</script>');
// </jcornerSmall>
// <jcornerBig>
document.write('<div id="jcornerBig" style="position:fixed;width:'+ snowflake.big_width +'px;height:'+ snowflake.big_height +'px;z-index:-1;center:0px;bottom:0px;">');
// object
document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"');
document.write(' id="jcornerBigObject" width="'+ snowflake.big_width +'" height="'+ snowflake.big_height +'">');
// object params
document.write(' <param name="allowScriptAccess" value="always"/> ');
document.write(' <param name="movie" value="'+ snowflake.big_path +'?'+ snowflake.big_params +'"/>');
document.write(' <param name="wmode" value="transparent"/>');
document.write(' <param name="quality" value="high" /> ');
document.write(' <param name="FlashVars" value="'+ snowflake.big_params +'"/>');
// embed
document.write('<embed src="'+ snowflake.big_path + '?' + snowflake.big_params +'" id="jcornerBigEmbed" name="jcornerBigObject" wmode="transparent" quality="high" width="'+ snowflake.big_width +'" height="'+ snowflake.big_height +'" flashvars="'+ snowflake.big_params +'" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
document.write('</object></div>');
// </jcornerBig>
setTimeout('document.getElementById("jcornerBig").style.top = "-1000px";',1000);
}
snowflake.putObjects();