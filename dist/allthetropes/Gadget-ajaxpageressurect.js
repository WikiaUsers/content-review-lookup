
/* AJAX Page Resurrection */
/* Modified by GethN7
/* Uses code from:
/* http://rationalwiki.org/wiki/MediaWiki:Gadget-resurrect.js
/* http://rationalwiki.org/wiki/User:Nx/Scripts/Shared.js

/*
  PHP-compatible urlencode and urldecode
*/


function urlencode(str) {
  return encodeURIComponent(str);
}

function urldecode(str) {
  return decodeURIComponent(str);  
}


/*
  Autoedit
    retrieve page contents and edit pages
*/

function pad0(a)
{
  return (a<10 ? "0"+a : ""+a);
}

function remc(a)
{
  var s = "";
  for (var i=0; i<a.length; ++i)
  {
    if (!isNaN(parseInt(a[i],10)))
      s += a[i]
  }
  return s;
}


Autoedit = function(page,oncomplete)
{
  this.setOncomplete(oncomplete);
  if (typeof page == "undefined") { page = wgPageName; }
  this.page = urlencode(page);
  this.working = false;
}

Autoedit.prototype.setOncomplete = function(func)
{
  if (typeof func != "undefined") { this.oncomplete = func; } 
    else {this.oncomplete = null; }
}

Autoedit.prototype.getEditToken = function()
{
  this.working = true;
  this.api = sajax_init_object();
  if (!this.api) {
    this.working = false;
    return; 
  }
  this.api.open("GET",wgServer+wgScriptPath+"/api.php" + 
            "?format=json&action=query&prop=info|revisions&indexpageids=1&intoken=edit&titles=" +
            this.page, true);
  var self = this;
  this.api.onreadystatechange = function(){ self.extract_token() };
  this.api.send(null);
}

Autoedit.prototype.extract_token = function()
{
  if (this.api.readyState == 4)
  {
    if (this.api.status == 200)
    {
      var d = new Date();
      this.starttime = d.getUTCFullYear() +
                       pad0(d.getUTCMonth()+1) +
                       pad0(d.getUTCDate()) +
                       pad0(d.getUTCHours()) +
                       pad0(d.getUTCMinutes()) +
                       pad0(d.getUTCSeconds());
      var response = eval('(' + this.api.responseText + ')');
      var pagei;
      if (response['query']['pageids'][0] == "-1")
      {
        //HACK: page does not exist, get edit token from Main Page.
        this.api.open("GET",wgServer+wgScriptPath+"/api.php" + 
                      "?format=json&action=query&prop=info|revisions&indexpageids=1&intoken=edit&titles=Talk:Main_Page",
                      false);
        this.api.send(null);
        response = eval('(' + this.api.responseText + ')');
        this.edittime = this.starttime;
      } else {
        pagei = response['query']['pages'][response['query']['pageids'][0]];
        this.edittime = remc(pagei['revisions'][0]['timestamp']);
      }
      pagei = response['query']['pages'][response['query']['pageids'][0]];
      this.token = urlencode(pagei['edittoken']);
      this.edit();
    } else {
      this.working = false;
      alert("Error " + this.api.status + " occurred while retrieving the edit token.");  
    }
  }
}


