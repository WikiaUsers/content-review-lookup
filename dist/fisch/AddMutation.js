/*
 * Mutation Adder System v2.6
 * Alpha
 */
(function(window, $, mw) {
    'use strict';

    if (window.mutationAdderInitialized) return;
    window.mutationAdderInitialized = true;
    
    // --- STANDALONE CUSTOM COLOR PICKER COMPONENT ---
    const CustomColorPicker = {
        h: 0, s: 1, l: 0.5, a: 1, callback: null, el: {},
        
        init: function() {
            if (document.getElementById('custom-color-picker')) return;
            this.create();
            this.bindEvents();
        },
        
        create: function() {
            const pickerHTML = `<div class="custom-color-picker" id="custom-color-picker"><div class="saturation-brightness-box" id="sat-box"><div class="handle" id="sat-handle"></div></div><div class="color-controls"><div class="color-preview-section"><div id="color-preview-box"><div class="color-fill" id="color-fill"></div></div><button id="eyedropper-btn" title="Pick color from screen"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5,8.5l-8-8"/><path d="M12.2,1.3l2.5,2.5c0.6,0.6,0.6,1.5,0,2.1l-1,1L9.5,2.8l1-1C10.8-0.4,11.7-0.4,12.2,1.3z"/><path d="M1.3,12.2L2.8,9.5L7,13.7l-2.8,1.5C3.5,15.5,2.5,15.5,1.9,14.9C1,14.2,1,13.2,1.3,12.2z"/></svg></button></div><div class="sliders-section"><div class="slider-container" id="hue-slider-container"><input type="range" id="hue-slider" min="0" max="360"></div><div class="slider-container" id="opacity-slider-container"><input type="range" id="opacity-slider" min="0" max="1" step="0.01"></div></div></div><div class="color-inputs"><div class="input-group"><input type="text" id="hex-input"><label>HEX</label></div><div class="input-group"><input type="number" id="rgb-r" min="0" max="255"><label>R</label></div><div class="input-group"><input type="number" id="rgb-g" min="0" max="255"><label>G</label></div><div class="input-group"><input type="number" id="rgb-b" min="0" max="255"><label>B</label></div></div></div>`;
            document.body.insertAdjacentHTML("beforeend", pickerHTML);
            this.el = {picker:document.getElementById("custom-color-picker"),satBox:document.getElementById("sat-box"),satHandle:document.getElementById("sat-handle"),hueSlider:document.getElementById("hue-slider"),opacitySlider:document.getElementById("opacity-slider"),colorFill:document.getElementById("color-fill"),hexInput:document.getElementById("hex-input"),rInput:document.getElementById("rgb-r"),gInput:document.getElementById("rgb-g"),bInput:document.getElementById("rgb-b"),eyedropperBtn:document.getElementById("eyedropper-btn")};
        },
        
        bindEvents: function() {
            const drag=(t,e)=>{const n=n=>{n.preventDefault(),e(n)},o=()=>{document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o)};t.addEventListener("mousedown",t=>{0===t.button&&(e(t),document.addEventListener("mousemove",n),document.addEventListener("mouseup",o))})};drag(this.el.satBox,t=>this.updateSaturationBrightness(t)),this.el.hueSlider.addEventListener("input",t=>this.updateFromHue(t)),this.el.opacitySlider.addEventListener("input",t=>this.updateFromOpacity(t)),this.el.hexInput.addEventListener("change",t=>this.updateFromHex(t)),["r","g","b"].forEach(t=>this.el[t+"Input"].addEventListener("change",()=>this.updateFromRgb())),this.el.eyedropperBtn.addEventListener("click",()=>this.openEyedropper())
        },
        
        updateUI: function() {
            const{r:t,g:e,b:n}=this.hslToRgb(this.h,this.s,this.l),o=this.rgbToHex(t,e,n);this.el.satBox.style.backgroundColor=`hsl(${this.h}, 100%, 50%)`,this.el.satHandle.style.left=`${100*this.s}%`,this.el.satHandle.style.top=`${100*(1-this.l/(1-.5*Math.abs(2*this.s-1)))}%`,this.el.hueSlider.value=this.h,this.el.opacitySlider.value=this.a;this.el.opacitySlider.parentElement.style.background=`linear-gradient(to right, rgb(${t},${e},${n}), transparent), linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,this.el.opacitySlider.parentElement.style.backgroundSize="100% 100%, 8px 8px, 8px 8px, 8px 8px, 8px 8px",this.el.opacitySlider.parentElement.style.backgroundPosition="0 0, 0 0, 0 4px, 4px -4px, -4px 0px",this.el.colorFill.style.backgroundColor=`rgba(${t}, ${e}, ${n}, ${this.a})`,this.el.hexInput.value=o.toUpperCase(),this.el.rInput.value=t,this.el.gInput.value=e,this.el.bInput.value=n,this.callback&&this.callback(o)
        },
        
        updateSaturationBrightness: function(t) {
            const e=this.el.satBox.getBoundingClientRect();let n=(t.clientX-e.left)/e.width,o=(t.clientY-e.top)/e.height;n=Math.max(0,Math.min(1,n)),o=Math.max(0,Math.min(1,o)),this.s=n,this.l=(1-o)*(1-.5*Math.abs(2*n-1)),this.updateUI()
        },
        
        updateFromHue: function(t) { this.h=t.target.value,this.updateUI() },
        updateFromOpacity: function(t) { this.a=t.target.value,this.updateUI() },
        updateFromHex: function(t) { const{r,g,b}=this.hexToRgb(t.target.value);this.updateFromRgbValues(r,g,b) },
        updateFromRgb: function() { this.updateFromRgbValues(this.el.rInput.value,this.el.gInput.value,this.el.bInput.value) },
        updateFromRgbValues: function(t,e,n) { const{h,s,l}=this.rgbToHsl(t,e,n);this.h=h,this.s=s,this.l=l,this.updateUI() },
        openEyedropper: function() {
            if(!window.EyeDropper)return alert("Your browser doesn't support the Eyedropper API.");(new window.EyeDropper).open().then(t=>this.updateFromHex({target:{value:t.sRGBHex}})).catch(()=>console.log("Eyedropper canceled."))
        },
        
        show: function(t,e,n) {
            this.callback=n;const o=t.getBoundingClientRect();this.el.picker.style.left=`${window.scrollX+o.left}px`,this.el.picker.style.top=`${window.scrollY+o.bottom+5}px`,this.el.picker.classList.add("is-open"),this.updateFromHex({target:{value:e}}),setTimeout(()=>{document.addEventListener("click",this.closeHandler=e=>{this.el.picker.contains(e.target)||e.target===t||this.hide()},{once:!0})},0)
        },
        
        hide: function() {
            this.el.picker.classList.remove("is-open"),document.removeEventListener("click",this.closeHandler)
        },
        
        hslToRgb:(h,s,l)=>{let c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=0,g=0,b=0;return 0<=h&&h<60?([r,g,b]=[c,x,0]):60<=h&&h<120?([r,g,b]=[x,c,0]):120<=h&&h<180?([r,g,b]=[0,c,x]):180<=h&&h<240?([r,g,b]=[0,x,c]):240<=h&&h<300?([r,g,b]=[x,0,c]):([r,g,b]=[c,0,x]),{r:Math.round(255*(r+m)),g:Math.round(255*(g+m)),b:Math.round(255*(b+m))}},
        rgbToHex:(r,g,b)=>"#"+[r,g,b].map(t=>{const e=parseInt(t).toString(16);return 1===e.length?"0"+e:e}).join(""),
        hexToRgb:t=>{let e=0,n=0,o=0;return 4===t.length?(e="0x"+t[1]+t[1],n="0x"+t[2]+t[2],o="0x"+t[3]+t[3]):7===t.length&&(e="0x"+t[1]+t[2],n="0x"+t[3]+t[4],o="0x"+t[5]+t[6]),{r:+e,g:+n,b:+o}},
        rgbToHsl:(r,g,b)=>{r/=255,g/=255,b/=255;let t=Math.min(r,g,b),e=Math.max(r,g,b),n=e-t,o=0,s=0,i=0;return 0==n?o=0:e==r?o=(g-b)/n%6:e==g?o=(b-r)/n+2:o=(r-g)/n+4,o=Math.round(60*o),o<0&&(o+=360),i=(e+t)/2,s=0==n?0:n/(1-Math.abs(2*i-1)),{h:o,s:s,l:i}}
    };

    // --- MAIN APPLICATION OBJECT ---
    const App = {
        // --- CONFIGURATION ---
        CONFIG: {
            buttonContainerId: 'add-mutation-button-container',
            templatePage: 'Template:Mutation',
            cssPage: 'Template:Mutation/style.css',
            insertionMarker: '| #default',
        },

        // --- INITIALIZATION ---
        init: function() {
            if (mw.config.get('wgPageName') !== this.CONFIG.templatePage) return;
            const userGroups = mw.config.get('wgUserGroups');
            if (!['sysop', 'content-moderator', 'administrator'].some(group => userGroups.includes(group))) {
                console.log('Mutation Adder: User lacks permission to run this script.');
                return;
            }

            this.api = new mw.Api();
            this.createButton();
            this.createModal();
            CustomColorPicker.init();
            console.log('Mutation Adder System v2.6 Initialized.');
        },

        // --- UI CREATION ---
        createButton: function() {
            const $container = $('#' + this.CONFIG.buttonContainerId);
            if (!$container.length) {
                console.warn('Mutation Adder: Button container not found on the page.');
                return;
            }
            $('<button>', { 'class': 'wds-button', 'text': 'Add Mutation' })
                .on('click', () => this.Modal.open()).appendTo($container);
        },
        
        createModal: function() {
            const modalHTML = `<div id="add-mutation-modal-overlay" style="display: none;"><div class="add-mutation-modal"><div class="close-btn" title="Close">&times;</div><h2>Add New Mutation</h2><div class="tabs"><div class="tab active" data-tab="simple">Simple</div><div class="tab" data-tab="animated">Animated</div></div><div class="form-group"><label for="mutation-name">Mutation Name</label><input type="text" id="mutation-name" placeholder="e.g., SuperGlow"></div><div id="tab-simple" class="tab-content active"><div class="form-group"><label>Color</label><div class="color-input-group"><button class="color-picker-trigger" id="simple-color-trigger" style="background-color:#FFFFFF;"></button><input type="text" id="simple-color-hex" value="#FFFFFF"></div></div></div><div id="tab-animated" class="tab-content"><div class="form-group"><label>Gradient Colors</label><div id="gradient-colors"></div><button id="add-color-btn" class="wds-button wds-is-squished">Add Color</button></div><div class="form-group"><label>Gradient Direction</label><div class="slider-group"><input type="range" id="gradient-direction" min="0" max="360" value="90" data-sync="dir"><input type="number" id="gradient-direction-num" min="0" max="360" value="90" data-sync="dir"></div></div><div class="form-group"><label>Animation Type</label><select id="animation-type"><option value="slide">Slide</option><option value="secret">Secret Wave</option><option value="pulse">Pulse</option></select></div><div class="form-group"><label>Animation Speed</label><div class="slider-group"><input type="range" id="animation-duration" min="1" max="15" value="5" step="0.5" data-sync="dur"><input type="number" id="animation-duration-num" min="1" max="15" value="5" step="0.5" data-sync="dur"></div></div></div><div class="preview-area"><label>Live Preview</label><div id="mutation-preview">MutationName</div><div class="preview-controls"><div id="gradient-arrow" title="Gradient Direction"></div><span id="animation-speed-display" title="Animation Speed"></span></div></div><div class="actions"><button id="submit-mutation-btn" class="submit-btn">Add Mutation</button></div><div class="status-message"></div></div></div>`;
            $('body').append(modalHTML);
            this.Modal.init(this); // Pass App context to Modal
        },

        // --- MODAL LOGIC OBJECT ---
        Modal: {
            init: function(parent) {
                this.parent = parent; // Store reference to the main App object
                this.$modal = $('#add-mutation-modal-overlay');
                this.bindEvents();
            },
            open: function() { this.reset(); this.$modal.fadeIn(200); },
            close: function() { this.$modal.fadeOut(200); },
            reset: function() {
                this.$modal.find('input[type=text]').val(''); $("#simple-color-hex").val("#FFFFFF").prev().css("background-color","#FFFFFF"); $("#gradient-colors").empty();this.addColorStop("#FFFFFF",0);this.addColorStop("#000000",100);$("#gradient-direction, #gradient-direction-num").val(90);$("#animation-duration, #animation-duration-num").val(5);this.$modal.find(".status-message").hide().text("");$("#submit-mutation-btn").prop("disabled",!1);this.updatePreview()
            },
            bindEvents: function() {
                // Correctly bind 'this' for event handlers to refer to the Modal object
                this.$modal.on('click', '.close-btn', this.close.bind(this));
                this.$modal.on('click', (e) => { if ($(e.target).is('#add-mutation-modal-overlay')) this.close(); });
                this.$modal.on('click', '.tab', (e) => {
                    const tabId = $(e.currentTarget).data('tab');
                    $('.tab, .tab-content').removeClass('active');
                    $(e.currentTarget).add('#tab-' + tabId).addClass('active');
                    this.updatePreview();
                });
                this.$modal.on('input', 'input[data-sync]', (e) => {
                    const syncId = $(e.currentTarget).data('sync');
                    $(`input[data-sync="${syncId}"]`).val($(e.currentTarget).val());
                    this.updatePreview(); // Ensure preview updates when typing in number field
                });
                this.$modal.on('input change', '#mutation-name, #animation-type', this.updatePreview.bind(this));
                this.$modal.on('click', '#add-color-btn', () => this.addColorStop());
                this.$modal.on('click', '.remove-color-btn', (e) => {
                    $(e.currentTarget).closest('.color-stop').remove();
                    this.updatePreview();
                });
                // CORRECTED: Bind handleSubmit with the App context
                this.$modal.on('click', '#submit-mutation-btn', this.parent.handleSubmit.bind(this.parent));

                // Color Picker Integration
                this.$modal.on('click', '.color-picker-trigger', (e) => {
                    const trigger = e.currentTarget;
                    const hexInput = $(trigger).next('input[type=text]')[0];
                    CustomColorPicker.show(trigger, hexInput.value, newColor => {
                        trigger.style.backgroundColor = newColor; hexInput.value = newColor;
                        this.updatePreview();
                    });
                });
                this.$modal.on('change', 'input.gradient-color-hex, #simple-color-hex', (e) => {
                    const hexInput = e.currentTarget;
                    if (/^#([0-9A-F]{3}){1,2}$/i.test(hexInput.value)) {
                        $(hexInput).prev('.color-picker-trigger').css('background-color', hexInput.value);
                        this.updatePreview();
                    }
                });
            },
            addColorStop: function(color, position) {
                if ($('#gradient-colors .color-stop').length >= 5) return;
                const stopId = `stop-${Date.now()}`;
                const $colorStop = $(`<div class="color-stop" id="${stopId}"><div class="color-input-group"><button class="color-picker-trigger" style="background-color:${color};"></button><input type="text" class="gradient-color-hex" value="${color}"></div><div class="slider-group"><input type="range" class="gradient-position" min="0" max="100" value="${position}" data-sync="${stopId}"><input type="number" class="gradient-position-num" min="0" max="100" value="${position}" data-sync="${stopId}"></div><button class="remove-color-btn">-</button></div>`);
                $('#gradient-colors').append($colorStop);
                this.updatePreview();
            },
            updatePreview: function() {
                const $preview = $('#mutation-preview');
                $preview.text($('#mutation-name').val() || 'MutationName').attr('style', '').removeClass();
                if ($('.tab.active').data('tab') === 'simple') {
                    $preview.css('color', $('#simple-color-hex').val());
                    $('#gradient-arrow, #animation-speed-display').hide();
                } else {
                    const settings = this.parent.getAnimatedSettings();
                    $('#gradient-arrow').css('transform', `rotate(${settings.direction})`).show();
                    $('#animation-speed-display').text(`${settings.duration}`).show();
                    const css = this.parent.generateCSS(settings, '.preview-style');
                    $('#preview-dynamic-style').remove();
                    $('head').append(`<style id="preview-dynamic-style">${css}</style>`);
                    $preview.addClass('preview-style');
                }
            },
            showStatus: function(msg, type) {
                this.$modal.find('.status-message').text(msg).removeClass('success error info').addClass(type || 'info').show();
            }
        },

        // --- API & SAVING LOGIC ---
        getAnimatedSettings: function() {
            const name = $('#mutation-name').val().trim();
            const settings = { name: name, className: "mut-" + (name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-") || "temp"), colors: [], direction: $("#gradient-direction").val()+"deg", animationType: $("#animation-type").val(), duration: $("#animation-duration").val()+"s"};
            $('#gradient-colors .color-stop').each(function() { settings.colors.push({color:$(this).find(".gradient-color-hex").val(),position:$(this).find(".gradient-position").val()})});
            return settings;
        },
        generateCSS: function(t, e) {
            const n=e||"."+t.className,o=t.colors.map(t=>`${t.color} ${t.position}%`).join(", ");let s,i="300% 100%";switch(t.animationType){case"secret":s=`@keyframes ${t.className}-anim{0%{background-position:100% 0}100%{background-position:-200% 0}}`;break;case"pulse":i="200% 200%",s=`@keyframes ${t.className}-anim{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}`;break;default:s=`@keyframes ${t.className}-anim{0%{background-position:200% 0}100%{background-position:-200% 0}}`}return`\n                ${n}{background:linear-gradient(${t.direction},${o});background-size:${i};-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:${t.className}-anim ${t.duration} linear infinite;}\n                ${s}`
        },
        handleSubmit: function() {
            const name = $('#mutation-name').val().trim();
            if (!name) { this.Modal.showStatus('Mutation name cannot be empty!', 'error'); return; }
            $('#submit-mutation-btn').prop('disabled', true);
            this.Modal.showStatus('Saving...', 'info');
            if ($('.tab.active').data('tab') === 'simple') {
                this.processSimple(name, $('#simple-color-hex').val());
            } else {
                this.processAnimated(this.getAnimatedSettings());
            }
        },
        saveContent: function(page, content, summary) {
            return this.api.postWithToken('csrf', { action: 'edit', title: page, text: content, summary: summary });
        },
        processSimple: function(name, color) {
            this.api.get({ action:'query', prop:'revisions', titles:this.CONFIG.templatePage, rvprop:'content', formatversion:2 })
                .then(data => {
                    const content=data.query.pages[0].revisions[0].content, newLine=`| ${name.padEnd(22)} = [[Mutations#${name}|<span style="color:${color};">'''${name}'''</span>]]`;
                    if(content.includes(`| ${name.padEnd(22)}`)) throw new Error("Mutation with this name already exists!");
                    const newContent=content.replace(this.CONFIG.insertionMarker,`${newLine}\n${this.CONFIG.insertionMarker}`);
                    return this.saveContent(this.CONFIG.templatePage,newContent,`Mutation Adder: Added simple mutation "${name}"`)
                })
                .then(() => { this.Modal.showStatus("Success! Reloading page...", "success"), setTimeout(()=>location.reload(),2e3) })
                .fail(err => { this.Modal.showStatus(`Error: ${err.message||err.error&&err.error.info||"Unknown error"}`,"error"),$("#submit-mutation-btn").prop("disabled",!1) });
        },
        processAnimated: function(settings) {
            if (!settings.className.substring(4)) { this.Modal.showStatus("Error: Invalid mutation name.", "error"); $("#submit-mutation-btn").prop("disabled", !1); return; }
            $.when(
                this.api.get({ action: 'query', prop: 'revisions', titles: this.CONFIG.cssPage, rvprop: 'content', formatversion: 2 }),
                this.api.get({ action: 'query', prop: 'revisions', titles: this.CONFIG.templatePage, rvprop: 'content', formatversion: 2 })
            ).then((cssData, tplData) => {
                const cssPage=cssData[0].query.pages[0], cssContent=(cssPage&&!cssPage.missing)?cssPage.revisions[0].content:"", newCSS=this.generateCSS(settings);
                const tplPage=tplData[0].query.pages[0], tplContent=tplPage.revisions[0].content, newLine=`| ${settings.name.padEnd(22)} = [[Mutations#${settings.name}|<span class="${settings.className}">'''${settings.name}'''</span>]]`;
                if (tplContent.includes(`| ${settings.name.padEnd(22)}`)) throw new Error("Mutation with this name already exists!");
                const newTplContent=tplContent.replace(this.CONFIG.insertionMarker,`${newLine}\n${this.CONFIG.insertionMarker}`);
                return $.when(
                    this.saveContent(this.CONFIG.cssPage, `${cssContent}\n\n${newCSS}`, `Mutation Adder: Styles for "${settings.name}"`),
                    this.saveContent(this.CONFIG.templatePage, newTplContent, `Mutation Adder: Added animated mutation "${settings.name}"`)
                )
            })
            .then(() => { this.Modal.showStatus("Success! Reloading page...", "success"), setTimeout(()=>location.reload(),2e3) })
            .fail(err => { this.Modal.showStatus(`Error: ${err.message||err.error&&err.error.info||"Unknown error"}`,"error"),$("#submit-mutation-btn").prop("disabled",!1) });
        }
    };

    mw.loader.using(['mediawiki.api']).done(function() {
        $(function() { App.init(); });
    });

})(window, jQuery, mediaWiki);