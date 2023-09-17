mw.hook("wikipage.content").add(function($content) {
	function appendDiv(container) {//添加div
		var div = document.createElement('div');
		div.textContent = " ";
		div.style.width = '25px';
		div.style.height = '25px';
		div.style.display = 'inline-block';
		container.appendChild(div);
	}
	function appendInput(container,char) {//添加输入框
		var input = document.createElement('input');
		input.type = 'text';
		input.style.width = '25px';
		input.style.height = '25px';
		if(char) input.placeholder = char;//如果有值添加默认值
		container.appendChild(input);
	}
	var puzzleDivs = document.getElementsByClassName("crosswordPuzzle");//div列表
	for (var i = 0; i < puzzleDivs.length; i++) {
		var puzzleDiv = puzzleDivs[i];//某个具体的,class为crosswordPuzzle的输入框
		var puzzle = puzzleDiv.textContent.trim();
		puzzleDiv.textContent = "";
		var lines = puzzle.split("\n");
		var linediv = null;
		for(var j = 0; j < lines.length; j++) {
			if(temp) appendInput(linediv, temp);//未处理完的聚合字符先处理完
			linediv = document.createElement('div');//创建新的一行
			linediv.style.height = '25px';
			puzzleDiv.append(linediv);
			var string = lines[j];
			var temp = "",flag = false;//flag表示该格子是否为聚合字符,聚合字符使用一对圆括号包裹
			for(var k = 0; k < string.length; k++) {
				var c = string[k];
				if(flag) {//正在处理聚合字符
					if(c == ')') {//聚合字符处理完毕
						flag = false;
						appendInput(linediv, temp);
						temp = "";
					} else {
						temp += c;
					}
				} else {//正在处理单一字符
					if(c == '(') {
						flag = true;
					} else {
						if(c == "o") appendInput(linediv, "");
						else if(c == "x") appendDiv(linediv, "");
						else appendInput(linediv, c);
					}
				}
			}
		}
	}
});