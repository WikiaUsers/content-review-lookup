console.log("2");
if (document.getElementById('test-228') !== undefined) {
	document.getElementById('test-228').onclick = function changeContent() {
		myFunctionX();
	};
}
function myFunctionX() {
  document.getElementById("demo").innerHTML = "Hello World";
}