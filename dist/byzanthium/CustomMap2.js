var intCustomMapWidth = 0;
var intCustomMapHeight = 0;
var intCustomMapFrameHeight = 300;
var intCustomMapFrameWidth = 300;
var intCustomMapHSliderWidth = 30;
var intCustomMapVSliderHeight = 30;
var intCustomMapSliderVM = 0;
var intCustomMapSliderHM = 0;
var intCustomMapSliderHClick = 0;
var intCustomMapSliderVClick = 0;

var modificator = 1;

if(document.getElementById('custommap_content')){
  var local = document.getElementById('custommap_location').innerHTML;
  var Woerter = local.split("°");
  var kll = "";
  for (var i = 0; i < Woerter.length; i++){
	var Woerters = Woerter[i].split(";");
	var imagers = "";
	if(Woerters[0]=="Fight")
	  imagers="https://images.wikia.nocookie.net/__cb20121218182704/byzanthium/images/0/0c/Leader_massivecraft.png"
	var posx = Woerters[1];
	var posy = Woerters[2];
	var alts = Woerters[3];
    kll +='<div id="icon'+i+'" style="position:absolute; display:block; top:'+posy+'; left:'+posx+'; width:32px; height:32px; z-index:99; background-image:url('+imagers+')">';
    kll +='<a href="#"><img border="0" src="https://images.wikia.nocookie.net/byzanthium/images/9/92/Spacer.png" title="'+alts+'" width="32px" onClick="ToolTip(\'icon'+i+'\',\''+alts+'\')" height="32px" /></a>';
    kll +='</div>';
  }
intCustomMapFrameWidth = parseInt(document.getElementById('custommap_fwidth').innerHTML);
intCustomMapFrameHeight = parseInt(document.getElementById('custommap_fheight').innerHTML);
  intCustomMapHeight = parseInt(document.getElementById('custommap_content').firstChild.height);
  intCustomMapWidth = parseInt(document.getElementById('custommap_content').firstChild.width);
  var mapimage = document.getElementById('custommap_content').firstChild.src;
var conmap = '';
 conmap += '<form action="#" name="maus_pos" style="display:none;">';

  conmap += '<input type="text" name="top" size="3" id="stop">';

  conmap += '<input type="text" name="left" size="3" id="sleft">';

  conmap += '<input type="text" name="scrollTop" size="3">';

  conmap += '<input type="text" name="scrollLeft" size="3">';

  conmap += '</form>';

conmap += '<div style="background:url(https://images.wikia.nocookie.net/__cb20130120193522/byzanthium/images/5/55/Page_bg.png); padding:50px; width:'+(intCustomMapFrameWidth+20)+'px;">';
  conmap += '<table height="'+(intCustomMapFrameHeight+20)+'px" width="'+(intCustomMapFrameWidth+20)+'px" cellpadding="0" cellspacing="0">';
  conmap += '<tr><td height="'+intCustomMapFrameHeight+'px" width="'+intCustomMapFrameWidth+'px">';
  conmap += '<div id="mapbg" onClick="Start(this);hMoveMM();vMoveMM();" style="position:relative; background:url('+mapimage+') 0px 0px; height:'+intCustomMapFrameHeight+'px; width:'+intCustomMapFrameWidth+'px; overflow:hidden; display:block; background-repeat:no-repeat; border:1px solid;">';
  conmap += '<div id="layers" style="position:absolute; left:0px; top:0px;">';
  conmap += '<div id="custommap_tooltip" style="display:none; position:absolute; border-radius:10px; padding:4px; z-index:666; border:3px solid #ff0000; width:100px; background:#cccccc;"></div>';
  conmap += kll;
  conmap += '</div>';
  conmap += '</div>';
  conmap += '</td>';
  conmap += '<td>';
  conmap += '<table width="20px" height="100%" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;" height="30px">';
  conmap += '<div id="vScrollU" style="height:30px; width:20px; background:#ff0000; background:url(\'https://images.wikia.nocookie.net/byzanthium/images/7/74/Tvc.png\');" onClick="vMove(\'down\');"></div></td></tr><tr><td style="vertical-align:top; background:#cccccc;">';
  conmap += '<div id="vScrollM" style="position:relative; top:0px; height:30px; width:20px; background:url(\'https://images.wikia.nocookie.net/byzanthium/images/0/02/Mvs.png\');" onmousedown="Start(this);vMoveMB();" onmouseup="Start(this);"></div></td></tr><tr><td style="vertical-align:bottom;" height="30px">';
  conmap += '<div id="vScrollD" style="height:30px; width:20px; background:#ff0000; background:url(\'https://images.wikia.nocookie.net/byzanthium/images/4/4b/Bvc.png\');" onClick="vMove(\'up\');"></div></td></tr></table>';
  conmap += '</td>';
  conmap += '</tr>';
  conmap += '<tr>';
  conmap += '<td>';
  conmap += '<table width="100%" height="20px" cellpadding="0" cellspacing="0"><tr><td width="30px">';
  conmap += '<div id="hScrollR" style="height:20px; width:30px; background:#ff0000; background:url(\'https://images.wikia.nocookie.net/byzanthium/images/0/0b/Lhc.png\');" onClick="hMove(\'right\')" ></div></td><td style="background:#cccccc;" onClick="hMoveM();">';
  conmap += '<div id="hScrollM" style="position:relative; left:0px; height:20px; width:30px; background:url(\'https://images.wikia.nocookie.net/byzanthium/images/9/9e/Mhs.png\');" onClick="Start(this);hMoveMB();"></div></td><td align="right" width="30px">';
  conmap += '<div id="hScrollL" style="height:20px; width:30px; background:#ff0000; background:url(\'https://images.wikia.nocookie.net/byzanthium/images/6/6c/Rhc.png\');" onClick="hMove(\'left\')"></div></td>';
  conmap += '</td></tr></table>';
  conmap += '</td>';
  conmap += '<td></td>';
  conmap += '</tr>';
  conmap += '</table></div>';
  document.getElementById('custommap_content').innerHTML = conmap;
}
var iconTipActive = "";

