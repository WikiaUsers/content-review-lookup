/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
/* 加载对UserProfile页面的强制翻译（SkyFuInMC制作） */

$(function() {
 if (mw.config.get("wgUserLanguage").indexOf("zh") == -1) return;
 $("#Friends").html("好友");
 $("#Achievements").html("成就");
 if (mw.config.get("wgNamespaceNumber") != 202) return;
  $(".activity.section:first li").each(function() {
    output = $(this).html();
    output = output.replace(">diff<",">差异<");
    output = output.replace(">hist<",">历史<");
    output = output.replace(')">',')">于');
    output = output.replace(" days","天");
    output = output.replace("a day","1天");
    output = output.replace(" ago","前");
    output = output.replace(" hours","个小时");
    output = output.replace("an hour","1个小时");
    output = output.replace("about ","大约");
    output = output.replace(" months","个月");
    output = output.replace("a month","1个月");
    output = output.replace(" years","年");
    output = output.replace("a year","1年");
    output = output.replace(" minutes","分钟");
    output = output.replace("a minute","1分钟");
    output = output.replace("less than ","不到");
    output = output.replace("Created","创建了");
    output = output.replace("Edited","编辑了");
    output = output.replace('</a> (<a','</a> （<a');
    output = output.replace('</a>) <time','</a>） <time');
    output = output.replace("于于","于");
    $(this).html(output);
  });
});