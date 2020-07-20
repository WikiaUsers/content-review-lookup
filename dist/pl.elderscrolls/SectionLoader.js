// SectionLoader.js
// CC-BY-NA-SA
// Autor: Vuh
if (wgNamespaceNumber === 0 && wgPageName != 'Elder_Scrolls_Wiki' && mw.util.getParamValue('diff')==null) {
	function SectionLoader() {
		$.get("/wiki/MW:" + newmodule + "?action=raw", function (result) {
			if ($('.WikiaSearch').length > 0) {
				$('.WikiaSearch').after(
					$('<section />').addClass("module newmodule")
					.append(result)
				)
			}
		})
	};
addOnloadHook(SectionLoader);
}