/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
            'bot': {
                u: 'BOT',
                order: -1/0 
            },
            bureaucrat: { 
                u: 'BUREAUCRAT',
                order: 1 
            },
            sysop: {
                u: 'ADMINISTRATOR',
                order: 2
            },
            moderator: {
                u: 'MODERATOR',
                order: 3
            },
            'content-moderator': {
                u: 'CONTENT MODERATOR',
                order: 4 
            },
            threadmoderator: {
                u: 'DISCUSSION MODERATOR',
                order: 5 
            },
            newuser: { 
                u: 'NEW USER',
                order: 6
            }
	}
};
UserTagsJS.modules.implode = {
    'moderator': ['content-moderator','threadmoderator']
};
UserTagsJS.modules.mwGroups = ['bannedfromchat', 'blocked', 'bot', 'bot-global' , 'bureaucrat',  'checkuser', 'content-moderator', 'council', 'helper', 'rollback', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'soap']
UserTagsJS.modules.newuser = { // should be equal to auto-confirmed
	days: 3,
	edits: 0,
	namespace: 0
};
var MessageBlock = {
  title : 'Blocked',
  message : 'You have been blocked for $2 because you have $1. If you wish to appeal this block please contact me or another administrator.',
  autocheck : true
};
var MessageBlock = {
  title : 'Blocked',
  message : 'You have been blocked for $2 because you have $1. If you wish to appeal this block please contact me or another administrator.',
  autocheck : true
};

;(function($,mw) {
    var namespace = mw.config.get('wgNamespaceNumber');
 
    if (namespace !== 8 || mw.config.get('wgAction') !== 'view' || mw.config.get('wgPageName') !== 'MediaWiki:Custom-Filters') {
        return;
    }
 
    fliterFunctions = {
 
// Default settings
        fliterDefaultSettings: function() {
            default_cfg = JSON.stringify({"fliter":[]});
 
            $('#mw-content-text').prepend('<div style="width:100%; text-aling:center; padding:20px;">Settings not exist or broken.&nbsp;<button id="fliterResetSettings">Reset them?</button></div>');
            $('#FliterResetSettings').click(function() {
                fliterFunctions.saveSettingFunction(default_cfg);
            });
        },
 
// Switch setting's tabs function
        switchSettings: function(class_name) {
            $('.fliterSetMenu').hide();
            $('.' + class_name).show();
        },
 
// New fliter form        
        addfliterForm: function() {
            $('.fliterList').append(
                '<div class="fliterForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                    '<div style="display:inline-block; width:475px;">' +
                        '<div style="margin-top:5px;">' + 
                            '<button onclick="fliterFunctions.deletefliterSettings($(this).parents(\'.fliterForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + fliterDeleteImg + '</button>' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                                'Fliter Name: ' + $('<input class="fliterListName" style="float:right; width:385px; margin-right:5px;" />').prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Regex: ' + $('<input class="fliterListRegex" style="float:right; width:335px; margin-right:5px;" />').prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Action: ' + $('<select class="fliterListAction"> <option>Revert edit or if new page delete</option> <option>Mark as canidate for deletion</option><option>Delete page</option></select>').prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'When: ' + $('<select class="fliterListWhen" multiple> <option>Edited page</option> <option>New page</option> <option>New/Edited talk page/comment</option> <option>New/Edited message wall thread</option></select>').prop('outerHTML') +
                            '</div>' +
                    '</div>' +
                '</div>'
            );
             $('.fliterListWhen').each(function(){    
                    var select = $(this), values = {};    
                    $('option',select).each(function(i, option){
                        values[option.value] = option.selected;        
                    }).click(function(event){        
                        values[this.value] = !values[this.value];
                        $('option',select).each(function(i, option){            
                            option.selected = values[option.value];        
                        });    
                    });
                });
        },
 
// Delete fliter settings (using in user form)
        deletefliterSettings: function($that) {
            var fliter_index = $that.index()
 
            // Changing default cfg
            var fliterCollectSaveForm = $(fliterCollectForm);
            fliterCollectSaveForm[fliter_index].remove();
            fliterCollectForm = fliterCollectSaveForm.prop('outerHTML');
 
            // Doing things
            $that.remove();
        },
 
// Collect result function
        fliterCollectFunction: function() {
            result = {};
            result.fliter = [];
 
            // Collectings fliters
            $('.fliterForm').each(function(index) {
 
                result.fliter.push({
                    flitername: $(this).find('.fliterListName').val(),
                    regex: $(this).find('.fliterListRegex').val(),
                    action: $(this).find('.fliterListAction').val(),
                    when: $(this).find('.fliterListWhen').val(),
                });
            });
 
            return result;
        },
 
// Save config function
        saveSettingFunction: function(fliterSet) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: {
                    action: 'edit',
                    title: 'MediaWiki:Custom-Filters',
                    summary: 'Settings changes',
                    text: fliterSet,
                    bot: 0,
                    token: mw.user.tokens.get('editToken'),
                    format: 'json'
                },
                success: function(d) {
                    if (d.edit.result == 'Success') {
                        location.href += (location.href.indexOf('?') > -1) ? '&action=view' : '?action=view';
                    }
                }
            });
        },
 
