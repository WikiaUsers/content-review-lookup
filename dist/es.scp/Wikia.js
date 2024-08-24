/* Botón con Contraseña */
function LogIn(){
    var password = prompt('Password:');
    
    /* Add password--> */
    if (password.toLowerCase() === 'welcome2corneria') {
        window.location = '/SCP-245-1-a';
    } else {
        alert('CONTRASEÑA INCORRECTA');
    }
}

/**
 * DirectGoto
 * @author: LemonSaektide
 * @email: saektide@saektide.com
 * @requestedBy: Gerardo Ares
**/

var DirectGoto = {
    controller: function(action) {
        if (action == 'goto') {
            console.log('[DirectGoto] Debug - Controller - Goto.');
            DirectGoto.returnEl(
                '.directgoto input#pagename',
                function(field) {
                    window.location = '/'+field.val();
                },
                function(noFieldFound) {
                    new BannerNotification('¡No se pudo encontrar el elemento!', 'error').show();
                }
            );
            return;
        } else if (action == 'gotoedit') {
            DirectGoto.returnEl(
                '.directgoto input#pagename',
                function(field) {
                    window.location = '/'+field.val()+'?action=edit';
                },
                function(noFieldFound) {
                    new BannerNotification('¡No se pudo encontrar el elemento! Tampoco no se llevó a cabo la acción de editar esa página.', 'error').show();
                }
            );
            return;
        } else if (action == 'init') {
            DirectGoto.init();
        }
    },
    init: function() {
        console.log('[DirectGoto] Debug - Init.');
        DirectGoto.returnEl(
            '.directgoto',
            function(thisEl) {
                console.log('[DirectGoto] Debug - Init - Element found!');
                console.log(thisEl);
                thisEl.html('<input id="pagename"/>\
                <button id="goto" onclick="DirectGoto.controller(\'goto\')">Ir</button>\
                <button id="gotoedit" onclick="DirectGoto.controller(\'gotoedit\')">Editar</button>');
            },
            function(error) {
                console.error(error);
            }
        );
    },
    returnEl: function(el, found, err) {
        if ($(el)) return found($(el));
        else return err('[DirectGoto] Element not found!');
    }
};

// Init

DirectGoto.controller('init');

// Botón de login

$('#loginButton').click(LogIn);

// Probando JS

function startTimer(duration, display) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var start = Date.now(),
      diff,
      minutes,
      seconds;
  function timer() {
    diff = duration - ((Date.now() - start) / 1000 | 0);
    if (diff >= 0) {
      minutes = diff / 60 | 0;
      seconds = diff % 60 | 0;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.text(minutes + ":" + seconds);
      if (diff === 0 && callback !== null) {
        window[callback]();
        clearInterval(interval);
      }
    }
  }
  timer();
  var interval = setInterval(timer, 1000);
}

mw.hook('wikipage.content').add(function ($content) {
  $content.find('.countdown').each(function () {
    var $this = $(this);
    var seconds = $this.data('seconds');
    var callback = $this.data('callback') ? mw.html.escape($this.data('callback')) : null;
    if (window[callback] && typeof window[callback] === 'function') {
      startTimer(seconds, $this, callback);
    } else {
      startTimer(seconds, $this);
    }
  });
});

// Funciones callback
function finalizado() {
  alert('EL TIEMPO HA ACABADO, AGENTES MEMÉTICOS SERÁN DESPLEGADOS AHORA');
}