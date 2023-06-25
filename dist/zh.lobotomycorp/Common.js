
//Abn_Infobox Work_preference 数据形式切换
var workPreferenceButtonCount = 0;

document.getElementById("work_preference_button").addEventListener("click", function(){
	let workPreferenceButton = document.getElementById("work_preference_button");
	let level = document.getElementsByClassName("work_preference_level");
    let stat = document.getElementsByClassName("work_preference_stat");
	//初始状态时执行
	if (workPreferenceButtonCount==0){
		workPreferenceButton.innerHTML = "显示文字";
		for (i = 0; i < level.length; i++) {
			level[i].style.display = "none";
		}
		for (i = 0; i < stat.length; i++) {
			stat[i].style.display = "block";
		}
		workPreferenceButtonCount = 1;
	}else{
		workPreferenceButton.innerHTML = "显示数字";
		for (i = 0; i < level.length; i++) {
			level[i].style.display = "block";
		}
		for (i = 0; i < stat.length; i++) {
			stat[i].style.display = "none";
		}
		workPreferenceButtonCount = 0;
	}
});

//SideBar

//翻译切换功能
mw.hook('dev.addSideTool').add(function (addSideTool) {
	let preretrans = document.getElementsByClassName("preretrans")
	let postretrans = document.getElementsByClassName("postretrans")
	let retransButtonCount = 0
	
	const retransButton = addSideTool(icon: retrans | <svg><text>译</text></svg> ),
		$button = retransButton.$button,
		$tooltip = retransButton.$tooltip;

	$tooltip.text('查看修订后的翻译文本');
	$button.on('click', function() {
    	if (retransButtonCount==0){
    		preretrans.style.display = "none";
    		postretrans.style.display = "inline"
    		retransButtonCount = 1;
    	}else{
    		preretrans.style.display = "inline";
    		postretrans.style.display = "none";
    		retransButtonCount = 0;
    	}
  });
});