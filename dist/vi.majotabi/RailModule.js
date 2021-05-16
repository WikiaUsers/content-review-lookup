(function($){
    "use strict";
    $(document).ready(function(){
    	if (window.AdditionalModuleDisabled) {
        	return;
    	}
    	
    	function addToRail(content){
    		const filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
    		if (filter.length > 0) {
                content.insertAfter(filter);
            } else {
	        	$('#WikiaRail').prepend(content);
            }
    	}
    	
    	var spoilerSetting = {
    		data: {
    			blurClass: "spoilerblur-toggle ",
    			hideClass: "display-none",
    			values: [
					{
                    	title: "Mặc định",
                    	description: "Ẩn những mục có thể tiết lộ trước nội dung chưa được xuất bản tại Việt Nam.",
                    	actions: function(value){
							$(".spoiler").removeClass(value);
							$(".jap-spoiler, .spoilerblur").addClass(value);
							$(".jap-spoiler-notif").css('display', "none");
						}
					},
					{
						title: "Ẩn toàn bộ", 
						description: "Ẩn toàn bộ những mục có thể tiết lộ trước nội dung.",
						actions: function(value){
							$(".spoiler, .jap-spoiler, .spoilerblur").addClass(value);
							$(".jap-spoiler-notif").css('display', "none");
						}
					},
					{
						title: "Hiện toàn bộ", 
						description: "Không ẩn nội dung",
						actions: function(value){
							$(".spoiler, .jap-spoiler, .spoilerblur").removeClass(value);
							$(".jap-spoiler-notif").css('display', "");
						}
					}
				]
    		},
    		savedSetting: function(){
    			const savedSetting = localStorage.getItem("spoilerSetting");
    			
    			if (savedSetting === null){
    				return {
    					mode: "0",
    					bHide: false,
    					bNote: true
    				};
    			} else {
    				return JSON.parse(savedSetting);
    			}
    		},
    		generateContent: function(spSetting){
    			const
    				data = this.data,
    				apply = this.apply,
    				title = "Tiết lộ nội dung",
    				notif = 'Bài viết chứa thông tin có thể <span style="font-weight: bold; color: red">tiết lộ trước nội dung</span> chưa được xuất bản tại Việt Nam.',
                	body = $("<div>", { id: "spoiler-setting", class: "rail-module spoiler-module" })
                		.append($("<h2>").text(title)),
                	spSelect = $("<select>", {id: "spSelect",name: "spSelect"}),
                	spDetail = $("<div>", { class: "spoiler-setting-detail" })
                		.append($("<div>")
	                        .append($("<input>", {
    					    	type: "checkbox",
	    				    	id: "spContentCheckBox",
	    				    	title: "Ẩn hoàn toàn mục thay vì làm mờ. Không có tác dụng gì nếu như bạn cài đặt chế độ [Hiện toàn bộ]"
                        	})).append($("<span>").text("Ẩn hoàn toàn")))
                		.append($("<div>")
	                        .append($("<input>", {
    					    	type: "checkbox",
	    				    	id: "spNoteCheckBox",
	    				    	title: "Hiện ô thông báo trước mỗi mục có thể tiết lộ trước nội dung"
                        	})).append($("<span>").text("Cảnh báo nội dung mỗi mục")))
						.css("display", "none"),
					spButtons = $("<div>", { class: "spoiler-setting-buttons" })
                		.append($("<input>", {
	                    	class: "spoiler-btn",
                    		type: "button",
                    		value: "Khác"
                		}).click(function(){$("div.spoiler-setting-detail").slideToggle(200)}))
                		.append($("<input>", {
	                    	class: "spoiler-btn spoiler-apply-btn",
	                    	id: "spoiler-apply-btn",
                    		type: "button",
                    		value: "Áp dụng"
                		}).click(function(){
                			$("div.spoiler-setting-detail").slideUp(200);
                			apply(spSetting, data);
                			$(this).prop("disabled", true);
                			setTimeout(function() {$("#spoiler-apply-btn").prop("disabled", false);}, 5500);
                			$("#spoiler-setting-applied-image, #spoiler-setting-applied-text").show().delay(5000).fadeOut();
                		})),
               		spApplied = $("<div>")
               			.append($("<img>", {
               				id: "spoiler-setting-applied-image",
               				alt: "Nike",
               				src: "https://static.wikia.nocookie.net/majo-no-tabitabi/images/e/ed/YnVJYkYs.png/revision/latest/scale-to-width-down/248?cb=20210511141007&path-prefix=vi",
               				decoding: "async",
               			}).css("display", "none"))
               			.append($("<div>", { id: "spoiler-setting-applied-text" }).css("display", "none")
               				.append($("<div>", { id: "spoiler-setting-applied-text-content" }).text("Đã lưu cài đặt")));
               		
               	$.each(this.data.values, function(index){
	        		spSelect
	        			.append($("<option>", {
	        				value: index,
	        				title: this.description
	        			})
        				.text(this.title));
	            });
	            
    			if ($(".jap-spoiler").length > 0) {
            		$(".mw-parser-output").prepend($("<div>", { class: "jap-spoiler-notif wiki-hatnote" }).html(notif));
            	}
	            return body.append(spSelect, spDetail, spButtons, spApplied);
    		},
    		apply: function(spSetting, data){
    			$(".spoiler, .jap-spoiler, .spoilerblur").removeClass(data.blurClass).removeClass(data.hideClass);
    			
    			spSetting.mode = $("#spSelect").val();
    			if ($('#spNoteCheckBox').is(":checked")){
                	$(".spoiler-section-note").css("display", "block");
                	spSetting.bNote = true;
                } else {
	            	$(".spoiler-section-note").css("display", "none");
                	spSetting.bNote = false;
                }
                if ($('#spContentCheckBox').is(":checked")){
                	data.values[spSetting.mode].actions(data.hideClass);
                	spSetting.bHide = true;
                } else {
                	data.values[spSetting.mode].actions(data.blurClass);
                	spSetting.bHide = false;
                }
                localStorage.setItem("spoilerSetting", JSON.stringify(spSetting));
    		},
    		ini: function(){
    			var spSetting = this.savedSetting();
    			addToRail(this.generateContent(spSetting));
    			
    			$("#spSelect").val(spSetting.mode);
    			$("#spNoteCheckBox").prop('checked', spSetting.bNote);
    			$("#spContentCheckBox").prop('checked', spSetting.bHide);
    			
    			this.apply(spSetting, this.data);
    		}
    	},
    	
    	volumeList = {
    		values: [
    			{
    				lang: "Tiếng Nhật",
    				action: function(){
						$(".jap-only, .ja-info").css("display", "block");
						$(".vi-info").css("display", "none");
    				}
    			},
    			{
    				lang: "Tiếng Việt",
    				action: function(){
						$(".jap-only, .ja-info").css("display", "none");
						$(".vi-info").css("display", "block");
    				}
    			}
    		],
    		generateContent: function(){
    			const
    				values = this.values,
    				title = "Cài đặt danh sách",
    				body = $("<div>", { id: "list-setting", class: "rail-module spoiler-module" })
    					.append($("<h2>").text(title)),
                    stSelect = $("<select>", {
                    	   id: "langSelect",
                    	    name: "langSelect"
                    	}).on('change', function() {values[$(this).val()].action()}),
                    stDetail = $("<div>", { class: "list-setting-detail" })
                    	.append($("<div>", { class: "detail-checkbox" })
                        	.append($("<input>", {
    					   		type: "checkbox",
	    				   		id: "detailCheckBox",
					       		checked: "true"
    			    		}).click(function() {
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
            				}))
                    		.append($("<span>").text("Thông tin chi tiết"))
                    	);
                $.each(values, function(index){
                	stSelect.append($("<option>").prop("value", index).text(this.lang))});
	            return body.append(stSelect, stDetail);
    		},
    		ini: function(){
    			addToRail(this.generateContent());
    		}
    	};
    	
    	if($(".spoiler").length > 0){
    		spoilerSetting.ini();
    	}
        if($(".ORV").length > 0){
    		volumeList.ini();
    	}
    });
}(jQuery));