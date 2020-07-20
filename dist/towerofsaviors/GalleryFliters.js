$('<div class="handbook_filter" style="text-align: left;"><span>Mode: </span><label for="selectPropAll"><input type="radio" id="selectPropAll" name="selectProp" value="" checked />All</label><label for="selectPropA"><input type="radio" id="selectPropA" name="selectProp" value="1" />Pattern of Connection</label><label for="selectPropB"><input type="radio" id="selectPropB" name="selectProp" value="2" />Seal of Transposition</label><label for="selectPropC"><input type="radio" id="selectPropC" name="selectProp" value="3" />Spell of Destruction</label><label for="selectPropD"><input type="radio" id="selectPropD" name="selectProp" value="4" />Amulet of Reflection</label><label for="selectPropE"><input type="radio" id="selectPropE" name="selectProp" value="5" />Jasper of Sprinting</label><label for="selectPropF"><input type="radio" id="selectPropF" name="selectProp" value="6" />Blade of Slashing</label></div>').appendTo('#gallery_filter');
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