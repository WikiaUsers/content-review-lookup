//Filters table results

//http://stackoverflow.com/questions/17074687/filtering-table-rows-using-jquery
$(function () {
    if ($('div #tablefilter').length) {
        $('div #tablefilter').html('<input type="text" class="filterResults"'+
        'style="border-radius: 100px;     padding: 7px 5px 5px 35px;'+
        'width: 200px;     margin-right: 10px;     line-height: 22px;'+
        'padding-right: 25px;     border: 2px solid #ebebeb;"'+
        'id="searchCourse" placeholder="Type here to filter and see more">') ;
        $('div #tablefilter').attr("style","text-align:center");
        $(".crowtable tr:nth-child(n + 8)").hide();
    }
    $("#searchCourse").on('keyup', function() {
        jQuery.expr[':'].icontains = function(a, i, m) {
            return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
        };
        var sSearchString = this.value.toLowerCase();
        $(".crowtable tr:nth-child(n + 8)").show();    
        if (sSearchString.length < 1) {
            $(".wikitable tr").css("display", "");
        } else {
            $(".wikitable tbody tr:not(:icontains('"+sSearchString+"'))").css("display", "none");
            $(".wikitable tbody tr:icontains('"+sSearchString+"')").css("display", "");
        }
        
    });
});