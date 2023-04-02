/* Any JavaScript here will be loaded for all users on every page load. */
/*quit when clicked*/
document.getElementById("quitable").onclick = function() {
document.getElementById("quitable").innerHTML = "";
}
function factorize() {
var x=document.factorizer.factorizationTextbox.value;
document.getElementById("factorizationResult").innerHTML = "1";
var index;
for (index = 2; index <= Math.sqrt(x); index++) {
if (x % index == 0) {
document.getElementById("factorizationResult").innerHTML += ", " + index;
}
for (index = 1; index < Math.sqrt(x); index++) {
if (x % index == 0) {
document.getElementById("factorizationResult").innerHTML += ", " + (x/index);
}
}
}
function find(theNumber) {
				var sum=0;
				parseInt(theNumber);
				while(theNumber>0) {
					sum=sum- -((theNumber%10)*(theNumber%10));
					theNumber=Math.floor(theNumber/10);
				}
				return sum;
			}
			function harsh (theNumber) {
				var x = theNumber;
				var y = find(theNumber);
				var result = "Not Happy";
				while(y != 1 && y != 4){
					y=find(y);
				}
				if(y==1) return "Happy";
				if(y==4) return "Unhappy";
				return result
			}

// MathJax is disabled in the Special and MediaWiki namespaces
var enableMathJax = (wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki");
 
addOnloadHook(function () {
    if (enableMathJax) {
        importScriptURI("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML");
    }
});