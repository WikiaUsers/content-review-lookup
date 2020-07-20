function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}

function Alea() {
  return (function(args) {
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    var random = function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() +
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'Alea 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};


(function($) {
  $.present = function(options) {
    var timer, tmp = 0;
    var random = Alea();
    var body_el = $('body');
    var degree = new Array();
    var set_winds = new Array();
    var flakes = new Array();
    var flake_size = 5;

    var xp = new Array();
    var yp = new Array();
    var sty = new Array();

    // default options
    var defaults = {
      'flake_number'  : 40, // max number of flakes on screen
      'flake_folder'  : 'big-24/', // folder with flake images snowflake-%d.gif
      'flake_imgs'    : 6,  // number of flakes in folder
      'link'          : '', // flake link URL
      'linked_flakes' : 0, // percent of linked flakes
      'wind'          : 60, // 0 - straight fall; max horizontal delta
      'speed'         : 10, // 5 (slow), 8 (normal), 20 (fast); max pixsel step in one frame
      'rotation'      : 5, // 0 (off), 2 (slow), 5 (speedy), 10 (stormy)
      'melt'          : 500, // 0 - off, >0 melting speed in miliseconds
      '_window_width' : 0, // don't touch if you don't know what you're doing
      '_window_height': 0, // don't touch if you don't know what you're doing
      '_fps'          : 25 // don't touch if you don't know what you're doing
    };
    options = $.extend(defaults, options);

    options.flake_number  = parseInt(options.flake_number, 10);
    options.flake_imgs    = parseInt(options.flake_imgs, 10);
    options.link          = $.trim(options.link);
    options.linked_flakes = parseInt(options.linked_flakes, 10);
    options.wind          = parseInt(options.wind, 10);
    options.speed         = parseInt(options.speed, 10);
    options.rotation      = parseInt(options.rotation, 10);
    options.melt          = parseInt(options.melt, 10);
    options._fps          = parseInt(options._fps, 10);

    if (options.flake_folder.length > 4 && typeof(options.flake_folder) != 'object') {
      options.flake_folder  = $.trim(options.flake_folder);
      flake_size = parseInt(options.flake_folder.substr(options.flake_folder.length - 3, 2));
    }

    // customize window size if needed
    if (!options._window_width) {
      options._window_width = $(window).width() + 100;
    }
    if (!options._window_height) {
      options._window_height = $(window).height();
    }
    
    if (!options.linked_flakes) {
      pointer = 'pointer-events: none; ';
    } else {
      pointer = '';
    }

    // generate flakes
    for (var i = 0; i < options.flake_number; i++) {
      xp[i] = Math.round(random() * options._window_width); // initial X pos
      yp[i] = Math.max(Math.round(random() * options._window_height / -2 - 20), -600); // initial Y pos
      sty[i] = Math.round(options.speed/2 + random()*options.speed/2); // flake speed, Y step
      degree[i] = 0; // initial rotation degree
      set_winds[i] = Math.round(options.wind/2 + random()*options.wind/2);  // wind X dev

      // flake element
      body_el.append('<div class="wf-flake" id="wf-flake-' + i +'" style="' + pointer + 'color: white; background-color: transparent!important; position: fixed; display: block; z-index: ' + (i+9999) + ';"></div>');

      if (typeof(options.flake_folder) == 'object') {
        flake_elem = options.flake_folder[Math.floor(random() * options.flake_folder.length)];
      } else {
        flake_elem = '<img src="' + options.flake_folder + 'snowflake-' + (Math.floor(random() * options.flake_imgs)+1) + '.gif' + '" style="border:0!important; background-color:transparent!important; margin:0!important; padding:0!important;" width="' + flake_size + '" height="' + flake_size + '" />';
      }

      if (Math.floor(random() * 100) < options.linked_flakes && options.link) {
        // create linked flake
        $('#wf-flake-' + i).append('<a href="' + options.link + '" style="background-color: transparent!important; border:0!important; text-decoration: none;">' + flake_elem + '</a>');
      } else {
        // create plain flake
        $('#wf-flake-' + i).append(flake_elem);
      }
      // cache flake
      flakes[i] = $('#wf-flake-' + i);
    } // for all flakes

    var methods = {
      present: function() {
        for (var i = 0; i < options.flake_number; i++) {
          yp[i] += sty[i];
          if (yp[i] > options._window_height - flake_size*0.75) {
            if (options.melt) { // fade flake
              flakes[i].fadeOut(options.melt, function(){
                  xp[i] = Math.round(random() * options._window_width);
                  yp[i] = Math.round(random() * options._window_height / -2 + 20);
              });
            } else { // no fade
              if (yp[i] > options._window_height + flake_size) { // flake has fallen?
                xp[i] = Math.round(random() * options._window_width);
                yp[i] = Math.max(Math.round(random() * options._window_height / -2 - 20), -600);
              } else {
                if (options.wind) {
                  if (i % 2) {
                    tmp = Math.cos(yp[i]/100) * set_winds[i] + xp[i];
                  } else {
                    tmp = Math.sin(yp[i]/100) * set_winds[i] + xp[i];
                  }
                } else {
                  tmp = xp[i];
                }
                flakes[i].show()
                         .css('top', yp[i])
                         .css('left', tmp);
              }
            }
          } else {
            // flake X position
            if (options.wind) {
              if (i % 2) {
                tmp = Math.cos(yp[i]/100) * set_winds[i] + xp[i];
              } else {
                tmp = Math.sin(yp[i]/100) * set_winds[i] + xp[i];
              }
            } else {
              tmp = xp[i];
            }
            flakes[i].show()
                     .css('top', yp[i])
                     .css('left', tmp);
            // rotation
            if (options.rotation != 0) {
              if (i % 2) {
                degree[i] -= options.rotation;
              } else {
                degree[i] += options.rotation;
              }
                degree[i] %= 360;
                flakes[i].css({ WebkitTransform: 'rotate(' + degree[i] + 'deg)'})
                         .css({ '-moz-transform': 'rotate(' + degree[i] + 'deg)'})
                         .css({"transform": "rotate(" + degree[i] + "deg)"})
                         .css({"-o-transform":"rotate(" + degree[i] + "deg)"})
                         .css({"-ms-transform":"rotate(" + degree[i] + "deg)"});
            } // if rotation
          } // if in screen
        }// for flakes
      } // present()
    }; // methods

    // animation interval

    timer = setInterval(methods.present, Math.round(1/parseInt(options._fps)*1000));
  }; // fn.present
} (jQuery));

// Run Script
$(window).load(function() {
            $.present({
                flake_number: 30,
                flake_folder: '/Special:FilePath?file=',
                flake_imgs: 6,
                linked_flakes: 0,
                link: '',
                melt: 0,
                wind: 50,
                rotation: 4,
                speed: 8
            });
});