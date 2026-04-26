((window, $, mw) => {
	"use strict";
	
	window.dev = $.extend({}, window.dev);
	
	if (window.dev.wdsc) return;
	
	const flattenChildren = (input) => {
		if (input == null || input === void 0) return [];
		
		const children = Array.isArray(input) ?
			input :
			[input];
			
		return children.reduce((result, child) => {
			if (Array.isArray(child)) return result.concat(flattenChildren(child));
			
			if (child == null || child === false) return result;
			
			return result.concat(child);
		}, []);
	};
	
	const createTextNode = (value) => document.createTextNode(
		String(value)
	);
	
	const isNodeLike = (value) => 
		value instanceof window.Node ||
		value instanceof window.DocumentFragment;
		
	const toNode = (value) => {
		if (isNodeLike(value)) return value;
		
		switch (typeof value) {
			case "string":
			case "number": 
				return createTextNode(value);
			default: 
				return null;
		}
	};
	
	const setStyleObject = (element, properties) => {
		if (!properties || !element) return;
		
		Object.entries(properties).forEach(([key, value]) => {
			element.style[key] = value;
		});
	};
	
	const setDatasetObject = (element, dataset) => {
		if (!dataset || !element) return;
		
		Object.entries(dataset).forEach(([key, value]) => {
			element.dataset[key] = value;
		});
	};
	
	const setAttributes = (element, attributes) => {
		if (!attributes || !element) return;
		
		Object.entries(attributes).forEach(([key, value]) => {
			if (value == null || value === false)
				return element.removeAttribute(key);
			
			if (value === true)
				return element.setAttribute(key, key);
				
			element.setAttribute(key, value);
		});
	};
	
	const cx = (...tokens) => {
		const mapped = tokens.map((token) => {
			if (token == null || token === false) return [];
			
			if (Array.isArray(token)) return token;
			
			if (typeof token === "object")
				return Object.entries(token).reduce((classes, [key, value]) => {
					return value ? classes.concat(key) : classes;	
				}, []);
				
			if (typeof token === "number") return String(token);
			
			return token;
		});
		
		const flattened = flattenChildren(mapped);
		const classNames = new Set(flattened);
		
		return [...classNames].join(" ");
	};
	
	class WDSComponent {
		constructor(props = {}) {
			this.props = {};
			this.element = this._createElement(props);
			this._events = new Map();
			this._applyProps(props);
		}
		
		_createElement() {
			return document.createElement("div");
		}
		
		_getBaseClassNames() {
			return [];
		}
		
		_getIgnoredAttributeKeys() {
			return [];
		}
		
		_getClassNames() {
			return cx(this._getBaseClassNames(), this.props.className);
		}
		
		_extractEventProps(attributes = {}) {
			return Object.entries(attributes).reduce((result, [key, value]) => {
				if (/^on[A-Z]/.test(key) && typeof value === "function")
					result[key] = value;
				return result;
			}, {});
		}
		
		_extractAttributeProps(attributes = {}) {
			return Object.entries(attributes).reduce((result, [key, value]) => {
				if (/^on[A-Z]/.test(key)) return result;
				if (this._getIgnoredAttributeKeys().includes(key)) return result;
				result[key] = value;
				return result;
			}, {});
		}
		
		_syncEvents(events = {}) {
			this._events.forEach((handler, eventName) => {
				this.element.removeEventListener(eventName, handler);
			});
			this._events.clear();
			
			Object.entries(events).forEach(([key, handler]) => {
				const eventName = key.slice(2).toLowerCase();
				this.element.addEventListener(eventName, handler);
				this._events.set(eventName, handler);
			});
		}
		
		_mountChildren() {
			return this.props.children.forEach((child) => {
				const node = this._renderNode(child);
				if (node) this.element.appendChild(node);
			});
		}
		
		_applyProps(props = {}) {
			const { 
				children,
				style,
				dataset,
				className,
				...rest
			} = props;
			
			const events = this._extractEventProps(rest);
			const attributes = this._extractAttributeProps(rest);
			
			this.props = $.extend({}, this.props, attributes, {
				children: flattenChildren(children) || [],
				style,
				dataset,
				className,
				events
			});
			
			if (!this.element) return this.props;
			
			const classNames = cx(className);
			
			this.element.className = this._getClassNames() || "";
			
			this._setStyle(style);
			this._setDataset(dataset);
			this._setAttributes(attributes);
			this._syncEvents(events);
			
			this.element.replaceChildren();
			this._mountChildren();
			
			return this.props;
		}
		
		_setStyle(styleProps = {}) { 
			return setStyleObject(this.element, styleProps);
		}
		
		_setDataset(datasetProps = {}) { 
			return setDatasetObject(this.element, datasetProps);
		}
		
		_setAttributes(attributeProps = {}) {
			return setAttributes(this.element, attributeProps);
		} 
		
		_renderNode(child) {
			if (child instanceof WDSComponent) return child.element;
			return toNode(child);
		}
		
		update(props = {}) {
			return this._applyProps($.extend({}, this.props, props));
		}
	}
	
	window.dev.wdsc = {
		Component: WDSComponent,
		Spinner: class extends WDSComponent {
			_createElement(props = {}) {
				const {
					size = 45,
					strokeWidth = 4
				} = props;
				
				const spinner = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
				
				const stroke = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				stroke.setAttribute("fill", "none");
				stroke.setAttribute("stroke-width", strokeWidth);
				stroke.setAttribute("stroke-dash-offset", 125);
				stroke.setAttribute("stroke-line-cap", "round");
				stroke.setAttribute("r", 20);
				
				g.appendChild(stroke);
				spinner.appendChild(g);
				g.setAttribute("transform", "translate(22.5, 22.5)");
				
				return spinner;
			}
			
			_getBaseClassNames() {
				const {
					isBlock = true
				} = this.props;
				
				return [
					"wds-spinner",
					{
						"wds-spinner__block": isBlock
					}
				];
			}
		},
		Button: class extends WDSComponent {
			_createElement({ as = "link" } = {}) {
				return document.createElement(as === "link" ? 
					"a" : 
					"button");
			}
			
			_getIgnoredAttributeKeys() {
				return ["as", "variant", "size", "fullWidth"];
			}
			
			_getBaseClassNames() {
				const {
					variant = "primary",
					fullWidth = false,
					disabled = false
				} = this.props;
				
				return [
					"wds-button",
					{
						"wds-is-secondary": variant === "secondary",
						"wds-is-text": variant === "text"
					}
				];
			}
		},
		FloatingButton: class extends WDSComponent {
			_createElement({ as = "link" } = {}) {
				return document.createElement(as === "link" ? 
					"a" : 
					"button");
			}
			
			_getIgnoredAttributeKeys() {
				return ["as"];
			}
			
			_getBaseClassNames() {
				return ["wds-floating-button"];
			}
		},
		FloatingButtonGroup: class extends WDSComponent {
			_createElement() {
				return document.createElement("div");
			}
			
			_getBaseClassNames() {
				const {
					isVertical = false
				} = this.props;
				
				return [
					"wds-floating-button-group",
					{
						"wds-is-vertical": isVertical
					}
				];
			}
		},
		List: class extends WDSComponent {
			_createElement() {
				return document.createElement("ul");
			}
			
			_getBaseClassNames() {
				const {
					hasBigItems = false,
					hasBoldedItems = false,
					isLinked = false
				} = this.props;
				
				return [
					"wds-list",
					{
						"wds-has-big-items": hasBigItems,
						"wds-has-bold-items": hasBoldItems,
						"wds-is-linked": isLinked
					}
				];
			}
		},
		Dropdown: class extends WDSComponent {
			_createElement() {
				return document.createElement("div");
			}
			
			_getBaseClassNames() {
				return ["wds-dropdown"];
			}
		}
	};
	
	Object.assign(window.dev.wdsc.Dropdown, {
		Toggle: class extends WDSContent {
			_createElement() {
				return document.createElement("div");
			}
			
			_getBaseClassNames() {
				return ["wds-dropdown__toggle"];
			}
		},
		Content: class extends WDSComponent {
			_createElement() {
				return document.createElement("div");
			}
			
			_getBaseClassNames() {
				const {
					isScrollable = false
				} = this.props;
				
				return [
					"wds-dropdown__content",
					{
						"wds-is-not-scrollable": !isScrollable
					}
				];
			}
		}
	});
})(window, jQuery, mediaWiki);