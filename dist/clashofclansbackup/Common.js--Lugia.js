/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
////////////////////////////QUIZ MADE BY LUGIA///////////////////////////
/////{{Template:Quiz}}/////
//startQuiz()-finds quiz divs, appends form, basic controls, and elements.
//checkQuiz()-Extract answers, questions, and correct answers.
//showQuiz()-Display all questions along with their answers.
//finalQ()-Compare answers, display answers, and remove submit button.
 
/*Instructions:
To use this without adding the 20-6 limitation you can manually insert it by adding the following attributes to a div.
class="_set_": denotes a quiz div.
data-AdminSet: set this to "true" to remove limitations, defaults to null.
data-author: set this to your name, or pseudonym.
data-amount: set this to how many questions you have, defaults to 1, maxes at 20.
data-s(id): set this to your questions, answers and correct answers. Where id is the question number. Maxes at 6 Usage:
data-s1="Question:Answer;^Correct Answer^;Answer;Answer;"
When AdminSet is defined you may have infinite answers, otherwise you may only have 6.
Example:
div class="_set_" data-AdminSet="true" data-author="Mr. Manly Man" data-amount="3" data-s1="Hi?:^Yes^;No;" data-s2="Do you like CoC?:^Yes^;No;" data-s3="How many balls of cheese were there?:1;2;3;4;5;^6^;7;8;9;10;" /div
Include <'s and >'s.*/
 
function checkQuiz(string,amnt,p,admn){
	for(var z=0;z<amnt;z++){
	var ser=null;
	var ques=null;
	var ans=new Array();
	var cor=0;
	var x=[0,0,0];
	for(var k=0; k<string[z].length; k++){
		if(string[z].charAt(k)==":"){
			ques=string[z].toString().substr(0,k);
			x[2]=k+1;
			break;
		}
	}
	for(var k=0;k<string[z].length;k++){
		if(string[z].charAt(k)==";"){
			ans[x[1]]=string[z].toString().substr(x[2],k-x[2]);
			x[2]=k+1;
			x[1]++;
		}
	}
	x[1]=0;
	for(var k=0;k<ans.length;k++){
		for(var u=0;u<ans[k].length;u++){
			if(ans[k].charAt(u)=="^"){
				ans[k]=ans[k].toString().substr(1,ans[k].length-2);
				cor=k;
				x[1]++;
				break;
			}
		}
	}
	if(admn==true) x[1]=1;
	if(x[1]>5) ser="Answers cannot exceed 6";
	showQuiz(z,ques,ans,cor,ser,p);
	}	
}
 
function showQuiz(a,ques,ans,cor,ser,d){
	var p=document.createElement("p");
	if(ser!=null){
		p.innerHTML(ser);
		d.appendChild(p);
	}else{
		var c=d.getElementsByTagName("form");
		if(c.length>1){
			ser="BROKEN D:";
			p.innerHTML(ser);
			d.appendChild(p);
		}else{
			var label=document.createElement("label");
			label.innerHTML="<b>"+ques+"</b>";
			var br=document.createElement("br");
			var inputs;
			p.appendChild(label);
			p.appendChild(br);
			var sl=Math.floor(Math.random()*363636);
			for(var i=0; i<ans.length; i++){
				inputs=document.createElement("input");
				span=document.createElement("span");
				br=document.createElement("br");
				span.setAttribute("name",ques);
				span.innerHTML=ans[i];
				inputs.setAttribute("style","height:16px !important;");
				span.setAttribute("style","top:-3px !important;position:relative;");
				inputs.setAttribute("type","radio");
				inputs.setAttribute("name",ques+"-id-"+sl);
				inputs.setAttribute("value",ans[i]);
				if(i==cor) inputs.setAttribute("data-cor","1");
				p.appendChild(inputs);
				p.appendChild(span);
				p.appendChild(br);
			}
			c[0].appendChild(p);
 
		}
	}
}
 
