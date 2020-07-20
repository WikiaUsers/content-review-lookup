onmessage = function(data) {
	postMessage("\n\n[:::LITERAL ARGUMENT:::]:\n" + JSON.stringify(data));
	postMessage("\n\n[:::ARGUMENTS:::]:\n" + JSON.stringify(arguments));
}