(function($){
    "use strict";
    $(document).ready(function(){
    	if (window.AdditionalRailModuleDisabled) {
        	return;
    	}
        const
            spTitle = "Tiết lộ nội dung",	       
            spMain = $("<div>", { id: "spoiler-setting", class: "rail-module spoiler-module" })
                .append($("<h2>").text(spTitle))
                .append($("<select>", {
                    id: "spSelect",
                    name: "spSelect"
                }))
                .append($("<input>", {
                    class: "spoiler-detail-btn",
                    type: "button",
                    value: "?"
                }))
                .append($("<div>", {
                    class: "spoiler-setting-detail",
                }).css("display", "none").append($("<ul>"))
                ),
		    filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last(),
		    spNotif = 'Bài viết chứa thông tin có thể <span style="font-weight: bold; color: red">tiết lộ trước nội dung</span> chưa được xuất bản tại Việt Nam.',
    	    spValue = [
                    {
                        title: "Mặc định",
                        description: "Ẩn những mục có thể tiết lộ trước nội dung chưa được xuất bản tại Việt Nam.",
                        spoiler: "initial",
                        jspoiler: "none",
                        jspoilerN: "none"
                    },
                    {
                        title: "Ẩn toàn bộ", 
                        description: "Ẩn toàn bộ những mục có thể tiết lộ trước nội dung.",
                        spoiler: "none",
                        jspoiler: "none",
                        jspoilerN: "none"
                    },
                    {
                        title: "Hiện toàn bộ", 
                        description: "Không ẩn nội dung",
                        spoiler: "initial",
                        jspoiler: "initial",
                        jspoilerN: "block"
                    }
            ];
            
        var spStatus = localStorage.getItem("spoilerStatus");
			
  		function spoilerApplyChange(value){
  			if (value === "2" && mw.config.values.wgUserGroups.includes("sysop") === false){
  				alert('Chức năng này tạm thời chỉ khả dụng cho quản trị viên');
  				value = "0";
  			}
			$("#spSelect").val(value); 
            $(".spoiler").css('display', spValue[value].spoiler);
            $(".jap-spoiler").css('display',spValue[value].jspoiler);
            $(".jap-spoiler-notif").css('display',spValue[value].jspoilerN);
    		localStorage.setItem("spoilerStatus", value);
		}
    	if($(".spoiler").length > 0){
			if (filter.length > 0) {
                	spMain.insertAfter(filter);
            	} else {
	                $('#WikiaRail').prepend(spMain);
            	}
            if ($(".jap-spoiler").length > 0) {
            	$(".mw-parser-output").prepend($("<div>", { class: "jap-spoiler-notif" })
            	.css({"background": "#ffffcc", "border": "solid 1px #c0c0c0", "text-align": "center", "padding": "15px 25px", "margin-bottom": "10px"})
            	.html(spNotif)
            	);
            }
        	
        	$(spValue).each(function(index){
	        	$("#spSelect")
	        		.append($("<option>")
            		.prop("value", index)
        			.text(this.title));
				$(".spoiler-setting-detail ul")
					.append($("<li>")
	            	.html($("<b>").text(this.title)).append(": " + this.description))});
			$(".spoiler-detail-btn").click(function(){
				$("div.spoiler-setting-detail").toggle(200)
			});
	
			if (spStatus === null) {spStatus = 0}
	
			spoilerApplyChange(spStatus);
			$("#spSelect").on('change', function() {spoilerApplyChange($(this).val())});
    	}
    });
}(jQuery));