function ToolTip(id, titl){
	if(document.getElementById('custommap_tooltip')){
		if(document.getElementById(id)){
			if(iconTipActive == id){
				document.getElementById('custommap_tooltip').style.display = "none";
				iconTipActive = "";
			}else{
				iconTipActive = id;
				var iconc = document.getElementById(id);
				document.getElementById('custommap_tooltip').innerHTML = titl;
				var intL = parseInt(iconc.style.left.replace("px",""));
				var intW = parseInt(iconc.style.width.replace("px",""));
				var intH = parseInt(iconc.style.height.replace("px",""));
				var intT = parseInt(iconc.style.top.replace("px",""));
				document.getElementById('custommap_tooltip').style.left = (intL+intW)+"px";
				document.getElementById('custommap_tooltip').style.top = (intT+intH)+"px";
				document.getElementById('custommap_tooltip').style.display = "block";
			}
		}
	}
}

function hMove(direction){
	if(document.getElementById('mapbg') &&  intCustomMapWidth>intCustomMapFrameWidth){
		var bgpos = (document.getElementById('mapbg').style.backgroundPosition);
		bgpos = bgpos.replace(/px/g,"");
		bgpos = bgpos.replace(/%/g,"");
		var bgposXY = bgpos.split(" ");
		var bgposX = parseInt(bgposXY[0]);
		
		if(direction=='left'){
			if(bgposX-10>=-(intCustomMapWidth-intCustomMapFrameWidth)){
				bgposX-=10;
				intCustomMapSliderHM = parseInt(((bgposX)*-1)/((intCustomMapWidth-intCustomMapFrameWidth)/(intCustomMapFrameWidth-intCustomMapHSliderWidth*3)));
			}else{
				bgposX=-(intCustomMapWidth-intCustomMapFrameWidth);
				intCustomMapSliderHM = parseInt(intCustomMapFrameWidth-intCustomMapHSliderWidth*3+3);
			}
		}else{
			if(bgposX+10<=0){
				bgposX+=10;
				intCustomMapSliderHM = parseInt(((bgposX)*-1)/((intCustomMapWidth-intCustomMapFrameWidth)/(intCustomMapFrameWidth-intCustomMapHSliderWidth*3)));
			}else{
				bgposX=0;
				intCustomMapSliderHM = 0;
			}
		}
		
		document.getElementById('mapbg').style.backgroundPosition = ""+(bgposX)+"px "+bgposXY[1]+"px";
		document.getElementById('layers').style.left = (bgposX)+"px";
		document.getElementById('hScrollM').style.left = intCustomMapSliderHM+"px";	
	}
}

