var bg = {
    elem: {
        name: element,
        event: {
            type: ev_type,
            handler: ev_handler
        },
        attrib: {
            name: attr_nam,
            val: attr_val
        }
    },
    col: {
        color: bg_color,
        gradient: bg_grad,
        opac: bg_opacity
    }
};

function activateLib(lib){
    var el = document.createElement(bg.elem.name);
    for (var e = 0; e < bg.elem.attrib.length; e++){
        el.setAttribute(bg.elem.attrib.name[e], bg.elem.attrib.val[e]);
    }

    if (window.addEventListener) bg.elem.name.addEventListener(bg.elem.event.type, bg.elem.event.handler);
    else if (window.attachEvent) bg.elem.name.attachEvent(bg.elem.event.type, bg.elem.event.handler);

    el.style.background = bg.col.color;
    el.style.background = '-moz-linear-gradient(' + bg.col.gradient.mozLinearGradient + ')';
    el.style.background = '-webkit-gradient(' + bg.col.gradient.webkitGradient + ')';
    el.style.background = '-webkit-linear-gradient(' + bg.col.gradient.webkitLinearGradient + ')';
    el.style.background = '-ms-linear-gradient(' + bg.col.gradient.msLinearGradient + ')';
    el.style.background = '-o-linear-gradient(' + bg.col.gradient.oLinearGradient + ')';
    el.style.background = 'linear-gradient(' + bg.col.gradient.linearGradient + ')';
    el.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(' + bg.col.gradient.msieGradient + ')';
    el.style.opacity = bg.col.opac;

    lib.appendChild(el);
}

$(document).ready(activateLib);