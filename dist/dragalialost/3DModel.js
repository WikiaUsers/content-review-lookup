mw.hook('wikipage.content').add(function() {
	var types = {
		drk: 'https://dgk3593.github.io/dl-model/#/id=%s/showAC=false/showSettings=false/bg=transparent/AA=true',
		notte: 'https://mushymato.github.io/dl-fbx/#/%s'
	};
	var reportURL = {
		drk: 'https://github.com/dgk3593/dl-model/issues',
		notte: 'https://github.com/mushymato/dl-fbx/issues'
	};
	function addFrame(ele, type, name) {
		var frame = document.createElement("iframe");
		frame.width = "400px";
		frame.height = "400px";
		frame.style.border = "none";
		frame.allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;";
		frame.setAttribute("allowvr", "yes");
		frame.allowfullscreen = true;
		frame.onmousewheel = "";
		frame.src = types[type].replace('%s',name);
		var a = document.createElement("a");
		a.innerText = "here";
		a.href = frame.src;
		var a_report = document.createElement("a");
		a_report.innerText = "here";
		a_report.href = reportURL[type];
		var s = document.createElement("span");
		s.style.fontSize = "0.8em";
		s.innerHTML = "Click ";
		s.appendChild(a);
		s.innerHTML += " if model fails to load. Report any missing models ";
		s.appendChild(a_report);
		s.innerHTML += ".";
		ele.appendChild(frame);
		ele.appendChild(document.createElement('br'));
		ele.appendChild(s);
	}
	function addModellBtn(ele, type, name) {
		var l = document.createElement("a");
		l.innerText = "Load 3D Model";
		l.onclick = function() {
			l.style.display = "none";
			addFrame(ele, type, name);
		};
		ele.appendChild(l);
	}

	var drkModels = document.getElementsByClassName("modelViewerDgk");
	var notteModels = document.querySelectorAll('div[id^="modelViewer"]');
	for (var id = 0; id < drkModels.length; id++) {
		addModellBtn(drkModels[id], 'drk', drkModels[id].dataset.id);
	}
	for (var id2 = 0; id2 < notteModels.length; id2++) {
		addModellBtn(notteModels[id2], 'notte', notteModels[id2].dataset.id);
	}
});