Autoedit.prototype.edit = function()
{
  var params = "title=" + this.page +
               "&action=submit&wpTextbox1=" + this.content + 
               "&wpStarttime=" + this.starttime +
               "&wpEdittime=" + this.edittime +
               "&wpIgnoreBlankSummary" +
               "&wpEditToken=" + this.token +
               "&wpSummary=" + this.summary;
  if (this.section) {params = params + "&wpSection=" + this.section; }
  if (this.minor) { params = params + "&wpMinoredit"; }
  var req = sajax_init_object();
  if (!req) {
    this.working = false;
    return;
  }
  req.open("POST",wgServer+wgScriptPath+"/index.php",true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.setRequestHeader('Connection', 'keep-alive');
  req.setRequestHeader('Content-length', params.length);
  var self = this;
  req.onreadystatechange = function() { 
    if (req.readyState == 4)
    {
      if (req.status == 200)
      {
        self.working = false;
        if (self.oncomplete) self.oncomplete();
      } else {
        this.working = false;
        alert("Error " + req.status + " occurred while saving the page.");  
      }
    }
  }
  req.send(params);
}

Autoedit.prototype.replacePage = function(content,summary,minor)
{
  if (this.working) { return false; }
  if (typeof content == "undefined") { return false; }
  if (typeof summary == "undefined") { summary = ""; }
  if (typeof minor == "undefined") { minor = false; }
  this.content = urlencode(content);
  this.summary = urlencode(summary);
  this.minor = minor;
  this.section = null;
  this.getEditToken();
}

Autoedit.prototype.getPage = function()
{
  if (this.working) { return false; }
  this.section = null;
  var req = sajax_init_object();
  if (!req) return null;
  req.open("GET", wgServer+wgScriptPath+"/index.php?title="+this.page+"&action=raw&ctype=text/javascript&ffcacheworkaround=" + Math.random(),false);
  req.send(null);
  if (req.status == 200) 
  {
    return req.responseText;
  } else {
    alert("Error " + req.status + " occurred while retrieving the page.");  
    return null;
  }
}


Autoedit.prototype.replaceSection = function(section,content,summary,minor)
{
  if (this.working) { return false; }
  if (typeof section == "undefined") { return false; }
  if (typeof content == "undefined") { return false; }
  if (typeof summary == "undefined") { summary = ""; }
  if (typeof minor == "undefined") { minor = false; }
  if (section != "new")
  {
    this.section = parseInt(section,10);
    if (isNaN(this.section)) { return false; }
  } else  {
    this.section = section;
  }
  this.content = urlencode(content);
  this.summary = urlencode(summary);
  this.minor = minor;
  this.getEditToken();
}

Autoedit.prototype.getSection = function(section)
{
  if (this.working) { return false; }
  if (typeof section == "undefined") { return false; }
  this.section = parseInt(section,10);
  if (isNaN(this.section)) { return false; }
  var cont = this.getPage();
  if (cont)
  {
    var sections = cont.split(/(=+.*=+)/);
    if (typeof sections[section*2-1] == "undefined")
    {
      return null;
    } else {
      return sections[section*2-1] + sections[section*2];
    }
  } else {
    return null;
  }
}

Autoedit.prototype.render = function()
{
  if (this.working) { return false; }
  this.section = null;
  var req = sajax_init_object();
  if (!req) return false;
  req.open("GET", wgServer+wgScriptPath+"/index.php?title="+this.page+"&action=render&ffcacheworkaround=" + Math.random(),false);
  req.send(null);
  if (req.status == 200) 
  {
    return req.responseText;
  } else {
    alert("Error " + req.status + " occurred while retrieving the page.");  
    return null;
  }
}

/*
  Cookies
*/

Cookies = {};

Cookies.create = function(name, value, days)
{
  if (typeof days != "undefined")
  {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  } else { expires = ""; }
  document.cookie = name+"="+value+expires+"; path=/";
}

Cookies.read = function(name)
{
  var nameEq = name + "=";
  var ca = document.cookie.split(";");
  for (var i=0; i < ca.length; ++i)
  {
    var c = ca[i];
    while (c.charAt(0) == " ") {c = c.substring(1,c.length); }
    if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length,c.length);
  }
  return null;
}

Cookies.erase = function(name)
{
  Cookies.create(name,"");
}

/*
  Forms
*/

function JForm()
{
  //styles

  var s = document.createElement('style');

  s.type = 'text/css';

  s.rel = 'stylesheet';

  s.appendChild(document.createTextNode('')); //Safari sometimes borks on null

  document.getElementsByTagName('head')[0].appendChild(s);

  var ss;

  if (s.styleSheet) {ss = s.styleSheet;} //IE

  else {ss = s.sheet;}

  ss.insertRule(

    "form.jform { width:96%; " +

                  "margin:auto; " +
                  "padding:.5em; " +
                  "vertical-align:middle; " +

                  "}"

                  ,0

  );

  ss.insertRule(

    "form.jform * { font-family:sans-serif; " +
                  "vertical-align:middle; " +

                  "}"

                  ,0

  );

  this.root = document.createElement("form");
  this.root.className="jform";
  this.root.setAttribute("action","javascript:void(0)");
}

