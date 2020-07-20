$().ready(function () {
   $("div.title1:first").after('<style>div.LeaderFinder{text-align: right;}div.LeaderFinder:after{display: block;content: "";clear: both;}div.LeaderFinder div.left{float: left;}div.LeaderFinder div.right{float: right;}div.LeaderFinderResult div.leader{display: inline-block;padding: 5px;margin: 3px 0px;}div.LeaderFinderResult div.cardInfo{width: 55px;height: 55px;position: relative;display: inline-block;text-shadow: 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black;font-size: 10pt;vertical-align: middle;}div.LeaderFinderResult div.cardInfo img{width: 55px;height: 55px;}div.LeaderFinderResult div.cardInfo div.cardLv{position: absolute;bottom: -8px;left: 0px;}div.LeaderFinderResult div.cardInfo div.cardExtra{position: absolute;top: -3px;right: 2px;}div.LeaderFinderResult div.cardInfo div.cardExtra:before{content: "+";}div.LeaderFinderResult div.userInfo{width: 140px;display: inline-block;font-size: 10pt;vertical-align: middle;border-radius: 2px;border: 1px solid rgb(185,160,58);padding: 3px;background: rgba(0,0,0,0.2);line-height: 10pt;position: relative;height: 60px;}div.LeaderFinderResult div.userId{position: absolute;bottom: -10px;background: darkred;color: white;font-weight: bolder;text-align: center;right: -1px;width: 90px;border-radius: 2px;border: 1px solid rgb(185,160,58);padding: 3px;}div.LeaderFinderResult a.userName{overflow: hidden;height: 15px;font-weight: bolder;display: block;color: white;}div.LeaderFinderResult div.userNote{overflow: hidden;height: 40px;color: gainsboro;margin-left: 5px;}div.LeaderFinderNoResult{text-align: center;padding: 5px;color: red;display: none;}</style><div class="LeaderFinder"><div class="left">想要你的代表出現在首頁嗎? 快點登錄你的代表，讓你的追隨人數爆增!</div><div class="right"><button type="button" onclick="goLeaderFinder();">代表登錄 / 搜尋</button><button class="randomLeader" type="button" onclick="randomLeader();">刷新</button></div></div><div class="LeaderFinderResult"></div><div class="LeaderFinderNoResult">找不到目前有人使用此代表</div><div class="LeaderTemplate" style="display: none;"><div class="leader"><div class="cardInfo"><div class="img"></div><div class="cardLv"></div><div class="cardExtra"></div></div><div class="userInfo"><a class="userName"></a><div class="userNote"></div><div class="userId"></div></div></div></div>');
   $("button.randomLeader").click();
});
function getLeaderData(successFunc) {
   $.ajax({
      url: "https://nekowiz.fandom.com/zh/wiki/Template:Leader/Data?action=raw",
      cache: false,
      success: successFunc,
      error: function (xhr) {
         errorHandler();
      }
   });
}
function getLeaderImage(cardId, rootNode) {
   $.get(mw.util.wikiScript('api'), {
      format: 'json',
      action: 'parse',
      text: decodeURI('%7B%7BCard/Image/Small%7Cid=' + cardId + '%7Clink=true%7D%7D')
   }, function (data) {
      $(rootNode).find("div.img").html($(data.parse.text['*']).children().attr('target', '_blank'));
   }, 'json');
}
function getCardMaxLv(cardId, successFunc) {
   $.get(mw.util.wikiScript('api'), {
      format: 'json',
      action: 'parse',
      text: decodeURI('%7B%7BCard/Data/' + cardId + '%7Cdata=MaxLevel%7D%7D')
   }, successFunc, 'json');
}
function randomLeader() {
   $("button.randomLeader").attr("disabled", true);
   getLeaderData(function (leaderTextData) {
      var leaderData = jQuery.parseJSON(leaderTextData);
      if (!leaderData) {
         leaderData = {};
      }
      var randomindexs = [];
      var randomResults = [];
      var maxRandomCount = 9;
      var leaderDataLength = Object.keys(leaderData).length;
      var count = maxRandomCount;
      if (maxRandomCount > leaderDataLength) {
         count = leaderDataLength;
      }
      for (var i = 0; i < count; i++) {
         var randomIndex = Math.floor(Math.random() * (leaderDataLength));
         if (randomindexs.indexOf(randomIndex) >= 0) {
            i--;
            continue;
         }
         var wikiaUserId = Object.keys(leaderData)[randomIndex];
         if (!leaderData[wikiaUserId].leaders) {
            i--;
            continue;
         }
         var wikiaUserLeaders = leaderData[wikiaUserId].leaders;
         if (wikiaUserLeaders.length == 0) {
            if (maxRandomCount <= leaderDataLength) {
               i--;
            }
            randomindexs.push(randomIndex);
            continue;
         }
         var randomLeaderIndex = Math.floor(Math.random() * (wikiaUserLeaders.length));
         randomResults.push({
            "wikiaUserId": wikiaUserId,
            "leader": wikiaUserLeaders[randomLeaderIndex]
         });
         randomindexs.push(randomIndex);
      }

      $("div.LeaderFinderResult").empty();
      if (randomResults.length > 0) {
         showRandomResults(randomResults);
         $("div.LeaderFinderNoResult").hide();
      } else {
         $("div.LeaderFinderNoResult").show();
         $("button.randomLeader").attr("disabled", false);
      }
   });
}
function showRandomResults(results) {
   $(results).each(function (index, result) {
      var wikiaUserId = result.wikiaUserId;
      var leader = result.leader;
      $("div.LeaderFinderResult").append($("div.LeaderTemplate").html());
      var LeaderNode = $("div.LeaderFinderResult div.leader:nth-child(" + (index + 1) + ")");

      getLeaderImage(leader.cardId, LeaderNode);

      if (leader.cardLv.toUpperCase() == "MAX") {
         $(LeaderNode).find("div.cardLv").html("MAX");
      } else if (leader.cardLv % 10 == 0) {
         getCardMaxLv(leader.cardId, function (data) {
            var content = data.parse.text['*'];
            var startIndex = content.indexOf("<p>") + 3;
            var endIndex = content.indexOf("\n<\/p>");
            var CardMaxLv = parseInt(content.substring(startIndex, endIndex));

            var lv = leader.cardLv;
            if (parseInt(lv) >= parseInt(CardMaxLv)) {
               lv = "MAX";
            } else {
               lv = "Lv. " + lv;
            }
            $(LeaderNode).find("div.cardLv").html(lv);
         });
      } else {
         $(LeaderNode).find("div.cardLv").html("Lv. " + leader.cardLv);
      }

      $(LeaderNode).find("div.cardExtra").html(leader.cardExtra);
      if (parseInt(leader.cardExtra) <= 0) {
         $(LeaderNode).find("div.cardExtra").hide();
      }
      $(LeaderNode).find("div.userId").html(leader.userId);
      $(LeaderNode).find("a.userName").html(leader.userName);
      $(LeaderNode).find("a.userName").attr("href", "https://nekowiz.fandom.com/zh/wiki/%E4%BD%BF%E7%94%A8%E8%80%85:" + wikiaUserId);
      $(LeaderNode).find("a.userName").attr("target", "_blank");
      $(LeaderNode).find("div.userNote").html(leader.userNote);
   });
   $("button.randomLeader").attr("disabled", false);
}
function goLeaderFinder() {
   window.location.assign("https://nekowiz.fandom.com/zh/wiki/%E4%BB%A3%E8%A1%A8%E6%90%9C%E5%B0%8B%E5%99%A8");
}