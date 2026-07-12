/* Any JavaScript here will be loaded for all users on every page load. */
// character dialogue (stupid editor with no syntax highlighting D:)
mw.hook("wikipage.content").add(function($content) {	
	if (!$content || !$content[0]) return;
	
	const dialogue_boxes = $content[0].querySelectorAll(".char_dialogue_box");
	dialogue_boxes.forEach(box => {
		if (box.dataset.initialized) return;
		box.dataset.initialized = "true";
		
		const raw = box.querySelector(".char_dialogue_raw_data");
		if (!raw) return;
		let data;
		try {
			data = JSON.parse(raw.textContent.trim());
		} catch(e) {
			console.error(e);
			return;
		}
		const startk = data.start ? "start" : Object.keys(data)[0];
		
		
		const espeaker = box.querySelector(".char_dialogue_speaker");
		const etext = box.querySelector(".char_dialogue_text");
		const eopts = box.querySelector(".char_dialogue_opts");
		
		let db;
		if (getComputedStyle(box).position === "static") {
			box.style.position = "relative";
		}
		let pending = [];
		
		function show(active) {
			if (!active) return;
			pending.forEach(timeout => clearTimeout(timeout));
			buttonTimeouts = [];
			eopts.innerHTML = "";
			clearTimeout(db);
			espeaker.textContent = active.speaker || "";
			etext.textContent = "";
			const fullText = active.text || "";
			let idx = 0;
			const speed = 10;
			
			function type() {
				if (idx < fullText.length) {
					etext.textContent += fullText.charAt(idx);
					idx++;
					db = setTimeout(type, speed);
				}
			}
			type();
				
			if(active.choices) {
				Object.values(active.choices).forEach((choice, index)=> {
					const text = choice.text || "";
					const next = choice.next || "";
					const button = document.createElement("button");
					button.className = "dialogue_option_button";
					button.textContent = text;
					button.addEventListener("click", (e) => {
						e.preventDefault();
						show(data[next]);
					});
					const t = setTimeout(() => {
						eopts.appendChild(button);
					}, index * 500);
					
					pending.push(t);
				});
			}
		}
		
		if (startk) {
			show(data[startk]);
		}
	});
});