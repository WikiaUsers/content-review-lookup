const badgeWP = document.getElementsByClassName('RF_badgeWP');
if(badgeWP !== undefined) {
  for (var i = 0; i < badgeWP.length; i++) {
    var badgeWPd = badgeWP[i].getAttribute("data-source-id");
    var result;
    $.ajax({
      crossOrigin: true,
      async: false,
      url: "https://roblox.uromastyx.xyz/v1/badges/" + badgeWPd,
      success: function (data) {
        result = (data.statistics.winRatePercentage * 100) + "%";
      }
    });
    badgeWP[i].innerHTML = result
  }
}