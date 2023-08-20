mw.hook("wikipage.content").add(function($content) {
	//定义函数
	function loopWait(i,count) {//i表示occan的序号,count表示已经执行的次数
		console.log("occan:"+i+":size,ready,count", occansImgs[i].size, occansImgs[i].ready, count);
		if (occansImgs[i].size == occansImgs[i].ready || count > 40) {//最多等待40*250ms=10s
			draw(i);
		} else {
			setTimeout(function() {
				loopWait(i,++count);
			}, 250);
		}
	}
	function draw(i) {//正式为第i个occan绘画
		console.log("occan:"+i+"开始绘制", occanjsonObject[i]);
		//前置工作
		var canvas = document.createElement("canvas");
		canvas.width = occanjsonObject[i].width || "1280";
		canvas.height = occanjsonObject[i].height || "720";
		var ctx = canvas.getContext("2d");//创建CanvasRenderingContext2D
		//开始绘制图像
		var jsonObject = occanjsonObject[i];
		var data = jsonObject.data;
		for (var key in data) {
			var arrayI = data[key];
			for (var method in arrayI) {//method:方法名
				var pars = arrayI[method];//pars:参数
				if (typeof ctx[method] === 'function') {
					if (method == "drawImage") {//drawImage需要特殊处理第一个参数
						if(!occansImgs[i][pars[0]]) continue;
						pars[0] = occansImgs[i][pars[0]];
					}
					ctx[method].apply(ctx, pars);
				}  else if (method == "SET") {//设置参数需要特殊处理
					ctx[pars[0]] = pars[1];
				} else{
					console.log("occan:"+i+","+method+"方法不存在");
				}
			}
		}
		var imgNode = null;
		if (jsonObject.imgNode) {
			imgNode = document.querySelector(jsonObject.imgNode);
		}
		if (imgNode) {
			imgNode.style.backgroundImage = 'url("'+canvas.toDataURL("image/png")+'")';
		} else {
			occans[i].style.backgroundImage = 'url("'+canvas.toDataURL("image/png")+'")';
		}
	}
	var occans = document.getElementsByClassName("occan");//div列表
	if (occans.length==0) return;
	var occansImgs = [];//各occan的图片集合
	var occanjsonObject = [];//各occan的Json集合
	//处理occan
	for (var i = 0; i < occans.length; i++) {
		occansImgs[i] = [];
		occansImgs[i].size = 0;//这个occan使用的图片张数
		occansImgs[i].ready = 0;//这个occan已就绪图片张数
		var can = occans[i];
		var jsonObject = JSON.parse(can.textContent);
		occanjsonObject[i] = jsonObject;
		can.innerHTML = '';
		//处理该occan的图片
		var data = jsonObject.data;
		for (var key in data) {
			var arrayI = data[key];
			for (var method in arrayI) {//method:方法名
				if(method != "drawImage") continue;
				var imgName = arrayI[method][0];
				if(occansImgs[i][imgName]) {
					console.log("occan:"+i+"的"+imgName+"已处理,跳过");
					continue;//若已经处理过这张图片则跳过
				}
				var img = document.querySelector('img[data-image-name="'+imgName+'"]');
				if (!img) {
					console.log("occan:"+i+"找不到图片"+imgName);
					continue;//若查找不到该图片,不处理
				}
				occansImgs[i].size++;
				var newImg = new Image();
				newImg.crossOrigin = "anonymous";
				newImg.src = img.src + "&vv=" + Math.random();
				occansImgs[i][imgName] = newImg;
				newImg.ocindex = i;
				newImg.onload = function() {
					occansImgs[this.ocindex].ready++;
					console.log("occan:"+this.ocindex+"一张图片加载完毕",this);
				};
			}
		}
		loopWait(i, 0);//等待第i个occan的图片加载完成
	}
});