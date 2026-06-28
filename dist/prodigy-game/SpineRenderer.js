// From: https://stackoverflow.com/a/69057776/20170780
function cssColorToFloat4(col) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = col;
    ctx.fillRect(0,0,1,1);
    const data = ctx.getImageData(0,0,1,1).data;
    return [data[0]/255, data[1]/255, data[2]/255, data[3]/255];
}

function error(element, msg) {
	const err = document.createElement('h3');
	err.style.color = "red";
	element.innerHTML = "";
	element.textContent = msg;
}

function loadRender(element, sidebar) {
	const trans_str = element.getAttribute("data-transform");
	const trans = {
		width: null, height: null,
		posX: 0, posY: 0,
		sclX: 1, sclY: 1
	};
	if (trans_str) {
		const dat = trans_str.split(',');
		let err = false;
		dat.every((val, ind) => {
			let prop;
			switch (ind) {
				case 0: case 1:
					prop = ind == 1 ? "height" : "width";
					if (val.startsWith('+')) {
						const add = parseFloat(val.slice(1));
						if (isNaN(add)) {
							err = true;
							error(element, "Inputted transformation is malformed.");
							return false;
						}
						trans[prop] = { add: add };
						return true;
					} else if (val.startsWith('*')) {
						const plusLoc = val.indexOf('+');
						if (plusLoc >= 0) {
							const add = parseFloat(val.slice(plusLoc+1));
							const mul = parseFloat(val.slice(1, plusLoc));
							if (isNaN(add) || isNaN(mul)) {
								err = true;
								error(element, "Inputted transformation is malformed.");
								return false;
							}
							trans[prop] = { add: add, mul: mul };
						} else {
							const mul = parseFloat(val.slice(1));
							if (isNaN(mul)) {
								err = true;
								error(element, "Inputted transformation is malformed.");
								return false;
							}
							trans[prop] = { mul: mul };
						}
						return true;
					}
					break;
				case 2: prop = "posX"; break;
				case 3: prop = "posY"; break;
				case 4: prop = "sclX"; break;
				case 5: prop = "sclY"; break;
				default: return false; // break out of foreach
			}
			if (val == '_') trans[prop] = null;
			else {
				const num = parseFloat(val);
				if (isNaN(num)) {
					err = true;
					error(element, "Inputted transformation is malformed.");
					return false;
				}
				trans[prop] = num;
			}
			return true;
		});
		if (err) return;
	}
	const bgcolor = element.getAttribute("data-bgcolor");
	const isenglish = element.hasAttribute("data-isenglish");
	//const version = parseInt(element.getAttribute("data-assetsversion"));
	const version = element.getAttribute("data-hash");
	if (!isenglish && !version) {
		error(element, "No asset version provided for Spine render.");
		return;
	}
	const id = element.getAttribute("data-identifier");
	if (!id) {
		error(element, "No asset reference provided for Spine render.");
		return;
	}
	const replacements_str = element.getAttribute("data-swaps");
	const replacements = {};
	if (replacements_str) {
		let err = false;
		replacements_str.split(',').every(rep => {
			const vals = rep.split(':');
			if (!vals[0]) return true; // if nothing then just ignore
			if (vals.length == 1) {
				err = true;
				error(element, "Replacements input is malformed.");
				return false;
			}
			replacements[vals[0]] = vals[1];
			return true;
		});
		if (err) return;
	}
	const view = new SpineView({
		trans: trans,
		bgcolor: bgcolor ? cssColorToFloat4(bgcolor) : [0,0,0,0],
		version: version,
		id: id, english: isenglish,
		anim: element.getAttribute("data-animation"),
		replacements: replacements,
		sidebar: sidebar, canv: sidebar ? element : null // only have resizable canvas if the sidebar is present
	});
	if (view.canvas == null) return;
	if (view.error) {
		error(element, view.error);
	} else {
		element.innerHTML = "";
		element.appendChild(view.canvas);
	}
}

