var warnOverride=false;
var f3ma;
var f3txa;
var fnvtxa;
var fnvma;
var namespace="ModelData:";
var good="rgb(180, 200, 135)";
var warn="#e8e8ac";
var err="#d8a0a0";
var f3meshes;
var f3textures;
var nvmeshes;
var nvtextures;
var fileTotal=0;
var current=0;
var last=0;
var subLast=0.0;
importScript("MediaWiki:MD5.js");
importScript("MediaWiki:Mediawiki.js");

var files=[];
var fileData=[];
var s2='<div style="display:table-row;"><div class="va-navbox-padding" style="display:table-cell;"><div class="va-navbox collapsible" style="display:table;"><div style="display:table-row;"><div class="va-navbox-title va-navbox-maintitle" style="display:table-cell;"><div class="va-navbox-titletext" style="text-align:center;"><span id="fileText">Filename Test</span></div></div></div><div style="display:table-row;"><div class="va-navbox-space-v" style="display:table-cell"></div></div><div style="display:table-row"><div style="display:table-cell"><div id="midSection" style="display:none" class="va-navbox-brick"><div style="display:table-row;"><div class="va-navbox-brickcont" style="display:table-cell"><div class="va-navbox-brick va-navbox-standardcont va-navbox-nowraplinks" style="display:table;"><div style="display:table-row;"><div class="va-navbox-header" style="background-color:#D0D0D0;padding:2px 14px"><textarea id="outputDiv"style="webkit-box-shadow: inset 2px 2px 2px 0px #aaa;-moz-box-shadow: inset 2px 2px 2px #aaa;box-shadow: inset 2px 2px 2px #aaa;resize:none;width:100%;height:200px;background-color:#fff;overflow-y:scroll;font-family:monospace;"></textarea></div></div></div></div></div><div style="display:table-row;"><div class="va-navbox-space-v" style="display:table-cell"></div></div></div></div></div><div style="display:table-row;"><div id="statusBar" class="va-navbox-footer" style="display: block;vertical-align: bottom;text-align: left;height: 21px;padding:0px 14px;background-color:#d0d0d0;"><div id="statusText" style="font-size: 12px;font-weight:bold;line-height: 21px;display: inline;">Loading...</div><button id="postButton" class="wikia-button secondary combined" style="float: right;display:none">Post</button><button id="skipButton" class="wikia-button secondary combined" style="float: right;display:none;margin-right:5px;">Skip</button></div></div></div></div></div>';

var fileStatus={
	'GOOD':1,
	'WARN':2,
	'ERR':3
};

var postButtonState={
	'ENABLED':1,
	'DISABLED':2,
	'HIDE':3
};

function updateSubProgress(val)
{
	subLast=val;
	updateProgress(fileStatus.GOOD);
}


function updateProgress(fs,message)
{
	var pct = Math.round(((last+subLast)/fileTotal)*100);
	$('.ui-progressbar-value').css("width",pct+"%");
	
	$('.ui-progressbar-value').removeClass("good bad warn");
	switch(fs)
	{
		case fileStatus.ERR:
			$('.ui-progressbar-value').addClass("bad");
			break;
		case fileStatus.WARN:
			$('.ui-progressbar-value').addClass("warn");
			break;
		default:
			$('.ui-progressbar-value').addClass("good");
			break;
	}
	if(message)
	{
		$('.progress-label').html(message);
	}else{
		$('.progress-label').html(last+" of "+fileTotal+" ("+pct+"%)");	
	}
}

function rtb(str)
{
	var res="";
	for(var i=0;i < str.length;i++)
	{
		res+=String.fromCharCode(str.charCodeAt(i)+128);
	}
	return res;
}

