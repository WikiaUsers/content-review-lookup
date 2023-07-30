!(function(window, $) {
	var occans = document.getElementsByClassName("occan");
	console.log(1);
	for (var i = 0; i < occans.length; i++) {
		console.log(2+"~"+i);
		var jsonObject = JSON.parse(occans[i].textContent);
		console.log(jsonObject);
		//绘制图片前置工作
		var canvas = document.createElement("canvas");
		canvas.width="1000";
		canvas.height="800";
		var ctx = canvas.getContext("2d");//创建CanvasRenderingContext2D
		//绘制图片
		ctx.lineWidth = 10;
		ctx.strokeRect(75, 140, 150, 110);
		ctx.fillRect(130, 190, 40, 60);
		ctx.beginPath();
		ctx.moveTo(50, 140);
		ctx.lineTo(150, 60);
		ctx.lineTo(250, 140);
		ctx.closePath();
		ctx.stroke();
		//展示图片
		occans[i].style.backgroundImage = 'url("'+canvas.toDataURL("image/png")+'")'
	}
})(window, jQuery);