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
 
 
var buttons = $('.queryButton');
var display = $('#displayArea');
var karmaData = $('#karmaData');
var head = $('#head');
var tail = $('#tail');
 
 
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
    //主排序
    var orderBy = $('span.queryButton.queryButtonActive[data-group=order]').data('value');
    //次排序
    var orderBy2 = $('span.queryButton.queryButtonActive[data-group=order2]').data('value');
 
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
 
                if ( parseInt(_left)==parseInt(_right) ){
                    var _left2 = left.eq(0).data(orderBy2);
                    var _right2 = right.eq(0).data(orderBy2);  
                    final.push( parseInt(_left2)<=parseInt(_right2)?left.shift():right.shift());                    
                }
                else if ( parseInt(_left) < parseInt(_right) ){
                    final.push(left.shift());
                }
                else{
                    final.push(right.shift());
                }
                //final.push(parseInt(_left)<=parseInt(_right)?left.shift():right.shift());
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
 
    if(orderBy == 'rare' ) {
        return displaySet;
	} else
        return displaySet.reverse();
}
 

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
	if(buttons.filter('.queryButtonActive').length <= 1) return;
 
	var tmpData = karmaData.children().clone();


	tmpData = filter(tmpData, 'role');
	tmpData = filter(tmpData, 'exist');
	tmpData = filter(tmpData, 'rare');
	tmpData = filter(tmpData, 'limit');
	tmpData = filter(tmpData, 'main');
	tmpData = filter(tmpData, 'source');
	tmpData = order(tmpData);
	tmpHead = head.children().clone();
	tmpTail = tail.children().clone();
 
 
    display.append(tmpHead);
	display.append(tmpData);
	//display.append(tmpTail);
	texttip();
 
});