function vMove(direction){
	if(document.getElementById('mapbg') && intCustomMapHeight>intCustomMapFrameHeight){
		var bgpos = (document.getElementById('mapbg').style.backgroundPosition);
		bgpos = bgpos.replace(/px/g,"");
		bgpos = bgpos.replace(/%/g,"");
		var bgposXY = bgpos.split(" ");
		var bgposY = parseInt(bgposXY[1]);
		
		if(direction=='up'){
			if(bgposY-10>=-(intCustomMapHeight-intCustomMapFrameHeight)){
				bgposY-=10;
				intCustomMapSliderVM = parseInt(((bgposY)*-1)/((intCustomMapHeight-intCustomMapFrameHeight)/(intCustomMapFrameHeight-intCustomMapVSliderHeight*3)));
			}else{
				bgposY=-(intCustomMapHeight-intCustomMapFrameHeight);
				intCustomMapSliderVM =  parseInt(intCustomMapFrameHeight-intCustomMapVSliderHeight*3+3);
			}
		}else{
			if(bgposY+10<=0){
				bgposY+=10;
				intCustomMapSliderVM = parseInt(((bgposY)*-1)/((intCustomMapHeight-intCustomMapFrameHeight)/(intCustomMapFrameHeight-intCustomMapVSliderHeight*3)));
			}else{
				bgposY=0;
				intCustomMapSliderVM = 0;
			}
		}
		
		document.getElementById('mapbg').style.backgroundPosition = ""+bgposXY[0]+"px "+(bgposY)+"px";
		document.getElementById('layers').style.top = (bgposY)+"px";
		document.getElementById('vScrollM').style.top = intCustomMapSliderVM+"px";
	}
}

var hscrollactive=false;
var hNewSlider = false;
var vscrollactive=false;
var vNewSlider = false;


function hMoveMM(){
	modificator = 5;
	hMoveM();
}

function vMoveMM(){
	modificator = 5;
	vMoveM();
}

function hMoveMB(){
	modificator = 1;
	hMoveM();
}

function vMoveMB(){
	modificator = 1;
	vMoveM();
}

function hMoveM(){
	if(hscrollactive==false){
		hscrollactive=true;
		hNewSlider=false;
	}else{
		hscrollactive=false;
	}
}

