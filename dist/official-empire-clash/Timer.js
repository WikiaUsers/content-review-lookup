mw.loader.using(['mediawiki.util'], function () {
	$(function () {
		'use strict';
		
		const timerSpan = document.getElementById('update-timer');
		const timerDiv = document.getElementById('timerBox');
		if(!timerSpan || !timerDiv) return;
		
		const targetStr = timerSpan.dataset.target;
		if(!targetStr) {
			timerSpan.textContent = "null";
			return;
		}
		
		const target = new Date(targetStr);
		if(isNaN(target)) {
			timerSpan.textContent = "invalid format";
			return;
		}
		
		const updateOut = () => {
			timerDiv.style.backgroundColor = "rgb(31, 184, 11)";
        	timerDiv.innerHTML = "<span>Update is out!</span>";
		}
		
		const formatRemaining = (ms) => { 
			if(ms <= 0) {
				return "0 days 00:00:00";
			}
			let totalSeconds = Math.floor(ms / 1000); 
			
			const days = Math.floor(totalSeconds / (3600 * 24));
			totalSeconds %= (3600 * 24);
			const h = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			const m = Math.floor(totalSeconds / 60);
			const s = totalSeconds % 60;
			
			const seconds = String(s).padStart(2, "0");
			const minutes = String(m).padStart(2, "0");
			const hours = String(h).padStart(2, "0");
			
			return `${days} days ${hours}:${minutes}:${seconds}`;
		}
		
		const update = (intervalId) => {
			const now = new Date();
			const diff = target - now;
			
			if(diff <= 0) {
				clearInterval(intervalId);
				updateOut();
				return;
			}
			
			const remainingText = formatRemaining(diff);
			timerSpan.textContent = remainingText;
		}
		
		const iv = setInterval(() => {
			update(iv);
		}, 1000);
		
		update(iv);
	})
})