JForm.prototype.addCallback = function(callback, type)
{
  if (typeof type == 'undefined' ) type = "submit";  
  this.root.addEventListener(type,callback,false);
}

JForm.prototype.addControl = function(control)
{
  this.root.appendChild(control.element);
}

JForm.prototype.addElement = function(elem)
{
  this.root.appendChild(elem);
}

JForm.control = function(type,id,nm,data)
{
  switch(type)
  {
  case "input" :
    this.type="input";
    this.element = document.createElement("input");
    this.element.setAttribute("id",id);
    this.element.setAttribute("name",nm);
    if (typeof data == "undefined") data = {};
    if (data.type)
    {
      this.element.setAttribute("type", data.value);
    } else {
      this.element.setAttribute("type", "text");
    }
    if (data.value)
    {
      this.element.setAttribute("value", data.value);
    }
    if (data.disabled)
    {
      this.element.setAttribute("disabled", data.disabled);
    }
    if (data.readonly)
    {
      this.element.setAttribute("readonly", data.readonly);
    }
    if (data.maxlength)
    {
      this.element.setAttribute("maxlength", data.maxlength);
    }
    if (data.callback)
    {
      this.addCallback(data.callback.handler, data.callback.type);
    }
  break;
  case "text" :
    this.type="text";
    this.element = document.createElement("input");
    this.element.setAttribute("type", "text");
    this.element.setAttribute("id",id);
    this.element.setAttribute("name",nm);
    if (typeof data == "undefined") data = {};
    if (data.value)
    {
      this.element.setAttribute("value", data.value);
    }
    if (data.disabled)
    {
      this.element.setAttribute("disabled", data.disabled);
    }
    if (data.readonly)
    {
      this.element.setAttribute("readonly", data.readonly);
    }
    if (data.maxlength)
    {
      this.element.setAttribute("maxlength", data.maxlength);
    }
    if (data.callback)
    {
      this.addCallback(data.callback.handler, data.callback.type);
    }
  break;
  case "password" :
    this.type="password";
    this.element = document.createElement("input");
    this.element.setAttribute("type", "password");
    this.element.setAttribute("id",id);
    this.element.setAttribute("name",nm);
    if (typeof data == "undefined") data = {};
    if (data.value)
    {
      this.element.setAttribute("value", data.value);
    }
    if (data.disabled)
    {
      this.element.setAttribute("disabled", data.disabled);
    }
    if (data.readonly)
    {
      this.element.setAttribute("readonly", data.readonly);
    }
    if (data.maxlength)
    {
      this.element.setAttribute("maxlength", data.maxlength);
    }
    if (data.callback)
    {
      this.addCallback(data.callback.handler, data.callback.type);
    }
  break;
  case "button" :
    this.type="button";
    this.element = document.createElement("input");
    this.element.setAttribute("id",id);
    this.element.setAttribute("name",nm);
    this.element.setAttribute("type", "button");
    if (typeof data == "undefined") data = {};
    if (data.label)
    {
      this.element.setAttribute("value", data.label);
    }
    if (data.disabled)
    {
      this.element.setAttribute("disabled", data.disabled);
    }
    if (data.callback)
    {
      this.addCallback(data.callback.handler, data.callback.type);
    }
  break;
  case "label" :
    this.type="label";
    this.element = document.createElement("label");
    this.element.setAttribute("id",id);
    if (typeof data == "undefined") data = {};
    if (data.label)
    {
      this.element.innerHTML = data.label;
    }
    if (data.boundto)
    {
      this.element.setAttribute("for", data.boundto);
    }
  break;
  case "checkbox" :
    this.type="checkbox";
    this.element = document.createElement("input");
    this.element.setAttribute("id",id);
    this.element.setAttribute("name",nm);
    this.element.setAttribute("type", "checkbox");
    if (typeof data == "undefined") data = {};
    if (data.label)
    {
      this.element.setAttribute("value", data.label);
    }
    if (data.disabled)
    {
      this.element.setAttribute("disabled", data.disabled);
    }
    if (data.checked)
    {
      this.element.setAttribute("checked", data.checked);
    }
    if (data.callback)
    {
      this.addCallback(data.callback.handler, data.callback.type);
    }
  break;
  }
}

