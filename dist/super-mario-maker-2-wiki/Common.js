/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {
	    autoconfirmed: true,
	    newuser: { days: 7, edits: 35 },
	    mwGroups: ['bureaucrat', 'rollback']
	},
	tags: {
		adopter: { u:'Wiki Adopter', order:-1/0 },
		usermonth: { u:'User of the Month', },
		seniormod: { u:'Senior Moderator', },
		rollback: { u:'Junior Moderator', },
	}
};
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'AK_World': 'Bureaucrat • Founder',
        'JoJoMKWUTeam': 'Administrator',
        'IloGaming4': 'Administrator',
        'Ejeleina': 'Administrator',
    }
};
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
window.ArticleRating = {
    title: 'Rate This Article',
    values: ['Terrible', 'Bad', 'Average', 'Good', 'Great'],
    starSize: [24, 24],
    starColor: ['#ccc', '#ffba01'],
    starStroke: '#000',
    location: 'top-rail',
};
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 90
};
window.LockOldBlogs = {
    expiryDays: 90
};
/* don't lose track of whose user page we're on -- Ej */
var target;
if(document.body.classList.contains("page-Special_Following"))
  target = mw.config.values.wgUserName;
else
  target = (new URL(document.location)).searchParams.get('target');
var reloadUrl = document.getElementById("reloadUrl");
if(target && reloadUrl)
  reloadUrl.value += ('/' + target);
/* end tracking */
/* JsHtmlTags by Ej
 actual server-side [[mw:Extension:HTML Tags]] would be preferred, but
 fandom won't consider it before they finish their big mediawiki version upgrade */
var aspiring_inputs = document.getElementsByClassName("htmlTagInput");
for(var x = aspiring_inputs.length; x-->0; ) {
  var aspiring_input = aspiring_inputs[x];
  var styles = aspiring_input.getAttribute("style").split(";");
  var input = document.createElement("input");
  for(var y = 0; y < styles.length; ++y) {
    var style = styles[y];
    var parts = style.split(":");
    switch(parts[0].trim()) {
      case "checkedAttr": input.setAttribute("checked", ""); break;
      case "nameAttr": input.setAttribute("name", parts[1].trim()); break;
      case "typeAttr":
        var value = parts[1].trim();
        if(value != "file")
          input.setAttribute("type", value);
        break;
    }
  }
  input.setAttribute("id", aspiring_input.getAttribute("id"));
  aspiring_input.parentNode.replaceChild(input, aspiring_input);
}
var aspiring_labels = document.getElementsByClassName("htmlTagLabel");
for(var x = aspiring_labels.length; x-->0; ) {
  var aspiring_label = aspiring_labels[x];
  var label = document.createElement("label");
  label.setAttribute("style", aspiring_label.getAttribute("style"));
  label.setAttribute("for", (aspiring_label.getAttribute("id") || "").substring(3));
  label.innerHTML = aspiring_label.innerHTML;
  aspiring_label.parentNode.replaceChild(label, aspiring_label);
}
/* end JsHtmlTags */