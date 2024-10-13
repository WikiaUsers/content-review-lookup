/*
 * @title  PreviewWithVariant.js
 * @source https://zh.wikipedia.org/wiki/MediaWiki:Gadget-PreviewWithVariant.js
 */

// <nowiki>
/*
  本工具會在「顯示預覽」按鈕增加選單，選單裏有各種地區字詞轉換的語言
  當按下「顯示預覽」後，便會以選單中所選的地區字詞來預覽
  這可以毋須在儲存後再切換用字模式才能看到效果，直接用預覽便可檢視各種用字模式，從而減少bug的儲存
*/

	$(function() {
		// 偵測「顯示預覽」按鈕
		$('#wpPreview, input[name=wpTemplateSandboxPreview]').each( function(){
			var $this=$(this);
			
			// 建立選單
			var $listVariant=this.$listVariant=$('<select />')
			.attr("name", ("listVariant_"+$this.attr("name")) || ("listVariant_"+$this.attr("id")) )
			.attr("id"  , ("listVariant_"+$this.attr("id")) || ("listVariant_"+$this.attr("name")) )
			;
			
			// 建立選單選項
			(function addVarOpt(text, variant){
				$("<option />")
				.text(text)
				.each( function(){
					this.selected=this.defaultSelected=(mw.config.get('wgUserVariant')==(this.value=variant));
				})
				.appendTo($listVariant)
				;
				
				return addVarOpt;
			})
			(wgULS("不转换","不轉換"), "zh")
			("简体", "zh-hans")
			("繁體", "zh-hant")
			("大陆简体", "zh-cn")
			("香港繁體", "zh-hk")
			("澳門繁體", "zh-mo")
			("马来西亚简体", "zh-my")
			("新加坡简体", "zh-sg")
			("臺灣正體", "zh-tw")
			;
			
			// 為了保障OOUI下button所包裹其span的功能，將button與其包裹的span作為整體調整
			var $insertBlock=$this.parent("span");
			// 安排位置
			$('<span />')
			.css({
				 "border"      : "1px dashed grey"
				,"white-space" : "nowrap"
				,"padding"     : "10px"
			})
			.text("以")
			.append($listVariant)
			.insertAfter($insertBlock)
			.append($insertBlock)
			;
			
			// 修改預覽按鈕單擊動作
			$this.click( function(){
				// 被按下時在表單傳送字串加入variant參數
				var listVariantValue=this.$listVariant.find("option:selected").get(0).value;
				
				mw.config.set('wgUserLanguage', listVariantValue);
				var $form=$this.parents("form");
				$form.attr(
					 "action"
					,$form
					 .attr("action")
					 .replace(/\&variant\=[^\&\?\#]*($|\&)/g, "$1")
					 .replace(/\?variant\=[^\&\?\#]*(?:$|\&)/, "?")
					 .replace(/\?/,"?variant="+listVariantValue+"&")
					 .replace(/\&$/, "")
				);
			});
			
		});
	});

// </nowiki>