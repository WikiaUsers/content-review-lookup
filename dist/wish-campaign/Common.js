$(document).ready(function() {
	//grabs the entire div containing the spoiler alert   
	var divSpoilerAlert = document.getElementById('SpoilerAlert');   
	if (typeof(divSpoilerAlert) != 'undefined' && divSpoilerAlert != null){
		//we only run this script if there is a spoiler to be hidden      
		
		//add a button to allow someone to unhide the text      
		originalHTML = divSpoilerAlert.innerHTML;       
		originalHTML = "<button id='spoiler_button' name='spoiler_button' type='button'> Toggle Spoilers</button>" + originalHTML;
		
		//now grap all paragraphs under that div      
		var listOfP = divSpoilerAlert.getElementsByTagName("p");
		         
		//now make sure none of those paragraphs display text by giving the display:none style      
		for (i = 0; i < listOfP.length; i++){
			listOfP[i].style.display = "none";              
		}
	} 
	var button = document.getElementById('spoiler_button');
	if (typeof(button) != 'undefined' && button != null){      
		button.onclick = function(){         
			var divSpoilerAlert = document.getElementById('SpoilerAlert');         
			var listOfP = divSpoilerAlert.getElementsByTagName("p");         
			for (i = 0; i < listOfP.length; i++){              
				if (listOfP[i].style.display === "none"){              
					listOfP[i].style.display = "block";              
				}              
				else{                  
					listOfP[i].style.display = "none";              
				}                                  
			}      
		};  
	}
});