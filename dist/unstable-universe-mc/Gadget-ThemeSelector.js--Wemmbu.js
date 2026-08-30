importArticles({
    type: 'style',
    articles: [
        'MediaWiki:Gadget-ThemeSelector.js/Wemmbu.css'
    ]
});

window.onload = () => {
	walkAndReplaceRegex(document.body, "Unstable Universe", "Wubeverse");
	walkAndReplaceRegex(document.body, "Wubeverse Wiki", "Wubepedia");
	walkAndReplaceRegex(document.body, "Unstable SMP", "WubeSMP");
}