function setClickListener(idx,content,url)
{
	$("#skipButton","#fileBox"+idx).click(function(){
		last++;
		updateSubProgress(0.0);
		setStatus(idx,fileStatus.WARN,"Skipped!",postButtonState.DISABLED);
		$('#skipButton','#fileBox'+idx).prop('disabled',true);
		if(idx+1 < files.length)
		{
			fileData[idx]="";
			setTimeout(function(){prepFinal(idx+1);},5);
		}else{
			updateProgress(fileStatus.GOOD,"Complete!");
		}
	});	
	$("#postButton","#fileBox"+idx).click(function(){
		setStatus(idx,fileStatus.GOOD,"Posting...",postButtonState.DISABLED);
		updateProgress(fileStatus.GOOD);
		$('#skipButton','#fileBox'+idx).prop('disabled',true);
		postToPage(url,content,function(s,mess){
			if(s==1)
			{
				setStatus(idx,fileStatus.GOOD,"Posted!",postButtonState.DISABLED);
				last++;
				updateSubProgress(0.0);
				
			}else{
				setStatus(idx,fileStatus.ERR,'<a title="Assets cannot be added by new or unregistered users.">Post failed - Permissions Error.</a>',postButtonState.DISABLED);
				updateProgress(fileStatus.ERR,"Post failed - Permissions Error.");
			}
			if(idx+1 < files.length)
			{
				fileData[idx]="";
				setTimeout(function(){prepFinal(idx+1);},5);
			}else{
				fileData[idx]="";
				updateProgress(fileStatus.GOOD,"Complete!");
			}
		},idx);
		
	});
}

function setStatus(idx,stat,mess,pb)
{
	switch(stat)
	{
		case fileStatus.GOOD:
			$('#statusBar','#fileBox'+idx).css('background-color',good);
			break;
		case fileStatus.WARN:
			$('#statusBar','#fileBox'+idx).css('background-color',warn);
			break;
		case fileStatus.ERR:
			$('#statusBar','#fileBox'+idx).css('background-color',err);
			break;
	}
	switch(pb)
	{
		case postButtonState.ENABLED:
			$('#postButton','#fileBox'+idx).prop('disabled',false);
			$('#postButton','#fileBox'+idx).css('display','block')
			break;
		case postButtonState.DISABLED:
			$('#postButton','#fileBox'+idx).prop('disabled',true);
		  $('#postButton','#fileBox'+idx).css('display','block')
			break;
		case postButtonState.HIDE:
		 $('#postButton','#fileBox'+idx).css('display','none')
			break;
	}
	$('#statusText','#fileBox'+idx).html(mess);
	
}

function uint8ToString(buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
}

