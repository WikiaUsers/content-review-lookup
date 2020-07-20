

/* Any JavaScript here will be loaded for all users on every page load. */
/************ THE FOLLOWING CODE IS STOLEN DIRECTLY FROM THE CODE THEY USE AT TANASINN.INFO I have a basic idea of what it does, and it is quite helpful, I am not responsible for any profanities, as it is ED. -Fou-Lu */
 
/********************************

 THE FOLLOWING VISIBILITY TOGGLING CODE IS STOLEN DIRECTLY FROM
 THE CODE THEY USE AT ED.

 I have no idea how it exactly works but I think
 it could be work for us.
 however it doesn't degrade cleanly with JS disabled. 

 lol ed
 -IAAPMOTESOD 
 
 */
   
   
   addOnloadHook(createToggleLinks);

   /* Function that toggles ED's collapsing objects.
    * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com)
    * Uses publicly available code in one function, where noted. */

   function toggleCollapse(objToToggle, collapseText, expandText) {

   	var linkText = "";
   	var targetObject = returnObjById(objToToggle);

   	if ( targetObject ) {

   		if ( targetObject.style.display == "none" ) {

   			targetObject.style.display = "block";
   			linkText = collapseText;
   		}

   		else {

   			targetObject.style.display = "none";
   			linkText = expandText;
   		}

   		var toggleLink = document.createElement("a");
   		toggleLink.appendChild(document.createTextNode(linkText));
   		toggleLink.setAttribute("href", "javascript:toggleCollapse('" + objToToggle + "','" + collapseText + "','" + expandText + "')");

   		returnObjById(objToToggle + "Link").innerHTML = "";
   		returnObjById(objToToggle + "Link").appendChild(toggleLink);
   	}
   }

   /* Functions that performs the morph operation.
    * Added 1/11/2008 by WhiteMystery (misterioblanco@gmail.com)
    * Uses publicly available code in one function, where noted. */

   function performMorph(targetID, targetNumber) {

   	var counter = 1;

   	while ( returnObjById(targetID + "Content" + counter) ) {

   		if ( counter == targetNumber )
   			returnObjById(targetID + "Content" + counter).style.display = "block";
   		else
   			returnObjById(targetID + "Content" + counter).style.display = "none";

   		counter++;
   	}

   	returnObjById(targetID + "Master").innerHTML = targetNumber;
   }

   function morphForward(targetID) {

   	var nextPane = parseInt(returnObjById(targetID + "Master").innerHTML) + 1;

   	if ( returnObjById(targetID + "Content" + nextPane) )
   		performMorph(targetID, nextPane);

   	else
   		performMorph(targetID, "1");
   }

   function morphBackward(targetID) {

   	var prevPane = parseInt(returnObjById(targetID + "Master").innerHTML) - 1;

   	if ( prevPane > 0 )
   		performMorph(targetID, prevPane);

   	else {

   		var maxIndex = 1;

   		while ( returnObjById(targetID + "Content" + maxIndex) )
   			maxIndex++;

   		performMorph(targetID, maxIndex - 1);
   	}
   }

   /* Function that creates ED's collapsing objects and toggle links.
    * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com)
    * Uses publicly available code in one function, where noted.
    *
    * Updated: 1/11/2008 by WhiteMystery to add new Morphing Objects
    * functionality. */

   function createToggleLinks() {

   	var spanCollection = document.getElementsByTagName("span");

   	for ( i = 0; i < spanCollection.length; i++ ) {

   		if ( spanCollection[i].className == "toggleLink" ) {

   			var spanID = spanCollection[i].getAttribute("id");
   			var targetID = spanID.substr(0, spanID.length - 4);
   			var collapseText = returnObjById(targetID + "CollapseText").innerHTML;
   			var expandText = returnObjById(targetID + "ExpandText").innerHTML;
   			var initialState = returnObjById(targetID + "InitialState").innerHTML;

   			var toggleLink = document.createElement("a");

   			if ( initialState == "0" ) {

   				returnObjById(targetID).style.display = "none";
   				toggleLink.appendChild(document.createTextNode(expandText));
   			}

   			else {

   				returnObjById(targetID).style.display = "block";
   				toggleLink.appendChild(document.createTextNode(collapseText));
   			}

   			toggleLink.setAttribute("href", "javascript:toggleCollapse('" + targetID + "','" + collapseText + "','" + expandText + "')");

   			spanCollection[i].appendChild(toggleLink);
   		}

   		else if ( spanCollection[i].className == "morphMaster" ) {

   			var spanID = spanCollection[i].getAttribute("id");
   			var targetID = spanID.substr(0, spanID.length - 6);
   			var counter = 1;

   			// Create forward and backward paging if the paging elements exist
   			if ( returnObjById(targetID + "LinkNext") && returnObjById(targetID + "LinkPrev") && returnObjById(targetID + "Content1") ) {

   				// Create the forward link
   				var nextLink = document.createElement("a");	
   				nextLink.appendChild(document.createTextNode(returnObjById(targetID + "LinkNext").innerHTML));
   				nextLink.setAttribute("href", "javascript:morphForward('" + targetID + "')");

   				returnObjById(targetID + "LinkNext").innerHTML = "";
   				returnObjById(targetID + "LinkNext").appendChild(nextLink, 0);

   				// Create the backward link
   				var prevLink = document.createElement("a");	
   				prevLink.appendChild(document.createTextNode(returnObjById(targetID + "LinkPrev").innerHTML));
   				prevLink.setAttribute("href", "javascript:morphBackward('" + targetID + "')");

   				returnObjById(targetID + "LinkPrev").innerHTML = "";
   				returnObjById(targetID + "LinkPrev").appendChild(prevLink, 0);

   				// Initialize content panes
   				while ( returnObjById(targetID + "Content" + counter) ) {

   					if ( counter == 1 )
   						returnObjById(targetID + "Content" + counter).style.display = "block";
   					else
   						returnObjById(targetID + "Content" + counter).style.display = "none";

   					counter++;
   				}	
   			}

   			counter = 1;

   			// Whether or not there is paging, generate normal links				
   			while ( returnObjById(targetID + "Link" + counter) && returnObjById(targetID + "Content" + counter) ) {

   				var morphLink = document.createElement("a");
   				morphLink.appendChild(document.createTextNode(returnObjById(targetID + "Link" + counter).innerHTML));
   				morphLink.setAttribute("href", "javascript:performMorph('" + targetID + "','" + counter + "')");

   				returnObjById(targetID + "Link" + counter).innerHTML = "";
   				returnObjById(targetID + "Link" + counter).appendChild(morphLink, 0);

   				// Initialize content panes
   				if ( counter == 1 )
   					returnObjById(targetID + "Content" + counter).style.display = "block";
   				else
   					returnObjById(targetID + "Content" + counter).style.display = "none";

   				counter++;
   			}

   			spanCollection[i].innerHTML = "1";
   			spanCollection[i].style.display = "none";
   		}
   	}
   }

   /* Function that toggles ED's collapsing objects.
    * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com)
    * Taken from http://www.netlobo.com/javascript_get_element_id.html */

   function returnObjById( id ) {

       if (document.getElementById) 
           var returnVar = document.getElementById(id); 
       else if (document.all) 
           var returnVar = document.all[id]; 
       else if (document.layers) 
           var returnVar = document.layers[id]; 
       return returnVar; 
   }
   
/****************

  END OF THE VISIBILITY TOGGLING CODE FROM ED
  
***/




   /*** 
    This function autohides content of the class 'autohide'.
    Haven't touched js code in ages so I may be doing this
    in a retarded fashion, but whatever. -IAAPMOTESOD
  **/
  
    addOnloadHook(autoHide);  
    function autoHide() {
      var stuffToAutohide = getElementsByClassName(document, "*", "autohide");
     	for (var i = 0; i < stuffToAutohide.length; i++) {
     		stuffToAutohide[i].style.display = 'none';
     	}
    }

/* END OF THE CODE FROM TANASINN.INFO */