!(function() {
	var $blocks = $('#riven-dissolving, .echarts-template');
	$blocks.each(function(index, item) {
		var $this = $(item);

		switch ($this.get(0).id || $this.get(0).className) {
		case 'riven-dissolving':
			$this.append(
				$('<form>', {
					style:'width:500px',
					oninput: 
					"result.value=Math.floor(100 * (parseInt(mastery.value) - 8)"
					+ "+ 22.5 * Math.pow(2, parseInt(modRank.value))"
					+ "+ 200 * parseInt(rerolls.value) - 7).toLocaleString()",
					append: [
						$('<label>', {
							for: 'mastery',
							text: 'Рівень майстерності модифікатора розколу: '
						}),
						$('<input>', {
							id:'mastery',
							type: 'number',
							min: 8,
							max: 16,
							value: 8,
							style: 'width: 50px; float:right;',
						}),
						$('<br />'),
						$('<label>', {
							for: 'rerolls',
							text: 'Кількість змін модифікатора розколу: '
						}),
						$('<input>', {
							id: 'rerolls',
							type: 'number',
							min: 0,
							value: 0,
							style: 'width: 50px; float:right;',
						}),
						$('<br />'),
						$('<label>', {
							for: 'modRank',
							text: 'Рівень модифікатора розколу: '
						}),
						$('<input>', {
							id: 'modRank',
							type: 'number',
							min: 0,
							max: 10,
							value: 0,
							style: 'width: 50px; float:right;',
						}),
						$('<br />'),
						$('<label>', {
							for: 'result',
							text: 'Кількість ендо: '
						}),
						$('<output>', {
							id: 'result',
							placeholder: "0"
						}),
					]
				})
			);
			$('#modRank').get(0).dispatchEvent(new Event("input", {bubbles: true}));
			break;

		case 'echarts-template':
			break;
		}
		
	});
})();