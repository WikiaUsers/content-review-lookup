function timeStamp_Quiz_js() {
  return "2013.07.14 23:23 (UTC-7)";
}

///////////////////////////////////GorillaMan Quiz/////////////////////////////
/* Check for Answer = A */
 
var AnsA = function() { return parseInt(AnsA,36)-9; }
 
function doAnsA (AnsA) {
   if (AnsA == "A" || AnsA == "a" || AnsA == 1) {
      return "Correct" ;
   } 
   else {
      return "Wrong" ;
   }
}
 
function calcAnsA (index) {
   var AnsA 
= parseInt(document.getElementById("ansA_input_" + index).value);
 
   var result 
= doAnsA(AnsA);
 
   if (result == "Correct")
      document.getElementById("ansA_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsA + "', Got: '" + result + "')";
   else
      document.getElementById("ansA_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsA + "', Got: '" + result + "')";    
 
   return false;
}
 
function createAnsA() {
   var paras 
= document.getElementsByTagName("p");
   var offset 
= 0;
 
   for (var index 
= 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "check-ansA")) {
         var form 
= document.createElement("form");
         var input1 
= document.createElement("input");
         var input2 
= document.createElement("input");
         var span 
= document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcAnsA(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "ansA_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Check Answer");
         input2.setAttribute("onclick", "javascript:calcAnsA(" + offset + ");");
 
         span.setAttribute("id", "ansA_result_" + offset);
         span.innerHTML 
= " =  ???";
 
         form.appendChild(document.createTextNode("Answer: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createAnsA);
 
 
 
/* Check for Answer = B */
 
var AnsB = function() { return parseInt(AnsB,36)-9; }
 
function doAnsB (AnsB) {
   if (AnsB == "B" || AnsB == "b" || AnsB == 2) {
      return "Correct" ;
   } 
   else {
      return "Wrong" ;
   }
}
 
function calcAnsB (index) {
   var AnsB 
= parseInt(document.getElementById("ansB_input_" + index).value);
 
   var result 
= doAnsB(AnsB);
 
   if (result == "Correct")
      document.getElementById("ansB_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsB + "', Got: '" + result + "')";
   else
      document.getElementById("ansB_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsB + "', Got: '" + result + "')";    
 
   return false;
}
 
function createAnsB() {
   var paras 
= document.getElementsByTagName("p");
   var offset 
= 0;
 
   for (var index 
= 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "check-ansB")) {
         var form 
= document.createElement("form");
         var input1 
= document.createElement("input");
         var input2 
= document.createElement("input");
         var span 
= document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcAnsB(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "ansB_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Check Answer");
         input2.setAttribute("onclick", "javascript:calcAnsB(" + offset + ");");
 
         span.setAttribute("id", "ansB_result_" + offset);
         span.innerHTML 
= " =  ???";
 
         form.appendChild(document.createTextNode("Answer: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createAnsB);
 
 
/* Check for Answer = C */
 
var AnsC = function() { return parseInt(AnsC,36)-9; }
 
function doAnsC (AnsC) {
   if (AnsC == "C" || AnsC == "c" || AnsC == 3) {
      return "Correct" ;
   } 
   else {
      return "Wrong" ;
   }
}
 
function calcAnsC (index) {
   var AnsC 
= parseInt(document.getElementById("ansC_input_" + index).value);
 
   var result 
= doAnsC(AnsC);
 
   if (result == "Correct")
      document.getElementById("ansC_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsC + "', Got: '" + result + "')";
   else
      document.getElementById("ansC_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsC + "', Got: '" + result + "')";    
 
   return false;
}
 
function createAnsC() {
   var paras 
= document.getElementsByTagName("p");
   var offset 
= 0;
 
   for (var index 
= 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "check-ansC")) {
         var form 
= document.createElement("form");
         var input1 
= document.createElement("input");
         var input2 
= document.createElement("input");
         var span 
= document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcAnsC(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "ansC_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Check Answer");
         input2.setAttribute("onclick", "javascript:calcAnsC(" + offset + ");");
 
         span.setAttribute("id", "ansC_result_" + offset);
         span.innerHTML 
= " =  ???";
 
         form.appendChild(document.createTextNode("Answer: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createAnsC);
 
 
 
/* Check for Answer = D */
 
var AnsD = function() { return parseInt(AnsD,36)-9; }
 
function doAnsD (AnsD) {
   if (AnsD == "D" || AnsD == "d" || AnsD == 4) {
      return "Correct" ;
   } 
   else {
      return "Wrong" ;
   }
}
 
function calcAnsD (index) {
   var AnsD 
= parseInt(document.getElementById("AnsD_input_" + index).value);
 
   var result 
= doAnsD(AnsD);
 
   if (result == "Correct")
      document.getElementById("ansD_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsD + "', Got: '" + result + "')";
   else
      document.getElementById("ansD_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsD + "', Got: '" + result + "')";    
 
   return false;
}
 
function createAnsD() {
   var paras 
= document.getElementsByTagName("p");
   var offset 
= 0;
 
   for (var index 
= 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "check-ansD")) {
         var form 
= document.createElement("form");
         var input1 
= document.createElement("input");
         var input2 
= document.createElement("input");
         var span 
= document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcAnsD(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "AnsD_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Check Answer");
         input2.setAttribute("onclick", "javascript:calcAnsD(" + offset + ");");
 
         span.setAttribute("id", "ansD_result_" + offset);
         span.innerHTML 
= " =  ???";
 
         form.appendChild(document.createTextNode("Answer: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createAnsD);


////////////////////////////////////Lugia Quiz///////////////////////////////////////
function checkQuiz(a,b,c,d,e,f,g,h,i,j,amnt,p){
	for(var z=0;z<amnt;z++){
	var ser=null;
	var string=[a,b,c,d,e,f,g,h,i,j];
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
	if(x[1]>3) ser="Answers cannot exceed 4";
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
			for(var i=0; i<ans.length; i++){
				inputs=document.createElement("input");
				span=document.createElement("span");
				br=document.createElement("br");
				span.setAttribute("name",ques);
				span.innerHTML=ans[i];
				inputs.setAttribute("style","height:16px !important;");
				span.setAttribute("style","top:-3px !important;position:relative;");
				inputs.setAttribute("type","radio");
				inputs.setAttribute("name",ques);
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
		var v = [d[i].getAttribute("data-s1"),d[i].getAttribute("data-s2"),d[i].getAttribute("data-s3"),d[i].getAttribute("data-s4"),d[i].getAttribute("data-s5"),d[i].getAttribute("data-s6"),d[i].getAttribute("data-s7"),d[i].getAttribute("data-s8"),d[i].getAttribute("data-s9"),d[i].getAttribute("data-s10")];
		if(isNaN(amnt)) return;
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
		checkQuiz(v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],amnt,d[i]);
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
	for(var b=0;b<x.length;b++){
		if(x[b].tagName.toLowerCase()=="input"&&x[b].getAttribute("type")=="radio") x[b].disabled=true;
	}
	var Z=form.getElementsByTagName("label");
	for(var z=0;z<Z.length;z++){
		if(J.indexOf(z)!=-1){
			Z[z].style.color="green";
		}else{
			Z[z].style.color="red";
		}
	}
}
addOnloadHook(startQuiz);