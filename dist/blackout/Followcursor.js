document.addEventListener('mousemove', function(ev){
    document.getElementById('followcursor').style.transform = 'translateY('+(ev.clientY-80)+'px)';
    document.getElementById('followcursor').style.transform += 'translateX('+(ev.clientX-100)+'px)';            
},false);