function startQuiz(){
	var f = document.getElementsByTagName("div");
	var d=new Array();
	for(var g=0;g<f.length;g++){
		var m=f[g].getAttribute("class");
		if(m=="_set_") d.push(f[g]);
	}
	for(var i=0;i<d.length;i++){
		var amnt = parseInt(d[i].getAttribute("data-amount"),10);
		var auth = d[i].getAttribute("data-author");
		var admin=d[i].getAttribute("data-AdminSet");
		if(admin!="true") admin="false";
		if(admin.toLowerCase()=="true"&&mw.config.get("wgRestrictionEdit")=="sysop") admin=true;
		var v=new Array();
		var ssa=21;
		if(admin==true) ssa=amnt+1;
		for(var lk=1;lk<ssa;lk++){
			if(d[i].getAttribute("data-s"+lk)) v.push(d[i].getAttribute("data-s"+lk));
		}
		if(isNaN(amnt)) amnt=1;
		var h2=document.createElement("h2");
		h2.innerHTML="<b>Quiz by "+auth+"</b>";
		d[i].appendChild(h2);
		var form=document.createElement("form");
		form.setAttribute("name","Quiz"+i);
		var subm=document.createElement("input");
		subm.setAttribute("type","button");
		subm.setAttribute("value","Submit Answers");
		subm.setAttribute("class","subm");
		subm.setAttribute("onClick","finalQ("+i+",this.form);");
		d[i].appendChild(form);
		var out=document.createElement("span");
		out.setAttribute("class","out");
		d[i].appendChild(out);
		checkQuiz(v,amnt,d[i],admin);
		var from=d[i].getElementsByTagName("form");
		from=from[0].appendChild(subm);
	}
}
 
