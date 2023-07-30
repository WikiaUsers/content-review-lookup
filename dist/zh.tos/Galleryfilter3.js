$('<div class="handbook_filter" style="text-align: left;"><span>屬性: </span><label for="selectPropAll"><input type="radio" id="selectPropAll" name="selectProp1" value="" checked />全部</label><label for="selectProp水"><input type="radio" id="selectProp水" name="selectProp1" value="水" />水</label><label for="selectProp火"><input type="radio" id="selectProp火" name="selectProp1" value="火" />火</label><label for="selectProp木"><input type="radio" id="selectProp木" name="selectProp1" value="木" />木</label><label for="selectProp光"><input type="radio" id="selectProp光" name="selectProp1" value="光" />光</label><label for="selectProp暗"><input type="radio" id="selectProp暗" name="selectProp1" value="暗" />暗</label></div>').appendTo('#gallery_filter1');
$("input[name='selectProp1']").on("click", function(){
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