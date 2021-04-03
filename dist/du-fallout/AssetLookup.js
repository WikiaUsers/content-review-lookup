var stringData;
var f3data;
var nvdata;
var results;
var resultdiv='<div class="autoResult" title="test item"><span>Test Item</span><div class="resIcon" style=""></div></div>';
$(document).ready(function(){	
		// We'll do a check here to see if we're on the right page
	  if(wgPageName=="MediaWiki:AssetLookup" && wgAction=="view"){
 
	  $.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:Data31.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
			$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:Data32.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
				$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:DataNV1.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
					$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:DataNV2.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
							$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:DataNV3.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
							$.getScript(mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode("MediaWiki:NifParser.js")+'&action=raw&ctype=text/javascript').done(function( data, textStatus, jqxhr ) {
								f3data=$.extend({},f31,f32);
								nvdata=$.extend({},fnv1,fnv2,fnv3);
								$.each(f3data,function(i,v){
									if(v.n!="")
									{
										stringData+="|3>"+v.n+"|"+i+"|"+v.i+"|";
									}
								});
		 						$.each(nvdata,function(i,v){
									if(v.n!="")
									{
										stringData+="|v>"+v.n+"|"+i+"|"+v.i+"|";
									}
								});
								$(".blackoutb").css("display","none");
								//data loaded = ready for files. 
	
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
	
	$('.autoResult').mouseenter(function(e){
		$(this).removeClass("selected");
		$(this).addClass("selected");
	});
	$('.autoResult').mouseleave(function(e){
		$(this).removeClass("selected");
		
	});
	$('#alSearchInput').keyup(function(e){
		if($(this).val().length > 2)
		{
			var pat='(\\|.>[^\\|]*'+$(this).val()+'[^\\|]*\\|[^\\|]*\\|[^\\|]*\\|)';
			var re = new RegExp(pat,'gi');
			var results=stringData.match(re);
			if(results){
				//we want to rearrange the results to put the ones that start with the
				//search, towards the beginning;
				for(var j=0;j < results.length;j++)
				{
					var item = results[j].match(/\|(3|v)>([^\|]*)\|([^\|]*)\|([^\|]*)\|/i);
					if(item[2].substr(0,$(this).val().length).toLowerCase()==$(this).val().toLowerCase())
					{
						var temp=results.splice(j,1);
						results.unshift(temp[0]);
					}
					
				}
				
				
				$("#autocompleteDiv").empty();
				$("#autocompleteDiv").css("display","block");
				for(var j=0; j < results.length;j++)
				{
					var item = results[j].match(/\|(3|v)>([^\|]*)\|([^\|]*)\|([^\|]*)\|/i);
					var fid=('00000000'+Number(item[4]).toString(16)).slice(-8);
					item[4]=(fid[1]=='0')?fid:"xx"+fid.slice(-6);
					var rd = $(resultdiv);
					$(rd).mouseenter(function(e){
						$(this).removeClass("selected");
						$(this).addClass("selected");
					});
					$(rd).mouseleave(function(e){
						$(this).removeClass("selected");
					});
					$(rd).click(function(e){
						$("#autocompleteDiv").css("display","none");
						$('.alPageContent').empty();
						var arr = $(this).attr("title").split('-');
						var esmData;
						if(arr[1]=='fo3')
						{
							esmData=f3data[arr[0]];
						}else{
							esmData=nvdata[arr[0]];
						}
						$('.alPageContent').append('<h2><span class="mw-headline" id="'+esmData.n+'">'+esmData.n+'</span></h2>');
						$('.alPageContent').append('<h3><span class="mw-headline" id="InfoBox Parameter">InfoBox Parameter</span></h3>');
						$('.alPageContent').append('<p><pre>|model             ='+arr[0]+'</pre></p>');
					});
					var title=item[3]+'-'+((item[1]=="3")?"fo3":"fnv");
					$(rd).attr("title",title);
					$('span',$(rd)).html(item[2]+" <em>("+item[4]+")</em>");
					$('.resIcon',$(rd)).addClass((item[1]=="3")?"fo3":"fnv");
					$("#autocompleteDiv").append($(rd));
					
					//console.log(item);
				}
			}else{
				$("#autocompleteDiv").css("display","none");
			}
		}else{
			$("#autocompleteDiv").css("display","none");
		}
	})
});