function finalQ(id,form){
	var J=new Array();
	var a=0;
	var d=document.getElementsByClassName("_set_");
	d=d[id];
	var out=d.getElementsByClassName("out");
	out=out[0];
	var l=new Array();
	var x=form.getElementsByTagName('*');
	for(var i=0;i<x.length;i++){
		if(x[i].getAttribute("data-cor")=="1") l.push(x[i]);
	}
	for(var b=0;b<l.length;b++){
		if(l[b].checked){
			a++;
			J.push(b);
		}
	}
	var childf=form.childNodes;
	for(var b=0;b<childf.length;b++){
		if(childf[b].className=="subm") form.removeChild(childf[b]);
	}
	var perc=Math.round(100/l.length*a);
	if(out.firstChild) out.removeChild(out.firstChild);
	var outt=document.createTextNode("You scored "+a+" out of "+l.length+"! That's "+perc+"%!");
	out.appendChild(outt);
	var cl=new Array();
	for(var b=0;b<x.length;b++){
		if(x[b].tagName.toLowerCase()=="input"&&x[b].getAttribute("type")=="radio") x[b].disabled=true;
		if(x[b].getAttribute("data-cor")=="1") cl.push(b);
	}
	var Z=form.getElementsByTagName("label");
	for(var z=0;z<Z.length;z++){
		if(J.indexOf(z)!=-1){
			Z[z].style.color="green";
		}else{
			Z[z].style.color="red";
			x[cl[z]+1].style.color="green";
			x[cl[z]+1].style.fontWeight="900";
		}
	}
}
addOnloadHook(startQuiz);
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkVerif(){
	var users=['GorillaMan','Lugia101101','Badw0lf007','Spottra','Dahimi', 'ClashOfClansOfficial', 'MaddenDvinik'];
	var name=location.href;
	name=name.split('/wiki/');
	name=name[name.length-1];
	for(var i=0;i<users.length;i++){
		if('User:'+users[i]==name||'Message_Wall:'+users[i]==name||'User_blog:'+users[i]==name||'Special:Contributions/'+users[i]==name){
			var verif=document.createElement('img');
			verif.setAttribute('src','https://images.wikia.nocookie.net/clashofclans/images/0/07/Verified-Twitter.png');
			verif.setAttribute('class','verify');
			verif.setAttribute('width','25');
			verif.setAttribute('height','25');
			var a=document.createElement('a');
			a.setAttribute('href','/wiki/Verified#'+users[i]);
			a.appendChild(verif);
			var mhi=document.getElementsByClassName('masthead-info')[0];
			mhi=mhi.getElementsByTagName('hgroup')[0];
			mhi.appendChild(a);
			break;
		}
	}
}
addOnloadHook(checkVerif);
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function checkLink(){
	var p=['MySpells','MyAchievements','MyArmy','MyDefensiveBuildings','MyResourceBuildings'];
	var d=location.href.split('/wiki/')[1];
	if(d.substr(0,5)=='User:'&&p.indexOf(d.split('/')[1])!=-1&&d.split('/').length==2){
		var m=document.getElementById('ca-edit');
		if(m.innerHTML.indexOf('Create')!=-1){
			location.replace(location.href.split('/wiki/')[0]+'/wiki/'+p[p.indexOf(d.split('/')[1])]);
		}
	}
}
addOnloadHook(checkLink);
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
var editcount=new Array();
function drawCanvas(){
	var c=document.getElementsByClassName('_congedit__');
	for(var i=0;i<c.length;i++){
		var con=c[i].getContext('2d');
		con.rect(100,50,200,100);
		con.stroke();
		con.moveTo(100,50);
		con.lineTo(120,40);
		con.stroke();
		con.moveTo(120,40);
		con.lineTo(120,50);
		con.stroke();
		con.moveTo(120,40);
		con.lineTo(80,40);
		con.stroke();
		con.moveTo(100,140);
		con.lineTo(80,140);
		con.stroke();
		con.moveTo(80,140);
		con.lineTo(80,40);
		con.stroke();
		con.moveTo(80,130);
		con.lineTo(20,130);
		con.stroke();
		con.moveTo(100,30);
		con.lineTo(20,30);
		con.stroke();
		con.moveTo(100,30);
		con.lineTo(100,40);
		con.stroke();
		con.moveTo(80,40);
		con.lineTo(100,30); 
		con.stroke();
		con.moveTo(20,130);
		con.lineTo(60,80);
		con.stroke();
		con.moveTo(60,80);
		con.lineTo(20,30);
		con.stroke();
		con.moveTo(280,40);
		con.lineTo(300,50);
		con.stroke();
		con.moveTo(280,40);
		con.lineTo(320,40);
		con.stroke();
		con.moveTo(300,140);
		con.lineTo(320,140);
		con.stroke();
		con.moveTo(320,140);
		con.lineTo(320,40);
		con.stroke();
		con.moveTo(280,40);
		con.lineTo(280,50);
		con.stroke();
		con.moveTo(300,30);
		con.lineTo(300,40);
		con.stroke();
		con.moveTo(300,30);
		con.lineTo(320,40);
		con.stroke();
		con.moveTo(380,30);
		con.lineTo(300,30);
		con.stroke();
		con.moveTo(380,130);
		con.lineTo(320,130);
		con.stroke();
		con.moveTo(380,130);
		con.lineTo(340,80);
		con.stroke();
		con.moveTo(380,30);
		con.lineTo(340,80);
		con.stroke();
		con.textAlign='center';
		con.font="22px Arial";
		con.fillText('Congratulations on',c[i].width/2,75);
		con.font="50px Arial";
		con.fillText(editcount[i],c[i].width/2,125);
	}
}
 
function startCong(){
	var d=document.getElementsByClassName('_congredit_');
	for(var i=0;i<d.length;i++){
		var c=parseInt(d[i].getAttribute('data-editcount'));
		if(isNaN(c)) break;
		if(c>999999) break;
		c=c.toString(10);
		if(c.length>3) editcount.push(c.substr(0,c.length-3)+','+c.substr(c.length-3));
		else editcount.push(c);
		var can=document.createElement('canvas');
		can.setAttribute('class','_congedit__');
		can.setAttribute('height','200px');
		can.setAttribute('width','400px');
		can.innerHTML='Your browser does not support the HTML5 Canvas object';
		d[i].appendChild(can);
	}
	drawCanvas();
}
addOnloadHook(startCong);