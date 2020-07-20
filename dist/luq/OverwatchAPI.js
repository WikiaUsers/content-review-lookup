/* OverwatchAPI by Luqgreg */
$(function(){
    if ($("div#owapi-main").length) {
        console.log("OW-Api: Initializing...");
		var decMark = ".";
		var decSpaces = 2;
		var errorMsg = "<span style=\"color:red; font-weight: bold\">Error: Unknown error occurred!</span>";
		
        $.getJSON("/api.php?action=query&meta=allmessages&ammessages=Custom-OverwatchAPI/DecimalMark|Custom-OverwatchAPI/DecimalSpaces|Custom-OverwatchAPI/Error&format=json", function(data) {
            var _data = data.query.allmessages[0];
            if(_data['*'] !== undefined)
                decMark = _data['*'];
            
            _data = data.query.allmessages[1];
            if(_data['*'] !== undefined) {
                var _decSpaces = parseInt(_data['*'], 10);
                if(!isNaN(_decSpaces)) decSpaces = _decSpaces;
            }
            
            _data = data.query.allmessages[2];
            if(_data['*'] !== undefined)
                errorMsg = _data['*'];
		});
        
        var nick = $("div#owapi-main").data("battletag");
        nick = nick.substring(0, nick.length - 5);
		var tag = $("div#owapi-main").data("battletag");
		tag = tag.substring(tag.length - 4);
        var server = $("div#owapi-main").data("server");
        var platform = $("div#owapi-main").data("platform");
        
        if(server !== null || (server !== "eu" && server !== "na" && server !== "kr" )) server = "eu";
		if(platform !== null || (platform !== "pc" && platform !== "xbl" && platform !== "psn" )) platform = "pc";

		console.log("OW-Api: Downloading player data...");
		
		$.getJSON("https://owapi.net/api/v3/u/" + nick + '-' + tag + "/blob?platform=" + platform, function(data) {
			
			console.log("OW-Api: Parsing player data...");
			
			var serverdata;
			switch(server)
			{
				case "na":
					serverdata = data.na;
					break;
				case "kr":
					serverdata = data.kr;
					break;
				default:
				case "eu":
					serverdata = data.eu;
					break;
			}
			
			var level_border = "";
			if(serverdata.stats.competitive.overall_stats.prestige === 0 && serverdata.stats.competitive.overall_stats.level < 11) level_border = "0";
			else level_border = Math.floor((serverdata.stats.competitive.overall_stats.prestige * 100 + serverdata.stats.competitive.overall_stats.level - 1)/10).toString();
			
			var ach_query = "";
			var ach_count         = 0, ach_completed         = 0, ach_completion         = 0,
				ach_general_count = 0, ach_general_completed = 0, ach_general_completion = 0,
				ach_offense_count = 0, ach_offense_completed = 0, ach_offense_completion = 0,
				ach_defense_count = 0, ach_defense_completed = 0, ach_defense_completion = 0,
				ach_tank_count    = 0, ach_tank_completed    = 0, ach_tank_completion    = 0,
				ach_support_count = 0, ach_support_completed = 0, ach_support_completion = 0,
				ach_maps_count    = 0, ach_maps_completed    = 0, ach_maps_completion    = 0,
				ach_special_count = 0, ach_special_completed = 0, ach_special_completion = 0;
			
			$.each(serverdata.achievements.general, function (key, value) {
				ach_query += '|' + key + '=' + (value ? 1 : 0);
				if(value === true) { ach_general_completed++; ach_completed++ }
				ach_general_count++;
				ach_count++;
			});
			$.each(serverdata.achievements.offense, function (key, value) {
				ach_query += '|' + key + '=' + (value ? 1 : 0);
				if(value === true) { ach_offense_completed++; ach_completed++ }
				ach_offense_count++;
				ach_count++;
			});
			$.each(serverdata.achievements.defense, function (key, value) {
				ach_query += '|' + key + '=' + (value ? 1 : 0);
				if(value === true) { ach_defense_completed++; ach_completed++ }
				ach_defense_count++;
				ach_count++;
			});
			$.each(serverdata.achievements.tank, function (key, value) {
				ach_query += '|' + key + '=' + (value ? 1 : 0);
				if(value === true) { ach_tank_completed++; ach_completed++ }
				ach_tank_count++;
				ach_count++;
			});
			$.each(serverdata.achievements.support, function (key, value) {
				ach_query += '|' + key + '=' + (value ? 1 : 0);
				if(value === true) { ach_support_completed++; ach_completed++ }
				ach_support_count++;
				ach_count++;
			});
			$.each(serverdata.achievements.maps, function (key, value) {
				ach_query += '|' + key + '=' + (value ? 1 : 0);
				if(value === true) { ach_maps_completed++; ach_completed++ }
				ach_maps_count++;
				ach_count++;
			});
			$.each(serverdata.achievements.special, function (key, value) {
				ach_query += '|' + key + '=' + (value ? 1 : 0);
				if(value === true) ach_special_completed++;
				ach_special_count++;
				ach_count++;
			});
			
			ach_completion         = Math.floor((ach_completed         / ach_count        ) * 100);
			ach_general_completion = Math.floor((ach_general_completed / ach_general_count) * 100);
			ach_offense_completion = Math.floor((ach_offense_completed / ach_offense_count) * 100);
			ach_defense_completion = Math.floor((ach_defense_completed / ach_defense_count) * 100);
			ach_tank_completion    = Math.floor((ach_tank_completed    / ach_tank_count   ) * 100);
			ach_support_completion = Math.floor((ach_support_completed / ach_support_count) * 100);
			ach_maps_completion    = Math.floor((ach_maps_completed    / ach_maps_count   ) * 100);
			ach_special_completion = Math.floor((ach_special_completed / ach_special_count) * 100);
			
			var hero_query = "";
			$.each(serverdata.heroes.playtime.competitive, function (key, value) {
				var hero_stats_cp = serverdata.heroes.stats.competitive[key];
				var hero_stats_qp = serverdata.heroes.stats.quickplay[key];
				
				var time_cp = 0, eliminations_cp      = 0, damage_cp      = 0,
					time_qp = 0, eliminations_qp      = 0, damage_qp      = 0,
					games_won_cp = 0, games_won_qp = 0;
					
				if(hero_stats_cp !== undefined) {
					time_cp              = defaultValue(hero_stats_cp.general_stats.time_played , 0);
					eliminations_cp      = defaultValue(hero_stats_cp.general_stats.eliminations, 0);
					damage_cp            = defaultValue(hero_stats_cp.general_stats.damage_done , 0);
					games_won_cp         = defaultValue(hero_stats_cp.general_stats.games_won   , 0);
				}
				if(hero_stats_qp !== undefined) {
					time_qp              = defaultValue(hero_stats_qp.general_stats.time_played , 0);
					eliminations_qp      = defaultValue(hero_stats_qp.general_stats.eliminations, 0);
					damage_qp            = defaultValue(hero_stats_qp.general_stats.damage_done , 0);
					games_won_qp         = defaultValue(hero_stats_qp.general_stats.games_won   , 0);
				}
				
				hero_query += 
					'|' + key + "_time_cp="              + Math.floor(time_cp) +
					'|' + key + "_time_qp="              + Math.floor(time_qp) +
					'|' + key + "_time="                 + Math.floor(time_cp + time_qp) +
					'|' + key + "_elim_cp="      + eliminations_cp +
					'|' + key + "_elim_qp="      + eliminations_qp +
					'|' + key + "_elim="         + (eliminations_cp + eliminations_qp) +
					'|' + key + "_dmg_cp="            + damage_cp +
					'|' + key + "_dmg_qp="            + damage_qp +
					'|' + key + "_dmg="               + (damage_cp + damage_qp) + 
					'|' + key + "_wins_cp="         + games_won_cp +
					'|' + key + "_wins_qp="         + games_won_qp +
					'|' + key + "_wins="            + (games_won_cp + games_won_qp);
			});
			
			var games_played_cp = 0, games_won_cp = 0, games_tied_cp = 0, games_lost_cp = 0,
				games_played_qp = 0, games_won_qp = 0, games_tied_qp = 0, games_lost_qp = 0;
				
				games_played_cp = defaultValue(serverdata.stats.competitive.overall_stats.games , 0);
				games_won_cp    = defaultValue(serverdata.stats.competitive.overall_stats.wins  , 0);
				games_tied_cp   = defaultValue(serverdata.stats.competitive.overall_stats.ties  , 0);
				games_lost_cp   = defaultValue(serverdata.stats.competitive.overall_stats.losses, 0);
				games_played_qp = defaultValue(serverdata.stats.quickplay.overall_stats.games   , 0);
				games_won_qp    = defaultValue(serverdata.stats.quickplay.overall_stats.wins    , 0);
				games_tied_qp   = defaultValue(serverdata.stats.quickplay.overall_stats.ties    , 0);
				games_lost_qp   = defaultValue(serverdata.stats.quickplay.overall_stats.losses  , 0);
			
			var query = "/api.php?action=parse&text={{MediaWiki:Custom-OverwatchAPI/Template" +
				"|avatar=" + serverdata.stats.competitive.overall_stats.avatar + 
				"|nick=" + nick +  
				"|tag=" + tag +
				"|server=" + server +
				"|platform=" + platform +
				"|rank=" + serverdata.stats.competitive.overall_stats.tier + 
				"|rank_pts=" + serverdata.stats.competitive.overall_stats.comprank + 
				"|level=" + serverdata.stats.competitive.overall_stats.level + 
				"|level_border=" + level_border +
				"|reallevel=" + (serverdata.stats.competitive.overall_stats.prestige * 100 + serverdata.stats.competitive.overall_stats.level).toString() +
				"|prestige=" + serverdata.stats.competitive.overall_stats.prestige +
				"|games_cp=" + games_played_cp +
				"|wins_cp=" + games_won_cp +
				"|ties_cp=" + games_tied_cp +
				"|losses_cp=" + games_lost_cp +
				"|games_qp=" + games_played_qp +
				"|wins_qp=" + games_won_qp +
				"|ties_qp=" + games_tied_qp +
				"|losses_qp=" + games_lost_qp +
				"|games=" + (games_played_cp + games_played_qp) +
				"|wins=" + (games_won_cp + games_won_qp) +
				"|ties=" + (games_tied_cp + games_tied_qp) +
				"|losses=" + (games_lost_cp + games_lost_qp) +
				"|winrate_cp=" + roundFloat(serverdata.stats.competitive.overall_stats.win_rate, decSpaces).toString().replace('.', decMark) +
				"|winrate_qp=" + roundFloat(serverdata.stats.quickplay.overall_stats.win_rate, decSpaces).toString().replace('.', decMark) +
				"|winrate=" + roundFloat((serverdata.stats.competitive.overall_stats.win_rate + serverdata.stats.quickplay.overall_stats.win_rate) / 2 ).toString().replace('.', decMark) +
				"|elim_cp_avg=" + roundFloat(serverdata.stats.competitive.average_stats.eliminations_avg, decSpaces).toString().replace('.', decMark) +
				"|dmg_cp_avg =" + roundFloat(serverdata.stats.competitive.average_stats.damage_done_avg, decSpaces).toString().replace('.', decMark) +
				"|heal_cp_avg=" + roundFloat(serverdata.stats.competitive.average_stats.healing_done_avg, decSpaces).toString().replace('.', decMark) +
				"|deaths_cp_avg=" + roundFloat(serverdata.stats.competitive.average_stats.deaths_avg, decSpaces).toString().replace('.', decMark) +
				"|elim_qp_avg=" + roundFloat(serverdata.stats.quickplay.average_stats.eliminations_avg, decSpaces).toString().replace('.', decMark) +
				"|dmg_qp_avg=" + roundFloat(serverdata.stats.quickplay.average_stats.damage_done_avg, decSpaces).toString().replace('.', decMark) +
				"|heal_qp_avg=" + roundFloat(serverdata.stats.quickplay.average_stats.healing_done_avg, decSpaces).toString().replace('.', decMark) +
				"|deaths_qp_avg=" + roundFloat(serverdata.stats.quickplay.average_stats.deaths_avg, decSpaces).toString().replace('.', decMark) +
				"|elim_cp_most=" + serverdata.stats.competitive.game_stats.eliminations_most_in_game +
				"|dmg_cp_most =" + serverdata.stats.competitive.game_stats.damage_done_most_in_game +
				"|heal_cp_most=" + serverdata.stats.competitive.game_stats.healing_done_most_in_game +
				"|elim_qp_most=" + serverdata.stats.quickplay.game_stats.eliminations_most_in_game +
				"|dmg_qp_most=" + serverdata.stats.quickplay.game_stats.damage_done_most_in_game +
				"|heal_qp_most=" + serverdata.stats.quickplay.game_stats.healing_done_most_in_game +
				"|elim_cp=" + serverdata.stats.competitive.game_stats.eliminations +
				"|dmg_cp =" + serverdata.stats.competitive.game_stats.damage_done +
				"|heal_cp=" + serverdata.stats.competitive.game_stats.healing_done +
				"|deaths_cp=" + serverdata.stats.competitive.game_stats.deaths +
				"|time_cp=" + serverdata.stats.competitive.game_stats.time_played +
				"|elim_qp=" + serverdata.stats.quickplay.game_stats.eliminations +
				"|dmg_qp=" + serverdata.stats.quickplay.game_stats.damage_done +
				"|heal_qp=" + serverdata.stats.quickplay.game_stats.healing_done +
				"|deaths_qp=" + serverdata.stats.quickplay.game_stats.deaths +
				"|time_qp=" + serverdata.stats.quickplay.game_stats.time_played +
				"|elim_avg=" + roundFloat((serverdata.stats.competitive.average_stats.eliminations_avg + serverdata.stats.quickplay.average_stats.eliminations_avg) / 2, decSpaces).toString().replace('.', decMark) +
				"|dmg_avg=" + roundFloat((serverdata.stats.competitive.average_stats.damage_done_avg + serverdata.stats.quickplay.average_stats.damage_done_avg) / 2, decSpaces).toString().replace('.', decMark) +
				"|heal_avg=" + roundFloat((serverdata.stats.competitive.average_stats.healing_done_avg + serverdata.stats.quickplay.average_stats.healing_done_avg) / 2, decSpaces).toString().replace('.', decMark) +
				"|deaths_avg=" + roundFloat((serverdata.stats.competitive.average_stats.deaths_avg + serverdata.stats.quickplay.average_stats.deaths_avg) / 2, decSpaces).toString().replace('.', decMark) +
				"|elim=" + (serverdata.stats.competitive.game_stats.eliminations + serverdata.stats.quickplay.game_stats.eliminations) +
				"|dmg=" + (serverdata.stats.competitive.game_stats.damage_done + serverdata.stats.quickplay.game_stats.damage_done) +
				"|heal=" + (serverdata.stats.competitive.game_stats.healing_done + serverdata.stats.quickplay.game_stats.healing_done) +
				"|deaths=" + (serverdata.stats.competitive.game_stats.deaths + serverdata.stats.quickplay.game_stats.deaths) +
				"|time=" + (serverdata.stats.competitive.game_stats.time_played + serverdata.stats.quickplay.game_stats.time_played) +
				"|ach_count=" + ach_count +
				"|ach_completed=" + ach_completed +
				"|ach_completion=" + ach_completion +
				"|ach_gen_count=" + ach_general_count +
				"|ach_gen_completed=" + ach_general_completed +
				"|ach_gen_completion=" + ach_general_completion +
				"|ach_off_count=" + ach_offense_count +
				"|ach_off_completed=" + ach_offense_completed +
				"|ach_off_completion=" + ach_offense_completion +
				"|ach_def_count=" + ach_defense_count +
				"|ach_def_completed=" + ach_defense_completed +
				"|ach_def_completion=" + ach_defense_completion +
				"|ach_tank_count=" + ach_tank_count +
				"|ach_tank_completed=" + ach_tank_completed +
				"|ach_tank_completion=" + ach_tank_completion +
				"|ach_supp_count=" + ach_support_count +
				"|ach_supp_completed=" + ach_support_completed +
				"|ach_supp_completion=" + ach_support_completion +
				"|ach_maps_count=" + ach_maps_count +
				"|ach_maps_completed=" + ach_maps_completed +
				"|ach_maps_completion=" + ach_maps_completion +
				"|ach_spec_count=" + ach_special_count +
				"|ach_spec_completed=" + ach_special_completed +
				"|ach_spec_completion=" + ach_special_completion +
				ach_query + hero_query +
				"}}&format=json";
			
			console.log("OW-Api: Parsing user template...");
				
			$.getJSON(query, function(data) { 
				var code = data.parse.text['*'];
				$("div#owapi-main").html(code); 
			});
		}).error(function(){
			console.log("OW-Api: Unknown Error");
            $("div#owapi-main").html(errorMsg);
		});
    }
});

function defaultValue(variable, defaultVal) {
    if(variable !== undefined && variable !== null) return variable;
    return defaultVal;
}

function roundFloat(float, decSpaces) {
    if(decSpaces === 0) return Math.floor(float);
    return (Math.floor(float * Math.pow(10, decSpaces)) / Math.pow(10, decSpaces));
}