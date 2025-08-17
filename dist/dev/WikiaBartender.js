/**
 * @name WikiaBartender
 * @author Headquarter8302
 * @description Interface for manipulating the WikiaBar
 */
; (function (window, mw) {
	// double-run
	window.dev = window.dev || {};
	window.dev.bartender = window.dev.bartender || { hasRan: false, disabled: false };
	if (window.dev.bartender.hasRan || window.dev.bartender.disabled) return;
	window.dev.bartender.hasRan = true;

	const WikiaBarElement = document.getElementById("WikiaBar"),
		WikiaBarToolbar = WikiaBarElement.querySelector("#WikiaBarWrapper > .wikia-bar > .toolbar > .tools");

	if (WikiaBarElement) {
		mw.hook("dev.wikiaBar").fire(Object.assign(window.dev.bartender, {
			/**
			 * Returns a boolean for the current hidden state of the bar
			 * @returns {boolean}
			 */
			isBarHidden: function () {
				if (WikiaBarElement.children[0].classList.contains("hidden")) { return true; } else return false;
			},

			/**
			 * Returns all the items in the toolbar in the form of a live NodeList
			 * @returns {NodeListOf<HTMLLIElement>} All the items in the toolbar
			 */
			get items() {
				return WikiaBarToolbar.querySelectorAll('li');
			},

			/**
			 * Creates and appends a new item to the toolbar
			 * @param {{text: string, id: string, href?: string | "#", append?: Element, classes: string[]}} opts The options to create a new item. The ID is mandatory to prevent mindless additions
			 * @param {number} index The position of the new item in relation to existing items on the toolbar. An index that's more than the amount of children will default to appending the item
			 * @returns {HTMLLIElement} The list element, for convenience
			 */
			addItem: function (opts, index) {
				const { text, id, href = '#', append = null, classes = [] } = opts,
					item = document.createElement("li"),
					itemLabel = document.createElement("a");

				// check mandatory values
				if (!text || !id) {
					console.error("[WikiaBartender]: 'text' and 'id' are required to add an item.");
					return;
				}

				item.id = id;
				// idk if RL supports spread, 100% can replace this if such the case, should check later
				if (classes.length) classes.forEach((classItem) => item.classList.add(classItem));

				itemLabel.href = href;
				itemLabel.innerText = text;

				if (append) item.appendChild(append);
				item.appendChild(itemLabel);

				if (index >= 0 && index <= WikiaBarToolbar.children.length) {
					WikiaBarToolbar.insertBefore(item, WikiaBarToolbar.children[index]);
				} else {
					WikiaBarToolbar.appendChild(item);
				}
				return item;
			},

			/**
			 * Removes an item from the toolbar
			 * @param {string} query The selector query, remember that the parent element is the toolbar (not `document`), so you only need a very simple selector.
			 * @returns {boolean} Truthy if operation is successful, falsy if not
			 */
			removeItem: function (query) {
				const itemToRemove = WikiaBarToolbar.querySelector(query);
				if (itemToRemove) { itemToRemove.remove(); return true; }
				return false;
			}
		}));
	}
})(this, mediaWiki);