/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.RegExp.noinclude = [".references", ".reference", ".thumbcaption",];