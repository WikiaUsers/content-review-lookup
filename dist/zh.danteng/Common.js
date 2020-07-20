/* 此处的JavaScript将加载于所有用户每一个页面。 */
//以下为最终幻想14
$(document).ready(function(){
    //调用官方数据库的图片
    $(".ff14_item_icon").each(function(){
       var base_url = "http://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/";
       var img_url = $(this).attr("data-img-url");
       $(this).html("<img src="+base_url+img_url+" width='36px' height='36px'>")
    });

    //相关链接打开在新窗口
    $(".ff14_about_link").children("a").each(function(){
        $(this).attr("target","_blank");
    });
});

//以上为最终幻想14
//以下为沃土

$(document).ready(function(){
   var slider_width = 122;

    $(".spell_slider").each(function(){
        var spell_id = $(this).attr('data-id');

        var init_level = $("#spell_slider_input_"+spell_id).val();
        if (init_level=="") {init_level= 0;}
        change_slider_block_by_input(spell_id,parseInt(init_level));

        $("#spell_slider_block_"+spell_id).mousedown(function(e){
            var left_o = parseInt($(this).css("left"));
            var pageX_o = e.pageX;

            $("#spell_slider_block_"+spell_id).mousemove(function(e){
                var left_new = e.pageX - pageX_o;
                left_new = left_o + left_new;

                change_slider_block(spell_id,left_new);
            });
        });

        $("#spell_slider_back_"+spell_id).click(function(e){
            var left_new = e.pageX - $(this).offset().left - 10;

            var max_level = parseInt($("#spell_slider_max_level_"+spell_id).html());
            var case_width = slider_width / (max_level+1);

            change_slider_block(spell_id,left_new);
        });

        return false;
    });

    $(window).mouseup(function(){
        $(document).unbind("mousemove");
    });
    $(document).mouseup(function(){
        $(".spell_slider").each(function(){
            var spell_id = $(this).attr('data-id');
            $("#spell_slider_block_"+spell_id).unbind("mousemove");
        });
    });

    $(".spell_slider").each(function(){
        var spell_id = $(this).attr('data-id');

        $("#spell_slider_input_"+spell_id).bind("input", function() {
            var level_text = $(this).val();
            if (level_text=="") {return;}

            var level = parseInt(level_text);

            change_slider_block_by_input(spell_id,level);
        });

    });

    function change_slider_block(spell_id,left_new){
        var max_level = parseInt($("#spell_slider_max_level_"+spell_id).html());

        if (left_new < 0) {left_new = 0;}
        if (left_new > slider_width) {left_new=slider_width;}

        $("#spell_slider_block_"+spell_id).css("left",left_new+"px");

        var level = parseInt(left_new/slider_width*max_level);
        $("#spell_slider_input_"+spell_id).val(level);

        change_data(spell_id,level);
    }

    function change_slider_block_by_input(spell_id,level){
        var max_level = parseInt($("#spell_slider_max_level_"+spell_id).html());

        if (level < 0 ) {
            level = 0;
            $("#spell_slider_input_"+spell_id).val(level);
        }
        if (level > max_level) {
            level=max_level;
            $("#spell_slider_input_"+spell_id).val(level);
        }

        $("#spell_slider_block_"+spell_id).css("left",parseInt(level/max_level*slider_width)+"px");

        change_data(spell_id,level);
    }

    function change_data(spell_id,level){
         var data=$("#spell_data_"+spell_id);
        var num=parseInt(data.attr("data-num"));
        var text=parseInt(data.attr("data-text"));
        var visible=parseInt(data.attr("data-visible"));
        var max_level = parseInt($("#spell_slider_max_level_"+spell_id).html());
        var passive_spell = data.data("passive");

        $("#spell_level_"+spell_id).html(level+"级");

        if (!passive_spell) {
            cost_data(spell_id,level,"AP",max_level);
            cost_data(spell_id,level,"MP",max_level);
            cost_data(spell_id,level,"WP",max_level);
            range_data(spell_id,level,max_level);
        }

        for (var i=1;i<=num;i++)
        {
            num_change(spell_id,level,i,max_level);
        }

        for (var j=1;j<=text;j++)
        {
            text_change(spell_id,level,j,max_level);
        }

        for (var k=1;k<=visible;k++)
        {
            visible_change(spell_id,level,k,max_level);
        }
    }

    function cost_data(spell_id,level,type,max_level){
        var data = $("#spell_cost_data_"+type+"_"+spell_id);
        var cost_min_level,cost_max_level,cost_num;

        cost_min_level = parseInt(data.attr("data-min-level"));
        if (isNaN(cost_min_level)) { cost_min_level =0;}
        cost_max_level = parseInt(data.attr("data-max-level"));
        if (isNaN(cost_max_level)) { cost_max_level =max_level;}
        cost_num = parseFloat(data.attr("data-base"));
        cost_num += parseFloat(data.attr("data-step"))*level;
        cost_num = Math.floor(cost_num);

        if (level < cost_min_level || level > cost_max_level || cost_num == 0){
            data.hide();
        }else{
            data.show();
            $("#spell_cost_data_"+type+"_num_"+spell_id).html(cost_num);
        }
    }

    function range_data(spell_id,level,max_level){
        var data = $("#spell_range_data_"+spell_id);
        var min_range,max_range,max_range_limit;
        var noSight_level;

        min_range = parseInt(data.attr("data-min"));
        if (isNaN(min_range)) { min_range =1;}
        max_range_limit = parseInt(data.attr("data-max-limit"));
        if (isNaN(max_range_limit)||max_range_limit==0) { max_range_limit =99;}
        max_range = parseFloat(data.attr("data-max-base"));
        max_range += parseFloat(data.attr("data-max-step"))*level;
        max_range = Math.floor(max_range);
        if (max_range > max_range_limit) { max_range = max_range_limit;}

        var range_html;
        if (min_range == max_range) {
            range_html = String(min_range);
        }else{
            range_html = min_range+"-"+max_range;
        }

        data.html(range_html);

        noSight_level = parseInt(data.attr("data-nosight-level"));
        if (isNaN(noSight_level)) { noSight_level =max_level+1;}
        if (level >= noSight_level){
            $("#spell_range_nosight_"+spell_id).show();
            $("#spell_range_sight_"+spell_id).hide();
        }else{
            $("#spell_range_nosight_"+spell_id).hide();
            $("#spell_range_sight_"+spell_id).show();
        }
    }

    function num_change(spell_id,level,i,max_level){
        var data = $("#spell_num_"+i+"_"+spell_id);
        var base,step,round,dec;
        var result;

        base = parseFloat(data.attr("data-base"));
        step = parseFloat(data.attr("data-step"));
        dec = parseInt(data.attr("data-dec"));
        if (isNaN(dec)) { dec =0;}
        round = data.attr("data-round");

        result = base+step*level;

        if (round == "up"){
            result = Math.ceil(result);
        }else if(round == "down"){
            result = Math.floor(result);
        }else {
            var vv = Math.pow(10, dec);
            result = Math.round(result * vv) / vv;
        }

        data.html(result);
    }

    function text_change(spell_id,level,i,max_level){
        var data = $("#spell_text_"+i+"_"+spell_id);
        var amount = parseInt(data.attr("data-amount"));
        if (isNaN(amount)) { return;}
        var result = data.attr("data-text-base");
        var temp_level;

        for (var i=1;i<=amount;i++)
        {
            temp_level = parseInt(data.attr("data-level-"+i));
            if (level >= temp_level){ result = data.attr("data-text-"+i);}
        }

        data.html(result);
    }

    function visible_change(spell_id,level,i,max_level){
        var data = $("#spell_visible_"+i+"_"+spell_id);
        var visible_max_level,visible_min_level;

        visible_max_level = parseInt(data.attr("data-max-level"));
        if (isNaN(visible_max_level)) { visible_max_level =0;}
        visible_min_level=  parseInt(data.attr("data-min-level"));
        if (isNaN(visible_min_level)) { visible_min_level =max_level;}

        if (level < visible_min_level || level > visible_max_level){
            data.hide();
        }else {
            data.show();
        }
    }
});