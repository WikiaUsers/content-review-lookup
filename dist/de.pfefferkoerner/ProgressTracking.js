function getTable(id, callback) {
	return new mw.Rest().get('/progress-tracking/table/2064/' + id, null, { 'Content-Type': 'application/json' }).then(callback);
}

function renderStats() {
	var container = document.querySelector('.progress-tracking-summary');
	
	if (container !== null) {
		getTable(container.dataset.table, function (trackingProgress) {
			var statsEl = container.querySelector('.progress-tracking-amount-total');
			container.style.setProperty('--progress-tracking-precentage', Intl.NumberFormat('en-US', { style: 'percent' }).format(trackingProgress.length / +container.dataset.total));
			
			if (statsEl !== null && trackingProgress.length > 0 && trackingProgress.length < +container.dataset.total) {
				statsEl.style.display = 'inherit';
				
				var amountEl = statsEl.querySelector('.progress-tracking-amount');
				if (amountEl !== null) {
					amountEl.textContent = trackingProgress.length;	
				}
				
				var totalEl = statsEl.querySelector('.progress-tracking-total');
				if (totalEl !== null) {
					totalEl.textContent = container.dataset.total;	
				}
			}
				
			var messageEl = container.querySelector('.progress-tracking-message');
			if (messageEl !== null) {
				if (trackingProgress.length === 0) {
					messageEl.append(
						'Du kannst mit ',
						Object.assign(document.createElement('a'), {
							href: mw.util.getUrl('Staffel 1'),
							textContent: 'der ersten Staffel',
						}),
						' oder ',
						Object.assign(document.createElement('a'), {
							href: mw.util.getUrl('Staffel ' + +container.dataset.total),
							textContent: 'der aktuellen',
						}),
						' starten'
					);
				} else if (trackingProgress.length === +container.dataset.total) {
					messageEl.textContent = 'Gratulation! Du hast alle Staffeln durchgeschaut\u{00A0}🎉\nWann steht der nächste Rewatch bei dir an? Und ganz wichtig: Bitte andere Benutzer*innen nicht spoilern\u{00A0}😉';
				}
				
				if (messageEl.textContent.trim().length > 0) {
					messageEl.style.display = 'initial';
				}
			}
		});
	}
}

function shareTable(tableId) {
	mw.loader.using(["oojs-ui-core", "oojs-ui-windows"], function(){ 
		OO.ui.confirm(
			'Sharing your watch history PUBLICLY means, everyone can see it? This comes with benefits, but these benefits come with your watch history public.',
			{ title:  'Do you really want to PUBLICLY share your watch history?' }
		).then(function (confirmed) {
			if (confirmed) {
				var userId = mw.config.get('wgUserId');
				getTable(tableId).then(function (table) {
				  (new mw.Api()).edit('MediaWiki:Custom-ProgressTracking.json', function (page) {
					var json = JSON.parse(page.content);
				    if (typeof json[tableId] === 'undefined') {
				      json[tableId] = {};
				    }
				    json[tableId][userId] = table;
				    return {
				      text: JSON.stringify(json),
				      summary: `Add or edit table data for table ${tableId} of user ${userId}`,
				    };
				  });
				});
			}
		});
	});
}

function renderTable() {
	var tableEl = document.querySelector('.table-progress-tracking');
	
	if (tableEl !== null) {
		var shareBtn = Object.assign(document.createElement('button'), {
			textContent: 'Share publicly',
		});
		shareBtn.classList.add('wds-button');
		shareBtn.addEventListener('click', shareTable.bind(window, tableEl.dataset.tptId));
		tableEl.after(shareBtn);
	}
}

mw.hook( 'wikipage.content' ).add(function() {
	renderStats();
	
	renderTable();
});