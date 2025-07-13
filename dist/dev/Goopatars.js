// Goopatars

(function() {
	const db = open();
	const knownFiles = [];

	function open() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open('goopatars', 69);
			request.onerror = error => reject(error);
			request.onsuccess = event => resolve(event.target.result);
			request.onupgradeneeded = event => {
				const db = event.target.result;

				try {
					db.deleteObjectStore('main');
				} catch(e) {
					// who cares?
				}
				const store = db.createObjectStore('main', { autoIncrement: true });

				store.transaction.oncomplete = () => resolve(db);
			};
		});
	}

	function getStore(mode = 'readonly') {
		return db.then(db => db.transaction('main', mode).objectStore('main'));
	}

	function promisify(transaction) {
		return new Promise((resolve, reject) => {
			transaction.onerror = () => reject();
			transaction.onsuccess = event => resolve(event);
		});
	}

	function allEntries() {
		return new Promise(resolve => {
			const blobs = [];

			getStore().then(store => {
				const cursor = store.openCursor();

				function tick() {
					promisify(cursor).then(event => {
						const result = event.target.result;

						if (result) {
							result.continue();

							blobs.push({ key: result.key, value: result.value });

							tick();
						} else {
							resolve(blobs);
						}
					})
				}

				tick();
			});
		});
	}
	
	function addBlob(value) {
		return getStore('readwrite').then(store => promisify(store.add(value)));
	}

	function deleteBlob(key) {
		return getStore('readwrite').then(store => promisify(store.delete(key)));
	}

	function createShortcut(entry, avatarInput) {
		const key = entry.key;
		const blob = entry.value.file;
		const button = document.createElement('button');
		button.className = 'wds-floating-button user-avatar-editor__default-avatar';
		
		const img = document.createElement('img');
		img.src = URL.createObjectURL(blob);

		button.addEventListener('click', (e) => {
			if (e.ctrlKey) {
				deleteBlob(key).then(() => button.remove());
			} else {
				const dt = new DataTransfer();
				dt.items.add(blob);

				avatarInput.files = dt.files;
				avatarInput.dispatchEvent(new Event('change', { bubbles: true }));
			}
		});

		button.append(img);

		return button;
	}

	function injectBlobs(avatarList, avatarInput, entries) {
		knownFiles.push(...entries);

		for (const entry of entries) {
			const button = createShortcut(entry, avatarInput);

			avatarList.prepend(button);
		}
	}

	function hijack({ avatarInput, removeButton, avatarList }) {
		console.log({ avatarInput, removeButton, avatarList });

		avatarInput.addEventListener('change', e => {
			const files = Array.from(e.target.files);
			if (!files.length) return;

			const file = files[0];

			if (knownFiles.some(existing =>
				existing.value.file.size === file.size
				&& existing.value.file.lastModified === file.lastModified
				&& existing.value.file.name === file.name)
			) {
				return;
			}

			const payload = {
				file
			};
			addBlob(payload).then(e => {
				const key = e.target.result;

				const entry = {
					key: key,
					value: payload
				};

				knownFiles.push(entry);

				const button = createShortcut(entry, avatarInput);

				avatarList.prepend(button);
			});
		});

		allEntries().then(entries => injectBlobs(avatarList, avatarInput, entries));

		// Not doing anything with removeButton because I got lazy and added ctrl+click instead
	}

	function tryHijack() {
		const editor = document.querySelector('.user-avatar-editor');
		if (!editor) return;

		const actions = editor.querySelector('.user-avatar-editor__actions');
		if (!actions) return;
		if (actions.getAttribute('data-hijacked') === 'yeah') return;
		
		const avatarInput = editor.querySelector('input[type="file"]');
		const removeButton = actions.querySelector('.wds-button-group .wds-button.wds-is-text');
		const avatarList = actions.querySelector('.user-avatar-editor__default-avatars-list');

		if (!avatarInput || !removeButton || !avatarList) return;

		actions.setAttribute('data-hijacked', 'yeah');

		hijack({ avatarInput, removeButton, avatarList });
	}

	function init() {
		const observer = new MutationObserver(tryHijack);

		observer.observe(document.body, {
			subtree: true,
			childList: true
		});

		tryHijack();
	}

	init();
})();