/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
$(function($, user) {if (user !== '') {
        $('.insertusername').text(user);}}(window.jQuery, (window.mw.config.get('wgUserName') || '')));