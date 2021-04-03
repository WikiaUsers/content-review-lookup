var FalloutMV={
	isLive:(window.location.origin.indexOf("localhost")==-1),
	hasGL: (function(){if (!!window.WebGLRenderingContext){var canvas = document.createElement("canvas"),names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],context = false;for(var i=0;i<4;i++) {try {context = canvas.getContext(names[i]);if (context && typeof context.getParameter == "function") {return true;}} catch(e) {}}	return false;}return false;})(),
	hasData: false,
	hasModel: false,
   
	lNameSpace: "\\",
	debugMode: false,
};

FalloutMV.setConsts = function(C) {
    for (var a in C) {
        if (C.hasOwnProperty(a) && !(a in FalloutMV)) {
            FalloutMV[a] = C[a];
        }
    }
};

FalloutMV.UI = (function() {
	var menuIndex=0;
	var isClosing = false;
	var f3g = ["Fallout 3","Operation: Anchorage","The Pitt","Broken Steel","Point Lookout","Mothership Zeta"],
	fnvg = ["Fallout: New Vegas","Dead Money","Honest Hearts","Old World Blues","Lonesome Road","Courier's Stash","Gun Runners' Arsenal"];
	
	if($("#modelTable").length>0)
	{
	    if($("#3dlabel").length == 0)
	    {
	        $(".va-infobox-header","#modelTable").html('<nav id="3dButton" disabled="true" class="wikia-menu-button" style="height:auto;"><a id="3dlabel"> Loading...	</a><span class="drop"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"/></span><ul class="tdMenu"></ul></nav>');
	    }
	    hasButton = ($("#3dlabel").length > 0);
	}
	var game = (function(){var g=$('i',$('a','.va-infobox-title-super')).html();if($.inArray(g,f3g)!=-1)return"f3"; else if($.inArray(g,fnvg)!=-1)return"fnv"; else return undefined; })(),
	edids =(function(){if(hasButton==true){return $('#modelTable').attr('data-model').split(",");}})(),	
	gamePrefix = (function(){if(FalloutMV.isLive==true){if(game=="f3"){return "F3-";}else if(game=="fnv"){return "Nv-";}}else{if(game=="f3"){return "Fallout 3\\Data\\";}else if(game=="fnv"){return "Fallout New Vegas\\Data\\";}}})(),
	lGamePrefix = (function(){if(game=="f3"){return "Fallout 3\\Data\\";}else if(game=="fnv"){return "Fallout New Vegas\\Data\\";}})();
	nameSpace = (FalloutMV.isLive==true?"/wiki/ModelData:":"\\");
	var uiConst={
		hasButton : hasButton,
		game : game,
		gpfx : (function(){	if(game=="f3"){return (FalloutMV.isLive==true?"F3-":"/Fallout 3/Data/");}else if(game=="fnv"){return (FalloutMV.isLive==true?"Nv-":"/Fallout New Vegas/Data/");}})(),
		edids : edids,
		gamePrefix: gamePrefix,
		lGamePrefix: lGamePrefix,
		nameSpace : nameSpace,
	}
	FalloutMV.setConsts(uiConst);
	var lb='<section id="viewerWindow" class="modalWrapper LightboxModal overlay-hidden" style="width: 1010px; left: 50%; height: 628px; margin-left: -510px; top: 130.5px; z-index: 5001102;"><div class="viewer" style="width:100%;height:100%"><div id="viewOverlay" style="pointer-events:none;background:none;position:absolute;color:#FFFFFF;width:100%;height:100%;display:table;"><div id="viewInfo" style="display:table-row;vertical-align:middle;text-align:center;width:100%;"><div id="viewInfoText"style="display:table-cell;text-align:center;vertical-align:middle;width:100%">Loading...</div></div><div id="viewTips" style="width:100%;display:table-row;vertical-align:bottom;text-align:left;height:20px;"><div id="viewTipsText" style="display:table-cell;text-align:left;vertical-align:bottom;width:100%;padding-left:5px;">Click+Drag to Rotate, Middle-Mouse to Pan, Mouse Wheel to Zoom</div><button onclick="FalloutMV.UI.toggleErrors();" id="errBtn" style="pointer-events:all;min-width:18px;width:18px;height:18px;display:table-cell;right:5px;bottom:1px;position:absolute;background-color:#dc0d0e;background-image:-o-linear-gradient(top,#e63031 0,#dc0d0e 50%,#e63031 100%);background-image:-ms-linear-gradient(top,#e63031 0,#dc0d0e 50%,#e63031 100%);background-image:-webkit-gradient(linear,0% 0%,0% 100%,color-stop(0,#e63031),color-stop(50%,#dc0d0e),color-stop(100%,#e63031));background-clip:padding-box;border:2px solid white;border-radius:18px;padding:0px;"><span style="font-weight:bold;line-height:12px;vertical-align:middle;display:inline-block;text-align:center;height:18px;">!</span></button><section class="modalWrapper" style="visibility:hidden;pointer-events:all;height:auto;display:table-cell;vertical-align:bottom;width:500px;right:5px;bottom:21px;"><button class="close wikia-chiclet-button" onclick="FalloutMV.UI.toggleErrors();"><img src="https://images.wikia.nocookie.net/__cb1422023096/common/skins/oasis/images/icon_close.png"></button><h1 style="line-height:26px;">Missing Assets</h1><section class="modalContent" style="margin:0 10px 10px 10px;"><div><div style="font-size:95%;"><b>Please help by adding the following assets to the wiki</b></div><div id="missingAss"><table class="va-genericbox" style="width:100%;padding:5px;font-size:11px;"><tr valign="top"><td class="maList"></td></tr></table></div></div></section></section></div></div></div></section><div id="viewerBlackout" class="blackout" data-opacity="0.65" style="z-index: 5001101; opacity: 0.65; display: block;pointer-events:all"></div>';
	

	function addMenuItem(labelText,fp){		
		var bone='<li><div><a href="javascript:FalloutMV.Scene.init(';
		var btwo=');" class="';
		var bthree='" style="display: table-cell;">';
		var bfour='</a>';
		var bfive='</div></li>';
		var fone='<a href="javascript:FalloutMV.Scene.init(';
		var ftwo=');" class="firstPerson" title="First Person Model"><img alt="" height="12" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="14"></a>';
		var outString=bone+menuIndex+btwo;
		menuIndex++;
		if(fp){
				outString+="baseModel"+bthree+labelText+bfour+fone+(menuIndex)+ftwo;
				menuIndex++;	
		}else{
				outString+="baseModel bmSolo"+bthree+labelText+bfour;
		}
		outString+=bfive;
		$("ul","#3dButton").append(outString);
		return outString;
	}
	
	function checkButton(){
		if(FalloutMV.hasData==true && FalloutMV.hasModel==true && FalloutMV.hasGL==true){
			$("#3dButton").removeAttr("disabled");
			$("#3dlabel").html(" View in 3D	")
		}
	}
	function cancelModel(){
		$("#modelTable").css("display","none");
		$("#modelSpacer").css("display","none");
	}
	
	function showErr()
	{
		$("#errBtn").css("visibility","visible");
	}
	function hideErr()
	{
		$("#errBtn").css("visibility","hidden");
	}
	
	
	function clearAss()
	{
		$(".maList").html("");
	}
	
	function showProgress(msg,index,total,globalIndex,globalTotal){
		var t="";
		if(globalIndex!=undefined){
			if(index != undefined){
				t=msg+" ("+(globalIndex+1)+" of "+globalTotal+")..."+Math.round(((Number(index)+1)/total)*100)+"%"
			}else{
				t=msg+" ("+(globalIndex+1)+" of "+globalTotal+")...";
			}
		}else if (index!=undefined){
			t=msg+"..."+Math.round(((Number(index)+1)/total)*100)+"%"
		}else{
			t=msg+"...";
		}
		$("#viewInfoText").text(t);
	}
	
	function showViewer(){
			if(($("#viewerWindow").length > 0)){
				$("#viewerWindow").show();
				$('#viewerBlackout').show();
				showInfo();
			}else{
				$('body').append(lb);
				$('#viewerBlackout').click(function(){
					FalloutMV.UI.hideViewer();
				});
			}
			$('#viewerWindow').css("width",window.innerWidth*0.8+"px");
			$('#viewerWindow').css("height",window.innerHeight*0.8+"px");
			$('#viewerWindow').css("top",((window.innerHeight-(window.innerHeight*0.8))/2)+'px');
			$('#viewerWindow').css("margin-left",(((window.innerWidth*0.8)/2)*-1)+'px');
			$('html').css("height","100%");
			$('body').css("height","100%");
			$('body').css("overflow","hidden");
			$('body').css("padding-bottom","0px");
			hideErrors();
			hideErr();
			clearAss();
			this.isClosing=false;
	}
	
	function hideViewer(){
		if(!this.isClosing){
			this.isClosing=true;
			showProgress("Loading")
			$('#viewerWindow').hide();
			$('#viewerBlackout').hide();
			$('html').css("height","auto");
			$('body').css("height","auto");
			$('body').css("overflow","auto");
			$('body').css("padding-bottom","30px");
			cancelAnimationFrame(FalloutMV.Scene.animationFrame);
			FalloutMV.Scene.controls.enabled=false;
			FalloutMV.Scene.scene.remove(FalloutMV.Scene.root);
		}
	}
	function hideInfo(){
		$('#viewInfo').hide();
	}
	function showInfo(){
		$('#viewInfo').show();
	}
	
	function addError(file){
		$(".maList").append("<ul><li>" + file + "</li></ul>");
		showErr();
	}
	
	function toggleErrors(){
		var state=$('.modalWrapper','.viewer').css("visibility");
		if(state!="visible")
		{
			$('.modalWrapper','.viewer').css("visibility","visible");
			
		}else{
			
			$('.modalWrapper','.viewer').css("visibility","hidden");
		}
	}
	
	function hideErrors(){
		$('.modalWrapper','.viewer').css("visibility","hidden");
	}
	
	$('.drop','#3dButton').click(function(event){
		event.stopImmediatePropagation()
		if($('.tdMenu').css("display")!="table"){
			$('.tdMenu').css("display","table");
		}else{
			$('.tdMenu').css("display","none");
		}
	});
	
	$('#3dButton').click(function(event){
		if(event.target.id=="3dlabel" || event.target.id=="3dButton"){
			FalloutMV.Scene.init(0);
		}
	});
	
	$('.tdMenu').mouseleave(function(event)	{
		to=setTimeout(function(){$('.tdMenu').css("display","none");}, 400);
	});
	$('.tdMenu').mouseenter(function(event)	{
		clearTimeout(to);
	});

	$(document).keydown(function(e){
		if(e.which==27 && $('.blackout').length > 0)
		{
			hideViewer();
		}
	
	});
	$(document).click(function(e){
		if($(e.target).is('.blackout'))
		{
			hideViewer();
		}
	});
	
	return {
		addMenuItem : addMenuItem,
		isClosing : isClosing,
		checkButton : checkButton,
		cancelModel : cancelModel,
		showViewer : showViewer,
		hideViewer : hideViewer,
		addError : addError,
		showProgress : showProgress,
		hideInfo : hideInfo,
		showInfo : showInfo,
		toggleErrors : toggleErrors,
		hideErrors : hideErrors,
	}
	
})();

