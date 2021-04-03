var cdimg="<div style='background:url(http://images.wikia.com/pad/zh/images/8/84/Digits.png) no-repeat;width:49px;height:76px;overflow:hidden;display:inline-block;border-radius:5px;padding:0 2px 0 2px'></div>";
function init_cd(){
	$(".countdown").each(function(){
		var d=new Date(new Date($(this).text()));
		var diff=Math.floor((d.getTime()-new Date().getTime())/1000);
		if (diff/3600 >= 100) return;
		if (diff<0) diff=0;
		$(this).attr("cd", diff);
		$(this).html(cdimg+cdimg+"&nbsp;&nbsp;"+cdimg+cdimg+"&nbsp;&nbsp;"+cdimg+cdimg);
		diff=hhmmss(diff);
		for (var i=0; i<6; i++){
			setCDFrame($(this).children()[i], parseInt(diff.substr(i,1))*77*6);
		}
		$(this).show();
	})
	if ($(".countdown").length){
		cd=setInterval(countdown, 1000);
	}
}
function countdown(){
	$(".countdown").each(function(){
		$(this).show();
		var diff=parseInt($(this).attr("cd"),10);
		if (diff==0) return;
		diff-=1;
		$(this).attr("cd",diff);
		diff=hhmmss(diff);
		var d=6, a=[9,9,5,9,5,9];
		do{
			d--;
			CDStep($(this).children()[d], a[d]);
		}while(d>0 && diff.substr(d,1)==a[d]);
	})
}
function CDStep(obj, max){
	var c=parseInt($(obj).css("background-position").split(" ")[1]);
	if (max!=9 && c==-1) c+=77*6; else c+=77;
	if (c>0) c-=77*6*(max+1);
	$(obj).css("background-position", "-2px "+c+"px");
	if (c%(77*6)!=-1) setTimeout(function(){CDStep(obj, max)}, 60);
}
function setCDFrame(obj, n){
	$(obj).css("background-position", "-2px -"+(n+1)+"px");
}
function hhmmss(n){
	var s=padZero(n%60), m=padZero(Math.floor(n%3600/60)), h=padZero(Math.floor(n/3600));
	return h+m+s;
}
function padZero(n){
	if (n<10) return "0"+n; else return String(n);
}
init_cd();