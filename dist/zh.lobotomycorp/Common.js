
//Abn_Infobox Work_preference 数据形式切换
var workPreferenceButtonCount = 0;

document.getElementById("work_preference_button").addEventListener("click", function(){
	var workPreferenceButton = document.getElementById("work_preference_button");
	var level = document.getElementsByClassName("work_preference_level");
    var stat = document.getElementsByClassName("work_preference_stat");
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