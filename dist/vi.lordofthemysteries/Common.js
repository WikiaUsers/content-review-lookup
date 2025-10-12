/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
if (mw.config.get("wgPageName") === "MediaWiki:Common.js") {
  // if the page currently loaded on the wiki is named 'Example Page' this code will be ran
  var inputBox = document.createElement("div"); // create the a div element that will store the input box
  var input = document.createElement("input"); // create a "input" element that will get the input entered
  input.id = "input"; // set the id to the input element to "input"
  input.style.display = "inline-block"; // set the style.display to "inline-block" so it will all be in one line
  var textParagraph = document.createElement("p"); // create a text paragraph
  textParagraph.innerHTML = "times two is: "; // set the default text to the paragraph
  textParagraph.style.display = "inline-block"; // set the style.display to "inline-block" so it will all be in one line
  textParagraph.id = "textParagraph"; // set the id to the textParagraph element to "textParagraph"
  var newLine = document.createElement("br"); // create a br element to start a new line
  var getAnswer = document.createElement("button"); // create the check button
  getAnswer.innerHTML = "Check"; // set the text on the button to "Check"
  getAnswer.addEventListener("click", function() {
    document.getElementById("textParagraph").innerHTML= "times two is: " + document.getElementById("input").value * 2;
  }); // add an event listener to the button that will set the text to the textParagraph element to "times two is: (whatever it is)" when it is clicked
  inputBox.appendChild(textParagraph.appendChild(input)); // add the input element to the input box
  inputBox.appendChild(textParagraph); // add the textParagraph element to the input box
  inputBox.appendChild(newLine); // add the new line element to the input box
  inputBox.appendChild(getAnswer); // add the getAnswer button element to the input box
  document.getElementById("mw-content-text").appendChild(inputBox); // add the input box to the main page content
// }

// if (mw.config.get("wgPageName") === "MediaWiki:Common.js") {
	// Function to check the data-theme attribute
	function getThemeByDataAttribute() {
	  return document.documentElement.getAttribute('data-theme');
	}
	
	// Create a log box at the top of the page
	function createLogBox() {
	  const logBox = document.createElement("div");
	  logBox.id = "customLogBox";
	  logBox.style.position = "fixed";
	  logBox.style.top = "0";
	  logBox.style.left = "0";
	  logBox.style.width = "100%";
	  logBox.style.maxHeight = "150px";
	  logBox.style.overflowY = "auto";
	  logBox.style.backgroundColor = "#f0f0f0";
	  logBox.style.color = "#000";
	  logBox.style.fontSize = "14px";
	  logBox.style.padding = "10px";
	  logBox.style.zIndex = "9999";
	  logBox.style.borderBottom = "1px solid #ccc";
	  document.body.appendChild(logBox);
	
	  // Override console.log to also write to the log box
	  const originalLog = console.log;
	  console.log = function(message) {
	    originalLog(message);
	    const msgDiv = document.createElement("div");
	    msgDiv.textContent = message;
	    logBox.appendChild(msgDiv);
	  };
	}
	
	function getThemeByDataAttribute() {
	  return document.body.getAttribute('data-theme');
	}
	
		// Create a log box at the top of the page
	function createLogBox() {
	  const logBox = document.createElement("div");
	  logBox.id = "customLogBox";
	  logBox.style.position = "fixed";
	  logBox.style.top = "0";
	  logBox.style.left = "0";
	  logBox.style.width = "100%";
	  logBox.style.maxHeight = "150px";
	  logBox.style.overflowY = "auto";
	  logBox.style.backgroundColor = "#f0f0f0";
	  logBox.style.color = "#000";
	  logBox.style.fontSize = "14px";
	  logBox.style.padding = "10px";
	  logBox.style.zIndex = "9999";
	  logBox.style.borderBottom = "1px solid #ccc";
	  document.body.appendChild(logBox);
	
	  // Override console.log to also write to the log box
	  const originalLog = console.log;
	  console.log = function(message) {
	    originalLog(message);
	    const msgDiv = document.createElement("div");
	    msgDiv.textContent = message;
	    logBox.appendChild(msgDiv);
	  };
	}
	
	(function() {
	  createLogBox();
	
	  function checkTheme() {
	    const currentTheme = getThemeByDataAttribute();
	    if (currentTheme === 'dark') {
	      console.log("The page and all resources have loaded in dark mode.");
	    } else {
	      console.log("The page and all resources have loaded in light mode.");
	    }
	  }
	
	  checkTheme();
	  // Note: For handling theme changes after load, you would still need a MutationObserver.
	})();
}

//========================================
// IMPORT 
//========================================
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Dorui.js'
    ]
});

// Custom Tooltip CSS removal
window.tooltips_config = {
	offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
},
window.tooltips_list = [
    {
        classname: 'sequence-tooltip',
        parse: '{' + '{Template:Seq/data|1=<#seq#>}}'
    }, {
        classname: 'pathway-tooltip',
        parse: '{' + '{Template:Pathways/data|1=<#pathway#>}}'
    }, {
        classname: 'ingredient-tooltip',
        parse: '{' + '{Template:Ingr/data|1=<#name#>}}'
    }, {
        classname: 'uniqueness-tooltip',
        parse: '{' + '{Template:Uniqueness/data|1=<#name#>|2=<#description#>}}'
    }
]

javascript
if (mw.config.get('wgPageName') === 'EChartModify') {
    importArticles({
	    type: 'script',
	    articles: [
	        'MediaWiki:EChartModify.js'
	    ]
	});
}

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:EChart.js'
    ]
});