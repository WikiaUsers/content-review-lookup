/* for the old working version of Interwikis, see
https://bastelstube.fandom.com/de/wiki/MediaWiki:Richiesta_di_link_interlingua.js?oldid=7203 */

window.interwikiInternational = {
	config: {
        namespace: 'Richiesta',//   default:'Interwiki'
    	namespaceId: 118,//   default:'0
    	mainPage: 'Interlanguage_test'//   default:'Interlanguage_test'
 	},
        
	interwikiSchema: '{{bStart}}Richiesta di link interlingua|{{from}}|{{to}}{{bEnd}}',//   default:'Interwiki request'
	pageSchema: '{{bStart}}Titolo richiesta di link interlingua{{bEnd}}\n\n' +//   default:'{{bStart}}Interwiki request header{{bEnd}}'
			'{{interwikis}}\n\n' +
			'~~' + '~~',
};