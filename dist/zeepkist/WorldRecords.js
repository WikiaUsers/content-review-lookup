/* 
	Inject the current World Record time and its author to the Levels infobox.
	Data provided by the Zeepkist GTR API.
*/
mw.loader.using(['mediawiki.util','mediawiki.api'], function() {
	const infoboxes = document.querySelectorAll('.type-level');
	
	function getWorldRecord(levelUid) {
		const URL = 'https://zeep.tnrd.net/records?LevelUid=' + levelUid + '&BestOnly=true&Limit=1';
		try {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', URL, false);
			xhr.send();
			if (xhr.status != 200) {
    			console.error('Error' + xhr.status + ': ' + xhr.statusText);
			} else {
    			const data = JSON.parse(xhr.response);
    			const record = data.records[0]
    			const time = data.records[0].time;
    			return {
    				dateCreated: record.dateCreated,
    				gameVersion: record.gameVersion,
    				screenshotUrl: record.screenshotUrl,
    				time: record.time,
    				displayName: record.user.steamName,
    				steamId: record.user.steamId
    			};
			}
		} catch(err) {
			console.error("Request failed", err);
		}
	}
	
	function pad (num, size) {
		return ('000' + num).slice(size * -1);
	}
	
	function sec2time(timeInSeconds) {
    	const time = parseFloat(timeInSeconds).toFixed(5);
    	const hours = Math.floor(time / 60 / 60);
    	const minutes = Math.floor(time / 60) % 60;
    	const seconds = Math.floor(time - minutes * 60);
    	const milliseconds = time.slice(-5);
    	var string = '';
    	
    	if (hours) string += pad(hours, 2) + ':';
		return string += pad(minutes, 2) + ':' + pad(seconds, 2) + '.' + pad(milliseconds, 5);
	}
	
	for (var i = 0; i < infoboxes.length; i++) {
		const infobox = infoboxes[i];
		const bronzeNode = infobox.querySelector('[data-source="time_bronze"]');
		const uidNode = infobox.querySelector('.level-uid');
		
		// Ignore infoboxes with no medal times
		if (!bronzeNode) continue;
		
		const levelUid = uidNode.dataset.uid;
		if (levelUid === '{{{uid}}}') {
			const missingUidNode = document.createElement('div');
			missingUidNode.classList.add('pi-item', 'pi-data', 'pi-item-spacing', 'pi-border-color');
			missingUidNode.textContent = '⚠️ Displaying World Record time requires uid field in template';
			bronzeNode.parentNode.appendChild(missingUidNode);
			continue;
		}
		const worldRecordData = getWorldRecord(levelUid);
		
		const recordNode = document.createElement('div');
		recordNode.classList.add('pi-item', 'pi-data', 'pi-item-spacing', 'pi-border-color');
		recordNode.dataset.source = 'time_wr';
		
		const recordLabelNode = document.createElement('h3');
		recordLabelNode.classList.add('pi-data-label', 'pi-secondary-font');
		recordLabelNode.textContent = 'World Record';
		recordNode.appendChild(recordLabelNode);
		
		const recordAuthorLabelNode = document.createElement('div');
		recordAuthorLabelNode.textContent = 'By ';
		
		const recordAuthorNode = document.createElement('a');
		recordAuthorNode.classList.add('world-record-author');
		recordAuthorNode.textContent = worldRecordData.displayName;
		recordAuthorNode.href = 'https://steamcommunity.com/profiles/' + worldRecordData.steamId;
		recordAuthorLabelNode.appendChild(recordAuthorNode);
		
		const recordProofNode = document.createElement('a');
		recordProofNode.classList.add('world-record-proof');
		recordProofNode.textContent = '(Proof)';
		recordProofNode.href = worldRecordData.screenshotUrl;
		
		const recordValueNode = document.createElement('div');
		recordValueNode.classList.add('pi-data-value', 'pi-font');
		recordValueNode.textContent = sec2time(worldRecordData.time) + ' ';
		recordValueNode.appendChild(recordProofNode);
		recordValueNode.appendChild(recordAuthorLabelNode);
		recordNode.appendChild(recordValueNode);
		
		bronzeNode.parentNode.appendChild(recordNode);
	}
});