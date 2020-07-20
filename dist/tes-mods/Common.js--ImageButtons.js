/**
 * 19:38, August 22, 2014 (UTC)
 * @desc: Adds a button for easily adding templates to files.
 * @author: UltimateSupreme (http://dev.wikia.com/wiki/User:UltimateSupreme)
 * using code by Callofduty4
 * @License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
 */
(function($, mw, undefined) {
    'use strict';
 
    if (mw.config.get('wgCanonicalNamespace') !== 'File')
        return;
 
    var Options = {
            '{{No license}}': 'Unlicensed image',
            '{{No rationale}}': 'No Fairuse info',
            '{{Unused}}': 'Unused image',
            '{{Poor filename}}': 'Poor name',
            '{{Duplicate|duplicate}}': 'Duplicate',
            '{{Duplicate|near duplicate}}': 'Near duplicate'
        },
        tempOptStr = '';
 
    for (var i in Options) {
        tempOptStr += '<option value="' + i + '" style="text-align:center;">' + Options[i] + '</option>';
    }
 
    var html = '<p style="text-align:center;" class="TemplateAdder"><select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Add template</a>';
    $('.comments').after(html);
    $('#templateSubmit').click(function() {
        $(this).html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
        new mw.Api().post({
                format: 'json',
                action: 'edit',
                title: mw.config.get('wgPageName'),
                token: mw.user.tokens.get('editToken'),
                summary: 'Adding template: ' + $('#FileTemplateAdder').val(),
                minor: true,
                prependtext: $('#FileTemplateAdder').val() + "\n"
            })
            .done(function() {
                $('#templateSubmit').text('Add this Template too!');
                window.GlobalNotification.show('Template: ' + $('#FileTemplateAdder').val() + ' Added Successfully!', 'confirm');
            })
            .fail(function() {
                window.GlobalNotification.show('Template addition failed! Please contact an administrator for more assistance.', 'error');
            });
    });
}).call(this, jQuery, mediaWiki);