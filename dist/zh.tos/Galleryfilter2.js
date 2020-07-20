$('<div class="handbook_filter" style="text-align: left;"><label for="selectPropAll"><input type="radio" id="selectPropAll" name="selectProp" value="" checked />全部</label><br /><label for="selectPropA"><input type="radio" id="selectPropA" name="selectProp" value="1" />連鎖龍紋</label><label for="selectPropB"><input type="radio" id="selectPropB" name="selectProp" value="2" />轉動龍印</label><label for="selectPropC"><input type="radio" id="selectPropC" name="selectProp" value="3" />破碎龍咒</label><label for="selectPropD"><input type="radio" id="selectPropD" name="selectProp" value="4" />映照龍符</label><label for="selectPropE"><input type="radio" id="selectPropE" name="selectProp" value="5" />疾速龍玉</label><label for="selectPropF"><input type="radio" id="selectPropF" name="selectProp" value="6" />裂空龍刃</label><label for="selectPropG"><input type="radio" id="selectPropG" name="selectProp" value="7" />落影龍璃</label><label for="selectPropH"><input type="radio" id="selectPropH" name="selectProp" value="8" />擴散龍結</label><label for="selectPropI"><input type="radio" id="selectPropI" name="selectProp" value="9" />鏡像龍丸</label><label for="selectPropJ"><input type="radio" id="selectPropJ" name="selectProp" value="10" />節奏龍弦</label></div>').appendTo('#gallery_filter');
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