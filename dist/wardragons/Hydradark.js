/* Any JavaScript here will be loaded for users using the Hydra Dark skin */

$(document).ready(function(){
    $(".riderBuild").click(function(){
        var params = $(this).attr("title").split(",")
        for (var i=1; i <= params.length; i++)
            $("#"+i).html(params[i-1])
    });
});