JForm.control.prototype.addCallback = function(callback, type)
{
  if (typeof type == 'undefined' )
  {
    switch(this.type)
    {
    case "input" :
      type = "keyup";
    break;
    case "button" :
      type = "click";
    break;
    case "checkbox" :
      type = "change";
    break;
    }
  }
  this.element.addEventListener(type,callback,false);
}

/*
  Javascript Windowing system
*/


var focused = null;

var maxfocus = 100;

var windows = [];

var defaultleft = 20;

var defaulttop = 20;



function JWindow(title, width, height, left, top, resizable)

{

  //styles

  var s = document.createElement('style');

  s.type = 'text/css';

  s.rel = 'stylesheet';

  s.appendChild(document.createTextNode('')); //Safari sometimes borks on null

  document.getElementsByTagName('head')[0].appendChild(s);

  var ss;

  if (s.styleSheet) {ss = s.styleSheet;} //IE

  else {ss = s.sheet;}

  

  ss.insertRule(

    ".jwindow_frame { position:fixed; " +

                     "display:block; " +

                     "background-color:lightblue; " +

                     "border:4px solid DodgerBlue; " +

                     "z-index:99; " +

                     "}"

                     ,0

  );

  ss.insertRule(

    ".jwindow_frame .titlebar { position:absolute; " +

                               "left:0px; " +

                               "top:0px; " +

                               "background-color:DodgerBlue; " +

                               "color:White; " +

                               "cursor:move; " +

                               "height:20px; " +

                               "width:100%; " +

                               "}"

                               ,0

  );

  ss.insertRule(

    ".jwindow_frame .shadebutton { position:absolute; " +

                                   "right:21px; " +

                                   "top:0px; " +

                                   "background-color:yellow; " +

                                   "color:black; " +
                                   "text-align:center; " +
                                   "vertical-align:middle; " +

                                   "cursor:pointer; " +

                                   "height:18px; " +

                                   "width:18px; " +

                                   "}"

                                   ,0

  );

  ss.insertRule(

    ".jwindow_frame .closebutton { position:absolute; " +

                                   "right:0px; " +

                                   "top:0px; " +

                                   "background-color:red; " +

                                   "color:black; " +
                                   "text-align:center; " +
                                   "vertical-align:middle; " +

                                   "cursor:pointer; " +

                                   "height:18px; " +

                                   "width:18px; " +

                                   "}"

                                   ,0

  );

  ss.insertRule(

    ".jwindow_frame .clientarea { position:absolute; " +

                                   "right:0px; " +

                                   "top:20px; " +
                                   "width:100%; " +

                                   "background-color:transparent; " +
                                   "overflow:auto; " +

                                   "}"

                                   ,0

  );  



  

  //default values

  if (typeof width == 'undefined' ) width = 400;

  if (typeof height == 'undefined' ) height = 300;

  if (typeof left == 'undefined' ) left = defaultleft;

  if (typeof top == 'undefined' ) top = defaulttop;

  if (typeof title == 'undefined' ) title = 'Untitled';
  if (typeof resizable == 'undefined' ) resizable = 'true';  


  this.resizable = resizable;

  this.nu = true;

  this.title = title;

  

  this.frameThickness = 4;

  this.dir = "";

  this.state = "inactive";

  this.shaded = false;

  

  this.frame = document.createElement('div');

  this.titlebar = document.createElement('div');

  this.shadebutton = document.createElement('div');

  this.closebutton = document.createElement('div');
  this.clientarea = document.createElement('div');

  

  this.frame.className = 'jwindow_frame';

  this.titlebar.className = 'titlebar';

  this.shadebutton.className = 'shadebutton';

  this.closebutton.className = 'closebutton';
  this.clientarea.className = 'clientarea';

  this.shadebutton.innerHTML = '-';

  this.closebutton.innerHTML = 'x';

  

  this.titlebar.textContent = this.title;

  this.frame.appendChild(this.titlebar);

  this.frame.appendChild(this.shadebutton);

  this.frame.appendChild(this.closebutton);
  this.frame.appendChild(this.clientarea);

  this.closebutton.title = "Close";

  this.shadebutton.title = "Shade";
  this.setWidth(width);

  this.setHeight(height);

  this.setLeft(left);

  this.setTop(top);

  

  var self = this;

  

  this.frame.addEventListener('mousedown',function(e) {self.focus(); /*e.preventDefault();*/ return false;},false);

  this.frame.addEventListener('mousedown',function(e) {self.initRes(e); return false;},false);

  this.titlebar.addEventListener('mousedown',function(e) {self.initMove(e); return false;},false);

  this.shadebutton.addEventListener('mousedown',function(e) {self.shade(e); return false;},false);

  this.closebutton.addEventListener('mousedown',function(e) {if (e.preventDefault) {e.preventDefault();} self.close(); return false;},false);

  

  window.addEventListener('mousemove',function(e) {self.handleEvent(e);},false);

  window.addEventListener('mouseup',function(e) {self.handleEvent(e);},false);

  window.addEventListener('mouseover',function(e) {self.handleEvent(e);},false);

  window.addEventListener('mousedown',function(e) {self.handleEvent(e);},false);

  

  windows.push(this);

  this.focus();

}



