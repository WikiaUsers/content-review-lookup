/* 此处的JavaScript将加载于所有用户每一个页面。 */

// Switch button
 
function createSwitchButton(id) {
  var text = document.getElementById('button' + id);
  if (text != null) {
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    $(link).on('click', $.proxy(eval('switchPanel' + id)));
    link.appendChild(text.firstChild);
    text.appendChild(link);
  }
 
  function switchPanel1() {
    switchPanel(1);
  }
 
  function switchPanel2() {
    switchPanel(2);
  }
 
  function switchPanel(id) {
    document.getElementById('panel' + id).style.display = "block";
    document.getElementById('panel' + (3 - id)).style.display = "none";
  }
}
 
$(createSwitchButton(1));
$(createSwitchButton(2));
 
 
scrolling = false;
 
function scroll(speed) {
    $('#scrollcontent').animate({
        scrollTop: $('#scrollcontent').scrollTop() + speed
    }, 10, function () {
        if (scrolling)
            scroll(speed);
    });
}
 
$('#up').mousedown(function () {
    scrolling = true;
    scroll(-8);
}).mouseup(function () {
    scrolling = false;
});
 
$('#down').mousedown(function () {
    scrolling = true;
    scroll(8);
}).mouseup(function () {
    scrolling = false;
});