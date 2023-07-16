var atcn_icons_users = {
	"AttemptToCallNil": "bureaucrat", "User_GreenStone": "bureaucrat",
	"BloodCaster": "bureaucrat",
	"HEKP0H": "bureaucrat",
	
	"ArtParukov2002": "admin",
	"Asassin_1": "admin",
	"Askhadulin": "admin",
	"Atributz": "admin",
	"BabylonAS": "admin", "NickTheRed37": "admin",
	"Bloodhit": "admin",
	"Dand0": "admin",
	"Ivan-r": "admin", "Ivan-r": "admin",
	"Gk_0": "admin",
	"Kokloswine": "admin",
	"MakandIv": "admin",
	"Norrius": "admin",
	"Shahter40": "admin",
	"SYSanin235": "admin",
	"Tarne15": "admin",
	"Teksel": "admin",
	
	"AlexGreatBot": "bot",
	"Boteroot": "bot",
	"CanoptekScarab": "bot",
	"D4zzzBOT": "bot",
	"Dand0Bot": "bot",
	"DeuteriumBot": "bot",
	"Ffbot": "bot",
	"IdefixBot": "bot",
	"IllusionBot": "bot",
	"JARVISTheBot": "bot",
	"MajrBot": "bot",
	"Makandbot": "bot",
	"R2-D2658": "bot",
	"R4_B6": "bot",
	"RandomBot9277": "bot",
	"Violine2202": "bot",
	
	"Alianin": "staff",
	"Azxiana": "staff",
	"Game_widow": "staff",
	"Heytots": "staff",
	"MarkusRost": "staff", // wiki manager
	"Misterwoodhouse": "staff",
	"Mr Pie 5": "staff", // wiki manager / GRASP
	"Pcj": "staff", // wiki manager / GRASP
	"Smokie": "staff",
	"Wynthyst": "staff",
	
	"Blitz": "experienced", "PaulBlitz": "experienced",
	"BPS": "experienced",
	"DrHINK": "experienced",
	"Fixator10": "experienced",
	"INFSCI": "experienced",
	"Jerozgen": "experienced",
	"Matvey200044": "experienced",
	"MrDen28": "experienced",
	"PC_Minecraft": "experienced",
	"RDmitriyS": "experienced",
	"User23812": "experienced",
	"ViChyavIn": "experienced",
	"VirysD25": "experienced",
	"Xottab_DUTY": "experienced",
	
	"SLembas": "trusted",
	"Brandelick": "trusted",
	"Qdone": "trusted",
	"Zacmen628": "trusted",
	"GRAND_RADION": "trusted",
	"Zzzloy": "trusted",
	"Fromgate": "trusted",
	"DimanWorld": "trusted",
	"Sylant": "trusted",
	
	"Alex_Great": "terraria_user",
	
	"Destroyer2023": "otherlang_admin",
	"Majr": "otherlang_admin",
	
	"DSquirrelGM": "grasp",
	"Frisk": "grasp",
	"GRASP bot": "grasp",
	"Madminecrafter12": "grasp",
	"Magiczocker": "grasp",
	"Malvodion": "grasp",
	"Xbony2": "grasp",
};

$(function() {
	$(".mw-userlink").each(function() {
		var $this = $(this);
		var decoded_href = decodeURIComponent($this.attr("href"));
		var match = decoded_href.match(/:([^:]+)$/);
		if (!match) return;
		
		var user = match[1];
		var user_class = atcn_icons_users[user];
		if (!user_class) return;
		
		$this.addClass("atcn-userlink atcn-userlink-" + user_class);
	});
});