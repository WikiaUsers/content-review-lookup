/* ===== CONTRABAND GLITCH ===== */
function spawnGlitch(el){

	const g = document.createElement("div");
	g.className = "contraband-glitch";
	
	const colors = ["black","blue","purple"];
	g.classList.add(colors[Math.floor(Math.random()*colors.length)]);
	
	const w = 6 + Math.random()*30;
	const h = 3 + Math.random()*12;
	
	g.style.width = w + "px";
	g.style.height = h + "px";
	
	g.style.left = Math.random() * (el.offsetWidth - w) + "px";
	g.style.top  = Math.random() * (el.offsetHeight - h) + "px";

	el.appendChild(g);

	setTimeout(()=>g.remove(),180);
}

/* ===== TEXT JITTER ===== */

function jitterText(el){
	
	for (let i = 0; i <= 2; i++) {

    setTimeout(()=>{

      const x = (Math.random()*10) - 5;
      const y = (Math.random()*5) - 2.5;

      el.style.transform = `translate(${x}px, ${y}px)`;

      setTimeout(()=>{
        el.style.transform = `translate(0,0)`;
      }, 60);

    }, i * 80); 
  }

}

/* ===== START LOOP ===== */

function startGlitch(el){
	
	if(el.dataset.glitchActive) return;
	el.dataset.glitchActive = "1";
	
	function loop(){
		spawnGlitch(el);
		jitterText(el);
		
		setTimeout(loop, 60 + Math.random()*120);
	}
	
	loop();
}

/* ===== INIT ===== */

window.addEventListener("load",function(){
	
	const targets = document.querySelectorAll(
		".contraband, .contraband-bp, ul li:has(.contraband-bp)::marker"
	);
	
	targets.forEach(el=>{
	el.style.position = "relative";
	el.style.display = "inline-block";
	startGlitch(el);
	});
	
});