/* Any JavaScript here will be loaded for all users on every page load. */

importScript('MediaWiki:' + wgPageName + '.js');
importStylesheet('MediaWiki:' + wgPageName + '.css');
if (wgPageName.indexOf('User:')==0 && wgPageName.indexOf('/')==-1) {
   importStylesheet(wgPageName + '/Profile.css'); //users can edit the CSS of their own profiles
}

if (wgPageName.indexOf('User:CommanderMark')==0 && wgPageName.indexOf('/')==-1) {
   document.getElementsByClassName('grouptags')[0].innerHTML += "<li>True Jorge</li>";
}

if (wgPageName.indexOf('User:Regalis11')==0 && wgPageName.indexOf('/')==-1) {
   document.getElementsByClassName('grouptags')[0].innerHTML += "<li>Barotrauma Dev</li>";
}

//code for collapsing long comments on profiles
function toggleCommentCollapse(elem) {
   var str = elem.childNodes[elem.childNodes.length-1].innerHTML;
   if (elem.getAttribute("data-collapsed") == "true") {
      elem.setAttribute("data-collapsed", "false");
      elem.style.height = (parseInt(elem.getAttribute("data-origheight"))+40)+"px";
      elem.childNodes[elem.childNodes.length-1].innerHTML = str.replace("Show full comment", "Collapse comment");
   } else {
      elem.setAttribute("data-collapsed", "true");
      elem.style.height = '100px';
      elem.childNodes[elem.childNodes.length-1].innerHTML = str.replace("Collapse comment", "Show full comment");
   }
}

var elems = document.getElementsByClassName("commentbody");
for(var i=0; i<elems.length; i++) {
   if (elems[i].clientHeight>150) {
      elems[i].setAttribute("data-collapsed", "true");
      elems[i].setAttribute("data-origheight", elems[i].clientHeight);
      elems[i].style.height = '100px';
      elems[i].style.overflow = 'hidden';
      elems[i].style.position = 'relative';
      elems[i].onclick = function(){toggleCommentCollapse(this);};

      var text = document.createElement("div");
      text.style.width = '100%';
      text.style.backgroundColor = '#222222';
      text.style.color = '#999999';
      text.style.textAlign = 'center';
      text.style.position = 'absolute';
      text.style.left = '0';
      text.style.bottom = '0';
      text.style.margin = '0';
      text.style.verticalAlign = 'middle';
      text.innerHTML = "Show full comment";
      elems[i].appendChild(text);
      text.innerHTML = "<span style=\"position:relative;left:0;top:"+(13-(text.clientHeight/2))+"px;\">Show full comment</span>";
      text.style.height = '25px';
   }
}

var editButtons = document.getElementsByClassName("editButtons");
var newButton;
for(var i=0; i<editButtons.length; i++) {
   newButton = document.createElement("input");
   newButton.id = "wpFindNestingIssues";
   newButton.name = "wpFindNestingsIssues";
   newButton.type = "button";
   newButton.value = "Find nesting issues";
   newButton.onclick = function(){findNestingIssues()};
   var interSpan = document.createElement("span");
   interSpan.innerHTML = "&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;";
   editButtons[i].appendChild(interSpan);
   editButtons[i].appendChild(newButton);
}

function findNestingIssues() {
   var textbox = document.getElementById("wpTextbox1");
   var nestList = [];
   var lineList = [];
   var tagToParse = "";
   var shouldClose = false;
   var skipToCloseTag = false;
   var errorStr = "";
   var tempErrorStr = "";
   var lineNum = 1;
   for (var i=0;i<textbox.value.length;i++) {
      if (textbox.value.charAt(i)=="\n") {
          lineNum++;
      }
      if (tagToParse=="") {
         if (textbox.value.charAt(i)=="<") {
            tagToParse = "<";
         } else if (textbox.value.charAt(i)=="{") {
            nestList.push("{"); lineList.push(lineNum);
         } else if (textbox.value.charAt(i)=="}") {
            shouldClose = false;
            var properClose = false;
            tempErrorStr = "{ closed without an opening tag."
            for (var j=nestList.length-1;j>=0;j--) {
               if (nestList[j].toLowerCase()=="{") {
                  if (j==nestList.length-1) {
                     properClose = true;
                  } else {
                     properClose = false;
                     tempErrorStr = "{ closed before child(ren) ";
                     for (var k=j+1;k<nestList.length;k++) {
                        if (k<nestList.length-1) {
                           tempErrorStr+=nestList[k].toLowerCase()+", ";
                        } else {
                           tempErrorStr+=nestList[k].toLowerCase()+".";
                        }
                     }
                  }
                  nestList.splice(j,1); lineList.splice(j,1);
                  break;
               }
            }
            if (!properClose) {
               errorStr+="("+lineNum+") "+tempErrorStr+"\n";
            }
         }
      } else if (tagToParse.charAt(0)=="<" && tagToParse.indexOf(">")==-1) {
         if (tagToParse=="<" && textbox.value.charAt(i)=="/") {
            shouldClose = true;
            skipToCloseTag = false;
         } else if (textbox.value.charAt(i)=="/") {
            tagToParse="";
            skipToCloseTag = false;
         } else if (textbox.value.charAt(i)==" " || textbox.value.charAt(i)=="\n") {
            skipToCloseTag = true;
         } else if (textbox.value.charAt(i)==">") {
            if (shouldClose) {
               tagToParse = tagToParse.replace(" ","");
               shouldClose = false;
               var properClose = false;
               tagToParse += ">";
               tempErrorStr = tagToParse+" closed without an opening tag."
               for (var j=nestList.length-1;j>=0;j--) {
                  if (nestList[j].toLowerCase()==tagToParse.toLowerCase()) {
                     if (j==nestList.length-1) {
                        properClose = true;
                     } else {
                        properClose = false;
                        tempErrorStr = nestList[j].toLowerCase()+" closed before child(ren) ";
                        for (var k=j+1;k<nestList.length;k++) {
                           if (k<nestList.length-1) {
                              tempErrorStr+=nestList[k].toLowerCase()+", ";
                           } else {
                              tempErrorStr+=nestList[k].toLowerCase()+".";
                           }
                        }
                     }
                     nestList.splice(j,1); lineList.splice(j,1);
                     break;
                  }
               }
               if (!properClose) {
                  errorStr+="("+lineNum+") "+tempErrorStr+"\n";
               }
            } else {
               tagToParse += ">";
               if (tagToParse.toLowerCase()!="<br>") { //special case: skip br
                   nestList.push(tagToParse); lineList.push(lineNum);
               }
            }
            tagToParse = "";
            skipToCloseTag = false;
         } else if (!skipToCloseTag) {
            tagToParse += textbox.value.charAt(i);
         }
      }
   }
   if (nestList.length>0) {
      for (var i=0;i<nestList.length;i++) {
         errorStr+="Unclosed tag: "+nestList[i]+" (opened on line "+lineList[i]+")\n";
      }
   }
   if (errorStr!="") {
      alert("You may have dun goofed at:\n"+errorStr+"\nIf you're editing a JS or CSS file then why did you click on that button?");
   } else {
      alert("No nesting problems were found.");
   }
}

//Hiding overlay on Youtube videos.
document.getElementsByClassName("ytp-chrome-top").innerHTML == '';