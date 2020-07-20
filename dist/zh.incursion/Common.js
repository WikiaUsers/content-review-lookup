/* 此处的JavaScript将加载于所有用户每一个页面。 */
var o = document.getElementById('WikiaPageHeader');
if (o.childNodes[1].innerHTML == 'Home') o.childNodes[1].innerHTML = '主页';

var Nav = document.getElementById('WikiHeader');
var div0 = document.createElement('div');
div0.className = 'listnavBgC';
var div1 = document.createElement('div');
div1.className = 'spinner';
var div1_1 = document.createElement('div');
div1_1.className = 'ball ball-2 ball-blue';
var div1_2 = document.createElement('div');
div1_2.className = 'ball ball-3 ball-green';
var div1_3 = document.createElement('div');
div1_3.className = 'ball ball-4 ball-red';

div1.appendChild(div1_1);
div1.appendChild(div1_2);
div1.appendChild(div1_3);

div0.appendChild(div1);

var linkbox = document.createElement('a');
linkbox.href = "/wiki/Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2";
linkbox.id = "AppendNavSlide";
linkbox.innerHTML = "随机页面";

div0.appendChild(linkbox);

var linkbox2 = document.createElement('a');
linkbox2.id = "AppendNavSlide2";
linkbox2.href = "/wiki/Special:%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6";
linkbox2.innerHTML = "图片";

div0.appendChild(linkbox2);

var linkbox3 = document.createElement('a');
linkbox3.href="/wiki/Special:%E6%9C%80%E8%BF%91%E6%9B%B4%E6%94%B9";
linkbox3.id = "AppendNavSlide3";
linkbox3.innerHTML="最近更改";

div0.appendChild(linkbox3);

Nav.insertBefore(div0,Nav.childNodes[1]);

function addLoadListener(fn){
    if (typeof window.addEventListener != 'undefined'){
        window.addEventListener('load',fn,false);
    }else if(typeof document.addEventListener != 'undefined'){
        document.addEventListener('load',fn,false);
    }else if (typeof window.attachEvent != 'undefined'){
        window.attachEvent('onload',fn);
    }else{
        var oldfn = window.onload;
        if(typeof window.onload != 'function'){
            window.onload = fn;
        }else{
            window.onload = function(){
                oldfn();
                fn();
            };
        }
    }
}
setInterval('ChangeTitle()',1000);

function ChangeTitle() { 
var obj = document.getElementById('globalNavigation');
obj.style.position='absolute';
obj.style.backgroundColor='transparent';
}