FalloutMV.Util = (function() {
	function formatURL(file){
		if(FalloutMV.isLive==true){
			return  (mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:"+file)+'&action=raw&ctype=text/javascript')
		}else{
			return "js/"+file;
		}
	}
	function formatAssetURL(dir,file,doUpper){
		var file = dir+file;
		if(FalloutMV.isLive==true){
			file=file.split('\\').join('-').toLowerCase();
			file=file.replace("_","-");
			if(doUpper){
				file= file.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
			}
			//file=dir.split('\\').join('-')+file;
			return file;
		}else{
			return file;
		}
		
	}
	function formatAssetKey(akey)
	{
		return akey.split('\\').join('-').toLowerCase().replace("_","-");
		
	}
	
	function bstoa(str){
     var res="";
     for(var i=5;i < str.length-6;i++){
          res+=String.fromCharCode(str.charCodeAt(i)-128);
     }
     return res;
	}
	
	function atoab (sBase64, nBlocksSize) {
		var	sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
		nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);
		for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
			nMod4 = nInIdx & 3;
			nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
			if (nMod4 === 3 || nInLen - nInIdx === 1) {
				for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
					taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
				}
				nUint24 = 0;
			}
		}
		return taBytes;
	}

	function btoab(str) {
	  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
	  var bufView = new Uint8Array(buf);
	  for (var i=0, strLen=str.length; i<strLen; i++) {
	    bufView[i] = str.charCodeAt(i);
	  }
	  return buf;
	}
	
	function delay(func,time)
	{
		if(FalloutMV.UI.isClosing==false){setTimeout(function(){func},time);}
	}
	function checkBit(number,place){
		var val=((number)&(1<<(place)));
		if(val==0){
			return false;
		}else{
			return true;
		}
	}
	function isUnique(arr){
		var oc=arr.length;
		arr = arr.reverse().filter(function (e, i, arr) {
			return arr.indexOf(e, i+1) === -1;
		}).reverse();
		var nc=arr.length;
		return oc==nc;
	}
	function rgbToHsl(r, g, b){
    //r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
	}

	
	function hslToRgb(h, s, l){
    var r, g, b;
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r, g, b];
	}
	function setBrightness(rgbcode, percent) {
    var r = rgbcode.r,
        g = rgbcode.g,
        b = rgbcode.b,
        HSL = rgbToHsl(r, g, b),
        newBrightness = HSL[2] * percent, 
        RGB;

    RGB = hslToRgb(HSL[0], HSL[1], newBrightness);
    return {r:RGB[0],g:RGB[1],b:RGB[2]};
	}

	
	return {
		formatURL : formatURL,
		checkBit : checkBit,
		delay: delay,
		formatAssetURL: formatAssetURL,
		bstoa : bstoa,
		btoab : btoab,
		atoab : atoab,
		isUnique : isUnique,
		formatAssetKey : formatAssetKey,
		hslToRgb: hslToRgb,
		setBrightness : setBrightness,
		rgbToHsl : rgbToHsl,
	};
	
})();

FalloutMV.Math = (function(){
	function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }
	function copysign(x, y) { return Math.abs(x) * sign(y); }
	function max(x, y) { return x > y ? x : y; }

	function toAxisAngle(m) {
		var angle,x,y,z; // variables for result
		var epsilon = 0.01; // margin to allow for rounding errors
		var epsilon2 = 0.1; // margin to distinguish between 0 and 180 degrees
		if ((Math.abs(m[0][1]-m[1][0])< epsilon) && (Math.abs(m[0][2]-m[2][0])< epsilon)&& (Math.abs(m[1][2]-m[2][1])< epsilon)) {
			if ((Math.abs(m[0][1]+m[1][0]) < epsilon2)&& (Math.abs(m[0][2]+m[2][0]) < epsilon2)&& (Math.abs(m[1][2]+m[2][1]) < epsilon2)&& (Math.abs(m[0][0]+m[1][1]+m[2][2]-3) < epsilon2)) {
				return [0,1,0,0]; // zero angle, arbitrary axis
			}
			angle = Math.PI;
			var xx = (m[0][0]+1)/2;
			var yy = (m[1][1]+1)/2;
			var zz = (m[2][2]+1)/2;
			var xy = (m[0][1]+m[1][0])/4;
			var xz = (m[0][2]+m[2][0])/4;
			var yz = (m[1][2]+m[2][1])/4;
			if ((xx > yy) && (xx > zz)) { // m[0][0] is the largest diagonal term
				if (xx< epsilon) {
					x = 0;
					y = 0.7071;
					z = 0.7071;
				} else {
					x = Math.sqrt(xx);
					y = xy/x;
					z = xz/x;
				}
			} else if (yy > zz) { // m[1][1] is the largest diagonal term
				if (yy< epsilon) {
					x = 0.7071;
					y = 0;
					z = 0.7071;
				} else {
					y = Math.sqrt(yy);
					x = xy/y;
					z = yz/y;
				}
			} else { // m[2][2] is the largest diagonal term so base result on this
				if (zz< epsilon) {
					x = 0.7071;
					y = 0.7071;
					z = 0;
				} else {
					z = Math.sqrt(zz);
					x = xz/z;
					y = yz/z;
				}
			}
			return [angle,x,y,z]; // return 180 deg rotation
		}
		var s = Math.sqrt((m[2][1] - m[1][2])*(m[2][1] - m[1][2])+(m[0][2] - m[2][0])*(m[0][2] - m[2][0])+(m[1][0] - m[0][1])*(m[1][0] - m[0][1])); // used to normalise
		if (Math.abs(s) < 0.001)
		{
			s=1;
		}
		angle = Math.acos(( m[0][0] + m[1][1] + m[2][2] - 1)/2);
		x = (m[2][1] - m[1][2])/s;
		y = (m[0][2] - m[2][0])/s;
		z = (m[1][0] - m[0][1])/s;
		return [angle,x,y,z];
	}
	
	function degToRad(deg){
		return deg*(Math.PI/180);
	}

	function radToDeg(rad){
		return rad* (180/Math.PI)
	}
	
	

	return{
		sign: sign,
		copysign:copysign,
		max:max,
		toAxisAngle:toAxisAngle,
		degToRad : degToRad,
		radToDeg : radToDeg,
		
	}		



			
	
})();

FalloutMV.ESM = (function(){
	var entryArray=[];
	var showHair=true,showHead=true,showBody=true,showLeft=true,showRight=true,showFullHair=true;
	var charParts=[{"hair":"characters\\hair\\hairdefaultfacegen.nif","head":"characters\\head\\headhuman.nif","eyeLeft":"characters\\head\\eyelefthuman.nif","eyeRight":"characters\\head\\eyerighthuman.nif","upperBody":"characters\\_male\\upperbody.nif","handLeft":"characters\\_male\\lefthand.nif","handRight":"characters\\_male\\righthand.nif"},{"hair":"characters\\hair\\hairdefaultfacegenf.nif","head":"characters\\head\\headfemale.nif","eyeLeft":"characters\\head\\eyelefthumanfemale.nif","eyeRight":"characters\\head\\eyerighthumanfemale.nif","upperBody":"characters\\_male\\femaleupperbody.nif","handLeft":"characters\\_male\\femalelefthand.nif","handRight":"characters\\_male\\femalerighthand.nif"}];
	
	function getEntry()
	{
		return {"model":[],"texSet":[],"hasTx":[],"fullHair":true};
		
	}
	function setFlags(val){
		
		if(FalloutMV.Util.checkBit(val,0)==true)showHead=false;
		if(FalloutMV.Util.checkBit(val,1)==true)showHair=false;
		if(FalloutMV.Util.checkBit(val,2)==true)showBody=false;
		if(FalloutMV.Util.checkBit(val,3)==true)showLeft=false;
		if(FalloutMV.Util.checkBit(val,4)==true)showRight=false;
		if(FalloutMV.Util.checkBit(val,10)==true)showFullHair=false;
	}
	function blankTex(entry){
		entry.texSet.unshift({});
		entry.hasTx.unshift(false);
		return entry;
	}
	function addCharacterParts(entry,gender){
			if(showHair==true){
				entry.model.unshift(charParts[gender].hair);
				entry=blankTex(entry);
			}
			if(showHead==true){
				entry.model.unshift(charParts[gender].head);
				entry.model.unshift(charParts[gender].eyeLeft);
				entry.model.unshift(charParts[gender].eyeRight);
				entry=blankTex(entry);
				entry=blankTex(entry);
				entry=blankTex(entry);
			}
			if(showBody==true){
				entry.model.unshift(charParts[gender].upperBody);
				entry=blankTex(entry);
			}
			if(showLeft==true){
				entry.model.unshift(charParts[gender].handLeft);
				entry=blankTex(entry);
			}
			if(showRight==true){
				entry.model.unshift(charParts[gender].handRight);
				entry=blankTex(entry);
			}
			if(showFullHair==true)
			{
				entry.fullHair=true;
			}else{
				entry.fullHair=false;
			}
			return entry;
	}
	
	function procArmorData(esm,gender){
		var e= getEntry();
			setFlags(Number(esm.df));
			if(gender==0){
			if(esm.hasOwnProperty('m')){
				e.model.push(esm.m);
			}else{
				e.model.push(undefined);
			}}else{
				if(esm.hasOwnProperty('fm')){
					e.model.push(esm.fm);
				}else if(esm.hasOwnProperty('m')){
					e.model.push(esm.m);
				}else{
					e.model.push(undefined);
				}	
			}
			if(gender==0){
				if(esm.hasOwnProperty('mts')){
					e.texSet.push(esm.mts);
					e.hasTx.push(true);
				}else{
					e.texSet.push({});
					e.hasTx.push(false);
				}
			}else{
				if(esm.hasOwnProperty('fts')){
					e.texSet.push(esm.fts);
					e.hasTx.push(true);
				}else if(esm.hasOwnProperty('mts')){
					e.texSet.push(esm.fts);
					e.hasTx.push(true);
				}else{
					e.texSet.push({});
					e.hasTx.push(false);
				}
			}
			return e;
	}
	
	function procWeaponData(esm,m,t,fpm,fpt,n){	
		var e = getEntry();
		if(esm.hasOwnProperty(m)){
				e.model.push(esm[m])
			}else{
				e.model.push(undefined);
			}
			if(esm.hasOwnProperty(t)){
				e.texSet.push(esm[t]);
				e.hasTx.push(true)
			}else{
				e=blankTex(e);
			}
			entryArray.push(e);
			if(esm.hasOwnProperty(fpm)){
				e=getEntry();
				e.model.push(esm[fpm]);
				if(esm.hasOwnProperty(fpt)){
					e.texSet.push(esm[fpt]);
					e.hasTx.push(true);
				}else{
					e=blankTex(e);
				}
				entryArray.push(e);
				FalloutMV.UI.addMenuItem(n,true);
			}else{
				FalloutMV.UI.addMenuItem(n,false);
			}
	}
	
	function parse(esmArr,callback){
		FalloutMV.setConsts({"type":esmArr[0].main.tp});
		var esm=esmArr[0].main;
		if(esmArr[0].main.tp=="ARMO"){
			var e= procArmorData(esmArr[0].main,0);
			for(var i=0; i < esmArr[0].children.length;i++){
				var ce = procArmorData(esmArr[0].children[i],0)
				e.model=e.model.concat(ce.model);
				e.texSet=e.texSet.concat(ce.texSet);
				e.hasTx=e.hasTx.concat(ce.hasTx);
			}
			e=addCharacterParts(e,0);
			entryArray.push(e);
			FalloutMV.UI.addMenuItem(esmArr[0].main.n,false);
			showHair=true,showHead=true,showBody=true,showLeft=true,showRight=true,showFullHair=true;
			e=procArmorData(esmArr[0].main,1);
			for(var i=0; i < esmArr[0].children.length;i++){
				var ce = procArmorData(esmArr[0].children[i],1)
				e.model=e.model.concat(ce.model);
				e.texSet=e.texSet.concat(ce.texSet);
				e.hasTx=e.hasTx.concat(ce.hasTx);
			}
			e=addCharacterParts(e,1);
			entryArray.push(e);
			FalloutMV.UI.addMenuItem(esmArr[0].main.n+" (female)",false);
			//handle helm if it exists; 
			if(esmArr.length > 1){
				showHair=true,showHead=true,showBody=true,showLeft=true,showRight=true,showFullHair=true;
				var e= procArmorData(esmArr[0].main,0);
				for(var i=0; i < esmArr[0].children.length;i++){
					var ce = procArmorData(esmArr[0].children[i],0)
					e.model=e.model.concat(ce.model);
					e.texSet=e.texSet.concat(ce.texSet);
					e.hasTx=e.hasTx.concat(ce.hasTx);
				}
				var eh=procArmorData(esmArr[1].main,0);
				for(var i=0; i < esmArr[1].children.length;i++){
					var ce = procArmorData(esmArr[1].children[i],0)
					eh.model=e.model.concat(ce.model);
					eh.texSet=e.texSet.concat(ce.texSet);
					eh.hasTx=e.hasTx.concat(ce.hasTx);
				}
				e.model=e.model.concat(eh.model);
				e.texSet=e.texSet.concat(eh.texSet);
				e.hasTx=e.hasTx.concat(eh.hasTx);
				e=addCharacterParts(e,0);
				entryArray.push(e);
				FalloutMV.UI.addMenuItem(esmArr[0].main.n+" + "+esmArr[1].main.n,false);
				showHair=true,showHead=true,showBody=true,showLeft=true,showRight=true,showFullHair=true;
				var e= procArmorData(esmArr[0].main,1);
				for(var i=0; i < esmArr[0].children.length;i++){
					var ce = procArmorData(esmArr[0].children[i],1)
					e.model=e.model.concat(ce.model);
					e.texSet=e.texSet.concat(ce.texSet);
					e.hasTx=e.hasTx.concat(ce.hasTx);
				}
				var eh=procArmorData(esmArr[1].main,1);
				for(var i=0; i < esmArr[1].children.length;i++){
					var ce = procArmorData(esmArr[1].children[i],1)
					eh.model=e.model.concat(ce.model);
					eh.texSet=e.texSet.concat(ce.texSet);
					eh.hasTx=e.hasTx.concat(ce.hasTx);
				}
				e.model=e.model.concat(eh.model);
				e.texSet=e.texSet.concat(eh.texSet);
				e.hasTx=e.hasTx.concat(eh.hasTx);
				e=addCharacterParts(e,1);
				entryArray.push(e);
				FalloutMV.UI.addMenuItem(esmArr[0].main.n+" (female) + "+esmArr[1].main.n,false);
			}
			
			
		}else if(esmArr[0].main.tp=="WEAP"){
			procWeaponData(esm,'m','t','1m','1t',esm.n);
			if(esm.hasOwnProperty('md')){
				if(esm.md.hasOwnProperty('md1')){
					procWeaponData(esm.md['md1'],'m','t','1m','1t',esm.md.names[0]);
				}
				if(esm.md.hasOwnProperty('md2')){
					procWeaponData(esm.md['md2'],'m','t','1m','1t',esm.md.names[1]);
				}
				if(esm.md.hasOwnProperty('md3')){
					procWeaponData(esm.md['md3'],'m','t','1m','1t',esm.md.names[2]);
				}
				if(esm.md.hasOwnProperty('md12')){
					procWeaponData(esm.md['md12'],'m','t','1m','1t',esm.md.names[0]+" + "+esm.md.names[1]);
				}
				if(esm.md.hasOwnProperty('md13')){
					procWeaponData(esm.md['md13'],'m','t','1m','1t',esm.md.names[0]+" + "+esm.md.names[2]);
				}
				if(esm.md.hasOwnProperty('md23')){
					procWeaponData(esm.md['md23'],'m','t','1m','1t',esm.md.names[1]+" + "+esm.md.names[2]);
				}
				if(esm.md.hasOwnProperty('md123')){
					procWeaponData(esm.md['md123'],'m','t','1m','1t',esm.n+" + Three Mods");
				}
			}
		}else if(esmArr[0].main.tp=="CREA"){
			for(var i=0; i < esmArr.length;i++){
				var esm = esmArr[i].main;
				var e = getEntry();
				if(esm.hasOwnProperty('m')){
					for(var j=0; j < esm.m.length;j++){
						e.model.push(esm.p+esm.m[j]);
						e=blankTex(e);
					}
				}
				entryArray.push(e);
				FalloutMV.UI.addMenuItem(esm.n,false);
			}
		}else{
			var esm=esmArr[0].main;
			var e=getEntry();
			if(esm.hasOwnProperty('m')){
				e.model.push(esm['m'])
			}else{
				e.model.push(undefined);
			}
			if(esm.hasOwnProperty('t')){
				e.texSet.push(esm['t']);
				e.hasTx.push(true)
			}else{
				e=blankTex(e);
			}
			entryArray.push(e);
			FalloutMV.UI.addMenuItem(esm.n,false);
		}
		if(entryArray.length > 0){
			if(entryArray[0].model.length > 0){
				if(entryArray[0].model[0]!=undefined){FalloutMV.hasModel=true;} 
			}
		}
		callback();
	}
	return{
		parse : parse,
		esmArray : entryArray,
	};
})();

