if(document.getElementById('MathJax')==null){
    exit();
}
else{
    var head= document.getElementsByTagName('head')[0];
    var script=document.createElement('script');
        script.type='text/javascript';
        script.src='http://dl.dropboxusercontent.com/u/24822958/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
        head.appendChild(script);
    var config1=document.createElement('script');
        config1.type='text/x-mathjax-config';
        config1.innerHTML='MathJax.Hub.Config({tex2jax:{inlineMath:[["$","$"],["\\\\(","\\\\)"]]}});';
        head.appendChild(config1);
    var config2=document.createElement('script');
        config2.type='text/x-mathjax-config';
        config2.innerHTML='MathJax.Hub.Config({TeX:{equationNumbers:{autoNumber:"AMS"}}});';
        head.appendChild(config2);
}
if(document.getElementById('cancel')!=null){
    var config3=document.createElement('script');
        config3.type='text/x-mathjax-config';
        config3.innerHTML='MathJax.Hub.Config({TeX:{extensions:["cancel.js"]}});';
        head.appendChild(config3);
}
if(document.getElementById('xypic')!=null){
    var config4=document.createElement('script');
        config4.type='text/x-mathjax-config';
        config4.innerHTML='MathJax.Hub.Config({extensions:["fp.js"],TeX:{extensions:["xypic.js"]}});';
        head.appendChild(config4);
}