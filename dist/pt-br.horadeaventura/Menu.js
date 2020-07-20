(function(w){
   if(window.bpen == undefined){
     window.bpen = function(){};
   }

   if(window.bpen.core == undefined){
     window.bpen.core = function(){};
     window.bpen.core.hasClass = function(ele, cls){
       return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
     };
     window.bpen.core.addClass = function(ele, cls){
       if (!bpen.core.hasClass(ele,cls)) ele.className += " "+cls;
     };
     window.bpen.core.removeClass = function(ele, cls){
        if (bpen.core.hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ').trim();
        }
     };
   }
})(window);


(function(b, window, document){
   function drw(elemId, params) {
     if(drw._drawers.length > 0){
       for(var i = 0; i < drw._drawers.length; i++){
         if(drw._drawers[i]._elemId == elemId){
           return drw._drawers[i];
         }
       }
     }
     var d = new drawer();
     _init(d, elemId, params);
     drw._drawers.push(d);
     return d;
   };
   drw._drawers = [];

   var _init = function(d, id, p){

      d._elemId = id;
      d._container = document.getElementById(id);

      if(p != undefined){
        d._anchor = p.Anchor ? p.Anchor : 'left'
      }

      d._container.className = 'bpen-drawer bpen-drawer-' + d._anchor;
      d._container.addEventListener('click', function(e){e.stopPropagation();}, false);

      _build(d, id, p);

      return d;
   };

   var _build = function(newDrawer,id, p){
    var header = document.createElement('div');
    header.className = 'bpen-drawer-header';
    newDrawer._container.appendChild(header);


    newDrawer._toggle = document.createElement('div');
    newDrawer._toggle.className ='bpen-toggle-pad bpen-toggle-pad-' + newDrawer._anchor;
    (function(drawer){drawer._toggle.addEventListener("click",
            function(e){
              e.stopPropagation();
              drawer.toggle();
            }
        , false);

    })(newDrawer);

    header.appendChild(newDrawer._toggle);

    (function(drawer){
      document.body.addEventListener("click",
      function(e){
        drawer.close();
      }
        , false);
    })(newDrawer);

    newDrawer._menuItemsContainer = document.createElement('ul');
    newDrawer._menuItemsContainer.className = 'bpen-drawer-items';
    newDrawer._container.appendChild(newDrawer._menuItemsContainer);

    _addItems(newDrawer, p.Items);

   };

   var _addItems = function(newDrawer, items){
       for(var i = 0; i < items.length; i++){
        _addItem(newDrawer, items[i]);
      }
   };

   var _addItem = function(newDrawer, item){
      newDrawer._menuItemsContainer.appendChild(_createItem(item));
      newDrawer._items.push(item);
   };

   var _createItem = function(item){
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.setAttribute('href', item.Url);
      link.innerHTML = item.Text;
      li.appendChild(link);

      return li;
   };

   /**
   * @constructor
   **/
   function drawer() {};

     drawer.prototype = {
       _elemId : null, //element id
       _container : null, //menu container
       _toggle : null, //toggle element
       _menuItemsContainer : null, //menu item container
       _anchor : null, //anchor = 'left' || 'right'
       _menuState : 0, //menu state = 0 || 1
       _items : [],

       toggle : function(){
          if(this._menuState == 0){
            //close all other menu's
            //var otherExpanded = document.getElementsByClassName('expanded');
            //while(otherExpanded.length > 0){
              //removeClass(otherExpanded[0], 'expanded');
            //}

            //for(var i = 0; i < bpenDrawer._drawers.length; i++){
              //bpenDrawer._drawers[i].menuState = 0;
            //}

            this.open();
          }
          else{
            this.close();
          }
        },

        open  : function(){
          window.bpen.core.addClass(this._container, 'expanded');
          window.bpen.core.addClass(this._toggle, 'expanded');
          this._menuState = 1;
        },

        close : function(){
          window.bpen.core.removeClass(this._container, 'expanded');
          window.bpen.core.removeClass(this._toggle, 'expanded');
          this._menuState = 0;
        }

   };

   b.drawer = drw;
})(bpen, window, document);