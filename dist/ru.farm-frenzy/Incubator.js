$(createboxNoPrefix)

function createboxNoPrefix(){
    function getHandler(a){ // because IE6’s “this” is broken
        return function(){
            span = a.getElementsByTagName('span')[0]
            tit = a.title
            tit.value = span.innerHTML + tit.value
            span.parentNode.removeChild(span)
        }
    }

    var frm = document.getElementById('createboxes')
    if (!frm) return
    frm = frm.getElementsByTagName('form')
    for (var i = 0; i < frm.length; i++) {
        var tl = frm[i].title
        if (!/.\/$/.test(tl.value)) return
        sp = document.createElement('span')
        tl.size -= tl.value.length
        sp.innerHTML = tl.value
        tl.value = ''
        tl.parentNode.insertBefore(sp, tl)
        addHandler(frm[i], 'submit', getHandler(frm[i]))
    }
}