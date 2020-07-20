mw.hook("wikipage.content").add(function($content) {
if (document.getElementById("dropdown") !== null) {
dropdownItems = [{backgroundColor:"gold",color:"black",text:"a"}, {backgroundColor:"gold",color:"black",text:"a Rare"}, {backgroundColor:"gold",color:"black",text:"an Epic"}, {backgroundColor:"gold",color:"black",text:"a Legendary"}, {backgroundColor:"gray",color:"white",text:"a Supreme"}, {backgroundColor:"gray",color:"white",text:"a Moon"}, {backgroundColor:"#FF00FF",color:"#00827f",text:"a Gummy"}, {backgroundColor:"rgb(230, 53, 68)",color:"white",text:"a Festive"}, {backgroundColor:"gray",color:"white",text:"a Debug"}]
dropdownButtons = document.getElementsByClassName("dropdownItem")
buttonShown = 0;    
for (i = 0; i < dropdownItems.length;i++) {
    dropdownButtons[i].addEventListener("click", changeDropdownMessage)
}
function changeDropdownMessage() {
for (i = 0; i < dropdownItems.length;i++) {
    if (dropdownButtons[i] == this) {
        dropdownMessage.style.backgroundColor = dropdownItems[i].backgroundColor
        dropdownMessage.style.color= dropdownItems[i].color
        dropdownHoverText.innerText = dropdownItems[i].text
  }
}
}
dropdownHoverText.addEventListener("mouseover", showDropdown)
dropdown.addEventListener("mouseleave", hideDropDown)
function showDropdown() {
    if (buttonShown == 0) {
    dropdownAnimationId = setInterval(dropdownAnimation, 40)
    }
    dropdownid.style.display = "block"
    dropdownid.style.left = dropdownHoverText.offsetLeft + 10 + "px"
    dropdownid.style.top = dropdownHoverText.offsetTop + 20 + "px"
    dropdownArrow.innerHTML = "&triangledown;"
}
function hideDropDown() {
    for (i = 0;i < dropdownButtons.length;i++) {
        dropdownButtons[i].style.display = "none"
    }
    buttonShown = 0;
    dropdownid.style.display = "none"
    dropdownArrow.innerHTML = "&triangleleft;"
}
function dropdownAnimation() {
    dropdownButtons[buttonShown].style.display = ""
    buttonShown++;
    if (buttonShown >= dropdownButtons.length) {
        clearInterval(dropdownAnimationId)
        buttonShown = 0;
    }
}
}
});