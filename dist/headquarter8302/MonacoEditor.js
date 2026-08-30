/**
 * @title MonacoEditor
 * @author [[User:Headquarter8302]] headquarter8302
 * @desc An attempt to implement Microsoft's Monaco Editor into Fandom
 */

/**
 * The script imports from these URLs. The versions are pinned:
 * https://esm.sh/@monaco-editor/loader@1.7.0
 * https://esm.sh/monaco-editor@0.56.0/min/vs/editor/editor.main.css
 */

;((window, mw) => {
  console.log("[MonacoEditor] Initializing...");

	window.dev = window.dev || {};
	if (window.dev.monacoEditor) return;
	window.dev.monacoEditor = window.dev.monacoEditor || {};
	if (!window.dev.monacoEditor.allowlist) console.warn("[MonacoEditor] No allowlist!")

	if (
		mw.config.get( 'wgPageName' ) == "Special:BlankPage/MonacoEditor" // default test page
		|| window.dev.monacoEditor.allowlist.includes(mw.config.get( 'wgTitle' )) // whatever is in the allowlist
	) {
    const scriptInject = `
import loader from "https://esm.sh/@monaco-editor/loader@1.7.0"

loader.init().then(monaco => {
  monaco.editor.create(document.getElementById('content'), {
    value: '// hello world',
    language: 'javascript'
  })
})
`;

		mw.hook( 'wikipage.content' ).add(() => {
			document.getElementById('content').textContent = ""

			const scriptTag = document.createElement("script")
			const styleLinkTag = document.createElement("link")

			scriptTag.setAttribute("type", "module")
			styleLinkTag.setAttribute("rel", "stylesheet")
			styleLinkTag.setAttribute("data-name", "vs/editor/editor.main")
			styleLinkTag.setAttribute("href", "https://esm.sh/monaco-editor@0.56.0/min/vs/editor/editor.main.css")
			scriptTag.textContent = scriptInject

			// document.getElementsByClassName('page__main')[0].innerHTML = `<div id="monaco-container" style="min-height: 75vh"></div>`
			document.getElementById("content").style.setProperty("min-height", "50vh")
			document.head.appendChild(scriptTag)
			document.head.appendChild(styleLinkTag)

			console.log("[MonacoEditor] Done");
		});
	}
})(this, mediaWiki);