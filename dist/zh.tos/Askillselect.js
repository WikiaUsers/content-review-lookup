$('<div class="handbook_filter" style="text-align: left;"><label for="主動技列表/A"><input type="radio" id="主動技列表/A" name="主動技列表/" value="1" />第一頁</label><label for="主動技列表/B"><input type="radio" id="主動技列表/B" name="主動技列表/" value="2" />第二頁</label><label for="主動技列表/C"><input type="radio" id="主動技列表/C" name="主動技列表/" value="3" />第三頁</label><label for="主動技列表/D"><input type="radio" id="主動技列表/D" name="主動技列表/" value="4" />第四頁</label><label for="主動技列表/E"><input type="radio" id="主動技列表/E" name="主動技列表/" value="5" />第五頁</label><label for="主動技列表/F"><input type="radio" id="主動技列表/F" name="主動技列表/" value="6" />第六頁</label><label for="主動技列表/G"><input type="radio" id="主動技列表/G" name="主動技列表/" value="7" />第七頁</label><label for="主動技列表/H"><input type="radio" id="主動技列表/H" name="主動技列表/" value="8" />第八頁</label><label for="主動技列表/I"><input type="radio" id="主動技列表/I" name="主動技列表/" value="9" />第九頁</label></div>').appendTo('#askill');
$("input'https://tos.fandom.com/zh/wiki/[name='主動技列表/']'").on("click", function(){
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