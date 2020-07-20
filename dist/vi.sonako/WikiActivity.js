// If page is Special:WikiActivity
if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'WikiActivity') {
 
  // Global Object
  var specialPlus; if (specialPlus === undefined) { specialPlus = {}; }
 
  // Setup Default button values
  specialPlus.showTalk = true;
  specialPlus.showEdit = true;
 
  // Get NavBar ID
  var navBar = document.getElementsByClassName("WikiaMainContentContainer");
  var navBarPart = navBar[0]; 
 
  // Add Toggle Talk Button After NavBar
  var talkButton = document.createElement("input");
  talkButton.type = "button";
  talkButton.id = "talk-button";
  talkButton.value = "Ẩn Bình Luận";
  navBarPart.insertBefore(talkButton, navBarPart.firstChild);
  talkButton.addEventListener("click", TalkToggle);

  // Add Toggle Edit Button After NavBar
  var editButton = document.createElement("input");
  editButton.type = "button";
  editButton.id = "edit-button";
  editButton.value = "Ẩn Chỉnh Sửa";
  navBarPart.insertBefore(editButton, navBarPart.firstChild);
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
    editButton.value = "Xem Chỉnh Sửa";
    return;
  } // Else
    for (var y = 0; y < editPages.length; y++) {
    editPages[y].style.display="block";
    }
    specialPlus.showEdit = true;
    editButton.value = "Ẩn Chỉnh Sửa";
    return;
}
 
// When Talk Button is clicked
function TalkToggle() {
  if (specialPlus.showTalk === true) {
    for (var x = 0; x < talkPages.length; x++) {
    talkPages[x].style.display="none";
    }
    specialPlus.showTalk = false;
    talkButton.value = "Xem Bình Luận";
    return;
  } else {
    for (var y = 0; y < talkPages.length; y++) {
    talkPages[y].style.display="block";
    }
    specialPlus.showTalk = true;
    talkButton.value = "Ẩn Bình Luận";
    return;
  }
}