//let assetsJsons = {};
let spine = false, downloader, assetCache;
function forElement(element, list) {
	// According to the documentation, this is safe.
	importArticles({type: "script", articles: ["MediaWiki:SpineLibrary.js"]}).then(() => {
		if (!spine) { // This will only setup things for spine rendering if there is any spine to render.
			spine = true;
			downloader = new window.dev.spine.Downloader();
			assetCache = new window.dev.spine.AssetCache();
		}
		
		/*
		let assetsver, assetsURL;
		if (element.hasAttribute("data-isenglish")) {
			assetsver = "english";
			assetsURL = "https://english.prodigygame.com/config/assetPathConfig.json";
		} else {
			// TODO: This can use Makar's template.
			assetsver = parseInt(element.getAttribute("data-assetsversion"));
			if (isNaN(assetsver)) {
				error(element, "No assetsversion was provided for Spine render.");
				return;
			}
			assetsURL = `https://code.prodigygame.com/assets/${assetsver}/assets-metadata.json`;
		}
		const data = assetsJsons[assetsver];
		if (data === undefined) {
			assetsJsons[assetsver] = [[element, list]];
			const request = new XMLHttpRequest();
			request.open("GET", assetsURL, true);
			request.onload = () => {
				if (request.status < 200 || request.status >= 300) { // response.ok
					console.error(`Got response ${request.status} for ${assetsURl}`);
					assetsJsons[assetsver] = null;
					return;
				}
				const els = assetsJsons[assetsver];
				assetsJsons[assetsver] = JSON.parse(request.responseText);
				els.forEach(e => loadRender(e[0], e[1]));
			};
			request.onerror = () => {
				console.error(`Attempting to retrieve ${assetsURL} resulted in an error.`);
				assetsJsons[assetsver] = null;
			};
			request.send();
		} else if (Array.isArray(data)) data.push([element, list]);
		else*/ loadRender(element, list);
	});
}

mw.hook("wikipage.content").add(() => {
	Array.from(document.getElementsByClassName("spine-renderer-element")).forEach(element => {
		if (element.hasAttribute("spine-work-completed")) return;
		forElement(element, null);
		element.setAttribute("spine-work-completed", ''); // avoid touching this element twice if this hook is for some reason called again
	});
	
	Array.from(document.getElementsByClassName("spine-interactive-element")).forEach(element => {
		if (element.hasAttribute("spine-work-completed")) return;
		let canv, sidebar;
		Array.prototype.every.call(element.children, e => {
			if (!sidebar && e.tagName == 'UL') {
				sidebar = e;
			} else if (!canv && e.classList.contains("spine-interactive-element-canv")) {
				canv = e;
			}
			return !(canv && sidebar);
		});
		forElement(canv, sidebar);
		element.setAttribute("spine-work-completed", '');
	});
});

