/**
 * [FOXTOOLS — PATROLLERS HELPER SCRIPT]
 * 
 * •==============================================•
 * > Pencipta: Janorovic Volkov
 * > Pengembang: Janorovic Volkov
 * > Tipe: JavaScript (Module)
 * 
 * Lihat [[WP:id:WP:FT]] untuk informasi selengkapnya
 * tentang skrip ini
 * •==============================================•
 */
// <nowiki>
(function () {
	function notiOK(msg){ mw.notify ? mw.notify(msg, { type: 'success' }) : alert(msg); }
	function notiWARN(msg){ mw.notify ? mw.notify(msg, { type: 'warn' }) : alert('⚠️ ' + msg); }
	async function loadSPITemplate(api) {
    	const res = await api.get({
    		action: "query",
    		titles: "Wikipedia:Investigasi pengguna siluman/IPS/Form.json",
    		prop: "revisions",
    		rvprop: "content",
    		rvslots: "main",
    		format: "json"
    	});
    	const page = Object.values(res.query.pages)[0];
    	if (!page.revisions) throw new Error("Templat JSON tidak ditemukan");
    	return JSON.parse(page.revisions[0].slots.main['*']);
    }
    const FT = window.FoxTools || {};
    const module = {
        name: "Report",
        init() {
            mw.util.addPortletLink(
                "p-tb",
                "#",
                "Lapor (FT)",
                "t-ft-report",
                "Lapor pengguna",
                "l"
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
                    <h3><big>🦊 FoxTools — Laporkan</big></h3>
                </div>
                <br>
                <div id="fox-content"></div>
                `;
                document.body.appendChild(panel);
                document.getElementById("fox-close").addEventListener("click", () => {
                    panel.remove();
                });
            }

            const konten = document.getElementById("fox-content");
            konten.innerHTML = `
                <div class="fox-card">
                    <p class="fox-muted">Pilih jenis laporan yang ingin dikirim:</p>
                    <div class="fox-row">
                        <label><input type="radio" name="fox-radio" value="vandalisme" checked> WP:IPTV (Vandalisme / spam)</label>
                        <label><input type="radio" name="fox-radio" value="nama"> WP:UAA (Nama pengguna)</label>
                        <label><input type="radio" name="fox-radio" value="siluman"> WP:IPS (Siluman / boneka)</label>
                    </div>
                    <hr><br>
                    <div id="fox-form-container"></div>
                </div>
            `;

            renderForm("vandalisme");

            document.querySelectorAll("input[name='fox-radio']").forEach(radio => {
                radio.addEventListener("change", (e) => renderForm(e.target.value));
            });

            function renderForm(type) {
                const container = document.getElementById("fox-form-container");
                container.innerHTML = "";
                if (type === "vandalisme") return renderVandalForm(container);
                if (type === "nama") return renderNamaForm(container);
                if (type === "siluman") return renderSilumanForm(container);
            }

            function renderVandalForm(container) {
                const relevantUser = mw.config.get("wgRelevantUserName") || "";
                container.innerHTML = `
                    <div>
                        <strong><big><big>WP:IPTV (Vandalisme / spam)</big></big></strong>
                        <br><br>
                        <label><big><b>• Nama pengguna:</b></big></label>
                        <br>
                        <input id="fox-nama-vandal" value="${relevantUser}" style="width:95%">
                        <br>
                        <label><big><b>• Alasan:</b></big></label>
                        <br>
                        <textarea id="fox-reason" style="width:95%; height:80px;"></textarea>
                        <br><br>
                        <button id="fox-kirim-vandal" class="fox-btn-danger">Kirim</button>
                    </div>
                `;
                document.getElementById("fox-kirim-vandal").onclick = async () => {
                    const nama = document.getElementById("fox-nama-vandal").value.trim();
                    const alasan = document.getElementById("fox-reason").value.trim();
                    if (!nama) return notiWARN("⚠️ Masukkan nama pengguna!");
                    if (!alasan) return notiWARN("⚠️ Isi alasan mengapa pengguna tersebut bermasalah!");
                    const page = "Wikipedia:Intervensi pengurus terhadap vandalisme";
                    const laporan = `* {{Vandal-m|${nama}}} — '''Alasan:''' ${alasan} --~~~~`;
                    const api = new mw.Api();
                    try {
                     	const res = await api.get({
                     		action: "query",
                    		prop: "revisions",
                	   		titles: page,
                	   		rvslots: "main",
                    		rvprop: "content",
                			formatversion: 2,
                		});
                		const content = res.query.pages[0].revisions[0].slots.main.content;
                		const updated = content.replace(
                			/(== Laporan ==\n)([\s\S]*?)(?=\n==|$)/,
                			(match, header, body) => `${header}${body.trim()}\n${laporan}\n`
                		);               		
                        await api.postWithEditToken({
                            action: "edit",
                            title: page,
                            text: updated,
                            summary: `Melaporkan [[Istimewa:Kontribusi/${nama}|${nama}]] (${FT.ads || ""})`,
                            tags: "FoxTools"
                        });
                        notiOK("🟢 Laporan berhasil dikirim");
                        panel.remove();
                    } catch (e) {
                    	console.error(e);
                        notiWARN("⚠️ Terjadi kesalahan saat mengirim laporan!");
                    }
                };
            }
            
            function renderNamaForm(container) {
                const relevantUser = mw.config.get("wgRelevantUserName") || "";
                container.innerHTML = `
                    <div>
                        <strong><big><big>WP:UAA (Nama pengguna)</big></big></strong>
                        <br><br>
                        <label><big><b>• Nama pengguna:</b></big></label>
                        <br>
                        <input id="fox-nama-uaa" value="${relevantUser}" style="width:95%">
                        <br>
                        <label><big><b>• Alasan:</b></big></label>
                        <br>
                        <textarea id="fox-reason" style="width:95%; height:80px;"></textarea>
                        <br><br>
                        <button id="fox-kirim-uaa" class="fox-btn-danger">Kirim</button>
                    </div>
                `;
                document.getElementById("fox-kirim-uaa").onclick = async () => {
                    const nama = document.getElementById("fox-nama-uaa").value.trim();
                    const alasan = document.getElementById("fox-reason").value.trim();
                    if (!nama) return notiWARN("⚠️ Masukkan nama pengguna!");
                    if (!alasan) return notiWARN("⚠️ Isi alasan mengapa pengguna tersebut bermasalah!");
                    const page = "Wikipedia:Permintaan perhatian nama pengguna";
                    const laporan = `* {{User-uaa|${nama}}} — '''Alasan:''' ${alasan} --~~~~`;
                    const api = new mw.Api();
                    try {
                        const res = await api.get({
                            action: "query",
                            prop: "revisions",
                            titles: page,
                            rvslots: "main",
                            rvprop: "content",
                            formatversion: 2,
                        });
             	   		const content = res.query.pages[0].revisions[0].slots.main.content;
             	   		const updated = content.replace(
            	   			/(== Dilaporkan oleh pengguna terdaftar ==\n)([\s\S]*?)(?=\n==|$)/,
             	   			(match, header, body) => `${header}${body.trim()}\n${laporan}\n`
             	   		);
                        await api.postWithEditToken({
                            action: "edit",
                            title: page,
                            text: updated,
                            summary: `Melaporkan [[Istimewa:Kontribusi/${nama}|${nama}]] (${FT.ads || ""})`,
                            tags: "FoxTools"
                        });
                        notiOK("🟢 Laporan berhasil dikirim");
                        panel.remove();
                    } catch (e) {
                        console.error(e);
                        notiWARN("⚠️ Terjadi kesalahan saat mengirim laporan!");
                    }
                };
            }

            function renderSilumanForm(container) {
                const relevantUser = mw.config.get("wgRelevantUserName") || "";
                container.innerHTML = `
                    <div>
                        <b><big><big>WP:IPS (Siluman / boneka)</big></big></b>
                        <br><br>
                        <label><big><b>• Nama pengendali / induk siluman:</b></big></label>
                        <br>
                        <input id="fox-nama-induk" type="text" value="${relevantUser}" style="width:95%">
                        <br>
                        <label><big><b>• Daftar akun siluman:</b></big></label>
                        <br>
                        <div id="fox-sock-list">
                            <input class="fox-sock" type="text" style="width:95%"><br>
                        </div>
                        <button id="fox-tambah-sock" style="margin-top:4px;">+ Tambahkan</button>
                        <br>
                        <label><big><b>• Bukti:</b></big></label>
                        <br>
                        <textarea id="fox-evidence" style="width:95%; height:80px;"></textarea>
                        <br><br>
                        <button id="fox-kirim-siluman" class="fox-btn-danger">Kirim</button>
                    </div>
                `;
                document.getElementById("fox-tambah-sock").onclick = () => {
                    const list = document.getElementById("fox-sock-list");
                    const input = document.createElement("input");
                    input.className = "fox-sock";
                    input.type = "text";
                    input.style = "width:95%";
                    list.appendChild(input);
                    list.appendChild(document.createElement("br"));
                };
                document.getElementById("fox-kirim-siluman").onclick = async () => {
                    const induk = document.getElementById("fox-nama-induk").value.trim();
                    const sockInputs = Array.from(document.querySelectorAll(".fox-sock"))
                        .map(i => i.value.trim())
                        .filter(Boolean);
                    const evidence = document.getElementById("fox-evidence").value.trim();
                    if (!induk || sockInputs.length === 0)
                        return notiWARN("⚠️ Masukkan nama pengendali dan minimal satu akun siluman!");

                    const api = new mw.Api();
                    const halamanSPI = `Wikipedia:Investigasi pengguna siluman/${induk}`;
                    let sockParams = "";
                    sockInputs.forEach((nama) => {
                        sockParams += `|${nama}`;
                    });
                    const tplData = await loadSPITemplate(api);
                    const templatSPI = tplData.case_template
                    .replace(/\$controller/g, induk)
                    .replace(/\$socks/g, sockParams)
                    .replace(/\$evidence/g, evidence || "");
                    try {
                        const pageCheck = await api.get({ action: "query", titles: halamanSPI, format: "json" });
                        const pageId = Object.keys(pageCheck.query.pages)[0];
                        const pageExists = pageId !== "-1";
                        if (!pageExists) {
                            await api.postWithEditToken({
                                action: "edit",
                                title: halamanSPI,
                                text: templatSPI,
                                summary: `Membuat laporan baru untuk [[Istimewa:Kontribusi/${induk}|${induk}]] (${FT.ads || ""})`,
                                tags: "FoxTools"
                            });
                            notiOK(`🟢 Halaman investigasi baru dibuat untuk ${induk}`);
                        } else {
                            await api.postWithEditToken({
                                action: "edit",
                                title: halamanSPI,
                                appendtext: `\n${templatSPI}`,
                                summary: `Menambahkan laporan baru untuk [[Istimewa:Kontribusi/${induk}|${induk}]] (${FT.ads || ""})`,
                                tags: "FoxTools",
                            });
                            notiOK(`🟢 Laporan berhasil ditambahkan ke halaman investigasi ${induk}`);
                        }
                        panel.remove();
                    } catch (e) {
                        console.error(e);
                        notiWARN("⚠️ Terjadi kesalahan saat mengirim laporan SPI.");
                    }
                };
            }
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
    	#fox-panel textarea,
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
    	#fox-panel textarea:hover,
    	#fox-panel input:hover {
        	background: rgba(255, 255, 255, 0.12);
        	border-color: rgba(180, 200, 255, 0.6);
    	}
    	#fox-panel button:focus,
    	#fox-panel select:focus,
    	#fox-panel textarea:focus,
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
    	.fox-muted {
        	color: #aab6c3;
        	font-size: 90%;
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
    FT.register && FT.register("Report", module);
})();
// </nowiki>