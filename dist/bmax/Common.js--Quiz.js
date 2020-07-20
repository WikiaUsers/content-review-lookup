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
			}
		}
	}
	if(admn=="true") x[1]=1;
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
alert(inputs.getAttribute("name"));
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
		var v=new Array();
		var ssa=21;
		if(admin=="true") ssa=amnt;
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
			x[cl[z]+1].style.fontWeight="bold";
		}
	}
}
addOnloadHook(startQuiz);