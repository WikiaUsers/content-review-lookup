/**
 * @module			Accordion
 * @description		Adds collapsible accordion components into pages.
 * @author			[[User:Polymeric]]
 * @license			CC-BY-SA 3.0
 * @notes			Please install accordion.css for complete functionality.
 */

(function() {
	'use strict';

	const devAccordion = {
		shouldAttachEvents: true,
		types: ['text', 'links'],
		controls: ['Space', 'Enter', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'Home', 'End'],
		classNames: {
			wrapper: 'accordions__wrapper',
			upgraded: 'upgraded__accordion',
			nested: 'nested__accordion',
			animated: 'is-animated',
			panelHiding: 'is-hiding',
			panelShowing: 'is-showing',
			accordion: 'accordion',
			textAccordion: 'accordion__text',
			linksAccordion: 'accordion__links',
			header: 'accordion--header',
			panel: 'accordion--panel',
			icon: 'accordion__icon',
			iconArrow: 'accordion__icon--arrow',
			iconPlus: 'accordion__icon--plus',
			iconPlusH: 'accordion__icon--plus-h',
			iconPlusV: 'accordion__icon--plus-v',
		},
		ids: {
			wrapper: 'accordion-$1',
			accordion: 'accordion-$1-$2',
			header: 'accordion-$1-$2--header',
			panel: 'accordion-$1-$2--panel',
		},

		icons: function() {
			return {
				'arrow': '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000" class="' + this.classNames.icon + ' ' + this.classNames.iconArrow + '" aria-hidden="true"><path d="M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z"/></svg>',
				'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#000" class="' + this.classNames.icon + ' ' + this.classNames.iconPlus + '" aria-hidden="true"><path d="M 19 12.994 L 5 12.994 L 5 10.994 L 19 10.994 L 19 12.994 Z" class="' + this.classNames.iconPlusH + '"></path><path d="M 5 -13 L 19 -13 L 19 -11 L 5 -11 L 5 -13 Z" class="' + this.classNames.iconPlusV + '" style="transform: rotate(90deg);"></path></svg>',
			};
		},

		removeDataset: function(target) {
			for (var key in target.dataset) {
				delete target.dataset[key];
			}
		},

		setAttributes: function(el, attrs) {
			for (var key in attrs) {
				el.setAttribute(key, attrs[key]);
			}
		},

		keyboardControls: function(target, code) {
			const prevAccordion = target.parentNode.previousElementSibling;
			const nextAccordion = target.parentNode.nextElementSibling;
			const accordionWrapper = target.parentNode.parentNode;

			switch (code) {
				case 'Space':
				case 'Enter':
					target.click();
					break;

				case 'ArrowUp':
				case 'ArrowLeft':
					if (prevAccordion !== null) {
						prevAccordion.querySelector('.' + this.classNames.header).focus();
					}
					break;

				case 'ArrowDown':
				case 'ArrowRight':
					if (nextAccordion !== null) {
						nextAccordion.querySelector('.' + this.classNames.header).focus();
					}
					break;

				case 'Home':
					accordionWrapper.firstElementChild.querySelector('.' + this.classNames.header).focus();
					break;

				case 'End':
					accordionWrapper.lastElementChild.querySelector('.' + this.classNames.header).focus();
					break;
			}
		},

		toggleAccordion: function(header) {
			const panel = header.nextElementSibling;
			const listItemsCount = header.parentElement._devAccordionData.listItems;
			const headerAriaLabel = header.hasAttribute('aria-expanded') ? header.innerText : header.innerText.concat('; Expanded list with ').concat(listItemsCount).concat(' element').concat(listItemsCount > 1 ? 's' : '');

			header.toggleAttribute('aria-expanded');
			panel.toggleAttribute('aria-hidden');

			if (header.hasAttribute('aria-label')) header.setAttribute('aria-label', headerAriaLabel);
		},

		manageAnimationStates: function(accordion, eventType) {
			const isHiding = accordion.lastElementChild.hasAttribute('aria-hidden');

			if (eventType === 'transitionstart') {
				if (isHiding) {
					accordion.classList.add(this.classNames.panelHiding);
				} else {
					accordion.classList.add(this.classNames.panelShowing);
				}
			} else if (eventType === 'transitionend') {
				accordion.classList.remove(this.classNames.panelHiding, this.classNames.panelShowing);
			}
		},

		upgradeAccordion: function(accordion, data, wrapperIndex, accordionIndex) {
			const header = accordion.querySelector('.' + this.classNames.header);
			const panel = accordion.querySelector('.' + this.classNames.panel);
			const isNested = accordion.parentElement.closest('.' + this.classNames.accordion);
			const nestedAccordions = accordion.querySelectorAll('.' + this.classNames.accordion);
			const hasNested = nestedAccordions.length > 0;
			const isExpanded = header.dataset.ariaExpanded === 'true';
			const headerId = this.ids.header.replace('$1', wrapperIndex).replace('$2', accordionIndex);
			const panelId = this.ids.panel.replace('$1', wrapperIndex).replace('$2', accordionIndex);
			const listItemsCount = panel.querySelectorAll('li').length || 0;
			const headerAriaLabel = header.dataset.ariaExpanded ? header.innerText : header.innerText.concat('; Expanded list with ').concat(listItemsCount).concat(' element').concat(listItemsCount > 1 ? 's' : '');

			header.insertAdjacentHTML('afterbegin', hasNested ? this.icons().plus : this.icons().arrow);

			if (isExpanded) header.toggleAttribute('aria-expanded');
			if (!isExpanded) panel.toggleAttribute('aria-hidden');

			if (data.type === 'links') header.setAttribute('aria-label', headerAriaLabel);

			this.setAttributes(header, {
				'tabIndex': 0,
				'role': 'button',
				'id': headerId,
				'aria-controls': panelId,
			});

			this.setAttributes(panel, {
				'role': 'region',
				'id': panelId,
				'aria-labelledby': headerId,
			});

			this.removeDataset(header);

			accordion.classList.add(data.type === 'text' ? this.classNames.textAccordion : this.classNames.linksAccordion);
			if (isNested) accordion.classList.add(this.classNames.nested);
			accordion.setAttribute('id', this.ids.accordion.replace('$1', wrapperIndex).replace('$2', accordionIndex));

			accordion._devAccordionData = {
				listItems: listItemsCount,
			};
		},

		getAccordionData: function(accordionWrapper) {
			const type = accordionWrapper.dataset.accordionsType;
			const animationDuration = Number(accordionWrapper.dataset.animationDuration);

			return {
				type: this.types.includes(type) ? type : 'text',
				animationDuration: !isNaN(animationDuration) ? animationDuration : 0,
			};
		},

		getAccordionWrappers: function() {
			if (!this.pageContent) return;

			const wrappers = this.pageContent.querySelectorAll('.' + this.classNames.wrapper);

			if (wrappers.length === 0) return;

			for (var i = 0; i < wrappers.length; i++) {
				const data = this.getAccordionData(wrappers[i]);
				const accordions = wrappers[i].children;

				wrappers[i].setAttribute('id', this.ids.wrapper.replace('$1', i));

				for (var j = 0; j < accordions.length; j++) {
					this.upgradeAccordion(accordions[j], data, i, j);
				}

				this.removeDataset(wrappers[i]);

				wrappers[i].classList.add(this.classNames.upgraded);

				if (data.animationDuration <= 0) continue;

				wrappers[i].classList.add(this.classNames.animated);
				wrappers[i].style.setProperty('--accordion-animation-duration', data.animationDuration + 'ms');
			}
		},

		shouldRun() {
			return this.pageContent.querySelectorAll('.' + this.classNames.accordion).length > 0;
		},

		init: function() {
			importArticle({ article: 'u:dev:MediaWiki:Accordion.css' });

			this.getAccordionWrappers();

			if (!this.shouldAttachEvents) return;

			this.shouldAttachEvents = false;

			document.addEventListener('click', function handleAccordionClick(event) {
				const isAccordionHeader = event.target.classList.contains(this.classNames.header);

				if (!isAccordionHeader) return;

				this.toggleAccordion(event.target);
			}.bind(this));

			document.addEventListener('keydown', function(event) {
				const isAccordionHeader = event.target.classList.contains(this.classNames.header);
				
				if (!isAccordionHeader || !this.controls.includes(event.code)) return;

				event.preventDefault();

				this.keyboardControls(event.target, event.code);
			}.bind(this));

			['transitionstart', 'transitionend'].forEach(function(eventType) {
				document.addEventListener(eventType, function(event) {
					const isAccordion = event.target.classList.contains(this.classNames.accordion);

					if (!isAccordion) return;

					this.manageAnimationStates(event.target, event.type);
				}.bind(this));
			}.bind(this));
		},
	};

	mw.hook('wikipage.content').add(function(content) {
		const pageContent = content[0];

		devAccordion.pageContent = pageContent;

		if (!devAccordion.shouldRun()) return;

		devAccordion.init();
	});
}());