JWindow.prototype.display = function()

{

  if (this.nu)

  {

    this.nu = false;

    defaulttop += 32;

    defaultleft += 32;

    if (window.innerHeight != null && defaulttop > window.innerHeight)

    {

      defaulttop = 20;

    }

  }

  document.body.appendChild(this.frame);

}



JWindow.prototype.close = function()

{

  document.body.removeChild(this.frame);

}



JWindow.prototype.setTitle = function(title)

{

  this.title = title;

  this.titlebar.textContent = this.title;

}



JWindow.prototype.setWidth = function(width)

{

  this.width = width;

  this.frame.style.width = this.width + "px";

}



JWindow.prototype.setHeight = function(height)

{

  this.height = height;

  this.frame.style.height = this.height + "px";
  this.clientarea.style.height = (this.height - 20) + "px";

}



JWindow.prototype.setTop = function(top)

{if (typeof title == 'undefined' ) title = 'Untitled';

  this.top = top;

  this.frame.style.top = this.top + "px";

}



JWindow.prototype.setLeft = function(left)

{

  this.left = left;

  this.frame.style.left = this.left + "px";

}

JWindow.prototype.setResizable = function(res)
{
  this.resizable = res;
}



function focussortfunc(a, b)

{

  if (a.frame.style.zIndex < b.frame.style.zIndex)

  {

    return -1;

  } else if (a.frame.style.zIndex > b.frame.style.zIndex)

  {

    return 1;

  } else

  {

    return 0;

  }

}



JWindow.prototype.focus = function()

{

  if (this.frame.style.zIndex != maxfocus)

  {

    this.frame.style.zIndex = ++maxfocus;

  }

  if (maxfocus > 500)

  {

    windows.sort(focussortfunc);

    for (var i = 0; i<windows.length;++i)

    {

      windows[i].frame.style.zIndex = 100+i;

    }

  }

}



JWindow.prototype.shade = function(e)

{

  e.preventDefault();

  if (this.shaded)

  {
    this.setHeight(this.oldH);

    this.shaded = false;

    this.shadebutton.title = "Shade";

  } else {

    this.oldH = this.height;
    this.setHeight(20);

    this.shaded = true;

    this.shadebutton.title = "Unshade";

  }

}



JWindow.prototype.move = function(x,y)

{

  if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) return;

  this.left = (x - this.moveOffsetX);

  this.top = (y - this.moveOffsetY);

  this.frame.style.left = this.left + "px";

  this.frame.style.top = this.top + "px";

}





JWindow.prototype.resize = function(x,y)

