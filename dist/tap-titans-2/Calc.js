function xclick() {
    var item = $(this).attr('abbr')
    var ignored = $("#skillCalcFormskillCalcResultignored")
    ignored.val(ignored.val() + "!" + item)
    $(".jcSubmit").find("input").click()
}
$(document).on("click", ".wiki-skillguide-x", xclick)

function excludedclick() {
    var item = $(this).attr('abbr')
    var ignored = $("#skillCalcFormskillCalcResultignored")
    var split = ignored.val().split("!")
    var item = $(this).attr('lang')
    console.log(item)
    var out = ""
    for (var i = 0; i < split.length; i++) {
        if (split[i] != item && split[i] != "") {
            out = out + "!" + split[i]
        }
    }
    ignored.val(out)
    $(".jcSubmit").find("input").click()
}
$(document).on("click", ".wiki-skillguide-excludedx", excludedclick)

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}
// test
var query = getQueryParams(document.location.search);
var inputs = $("#jcFormskillCalcForm").find("select, input");
var count = 0;
for (var i = 0; i < inputs.length; i++) {
	var name = $(inputs[i]).attr("name");
	if (name.indexOf("skillCalcFormskillCalcResult") > -1) {
		name = name.replace("skillCalcFormskillCalcResult", "");
		if (query[name] !== undefined) {
			count++;
			inputs[i].value = query[name]
		}
	}
}
if (count > 0) {
	$(".jcSubmit").find("input").click()
}
//hmm