FalloutMV.Model = function() {
	this.isAttached=false;
	this.attachBone="";
	this.rootNode;
	this.totalNodes=0;
	this.nodeProgress=0;
	var _this = this;
	this.threeArray=[];
	FalloutMV.Model.prototype.create=function(nifObj,esm,esmIndex,doneCB){
		for(var i=0; i < nifObj.map.length;i++){
			if(nifObj.map[i]=="NiStringExtraData"){
				if(nifObj.blocks[i].stringData.indexOf("Bip01")!=-1){
					this.isAttached=true;
					var pat= /(Bip01 .+)/;
					this.attachBone = (pat.exec(nifObj.blocks[i].stringData))[0];
				}
			}
		}
		this.totalNodes=nodeCounter(nifObj);
		createThree(nifObj,0,esm[esmIndex].fullHair,function(){
			for(var i=0; i < _this.threeArray.length;i++){
				if(nifObj.blocks[i].numChildren > 0 && _this.threeArray[i]!=undefined){
					for(j=0; j < nifObj.blocks[i].numChildren;j++){
						if(nifObj.blocks[i].children[j]!=-1){
							_this.threeArray[i].add(_this.threeArray[nifObj.blocks[i].children[j]]);
						}
					}
				}
			}
			_this.rootNode=_this.threeArray[0];
		});
		doneCB(_this.rootNode);
	}
	
	function createThree(nifobj,index,sfh,doneCB){
		if(nifobj.map[index]=="NiNode" || nifobj.map[index]=="BSFadeNode" || nifobj.map[index]=="NiBillboardNode"){
			createNode(index,nifobj,sfh,function(node)
			{
				_this.threeArray.push(node);
				index++;
				if(index==nifobj.map.length){
					doneCB()
				}else{
					FalloutMV.Util.delay(createThree(nifobj,index,sfh,doneCB),5);
				}
			})
		}else if(nifobj.map[index]=="NiTriShape" || nifobj.map[index]=="NiTriStrips"){
			var ch = false;
			if(nifobj.header.type.indexOf("PE Hair")!=-1){ch=true;}
			createMesh(index,nifobj,sfh,ch,function(mesh)
			{
				_this.threeArray.push(mesh);
				index++;
				if(index==nifobj.map.length){
					doneCB()
				}else{
					FalloutMV.Util.delay(createThree(nifobj,index,sfh,doneCB),5);
				}
			})
		}else{
			index++;
			_this.threeArray.push(undefined);
			if(index==nifobj.map.length){
				doneCB()
			}else{
				FalloutMV.Util.delay(createThree(nifobj,index,sfh,doneCB),5);
			}
		}
		
	}
	
	function createNode(dataIndex,nifobj,sfh,doneCB){
		var mesh=new THREE.Bone();
		mesh.position.x=((nifobj.blocks[dataIndex].translation.x));
		mesh.position.y=((nifobj.blocks[dataIndex].translation.y));
		mesh.position.z=((nifobj.blocks[dataIndex].translation.z));
		var mat=nifobj.blocks[dataIndex].rotation;
		var matArray=[[mat.a1,mat.b1,mat.c1],[mat.a2,mat.b2,mat.c2],[mat.a3,mat.b3,mat.c3]];
		var aa=FalloutMV.Math.toAxisAngle(matArray);
		mesh.rotateOnAxis(new THREE.Vector3(aa[1],aa[2],aa[3]),aa[0]);
		mesh.name=nifobj.blocks[dataIndex].name;
		if(doneCB==undefined){return mesh;}else{doneCB(mesh);}
	}
	
	function readyNode(dataIndex,nifobj,sfh,doneCB){
		//var dummyMat=new THREE.MeshBasicMaterial({color:"#ff0000",});
		//var dummyGeom=new THREE.BoxGeometry(0,0,0);
		var mesh=new THREE.Bone();

		mesh.position.x=((nifobj.blocks[dataIndex].translation.x));
		mesh.position.y=((nifobj.blocks[dataIndex].translation.y));
		mesh.position.z=((nifobj.blocks[dataIndex].translation.z));

		var mat=nifobj.blocks[dataIndex].rotation;
		var matArray=[[mat.a1,mat.b1,mat.c1],[mat.a2,mat.b2,mat.c2],[mat.a3,mat.b3,mat.c3]];
		var aa=FalloutMV.Math.toAxisAngle(matArray);
		mesh.rotateOnAxis(new THREE.Vector3(aa[1],aa[2],aa[3]),aa[0]);

		mesh.name=nifobj.blocks[dataIndex].name;
		

		var i = 0, limit = nifobj.blocks[dataIndex].numChildren, busy = false;
		var processor = setInterval(function()
		{
			var index=nifobj.blocks[dataIndex].children[i];
			if(!busy)
			{
				busy = true;
				if(closing==true)
				{

					clearInterval(processor);
				}
				if(nifobj.map[index]=="NiTriStrips" || nifobj.map[index]=="NiTriShape")
				{
					nodeProgress++;
					var infoText="Generating Model..."+Math.round((nodeProgress/totalNodes)*100)+"%";
					$("#viewInfoText").text(infoText);
					readyModel(index,mesh);
					checkDone();
				}
				if(nifobj.map[index]=="NiNode")
				{
					nodeProgress++;
					var infoText="Generating Model..."+Math.round((nodeProgress/totalNodes)*100)+"%";
					$("#viewInfoText").text(infoText);
					readyNode(index,mesh);
					checkDone();
				}
				if(++i == limit)
				{
					clearInterval(processor);
					parent.add(mesh);

				}
				busy = false;
			}
		}, 5);

	}
	
	function createMesh(dataIndex,nifobj,sfh,isHair,doneCB){
		var hairColor = {r:0.27450980392156862745098039215686,g:0.22745098039215686274509803921569,b:0.2};
		var matInd;
		var texInd;
		var alphaInd;
		var shaderInd;
		var dInd=nifobj.blocks[dataIndex].data;
		for(var i=0; i < nifobj.blocks[dataIndex].numProperties;i++){
			if(nifobj.map[nifobj.blocks[dataIndex].properties[i]]=="NiMaterialProperty"){
				matInd=nifobj.blocks[dataIndex].properties[i];
			}
			if(nifobj.map[nifobj.blocks[dataIndex].properties[i]]=="BSShaderPPLightingProperty"){
				shaderInd=nifobj.blocks[dataIndex].properties[i];
				texInd=nifobj.blocks[nifobj.blocks[dataIndex].properties[i]].textureSet;
			}
			if(nifobj.map[nifobj.blocks[dataIndex].properties[i]]=="BSShaderNoLightingProperty"){
				shaderInd=nifobj.blocks[dataIndex].properties[i];
				texInd=nifobj.blocks[dataIndex].properties[i];
			}
			if(nifobj.map[nifobj.blocks[dataIndex].properties[i]]=="NiAlphaProperty"){
				alphaInd=nifobj.blocks[dataIndex].properties[i];
			}
		}
		var geometry = new THREE.Geometry();
		for(var i=0; i < nifobj.blocks[dInd].numVertices;i++){
			var vertset=nifobj.blocks[dInd].vertices[i];
			geometry.vertices.push(new THREE.Vector3(vertset.x,vertset.y,vertset.z));
		}
		
		var count=0;
		var i=0;
		var faces=[];
		var uvs=[];
		var vertexWeights=[]; //contains TriShapeVertex number array, of 4 element arrays. Contains 4 weights, for 4 bones, per vertex
		var vertexBoneIndices=[];
		if(nifobj.map[dInd]=="NiTriStripsData"){
			for(var v=0; v < nifobj.blocks[dInd].stripLengths[0]-2;v++){
				if(FalloutMV.Util.isUnique([nifobj.blocks[dInd].points[0][v],nifobj.blocks[dInd].points[0][v+1],nifobj.blocks[dInd].points[0][v+2]])){
					var normal;
					var color;
					var face;
					var ind=[nifobj.blocks[dInd].points[0][v],nifobj.blocks[dInd].points[0][v+1],nifobj.blocks[dInd].points[0][v+2]];
					if(v&1){
						if(nifobj.blocks[dInd].tangents.length>0){
							tangent=[vec3Convert(nifobj.blocks[dInd].tangents[ind[2]]),vec3Convert(nifobj.blocks[dInd].tangents[ind[1]]),vec3Convert(nifobj.blocks[dInd].tangents[ind[0]])];
						}
						if(nifobj.blocks[dInd].hasNormals>0){
							normal=[vec3Convert(nifobj.blocks[dInd].normals[ind[2]]),vec3Convert(nifobj.blocks[dInd].normals[ind[1]]),vec3Convert(nifobj.blocks[dInd].normals[ind[0]])];
						}else{
							normal=[];
						}
						if(isHair==true){
							if(nifobj.blocks[dInd].hasVertexColors==1){
								//2,1,0 = r,g,b
								var v1 = nifobj.blocks[dInd].vertexColors[ind[2]],
								v2 = nifobj.blocks[dInd].vertexColors[ind[1]],
								v3 = nifobj.blocks[dInd].vertexColors[ind[0]];
								v1 = FalloutMV.Util.setBrightness(hairColor,v1.r*2);
								v2= FalloutMV.Util.setBrightness(hairColor,v2.r*2);
								v3= FalloutMV.Util.setBrightness(hairColor,v3.r*2);
								color=[colorConvert(v1),colorConvert(v2),colorConvert(v3)];
							}else{
								color = [new THREE.Color(1,1,1),new THREE.Color(1,1,1),new THREE.Color(1,1,1)];
							}
						}else{
							color=(nifobj.blocks[dInd].hasVertexColors==1)?[colorConvert(nifobj.blocks[dInd].vertexColors[ind[2]]),colorConvert(nifobj.blocks[dInd].vertexColors[ind[1]]),colorConvert(nifobj.blocks[dInd].vertexColors[ind[0]])]:[new THREE.Color(1,1,1),new THREE.Color(1,1,1),new THREE.Color(1,1,1)];
						}
						face=new THREE.Face3(ind[2],ind[1],ind[0],normal,color,0);
						if(nifobj.blocks[dInd].bsNumUVSets>0){
							uvs.push([new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[2]].u,nifobj.blocks[dInd].uvSets[ind[2]].v),new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[1]].u,nifobj.blocks[dInd].uvSets[ind[1]].v),new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[0]].u,nifobj.blocks[dInd].uvSets[ind[0]].v)]);
						}
						if(nifobj.blocks[dInd].tangents.length > 0){
							face.vertexTangents=tangent;
						}
					}else{
						if(nifobj.blocks[dInd].tangents.length > 0){
							tangent=[vec3Convert(nifobj.blocks[dInd].tangents[ind[1]]),vec3Convert(nifobj.blocks[dInd].tangents[ind[2]]),vec3Convert(nifobj.blocks[dInd].tangents[ind[0]])];
						}
						if(nifobj.blocks[dInd].hasNormals>0){
							normal=[vec3Convert(nifobj.blocks[dInd].normals[ind[1]]),vec3Convert(nifobj.blocks[dInd].normals[ind[2]]),vec3Convert(nifobj.blocks[dInd].normals[ind[0]])];
						}else{
							normal=[];
						}
						color=(nifobj.blocks[dInd].hasVertexColors==1)?[colorConvert(nifobj.blocks[dInd].vertexColors[ind[1]]),colorConvert(nifobj.blocks[dInd].vertexColors[ind[2]]),colorConvert(nifobj.blocks[dInd].vertexColors[ind[0]])]:new THREE.Color(1,1,1);
						face=new THREE.Face3(ind[1],ind[2],ind[0],normal,color,0);
						if(nifobj.blocks[dInd].bsNumUVSets>0){
							uvs.push([new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[1]].u,nifobj.blocks[dInd].uvSets[ind[1]].v),new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[2]].u,nifobj.blocks[dInd].uvSets[ind[2]].v),new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[0]].u,nifobj.blocks[dInd].uvSets[ind[0]].v)]);
						}
						if(nifobj.blocks[dInd].tangents.length > 0){
							face.vertexTangents=tangent;
						}
					}
					faces.push(face);
				}
			}
		}else if(nifobj.map[dInd]=="NiTriShapeData"){
			if(nifobj.blocks[dInd].hasTriangles > 0){
				for(var i=0; i < nifobj.blocks[dInd].numTriangles;i++){		
					var normal;
					var color;
					var face;
					var tangent;	
					var ind= nifobj.blocks[dInd].triangles[i];
					if(nifobj.blocks[dInd].tangents.length>0){
						tangent=[vec3Convert(nifobj.blocks[dInd].tangents[ind[2]]),vec3Convert(nifobj.blocks[dInd].tangents[ind[1]]),vec3Convert(nifobj.blocks[dInd].tangents[ind[0]])];
					}
					if(nifobj.blocks[dInd].hasNormals>0){
						normal=[vec3Convert(nifobj.blocks[dInd].normals[ind[2]]),vec3Convert(nifobj.blocks[dInd].normals[ind[1]]),vec3Convert(nifobj.blocks[dInd].normals[ind[0]])];
					}else{
						normal=[];
					}
					if(isHair==true){
						if(nifobj.blocks[dInd].hasVertexColors==1){
							//2,1,0 = r,g,b
							var v1 = nifobj.blocks[dInd].vertexColors[ind[2]],
							v2 = nifobj.blocks[dInd].vertexColors[ind[1]],
							v3 = nifobj.blocks[dInd].vertexColors[ind[0]];
							v1 = FalloutMV.Util.setBrightness(hairColor,v1.r*2);
							v2= FalloutMV.Util.setBrightness(hairColor,v2.r*2);
							v3= FalloutMV.Util.setBrightness(hairColor,v3.r*2);
							color=[colorConvert(v1),colorConvert(v2),colorConvert(v3)];
						}else{
							color = [new THREE.Color(1,1,1),new THREE.Color(1,1,1),new THREE.Color(1,1,1)];
						}
					}else{
						color=(nifobj.blocks[dInd].hasVertexColors==1)?[colorConvert(nifobj.blocks[dInd].vertexColors[ind[2]]),colorConvert(nifobj.blocks[dInd].vertexColors[ind[1]]),colorConvert(nifobj.blocks[dInd].vertexColors[ind[0]])]:[new THREE.Color(1,1,1),new THREE.Color(1,1,1),new THREE.Color(1,1,1)];
					}					face=new THREE.Face3(ind[2],ind[1],ind[0],normal,color,0);
					if(nifobj.blocks[dInd].bsNumUVSets>0){
						uvs.push([new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[2]].u,nifobj.blocks[dInd].uvSets[ind[2]].v),new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[1]].u,nifobj.blocks[dInd].uvSets[ind[1]].v),new THREE.Vector2(nifobj.blocks[dInd].uvSets[ind[0]].u,nifobj.blocks[dInd].uvSets[ind[0]].v)]);
					}
					if(nifobj.blocks[dInd].tangents.length > 0){
						face.vertexTangents=tangent;
					}
					faces.push(face);
				}
			}
			if(nifobj.blocks[dataIndex].skinInstance != -1){
				var barray = [];
				var sdIdx = nifobj.blocks[nifobj.blocks[dataIndex].skinInstance].data;
				var spIdx = nifobj.blocks[nifobj.blocks[dataIndex].skinInstance].skinPartition;
				var boneRefs=nifobj.blocks[nifobj.blocks[dataIndex].skinInstance].bones;
				for(var s = 0; s < nifobj.blocks[spIdx].numSkinPartitionBlocks;s++){
					var spb=nifobj.blocks[spIdx].skinPartitionBlocks[s];
					var vweights;
					var bind;
					if(spb.hasVertexWeights==1){
						for( var v=0; v < spb.vertexWeights.length;v++){
							vweights = new THREE.Vector4(spb.vertexWeights[v][0],spb.vertexWeights[v][1],spb.vertexWeights[v][2],spb.vertexWeights[v][3]);
							if(spb.hasBoneIndices==1){
								bind=new THREE.Vector4(spb.bones[spb.boneIndices[v][0]],spb.bones[spb.boneIndices[v][1]],spb.bones[spb.boneIndices[v][2]],spb.bones[spb.boneIndices[v][3]]);
							}else{
								// We'll have to play around to see what kind of situation exists in this case.
							}
							if(spb.hasVertexMap==1){
								vertexWeights[spb.vertexMap[v]]=vweights;
								vertexBoneIndices[spb.vertexMap[v]]=bind;
							}else{
								//then I guess 'v' is the appropriate index. 
								vertexWeights[v]=vweights;
								vertexBoneIndices[v]=bind;
							}
						}
					}else{
						//? maybe set them all at 1? 
					}
				}
				for(var b = 0; b < nifobj.blocks[sdIdx].numBones;b++){
					var mat=nifobj.blocks[boneRefs[b]].rotation;
					var matArray=[[mat.a1,mat.b1,mat.c1],[mat.a2,mat.b2,mat.c2],[mat.a3,mat.b3,mat.c3]];
					var aa=FalloutMV.Math.toAxisAngle(matArray);
					var quat = new THREE.Quaternion();
					quat.setFromAxisAngle(new THREE.Vector3(aa[0],aa[1],aa[2]),aa[3]);
					var bone = {"name":nifobj.blocks[boneRefs[b]].name,"pos":[nifobj.blocks[boneRefs[b]].translation.x,nifobj.blocks[boneRefs[b]].translation.y,nifobj.blocks[boneRefs[b]].translation.z],"rotq":[quat.x,quat.y,quat.z,quat.w],"scl":undefined,"parent":-1,};
					barray.push(bone);
				}
				geometry.bones=barray;
			}
		}
		geometry.faces=faces;
		geometry.faceVertexUvs=[];
		geometry.faceVertexUvs.push(uvs);
		geometry.skinIndices=vertexBoneIndices;
		geometry.skinWeights=vertexWeights;
		if(texInd!=undefined){
			if(nifobj.map[texInd]=="BSShaderTextureSet"){
				texList=nifobj.blocks[texInd].textures;
			}else{
				texList=[nifobj.blocks[texInd].fileName,"","","","",""];
			}
			var m=(texList[0]!="")?FalloutMV.Texture.collection[FalloutMV.Util.formatAssetKey(texList[0])]:null;
			m.needsUpdate=true;
			var nm=(texList[1]!="")?FalloutMV.Texture.collection[FalloutMV.Util.formatAssetKey(texList[1])]:null;
			var sm=(texList[1]!="")?FalloutMV.Texture.collection[FalloutMV.Util.formatAssetKey(texList[1])]:null;
			var em=(texList[4]!="")?FalloutMV.Texture.collection[FalloutMV.Util.formatAssetKey(texList[4])]:null;
			var emm=(texList[5]!="")?FalloutMV.Texture.collection[FalloutMV.Util.formatAssetKey(texList[5])]:null;
			var gm=(texList[2]!="")?FalloutMV.Texture.collection[FalloutMV.Util.formatAssetKey(texList[2])]:null;
			var material  = new THREE.MeshFalloutPhongMaterial({
				map:m,
				normalMap:nm,
				specularMap:sm,
				envMap:em,
				lightMap:gm,
				alphaMap:emm,
				shininess:nifobj.blocks[matInd].glossiness,
				specular:new THREE.Color(nifobj.blocks[matInd].specularColor.r,nifobj.blocks[matInd].specularColor.g,nifobj.blocks[matInd].specularColor.b),
				emissive:new THREE.Color(nifobj.blocks[matInd].emissiveColor.r,nifobj.blocks[matInd].emissiveColor.g,nifobj.blocks[matInd].emissiveColor.b),
				vertexColors:THREE.VertexColors
			});
		}else{
			var material  = new THREE.MeshFalloutPhongMaterial({
				shininess:nifobj.blocks[matInd].glossiness,
				specular:new THREE.Color(nifobj.blocks[matInd].specularColor.r,nifobj.blocks[matInd].specularColor.g,nifobj.blocks[matInd].specularColor.b),
				emissive:new THREE.Color(nifobj.blocks[matInd].emissiveColor.r,nifobj.blocks[matInd].emissiveColor.g,nifobj.blocks[matInd].emissiveColor.b),
				vertexColors:THREE.VertexColors
			});
		}
		material.combine=2;
		var sfAlphaTextureFlag=0x00000100;
		material.transparent=true;
		if(shaderInd){
			if((nifobj.blocks[shaderInd].shaderFlags & sfAlphaTextureFlag)==sfAlphaTextureFlag && !alphaInd){
				material.transparent=false;
			}
		}
		material.side=THREE.DoubleSide;
		material.opacity=nifobj.blocks[matInd].alpha;
		if(alphaInd!=undefined){
			//need to eventually read the bitfield here...but for testing...
			if(nifobj.blocks[alphaInd].flags==4109){
				material.blending=5;
				material.depthWrite=false;
				material.blendSrc=THREE.SrcAlphaFactor;
				material.blendDst=THREE.OneFactor;
				material.transparent=true;
			}
		}
		var mesh;
		if(nifobj.map[dataIndex]=="NiTriShape" && nifobj.blocks[dataIndex].skinInstance > 0){	
			
			mesh = new THREE.SkinnedMesh(geometry,material);
			var mat=(nifobj.blocks[sdIdx].rotation);
			var matArray=[[mat.a1,mat.b1,mat.c1],[mat.a2,mat.b2,mat.c2],[mat.a3,mat.b3,mat.c3]];
			var aa=FalloutMV.Math.toAxisAngle(matArray);
			mesh.rotateOnAxis(new THREE.Vector3(aa[1],aa[2],aa[3]),aa[0]);
			var skinx=nifobj.blocks[sdIdx].translation.x;
			var skiny=nifobj.blocks[sdIdx].translation.y;
			var skinz=nifobj.blocks[sdIdx].translation.z;
			var meshx=nifobj.blocks[dataIndex].translation.x;
			var meshy=nifobj.blocks[dataIndex].translation.y;
			var meshz=nifobj.blocks[dataIndex].translation.z;
			var multx=1;
			var multy=1;
			var multz=1;
			if(skinx < 0 && meshx >= 0){
				multx=-1;
			}else if(skinx >= 0 && meshx < 0){
				multx=-1
			}
			if(skiny < 0 && meshy >= 0){
				multy=-1;
			}else if(skiny >= 0 && meshy < 0){
				multy=-1
			}
			if(skinz < 0 && meshz >= 0){
				multz=-1;
			}else if(skinz >= 0 && meshz < 0){
				multz=-1
			}
			mesh.position.x=(nifobj.blocks[sdIdx].translation.x*multx);
			mesh.position.y=(nifobj.blocks[sdIdx].translation.y*multy);
			mesh.position.z=(nifobj.blocks[sdIdx].translation.z*multz);
				
		}else{
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.x=(nifobj.blocks[dataIndex].translation.x);
			mesh.position.y=(nifobj.blocks[dataIndex].translation.y);
			mesh.position.z=(nifobj.blocks[dataIndex].translation.z);
			var mat=nifobj.blocks[dataIndex].rotation;
			var matArray=[[mat.a1,mat.b1,mat.c1],[mat.a2,mat.b2,mat.c2],[mat.a3,mat.b3,mat.c3]];
			var aa=FalloutMV.Math.toAxisAngle(matArray);
			mesh.rotateOnAxis(new THREE.Vector3(aa[1],aa[2],aa[3]),aa[0]);
		}
		mesh.castShadow=true;
		mesh.receiveShadow=true;
		mesh.name=nifobj.blocks[dataIndex].name;
		if(texList[0].toLowerCase().indexOf("meatcapgore01")!=-1){
			mesh.visible=false;
		}
		if(mesh.name=="Hat" && sfh==true){
			mesh.visible=false;
		}
		if(mesh.name=="NoHat" && sfh==false){
			mesh.visible=false;
		}
			mesh.userData=dataIndex;
			if(doneCB==undefined){return mesh;}else{doneCB(mesh);}

		
	};
	function nodeCounter(nifobj){
		var nodes=0;
		for(var i=0; i < nifobj.map.length;i++)
		{
			if(nifobj.map[i]=="NiNode" || nifobj.map[i]=="NiTriStrips" || nifobj.map[i]=="NiTriShape")
			{
				nodes++;
			}
		}
		return nodes;
	}
	
	function vec3Convert(vec3F){
		return new THREE.Vector3(vec3F.x,vec3F.y,vec3F.z);
	}

	function colorConvert(col4){
		return new THREE.Color(col4.r,col4.g,col4.b);
	}
	

}

