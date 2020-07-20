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
var eventData = $('#eventData');
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
	if(buttons.filter('.queryButtonActive').length < 1) {
	    var tmpData = eventData.children().clone();     
    	tmpHead = head.children().clone();
    	tmpTail = tail.children().clone();	    
    }
    else{
    	var tmpData = eventData.children().clone();
     
    	tmpData = filter(tmpData, 'role');
    	tmpData = filter(tmpData, 'rare');
     
    	tmpHead = head.children().clone();
    	tmpTail = tail.children().clone();
    }
    display.append(tmpHead);
	display.append(tmpData);
	//display.append(tmpTail);
	texttip();
 /*
	if(buttons.filter('.queryButtonActive').length <= 1) return;
 
	var tmpData = eventData.children().clone();
 
	tmpData = filter(tmpData, 'role');
	tmpData = filter(tmpData, 'rare');
 
	tmpHead = head.children().clone();
	tmpTail = tail.children().clone();
 
 
    display.append(tmpHead);
	display.append(tmpData);
	//display.append(tmpTail);
	texttip();
	*/
 
});