{

  var minsize = 100;

  var newX = this.left;

  var newY = this.top;

  var newH = 0;

  var newW = 0;

  if (this.dir.indexOf("w") != -1)

  {

    newX = x - this.resOffsetX;

    newW = this.resStartX - x;

  } else if (this.dir.indexOf("e") != -1)

  {

    newW = x - this.resStartX;

  }

  if (this.dir.indexOf("n") != -1)

  {

    newY = y - this.resOffsetY;

    newH = this.resStartY - y;

  } else if (this.dir.indexOf("s") != -1)

  {

    newH = y - this.resStartY;

  }

  

  var W = +this.width + newW;

  var H = +this.height + newH;

  

  if (W > minsize)

  {

    this.resStartX = x;
    this.setLeft(newX);

    this.setWidth(W);

  }

  if (H > minsize)

  {

    this.resStartY = y;
    this.setTop(newY)
    this.setHeight(H);

  }

}



JWindow.prototype.initMove = function(e)

{

  if (e.preventDefault) {e.preventDefault();}

  this.moveOffsetX = e.clientX - this.left/*this.frame.offsetLeft*/;

  this.moveOffsetY = e.clientY - this.top/*this.frame.offsetTop*/;

  this.frame.style.opacity = "0.5";

  this.state = "moving";

}



JWindow.prototype.getDirection = function(x,y)

{
  if (!this.resizable) {return ""}

  var xRel = x - this.left/*this.frame.offsetLeft*/;

  var yRel = y - this.top/*this.frame.offsetTop*/;

  var xDir = "";

  var yDir = "";

  

  if (yRel >=0 && xRel >=0 && this.height-yRel+8 > 0 && this.width-xRel+8 > 0)

  {

    if (yRel <= 4) {yDir = "n";}

    if (xRel <= 4) {xDir = "w";}

    if (this.height-yRel+8 <= 4) {yDir="s";}

    if (this.width-xRel+8 <= 4) {xDir="e";}

  }

  if (this.shaded) {yDir = ""};

  return yDir+xDir;

}





JWindow.prototype.initRes = function(e)

{ 

  if (this.dir != "")

  {

    this.state = "resizing";

    this.resOffsetX = e.clientX - this.left/*this.frame.offsetLeft*/;

    this.resOffsetY = e.clientY - this.top/*this.frame.offsetTop*/;

    this.resStartX = e.clientX;

    this.resStartY = e.clientY;

    this.frame.style.opacity = "0.5";
    if (e.preventDefault) {e.preventDefault();}

  }

}





JWindow.prototype.handleEvent = function(e)

{

  //if (e.preventDefault) {e.preventDefault();}

  if (this.state == "inactive")

  {

    this.dir = this.getDirection(e.clientX,e.clientY);

    if (this.dir == "") 
    {
      this.frame.style.cursor="default";
    } else {
      this.frame.style.cursor=this.dir+"-resize";
      if (e.preventDefault) {e.preventDefault();}
    }

  }

  //moving

  if (this.state == "moving" && e.type == "mouseup")

  {

    this.frame.style.opacity = "1";

    this.state = "inactive";
    if (e.preventDefault) {e.preventDefault();}

    return;

  }

  if (this.state == "moving" && e.type == "mousemove")

  {

    this.move(e.clientX, e.clientY);
    if (e.preventDefault) {e.preventDefault();}

    return;

  }

  //resizing

  if (this.state == "resizing" && e.type == "mouseup")

  {

    this.frame.style.opacity = "1";

    this.state = "inactive";

    this.dir = this.getDirection(e.clientX,e.clientY);

    if (this.dir == "") {this.frame.style.cursor="default";}

      else {this.frame.style.cursor=this.dir+"-resize";}
    if (e.preventDefault) {e.preventDefault();}

    return;

  }

  if (this.state == "resizing" && e.type == "mousemove")

  {

    this.resize(e.clientX, e.clientY);
    if (e.preventDefault) {e.preventDefault();}

    return;

  }

}

JWindow.prototype.addElement = function(elem)
{
  this.clientarea.appendChild(elem);
}

JWindow.prototype.removeElement = function(elem)
{
  this.clientarea.removeChild(elem);
}