FalloutMV.Data = (function() {
	var scrArray=["Three.js","DDSLoader.js","FalloutExtensions.js"]//,"Jdataview.js","Jparser.js"];
	if(FalloutMV.hasButton==true){
		loadScripts(scrArray,0);
		if(FalloutMV.isLive==true){
			importScript("MediaWiki:Jdataview.js");
			importScript("MediaWiki:Jparser.js");
		}
	}
	
	function setup(callback)
	{
		if(FalloutMV.game=="fnv"){
				data=$.extend({},fnv1,fnv2,fnv3);
				delete window.fnv1;
				delete window.fnv2;
				delete window.fnv3;
			}else if(FalloutMV.game=="f3"){
				data=$.extend({},f31,f32);
				delete window.f31;
				delete window.f32;
			}
			var esmData=[];
			for(var i=0; i < FalloutMV.edids.length;i++){
				var esmobj={
					"main":data[FalloutMV.edids[i]],
					"children":[]
				}
				if(esmobj.main){
					if(esmobj.main.hasOwnProperty('aa')){
						for(var j =0; j < esmobj.main.aa.length;j++){
							esmobj.children.push(data[esmobj.main.aa[j]]);
						}
					}
				}
				esmData.push(esmobj);
			}
			if(esmData.length > 0)
			{
				FalloutMV.hasData=true;
			}
			callback(esmData);
		
	}
	
	function load(callback)
	{


		if(FalloutMV.game=="f3"){
			scrArray=["Data31.js","Data32.js"];	
		}else if(FalloutMV.game == "fnv"){
			scrArray=["DataNV1.js","DataNV2.js","DataNV3.js"];
		}
		loadScripts(scrArray,0,function(){setup(callback)});
	}
	function loadScripts(scriptArray,index,finish,progress)
	{
		$.get(FalloutMV.Util.formatURL(scriptArray[index]),function( data, textStatus, jqxhr ) {
			index++;
			eval(data);
			if(index != scriptArray.length)
			{
				FalloutMV.Util.delay(loadScripts(scriptArray,index,finish,progress),10)
			}else{
				if(finish!=undefined){finish();}
			}
		});
	}
	return {
		load : load,
		
	}
})();


