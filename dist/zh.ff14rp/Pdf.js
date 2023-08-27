mw.hook("wikipage.content").add(function($content) {
	var pdfDivs = document.getElementsByClassName("pdfDiv");//div列表
	new Promise(function(resolve, reject) {//加载PDF.js
		var script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js';//Is it allowed to load external JavaScript code on Fandom?
		script.onload = resolve;
		script.onerror = reject;
		document.body.appendChild(script);
	}).then(function() {
		console.log('PDF.js加载成功');
		for (var i = 0; i < pdfDivs.length; i++) {//处理pdf列表
			var pdfDiv = pdfDivs[i];
			var link = pdfDiv.textContent;
			var scale = pdfDiv.getAttribute('data-scale')||1;
			console.log("PDF.js的scale为:"+scale);
			pdfDiv.textContent = '';
			pdfjsLib.getDocument(link).promise.then(function(pdfDoc) {
				var totalPages = pdfDoc.numPages;
				canvases = [];
				for(var j = 0; j < totalPages; j++) {
					canvases[j] = document.createElement("canvas");
					pdfDiv.appendChild(canvases[j]);
					pdfDoc.getPage(j+1).then(function(page) {
						var index = page._pageIndex;
						var canvasContext = canvases[index].getContext('2d');
						var viewport = page.getViewport({scale: scale});
						console.log("PDF.js正在加载第"+index+"页");
						canvases[index].height = viewport.height;
						canvases[index].width = viewport.width;
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