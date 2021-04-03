(function() {
var fn = {};
/* functions */
// get file list from [[Club Penguin Island/Music]]
fn.getFileList = function(obj, offset, cb) {
	var a = new XMLHttpRequest();
	a.open("GET", "/api.php?action=query&format=json&prop=images&imlimit=max&titles=Club_Penguin_Island/Music" + (typeof offset === "string" ? "&imcontinue=" + encodeURIComponent(offset) : "") + "&cb=" + new Date().getTime(), true);
	a.onload = function() {
		var b = JSON.parse(a.responseText),
			c,
			pageid,
			i;
		obj = Array.isArray(obj) ? obj : [];
		for (pageid in b.query.pages) {
			c = b.query.pages[pageid].images;
			for (i = 0; i < c.length; i++) {
				obj.push(c[i].title);
			}
		}
		if (b.hasOwnProperty("query-continue")) {
			fn.getFileList(obj || {}, b["query-continue"].images.imcontinue, cb);
		} else {
			cb(obj);
		}
	}
	a.send();
}

// remove irrelevant files
fn.filterFileList = function(list, cb) {
	for (var i = 0, a, /*whitelist = {bass: [], chords: [], drums: []}*/whitelist = []; i < list.length; i++) {
		a = list[i];
		if (/CPI ClothingDesigner (?:Bass|Chords|Drums) \d+\.[oO][gG]{2}$/.test(a)) {
			whitelist.push(a);
		}
	}
	cb(whitelist);
}

// convert array of file titles to list of files with their title and url properties
fn.getFileUrls = function(filelist, output, offset, cb) {
	var a = new XMLHttpRequest(),
		reqLim = 50; // prevent requests too long
	a.open("GET", "/api.php?action=query&format=json&prop=imageinfo&iiprop=url&iilimit=2&titles=" + encodeURIComponent(filelist.splice(0, reqLim).join("|")) + (typeof offset === "string" ? "&iicontinue=" + encodeURIComponent(offset) : "") + "&cb=" + new Date().getTime(), true);
	a.onload = function() {
		output = Array.isArray(output) ? output : [];
		var b = JSON.parse(a.responseText),
			c,
			pageid,
			i;
		console.warn(b);
		for (pageid in b.query.pages) {
			c = b.query.pages[pageid];
			//console.log(c, c.imageinfo);
			for (i = 0; i < c.imageinfo.length; i++) {
				if (c.imageinfo[i].hasOwnProperty("url")) {
					output.push({
						title: c.title,
						url: c.imageinfo[i].url
					});
					break;
				}
			}
		}
		if (filelist.length > 0) {
			fn.getFileUrls(filelist, output, offset, cb);
		} else {
			cb(output);
		}
	}
	a.send();
}

// categorize files by (bass, chords, drums)
fn.categorizeFiles = function(list) {
	var a = {bass: [], chords: [], drums: []},
		b,
		i;
	for (i = 0; i < list.length; i++) {
		b = list[i];
		if (b.title.indexOf("Bass") > -1) {
			a.bass.push(b);
			continue;
		}
		if (b.title.indexOf("Chords") > -1) {
			a.chords.push(b);
			continue;
		}
		if (b.title.indexOf("Drums") > -1) {
			a.drums.push(b); // lol accidentally called it "drumps" when was originally in 'fn.getFileUrls'
			continue;
		}
	}
	return a;
}

// create audio files
fn.createAudio = function() {
	var a = {};
	a.bass = document.createElement("audio");
	//a.bass.autoplay = true;
	a.chords = a.bass.cloneNode();
	a.drums = a.bass.cloneNode();
	return {
		nodes: a,
		state: false
	};
}

// get random track
fn.getRandomTrack = function(tracks) {
	return {
		bass: tracks.bass[Math.floor(Math.random() * tracks.bass.length)],
		chords: tracks.chords[Math.floor(Math.random() * tracks.chords.length)],
		drums: tracks.drums[Math.floor(Math.random() * tracks.drums.length)]
	};
}

// play song
fn.play = function(audio) {
	if (audio.state) {
		for (var a in audio.nodes) {
			audio.nodes[a].play();
		}
	}
}

// pause song
fn.pause = function(audio) {
	if (!audio.state) {
		for (var a in audio.nodes) {
			audio.nodes[a].pause();
		}
	}
}

// add 'canplaythrough' listener
fn.prepareResources = function(audio, track) {
	var status = 0;
	for (var n in audio.nodes) {
		audio.nodes[n].pause();
		audio.nodes[n].currentTime = 0;
		audio.nodes[n].oncanplaythrough = function() {
			console.log("y");
			if (++status == 3) {
				fn.play(audio);
			}
		}
		//document.body.appendChild(audio[n]);
		audio.nodes[n].src = track[n].url;
	}
}

// play random song and start over when it ends
fn.loopRandom = function(nav, audio, tracks) {
	console.log("x");
	var randomTrack = fn.getRandomTrack(tracks);
	fn.prepareResources(audio, randomTrack);
	for (var i in audio.nodes) {
		audio.nodes[i].onended = fn.loopRandom.bind(this, nav, audio, tracks);
		nav.querySelector('[data-cpim-playlist-category="' + i + '"]').textContent = randomTrack[i].title.match(/(?:Bass|Chords|Drums) \d+/)[0];
	}
}

// create interface
fn.createInterface = function() {
	var nav = document.createElement("nav"),
		temp;
	nav.id = "cpim-playlist";
	nav.style.cssText = "position: fixed; top: 120px; right: 20px; z-index: 999999999; padding: 0 2px 0 28px; background: #fafafa; border: 1px solid #ccc; border-radius: 3px;";
	temp = new Image();
	temp.width = temp.height = 16;
	temp.style.cssText = "position: absolute; top: 6px; left: 6px; background-color: #ccc; border-radius: 2px; vertical-align: text-bottom; cursor: pointer;";
	nav.appendChild(temp);
	temp = document.createTextNode("Clothing Customizer mix: ");
	nav.appendChild(temp);
	temp = document.createElement("br");
	nav.appendChild(temp);
	temp = document.createElement("span");
	temp.className = "cpim-playlist-category";
	temp.setAttribute("data-cpim-playlist-category", "bass");
	nav.appendChild(temp);
	temp = temp.cloneNode();
	temp.setAttribute("data-cpim-playlist-category", "chords");
	temp.style.marginLeft = "3px";
	nav.appendChild(temp);
	temp = temp.cloneNode();
	temp.setAttribute("data-cpim-playlist-category", "drums");
	nav.appendChild(temp);
	return nav;
}

// initiate
fn.init = function() {
	fn.getFileList(null, null, function(allfiles) {
		fn.filterFileList(allfiles, function(musiclist) {
			fn.getFileUrls(musiclist, null, null, function(urllist) {
				var tracks = fn.categorizeFiles(urllist),
					audio = fn.createAudio(),
					nav = fn.createInterface(),
					btn = nav.querySelector("img"),
					nextSong = fn.loopRandom.bind(null, nav, audio, tracks);
				nextSong();
				btn.src = audio.state ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/16px-Media-playback-pause.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Media-playback-start.svg/16px-Media-playback-start.svg.png";
				btn.addEventListener("click", function() {
					btn.src = audio.state ? "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Media-playback-start.svg/16px-Media-playback-start.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/16px-Media-playback-pause.svg.png";
					for (var i in audio.nodes) {
						audio.nodes[i][audio.state ? "pause" : "play"]();
					}
					audio.state = !audio.state;
					fn[audio.state ? "play" : "pause"](audio);
				});
				document.body.appendChild(nav);
			});
		});
	});
}

/* implement */
fn.init();
}());