FalloutMV.Main = (function() {
	
	if(FalloutMV.hasGL==true){
		if(FalloutMV.hasButton){
			FalloutMV.Data.load(function(data){
				FalloutMV.ESM.parse(data,function(){
					FalloutMV.UI.checkButton();
				});
			});
		}
	}else{
		FalloutMV.UI.cancelModel();
	}
	
	
})();

FalloutMV.Scene=(function(){
	var _this = this;
	var lastIndex = -1;
	var rootModel;
	var sceneReady = false;
	var controls;
	var renderer;
	var camera;
	var scene;
	var partArray=[];
	var coreArray=[];
	var currentIndex;
	var boxMesh;
	var light;
	var init=function(eIdx){
		this.currentIndex=eIdx;
		FalloutMV.UI.showViewer();
		var _this = this;
		if(this.renderer == undefined){
			this.animationFrame=null;
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera( 45, $(".viewer").width() / $(".viewer").height(), 1, 100000 );
			this.camera.position.z = 50;
			this.light = new THREE.PointLight(0xa49173);
			this.light.position.set(-100,-200,-100);
			var light2 = new THREE.PointLight(0xa49173);
			light2.position.set(100,200,100);
			this.scene.add(light2)
			this.boxMesh = new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true,}));
			this.boxMesh.position.set(-100,-200,-100);
			//this.scene.add(this.boxMesh);
			this.scene.add(this.light);
			var ambientLight = new THREE.AmbientLight(0xa49173);
			this.scene.add(ambientLight);
			this.renderer = new THREE.WebGLFalloutRenderer({antialias:true});
			this.renderer.setSize( $(".viewer").width(), $(".viewer").height() );
			this.controls = new THREE.TrackballControls(FalloutMV.Scene.camera);
			this.controls.rotateSpeed=2;
			this.controls.addEventListener( 'change', FalloutMV.Scene.render );
			this.root=new THREE.Bone();
			this.scene.add(this.root);
			
			FalloutMV.Scene.render()
			
			$(".viewer").append( this.renderer.domElement );
		}else{
			this.partArray=[];
			this.coreArray=[];
			this.camera.position.z = 50;
			this.controls.enabled=true;
			this.root=new THREE.Bone();
			this.scene.add(this.root);
			render(this);
		}

			FalloutMV.NIF.load(FalloutMV.ESM.esmArray[FalloutMV.Scene.currentIndex].model,0,function(nifs){
				FalloutMV.Texture.parse(nifs,FalloutMV.ESM.esmArray,FalloutMV.Scene.currentIndex,function(texs){
					FalloutMV.Scene.loadModels(nifs,FalloutMV.ESM.esmArray,0,function(){
						FalloutMV.Scene.buildScene();
					})
				});
			});
			
			
		
		
	}
	
	function loadModels(nifArray,esmArray,index,doneCB)
	{
		var m = new FalloutMV.Model()
		m.create(nifArray[index],esmArray,FalloutMV.Scene.currentIndex,function(mesh){
			if(m.isAttached==true){
				FalloutMV.Scene.partArray.push({"bone":m.attachBone,"mesh":mesh});
			}else{
				FalloutMV.Scene.coreArray.push(mesh);
			}
			index++;
			if(index == nifArray.length){
				doneCB();
			}else{
				loadModels(nifArray,esmArray,index,doneCB);
			}
		})
	}
	
	function buildScene()
	{
		for(var i=0; i < FalloutMV.Scene.coreArray.length;i++){
			var cn=FalloutMV.Scene.coreArray[i];
			FalloutMV.Scene.root.add(cn);
		}
		for(var i=0; i < FalloutMV.Scene.partArray.length; i++){
			var part = FalloutMV.Scene.partArray[i];
			for(var j=0; j < FalloutMV.Scene.coreArray.length;j++){
				var cn=FalloutMV.Scene.coreArray[j];
				var cb=cn.getObjectByName(part.bone);
				if(cb != undefined){
					FalloutMV.Scene.root.add(part.mesh);
					part.mesh.position.x=cb.position.x;
					part.mesh.position.y=cb.position.y;
					part.mesh.position.z=cb.position.z;
					part.mesh.traverse(function(obj){
						if(obj.type=="Mesh"){
							obj.position.y=(obj.position.y*-1);
						}
					});
					part.mesh.rotation.x=(cb.rotation.x);
					part.mesh.rotation.y=(cb.rotation.y);
					part.mesh.rotation.z=(cb.rotation.z);
					part.mesh.rotation.order=cb.rotation.order;
					
					
					//part.mesh.rotation=cb.rotation;
					break;
				}
			}
		}
		FalloutMV.UI.hideInfo();
		
	
		if(FalloutMV.type != "WEAP"){
			FalloutMV.Scene.root.rotation.x=(-90 * (Math.PI/180))
		}else{
			FalloutMV.Scene.root.rotation.x=(-180 * (Math.PI/180))
		}
		FalloutMV.Scene.root.rotation.z=(180 * (Math.PI/180))
		var box=new THREE.Box3().setFromObject(FalloutMV.Scene.root);
		var sphere=box.getBoundingSphere();
		var distanceFactor = Math.abs((FalloutMV.Scene.camera.aspect * ((Math.abs(box.min.y)+box.max.y)/2))/(2*Math.tan(FalloutMV.Scene.camera.fov/2)));
		FalloutMV.Scene.root.position.y=FalloutMV.Scene.root.position.y-sphere.center.y
		FalloutMV.Scene.root.position.z=FalloutMV.Scene.root.position.z-sphere.center.z
		FalloutMV.Scene.root.position.x=FalloutMV.Scene.root.position.x-sphere.center.x
		FalloutMV.Scene.camera.position.z += distanceFactor
		FalloutMV.Scene.animate()
	}
	
	function render(){
		FalloutMV.Scene.renderer.render(FalloutMV.Scene.scene,FalloutMV.Scene.camera);
		
	}
	
	function animate(){
		FalloutMV.Scene.animationFrame=requestAnimationFrame(FalloutMV.Scene.animate );
		FalloutMV.Scene.controls.update();
		FalloutMV.Scene.renderer.render( FalloutMV.Scene.scene, FalloutMV.Scene.camera );
		
	}
	
	return{
		init : init,
		controls : this.controls,
		scene : this.scene,
		animate : animate,
		render : render,
		loadModels : loadModels,
		buildScene : buildScene,
		partArray : partArray,
		coreArray : coreArray,
		currentIndex : currentIndex,
		boxMesh : this.boxMesh,
		light : this.light,
	};
	
})();

