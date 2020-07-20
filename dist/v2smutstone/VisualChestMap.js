$(document).ready(function(){
	if(mw.config.values.wgPageName!='Visual_Chest_Map'){return 0;}
	var chestMap='LCCRCCCCRCCRCCCRCCCCRCCRCCCCLCCECCCRCCCCRCRCCCCRCCCCECCRCCCCRCCRCCCCECCRCCCRCCCCECRCCCCRCCCCCCCRCCCC',chHTML='<div class="chDiv">',
	    urlParams = new URLSearchParams(location.search),
	    p1=urlParams.get('p1')||1, p2=urlParams.get('p2')||1,
	    p3=urlParams.get('p3')||1;
	for(i=0;i<chestMap.length;i++){
		chHTML += '<div class="chests0 Ch'+chestMap[i]+'" data-val="'+(i+1)+'"><div class="chests ima'+chestMap[i]+'"></div></div>'+(i%10==9 ? '<br>':'');
	}
	$(".mapBtns[data-ind='0'],.mapBtns[data-ind='1'],.mapBtns[data-ind='2']").append(chHTML+'</div>').find('.chests0').click(function(e){
		var par=$(this).parents('.mapBtns'), val=$(this).attr('data-val');
		par.find(".chests0").removeClass('ChSel ChLoc');
		$(this).addClass('ChSel'); $('#pos'+par.attr('data-ind')).html(val);
	});
	$('#set0,#set1,#set2').click(function(e){ var ind=$(this).attr('data-ind'), lastChests=prompt("Enter your last chests :",$('#lChest'+ind).html());
	    if(!lastChests){return 0;}
	    $('#lChest'+ind).html(lastChests); LocatePos(ind,lastChests);
	});
	$('#nxt0,#nxt1,#nxt2').click(function(e){ var ind=$(this).attr('data-ind'),val=(1+parseInt($('#pos'+ind).html()||0))%100;
		if(val<=0){val+=100;} $('#pos'+ind).html(val);
		$(".mapBtns[data-ind='"+ind+"'] .chests0[data-val='"+val+"']").click();
		SavePos();
	});
	$('#prev0,#prev1,#prev2').click(function(e){ var ind=$(this).attr('data-ind'),val=(-1+parseInt($('#pos'+ind).html()||1))%100;
		if(val<=0){val+=100;} $('#pos'+ind).html(val);
		$(".mapBtns[data-ind='"+ind+"'] .chests0[data-val='"+val+"']").click();
		SavePos();
	});
	$(".mapBtns[data-ind='0'] .chests0[data-val='"+p1+"']").click();
	$(".mapBtns[data-ind='1'] .chests0[data-val='"+p2+"']").click();
	$(".mapBtns[data-ind='2'] .chests0[data-val='"+p3+"']").click();
	$('#mapSave').click(function(e){SavePos(true);});
    
    function LocatePos(ind,lastChests){ var chestMap0=chestMap+chestMap, val=lastChests.toUpperCase().trim(), pos=chestMap0.indexOf(val)%100, posArr=[];
    	$(".mapBtns[data-ind='"+ind+"'] .chests0").removeClass('ChLoc');
    	while(pos>=0 && posArr.indexOf(pos)<0){
    		$(".mapBtns[data-ind='"+ind+"'] .chests0").filter(function(i,x){ var dval=parseInt($(x).attr('data-val'));
    			if((pos+val.length)<=100){return dval>=(pos+1) && dval<=pos+val.length;}
    			else{return dval>=(pos+1) || dval<=(pos+val.length)%100;}
    		}).addClass('ChLoc');
    		posArr.push(pos); pos=chestMap0.indexOf(val,pos+1)%100;
    	}
    }
    function SavePos(showAlert){
    	$('.ChSel').click(); p1=$('#pos0').html(); p2=$('#pos1').html(); p3=$('#pos2').html();
    	var temp = $("<input>");$("body").append(temp);
    	temp.val(document.location.href.split('?')[0].split('#')[0]+'?p1='+p1+'&p2='+p2+'&p3='+p3).select();
    	document.execCommand("copy");temp.remove();
    	if(showAlert){alert('New URL copied to clipboard !');}
    }
});