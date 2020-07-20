$('<div class="handbook_filter" style="text-align: left;"><span>屬性: </span><label for="selectPropAll"><input type="radio" id="selectPropAll" name="selectProp" value="" checked />全部</label><label for="selectPropW"><input type="radio" id="selectPropW" name="selectProp" value="水" />水</label><label for="selectPropF"><input type="radio" id="selectPropF" name="selectProp" value="火" />火</label><label for="selectPropE"><input type="radio" id="selectPropW" name="selectProp" value="木" />木</label><label for="selectPropL"><input type="radio" id="selectPropT" name="selectProp" value="光" />光</label><label for="selectPropD"><input type="radio" id="selectPropT" name="selectProp" value="暗" />暗</label></div>').appendTo('#gallery_filter_1');
$("input[name='selectProp']").on("click", function(){
    filterHandbook();
});
$("#flytabs_0").bind("DOMSubtreeModified",function(){
    $(".tabBody").bind("DOMSubtreeModified",function(){
        filterHandbook();
    });
});
function filterHandbook(){
    var propType = $("div.handbook_filter input:checked").val();
    if(propType){
        $("div.handbook_card").hide();
        $("div.handbook_card."+propType).show();
    }else{
        $("div.handbook_card").show();
    }
}