function handleFileSelect(evt) {
	fileData=[];
	evt.stopPropagation();
	evt.preventDefault();
	$("#drop_zone").css("background-color","#ffffff");
	files = evt.dataTransfer.files; // FileList object.
	$('.progContainer').css("display","block");
	$('#fileTray').empty();
	fileTotal=files.length;
	last=0;
	updateSubProgress(0.0);
	loadFiles(0)
}	
function loadFiles(i)
{
	var f=files[i];
	var div=$('<div/>',{
		'id':'fileBox'+i,
		'class':'va-navbox-border va-navbox-bottom',
		'style':"display:table;margin: 10px 0;",
		'html':s2
	});
	if(i==0)
	{        
		$("#fileTray").append($(div));
	}else{
		$(div).insertAfter("#fileBox"+(i-1));
	}
	$('#fileText','#fileBox'+i).html(f.name);
	var reader = new FileReader();
	reader.index=i;
	reader.onload = function(e) {
		procFiles(e);
	};
	reader.readAsDataURL(f);
}
	
	


	
function procFiles(e)
{
	setStatus(e.target.index,fileStatus.GOOD,'Upload Complete - Checking File',postButtonState.DISABLED);
	var b64Match=e.target.result.match(/(data\:.*\;base64),(.*)$/i);
	
	fileData.push(b64Match[2]);
	if(e.target.index+1 != files.length)
	{
		loadFiles(e.target.index+1);
	}else{

			if(wgUserName==null)
			{
				for(var i=0; i < files.length;i++)
				{
					setStatus(i,fileStatus.ERR,'You must be logged in to post.',postButtonState.DISABLED);
					fileData[i]="";
				}
				updateProgress(fileStatus.ERR,'You must be logged in to post.');
			}else{
				prepFinal(0)
				  
				
				
			}	

	}
}
	
	function prepFinal(idx)
	{
		var mf= matchFiles(idx);
		if(mf[0] != "404" && mf[0] != "invalid")
		{
			var b64Str=rtb(fileData[idx]);
			var b64Data=[];
			b64Data = b64Str.match(/.{1,1024000}/g);
			//console.log(b64Test);
	    $.each(b64Data,function(k,v){
	    	b64Data[k]='<pre>'+b64Data[k];
	    	if(k+1 < b64Data.length)
	    	{
	    		b64Data[k]+='CONT';
	    	}
	    	b64Data[k]+='</pre>';
	    });
	    checkPage(idx,b64Data,mf);
		}else{
			//$("#statusBar","#fileBox"+i).css("background-color","#D8A0A0");
			if(mf[0]=="404")
			{
				setStatus(idx,fileStatus.ERR,"File does not match any on record.",postButtonState.HIDE);
				updateProgress(fileStatus.ERR,"File does not match any on record.");
				$('#skipButton',"#fileBox"+idx).css("display","block");
			}
			else if(mf[0]=="invalid"){
				setStatus(idx,fileStatus.ERR,"Invalid File Format.",postButtonState.HIDE);
				updateProgress(fileStatus.ERR,"Invalid File Format.");
				$('#skipButton',"#fileBox"+idx).css("display","block");
			}
			if(idx+1 != files.length)
			{
				prepFinal(idx+1);
				fileData[idx]="";
			}
		}
	}
	
	function checkPage(idx,data,mf)
	{
		setStatus(idx,fileStatus.GOOD,'Checking for page...',postButtonState.DISABLED);
		$.ajax({
			url:"/wiki/"+namespace+mf[0],
			dataType:"html",
			async:"true",
			complete:function(j,t) {
				if(j.status >= 200 && j.status < 400)
				{
					setClickListener(idx,data,mf);
					setStatus(idx,fileStatus.WARN,'Warning: This asset already exists!',postButtonState.ENABLED);
					updateProgress(fileStatus.WARN,'Warning: Asset already exists.');
					if(warnOverride==false)
					{
						$('#skipButton',"#fileBox"+idx).css("display","block");
					}else{
						$("#postButton","#fileBox"+idx).click();
					}
				}else if(j.status >= 400 && j.status < 500)
				{
					setClickListener(idx,data,mf);
					setStatus(idx,fileStatus.GOOD,'Ready to post!',postButtonState.ENABLED);
					$("#postButton","#fileBox"+idx).click();
				}else{
					setClickListener(idx,data,mf);    					
					setStatus(idx,fileStatus.GOOD,'Ready to post!',postButtonState.ENABLED);
					$("#postButton","#fileBox"+idx).click();
				}
						
						
  		}
		});
		
		
	}
	
	
	
	
		
	function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    $("#drop_zone").css("background-color","#eeeeee");
  }	
  
  function faFixer(str,t)
  {
  	arr=str.split(',');
		$.each(arr,function(index,value)
		{
			arr[index]=value.split('|');
			arr[index][0]=atob(arr[index][0])+'.'+t;
			arr[index][3]=arr[index][3]+arr[index][0];
		});
  	return arr;
  }
  
  function faSpeeder(arr1)
  {
  	var ra=[];
  	var names=[];
  	var paths=[];
  	var sizes=[];
  	$.each(arr1,function(i,v)
  	{
  		names.push(v[0]);
  		sizes.push(Number(v[1]));
  		paths.push(v[2]);
  		
  	});
  	ra=[names,sizes,paths];
  	return ra;
  }
  
  
  function getExt(file)
  {
  	var m = file.match(/[\.]([a-z]+)$/i);
  	return m[1];
  }
  
  function matchFiles(idx)
  {
  	var file=files[idx];
  	var ext=getExt(file.name);
  	var match=false;
  	var matches=[];
  	var md5 = SparkMD5.hashBinary(atob(fileData[idx]),false);	
  	var rawFile = file.name.substring(0,file.name.length-4);
  	var pat=btoa(rawFile)+'\\|'+file.size+'\\|'+md5+'\\|[a-z\-0-9]+';
  	var rx=new RegExp(pat,'gi')
  	if(ext=="nif")
  	{
  	/*var f3Res=$.grep(f3ma,function(v,i){
  			return ((v[0]==file.name && v[1]==file.size)?(md5==v[2]):false)

  		});
  		var nvRes=$.grep(fnvma,function(v,i){
  			return ((v[0]==file.name && v[1]==file.size)?(md5==v[2]):false)
  		});*/
  		var f3Res=f3m.match(rx);
  		var nvRes=fnvm.match(rx);
  		if(f3Res){
	  		$.each(f3Res,function(i,a){
	  			v=a.split('|');
	  			v[0]=atob(v[0])+'.nif';
	  			var page=v[3]=(v[3]+v[0]).substr(5);
	  			page= page.charAt(0).toUpperCase() + page.slice(1);
	  			matches.push(('F3-'+page).replace("_","-"));
	  		});
	  	}
  		if(nvRes){
	  		$.each(nvRes,function(i,a){
	  			v=a.split('|');
	  			v[0]=atob(v[0])+'.nif';
	  			var page=v[3]=(v[3]+v[0]).substr(5);
	  			page= page.charAt(0).toUpperCase() + page.slice(1);
	  			matches.push(('Nv-'+page).replace("_","-"));
	  		});
	  	}
  		if(matches.length > 0)
  		{
  			match=true;
  			return matches;
  		}else{
  			matches.push('404');
  			return matches;
  		}
  	}
  	else if(ext=="dds")
  	{
  		var f3Res=f3tx.match(rx);
  		var nvRes=fnvtx.match(rx);
  		
  		/*var f3Res=$.grep(f3txa,function(v,i){
  			return ((v[0]==file.name && v[1]==file.size)?(md5==v[2]):false)
  		});
  		var nvRes=$.grep(fnvtxa,function(v,i){
  			return ((v[0]==file.name && v[1]==file.size)?(md5==v[2]):false)
  		});*/
  		if(f3Res){
	  		$.each(f3Res,function(i,a){
	  			v=a.split('|');
	  			v[0]=atob(v[0])+'.dds';
	  			var page=v[3]=(v[3]+v[0]).substr(5);
	  			page= page.charAt(0).toUpperCase() + page.slice(1);
	  			matches.push(('F3-'+page).replace("_","-"));
	  		});
	  	}
	  	if(nvRes){
	  		$.each(nvRes,function(i,a){
	  			v=a.split('|');
	  			v[0]=atob(v[0])+'.dds';
	  			var page=v[3]=(v[3]+v[0]).substr(5);
	  			page= page.charAt(0).toUpperCase() + page.slice(1);
	  			matches.push(('Nv-'+page).replace("_","-"));
	  		});
	  	}
  		if(matches.length > 0)
  		{
  			match=true;
  			return matches;
  		}else{
  			matches.push('404');
  			return matches;
  		}
  		
  	}
  	else
  	{
  			matches.push('invalid');
  			return matches;
  	}
  }
  
 
  function handleDragLeave()
  {
  	$("#drop_zone").css("background-color","#ffffff");
  }
  
  
	$(document).ready(function(){	
		// We'll do a check here to see if we're on the right page
	  if(wgPageName=="MediaWiki:AssetLoader" && wgAction=="view"){
			
	  $.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:F3Meshes.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
			$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:F3Textures.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
				$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:FNVTextures.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
					$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:FNVMeshes.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
						$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:FNVTextures2.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
							$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:FNVMeshes2.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
								
								fnvm+=","+fnvm2
								fnvtx+=","+fnvtx2;						
								/*f3ma=faFixer(f3m,"nif");
								f3txa=faFixer(f3tx,"dds");
								fnvtxa=faFixer(fnvtx,"dds");
								fnvma=faFixer(fnvm,"nif");*/
								
								$(".blackoutb").css("display","none");
								//data loaded = ready for files. 
								var dropZone = document.getElementById('drop_zone');
			  				dropZone.addEventListener('dragover', handleDragOver, false);
			  				dropZone.addEventListener('dragleave', handleDragLeave, false);
			 				 	dropZone.addEventListener('drop', handleFileSelect, false);
		 				 	});
						});
					});
				});
	  	});
	  });
	  //end check;
	}else{
		$(".blackoutb").css("display","none");
	}
	});