FalloutMV.Texture = (function(){
	var tempData="";
	var collection={};
	var that=this;
	function load(fileArray,index,doneCB,progCB,mpIdx){
		var url = FalloutMV.nameSpace+FalloutMV.gamePrefix+FalloutMV.Util.formatAssetURL("",fileArray[index],true);
		var cur = FalloutMV.Util.formatAssetKey(fileArray[index]);
		
		if(mpIdx!=undefined){
			url=url+"p"+mpIdx;
		}
		FalloutMV.UI.showProgress("Loading Textures",index,fileArray.length,index,fileArray.length);
		$.ajax({
			url: url+"?action=raw",
			async: "true",
			statusCode: {
				404: function () {
					FalloutMV.UI.addError(FalloutMV.lNameSpace+FalloutMV.lGamePrefix+fileArray[index]);
					FalloutMV.Texture.collection[cur]=createDefaultTexture();
					index++
					if(index==fileArray.length){
						doneCB(FalloutMV.Texture.collection)
					}else{
						FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5)
					}
				}
		
			},
			beforeSend: function (xhr) {
				if(FalloutMV.isLive==false){xhr.overrideMimeType("text/plain; charset=x-user-defined");}
			}
		})
		.done(function (data) {
			if(data.indexOf('CONT')==-1 || FalloutMV.isLive==false ){
				if(FalloutMV.isLive==false){
					FalloutMV.Texture.collection[cur]=THREE.DDSLoader.parse(FalloutMV.Util.btoab(data),false);
					index++;
					if(index==fileArray.length){
						if(doneCB!=undefined){doneCB(FalloutMV.Texture.collection)};
					}else{
						FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5);
					}
					
				}else{
					if(mpIdx!=undefined){
						tempData+=FalloutMV.Util.bstoa(data);
						tempData=FalloutMV.Util.btoab(atob(tempData));
						FalloutMV.Texture.collection[cur]=THREE.DDSLoader.parse(tempData,false);
						index++;
						if(index==fileArray.length){
							if(doneCB!=undefined){doneCB(FalloutMV.Texture.collection)};
						}else{
							FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5);
						}
					}else{
						FalloutMV.Texture.collection[cur]=THREE.DDSLoader.parse(FalloutMV.Util.btoab(atob(FalloutMV.Util.bstoa(data))),false);
						index++;
						if(index==fileArray.length){
							if(doneCB!=undefined){doneCB(FalloutMV.Texture.collection)};
						}else{
							FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5);
						}
					}
				}
				
			}else{
				if(mpIdx==undefined){
					tempData=FalloutMV.Util.bstoa(data.slice(0,-4));
					FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB,2),5)
				}else{
					mpIdx++;
					tempData+=FalloutMV.Util.bstoa(data.slice(0,-4));
					FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB,mpIdx),5)
				}
				
			}
			
		});
		
	}
	
	function parse(nifobjs,esmArray,si,callback){
		var loadList=[]
		collection=[];
		for(var n=0; n < nifobjs.length;n++){
			var nifobj=nifobjs[n];
			var nodeArray=[];
			for(i=0;i < nifobj.blocks[0].numChildren;i++){
				var index=nifobj.blocks[0].children[i];
				if(nifobj.map[index]=="NiTriStrips" || nifobj.map[index]=="NiTriShape"){
					nodeArray.push(nifobj.blocks[index]);
				}
				if(nifobj.map[index]=="NiNode"){
					nodeArray=getStripNodes(index,nifobj,nodeArray);
				}
			}
			for(var j=0; j < nodeArray.length;j++)
			{
				for(var i=0; i < nodeArray[j].numProperties;i++)
				{
					var flag1=false;
					var flag2=false;
					var texInd = undefined;
					if(nifobj.map[nodeArray[j].properties[i]]=="BSShaderPPLightingProperty"){
						texInd=nifobj.blocks[nodeArray[j].properties[i]].textureSet;
					}
					if(nifobj.map[nodeArray[j].properties[i]]=="BSShaderNoLightingProperty"){
						texInd=nodeArray[j].properties[i];
					}
					if(texInd!=undefined){
						if(nifobj.map[texInd]=="BSShaderTextureSet"){
							texList=nifobj.blocks[texInd].textures;
							if(esmArray[si].hasTx[n]==true){
								if(esmArray[si].texSet[n].hasOwnProperty(nodeArray[j].name)){
									var tl = esmArray[si].texSet[n][nodeArray[j].name];
									var texMap=[0,1,5,2,3,4];
									for(var ti=0; ti < tl.length; ti++){
										if(tl[ti]!=""){
											nifobj.blocks[texInd].textures[texMap[ti]]='Textures\\'+tl[ti];
										}
									}
								}
							}
							for(var ti=0; ti < nifobj.blocks[texInd].textures.length;ti++){
								if(nifobj.blocks[texInd].textures[ti]!=""){
									loadList.push(nifobj.blocks[texInd].textures[ti]);
								}
							}
					}else{
						loadList.push(nifobj.blocks[texInd].fileName);
					}

				}
			}
		}
	}
		uLoadList=[];
		$.each(loadList, function(i, el){
			if($.inArray(el, uLoadList) === -1) uLoadList.push(el);
		});
		load(uLoadList,0,callback);
	}
	
	function createDefaultTexture()
	{
		var image = new Image();
		image.src="data:image/gif;base64,R0lGODlhAQABAIAAAH9/fwAAACwAAAAAAQABAAACAkQBADs=";
		var tex = new THREE.Texture(image,undefined);
		tex.needsUpdate=true;
		return tex
	};

	function getStripNodes(dataIndex,nifobj,nodeArray)
			{
				for(var i=0; i < nifobj.blocks[dataIndex].numChildren; i++){
					var index=nifobj.blocks[dataIndex].children[i];
					if(nifobj.map[index]=="NiTriStrips" || nifobj.map[index]=="NiTriShape"){
						nodeArray.push(nifobj.blocks[index]);
					}
					if(nifobj.map[index]=="NiNode"){
						nodeArray=getStripNodes(index,nifobj,nodeArray);
					}
				}
				return nodeArray;
			}
	
	return{
		parse: parse,
		load: load,
		collection: collection,
	};
})();

