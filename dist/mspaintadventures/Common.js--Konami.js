/*** BEGIN KONAMI CODE ***/
 
/*
	* Konami-JS ~
	* Code: http://konami-js.googlecode.com/
	* Examples: http://www.snaptortoise.com/konami-js
	* Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
	* Version: 1.3.2 (7/02/2010) // Modified to exclude iPhone support
	* Licensed under the GNU General Public License v3
	* http://www.gnu.org/copyleft/gpl.html
	* Tested in: Safari 4+, Google Chrome 4+, Firefox 3+ and IE7+
*/
 
var Konami = function() {
	var konami= {
			addEvent:function ( obj, type, fn, ref_obj )
			{
				if (obj.addEventListener)
					obj.addEventListener( type, fn, false );
				else if (obj.attachEvent)
				{
					// IE
					obj["e"+type+fn] = fn;
					obj[type+fn] = function() { obj["e"+type+fn]( window.event,ref_obj ); }
 
					obj.attachEvent( "on"+type, obj[type+fn] );
				}
			},
	        input:"",
	        pattern:"3838404037393739666513",
		/*pattern:"38384040373937396665",*/
	        load: function(link) {	
 
				this.addEvent(document,"keydown", function(e,ref_obj) {											
					if (ref_obj) konami = ref_obj; // IE
					konami.input+= e ? e.keyCode : event.keyCode;
					if (konami.input.length > konami.pattern.length) konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
					if (konami.input == konami.pattern) {
                    konami.code(link);
					konami.input="";
                   	return;
                    }
            	},this); 
				},
	        code: function(link) { window.location=link}
	}
	return konami;
}
 
        konami = new Konami()
        konami.load("http://mspaintadventures.wikia.com/wiki/Code_Machine");
 
/*** END KONAMI CODE ***/

/*** BEGIN HORSE CODE ***/

var Horse = function() {
	var horse= {
			addEvent:function ( obj, type, fn, ref_obj )
			{
				if (obj.addEventListener)
					obj.addEventListener( type, fn, false );
				else if (obj.attachEvent)
				{
					// IE
					obj["e"+type+fn] = fn;
					obj[type+fn] = function() { obj["e"+type+fn]( window.event,ref_obj ); }
 
					obj.attachEvent( "on"+type, obj[type+fn] );
				}
			},
	        input:"",
	        pattern:"6682737871776965727982836913",
		/*pattern:"66827378717769657279828369",*/
	        load: function(link) {	
 
				this.addEvent(document,"keydown", function(e,ref_obj) {											
					if (ref_obj) horse = ref_obj; // IE
					horse.input+= e ? e.keyCode : event.keyCode;
					if (horse.input.length > horse.pattern.length) horse.input = horse.input.substr((horse.input.length - horse.pattern.length));
					if (horse.input == horse.pattern) {
                    horse.code(link);
					horse.input="";
                   	return;
                    }
            	},this); 
				},
	        code: function(link) { window.location=link}
	}
	return horse;
}
 
        horse = new Horse()
        horse.load("http://mspaintadventures.wikia.com/wiki/Andrew_Hussie");

/*** END HORSE CODE ***/