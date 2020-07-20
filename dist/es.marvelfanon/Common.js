// UserTags personalizadas

window.UserTagsJS = {
	modules: {},
	tags: {
		bot: { u:'Bot' },
		guardian: { u:'Guardian' },
		eventos: { u:'Eventos' },
		codigo: { u:'Codigo' }
	}
};

// Nombre de usuario con span

function UserNameReplace() {
  if (wgUserName) {
    var spans = getElementsByClassName(document, "span", "insertusername");
    for (var i = 0; i < spans.length; i++) {
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

// WAM

window.railWAM = {
    logPage:"Project:WAM Log"
};