FalloutMV.NIF = (function(){
	var tempData="", nifObjs=[];
	function load(fileArray,index,doneCB,progCB,mpIdx){
		var url = FalloutMV.nameSpace+FalloutMV.gamePrefix+FalloutMV.Util.formatAssetURL("Meshes\\",fileArray[index],true);
		if(mpIdx!=undefined){
			url=url+"p"+mpIdx;
		}
		if(index==0 && mpIdx==undefined)
		{
			nifObjs = [];
		}
		$.ajax({
			url: url+"?action=raw",
			async: "true",
			statusCode: {
				404: function () {
					FalloutMV.UI.addError(FalloutMV.lNameSpace+FalloutMV.lGamePrefix+"meshes\\"+fileArray[index]);
					index++
					if(index==fileArray.length){
						doneCB(nifObjs)
					}else{
						FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5)
					}
				}
		
			},
			beforeSend: function (xhr) {
				if(FalloutMV.isLive==false){xhr.overrideMimeType("text/plain; charset=x-user-defined");}
			}
		})
		.done(function (data) {
			if(data.indexOf('CONT')==-1 || FalloutMV.isLive==false ){
				if(FalloutMV.isLive==false){
					FalloutMV.Util.delay(
							parse(data,function(obj){
								//complete
								nifObjs.push(obj);
								index++;
								if(index==fileArray.length){
									if(doneCB!=undefined){doneCB(nifObjs)};
								}else{
									FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5);
								}
							},function(i,t){
								//progress
								FalloutMV.UI.showProgress("Parsing Model",i,t,index,fileArray.length);
							}),5);
				}else{
					if(mpIdx!=undefined){
						tempData+=FalloutMV.Util.bstoa(data);
						tempData=atob(tempData);
						FalloutMV.Util.delay(
							parse(tempData,function(obj){
								//complete
								nifObjs.push(obj);
								index++;
								if(index==fileArray.length){
									if(doneCB!=undefined){doneCB(nifObjs)};
								}else{
									FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5);
								}
							},function(i,t){
								//progress
								FalloutMV.UI.showProgress("Parsing Model",i,t,index,fileArray.length);
							}),5);
					}else{
						data=atob(FalloutMV.Util.bstoa(data));
						FalloutMV.Util.delay(
							parse(data,function(obj){
								//complete
								nifObjs.push(obj);
								index++;
								if(index==fileArray.length){
									if(doneCB!=undefined){doneCB(nifObjs)};
								}else{
									FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB),5);
								}
							},function(i,t){
								//progress
								FalloutMV.UI.showProgress("Parsing Model",i,t,index,fileArray.length);
							}),5);
					}
				}
				
			}else{
				if(mpIdx==undefined){
					tempData=FalloutMV.Util.bstoa(data.slice(0,-4));
					FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB,2),5)
				}else{
					mpIdx++;
					tempData+=FalloutMV.Util.bstoa(data.slice(0,-4));
					FalloutMV.Util.delay(load(fileArray,index,doneCB,progCB,mpIdx),5)
				}
				
			}
			
		});
		
	}
	
	function parse(mdata,doneCB,progCB){
		var nif=new jDataView(mdata);
		nif._littleEndian=true;
		var parser = new jParser(nif, {
			vec3F:{
				'x': 'float32',
				'y': 'float32',
				'z': 'float32'
			},

			vec4F:{
				'x': 'float32',
				'y': 'float32',
				'z': 'float32',
				'w': 'float32'
			},

			quat:{
				'w': 'float32',
				'x': 'float32',
				'y': 'float32',
				'z': 'float32'

			},

			mat9F:{
				'a1': 'float32',
				'b1': 'float32',
				'c1': 'float32',
				'a2': 'float32',
				'b2': 'float32',
				'c2': 'float32',
				'a3': 'float32',
				'b3': 'float32',
				'c3': 'float32'
			},

			mat4F:{
				'a1': 'float32',
				'b1': 'float32',
				'a2': 'float32',
				'b2': 'float32'
			},

			color3F:{
				'r': 'float32',
				'g': 'float32',
				'b': 'float32'
			},

			color4F:{
				'r': 'float32',
				'g': 'float32',
				'b': 'float32',
				'a': 'float32'
			},
			im12F:{
				'ma1': 'float32',
				'mb1': 'float32',
				'mc1': 'float32',
				'md1': 'float32',
				'ma2': 'float32',
				'mb2': 'float32',
				'mc2': 'float32',
				'md2': 'float32',
				'ma3': 'float32',
				'mb3': 'float32',
				'mc3': 'float32',
				'md3': 'float32',
			},
			mat16F:{
				'ma1': 'float32',
				'mb1': 'float32',
				'mc1': 'float32',
				'md1': 'float32',
				'ma2': 'float32',
				'mb2': 'float32',
				'mc2': 'float32',
				'md2': 'float32',
				'ma3': 'float32',
				'mb3': 'float32',
				'mc3': 'float32',
				'md3': 'float32',
				'ma4': 'float32',
				'mb4': 'float32',
				'mc4': 'float32',
				'md4': 'float32'
			},
			uv:{
				'u':'float32',
				'v':'float32'
			},
			stringEntry:function(){
				var len = this.parse('uint32');
				var res = this.parse(['string',len]);
				return res;
			},

			nameLookup:function(){
				var idx=this.parse('uint32');
				return nameTable[idx];
			},
			pointCollection:function(){
				var points=[];
				if(hpoints > 0){
					for(var i=0; i < strips; i++){
						points.push(this.parse(['array','uint16',stripLengths[i]]));
					}
				}
				return points;
			},
			numStrips:function(){
				strips=this.parse('uint16');
				return strips;
			},
			stripLengths:function(){
				stripLengths=this.parse(['array','uint16',strips])
				return stripLengths;
			},
			hasPoints:function(){
				hpoints=this.parse('int8');
				return hpoints;
			},
			texprop:function(){
				var res={
					name:null,
					numExtraDataList:null,
					extraDataList:null,
					controller:null,
					flags:null,
					textureCount:null,
					hasBaseTexture:null,
					baseTexture:null,
					hasDarkTexture:null,
					darkTexture:null,
					hasDetailTexture:null,
					detailTexture:null,
					hasGlossTexture:null,
					glossTexture:null,
					hasGlowTexture:null,
					glowTexture:null,
					hasBumpMapTexture:null,
					bumpMapTexture:null,
					bumpMapLumaScale:null,
					bumpMapLumaOffset:null,
					bumpMapMatrix:null,
					hasNormalTexture:null,
					normalTexture:null,
					hasUnknownTexture:null,
					unknownTexture:null,
					unknownFloat:null,
					hasDecal0Texture:null,
					decal0Texture:null,
					hasDecal1Texture:null,
					decal1Texture:null,
					hasDecal2Texture:null,
					decal2Texture:null,
					hasDecal3Texture:null,
					decal3Texture:null,
					numShaderTextures:null,
					shaderTextures:null,
				};
				res.name=this.parse('nameLookup');
				res.numExtraDataList=this.parse('uint32');
				res.extraDataList=this.parse(['array','int32',res.numExtraDataList]);
				res.controller=this.parse('int32');
				res.flags=this.parse('uint16');
				res.textureCount=this.parse('uint32');
				res.hasBaseTexture=this.parse('int8');
				if(res.hasBaseTexture==1){
					res.baseTexture=this.parse('texDesc');
				}
				res.hasDarkTexture=this.parse('int8');
				if(res.hasDarkTexture==1){
					res.darkTexture=this.parse('texDesc');
				}
				hasDetailTexture=this.parse('int8');
				if(res.hasDetailTexture==1){
					res.detailTexture=this.parse('texDesc');
				}
				res.hasGlossTexture=this.parse('int8');
				if(res.hasGlossTexture==1){
					res.glossTexture=this.parse('texDesc');
				}
				res.hasGlowTexture=this.parse('int8');
				if(res.hasGlowTexture==1){
					res.glowTexture=this.parse('texDesc');
				}
				res.hasBumpMapTexture=this.parse('int8');
				if(res.hasBumpMapTexture==1){
					res.bumpMapTexture=this.parse('texDesc');
					res.bumpMapLumaScale=this.parse('float32');
					res.bumpMapLumaOffset=this.parse('float32');
					res.bumpMapMatrix=this.parse('mat4F');
				}
				res.hasNormalTexture=this.parse('int8');
				if(res.hasNormalTexture==1){
					res.normalTexture=this.parse('texDesc');
				}
				res.hasUnknownTexture=this.parse('int8');
				if(res.hasUnknownTexture==1){
					res.unknownTexture=this.parse('texDesc');
					res.unknownFloat=this.parse('float32');
				}

				res.hasDecal0Texture=this.parse('int8');
				if(res.hasDecal0Texture==1){
					res.decal0Texture=this.parse('texDesc');
				}
				if(res.textureCount>=10){
					res.hasDecal1Texture=this.parse('int8');
					if(res.hasDecal1Texture==1){
						res.decal1Texture=this.parse('texDesc');
					}
				}
				if(res.textureCount>=11){
					res.hasDecal2Texture=this.parse('int8');
					if(res.hasDecal2Texture==1){
						res.decal2Texture=this.parse('texDesc');
					}
				}
				if(res.textureCount>=12){
					res.hasDecal3Texture=this.parse('int8');
					if(res.hasDecal3Texture==1){
						res.decal3Texture=this.parse('texDesc');
					}
				}

				res.numShaderTextures=this.parse('uint32');
				res.shaderTextures=this.parse(['array','shaderTexture',res.numShaderTextures]);
				return res;
			},
			shaderTexture:function(){
				var res={
					isUsed:null,
					textureData:null,
					mapIndex:null,
				};
				res.isUsed=this.parse('int8');
				if(res.isUsed==1){
					res.textureData=this.parse('texDesc');
					res.mapIndex=this.parse('uint32');
				}
				return res;
			},
			texDesc:function(){
				var res={
					source:null,
					flags:null,
					unkShort:null,
					hasTextureTransform:null,
					translation:null,
					tiling:null,
					wRotation:null,
					transformType:null,
					centerOffset:null
				};
				res.source=this.parse('int32');
				res.flags=this.parse('int16');
				//res.unkShort=this.parse('int16');
				res.hasTextureTransform=this.parse('int8');
				if(res.hasTextureTransform==1)
				{
					res.translation=this.parse('uv');
					res.tiling=this.parse('uv');
					res.wRotation=this.parse('float32');
					res.transformType=this.parse('uint32');
					res.centerOffset=this.parse('uv');

				}

				return res;
			},

			header:{
				fileinfo:['string',30],
				version:['string',8],
				unkbyte:'uint8',
				version2:['array','uint8',4],
				unkbyte2:'uint8',
				unkint:'uint32',
				blockCount:'uint32',
				unkint2:'uint32',
				unkStrLen:'uint8',
				unkStr:['string',function(){return this.current.unkStrLen}],
				doNothingLen:'uint8',
				doNothingStr:['string',function(){return this.current.doNothingLen}],
				typeLength:'int8',
				type:['string',function(){return this.current.typeLength}]
			},
			blockNames:{
				nameCount:'uint16',
				names:['array','stringEntry',function(){return this.current.nameCount;}]
			},
			stringData:{
				stringCount:'uint32',
				unkInt:'uint32',
				strings:['array','stringEntry',function(){return this.current.stringCount;}],
				unkInt2:'uint32'
			},

			keyparser:function(type,inter){
				var k={
					time:this.parse('float32'),
					value:this.parse(type),
					forward:0,
					backward:0,
					tbc:0
				};
				if(inter==2){
					k.forward=this.parse(type);
					k.backward=this.parse(type);
				}
				if(inter==3){
					k.tbc=this.parse('vec3F');
				}
				return k;
			},

			keys:function(type){
				var res={
					numKeys:this.parse('uint32'),
					interpolation:0,
					keys:0
				};
				if(res.numKeys > 0){
					res.interpolation=this.parse('uint32');
					res.keys=this.parse(['array',['keyparser',type,res.interpolation],res.numKeys]);
				}
				return res;

			},
			ntked:function(){
				var type='nameLookup';
				var res={
					name:this.parse('nameLookup'),
					numTextKeys:this.parse('uint32'),
					keys:0
				};
				if(res.numKeys > 0){
					res.keys=this.parse(['array',['keyparser',type,res.interpolation],res.numKeys]);
				}
				return res;

			},
			nitd:function(){
				var res={
					numRotationKeys:0,//'uint32',
					rotationType:0,//'uint32',
					quaternionKeys:[],
					xyzRotations:[],//['array',['array',['keys','float32'],3],function(){return this.current.numRotationKeys}],
					translations:[],//['keys','vec3F'],
					scales:[]//['keys','float32']
				}
				res.numRotationKeys=this.parse('uint32');
				if(res.numRotationKeys > 0){
					res.rotationType=this.parse('uint32');
					if(res.rotationType!=4){
						if(res.rotationType==1){
							res.quaternionKeys=this.parse(['array',['keyparser','quat',res.rotationType],res.numRotationKeys]);
						}else{
							console.log('rotation Type: '+res.rotationType+' not currently implemented!');
						}
					}else{
						res.xyzRotations=this.parse(['array',['keys','float32'],3]);
						if(FalloutMV.debugMode==true){console.log(res.xyzRotations);}
					}
				}
				res.translations=this.parse(['keys','vec3F']);
				res.scales=this.parse(['keys','float32']);
				return res;
			},
			BSBound:{
				name:'nameLookup',
				center:'vec3F',
				dimensions:'vec3F',
			},
			BSFadeNode:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'uint16',
				unkShort:'uint16',
				translation:'vec3F',
				rotation:'mat9F',
				scale:'float32',
				numProperties:'uint32',
				properties:['array','int32',function(){return this.current.numProperties;}],
				collisionObject:'int32',
				numChildren:'uint32',
				children:['array','int32',function(){return this.current.numChildren;}],
				numEffects:'uint32',
				effects:['array','int32',function(){return this.current.numEffects;}]
			},
			BSXFlags:{
				name:'nameLookup',
				integerData:'uint32'
			},
			NiStringExtraData:{
				name:'nameLookup',
				stringData:'nameLookup'
			},
			NiFloatExtraData:{
				name:'nameLookup',
				floatData:'float32'
			},
			NiIntegerExtraData:{
				name:'nameLookup',
				integerData:'uint32'
			},
			bhkConvexVerticesShape:{
				material:'uint32',
				radius:'float32',
				unkFloats:['array','float32',6],
				numVertices:'uint32',
				vertices:['array','vec4F',function(){return this.current.numVertices;}],
				numNormals:'uint32',
				normals:['array','vec4F',function(){return this.current.numNormals;}]
			},
			bhkRigidBody:{
				shape:'int32',
				layer:'uint8',
				colFilter:'uint8',
				unkShort:'uint16',
				unkInt1:'int32',
				unkInt2:'int32',
				unkInts:['array','int32',3],
				collisionResponse:'uint8',
				unkByte:'uint8',
				procContactDelay:'uint16',
				unkShorts:['array','uint16',2],
				layerCopy:'uint8',
				colFilterCopy:'uint8',
				unkShorts2:['array','uint16',7],
				translation:'vec4F',
				rotation:'quat',
				linearVelocity:'vec4F',
				angularVelocity:'vec4F',
				intertia:'im12F',
				center:'vec4F',
				mass:'float32',
				linearDamping:'float32',
				angularDamping:'float32',
				friction:'float32',
				restitution:'float32',
				maxLinearVelocity:'float32',
				maxAngularVelocity:'float32',
				penetrationDepth:'float32',
				motionSystem:'uint8',
				deactivatorType:'uint8',
				solverDeactivation:'uint8',
				qualityType:'uint8',
				unkInt3:'uint32',
				unkInt4:'uint32',
				unkInt5:'uint32',
				numConstraints:'uint32',
				constraints:['array','int32',function(){return this.current.numConstraints;}],
				unkInt6:'uint32'
			},
			bhkRigidBodyT:{
				shape:'int32',
				layer:'uint8',
				colFilter:'uint8',
				unkShort:'uint16',
				unkInt1:'int32',
				unkInt2:'int32',
				unkInts:['array','int32',3],
				collisionResponse:'uint8',
				unkByte:'uint8',
				procContactDelay:'uint16',
				unkShorts:['array','uint16',2],
				layerCopy:'uint8',
				colFilterCopy:'uint8',
				unkShorts2:['array','uint16',7],
				translation:'vec4F',
				rotation:'quat',
				linearVelocity:'vec4F',
				angularVelocity:'vec4F',
				intertia:'im12F',
				center:'vec4F',
				mass:'float32',
				linearDamping:'float32',
				angularDamping:'float32',
				friction:'float32',
				restitution:'float32',
				maxLinearVelocity:'float32',
				maxAngularVelocity:'float32',
				penetrationDepth:'float32',
				motionSystem:'uint8',
				deactivatorType:'uint8',
				solverDeactivation:'uint8',
				qualityType:'uint8',
				unkInt3:'uint32',
				unkInt4:'uint32',
				unkInt5:'uint32',
				numConstraints:'uint32',
				constraints:['array','int32',function(){return this.current.numConstraints;}],
				unkInt6:'uint32'
			},
			bhkCollisionObject:{
				target:'int32',
				flags:'int16',
				body:'int32'
			},
			bhkBoxShape:{
				material:'uint32',
				radius:'float32',
				unkBytes:['array','uint8',8],
				dimensions:'vec3F',
				minimumSize:'float32'
			},
			NiTriStrips:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				unkShort:'uint16',
				translation:'vec3F',
				rotation:'mat9F',
				scale:'float32',
				numProperties:'uint32',
				properties:['array','int32',function(){return this.current.numProperties;}],
				collisionObject:'int32',
				data:'int32',
				skinInstance:'int32',
				numMaterials:'uint32',
				materialNames:['array','nameLookup',function(){return this.current.numMaterials;}],
				materialExtra:['array','int32',function(){return this.current.numMaterials;}],
				activeMaterial:'int32',
				dirtyFlag:'int8'
			},
			NiTriShape:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				unkShort:'uint16',
				translation:'vec3F',
				rotation:'mat9F',
				scale:'float32',
				numProperties:'uint32',
				properties:['array','int32',function(){return this.current.numProperties;}],
				collisionObject:'int32',
				data:'int32',
				skinInstance:'int32',
				numMaterials:'uint32',
				materialNames:['array','nameLookup',function(){return this.current.numMaterials;}],
				materialExtra:['array','int32',function(){return this.current.numMaterials;}],
				activeMaterial:'int32',
				dirtyFlag:'int8'
			},
			BSShaderPPLightingProperty:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				shaderType:'uint32',
				shaderFlags:'uint32',
				unkInt:'int32',
				envmapScale:'float32',
				unkInt2:'int32',
				textureSet:'int32',
				unkFloat:'float32',
				refractionPeriod:'int32',
				unkFloat2:'float32',
				unkFloat3:'float32'
			},
			BSShaderTextureSet:{
				numTextures:'int32',
				textures:['array','stringEntry',function(){return this.current.numTextures;}]
			},
			NiMaterialProperty:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				specularColor:'color3F',
				emissiveColor:'color3F',
				glossiness:'float32',
				alpha:'float32',
				emitMult:'float32'
			},
			NiAlphaProperty:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				threshold:'int8'
			},
			NiTriStripsData:{
				unkInt:'int32',
				numVertices:'uint16',
				keepFlags:'int8',
				compFlags:'int8',
				hasVerts:'int8',
				vertices:['array','vec3F',function(){return this.current.numVertices;}],
				bsNumUVSets:'uint16',
				hasNormals:'int8',
				normals:['array','vec3F',function(){return (this.current.numVertices*this.current.hasNormals);}],
				tangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
				bitangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
				center:'vec3F',
				radius:'float32',
				hasVertexColors:'int8',
				vertexColors:['array','color4F',function(){return (this.current.numVertices*this.current.hasVertexColors);}],
				uvSets:['array','uv',function(){return (this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
				consistencyFlags:'uint16',
				additionalData:'int32',
				numTriangles:'uint16',
				numStrips:'numStrips',
				stripLengths:'stripLengths',
				hasPoints:'hasPoints',
				points:'pointCollection'
			},
			matchgroups:{
				numVertices:'uint16',
				vertIndices:['array','uint16',function(){return this.current.numVertices}]
			},
			NiTriShapeData:{
				unkInt:'int32',
				numVertices:'uint16',
				keepFlags:'int8',
				compFlags:'int8',
				hasVerts:'int8',
				vertices:['array','vec3F',function(){return this.current.numVertices;}],
				bsNumUVSets:'uint16',
				hasNormals:'int8',
				normals:['array','vec3F',function(){return (this.current.numVertices*this.current.hasNormals);}],
				tangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
				bitangents:['array','vec3F',function(){return (this.current.hasNormals > 0 && this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
				center:'vec3F',
				radius:'float32',
				hasVertexColors:'int8',
				vertexColors:['array','color4F',function(){return (this.current.numVertices*this.current.hasVertexColors);}],
				uvSets:['array','uv',function(){return (this.current.bsNumUVSets > 0)?this.current.numVertices:0;}],
				consistencyFlags:'uint16',
				additionalData:'int32',
				numTriangles:'uint16',
				numTrianglePoints:'uint32',
				hasTriangles:'int8',
				triangles:['array',['array','uint16',3],function(){return this.current.numTriangles}],
				numMatchGroups:'uint16',
				matchGroups:['array','matchgroups',function(){return this.current.numMatchGroups}],
			},
			partition:{
				partFlag:'uint16',
				bodyPart:'uint16'
			},
			NiTextKeyExtraData:['ntked'],
			BSDismemberSkinInstance:{
				data:'int32',
				skinPartition:'int32',
				skeletonRoot:'int32',
				numBones:'uint32',
				bones:['array','int32',function(){return this.current.numBones}],
				numPartitions:'int32',
				partitions:['array','partition',function(){return this.current.numPartitions}]
			},
			vertexweight:{
				index:'uint16',
				weight:'float32'
			},
			bonelist:{
					rotation:'mat9F',
					translation:'vec3F',
					scale:'float32',
					boundingSphereOffset:'vec3F',
					boundingSphereRadius:'float32',
					numVertices:'uint16',
					vertexWeights:['array','vertexweight',function(){return this.current.numVertices}]
			},
			bonelistb:{
					rotation:'mat9F',
					translation:'vec3F',
					scale:'float32',
					boundingSphereOffset:'vec3F',
					boundingSphereRadius:'float32',
					numVertices:'uint16',
			},
			NiSkinData:{
				rotation:'mat9F',
				translation:'vec3F',
				scale:'float32',
				numBones:'uint32',
				hasVertWeights:'uint8',
				boneListb:['array','bonelistb',function(){return ((this.current.hasVertWeights==0)?this.current.numBones:0)}],
				boneList:['array','bonelist',function(){return (this.current.numBones*this.current.hasVertWeights)}]
			},
			strip:function(sl){
				var s=[];
				for(var i=0; i < sl.length;i++){
					s.push(this.parse(['array','uint16',sl[i]]));
				}
				return s;
			},
			skinpartitionblock:function(){
				var spb={
					numVertices:"",
					numTriangles:"",
					numBones:"",
					numStrips:"",
					numWeightsPerVertex:"",
					bones:"",
					hasVertexMap:"",
					vertexMap:"",
					hasVertexWeights:"",
					vertexWeights:"",
					stripLengths:"",
					hasFaces:"",
					strips:[],
					triangles:[],
					hasBoneIndices:"",
					boneIndices:""
				}
					spb.numVertices=this.parse('uint16');
					spb.numTriangles=this.parse('uint16');
					spb.numBones=this.parse('uint16');
					spb.numStrips=this.parse('uint16');
					spb.numWeightsPerVertex=this.parse('uint16');
					spb.bones=this.parse(['array','uint16',function(){return spb.numBones}]);
					spb.hasVertexMap=this.parse('uint8');
					spb.vertexMap=this.parse(['array','uint16',function(){return (spb.numVertices * spb.hasVertexMap)}]);
					spb.hasVertexWeights=this.parse('uint8');
					spb.vertexWeights=this.parse(['array',['array','float32',function(){return (spb.numWeightsPerVertex * spb.hasVertexWeights)}],function(){return (spb.numVertices * spb.hasVertexWeights)}]);
					spb.stripLengths=this.parse(['array','uint16',function(){return spb.numStrips}]);
					spb.hasFaces=this.parse('uint8');
					if(spb.hasFaces==1 && spb.numStrips >0 ){
						for(var i=0; i < spb.numStrips;i++){
							spb.strips.push(this.parse(['array','uint16',function(){return spb.stripLengths[i]}]));
						}
					}
					if(spb.hasFaces==1 && spb.numStrips== 0){
						for(var i=0;i<spb.numTriangles;i++){
							spb.triangles.push(this.parse(['array','uint16',3]))
						}
					}
					spb.hasBoneIndices=this.parse('uint8');
					spb.boneIndices=this.parse(['array',['array','uint8',function(){return (spb.numWeightsPerVertex * spb.hasBoneIndices)}],function(){return (spb.numVertices * spb.hasBoneIndices)}]);
					
					return spb;
			},
			NiSkinPartition:{
				numSkinPartitionBlocks:'uint32',
				skinPartitionBlocks:['array','skinpartitionblock',function(){return this.current.numSkinPartitionBlocks}]
			},
			NiNode:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				unkShort:'uint16',
				translation:'vec3F',
				rotation:'mat9F',
				scale:'float32',
				numProperties:'uint32',
				properties:['array','int32',function(){return this.current.numProperties;}],
				collisionObject:'int32',
				numChildren:'uint32',
				children:['array','int32',function(){return this.current.numChildren;}],
				numEffects:'uint32',
				effects:['array','int32',function(){return this.current.numEffects;}],
			},
			NiTransformController:{
				nextController:'int32',
				flags:'int16',
				frequency:'float32',
				phase:'float32',
				startTime:'float32',
				stopTime:'float32',
				target:'int32',
				interpolator:'int32'
			},
			NiTransformInterpolator:{
				translation:'vec3F',
				rotation:'quat',
				scale:'float32',
				data:'int32'
			},
			NiTransformData:['nitd'],
			NiBillboardNode:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				unkShort:'uint16',
				translation:'vec3F',
				rotation:'mat9F',
				scale:'float32',
				numProperties:'uint32',
				properties:['array','int32',function(){return this.current.numProperties;}],
				collisionObject:'int32',
				numChildren:'uint32',
				children:['array','int32',function(){return this.current.numChildren;}],
				numEffects:'uint32',
				effects:['array','int32',function(){return this.current.numEffects;}],
				billboardMode:'uint16'
			},
			NiVisController:{
				nextController:'int32',
				flags:'int16',
				frequency:'float32',
				phase:'float32',
				startTime:'float32',
				stopTime:'float32',
				target:'int32',
				interpolator:'int32'
			},
			NiAlphaController:{
				nextController:'int32',
				flags:'int16',
				frequency:'float32',
				phase:'float32',
				startTime:'float32',
				stopTime:'float32',
				target:'int32',
				interpolator:'int32'
			},
			NiBoolInterpolator:{
				boolValue:'int8',
				data:'uint32',
			},
			NiBoolData:{
				data:['keys','int8'],
			},
			NiStencilProperty:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				stencilRef:'uint32',
				stencilMask:'int32'
			},
			NiMaterialColorController:{
				nextController:'int32',
				flags:'int16',
				frequency:'float32',
				phase:'float32',
				startTime:'float32',
				stopTime:'float32',
				target:'int32',
				interpolator:'int32',
				targetColor:'uint16',
			},
			NiPoint3Interpolator:{
				point3Value:'vec3F',
				data:'int32',
			},
			NiPosData:{
				data:['keys','vec3F'],
			},
			NiTexturingProperty:['texprop'],
			NiTextureTransformController:{
				nextController:'int32',
				flags:'int16',
				frequency:'float32',
				phase:'float32',
				startTime:'float32',
				stopTime:'float32',
				target:'int32',
				interpolator:'int32',
				unkbyte:'int8',
				textureSlot:'uint32',
				operation:'uint32',
			},
			NiFloatInterpolator:{
				floatValue:'float32',
				data:'uint32',
			},
			NiFloatData:{
				data:['keys','float32'],
			},
			NiSourceTexture:{
				name:'nameLookup',
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				useExternal:'int8',
				fileName:'nameLookup',
				unkLink:'int32',
				pixelLayout:'uint32',
				useMipmaps:'uint32',
				alphaFormat:'uint32',
				isStatic:'int8',
				directRender:'int8',
				persistRenderData:'int8',
			},
			BSShaderNoLightingProperty:{
				name:['nameLookup'],
				numExtraDataList:'uint32',
				extraDataList:['array','int32',function(){return this.current.numExtraDataList;}],
				controller:'int32',
				flags:'int16',
				shaderType:'uint32',
				shaderFlags:'uint32',
				unkInt:'int32',
				envmapScale:'float32',
				unkInt2:'int32',
				fileName:'stringEntry',
				unkFloat1:'float32',
				unkFloat2:'float32',
				unkFloat3:'float32',
				unkFloat4:'float32',
			},

		});
		var header=parser.parse('header');
		var bn=parser.parse('blockNames');
		var blockMap=[];
		for(var i=0; i < header.blockCount;i++){
			blockMap.push(bn.names[parser.parse('uint16')]);
		}
		var blockSizes=parser.parse(['array','uint32',header.blockCount]);
		var stringTable=parser.parse('stringData');
		nameTable=stringTable.strings;
		var blocks=[];
		var blockOff=[];
		var start=parser.tell();
		blockOff.push(start);
		for(var i=0; i < blockSizes.length;i++){
			start+=blockSizes[i];
			blockOff.push(start);
		}
		var i = 0, limit = header.blockCount, busy = false;
		var processor = setInterval(function(){
			if(!busy){
				busy = true;
				if(FalloutMV.UI.isClosing==true){
					clearInterval(processor);
				}
				progCB(i,header.blockCount);
				blocks.push(parseBlock(parser,i,blockMap,blockOff,blocks));
				if(++i == limit){
					clearInterval(processor);
					nifobj={
						header:header,
						map:blockMap,
						blocks:blocks
					};
					
					doneCB(nifobj);
				}
				busy = false;
			}
		}, 5);
	}

	function parseBlock(parser,i,blockMap,blockOff,blocks){
		if(FalloutMV.debugMode==true){
			console.log("parsing block: "+i+" "+blockMap[i]);
			console.log("Offset: "+parser.tell()+" Expected: "+blockOff[i]);
		}

		if(blockMap[i]=="BSShaderNoLightingProperty" || blockMap[i]=="NiSourceTexture")
		{
			var block=parser.parse(blockMap[i]);
			return block;
			if(FalloutMV.debugMode==true){console.log(block);}
		}else{
			return parser.parse(blockMap[i]);
		}
		if(FalloutMV.debugMode==true){console.log("--------------------------------------");}
		return block;
	}
	
	return{
		load : load,
	}
	
})();