//скрипт виділяє назву активної ротації контракту

$(function() {
  const BOUNTY_LOCATION = {
    'Ostrons':"CetusBounty", 
    'Entrati':"NecraliskBounty",
    'Solaris United':"FortunaBounty"
  };
  const ROT_NUMBER = {
    'A':"1", 
    'B':"2",
    'C':"3"
  };
  var bountyRewards = {};
  var currentBountyRewards = {};
  $.when($.get( 'https://api.warframestat.us/drops/search/Bounty?grouped_by=location', "json" ), $.get( 'https://api.warframestat.us/pc/syndicateMissions/?language=uk', "json" )).done(function(data1, data2) {
    $.each( data1[0], function (index, rewards) {
      if (rewards.rewards.length > 1) {
        bountyRewards[index] = [];
        $.each( rewards.rewards, function ( i, reward ) {
          bountyRewards[index].push(reward.item);
        });
      }
    });
    $.each( data2[0], function (index, syndicate) {
      if (BOUNTY_LOCATION[syndicate.syndicateKey]) {
        $.each( syndicate.jobs, function (index1, job) {
          var name = BOUNTY_LOCATION[syndicate.syndicateKey] + (index1+1);
          if (job.enemyLevels[0] == job.enemyLevels[1]) {
            name = BOUNTY_LOCATION[syndicate.syndicateKey] + '6';
          } else if (job.enemyLevels[0] == 50 && job.enemyLevels[1] == 70) {
            name = BOUNTY_LOCATION[syndicate.syndicateKey] + '7';
          } else if (BOUNTY_LOCATION[syndicate.syndicateKey] == 'NecraliskBounty' && job.enemyLevels[0] == 30 && job.enemyLevels[1] == 40 && job.isVault ) {
            name = 'IsolationVault1';
          } else if (BOUNTY_LOCATION[syndicate.syndicateKey] == 'NecraliskBounty' && job.enemyLevels[0] == 40 && job.enemyLevels[1] == 50) {
            name = 'IsolationVault2';
          } else if (BOUNTY_LOCATION[syndicate.syndicateKey] == 'NecraliskBounty' && job.enemyLevels[0] == 50 && job.enemyLevels[1] == 60) {
            name = 'IsolationVault3';
          } 
          currentBountyRewards[name] = job.rewardPool;
        });
      }
    });
    $('.bounty').each(  function () {
      colorChange(bountyRewards, currentBountyRewards, $(this));
    });
    
  });
  
  function colorChange(allB, currB, table) {
    var bName = table.attr('id').replace(/\-./, '');
    if (bName == 'IsolationVault1' || bName == 'IsolationVault2' || bName == 'IsolationVault3' || bName == 'ArcanaIsoVaultBounty1' || bName == 'ArcanaIsoVaultBounty2' || bName == 'ArcanaIsoVaultBounty3' ) {
    	bName = 'NecraliskBounty4';
    } else if ( bName == 'NecraliskBounty1' ) {
    	bName = 'NecraliskBounty2';
    }
    var curData = currentBountyRewards[bName];
    $.each( allB, function (bounty, rewards) {
      if (rewards.toString().includes(curData) && !(bName.slice(-1) != '6' && bounty.includes('100 - 100'))) {
        if  (!bounty.includes('100 - 100') && bName.slice(-1) == '6') { return; }  
        var rot = bounty.slice(-1);
        console.log(bounty, table.attr('id'))
        table.find('tr th:nth-child('+ ROT_NUMBER[rot] +') a').css({"color": "green", "font-weight": "bold", });
      }
    });
  }
});