function vMoveM(){
	if(vscrollactive==false){
		vscrollactive=true;
		vNewSlider=false;
	}else{
		vscrollactive=false;
	}
}
Start();
vMoveM();
function moveTheH(){
	if(document.getElementById('mapbg') &&  intCustomMapWidth>intCustomMapFrameWidth){
		var val = document.getElementById('sleft').value-intCustomMapSliderHClick;
		intCustomMapSliderHClick = document.getElementById('sleft').value;
	  var bgpos = (document.getElementById('mapbg').style.backgroundPosition);
	  bgpos = bgpos.replace(/px/g,"");
	  bgpos = bgpos.replace(/%/g,"");
	  var bgposXY = bgpos.split(" ");
	  var bgposX = parseInt(bgposXY[0]);
	  val=val*modificator;
	  if(bgposX-val<=0 &&  bgposX-val>=-(intCustomMapWidth-intCustomMapFrameWidth)){
		bgposX-=val;
		intCustomMapSliderHM = parseInt(((bgposX)*-1)/((intCustomMapWidth-300)/(300-30*3)));
	  }else{
		if(bgposX-val>=-(intCustomMapWidth-intCustomMapFrameWidth)){
		bgposX=0;
		intCustomMapSliderHM = 0;
		}else{
		bgposX=-(intCustomMapWidth-intCustomMapFrameWidth);
		intCustomMapSliderHM = (300-30*3+3);
		}
	  }
	  document.getElementById('mapbg').style.backgroundPosition = ""+(bgposX)+"px "+bgposXY[1]+"px";
	  document.getElementById('layers').style.left = (bgposX)+"px";
	  document.getElementById('hScrollM').style.left = intCustomMapSliderHM+"px";
	  
	}
}

function moveTheV(){
	if(document.getElementById('mapbg') && intCustomMapHeight>intCustomMapFrameHeight){
		var val = document.getElementById('stop').value-intCustomMapSliderVClick;
		intCustomMapSliderVClick = document.getElementById('stop').value;
	  var bgpos = (document.getElementById('mapbg').style.backgroundPosition);
	  bgpos = bgpos.replace(/px/g,"");
	  bgpos = bgpos.replace(/%/g,"");
	  var bgposXY = bgpos.split(" ");
	  var bgposY = parseInt(bgposXY[1]);
	  val=val*modificator;
	  if(bgposY-val<=0 &&  bgposY-val>=-(intCustomMapHeight-intCustomMapFrameHeight)){
		bgposY-=val;
		intCustomMapSliderVM = parseInt(((bgposY)*-1));
	  }else{
		if(bgposY-val>=-(intCustomMapHeight-intCustomMapFrameHeight)){
		bgposY=0;
		intCustomMapSliderVM = 0;
		}else{
		bgposY=-(intCustomMapHeight-intCustomMapFrameHeight);
		intCustomMapSliderVM = (300-30*3+3);
		}
	  }
	  document.getElementById('mapbg').style.backgroundPosition = ""+(bgposXY[0])+"px "+bgposY+"px";
	  document.getElementById('layers').style.top = (bgposY)+"px";
	  document.getElementById('vScrollM').style.top = intCustomMapSliderVM+"px";
	  
	}
}

var on = false;

function Start(e){

    if(on)   {

         window.document.onmousemove = null;

         //e.value ='Start';

    }else  {

         window.document.onmousemove = showMousePos;

         //e.value ='Stopp';

    }

    on = !on;

}

function showMousePos(e){

    var p = mouse_pos(e);

    for(var i in p)    {

        document.forms['maus_pos'].elements[i].value =  p[i];

    }
	
	if(hNewSlider==true){
		moveTheH();
	}
	
	if(vNewSlider==true){
		moveTheV();
	}
	
	if(hscrollactive==true && hNewSlider==false){
	    intCustomMapSliderHClick = document.getElementById('sleft').value;
		hNewSlider=true;
	}
	
	if(vscrollactive==true && vNewSlider==false){
	    intCustomMapSliderVClick = document.getElementById('stop').value;
		vNewSlider=true;
	}

}

function mouse_pos(e) {

	if(!e) e = window.event;

	var body = (window.document.compatMode && window.document.compatMode == "CSS1Compat") ? 

	window.document.documentElement : window.document.body;

	return {

	// Position im Dokument

	top: e.pageY ? e.pageY : e.clientY + body.scrollTop - body.clientTop,

	left: e.pageX ? e.pageX : e.clientX + body.scrollLeft  - body.clientLeft

 

	};

}