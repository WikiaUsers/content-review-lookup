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

var attr = '不限 水 火 木 光 暗'.split(' ');
var racial = '不限 人類 獸類 神族 龍類 妖精類 魔族 機械族'.split(' ');
var buttons = $('.queryButton');
var display = $('#displayArea');
var craftData = $('#craftData');

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

function filter2(displaySet, group) {
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
            var skilltypes = displaySet.eq(i).data(group);
            var skilltypes2 = String(skilltypes).split(" ");
            var found = 0;
            for (var j = 0; j < skilltypes2.length; j++){
                if (itemArr.indexOf(parseInt(skilltypes2[j])) >= 0){
                    found = 1; 
                }
            }
            if (found > 0){
                tmp.push(displaySet[i]);
            }
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

craftData.children('div').css('display', 'inline').css('margin', '3px');
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
    if(buttons.filter('.queryButtonActive').length <= 0) return;
    
    var tmpData = craftData.children().clone();
    
    tmpData = filter(tmpData, 'star');
    tmpData = filter(tmpData, 'attribute');
    tmpData = filter(tmpData, 'racialtype');
    tmpData = filter(tmpData, 'mode');
    tmpData = filter(tmpData, 'charge');
    tmpData = filter2(tmpData, 'skilltype');
    tmpData = filter2(tmpData, 'skilltype2');
    //tmpData = order(tmpData);
    
    display.append(tmpData);
    texttip();
});