JWindow.prototype.removeAt = function(position)
{
  this.clientarea.removeChild(this.clientarea.childNodes[position]);
}

JWindow.prototype.insertElement = function(elem, position)
{
  this.clientarea.insertBefore(elem,this.clientarea.childNodes[position]);
}

JWindow.prototype.clear = function()
{
  while (this.content.hasChildNodes())
  {
    this.content.removeChild(this.content.firstChild);
  }
}


/*
  end JWindow
*/


//]]>


/*
  A script that allows instant restoration of pages, bypassing Special:Undelete, but does not allow individually selecting revisions to be restored.
*/

var resurrecting = false;

function getEditToken() 
{
  var api = sajax_init_object();
  var starttime;
  var edittime;
  var token;
  if (!api) {
    return false;
  }
  api.open("GET",wgServer+wgScriptPath+"/api.php" + 
            "?format=json&action=query&prop=info|revisions&indexpageids=1&intoken=edit&titles=" +
            urlencode(wgPageName), false);
  api.send(null);
  
  if (api.status == 200)
  {
    var d = new Date();
    starttime = d.getUTCFullYear() +
                     pad0(d.getUTCMonth()+1) +
                     pad0(d.getUTCDate()) +
                     pad0(d.getUTCHours()) +
                     pad0(d.getUTCMinutes()) +
                     pad0(d.getUTCSeconds());
    var response = eval('(' + api.responseText + ')');
    var pagei;
    if (response['query']['pageids'][0] == "-1")
    {
      //HACK: page does not exist, get edit token from Talk:Main Page.
      api.open("GET",wgServer+wgScriptPath+"/api.php" + 
                    "?format=json&action=query&prop=info|revisions&indexpageids=1&intoken=edit&titles=Talk:Main_Page",
                    false);
      api.send(null);
      response = eval('(' + api.responseText + ')');
      edittime = starttime;
    } else {
      pagei = response['query']['pages'][response['query']['pageids'][0]];
      edittime = remc(pagei['revisions'][0]['timestamp']);
    }
    pagei = response['query']['pages'][response['query']['pageids'][0]];
    token = urlencode(pagei['edittoken']);
    return {"token":token,"starttime":starttime,"edittime":edittime};
  } else {
    return false;
  }
}

function resurrect()
{
  if (resurrecting) return;
  resurrecting = true;
  var editinfo;
  if ((editinfo = getEditToken()))
  {
    document.getElementById("bodyContent").innerHTML = "<h3>Resurrecting, please wait...</h3>";
    params = "title=Special:Undelete&restore=1&wpComment=[[Help:Scripts#Resurrect|Resurrecting]]&action=submit&target=" + urlencode(wgPageName) + "&wpEditToken=" + editinfo["token"];
    var req = sajax_init_object();
    req.open("POST",wgServer+wgScriptPath+"/index.php",true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.setRequestHeader('Connection', 'keep-alive');
    req.setRequestHeader('Content-length', params.length);
    var self = this;
    req.onreadystatechange = function() { 
      if (req.readyState == 4)
      {
        if (req.status == 200)
        {
          var hackdiv = document.createElement("div");
          hackdiv.innerHTML = req.responseText;
          var divs = hackdiv.getElementsByTagName("div");
          for (var i=0;i<divs.length;++i)
          {
            if (divs[i].id == "content")
            {
              document.getElementById("content").innerHTML = divs[i].innerHTML;
              break;
            }
          }
          resurrecting = false;
        } else {
          document.getElementById("bodyContent").innerHTML = "<h3>Error " + req.status + " occurred while restoring the page.</h3>";
        }
      }
    }
    req.send(params);  
  }
}

function resurrect_setup()
{
  var ca_undelete = document.getElementById("ca-undelete");
  if (ca_undelete)
  {
    var ca_resurrect = document.createElement("li");
    ca_resurrect.id = "ca-resurrect";
    ca_resurrect.innerHTML = "<a" + ' href="javascript:resurrect()" title="Restore the page">Resurrect</a>';
    ca_undelete.parentNode.insertBefore(ca_resurrect,ca_undelete);
  }
}

addOnloadHook(resurrect_setup);