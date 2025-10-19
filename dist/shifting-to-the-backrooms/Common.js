/* Any JavaScript here will be loaded for all users on every page load. */
switch ( mw.config.get('wgPageName') ) {
    case 'Дом':
    	document.addEventListener("DOMContentLoaded", function() {
		  const el = document.getElementById("Cabsmoork");
		  if (!el) return;
		  if (el.textContent !== "Cabsmoork") return;
		
		  el.addEventListener("click", function() {
		    const finalText = "Backrooms";
		    const duration = 1000; // длительность анимации в мс
		    const interval = 50;   // как часто меняются буквы (в мс)
		    const letters = "cCaAbBsSmMoOrRkK";
		    const startTime = performance.now();
		
		    const scramble = setInterval(() => {
		      const elapsed = performance.now() - startTime;
		
		      if (elapsed < duration) {
		        // создаём строку из случайных символов
		        let randomText = "";
		        for (let i = 0; i < finalText.length; i++) {
		          randomText += letters[Math.floor(Math.random() * letters.length)];
		        }
		        el.textContent = randomText;
		      } else {
		        clearInterval(scramble);
		        el.textContent = finalText;
		      }
		    }, interval);
		  });
		});

        break;
}