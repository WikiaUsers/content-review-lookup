window.jobski              = {
  elem:document.createElement("img"),
  started:false,
  pos:{x:window.innerWidth,y:window.innerHeight/2
  },
  start:function(){
    if(!this.started) {
      this.started = true;
      
    }
  },
  update: function() {
    if(jobski.started) {
      jobski.pos.x-=1.5;
      jobski.pos.y=(window.innerHeight/2)+(50*Math.sin(Date.now()/500));
      if(jobski.pos.x < -200) {
        jobski.started = false;
        jobski.pos.x = window.innerWidth;
      }
    }
    jobski.elem.style.position = "fixed";
    jobski.elem.style.top=jobski.pos.y+"px";
    jobski.elem.style.left=jobski.pos.x+"px";
    
  }
};

if(Math.random()<0.06){
	jobski.start();
}
jobski.elem.src="https:\/\/static.wikia.nocookie.net\/part-time-ufo\/images\/3\/3c\/Standard_Jobski.gif\/revision\/latest?cb=20231002224424";
jobski.elem.style.overflow   = "hidden";
jobski.elem.style.zIndex = "99999999";
jobski.inter=setInterval(jobski.update, 10);
document.documentElement.appendChild(jobski.elem);