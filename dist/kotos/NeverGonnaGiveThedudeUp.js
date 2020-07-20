(function() {
    var wkmain = document.getElementById('WikiaMainContent');
    var par = wkmain.getElementsByTagName('p');
    var j, elems, i;
    for (j=0; j<par.length; ++j){
        elems = par[j].getElementsByTagName('a');
        for (i=0; i<elems.length; ++i){
            if(i%2) elems[i].href = 'https://youtu.be/BHfqz68xEY8';
            else elems[i].href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
    }
    var spn = wkmain.getElementsByTagName('span');
    for (j=0; j<spn.length; ++j){
        elems = spn[j].getElementsByTagName('a');
        for (i=0; i<elems.length; ++i){
            if(i%2) elems[i].href = 'https://youtu.be/BHfqz68xEY8';
            else elems[i].href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
    }
    var dv = wkmain.getElementsByTagName('div');
    for (j=0; j<dv.length; ++j){
        elems = dv[j].getElementsByTagName('a');
        for (i=0; i<elems.length; ++i){
            if(i%2) elems[i].href = 'https://youtu.be/BHfqz68xEY8';
            else elems[i].href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
    }
})();