// Settings function
        fliterSettingsFunction: function() {
            var group_list = mw.config.get('wgUserGroups');
            if (group_list.indexOf('sysop') == -1 &&
                group_list.indexOf('helper') == -1 &&
                group_list.indexOf('staff') == -1) {
                return;
            }
 
            // Variables for this function
            fliterCollect = [];
            fliterDeleteImg = '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite trash" />';
            fliterCollectForm = $('<div class="fliterCollectForm" style="display:none; text-align:left; margin-top:5px; border-top:1px solid black;" />');
 
            if (typeof fliterSettings === "undefined") {
                // If settings not exists or broken: ask to create new
                fliterFunctions.fliterDefaultSettings();
 
                return;
            }
 
            $('#mw-content-text').prepend('<div style="width:100%; text-align:center; padding:20px;"><button id="fliterSettings">Access settings</button></div>');
 
            // Creating from
            fliterModalForm.append(
                /*'<div style="padding-bottom:5px; border-bottom:solid 1px #36759c; margin-top:-5px;">' +
                    '<div style="text-align:center;">' +
                        '<button type="button" class="wikia-button fliterSwitch" onclick="fliterFunctions.switchSettings(\'fliterListDialog\')">Fliters</button>' +
                    '</div>' + */ //Theres only one setting menu so theres not really a point to have mutiple buttons at the current time
                '</div>' +
                    '<div class="fliterListDialog fliterSetMenu">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px #36759c;">' +
                            'fliters' +
                            '<button onclick="fliterFunctions.addfliterForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add fliter form</button>' +
                        '</h2>' +
                        '<div class="fliterList" style="height:240px; overflow-y:scroll; border-bottom:solid 1px #36759c;" />' +
                    '</div>' +
                '</div>'
            );
            
            $('.fliterListWhen').each(function(){    
                var select = $(this), values = {};    
                ('option',select).each(function(i, option){
                     values[option.value] = option.selected;        
                  }).click(function(event){        
                        values[this.value] = !values[this.value];
                         $('option',select).each(function(i, option){            
                                option.selected = values[option.value];        
                            });    
                        });
                    });
           
            // Filling up form for fliters and users
           $.each(fliterSettings.fliter, function(k,v) {
                // Because we need to know all kinds of fliters
                fliterCollect.push(k);
 
                fliterModalForm.find('.fliterList').append(
                    '<div class="fliterForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                        '<div style="display:inline-block; width:475px;">' +
                            '<div style="margin-top:5px;">' + 
                                '<button onclick="fliterFunctions.deletefliterSettings($(this).parents(\'.fliterForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + fliterDeleteImg + '</button>' +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Fliter Name: ' + $('<input class="fliterListName" style="float:right; width:385px; margin-right:5px;" />').attr('value', v.flitername).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Regex: ' + $('<input class="fliterListRegex" style="float:right; width:385px; margin-right:5px;" />').attr('value', v.regex).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Action: ' + $('<select class="fliterListAction" id="action'+ k +'"> <option value="Revert edit or if new page delete">Revert edit or if new page delete</option> <option value="Mark as canidate for deletion">Mark as canidate for deletion</option><option value="Delete page">Delete page</option></select>').prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'When: ' + $('<select class="fliterListWhen" id="when'+k+'" multiple> <option value="Edited page">Edited page</option> <option value="New page">New page</option> <option value="New/Edited talk page/comment">New/Edited talk page/comment</option> <option value="New/Edited message wall thread">New/Edited message wall thread</option></select>').prop('outerHTML') +
                            '</div>' +
                        '</div>' +
                    '</div>'
                )
           
                fliterModalForm.find('.fliterList').promise().done(function() {
                    setTimeout(function(){ 
                        $('.fliterListWhen').each(function(){    
                            var select = $(this), values = {};    
                            $('option',select).each(function(i, option){
                                values[option.value] = option.selected;        
                            }).click(function(event){        
                                values[this.value] = !values[this.value];
                                $('option',select).each(function(i, option){            
                                    option.selected = values[option.value];        
                                });    
                            });
                        });
                        /* console.log('#action'+k+' [value="' + v.action + '"]')
                        document.querySelector('#action'+k+' [value="' + v.action + '"]').selected = true
                        v.when.forEach(function(val) {
                            console.log(val)
                            console.log('#when'+k+' [value="' + val + '"]')
                            document.querySelector('#when'+k+' [value="' + val + '"]').selected = true
                        }); */
                        
                        function handleCanvas(canvas) { 
                        const sel1 = $('#action'+k)
                        sel1.val(v.action) 
                        console.log("should have ran")
                        }
                        
                        var observer = new MutationObserver(function (mutations, me) {
                          var canvas = document.getElementById('action'+k);
                          if (canvas) {
                            handleCanvas(canvas);
                            me.disconnect();
                            return;
                          }
                        });
                        
                        // start observing
                        observer.observe(document, {
                          childList: true,
                          subtree: true
                        });
                        
                        function handleCanvas2(canvas2) { 
                        
                        const sel3 = $('#when'+k)
                        sel1.val(v.when)
                        console.log(v.when)
                        console.log("should have ran 2")}
                        
                        var observer2 = new MutationObserver(function (mutations, me) {
                          var canvas2 = document.getElementById('when'+k);
                          if (canvas2) {
                            handleCanvas(canvas2);
                            me.disconnect();
                            return;
                          }
                        });
                        
                        // start observing
                        observer2.observe(document, {
                          childList: true,
                          subtree: true
                        });
                        
                    try {
                        const sel3 = $('#action'+k)
                        sel3.val(v.action)
                        console.log("should have ran 3")
                        const sel4 = $('#when'+k)
                        sel4.val(v.when)
                        console.log("should have ran4")
                    } catch(err) {
                        console.warn(err)
                      
                    }
                    },1000)
                });
            });
 
            // Preparing default 'module' for fliters
            $.each(fliterCollect, function(i,v) {
                fliterCollectForm.append(
                    $('<div class="fliterCollectBox" style="display:inline-block; margin:5px 0 0 10px;">' +
                        '<input type="checkbox">' + 
                        $('<span />').text(v + ' ').prop('outerHTML') + 
                        '<input class="fliterCollectAmount" style="width:30px; text-align:center;"/>' +
                    '</div>').attr('data-section', v).prop('outerHTML')
                );
            });
 
            // Saving it
            fliterCollectForm = fliterCollectForm.prop('outerHTML');
 
            fliterModalFormCompleted = fliterModalForm.prop('outerHTML');
    
            // Modal window
            $('#fliterSettings').click(function() {
                $.showCustomModal('Settings',fliterModalFormCompleted, {
                    id: 'ModalSettingsWindow',
                    width: 600,
                    height: 450,
                    buttons: [
                    {
                        message: 'Save',
                        handler: function() {
                            result_data = JSON.stringify(fliterFunctions.fliterCollectFunction());
 
                            // Save it!
                            fliterFunctions.saveSettingFunction(result_data);
                        }
                    }]
                });
            });
        },
 
// Launch function
        init: function() {
            try{
                $.ajax({
                    url: mw.util.wikiScript(),
                    type: 'GET',
                    data: {
                        title: 'MediaWiki:Custom-Filters',
                        action: 'raw',
                        cb: Math.ceil(new Date().getTime() / 1000),
                        dataType:'text'
                    },
                    success: function(data) {data
                        // Parsing result
                        try {
                            fliterSettings = JSON.parse(data);
                        } catch(err) {
                            if (namespace === 8) {
                                fliterFunctions.fliterDefaultSettings();
                            }
 
                            return;
                        }
 
                        fliterModalForm = $('<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;" />');
 
                        fliterFunctions.fliterSettingsFunction();
 
                    },
                    error: function() {
                        if (namespace === 8) {
                            fliterFunctions.fliterDefaultSettings();
                        }
                    }
                });
            } catch (err) {
                if (namespace === 8) {
                    fliterFunctions.fliterDefaultSettings();
                }
            }
        }
    };
 
    // LAUNCH!
    $(fliterFunctions.init);
 
})(this.jQuery,this.mediaWiki);