// Based on code from: https://github.com/EsotericSoftware/spine-runtimes/blob/4.3/spine-ts/spine-webgl/example/index.html
class SpineView {
	/**
	 * Available props:
	 * scale - Multiplier for scale of the object.
	 * bgcolor - An array of 4 numbers (ranged 0.0-1.0) determining RGBA values of the background.
 	 */
	constructor(props) {
		if (!props.trans) props.trans = {
			width: null, height: null,
			posX: 0, posY: 0,
			sclX: 1, sclY: 1
		};
		if (props.trans.sclY == null) props.trans.sclY = props.trans.sclX;
		if (!props.bgcolor) props.bgcolor = [0,0,0,0];
		if (!props.replacements) props.replacements = {};
		this.props = props;
		
		this.mvp = new window.dev.spine.Matrix4();
		this.canvas = document.createElement('canvas');
		// typeof(null) == 'object'
		if (typeof(this.props.trans.width) != 'object') this.canvas.width = this.props.trans.width;
		if (typeof(this.props.trans.width) != 'object') this.canvas.height = this.props.trans.height;
		this.ctx = new window.dev.spine.ManagedWebGLRenderingContext(this.canvas, {
			alpha: this.props.bgcolor[3] < 1
		});
		if (!this.ctx.gl) {
			console.warn("WebGL is unavailable. Spines will not be rendered.");
			this.canvas = null;
			return;
		}
	
		// Create a simple shader, mesh, model-view-projection matrix, SkeletonRenderer, and AssetManager.
		this.shader = window.dev.spine.Shader.newTwoColoredTextured(this.ctx);
		this.batcher = new window.dev.spine.PolygonBatcher(this.ctx);
		this.skeletonRenderer = new window.dev.spine.SkeletonRenderer(this.ctx);
		
		const path = this.props.id.split('/');
		/*let data;
		if (this.props.english) data = assetsJsons["english"].assetData[this.props.id];
		else {
			if (this.props.version < 114) {  // Format before this version was a list, rather than a map.
				path[1] = parseInt(path[1]); // We shall use indexes for anything before this.
			}
			data = assetsJsons[this.props.version][path[0]][path[1]];
			switch (path[0]) {
				case "atlas": path[0] = "atlases"; break;
				case "singleImage": path[0] = "single-images"; break;
				case "tileset": path[0] = "tilesets"; break;
				case "tileMap": path[0] = "tiled-data"; break;
				case "streamedMap": path[0] = "streamed-map"; break;
			}
		}*/
		this.assetManager = new window.dev.spine.AssetManager(this.ctx, "", downloader, assetCache);
		
		const filename = this.props.english
		/*
				? data.path.slice(0, data.path.indexOf('.json'))
				: data.data.filename;
		*/
				? this.props.id
				: path[1];
		const filepath = this.props.english
		/*
				? `https://english-cdn.prodigygame.com/gha/`
				: `https://cdn.prodigygame.com/game/assets/v1_cache/${path[0]}/${data.data.filename}/${data.hash}/`;
		*/
				? `https://english-cdn.prodigygame.com/gha/`
				: `https://cdn.prodigygame.com/game/assets/v1_cache/${path[0]}/${path[1]}/${this.props.version}/`;
		
		Object.keys(this.props.replacements).forEach(name => {
			this.assetManager.setRawDataURI(filepath+name, `https://prodigy-game.fandom.com/wiki/Special:FilePath/${this.props.replacements[name]}`);
		});
		
		this.assetManager.loadText(filepath+filename+".json");
		this.assetManager.loadTextureAtlas(filepath+filename+".atlas");
		this.boundload = this.load.bind(this, filepath+filename);
		requestAnimationFrame(this.boundload);
	}

	load(filepath) {
		// Wait until the AssetManager has loaded all resources, then load the skeleton.
		if (this.assetManager.isLoadingComplete()) {
			// There seems to be no way of knowing the current assetversion without a session and scraping.
			// I found https://api.prodigygame.com/game-api/status but that doesn't seem to work anymore.
			// There might be some sort of api for it somewhere but I don't know how to go looking for it.
			this.gameskeleton = this.loadSkeleton(filepath);
			this.lastFrameTime = Date.now() / 1000;
			this.boundrender = this.render.bind(this);
			requestAnimationFrame(this.boundrender); // Loading is done, call render every frame.
		} else
			requestAnimationFrame(this.boundload);
	}
	
	loadSkeleton(name, skin) {
		const skeletonLoader = new window.dev.spine.SkeletonJson(
			new window.dev.spine.AtlasAttachmentLoader(
				this.assetManager.require(name+".atlas")
			)
		);
		
		const skeleton = new window.dev.spine.Skeleton(
			skeletonLoader.readSkeletonData(this.assetManager.require(name+".json"))
		);
		skeleton.setSkinByName(skin ? skin : "default");
	
		const animationState = new window.dev.spine.AnimationState(
			new window.dev.spine.AnimationStateData(skeleton.data)
		);
		if (this.props.anim) animationState.setAnimation(0, this.props.anim, true);
		if (this.props.sidebar) {
			let selected = null; // variable in scope
			skeleton.data.animations.forEach(anim => {
				const item = document.createElement('li');
				item.textContent = anim.name;
				if (this.props.anim == anim.name) {
					selected = item;
					item.classList.add("selected");
				}
				item.addEventListener('click', () => {
					if (selected == item) return;
					selected.classList.remove("selected");
					selected = item;
					item.classList.add("selected");
					animationState.setAnimation(0, anim, true);
				});
				this.props.sidebar.appendChild(item);
			});
		}
	
		// Pack everything up and return to caller.
		return { skeleton: skeleton, state: animationState, bounds: this.calculateSetupPoseBounds(skeleton) };
	}
	
