;(function() {
	'use strict';

	if (!navigator.clipboard || window.copyButtonLoaded) return;

	window.copyButtonLoaded = true;

	importArticles({
		articles: [
			'u:dev:MediaWiki:CopyCodeButton.css',
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	});

	function init(i18n) {
		const classNames = {
			copyButton: 'copy-code',
			copyButtonIcon: 'copy-code-icon',
			copyIcon: 'copy-icon',
			doneIcon: 'done-icon',
			errorIcon: 'error-icon',
			copied: 'copied',
			error: 'error',
		};

		const codeBlocks = document.querySelectorAll('.mw-highlight pre'),
			copyLabel = i18n.msg('copy').plain(),
			copiedLabel = i18n.msg('copied').plain(),
			errorLabel = i18n.msg('error').plain(),
			copyIconHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="' + classNames.copyButtonIcon + ' ' + classNames.copyIcon + '" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
			checkIconHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="' + classNames.copyButtonIcon + ' ' + classNames.doneIcon + '" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',
			errorIconHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="' + classNames.copyButtonIcon + ' ' + classNames.errorIcon + '" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
			iconsHTML = copyIconHTML + checkIconHTML + errorIconHTML;

		function copyCode(button) {
			const codeBlock = button.parentNode,
				content = codeBlock.innerText;

			try {
				navigator.clipboard.writeText(content);
				button.classList.add(classNames.copied);
				setButtonLabel(button, copiedLabel);
			} catch(err) {
				console.error(errorLabel);
				button.classList.add(classNames.error);
				setButtonLabel(button, errorLabel);
			}

			setTimeout(function() {
				resetButton(button);
			}, 2000);
		}

		function resetButton(button) {
			setButtonLabel(button, copyLabel);
			button.classList.remove(classNames.copied, classNames.error);
		}

		function setAttributes(el, attrs) {
			for(var key in attrs) {
				el.setAttribute(key, attrs[key]);
			}
		}

		function setButtonLabel(element, label) {
			setAttributes(element, {'aria-label': label, 'title': label});
		}

		codeBlocks.forEach(function(codeBlock) {
			const copyButton = document.createElement('button');

			copyButton.classList.add(classNames.copyButton);
			setButtonLabel(copyButton, copyLabel);
			copyButton.insertAdjacentHTML('beforeend', iconsHTML);

			copyButton.addEventListener('click', function(event) {
				copyCode(event.target);
			});

			codeBlock.prepend(copyButton);
		});
	}

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('CopyCodeButton').done(function(i18n) {
			init(i18n);
		});
	});
}());