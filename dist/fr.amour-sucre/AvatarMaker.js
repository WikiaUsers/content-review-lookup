/**
 * Avatar Maker
 * @description Permet de créer un avatar à partir d'une liste d'url
 */
const dataModalTexts = {
	modalTitle: "Création d'avatar",
	btnLink: "Créer un avatar",
	formName: "Formulaire",
	outputName: "Aperçu",
	startBtn: "Commencer"
};
const dataOutputTexts = {
	name: "Nom de l'image",
	isBySkin: "Dupliquer par couleur de peau",
	fieldSize: "Cadrage",
	outfitList: "Liste des autres éléments (dans l'ordre de superposition)"
};
const fieldSizesData = {
	//full: "Entier", //À venir
	big: "Gros"
};
const outputSizesData = {
	big: { width: "1280", height: "720" }
}
const basePartsText = {
	skin: "Peau",
	mouth: "Bouche",
	eyesSkin: "Paupières",
	eyes: "Yeux",
	eyebrowsSkin: "Front",
	eyebrowsHair: "Sourcils",
	hairBack: "Cheveux (arrière)",
	underwear: "Sous-vêtements",
	top: "Haut",
	hairFront: "Cheveux (devant)"
};
const skinNames = ["rose", "tulip", "marigold", "hortensia", "orchid", "lys", "pansy"];

mw.loader.using('mediawiki.api', function() {
    'use strict';
    
    if (
        window.AvatarMakerLoaded ||
        !/sysop|staff|wiki-specialist|content-moderator|soap/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }
    window.AvatarMakerLoaded = true;
 
    var api = new mw.Api(),
        ui,
        modal,
        placement,
        scriptName = "avatarMaker";
    
    function openModal() {
        if (!modal) {
	        modal = new window.dev.modal.Modal({
	            content: {
	            	type: "div",
	            	attr: { style: "display: grid; grid-template-columns: 1fr 1fr .5fr;" },
	            	children: [
	            		ui({ type: 'form', children: getOutputForm(), attr: { id: scriptName + "Output" } }),
	            		ui({ type: 'form', children: getCalcForm(), attr: { id: scriptName + "Calc" } }),
	            		ui({ type: 'section' })
	            	]
			    },
	            id: scriptName + 'Form',
	            size: 'larger',
	            title: dataModalTexts.modalTitle,
            buttons: [
                {
                    id: 'am-start',
                    text: dataModalTexts.startBtn,
                    primary: true,
                    event: 'start'
                }
            ],
            events: { start }
	        });
	        modal.create();
        }
        modal.show();
    }
    
    function getOutputForm() {
    	return [
			ui({
				type: 'p',
				children: [
					ui({ type: 'label', text: dataOutputTexts.name, attr: { for: scriptName + 'Name' } }),
					ui({ type: 'input', attr: { type: 'text', name: scriptName + 'Name', id: scriptName + 'Name' } })
				]
			}),
			ui({
				type: 'p',
				children: [
					ui({ type: 'label', text: dataOutputTexts.isBySkin, attr: { for: scriptName + 'IsBySkin' } }),
					ui({ type: 'input', attr: { type: 'checkbox', name: scriptName + 'IsBySkin', id: scriptName + 'IsBySkin' } })
				]
			}),
		    ui({
		    	type: 'p',
		    	children: [
		    		ui({ type: 'label', text: dataOutputTexts.fieldSize, attr: { for: scriptName + 'FieldSize' } }),
		    		ui({ 
		    			type: 'select', 
		    			attr: { name: scriptName + 'FieldSize', id: scriptName + 'FieldSize' },
		    			children: Object.entries(fieldSizesData).map(([value, text]) =>
		    				ui({ type: 'option', text, attr: { value } })
		    			)
		        	})
		        ]
		    })
	    ];
    }
    
    function getCalcForm() {
		return [
		    ...Object.entries(basePartsText).map(([value, text]) => {
		    	value = value.charAt(0).toUpperCase() + value.slice(1);
		    	return ui({
		    		type: 'p',
		    		attr: { class: "avatarBase" },
					children: [
						ui({ type: 'label', text, attr: { for: scriptName + value }}),
						ui({ type: 'input', attr: { type: 'text', name: scriptName + value, id: scriptName + value } })
					]
				});
		    }),
		    ui({
		    	type: 'p',
		    	text: dataOutputTexts.clothList,
				children: [
					ui({ type: 'textarea', attr: { name: scriptName + 'ClothList', id: scriptName + 'ClothList', style: "width: 100%;" }})
				]
			})
		  ];
	}
	
	function start() {
		const container = document.getElementById(scriptName + 'Form');
		const outputData = container.querySelector("#" + scriptName + "Output").elements;
		const calcData = container.querySelector("#" + scriptName + "Calc").elements;
		console.log(calcData);
		
		const output = container.querySelector('section');
		const canvasSizes = outputSizesData[outputData.fieldSize];
		
		const urlList = Object.values(calcData).flatMap(e => e.value.split('\n'));
		getNewCanvas(urlList, canvasSizes, function(canvas) {
		    output.appendChild(canvas);
		});
	}
	
	function getNewCanvas(urlList, canvasSizes, callback) {
		const canvas = Object.assign(document.createElement('canvas'), canvasSizes);
		const ctx = canvas.getContext("2d");
		const { width, height } = canvasSizes;
		
		let index = 0;
		function loadNext() {
	        if (index >= urlList.length) {
	            return callback(canvas);
	        }
	
	        let img = new Image();
	        img.onload = function() {
	            ctx.drawImage(img, 0, 0, width, height);
	            index++;
	            loadNext();
	        };
	        img.onerror = function() {
	            console.error(urlList[index]);
	            index++;
	            loadNext();
	        };
	        img.src = urlList[index];
	    }
	
	    loadNext();
	}
	
	const hookData = [
		{
			name: 'ui',
			preload: () => { 
				ui = window.dev.ui;
			}
		},
		{
			name: 'modal'
		},
		{
			name: 'ui',
			preload: () => { 
				placement = window.dev.placement.loader;
		        $(placement.element('tools'))[placement.type('prepend')](
		            $('<li>').append(
		                $('<a>', {
		                    id: 't-am',
		                    text: dataModalTexts.btnLink,
		                    click: openModal
		                })
		            )
		        );
			}
		}
	];
	hookData.forEach(({ name, preload }) => {
		const hook = mw.hook('dev.' + name);
		if (preload) {
			hook.add(preload);
		}
	});
 
    importArticles({
        type: 'script',
        articles: [
        	'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:Placement.js'
        ]
    });
    
});