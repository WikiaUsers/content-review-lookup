switch (mw.config.get('wgPageName')) {
	case 'KTaNE_Wiki:RequestCSS-JS':
		// Create the form!
		box = document.createElement("input");
		box.setAttribute("type","text");
		box.id = "pageinput";
		box.setAttribute("class","mw-inputbox-input mw-ui-input mw-ui-input-inline");
		box.addEventListener('keyup', function() {
			if (document.getElementById("pageinput").value === "") {
				document.getElementById("cssbutton").disabled = true;
			} else {
				document.getElementById("cssbutton").disabled = false;
			}
		});
		
		// prepare CSS button
		cssbutton = document.createElement("input");
		cssbutton.id = "cssbutton";
		cssbutton.setAttribute("type","submit");
		cssbutton.setAttribute("value","View CSS");
		cssbutton.setAttribute("disabled","disabled");
		
		// add event listener and classes
		cssbutton.classList.add("mw-ui-button");
		cssbutton.classList.add("mw-ui-progressive");
		cssbutton.addEventListener('click', function() {
			var value = document.getElementById("pageinput").value;
			window.location.href = "/wiki/MediaWiki:ModuleCSS/" + value + ".css";
		});
		
		// add the elements to document
		document.getElementById("inputbox").appendChild(box);
		document.getElementById("inputbox").appendChild(document.createElement("br"));
		document.getElementById("inputbox").appendChild(cssbutton);
		console.log("Form successfully created");
		break;
	default:
		console.log("Form not created");
}