	calculateSetupPoseBounds(skeleton) {
		skeleton.setupPose();
		skeleton.updateWorldTransform(window.dev.spine.Physics.update);
		const offset = new window.dev.spine.Vector2();
		const size = new window.dev.spine.Vector2();
		skeleton.getBounds(offset, size, []);
		return { offset: offset, size: size };
	}
	
	render() {
		const gl = this.ctx.gl;
		const now = Date.now() / 1000;
		const delta = now - this.lastFrameTime;
		this.lastFrameTime = now;
	
		// Update the MVP matrix to adjust for canvas size changes
		this.resize();
	
		gl.clearColor(this.props.bgcolor[0], this.props.bgcolor[1], this.props.bgcolor[2], this.props.bgcolor[3]);
		gl.clear(gl.COLOR_BUFFER_BIT);
	
		// Apply the animation state based on the delta time.
		let skeleton = this.gameskeleton.skeleton;
		let state = this.gameskeleton.state;
		state.update(delta);
		state.apply(skeleton);
		skeleton.updateWorldTransform(window.dev.spine.Physics.update);
	
		// Bind the shader and set the texture and model-view-projection matrix.
		this.shader.bind();
		this.shader.setUniformi(window.dev.spine.Shader.SAMPLER, 0);
		this.shader.setUniform4x4f(window.dev.spine.Shader.MVP_MATRIX, this.mvp.values);
	
		// Start the batch and tell the SkeletonRenderer to render the active skeleton.
		this.batcher.begin(this.shader);
	
		this.skeletonRenderer.draw(this.batcher, skeleton);
		this.batcher.end();
	
		this.shader.unbind();
		
		requestAnimationFrame(this.boundrender);
	}
	
	resize() {
		// Calculations to center the skeleton in the canvas.
		const bounds = this.gameskeleton.bounds;
		const offX = bounds.offset.x - this.props.trans.posX;
		const offY = bounds.offset.y - this.props.trans.posY;
		const sizeX = bounds.size.x;
		const sizeY = bounds.size.y;
		
		if (this.props.canv) {
			const rect = this.canvas.getBoundingClientRect();
			if (rect.width) { // the stackoverflow comment said that this doesn't exist on <=IE8, not that any sane person uses that anymore
				this.canvas.width = rect.width;
				this.canvas.height = rect.height;
			}
		} else if (!this.canvasDimensionsSet) { // boolean coercion my beloved (undefined => false)
			// typeof(null) == 'object'
			if (typeof(this.props.trans.width) == 'object') {
				this.canvas.width = sizeX;
				if (this.props.trans.width) {
					if (this.props.trans.width.mul) this.canvas.width *= this.props.trans.width.mul;
					if (this.props.trans.width.add) this.canvas.width += this.props.trans.width.add;
				}
			}
			if (typeof(this.props.trans.height) == 'object') {
				this.canvas.height = sizeY;
				if (this.props.trans.height) {
					if (this.props.trans.height.mul) this.canvas.height *= this.props.trans.height.mul;
					if (this.props.trans.height.add) this.canvas.height += this.props.trans.height.add;
				}
			}
			this.canvasDimensionsSet = true;
		}
		
		const scaleX = sizeX / this.canvas.width;
		const scaleY = sizeY / this.canvas.height;
		const width = sizeX / (this.props.trans.sclX * scaleX);
		const height = sizeY / (this.props.trans.sclY * scaleY);
		const centerX = offX + ((sizeX + (sizeX / scaleX) - this.canvas.width - width)/2);
		const centerY = offY + ((sizeY + (sizeY / scaleY) - this.canvas.height - height)/2);
		this.mvp.ortho2d(centerX, centerY, width, height);
		this.ctx.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	}
}