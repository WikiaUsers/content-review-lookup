/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
$(function($, user) {if (user !== '') {
        $('.insertusername').text(user);}}(window.jQuery, (window.mw.config.get('wgUserName') || '')));