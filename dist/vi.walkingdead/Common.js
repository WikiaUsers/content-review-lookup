/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importArticles({
    type: "style",
    articles: [
        "w:c:dev:Highlight/code.css"
    ]
});

!document.querySelectorAll&&document.createStyleSheet&&function(n,t){n=document;t=n.createStyleSheet();n.querySelectorAll=function(i,r,u,f,e){for(e=n.all,r=[],i=i.split(","),u=i.length;u--;){for(t.addRule(i[u],"k:v"),f=e.length;f--;)e[f].currentStyle.k&&r.push(e[f]);t.removeRule(0)}return r}}();var qp={obj:function(n,t){var r=n.substr(0,1),u,i;if(r=="."||r=="#"||r=="["||t){if(n=document.querySelectorAll(n),n.length==0)return!1;if(n.length==1)return n[0];for(u=[],i=0;i<n.length;i++)u.push(n[i]);return u}return document.getElementById(n)},addE:function(n,t,i){var r;if(typeof n=="string"&&(n=obj(n)),t instanceof Array){for(r in t)qp.addE(n,t[r],i);return}if(n instanceof Array)for(r in n)qp.addE(n[r],t,i);else{if(!n)return;if(t=="tclick"){qp.addE(n,"click",i);n.touchEvt=function(n){if(document.moveing)return!1;i(n);n.preventDefault()};attachE(n,"touchstart",n.touchEvt);return}n.addEventListener?n.addEventListener(t,i,!0):(t=="DOMContentLoaded"&&(n=window,t="load"),n.attachEvent("on"+t,i))}},init:function(){for(var t=document.querySelectorAll("A[poll]",1),i,n=0;n<t.length;n++)!t[n].loaded&&t[n].href.indexOf("http://www.poll-maker.com")!=-1&&t[n].innerHTML&&(i=document.createElement("IFRAME"),i.src="//www.poll-maker.com/frame"+t[n].getAttribute("poll")+"#"+document.location,i.style.cssText="border:0px; background:transparent; width:"+getComputedStyle(t[n]).width+"; height:0px; opacity:0; overflow:visible; -webkit-transition:height 150ms ease-out,opacity 100ms ease-out 150ms; transition:height 150ms ease-out,opacity 100ms ease-out 150ms; -moz-transition:height 150ms ease-out,opacity 100ms ease-out 150ms",i.setAttribute("seamless","seamless"),i.setAttribute("frameborder","no"),i.setAttribute("scrolling","no"),qp.addE(t[n],"load",function(){return function(){}}(i)),qp.addE(window,"message",function(n){return function(t){(t.origin+"").indexOf(".poll-maker.com")!=-1&&(n.style.height=parseInt(t.data)+10,n.style.opacity=1)}}(i)),t[n].parentNode.insertBefore(i,t[n]),t[n].loaded=!0)}};"loaded;interactive;complete".indexOf(document.readyState)!=-1?qp.init():qp.addE(document,"DOMContentLoaded",qp.init)