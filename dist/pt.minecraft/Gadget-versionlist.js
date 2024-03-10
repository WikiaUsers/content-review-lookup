;(function(mw) {
	'use strict';
	const i18n = {
		pageName: 'Minecraft_Wiki:Lista_de_versão_da_Edição_Java',

		version: 'Versão',
		type: 'Tipo',
		time: 'Data',
		released: 'Lançamento',
		url: 'URL',
		info: 'Info',
		load: 'Load',
		
		assets: 'Assets',
		client: 'Cliente',
		server: 'Servidor',
		client_mappings: 'Mapeamentos de clientes',
		server_mappings: 'Mapeamentos de servidores',
		
		loading: 'Loading...',
		loadingFailed: 'Carregando informações da versão falhou.',
		loadingError: 'Ocorreu um erro ao carregar informações da versão.',
		copy: 'Copiar o hash para a área de transferência'
	},
	config = mw.config.get(['wgPageName', 'wgArticlePath']),
	versionTable = document.createElement('table');

	if ( config.wgPageName !== i18n.pageName ) return;

	function initTable() {
		versionTable.classList.add('article-table');
		versionTable.innerHTML =
			'<thead>' +
				'<th>' + i18n.version + '</th>' +
				'<th>' + i18n.type + '</th>' +
				'<th>' + i18n.time + '</th>' +
				'<th>' + i18n.url + '</th>' +
				'<th>' + i18n.info + '</th>' +
			'</thead>' +
			'<tbody></tbody>';
		return versionTable.tBodies[0];
	}

	function copyBtn(text) {
		const button = document.createElement('span');
		button.style.cursor = 'pointer';
		button.title = i18n.copy;
		button.classList.add('icon-link');
		button.addEventListener('click', function() {
			navigator.clipboard.writeText(text);
		});
		return button;
	}

	function addInfo(srcElement, data) {
		srcElement.innerHTML = '<span><a href="' + data.assetIndex.url + '">' + i18n.assets + '</a></span>';
		srcElement.firstChild.appendChild(copyBtn(data.assetIndex.sha1));

		const downloads = data.downloads,
		keys = Object.keys(downloads);

		for (var i=0; i<keys.length; i++) {
			srcElement.appendChild(document.createElement('br'));

			const ele = document.createElement('a');
			ele.href = downloads[keys[i]].url;
			ele.textContent = i18n[keys[i]];

			const entry = document.createElement('span');
			entry.appendChild(ele);
			entry.appendChild(copyBtn(downloads[keys[i]].sha1));

			srcElement.appendChild(entry);
		}
	}

	function loadInfo(element) {
		const srcElement = element.srcElement;
		srcElement.classList = '';
		srcElement.textContent = i18n.loading;

		fetch(srcElement.dataset.versionurl).then(function(response) {
			return response.json();
		}).then(function(data) {
			addInfo(srcElement.parentElement, data);
		}).catch(function(error) {
			srcElement.innerHTML = i18n.loadingFailed;
			console.error('[Versionlist]', error);
		});
	}

	function addRow(data) {
		const row = document.createElement('tr');
		row.innerHTML =
			'<td><a href="' + config.wgArticlePath.replace('$1', data.id) + '">' + data.id + '</a></td>' +
			'<td>' + data.type + '</td>' +
			'<td>' + data.time + '<br /><b>' + i18n.released + '</b><br />' + data.releaseTime + '</td>' +
			'<td><a href="' + data.url + '">' + data.id + '.json</a></td>' +
			'<td><span class="wds-link" style="cursor:pointer" data-versionurl="' + data.url + '">' + i18n.load + '</span></td>';
		row.children[3].append(copyBtn(data.url.substr(43, 40)));
		row.children[4].firstChild.addEventListener('click', loadInfo);
		return row;
	}

	document.getElementsByClassName('list_versions_form')[0].style.display = '';
	document.getElementsByClassName('list_versions_disabled')[0].style.display = 'none';

	fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(function(response) {
		return response.json();
	}).then(function(data) {
		const versions = data.versions,
		tbody = initTable();

		for (var i=0; i<versions.length; i++) {
			tbody.append(addRow(versions[i]));
		}

		document.getElementsByClassName('list_versions_loading')[0].style.display = 'none';
		document.getElementsByClassName('list_versions_list')[0].appendChild(versionTable);
	}).catch(function(error) {
		document.getElementsByClassName('list_versions_loading')[0].style.display = 'none';
		document.getElementsByClassName('list_versions_list')[0].innerHTML = i18n.loadingError;
		console.error('[Versionlist]', error);
	});
})(window.mediaWiki);