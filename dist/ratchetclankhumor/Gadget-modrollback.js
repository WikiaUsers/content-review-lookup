//
addOnloadHook(function() {
        var ds = document.getElementsByTagName('td');
        for(var i=0; i<ds.length; i++) {
                var a = ds[i];
                if(a.className == 'diff-ntitle') {
                        var fs = a.getElementsByTagName('a');
                        for(var j=0; j<fs.length; j++) {
                                var b = fs[j];
                                if(b.firstChild.data == 'rollback') {
                                        var oldhref = ''+b.href;
                                        var usr = b.href.split('from=')[1].split('&')[0];
                                        var cont = wgServer + wgScript + '?title=Special:Contributions/' + usr;
                                        b.href = 'javascript:void(0)';
                                        b.onclick = function() {
                                                var http = sajax_init_object();
                                                http.open('GET', oldhref, true);
                                                http.setRequestHeader("Connection", "close");
                                                http.send(null);
                                                http.onreadystatechange= function() {
                                                        window.location.href = (cont);
                                                }
                                        }
                                }
                        }
                }
        }
});
//