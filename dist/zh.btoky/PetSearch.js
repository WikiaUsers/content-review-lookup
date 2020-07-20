(function( $ ) {
    $.fn.pop = function() {
        var top = this.get(-1);
        this.splice(this.length-1,1);
        return top;
    };

    $.fn.shift = function() {
        var bottom = this.get(0);
        this.splice(0,1);
        return bottom;
    };
})( jQuery );

var attr = '水 火 木 光 暗'.split(' ');
var racial = '人類 獸類 妖精類 龍類 神族 進化素材 強化素材 魔族'.split(' ');
var buttons = $('.queryButton');
var display = $('#displayArea');
var monsterData = $('#monsterData');

function filter(displaySet, group) {
	var itemArr = [];
	var groupItem = $('span.queryButton.queryButtonActive[data-group=' + group + ']');
	for(var i = 0; i < groupItem.length; i++) {
		var strs = String(groupItem.eq(i).data('value')).split(/,/g);
		for(var j = 0; j < strs.length; j++)
			itemArr.push(parseInt(strs[j]));
	}
	if (itemArr.length > 0) {
		var tmp = [];
		for (var i = 0; i < displaySet.length; i++) {
			if (itemArr.indexOf(displaySet.eq(i).data(group)) >= 0)
				tmp.push(displaySet[i]);
		}
		displaySet = tmp;
	}
	return $(displaySet);
}

function order(displaySet) {
    
	var orderBy = $('span.queryButton.queryButtonActive[data-group=order]').data('value');
    
	function swap(arr, index1, index2) {
		var tmp = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = tmp;
	}
    
    function merge(left, right) {
        var final = $();
        while (left.length) {
            if(right.length) {
                var _left = left.eq(0).data(orderBy);
                var _right = right.eq(0).data(orderBy);
                final.push(parseInt(_left)<=parseInt(_right)?left.shift():right.shift());
            }
            else break;
        }
        return final.add(left.add(right));
    }
    
    function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        var left = arr.slice(0, parseInt(arr.length / 2));
        var right = arr.slice(parseInt(arr.length / 2));
        return merge(mergeSort(left), mergeSort(right));
    }
			
    displaySet = mergeSort(displaySet);
    
    displaySet.each(function(_, _elem) {
        var elem = $(_elem);
        var text = elem.data(orderBy);
        switch(orderBy) {
            case 'attribute':
                text = attr[parseInt(text)-1];
                break;
            case 'star':
                text+='★';
                break;
            case 'racialtype':
                text = racial[parseInt(text)-1];
                break;
            case 'monsterid':
                text = 'No. '+text;
                break;
            case 'level':
                text = 'Lv. '+text;
                break;
        }
        elem.find('.monsterLv').text(text);
    });
    
    if(orderBy == 'monsterid' || orderBy == 'attribute' || orderBy == 'racialtype') {
        return displaySet;
	} else
        return displaySet.reverse();
}

monsterData.children('div').css('display', 'inline').css('margin', '3px');
$('.queryButton[data-group=order]').eq(0).addClass('queryButtonActive');
buttons.click(function(e){
	display.children().remove();
	if ($(this).data('group') == "order") {
		$('.queryButton[data-group=order]').removeClass('queryButtonActive');
		$(this).addClass('queryButtonActive');
	} else {
		if ($(this).hasClass('queryButtonActive'))$(this).removeClass('queryButtonActive');
		else $(this).addClass('queryButtonActive');
	}
	if ('填寫通關攻略' == wgPageName) {
		if(buttons.filter('.queryButtonActive').length <= 1)return;
	}
	
	var tmpData = monsterData.children().clone();
	
	tmpData = filter(tmpData, 'star');
	tmpData = filter(tmpData, 'attribute');
	tmpData = filter(tmpData, 'seriesid');
	tmpData = filter(tmpData, 'racialtype');
	tmpData = order(tmpData);
	
	display.append(tmpData);

	if ('填寫通關攻略' == wgPageName) {
		$(display).find('a').each(function(){
			$(this).attr('href','javascript:void(0)');
		})
		.find('img').each(function(){
			$(this).click(onSelect);
		});
$('.queryButton').css('background-color', '#7d5d3b;').css('background-image', 'none;').css('border', '2px solid #54381e;').css('-moz-border-radius', '6px;').css('-webkit-border-radius', '6px;').css('border-radius', '6px;').css('-moz-box-shadow', 'inset 0px 1px 0px 0px #a6827e;').css('-webkit-box-shadow', 'inset 0px 1px 0px 0px #a6827e;').css('box-shadow', 'inset 0px 1px 0px 0px #a6827e;').css('font-size', '13px;').css('height', 'none;').css('line-height', 'none;').css('margin', 'none;').css('padding', '1px 10px;');
$('.queryButtonActive').css('background-color', '#4d3534;').css('background-image', 'none;').css('color', 'none;');
}
});