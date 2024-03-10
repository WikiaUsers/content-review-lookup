// <nowiki>
$( function () { 
	if (! document.getElementById('infoboxTeam')) return;
	
	function createListplayer() {
		var includeFormer = ! confirm('By default this will only include current playersWhere. Is that okay?');
		clearOutputText();
		var fields = [
			'Ten.DateJoin=DateJoin',
			'Ten.DateLeave=DateLeave',
			'Ten.Player=Player',
			'P.Country=Country',
			'COALESCE(RCL.Role, RCJ.Role)=Role',
			'P.Residency=Residency',
			'P.Name=Name',
		];
		var playersWhere = [];
		var playersRaw = [];
		$('.team-members-current .team-members-player a').each(function() {
			// the tippingOver tooltips remove title attr, so we must use href
			var player = $(this).attr('href')
				.replace(/[_\/]/g, ' ')
				.trim();
			playersWhere.push('Ten.Player="' + player + '"');			
			playersRaw.push(player.charAt(0).toUpperCase() + player.slice(1));
		});
		function getPlayerSortKey(row) {
			console.log(row.Player);
			console.log(playersRaw.indexOf(row.Player));
			return playersRaw.indexOf(window.ucfirst(row.Player));
		}
		var playersWhere = includeFormer ? '' : '(' + playersWhere.join(' OR ')  + ') AND ';
		var team = mw.config.get('wgTitle');
		var where = playersWhere + 'Ten.Team="' + team + '"';
		where = where.replace('\\', '');
		return cargoQuery({
			tables: 'Tenures=Ten,Players=P,RosterChanges=RCJ, RosterChanges=RCL',
			join_on: 'Ten._pageName=P._pageName, Ten.RosterChangeIdJoin=RCJ.RosterChangeId, Ten.RosterChangeIdLeave=RCL.RosterChangeId',
			where: where,
			fields: fields.join(', '),
		}).then(function(data) {
			console.log(data);
			var str = data.sort(function(a, b) {
				return getPlayerSortKey(a) - getPlayerSortKey(b);
			}).map(formatOnePlayer).reduce(function(acc, s) {
				return acc + '\n' + s;
			});
			console.log(str);
			displayOutputText(str, false);
		});
	}
	
	function formatOnePlayer(row) {
		var params = [
			row.Player,
			row.Country,
			row.Name,
			row.Role,
			'res=' + row.Residency,
			'joined=' + row.DateJoin,
			'left=' + row.DateLeave,
			'newteam=none',
		];
		return '{{Listplayer|' + params.join('|') + '}}';
	}
	
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Generate Listplayer', 'ca-gen-listplayer', 'Generate text for Listplayer')).click(createListplayer);
});
// </nowiki>