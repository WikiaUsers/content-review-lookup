/* Códigos JavaScript colocados aqui serão carregados por todos que acessarem alguma página desta wiki */

// adding this here because it loads before everything and for the gadget to be defined only as styles
if (mw.user.options.get('gadget-DarkTheme') === 1) importScript('MediaWiki:Gadget-DarkTheme.js');