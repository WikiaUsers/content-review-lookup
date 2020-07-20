if($('.page-Harry_granger_s_Test_Wiki_Einstellungen').length) {
  	function showSettingsModal() {
	    var EditForm = $('<form />').attr({
	        method: '',
	        name: '',
	        id: 'EditModal'
	      }).addClass('WikiaForm custom-settings').append($('<fieldset />')),
	      delay = window.massCategorizationDelay || 1000;
	 
	      $.showCustomModal('Wikispezifische Einstellungen', EditForm, {
	        id: 'form-settings',
	        width: 500,
	        buttons: [{  
	          message: 'Cancel',
	          handler: function() {
	            $('#form-settings').closeModal();
	          }
	        }, {
	          id: 'save-button',
	          message: 'Speichern',
	          defaultButton: true,
	          handler: function() {
	               newsettings = {}
	               $('#form-settings input').each(function(key,val) {
	                   if(/background-/.test($(val).attr('id'))) {
	                       if(!newsettings.hasOwnProperty('background') || !Object.keys(newsettings.background).length) {
	                           newsettings.background = {};
	                       }
	                       newsettings.background[/background-([a-z]+)/.exec($(val).attr('id'))[1]] = $(val).val();
	                   }
	                   else {
	                       newsettings[$(val).attr('id')] = $(val).val();
	                   }
	               });
	               $('#form-settings select').each(function(key,val) {
	                   newsettings[$(val).attr('id')] = $(val).find(':selected').val();
	               });
	               console.log('newsettings',newsettings);
	               v = Math.random() * 10;
	               $.getJSON('/api.php?action=query&prop=revisions&rvprop=content&titles=MediaWiki:Custom-Settings.json&format=json&v=' + v).done(function(data) {
	                   json = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*']);
	                   console.log('oldsettings',json);
	                   if($.inArray(wgUserName,Object.keys(json)) != -1) {
	                       console.log('user has settings --> overwrite');
	                       console.log(newsettings,json[wgUserName],$.extend({},json[wgUserName],newsettings));
	                       $.extend(json[wgUserName],newsettings);
	                       _settings = json;
	                   }
	                   else {
	                       newsettings.name = wgUserName;
	                       json[wgUserName]= newsettings;
	                       _settings = json;
	                   }
	                   console.log('actual settings',_settings);
	                   editPage('MediaWiki:Custom-Settings.json',JSON.stringify(_settings,null,4),'changed settings');
	               });
	               //saveSettings();
	          }
	        }]
	      });
	    
	    addFormFields([
	        {field:'label',text:'Staffel',affinity:'season'},
	        {field:'number',name:'season'},
	        {field:'break'},
	        {field:'label',text:'Haus',affinity:'party'},
	        {field:'select',name:'party',children:[{option:'Gryffindor'},{option:'Slytherin'},{option:'Hufflepuff'},{option:'Ravenclaw'}]},
	        {field:'break'},
	        {field:'label',text:'Episode (Nr.)',affinity:'nr'},
	        {field:'number',name:'nr'},
	        {field:'break'},
	        {field:'label',text:'Skin',affinity:'skin'},
	        {field:'select',name:'skin',children:[{option:'default',text:'Standard'},{option:'new',text:'neuer Skin'}]},
	        {field:'break'},
	        {field:'label',text:'mainCategory',affinity:'mainCategory'},
	        {field:'check multi',name:'mainCategory'},
	        {field:'break'},
	        {field:'label',text:'Hintergrund',affinity:'background'},
	        {field:'colorpicker',name:'background-color',children:['red','blue','green','orange','tomato','#034F84','#79C753','#EFC050','#9B2335','#2196F3','#47ADD5','#982d57','purple','#f706d4']},
	        {field:'upload',name:'background-image',options:{type:'image jpg'}},
	        {field:'break'},
	        {field:'label',text:'article',affinity:'article'},
	        {field:'pagechecker',id:"pageexists",name:"pageexists"}
	    ]);

	    getSettings(wgUserName,function(data) {
	        console.log('set form settings',data);
	        for(s in data) {
	            if(s == 'background') {
	                for(b in data[s]) {
	                    console.log('#' + s + '-' + b,data[s][b],$('.WikiaForm#EditModal fieldset').find('#' + s + '-' + b));
	                    $('.WikiaForm#EditModal fieldset').find('input#' + s + '-' + b).val(data[s][b]);
	                }
	            }
	            else {
	                $('.WikiaForm#EditModal fieldset').find('input#' + s + ', select#' + s).val(data[s]);
	            }
	        }
	    });
    }
}