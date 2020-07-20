/*--------------------------------------------------------------------------------------------
|  @desc:      Draggable element using pure javascript
|  @author:    Aravind Buddha
|  @url:       http://www.techumber.com
|  @date:      14 FEB 2013
|  @email:     aravind@techumber.com
|  @license:   Free! to Share,copy, distribute and transmit , 
|              but i'll be glad if my name listed in the credits'
---------------------------------------------------------------------------------------------*/
var Draggable = function (id) {
  var el = document.getElementById(id),
    isDragReady = false,
    dragoffset = {
      x: 0,
      y: 0
    };
  this.init = function () {
    //only for this demo
    this.initPosition();
    this.events();
  };
  //only for this demo
  this.initPosition = function () {
    el.style.position = "absolute";
    el.style.top = "20px";
    el.style.left = "48%";
  };
  //events for the element
  this.events = function () {
    var self = this;
    _on(el, 'mousedown', function (e) {
      isDragReady = true;
      //corssbrowser mouse pointer values
      e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
        document.documentElement.scrollLeft :
        document.body.scrollLeft);
      e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);
      dragoffset.x = e.pageX - el.offsetLeft;
      dragoffset.y = e.pageY - el.offsetTop;
    });
    _on(document, 'mouseup', function () {
      isDragReady = false;
    });
    _on(document, 'mousemove', function (e) {
      if (isDragReady) {
        e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
          document.documentElement.scrollLeft :
          document.body.scrollLeft);
        e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
          document.documentElement.scrollTop :
          document.body.scrollTop);
        el.style.top = (e.pageY - dragoffset.y) + "px";
        el.style.left = (e.pageX - dragoffset.x) + "px";
      }
    });
  };
  //cross browser event Helper function
  var _on = function (el, event, fn) {
    document.attachEvent ? el.attachEvent('on' + event, fn) : el.addEventListener(event, fn, !0);
  };
  this.init();
}