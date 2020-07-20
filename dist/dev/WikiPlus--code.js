/*
Author: Charles Terry, JCPM Industries.
 
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
If you need a copy of the GNU General Public License write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 
 I, Charles Terry, hereby relinquish ANY AND ALL rights I have
 pertaining to this software.  In locales where I may not relinquish
 my rights, I hereby grant the owner of this file ANY AND ALL rights
 that I may do so under law, without violating the GNU License.
 
If the above licensing violates a "website's" policy (for example a wiki
which requires all uploads to conform to a certain license), then it shall
be rendered null and void.  The "website's" licensing may be used instead.
*/

// Get URL (No need to do work if we're on the wrong site/page)
var shortUrl = document.location.pathname;
    
// If page is Special:WikiActivity
if (shortUrl.indexOf("WikiActivity") !== -1) {

  // Global Object
  var specialPlus; if (specialPlus === undefined) { specialPlus = {}; }

  // Setup Default button values
  specialPlus.showTalk = true;
  specialPlus.showEdit = true;
  
  // Get NavBar ID
  var navBar = document.getElementsByClassName("activity-nav");
  var navBarPart = navBar[0]; 
  
  // Add Toggle Talk Button After NavBar
  var talkButton = document.createElement("input");
  talkButton.type = "button";
  talkButton.id = "talk-button";
  talkButton.value = "Hide Talk";
  navBarPart.appendChild(talkButton);
  talkButton.addEventListener("click", TalkToggle);
  
  // Add Toggle Edit Button After NavBar
  var editButton = document.createElement("input");
  editButton.type = "button";
  editButton.id = "edit-button";
  editButton.value = "Hide Edit";
  navBarPart.appendChild(editButton);
  editButton.addEventListener("click", EditToggle);
    
  // Setup Array of page types
  var talkPages = document.getElementsByClassName("activity-type-talk");
  var editPages = document.getElementsByClassName("activity-type-edit");

}

// OnClick Functions Written in 2 different ways (debugging)
// When Edit Button is clicked
function EditToggle() {
  if (specialPlus.showEdit === true) {
    for (var x = 0; x < editPages.length; x++) {
    editPages[x].style.display="none";
    }
    specialPlus.showEdit = false;
    editButton.value = "Show Edit";
    return;
  } // Else
    for (var y = 0; y < editPages.length; y++) {
    editPages[y].style.display="block";
    }
    specialPlus.showEdit = true;
    editButton.value = "Hide Edit";
    return;
}

// When Talk Button is clicked
function TalkToggle() {
  if (specialPlus.showTalk === true) {
    for (var x = 0; x < talkPages.length; x++) {
    talkPages[x].style.display="none";
    }
    specialPlus.showTalk = false;
    talkButton.value = "Show Talk";
    return;
  } else {
    for (var y = 0; y < talkPages.length; y++) {
    talkPages[y].style.display="block";
    }
    specialPlus.showTalk = true;
    talkButton.value = "Hide Talk";
    return;
  }
}