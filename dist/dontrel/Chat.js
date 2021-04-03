/*
The MIT License (MIT)

Copyright (c) 2015 Incongruence

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Options...

$(function() {
  $("h1.public.wordmark").append("<label style='font-size: 10pt;'>Sounds?</label><input type='checkbox' name='sounds?'>");
  $("h1.public.wordmark").append("<label style='font-size: 10pt;'>Balloons?</label><input type='checkbox' name='balloons?'>");
});

// Unread messages code...

old = document.title;
unread = 0;
 
mainRoom.model.chats.bind("afteradd", function() {
  if(!document.hasFocus()){
     unread++;
     document.title = "(" + unread + ") " + old;
  }
});
 
window.onfocus = function() {
  document.title = old;
  unread = 0;
}

// YouTube title service

mainRoom.model.chats.bind("afteradd", function(msg) {
	mtch = msg.attributes.text.match(/https?:\/\/(?:www\.)?youtube\.com[^ ]+v=([^&#\s]*)|https?:\/\/(?:www\.)?youtu\.be\/([^&#\?\s]*)/);
	if(mtch){
		id = mtch[1];
		anchor = mtch[0];
		x = new XMLHttpRequest;
		x.open("GET", "https://gdata.youtube.com/feeds/api/videos/"+ id +"?v=2&alt=jsonc");
 
		x.onreadystatechange = function() {
			cid = msg.cid;
			data = JSON.parse(x.response);
			to_find = ("<a href=\""+ anchor +"\">"+ anchor +"</a>");
			to_replace = ("<span style='background: white; color: black;'>You</span><span style='background: red; color: white;'>Tube</span> <a href='"+ anchor +"'>[" + data['data']['title'] + "]</a>");
			original = $("#entry-" + cid).find("span.message")[0].innerHTML;			
 
			$("#entry-" + cid).find("span.message")[0].innerHTML = original.replace(to_find, to_replace);
			//$("#entry-" + cid).find("span.message")[0].innerHTML = original.replace(anchor, ("<span style='background: white; color: black;'>You</span><span style='background: red; color: white;'>Tube</span> <a href='"+ anchor +"'>[" + data['data']['title'] + "]</a>"));
		}
 
		x.send();
	} else {}
});

// Balloon notifications

const KEEP_TIME = 2734;
 
function Message(message) {
  this.display = function() {
    if(Notification.permission == "granted") {
      var msg = new Notification(message.attributes.name, {icon: message.attributes.avatarSrc, body: message.attributes.text});
      setTimeout(function() {
        msg.close();
      }, KEEP_TIME);
    }
  }
}
 
function hasSounds() {
  return $("[name='sounds?']")[0].checked;
}

function hasBalloons() {
  return $("[name='balloons?']")[0].checked;
}

Notification.requestPermission(function(status) {
  if(status == "granted") {
    mainRoom.model.chats.bind("afteradd", function(message) {
      if(hasBalloons()) {
        new Message(message).display();
      }

      if(hasSounds()) {
        new Audio("http://vignette3.wikia.nocookie.net/dontrel/images/7/7e/DING.ogg/revision/latest?cb=20150205212440").play();
      }
    });
  }
});