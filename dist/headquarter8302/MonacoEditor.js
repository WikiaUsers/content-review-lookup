/**
 * @title MonacoEditor
 * @author [[User:Headquarter8302]] headquarter8302
 * @desc An attempt to implement Microsoft's Monaco Editor into Fandom
 */

/**
 * The script imports from these URLs. The versions are pinned:
 * https://esm.sh/monaco-editor@0.52.2
 * https://esm.sh/monaco-editor@0.52.2/min/vs/editor/editor.main.css
 */

;(function(window, mw) {
	console.log("[MonacoEditor] Initializing...");
	
	window.dev = {} || window.dev;
	if (window.dev.monacoEditor) return;
	window.dev.monacoEditor = {} || window.dev.monacoEditor;
	if (!window.dev.monacoEditor.allowlist) { console.warn("[MonacoEditor] No allowlist!") }
	
	if (
		mw.config.get( 'wgTitle' ) == "BlankPage/MonacoEditor" // default test page
		|| window.dev.monacoEditor.allowlist.includes(mw.config.get( 'wgTitle' )) // whatever is in the allowlist
	) {
		const scriptInject = `import * as monaco from 'https://esm.sh/monaco-editor@0.52.2';
import editorWorker from 'https://esm.sh/monaco-editor@0.52.2/esm/vs/editor/editor.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

monaco.editor.create(document.getElementById('mw-content-text'), {
  value: "function hello() { alert('Hello world!') } \\n function hello() { alert('Hello world!') } \\n function hello() { alert('Hello world!') } \\n",
  language: 'javascript'
});`;
		
		mw.hook( 'wikipage.content' ).add(() => {
			const scriptTag = document.createElement("script");
			const styleLinkTag = document.createElement("link");
			
			scriptTag.setAttribute("type", "module");
			styleLinkTag.setAttribute("rel", "stylesheet");
			styleLinkTag.setAttribute("data-name", "vs/editor/editor.main");
			styleLinkTag.setAttribute("href", "https://esm.sh/monaco-editor@0.52.2/min/vs/editor/editor.main.css");
			scriptTag.textContent = scriptInject;
			
			// document.getElementsByClassName('page__main')[0].innerHTML = `<div id="monaco-container" style="min-height: 75vh"></div>`;
			document.getElementById("mw-content-text").style.setProperty("min-height", "50vh");
			document.head.appendChild(scriptTag);
			document.head.appendChild(styleLinkTag);
			
			console.log("[MonacoEditor] Done");
		});
	}
})(this, mediaWiki);