<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
/* contains the scores of the current user */
var hashFamiliarScore = {};

$(document).ready(function(){
    var button = document.getElementById("voteButton");
    button.onclick = function() {
        sendVote();
    };
    
    displayVote();
});

function sendVote() {
    var user = mw.config.get('wgUserName');
    if (!user) {
        return;
    }
    
    var voteArr = getVoteData();
    if (voteArr.length === 0) {
        return;
    }
    
    var toPost = {"data": voteArr};
    console.log(toPost);
    $.ajax({
        url: "https://bloodbrothers-chinhodado.rhcloud.com/vote/multiple/",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(toPost),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var success = response.result === "success";
            var resultSpan = $("#requestResult");
            if (success) {
                resultSpan.text("Updated").delay(1000).fadeOut(2000);
            }
            else {
                resultSpan.text("Something wrong happened. Please tell Chinhodado about it.");
            }
        },
        error: function (xhr, status) {
            console.log("Vote result: error");
        }
    });
}

function getVoteData() {
    var user = mw.config.get('wgUserName');
    var arr = [];
    var divs = document.getElementsByClassName("voteDiv");
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        var name = div.id.replace(/_div/g, "").replace(/\.2C/g, ",").replace(/_/g, " ");
        var value = div.getElementsByTagName("select")[0].value;
        if (value === "-" || value == hashFamiliarScore[name]) {
            continue;
        }
        arr.push({
            "voter": user,
            "familiar": name,
            "score": value
        });
    }
    return arr;
}

function displayVote() {
    var user = mw.config.get('wgUserName');
    var toPost = {"voter": user};
    $.ajax({
        url: "https://bloodbrothers-chinhodado.rhcloud.com/getVote/all/",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(toPost),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var success = response.result === "success";
            if (success) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    var tmp = data[i];
                    /* score can be null */
                    hashFamiliarScore[tmp.familiar] = tmp.score;
                    
                    /* populate the selects with previous scores */
                    var divId = tmp.familiar.replace(/,/g, ".2C").replace(/ /g, "_") + "_div";
                    var selectDiv = document.getElementById(divId);
                    if (selectDiv) {
                        /* why not a simple &&? because wikia is brain damaged, that's why */
                        if (tmp.score!==null) { /* why the missing space? I'm glad you asked...*/
                            selectDiv.getElementsByTagName("select")[0].value = tmp.score;
                        }
                    }
                    
                    var tdId = tmp.familiar.replace(/,/g, ".2C").replace(/ /g, "_") + "_vote_td";
                    var voteTd = document.getElementById(tdId);
                    if (voteTd) {
                        voteTd.setAttribute("data-sort-value", tmp.avg);
                    }
                    else {
                        console.log("Vote td not found: " + tmp.familiar);
                    }
                    
                    var avgDivId = tmp.familiar.replace(/,/g, ".2C").replace(/ /g, "_") + "_vote_avg";
                    var avgDiv = document.getElementById(avgDivId);
                    if (avgDiv) {
                        avgDiv.innerHTML = tmp.avg;
                    }
                    else {
                        console.log("Avg div not found: " + tmp.familiar);
                    }
                }
            }
            else {
                console.log("Something wrong happened. Please tell Chinhodado about it.");
            }
        },
        error: function (xhr, status) {
            console.log("Vote result: error");
        }
    });
}
</script>