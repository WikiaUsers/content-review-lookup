/*
 * Autor: Rodri_cyberdog
 * Compartido bajo Licencia Fair-Use
 */

/* Lee un valor del cookie */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}

/* Comprime los datos de un documento para ser almacenado 
 * como variable en un cookie */
function compressTasks(tasks) {
    tasks = tasks.replace('<p>', '');
    val = tasks.split('</p>');
    tasks = val[0];
    val = tasks.split('|');
    tasks = parseInt(0);
    i_length = val.length;
    for (i = 0; i < i_length; i++) {
        temp = val[i].replace('\n', '');
        temp = temp.split(' ');
        j_length = temp.length;
        for (j = 0; j < j_length; j++) {
            char = temp[j].substring(0, 1).charCodeAt(0);
            if (!isNaN(parseInt(char))) {
                tasks = parseInt(tasks) + parseInt(char);
            }
        }
    }
    return tasks;
}

/* Verifica cada 5 minutos si hay cambios con respecto */
function verify(proyecto) {
    /* Detecta si panelTareas está en la página */
    panelTareas = document.getElementById('panelTareas' + proyecto);
    if (!(typeof panelTareas == 'undefined' || panelTareas == null)) {
        /* Registra cambios en el proyecto */
        ajaxTasks(proyecto, true, false);
    } else {
        /* Verifica cambios el proyecto */
        verifyProject(proyecto);
    }
}

function verifyProject(proyecto) {
    checktime = getCookie('check' + proyecto);
    if (!checktime) {
        checktime = 0;
    }
    var time = new Date();
    /* Calcula el tiempo actual con el de la última revisión */
    var seconds = checktime - time.getTime();
    if (seconds <= 0) {
        /* Si la diferencia de tiempo es menor o igual a cero, revisa */
        ajaxTasks(proyecto, false, true);
    }
}

/* Verifica cada 5 minutos si hay cambios con respecto */
function verifyChanges(proyecto, tasks) {
    checktasks = getCookie(proyecto);
    if (!checktasks) {
        checktasks = '';
    }
    if (parseInt(checktasks) !== parseInt(tasks)) {
        notification(proyecto);
    } else {
        /* Revisar en otros 5 minutos más */
        setCookieTime(proyecto);
    }
}

/* Lee un artículo y devuelve los datos comprimidos para ser
 * comparado con un cookie o almacenado en uno */
function ajaxTasks(proyecto, registry, purge) {
    var e;
    if (window.XMLHttpRequest) {
        e = new XMLHttpRequest;
    } else {
        e = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var action = '';
    if(purge === true) {
        action = "purge";
    } else {
        action = "render";
    }

    e.onreadystatechange = function() {
        if (e.readyState == 4) {
            if (e.status == 200) {
                if (purge) {
                    /* Después de purgar, vuelve a llamar a esta función */
                    ajaxTasks(proyecto, registry, false);
                } else {
                    /* La segunda vez, realiza la acción */
                    response = e.responseText;
                    var tasks = compressTasks(response);
                    if (registry) {
                        /* registra */
                        setCookieTasks(proyecto, tasks);
                    } else {
                        /* compara */
                        verifyChanges(proyecto, tasks);
                    }
                }
            }
        }
    };

    e.open("POST", "http://zeistantilles.wikia.com/wiki/Plantilla:PanelAjax/" + proyecto + "?action=" + action, true);
    e.send();
}

/*
 * Configura el cookie para revisar cada 5 minutos y así evitar revisar
 * cada vez que se ejecuta el script
 */
function setCookieTime(proyecto) {
    var check = new Date();
    var expire = new Date();
    var checktime = check.getTime();
    var expiretime = expire.getTime();
    checktime += 5 * 60 * 1000;
    expiretime += 30 * 24 * 60 * 60 * 1000;
    check.setTime(checktime);
    expire.setTime(expiretime);
    document.cookie =
            'check' + proyecto + '=' + checktime +
            '; expires=' + expire.toUTCString() +
            '; path=/';
}

/* Guarda en el cookie los cambios detectados en el proyecto */
function setCookieTasks(proyecto, tasks) {
    var expire = new Date();
    var expiretime = expire.getTime();
    expiretime += 30 * 24 * 60 * 60 * 1000;
    expire.setTime(expiretime);
    document.cookie =
            proyecto + '=' + tasks +
            '; expires=' + expire.toUTCString() +
            '; path=/';
    /* Configura el reloj para que revise en 5 minutos más */
    setCookieTime(proyecto);
}

/* Muestra notificación (con un desfase de 1 segundo) */
function notification(proyecto) {
    if (proyecto === 'Ayuda') {
        setTimeout(function() {
            setNotification('Ayuda');
        }, 1000);
    }
}

/* Crea u obtiene WikiaNotifications para añadirle mensajes */
function setNotification(proyecto) {
    li = document.createElement('li');
    div = document.createElement('div');
    div.setAttribute('data-type', '2');
    a_close = document.createElement('a');
    a_close.setAttribute('class', 'sprite close-notification');
    a_close.setAttribute('onclick', 'this.parentNode.parentNode.style.display = \'none\';');
    a_message = document.createElement('a');
    /* Mensaje y referencia según proyecto */
    if (proyecto === 'Ayuda') {
        a_message.setAttribute('href', '/wiki/Usuario_Blog:Lord_Eledan/Presentación_del_SGT:_Sistema_de_Gestión_de_Tareas?action=purge');
        a_message.innerHTML = 'El proyecto Librarium tiene modificaciones.';
    } else {
        a_message.setAttribute('href', '/wiki/Plantilla:PanelTareas/' + proyecto + '?action=purge');
        a_message.innerHTML = 'El proyecto ' + proyecto + ' tiene modificaciones.';
    }
    div.appendChild(a_close);
    div.appendChild(a_message);
    li.appendChild(div);
    WikiaBar = document.getElementById('WikiaBar');
    WikiaNotifications = document.getElementById('WikiaNotifications');
    /* Si WikiaNotification no existe, lo crea. Si existe, le anexa mensaje. */
    if (typeof WikiaNotifications == 'undefined' || WikiaNotifications == null) {
        ul = document.createElement('ul');
        ul.setAttribute('id', 'WikiaNotifications');
        ul.setAttribute('class', 'WikiaNotifications');
        ul.appendChild(li);
        WikiaBar.insertBefore(ul, WikiaBar.firstChild);
    } else {
        WikiaNotifications.appendChild(li);
    }
}

/* Verificar */
if(proyectos !== 'undefined') {
    for (i=0; i<proyectos.length; i++) {
        verify(proyectos[i]);
    }
} else {
    alert('No hay proyectos definidos');
}