/**
 * [FOXTOOLS — PATROLLERS HELPER SCRIPT]
 * 
 * •==============================================•
 * > Pencipta: Janorovic Volkov
 * > Pengembang: Janorovic Volkov
 * > Tipe: JavaScript (Module)
 * 
 * Lihat [[WP:FT]] untuk informasi selengkapnya
 * tentang skrip ini
 * •==============================================•
 */
// <nowiki>
(function () {
	const autoconfirmed = mw.config.get("wgUserGroups").includes("autoconfirmed");
	const confirmed = mw.config.get('wgUserGroups').includes("confirmed");
	if (!autoconfirmed && !confirmed) return;
	function notiOK(msg){ mw.notify ? mw.notify(msg, { type: 'success' }) : alert(msg); }
	const prefads = `[[WP:FT|🦊 FoxTools]]`;
    const FT = window.FoxTools;
    const module = {
        name: "Preferences",
        init() {
            mw.util.addPortletLink(
                "p-tb",
                "#",
                "Preferensi (FT)",
                "t-ft-preferences",
                "Preferensi FoxTools",
                "p"
            ).addEventListener("click", () => this.openPanel());
        },
        openPanel() {
            let panel = document.getElementById("fox-panel");
            if (!panel) {
                panel = document.createElement("div");
                panel.id = "fox-panel";
                panel.innerHTML = `
                <div class="fox-header">
                    <div class="ft-dots">
                        <div class="dot yellow"></div>
                        <div class="dot green"></div>
                        <div class="dot red"></div>
                    </div>
                    <div style="float:right;">
                        <button id="fox-close">×</button>
                    </div>
                    <br>
                    <h3><big>🦊 FoxTools — Preferensi</big></h3>
                </div>
                <br>
                <div class="fox-card">
                    <div id="fox-content"></div>
                </div>
                `;
                document.body.appendChild(panel);
                document.getElementById("fox-close").addEventListener("click", () => panel.remove());
            }
            const konten = document.getElementById("fox-content");
            konten.innerHTML = `
            <p>Selamat datang di Preferensi FoxTools!</p>
            <label><big><b>• Iklan ringkasan suntingan:</b></big></label>
            <br>
            <input type="text" id="pref-ads" style="width:95%" value="${FT.userConfig.ads || ''}">
            <br>
            <label><big><b>• Daftar modul yang diaktifkan:</b></big></label>
            <br>
            <div id="pref-modules" class="fox-row"></div>
            <br>
            <br>
            <button id="pref-apply" class="fox-btn-progressive">Terapkan</button>
            <button id="pref-reset" class="fox-btn-danger">Setelan pabrik</button>
            `;
            const modulesDiv = document.getElementById("pref-modules");
            const allModules = ["Report", "Protect", "KPC", "UP", "Block", "Rollback"];
            const activeModules = FT.userConfig.modules || [];
            allModules.forEach(mod => {
                const checked = activeModules.includes(mod) ? 'checked' : '';
                const label = document.createElement('label');
                label.innerHTML = `<input type="checkbox" class="pref-module" value="${mod}" ${checked}> ${mod}`;
                modulesDiv.appendChild(label);
            });
            document.getElementById("pref-apply").onclick = async () => {
                const adsInput = document.getElementById("pref-ads").value.trim();
                const selectedModules = Array.from(document.querySelectorAll(".pref-module"))
                    .filter(chk => chk.checked)
                    .map(chk => chk.value);
                FT.userConfig.ads = adsInput || FT.userConfig.ads;
                FT.userConfig.modules = selectedModules.length ? selectedModules : FT.userConfig.modules;
                const api = new mw.Api();
                api.postWithToken("csrf", {
                    action: "edit",
                    title: `User:${mw.config.get("wgUserName")}/Preferensi-FoxTools.json`,
                    text: JSON.stringify(FT.userConfig, null, 2),
                    summary: `Memperbarui preferensi FoxTools (${prefads})`,
                    tags: "FoxTools",
                    minor: true
                });
                FT.ads = FT.userConfig.ads;
                notiOK("🟢 Preferensi berhasil disimpan");
                panel.remove();
            };
            document.getElementById("pref-reset").onclick = async () => {
                const defaultPrefs = {
                    ads: "[[WP:id:Wikipedia:FT|🦊 FoxTools]]",
                    modules: allModules
                };
                FT.userConfig = defaultPrefs;
                FT.ads = defaultPrefs.ads;
                document.getElementById("pref-ads").value = FT.ads;
                document.querySelectorAll(".pref-module").forEach(chk => chk.checked = true);
                const api = new mw.Api();
                api.postWithToken("csrf", {
                    action: "edit",
                    title: `User:${mw.config.get("wgUserName")}/Preferensi-FoxTools.json`,
                    text: JSON.stringify(defaultPrefs, null, 2),
                    summary: `Reset preferensi FoxTools ke setelan pabrik (${prefads})`,
                    tags: "FoxTools",
                    minor: true
                });
                notiOK("🟢 Preferensi direset ke setelan pabrik.");
                panel.remove();
            };
         	mw.util.addCSS(`
        	#fox-panel {
             	position: fixed;
            	top: 50%; left: 50%;
            	transform: translate(-50%, -50%);
            	max-width: 640px;
            	width: 92%;
            	background: rgba(30, 35, 45, 0.75);
            	color: #f5f6fa;
            	border: 1px solid rgba(180, 200, 255, 0.2);
            	border-radius: 10px;
            	padding: 1.2em 1.4em;
            	font-family: "Noto Sans", "Segoe UI", sans-serif;
            	font-size: 14px;
            	z-index: 9999;
            	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.55);
            	transition: all 0.3s ease-in-out;
            	animation: foxFadeIn 0.25s ease-out;
        	}
        	@keyframes foxFadeIn {
            	from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); }
            	to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        	}
        	#fox-panel h3 {
            	margin-top: 0;
            	font-size: 16px;
            	font-weight: 600;
            	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            	padding-bottom: .5em;
            	color: #8be9fd;
            	display: flex;
            	align-items: center;
            	justify-content: space-between;
        	}
        	#fox-close {
            	background: none;
            	color: #8be9fd;
            	border: none;
            	font-weight: bold;
            	cursor: pointer;
            	transition: color 0.2s ease;
        	}
        	#fox-close:hover {
            	color: #ff5555;
            	text-decoration: underline;
        	}
        	#fox-panel button,
        	#fox-panel select,
        	#fox-panel input {
            	font-family: inherit;
            	font-size: 14px;  
            	border-radius: 6px;
            	padding: 6px 12px;  border: 1px solid rgba(180, 200, 255, 0.3);
            	margin-top: 6px;
            	margin-bottom: 10px;
            	background: rgba(255, 255, 255, 0.05);
            	color: #f5f6fa;
            	transition: all 0.2s ease;
        	}
        	#fox-panel button:hover,
        	#fox-panel select:hover,
        	#fox-panel input:hover {
            	background: rgba(255, 255, 255, 0.12);
            	border-color: rgba(180, 200, 255, 0.6);
        	}
        	#fox-panel button:focus,
        	#fox-panel select:focus,
        	#fox-panel input:focus {
            	outline: none;
            	box-shadow: 0 0 0 2px rgba(140, 200, 255, 0.5);
        	}
        	#fox-panel .fox-btn-danger {
            	background: linear-gradient(135deg, #d33, #a00);
            	border: 1px solid #a00;
            	color: #fff;
            	font-weight: bold;
        	}
        	#fox-panel .fox-btn-danger:hover {
            	background: linear-gradient(135deg, #e44, #c11);
            	box-shadow: 0 0 6px rgba(255, 100, 100, 0.6);
        	}
        	#fox-panel .fox-btn-progressive {
            	background: linear-gradient(135deg, #2a8af7, #006be6); /* biru progressive */
            	border: 1px solid #0060c7;
            	color: #fff;
            	font-weight: bold;
        	}
        	#fox-panel .fox-btn-progressive:hover {
            	background: linear-gradient(135deg, #3a9aff, #0d7aff);
            	box-shadow: 0 0 6px rgba(80, 150, 255, 0.6);
        		
        	}
         	.fox-row {
            	display: flex;
            	gap: 12px;
            	flex-wrap: wrap;
            	justify-content: space-between;
        	}
        	.fox-card {
            	flex: 1 1 260px;
            	border: 1px solid rgba(180, 200, 255, 0.15);
            	padding: 12px;
            	border-radius: 8px;
            	background: rgba(255, 255, 255, 0.04);
            	transition: transform 0.15s ease, background 0.2s ease;
        	}
         	.fox-card:hover {
            	transform: translateY(-2px);
            	background: rgba(255, 255, 255, 0.07);
        	}
        	.ft-dots {
            	display: flex;
            	gap: 6px;
             	margin-bottom: 6px;
        	}
        	.ft-dots .dot {
             	width: 10px; height: 10px;
             	border-radius: 50%;
            	box-shadow: 0 0 3px rgba(255,255,255,0.4);
        	}
        	.dot.red { background: #ff5555; }
        	.dot.yellow { background: #f1fa8c; }
        	.dot.green { background: #50fa7b; }
        	`);            
        }
    };
    FT.register && FT.register("Preferences", module);
})();
// </nowiki>