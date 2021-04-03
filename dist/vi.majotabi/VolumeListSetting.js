(function($){
    "use strict";
    $(document).ready(function(){
        if($(".ORV").length > 0) {
            const
                stTitle = "Cài đặt danh sách",	
                filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last(),
                stMain = $("<div>", { id: "list-setting", class: "rail-module spoiler-module" })
                    .append($("<h2>").text(stTitle))
                    .append($("<select>", {
                        id: "langSelect",
                        name: "langSelect"
                    }))
                    .append($("<div>", { class: "detail-checkbox" })
                        .append($("<input>", {
    					    type: "checkbox",
	    				    id: "detailCheckBox",
					        checked: "true"
    			    }))
                    .append($("<span>").text("Thông tin chi tiết"))),
                stLang = [
                    {
                        lang: "Tiếng Nhật",
                        ja: "block",
                        vi: "none"
                    },
                    {
                        lang: "Tiếng Việt",
                        ja: "none",
                        vi: "block"
                    }
                ];

            function langChange(value){
                console.log(value)
                $(".jap-only").css('display', stLang[value].ja);
                $(".ja-info").css('display', stLang[value].ja);
                $(".vi-info").css('display', stLang[value].vi);
            }
            
            if (filter.length > 0) {
                	stMain.insertAfter(filter);
            } else {
	                $('#WikiaRail').prepend(stMain);
            }
            
            $(stLang).each(function(index){
                $("#langSelect")
                    .append($("<option>")
                    .prop("value", index)
                    .text(this.lang))
			    });
    	    $('#detailCheckBox').click(function() {
    			if (this.checked) {
    			    $(".ORV").css('width', '99%');
    			    $(".ORV-table").css('display', 'table');
    			    $(".ORV-table-ctn").css('width', 'auto');
    			    $(".ORV-img img").attr({'width': '230', 'height': "327"});
			    } else {
        			$(".ORV").css('width', '216px');
    			    $(".ORV-table").css('display', 'none');
    			    $(".ORV-table-ctn").css('width', '0');
    			    $(".ORV-img img").attr({'width': '210', 'height': "300"});
			    }
            });
            
            $("#langSelect").on('change', function() {langChange($(this).val())});
        }
    });
}(jQuery));