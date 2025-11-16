mw.loader.using(['mediawiki.api','mediawiki.ForeignApi','jquery.makeCollapsible']).then(function() {
	if (mw.config.get("wgNamespaceNumber") == -1 && mw.config.get("wgTitle") == "FontManager" && (mw.config.get("wgUserGroups").indexOf("sysop") != -1 || mw.config.get("wgUserGroups").indexOf("wiki_guardian") != -1)) {
		a = (mw.config.get("wgServerName") == "help.gamepedia.com")?new mw.Api():new mw.ForeignApi("//help.gamepedia.com/api.php");
		a.get({action:"query",titles:"MediaWiki:Gadget-fontmanager-data.json",prop:"revisions",rvlimit:1,rvprop:"content"}).done(function(data) {
			fonts = JSON.parse(data.query.pages[4795].revisions[0]["*"]);
		  	attribs = [];
		  	fonts.sort(function(a,b) { 
		  		return (a.name < b.name)?-1:(a.name > b.name)?1:(a.format == "woff")?-1:(b.format == "woff")?1:0;
		  	});
		  	$("#mw-content-text").prepend('<div id="sortedFonts"></div>');
			for (f in fonts){
				font = fonts[f];
				$f = $("#"+font.id);
				if (font.duplicates != undefined) {
					$f.attr("data-duplicates",1);
					$f.hide();
					continue;
				}
				$f.attr("data-font_format",font.format);
				$f.children("div.font_name").text(font.name).attr("style","font-family:'"+font.name+"'; font-size:20px;").attr("title",font.name);
				$f.find("div.font_css:first pre").text("@font-face {\n\tfont-family: '"+font.name+"';\n\tsrc: local('"+font.name+"'), url('"+$f.children("div.font_path").text()+"') format('"+font.format+"');\n}");
				$f.children("style").html($f.find("div.font_css:first pre").text());
				$f.children("div.font_path").after('<a href="javascript:;" class="toggleInstructions">Implementation instructions</a>');
				$f.children("div.font_preview").attr("style","font-family:'"+font.name+"'");
				$f.find("div.font_css:last pre").text("font-family: '"+font.name+"';");
				for (a in font.attribs) {
					attrib = font.attribs[a];
					if (attribs.indexOf(attrib) == -1) attribs.push(attrib);
					$f.attr("data-attribs-"+attrib,1);
				}
				$f.prepend('<div style="float:right;"><a href="#'+font.id+'">#</a></div>');
				$f.children(".font_path").html('<a href="'+$f.children(".font_path").text()+'">'+$f.children(".font_path").text()+'</a>');
				if (font.main != undefined) {
					$m = $("#"+font.main);
					$f.attr("data-font_child",1).attr("id","mw-customcollapsible-"+font.id.substr(5)).addClass("mw-collapsible mw-collapsed");
					if ($m.find("div.hiddenFamily").length==0) {
						$m.append('<div class="hiddenFamily">Related fonts:<br /><ul class="hlist"></ul></div>');
						$m.children('.hiddenFamily').wrapAll('<div class="mw-collapsible-content"></div>');
					}
					$m.find("div.hiddenFamily ul").append('<li><a href="javascript:;" data-family_member_reveal="'+font.id.substr(5)+'" class="revealFamily mw-customtoggle-'+font.id.substr(5)+'">'+font.name+'</a></li>');
					$f.detach().appendTo("#"+font.main);
				}
				else {
					$f.addClass("mw-collapsible mw-collapsed");
					$f.children('.font_preview,.font_path,.font_css,.font_controls,.toggleInstructions').wrapAll('<div class="mw-collapsible-content"></div>');
					$f.detach().appendTo("#sortedFonts");
				}
			}
			$("div.font_css").hide();
			$("a.toggleInstructions").click(function() {
				$(this).parent().children("div.font_css").toggle("slow");
			});
			$("a.revealFamily").click(function () {
				$("#mw-customcollapsible-"+$(this).attr("data-family_member_reveal")).toggle("slow");
			});
			attribs.sort();
			$(".font_preview").css("font-size","32px");
			$("#mw-content-text").prepend('<fieldset id="fm-options"></fieldset>');
			$("#fm-options").append("<legend>FontManager options</legend>");
			$("#fm-options").append('<label>Change display text to: <input type="text" id="fm-text" size="60" value="The Quick <b>Brown Fox</b> Jumps Over The <i>Lazy Dog</i>" /></label>');
			$("#fm-text").keyup(function() {$(".font_preview").html($("#fm-text").val());});
			$("#fm-options").append('<br /><label>Change font size to: <select id="fm-size"><option>8px</option><option>14px</option><option>20px</option><option selected="">32px</option><option>48px</option><option>60px</option></select>');
			$("#fm-size").change(function() {
				$(".font_preview").css("font-size",$("#fm-size option:selected").text());
			});
			$("#fm-options").append('<br />Formats: <label><input type="checkbox" id="fm-truetype" checked="">TrueType</label> &nbsp;<label><input type="checkbox" id="fm-opentype" checked="">OpenType</label> &nbsp;<label><input type="checkbox" id="fm-woff" checked="">WOFF</label> &nbsp;<label><input type="checkbox" id="fm-svg" checked="">SVG</label> &nbsp;<label><input type="checkbox" id="fm-eot" checked="">EOT</label>');
			$("#fm-truetype, #fm-opentype, #fm-woff, #fm-eot, #fm-svg").change(function () { 
				if ($(this).prop("checked")) {
					$("div.font_block").filter('[data-font_format="'+$(this).attr("id").replace("fm-","")+'"]').not('[data-duplicates="1"]').not('[data-font_child="1"]').show();
				}
				else {
					$("div.font_block").filter('[data-font_format="'+$(this).attr("id").replace("fm-","")+'"]').hide();
				}
			});
			$("#fm-options").append('<br />Only show those with attributes: ');
			$("#fm-options").append('<div style="column-count:4; width:550px;" id="fm-attribs"></div>');
			for (a in attribs) {
				$("#fm-attribs").append('<p><label><input type="checkbox" value="'+attribs[a]+'" class="fm-attrib">&nbsp;'+attribs[a]+'</label>&nbsp;</p>');
			}
			$(".fm-attrib").change(function() {
				if ($(".fm-attrib:checked").length == 0) {
					$("div.font_block").hide();
					$("div.font_block").not('[data-duplicates="1"]').not('[data-font_child="1"]').show();
					return;
				}
				ids = [];
				$("div.font_block").each(function() {ids.push({id:$(this).attr("id"),show:-1});});
				$("div.font_block").hide();
				$(".fm-attrib").each(function() {
					if ($(this).prop("checked")) {
						v = $(this).val();
						for (i in ids) {
							if (ids[i].show==0) continue;
							if ($("#"+ids[i].id).attr("data-attribs-"+v)!=undefined) ids[i].show = 1;
							else ids[i].show = 0;
						}
						
					}
				});
				for (i in ids) {
					if (ids[i].show==1) {
						if ($("#"+ids[i].id).attr("data-font_child")!=undefined) {
							$("#"+ids[i].id).parent().show();
							$("#"+ids[i].id).show();
						}
						else $("#"+ids[i].id).not('[data-duplicates="1"]').not('[data-font_child="1"]').show();
					}
				}
			});
			$("#sortedFonts .mw-collapsible").makeCollapsible();
		});
	}
});