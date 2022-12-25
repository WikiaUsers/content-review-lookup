var yourmom = getElement("themusicthingy") ? true : false;
/*	<div>\
	<div id="hub" onclick="doTheThing()">\
		<img src="https://static.wikia.nocookie.net/cp3d/images/d/df/Record-whenpaused.png" height="100px">\
	</div>\*/
if(yourmom) {
	var musicPlayerElement = document.createElement("div");
	musicPlayerElement.id = "music-player";
	var bruhElement = getElement("themusicthingy");
	var mainHTML = '<section>\
	<div><audio controls id="player" src="https://static.wikia.nocookie.net/cp3d/images/4/45/Music_Coconut.mp3"></audio>\
	<label for="music-lisr" class="dropdownLabel">Select a music track from the dropdown list, then click \"Switch track\".</label><br>\
	<select name="music-listy" id="music-list" class="musicSelect">\
		<option disabled>Rooms</option>\
		<option value="2/2f/Music_WelcomeRoom.ogg" selected="selected">Paparazzi Shuffle</option>\
		<option value="e/ed/Music_FireDojo.ogg">Fire Dojo</option>\
		<option value="a/a0/Music_Cove.ogg">Honolulu Honey</option>\
		<option value="4/43/Music_Giftshop.ogg">Superstar</option>\
		<option value="b/be/Music_NightClub.ogg">Crossing Over</option>\
		<option value="8/85/Music_OceanVoyage.mp3">Ocean Voyage</option>\
		<option value="6/6b/Music_PoolMusic.ogg">Gravitons</option>\
		<option value="6/67/Music_SnowForts.ogg">Team Power</option>\
		<option value="a/a7/Music_Town.ogg">Celebration</option>\
		<option value="1/13/Music_CoffeeShop.ogg">King of Kingston</option>\
		<option value="b/b7/Music_HQ.ogg">Stealth</option>\
		<option value="1/16/Music_PizzaParlor.ogg">Charlie\'s Here</option>\
		<option value="2/2a/Music_BoxDimension.ogg">Into the Box Dimension</option>\
		<option value="4/40/Music_RecyclingPlant.ogg">Recyclobot</option>\
		<option value="8/8f/Music_IveBeenDelayed.mp3">I\'ve Been Delayed</option>\
		<option value="a/a3/Music_ParksCanada.mp3">Parks Canada</option>\
		<option value="9/9f/Music_NinjaHideout.ogg">Snowfall-Tower: Courtyard of Snow</option>\
		<option value="5/51/Music_TunnelSystem.ogg">Tiefsee-Tunnelsystem</option>\
		<option value="b/b9/Music_EngineRoom.ogg">Geheimraum im Tiefsee</option>\
		<option value="e/e3/Music_CaseofMissingGary.ogg">The Case of Missing Gary</option>\
		<option value="b/ba/Music_MysteriousHQ.ogg">The Riddle of the Mysterious Cave</option>\
		<option value="0/02/Music_Stage.ogg">Stage</option>\
		<option value="4/42/Music_SkiLodge.ogg">Ski Lodge</option>\
		<option value="7/71/Music_Dojo.ogg">Dojo</option>\
		<option value="e/e2/Music_PaparraziPlaza.mp3">Paparazzi Plaza</option>\
		<option value="1/14/Music_PetShop.ogg">Park (Pet Shop Theme)</option>\
		<option value="8/82/Music_SportShop.ogg">It\'s Sunny Today</option>\
		<option disabled> </option>\
		<option disabled>Parties</option>\
		<option value="5/51/Music_Cumulus.ogg">Cumulus</option>\
		<option value="c/cd/Music_Cumulonimbus.ogg">Cumulonimbus</option>\
		<option value="b/b1/Music_ZeroGravity.ogg">Zero Gravity</option>\
		<option value="9/98/Music_StPatricks.ogg">Patrick\'s Jig</option>\
		<option value="0/08/Music_AprilFools.ogg">Fool</option>\
		<option value="4/40/Music_SpicySalsa.mp3">Spicy Salsa</option>\
		<option value="0/0f/Music_StairsDimension.mp3">Box Dimension version 5 (Stairs Dimension)</option>\
		<option value="4/45/Music_Coconut.mp3">Coconut</option>\
		<option value="7/71/Music_LurkingInTheShadows.mp3">Lurking in the Shadows</option>\
		<option value="2/21/Music_HauntedDisco.mp3">Haunted Disco</option>\
		<option value="3/3d/Music_SpookyJazz.ogg">Spooky Jazz</option>\
		<option value="4/4e/Music_HauntedHouse.ogg">Phantasmagoria</option>\
		<option value="3/39/Music_DareToEnterTheMansion.mp3">Dare to Enter The Mansion?</option>\
		<option value="b/bf/Music_HalloweenJam.mp3">Halloween Jam</option>\
		<option value="1/12/Music_MonsterMasquerade.mp3">Monster Masquerade</option>\
		<option value="6/6e/Music_DJ3K.mp3">DJ3K</option>\
		<option value="8/8d/Music_JazzPiano.mp3">Maybe Baby</option>\
		<option value="3/37/Music_ReggaeStage.mp3">Reggae Stage</option>\
		<option value="f/f7/Music_FlipperStomper.mp3">Flipper Stomp</option>\
		<option value="0/0c/Music_SparklingStage.mp3">The Generic Way</option>\
		<option value="1/12/Music_OrcaStraw.mp3">Orca</option>\
		<option value="3/34/Music_LetTheGameBegin.mp3">Let The Game Begin</option>\
		<option value="0/07/Music_PinkPufflePop.mp3">Pink Puffle Pop</option>\
		<option value="6/62/Music_GoodAttitude.mp3">Good Attitude</option>\
		<option value="6/6d/Music_Ships.mp3">Cannon Fire</option>\
		<option value="b/b9/Music_AdventurePartyMain.mp3">Pirates and Monkeys</option>\
		<option value="3/3a/Music_ForestIslandAdventure.mp3">Pirates and Monkeys 2</option>\
		<option value="f/f4/Music_TownCenterIslandAdventure.mp3">Jungle Crab</option>\
		<option value="b/bc/Music_NightclubAdventureParty.mp3">Jungle Dance</option>\
		<option value="1/1c/Music_TreeForts.mp3">Jungle Beat</option>\
		<option value="2/23/Music_TheVikingOpera.ogg">The Viking Opera</option>\
		<option value="2/24/Music_MainThemeCampPenguin.mp3">Campy\'s Camp</option>\
		<option value="3/33/Music_CampPenguinCampfire.mp3">Campfire</option>\
		<option value="a/ac/Music_SledRacing.mp3">Sled Racing</option>\
		<option value="b/bc/Music_TheYetiCave.mp3">Xylo</option>\
		<option value="3/3d/Music_SantasMix.mp3">Santa\'s Mix</option>\
		<option value="5/51/Music_HolidayCelebration.mp3">Holiday Celebration</option>\
		<option value="3/3d/Music_ChristmasPianoMelody.mp3">Deck The Halls (Piano)</option>\
		<option value="0/05/Music_SantasSleigh.mp3">Santa\'s Sleigh</option>\
		<option value="2/2b/Music_Xmas.mp3">Xmas</option>\
		<option value="f/f0/Music_JingleBells.mp3">Jingle Bells</option>\
		<option value="6/64/Music_Kazoo.ogg">Kazoo</option>\
		<option value="b/b6/Music_AprilFoolsPlaystation.ogg">Fool (PlayStation 1 Cover)</option>\
		<option value="4/4f/Music_RelicOfAnAncientTown.ogg">Relic of an Ancient Town</option>\
		<option value="6/61/Music_ArsenicCakeSong.ogg">The Arsenic Cake Song</option>\
		<option value="7/74/Music_PathtoPharaosTreasure.ogg">Path to Pharao\'s Treasure</option>\
		<option value="a/a0/Music_ChristmasBakery.ogg">Baking in the Christmas Bakery</option>\
		<option value="f/f1/Music_Saloon.mp3">Saloon</option>\
		<option value="8/8c/Music_OrgansoftheNight.mp3">Organs of the Night</option>\
		<option value="2/29/Music_PopTop.mp3">Pop Top</option>\
		<option value="4/4e/Music_Versunken.ogg">Versunken</option>\
		<option disabled> </option>\
		<option disabled>Minigames</option>\
		<option value="6/67/Music_HydroHopper.ogg">Yessir</option>\
		<option value="6/67/Music_IceFishing.ogg">Paris St. Germain</option>\
		<option value="8/86/Music_BeanCounters.mp3">Organic Journey</option>\
		<option value="7/7f/Music_Pizzatron3000.ogg">Pizzatron 3000</option>\
		<option value="3/32/Music_CJFireBattle.ogg">Card-Jitsu Fire</option>\
		<option value="4/49/Music_CardJitsu_Battle.ogg">Ninja Training</option>\
		<option value="2/2d/Music_JetPackAdventure.ogg">Jetpack Adventure</option>\
		<option disabled> </option>\
		<option disabled>Stage Plays</option>\
		<option value="0/0e/Music_NoirNoises.mp3">Noir Noises</option>\
		<option value="9/9c/Music_EgyptianWrap.mp3">Egyptian Wrap</option>\
		<option value="6/69/Music_PepRallyRock.mp3">Pep Rally Rock</option>\
		<option value="d/d3/Music_NightoftheLivingSled.mp3">Night of the Living Sled</option>\
		<option value="f/f1/Music_ForGreatJustice.mp3">For Great Justice</option>\
		<option value="3/3d/Music_ChristmasPianoMelody.mp3">Deck The Halls (Piano)</option>\
	</select><br>\
	<button class="switchTrackButton" onclick="switchMusic()">Switch track</button><br>\
	<span class="dropdownLabel">If a track appears to not be playing, it might still be loading, so please be patient.</span>\
	<div id=play-audio style="display: none;" onclick="playAudio()"><img src="https://static.wikia.nocookie.net/cp3d/images/d/df/Record-whenpaused.png" height="100px"></div> <div id=pause-audio style="display: none;" onclick="pauseAudio()"><img src="https://static.wikia.nocookie.net/cp3d/images/1/1a/Record-whenplaying.gif" height="100px"></div></div></section>';
	musicPlayerElement.innerHTML = mainHTML + '<style>\
	.switchTrackButton {\
		color: white;\
		border-radius: 5px;\
		background-color: blue;\
		border-color: white; \
		margin-top: 6px;\
		font-family: \'Burbank Small\';\
		background-image: \'https://static.wikia.nocookie.net/cp3d/images/6/67/IceFishing_Fish.png/revision/latest?cb=20220313191628\';\
		font-size: 20px;\
	} \
	.dropdownLabel {\
		font-family: \'Burbank Small\';\
		font-size: 20px;\
		text-shadow: 1.5px 1.5px 3px #000000;\
		color: white;\
		margin-top: 10px;\
		margin-bottom: 10px;\
	}\
	.musicSelect {\
		font-size: 20px;\
		border-color: light-blue;\
		font-family: "Burbank Small";\
	}</style></section>';
	getElement("themusicthingy").appendChild(musicPlayerElement);
}
function getElement(id) {
	return document.getElementById(id);
}

function playAudio() {
	document.getElementById('player').play();
	/*show('pause-audio');
	isPlayerPaused = false;*/
}
function pauseAudio() {
    document.getElementById('player').pause();
    /*show('play-audio');
    isPlayerPaused = true;*/
}
var isPlayerPaused = true;
function doTheThing() {
    if(isPlayerPaused == true)
    {
      playAudio();
    }
    else{
      pauseAudio();
    }
}
function show(param_div_id) {
    getElement("hub").innerHTML = document.getElementById(param_div_id).innerHTML;
}
    function switchMusic() {
      var musicDropdown = document.getElementById("music-list");
      var selectedTrack = musicDropdown.value;
      pauseAudio();
      document.getElementById("player").setAttribute("src", "https://static.wikia.nocookie.net/cp3d/images/" + selectedTrack);
    }