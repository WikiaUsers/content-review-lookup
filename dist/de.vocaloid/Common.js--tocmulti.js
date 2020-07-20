/* Any JavaScript here will be loaded for all users on every page load. */
 
// User:Foodbandlt http://mlp.wikia.com
// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
$(document).ready(function(){
  if ($(".toc-multicol #toc").size() != 0) {
    $(function(){
		var x, tdToAppend, listToAppend, showtext = 'Anzeigen', hidetext = 'Verbergen';
		$("#toc").css("width","100%");
		$("#toc ul").html("<table><tr><td>" + $("#toc ul").html() + "</td></tr></table>");
		var liList = $("#toc ul li").toArray();
 
		$('table#toc ul').remove();
		if (liList.length % 3 == 0) {
			x = 0;
		}else{
			x = 3 - (liList.length % 3);
		}
		var perCol = (liList.length + x) / 3;
 
		for (var colNum=0; colNum < 3; colNum++){
			listToAppend = "";
			for (var i=0+(colNum*perCol); i<(perCol*(colNum+1)); i++){
				if (typeof(liList[i]) == "undefined"){break;}
				tempElement = document.createElement("div");
				tempElement.appendChild(liList[i]);
				listToAppend += tempElement.innerHTML;
			}
			tdToAppend += '<td style="vertical-align: top; width: 33%;"><ul><table><tbody><tr><td><table><tbody><tr><td><table><tbody><tr><td>'+listToAppend+'</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></ul></td>';
		}
 
		$('#toc tbody').append('<tr>'+tdToAppend+'</tr>');
		$('#toc tbody tr:eq(0) td').attr("colspan", "3");
		var indentFactor = 10;
		$("head").append("<style>.toclevel-1{padding-left: "+(indentFactor*1)+"px !important}.toclevel-2{padding-left: "+(indentFactor*2)+"px !important}.toclevel-3{padding-left: "+(indentFactor*3)+"px !important}.toclevel-4{padding-left: "+(indentFactor*4)+"px !important}</style>");
		$("#togglelink").off("click").click(function(e){e.preventDefault(); $('#toc ul').slideToggle("fast");
			if ($(this).text() === showtext) { $(this).text(hidetext); } else { $(this).text(showtext); } });
		if (!$('#toc ul').is(':hidden') && $('#togglelink').text() === showtext) {
			$('#togglelink').text(hidetext);
		}
    });
  }
});