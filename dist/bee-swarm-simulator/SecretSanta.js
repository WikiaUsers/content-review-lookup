const dataPage = 'Project:SecretSanta.json';

//seedable random function
function splitmix32(a) {
	return function() {
		a |= 0;
		a = a + 0x9e3779b9 | 0;
		let t = a ^ a >>> 16;
		 t = Math.imul(t, 0x21f0aaad);
		t = t ^ t >>> 15;
		t = Math.imul(t, 0x735a2d97);
		return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
	};
}

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

var seed = cyrb128("Beesmas2025")[1],
    rand = splitmix32(seed);

//shuffling the list
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function generateDerangement(list) {
	while (true) {
		let shuffle = shuffleArray(list.slice(0));
		let isDerangement = true;
		for (let i = 0; i < list.length; i++) {
			if (list[i] == shuffle[i]) {
				isDerangement = false;
				break;
			}
		}
		if (isDerangement) return shuffle;
	}
}

function openLetter() {
	document.getElementById("beesmas-letter-opener").style.display = "none";
	document.getElementById("beesmas-letter-background").style.display = "grid";
}

function generateMessage(user, giftUser) {
	let messageWrapper = document.createElement("div");
	messageWrapper.id = "secret-santa-message";
	
	let messageOpener = document.createElement("a");
	messageOpener.id = "beesmas-letter-opener";
	messageOpener.addEventListener("click", openLetter);
	messageOpener.innerText = "You've received a new letter. Open it?";
	
	let url = mw.util.getUrl("Message_Wall:"+mw.util.escapeIdForLink(giftUser));
	let beesmasLetter = document.createElement("div");
	beesmasLetter.id = "beesmas-letter-background";
	beesmasLetter.style.display = "none";
	beesmasLetter.innerHTML = `
Ho ho ho! You, ${user}, are reading a letter made by yours truly, the very mascot of Beesmas, Bee Bear! <br/>
<br/>
Every year, on this faithful month, we return to this beautiful mountain to spread the spirit of the holiest holiday of them all! Presents, Ornaments, all the Beesmas Cheer you can find, given to everyone around this land. <br/>
<br/>
Though, for this year, we're a little... short on staff. Which is why I am going to personally teach you how to create a Present, the Bee Bear-trademarked way! <br/>
<br/> 
All you have to do is create a piece of artwork, fanfiction, or whatever style you want, and put all your love and Festive Blessing and Beesmas Cheer into it! If you do it just right, the Bubble Bee Man may just gift you something in return!<br/>
<br/>
<div id="beesmas-letter-big">
Try it yourself! Create a present for <a href="${url}">${giftUser}</a>! Be quick, we haven't got all year!
</div>
<br/>
\~\~\~ The Mascot of Beesmas, Bee Bear \~\~\~ <br/>`;

	messageWrapper.append(messageOpener, beesmasLetter, document.createElement("hr"));
	return messageWrapper;
}

//main
$(function() {
	mw.loader.using([ 'mediawiki.api', 'mediawiki.util', 'mediawiki.user', 'mediawiki.Title']).then(function () {
		let url = mw.util.wikiScript(),
			params = {
				action: 'raw',
				title: dataPage
			};
		var retData = "";
		
		jQuery.get(url, params, function(data) {
			if (!data.length) return;
			try {
				retData = JSON.parse(data);
				if (!retData) {
					throw new Error("no data dectected, check " + dataPage + " for errors");
				}
			}
			catch (err) {
				throw new Error("error when parsing JSON, check " + dataPage + " for errors\n" + err);
			}
			
		}).fail(function() {
			throw new Error("data page does not exist, check " + dataPage + " for errors");
		}).done(function() {
			let config = mw.config.get([ 'wgTitle', 'wgNamespaceNumber', 'wgUserName' ]);
			console.log(config);
			console.log(retData);
			if (config.wgNamespaceNumber != 1200 || config.wgTitle != config.wgUserName) return;
		
			let today = new Date(),
			    user = config.wgUserName,
			    batch, beesmasDate;
			if (retData.batch1 && retData.batch1.includes(user)) {
				batch = retData.batch1;
				beesmasDate = new Date(2025, 11, 1, 6); // 6 am utc = 12 am cst, leaderboard reset time
			}
			else if (retData.batch2 && retData.batch2.includes(user)) {
				batch = retData.batch2;
				beesmasDate = new Date(2025, 11, 11, 6);
			}
			else return;
			if (today < beesmasDate && !retData.forceActivate) return;
			
			console.log(batch);
			
			let shuffledBatch = generateDerangement(batch),
				giftUser = shuffledBatch[batch.indexOf(user)],
				message = generateMessage(user, giftUser);
			document.getElementById("MessageWall").prepend(message);
			console.log("completed");
		});
	});
});