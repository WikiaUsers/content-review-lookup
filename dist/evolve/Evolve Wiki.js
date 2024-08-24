<script>

// HTML to JavaScript converter
// By John Krutsch (http://asp.xcentrixlc.com/john)
// Moderator of the JavaScript Kit Help Forum: http://freewarejava.com/cgi-bin/Ultimate.cgi

function scriptIt(val){
val.value=val.value.replace(/"/gi,"&#34;")
val.value=val.value.replace(/'/gi,"&#39;")
valArr=escape(val.value).split("%0D%0A")
val.value=""
for (i=0; i<valArr.length; i++){
val.value+= (i==0) ? "<script>\ninfo=" : ""
val.value+= "\"" + unescape(valArr[i])
val.value+= (i!=valArr.length-1) ? "\" + \n" : "\"\n" 
}
val.value+="\ndocument.write(info)\n<\/script>"
}

function ctrlA(el) {
with(el){
focus(); select() 
}
if(document.all){
txt=el.createTextRange()
txt.execCommand("Copy") 
window.status='Selected and copied to clipboard!'
}
else window.status='Press ctrl-c to copy the text to the clipboard'
setTimeout("window.status=''",3000)
} 

</script>
<center>
<form name="f">
<input type="button" value="HTML -> JavaScript" onclick="scriptIt(document.f.t)" />
<input type="reset" value="Reset">
<input type="button" value="Select All" onclick="ctrlA(document.f.t)" />
<br />
<textarea name="t" cols="75"
rows="20"></textarea>
<br />
</form>
</center>