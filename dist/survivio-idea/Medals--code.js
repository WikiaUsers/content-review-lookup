/* Medals script v1.0.4
*  @author: Kopcap94
*  @support: Wildream
*  @testers: Fwy, White torch
*/

;(function($,mw) {
    var namespace = mw.config.get('wgNamespaceNumber');
    
    if (namespace !== 2 && namespace !== 1200 && namespace !== 500 && 
        (namespace !== 4 || mw.config.get('wgTitle') !== 'Medals' || mw.config.get('wgAction') !== 'view')) {
        return;
    }
    
    medalFunctions = {
        
// Default settings
        medalDefaultSettings: function() {
            default_cfg = JSON.stringify({dataUser:{}, dataMedal: {}, module_title: 'User\'s reward', module_more: 'Show more', module_count_info: 'Amounts of this achievement', module_info: '', module_info_title: '', border: { top_left: 'https://images.wikia.nocookie.net/siegenax/ru/images/1/13/Medal_Border_corner.png', top_right: 'https://images.wikia.nocookie.net/siegenax/ru/images/d/de/Medal_Border_corner_right.png' }});
            
            $('#mw-content-text').prepend('<div style="width:100%; text-aling:center; padding:20px;">Settings not exist or broken.&nbsp;<button id="MedalResetSettings">Reset them?</button></div>');
            $('#MedalResetSettings').click(function() {
                medalFunctions.saveSettingFunction(default_cfg);
            });
        },
        
// Switch setting's tabs function
        switchSettings: function(class_name) {
            $('.MedalSetMenu').hide();
            $('.' + class_name).show();
        },