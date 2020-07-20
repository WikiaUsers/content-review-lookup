chatPlugins.modules.multiKick.modOnly = true;
if (wgUserGroups.indexOf("chatmoderator")!=-1) {
	chatPlugins.modules.multiKick.open = function() {
	  var $multiKickWindowHTML = $.showCustomModal( "Multi Kick", '<form method="" name="" class="WikiaForm "><fieldset><div id="multiKickHeader">Select the users you would like to kick:</div><div id="multiKickNames" style="height:250px;overflow-y:scroll;"><table id="multiKickUserTable"></div></fieldset></form>', {
		id: "multiKickWindow",
		width: 400,
		buttons: [
		    {
		    id: "cancel",
		    message: "Cancel",
		    handler: function () {
		      chatPlugins.modules.multiKick.cancel();
		      }
		    },
		    {
		    id: "chatPlugins.modules.multiKick.start",
		    defaultButton: true,
		    message: "Kick",
		    handler: function () {
		      chatPlugins.modules.multiKick.start();
		      }
		    }
		]
	  });
    $(".close").click(chatPlugins.modules.multiKick.cancel);
    $('body').append('<div style="height: 100%; width: 100%; opacity: 0.65; display: block;" data-opacity="0.65" class="blackout"></div>');
    multiKickUserTable = ""
    for (i=0;i<Object.keys(mainRoom.model.users._byCid).length;i++) {
	  if (i%2) {
		  multiKickUserTable += '<td style="padding:2px;"><label><input class="multiKickUser" type="checkbox" name="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '" value="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '"/><img src="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.avatarSrc + '" style="vertical-align:middle;padding:2px;border-radius:0px;margin-right:4px;" />' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '</label></td>';
		  multiKickUserTable += '</tr>';
	  }
	  else {
		  multiKickUserTable += '<tr>';
		  multiKickUserTable += '<td style="padding:2px;"><label><input class="multiKickUser" type="checkbox" name="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '" value="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '"/><img src="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.avatarSrc + '" style="vertical-align:middle;padding:2px;border-radius:0px;margin-right:4px;" />' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '</label></td>';
	  }
    }
	  if ((Object.keys(mainRoom.model.users._byCid).length % 2)!=1) {
		  multiKickUserTable += '</tr>';
	  }
	  $('#multiKickUserTable').append(multiKickUserTable);
  }
  chatPlugins.modules.multiKick.cancel = function() {
	  $('#multiKickWindow').remove();
	  $('.blackout').remove();
  }
  chatPlugins.modules.multiKick.start = function() {
	  if ($(".multiKickUser:checked").length == 0) {
		  $("#multiKickHeader").css("color", "red").css("font-weight", "bold");
		  return;
	  }
	  else {
		  users = [];
		  for (i=0;i<$(".multiKickUser:checked").length;i++) {
			  mainRoom.kick({name:$(".multiKickUser:checked")[i].value});
		  }
		  chatPlugins.modules.multiKick.cancel();
	  }
  }
  if( !$("#multiKickButton").length ) {
     $('form#Write').append('<a class="wikia-button" href="#" id="multiKickButton" style="position:absolute; right:122px; top:22px;">Multi Kick</a>');
  }
  $("#multiKickButton").click(chatPlugins.modules.multiKick.open);
}
console.log("[OPTIONS] Multi Kick: Loaded");