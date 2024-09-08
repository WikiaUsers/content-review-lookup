window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];
 
/** Summary filler
  * de RuneScape Wiki
  */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');
 
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText) { 
     mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": imageFile, 
        "speedTip": speedTip, 
        "tagOpen": tagOpen, 
        "tagClose": tagClose, 
        "sampleText": sampleText
    }; 
}
 
if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
    mw.loader.using('user.options').then(function () {
        if (mw.user.options.get('usebetatoolbar') == 1) {
            jQuery.when(mw.loader.using('ext.wikiEditor'), jQuery.ready)
                .then(function () {
                jQuery('#wpTextbox1').wikiEditor('addToToolbar', {
                    section: 'advanced',
                    group: 'format',
                    tools: {
                        character: {
                            label: 'Personagem',
                            type: 'button',
                            icon: 'https://static.wikia.nocookie.net/ben10reboot/images/9/99/%C3%8Dcone_de_Personagem.png/revision/latest?cb=20190305055753&path-prefix=pt-br',
                            action: {
                                type: 'encapsulate',
                                options: {
                                    post: '{{Personagem\n|nome = \n|Imagem = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|espécie = \n|planeta = \n|idade = \n|afiliação = \n|ocupação = \n|originalmente = \n|alternativo = \n|habilidades = \n|equipamento = \n|parentes = \n|apelidos = \n|dublagem = \n|primeira = \n}}\n'
                                }
                            }
                        }
                    }
                });
            });
        }
    });
}

if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
    mw.loader.using('user.options').then(function () {
        if (mw.user.options.get('usebetatoolbar') == 1) {
            jQuery.when(mw.loader.using('ext.wikiEditor'), jQuery.ready)
                .then(function () {
                jQuery('#wpTextbox1').wikiEditor('addToToolbar', {
                    section: 'advanced',
                    group: 'format',
                    tools: {
                        character: {
                            label: 'Alienígena',
                            type: 'button',
                            icon: 'https://static.wikia.nocookie.net/ben10reboot/images/c/c1/%C3%8Dcone_de_Alien%C3%ADgena.png/revision/latest?cb=20190305034714&path-prefix=pt-br',
                            action: {
                                type: 'encapsulate',
                                options: {
                                    post: '{{Alien\n|nome = \n|Imagem = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|espécie = \n|planeta = \n|originalmente = \n|poder = \n|dublagem = \n|primeira = \n}}\n'
                                }
                            }
                        }
                    }
                });
            });
        }
    });
}

if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
    mw.loader.using('user.options').then(function () {
        if (mw.user.options.get('usebetatoolbar') == 1) {
            jQuery.when(mw.loader.using('ext.wikiEditor'), jQuery.ready)
                .then(function () {
                jQuery('#wpTextbox1').wikiEditor('addToToolbar', {
                    section: 'advanced',
                    group: 'format',
                    tools: {
                        character: {
                            label: 'Episódio',
                            type: 'button',
                            icon: 'https://static.wikia.nocookie.net/ben10reboot/images/9/93/%C3%8Dcone_de_Epis%C3%B3dio.png/revision/latest?cb=20190305031225&path-prefix=pt-br',
                            action: {
                                type: 'encapsulate',
                                options: {
                                    post: '{{Episódio\n|nome = \n|imagem = Sem Imagem Ep.png\n|estreia eua = \n|estreia br = \n|série = \n|temporada = \n|nome original = \n|número do episódio = \n|número total = \n|anterior = \n|seguinte = \n|dirigido por = \n|escrito por = \n}}\n'
                                }
                            }
                        }
                    }
                });
            });
        }
    });
}

if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
    mw.loader.using('user.options').then(function () {
        if (mw.user.options.get('usebetatoolbar') == 1) {
            jQuery.when(mw.loader.using('ext.wikiEditor'), jQuery.ready)
                .then(function () {
                jQuery('#wpTextbox1').wikiEditor('addToToolbar', {
                    section: 'advanced',
                    group: 'format',
                    tools: {
                        character: {
                            label: 'Objeto',
                            type: 'button',
                            icon: 'https://static.wikia.nocookie.net/ben10reboot/images/3/3a/%C3%8Dcone_de_Objeto.png/revision/latest?cb=20190305034748&path-prefix=pt-br',
                            action: {
                                type: 'encapsulate',
                                options: {
                                    post: '{{Objeto\n|nome  = \n|Imagem = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|planeta = \n|uso = \n|tipo = \n|poder = \n|primeira = \n}}\n'
                                }
                            }
                        }
                    }
                });
            });
        }
    });
}

if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
    mw.loader.using('user.options').then(function () {
        if (mw.user.options.get('usebetatoolbar') == 1) {
            jQuery.when(mw.loader.using('ext.wikiEditor'), jQuery.ready)
                .then(function () {
                jQuery('#wpTextbox1').wikiEditor('addToToolbar', {
                    section: 'advanced',
                    group: 'format',
                    tools: {
                        character: {
                            label: 'Local',
                            type: 'button',
                            icon: 'https://static.wikia.nocookie.net/ben10reboot/images/e/e6/%C3%8Dcone_de_Local.png/revision/latest?cb=20190305031225&path-prefix=pt-br',
                            action: {
                                type: 'encapsulate',
                                options: {
                                    post: '{{Local\n|nome = \n|Imagem = <tabber>|-|Ben 10=[[Arquivo:|258px]]</tabber>\n|lugar = \n|tipo = \n|donos = \n|primeira = \n}}\n'
                                }
                            }
                        }
                    }
                });
            });
        }
    });
}

if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
    mw.loader.using('user.options').then(function () {
        if (mw.user.options.get('usebetatoolbar') == 1) {
            jQuery.when(mw.loader.using('ext.wikiEditor'), jQuery.ready)
                .then(function () {
                jQuery('#wpTextbox1').wikiEditor('addToToolbar', {
                    section: 'advanced',
                    group: 'format',
                    tools: {
                        character: {
                            label: 'Galeria',
                            type: 'button',
                            icon: 'https://static.wikia.nocookie.net/ben10reboot/images/2/20/%C3%8Dcone_de_Galeria.png/revision/latest?cb=20190305031225&path-prefix=pt-br',
                            action: {
                                type: 'encapsulate',
                                options: {
                                    post: '{{DISPLAYTITLE:Galeria: }}\n{{Voltar}}\n<tabber>\n\n<gallery position="center" orientation="none" hideaddbutton="true" widths="163" bordersize="none" bordercolor="transparent">\n\n</gallery>\n</tabber>\n[[Categoria:Galerias]]\n'
                                }
                            }
                        }
                    }
                });
            });
        }
    });
}