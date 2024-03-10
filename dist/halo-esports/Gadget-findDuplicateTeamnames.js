$( function () {
	if(mw.config.get('wgPageName') != 'Module:Teamnames') {
		return;
	}


var selector = mw.util.addPortletLink(
    'p-cactions',
    'javascript:;',
    '!Find Duplicates',
    'find-duplicate-team-names',
    'checks for duplicate team names',
    null,
    null
);


function findDuplicateTeamNames() {
  function getData() {
    x = new mw.Api();
    return x
      .get({
        action: "query",
        format: "json",
        prop: "revisions",
        titles: "Module:Teamnames",
        rvprop: "content"
      })
      .then(function(data) {
        var pageData = Object.values(data.query.pages)[0];
        return pageData.revisions[0]["*"];
      });
  }

  function getAllMatches(regex, text) {
  	var result;
  	var resultsList = [];
  	do {
  		result = regex.exec(text);
  		if(result){
  			resultsList.push(result);
  		}
  	} while(result);
    return resultsList;
  }

  var regex = /\[\"([^\"]*)\"\]/g;
  getData()
    .then(function(data) {
      return Object.entries(
        getAllMatches(regex, data)
          .map(function(match) {
            return match[1];
          })
          .reduce(function(acc, teamName) {
            acc[teamName] = (acc[teamName] || 0) + 1;
            return acc;
          }, {})
      )
        .filter(function(entry) {
          return entry[1] > 1;
        })
        .map(function(entry) {
          return  entry[0];
        });
    })
    .then(function(duplicateTeamNames) {
		var element = document.createElement('div')
		$(element).html("<strong>Duplicate teams:</strong>" + duplicateTeamNames.join(", "))
      $(element).insertAfter("#firstHeading");
    });
}

$(selector).on("click", findDuplicateTeamNames);
});