mw.hook("wikipage.content").add(function($content) {
	var pdfDivs = document.getElementsByClassName("pdfDiv");//div列表
	if(!pdfDivs.length) return;//无pdf则不执行
	var pageWidth = document.getElementById("content").offsetWidth-1;//页面宽度(减一是为了处理宽度为小数的情况)
	new Promise(function(resolve, reject) {//加载PDF.js
		var script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js';
		script.onload = resolve;
		script.onerror = reject;
		document.body.appendChild(script);
	}).then(function() {
		console.log('PDF.js加载成功，wiki页面宽度为'+pageWidth);
		for (var i = 0; i < pdfDivs.length; i++) {//处理pdf列表
			var pdfDiv = pdfDivs[i];
			var link = 'https://ff14rp.fandom.com/zh/wiki/Special:Filepath/' + pdfDiv.textContent;
			var scale = pdfDiv.getAttribute('data-scale');
			var size = pdfDiv.getAttribute('data-size');
			pdfDiv.textContent = '';
			pdfjsLib.getDocument(link).promise.then(function(pdfDoc) {
				var totalPages = pdfDoc.numPages;
				canvases = [];
				for(var j = 0; j < totalPages; j++) {
					canvases[j] = document.createElement("canvas");
					pdfDiv.appendChild(canvases[j]);
					pdfDoc.getPage(j+1).then(function(page) {
						var index = page._pageIndex;
						console.log("PDF.js正在加载第"+index+"页");
						var canvasContext = canvases[index].getContext('2d');
						var viewport = page.getViewport({scale: 1});
						scale = scale || 1;
						if(size) {//按文件大小缩放
							canvases[index].width = viewport.width * size;
							canvases[index].height = viewport.height * size;
							viewport = page.getViewport({scale: size});
						} else {//按页面大小缩放
							canvases[index].width = pageWidth * scale;
							canvases[index].height = pageWidth / viewport.width * viewport.height * scale;
							viewport = page.getViewport({scale: pageWidth / viewport.width * scale});
							
						}
						page.render({
							canvasContext: canvasContext,
							viewport: viewport
						});
					});
				}
			});
		}
	}).catch(function(error) {
		console.error('PDF.js加载失败:', error);
	});
});