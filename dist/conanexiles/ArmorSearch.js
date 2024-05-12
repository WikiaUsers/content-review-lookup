;(function(mw) {
	console.log("armor search: loaded");
	
	function init() {
		console.log("armor search: init");
		
		var limit = 200
		
		var armorSearch = document.getElementById('conan-armor-search')
		if(!armorSearch) return;
		
		var container = document.createElement('div')
		container.id = 'container-armor-search'
		container.innerHTML =	
			'<form id="armor-search-form" onkeydown="return event.key != \'Enter\';" style="width: 610px;">' +
			'  <label for="name" style="display: inline-block; width: 50px;">Name:</label><input name="name" id="armor-search-name" maxlength="30"><br>' +
			'  <fieldset style="width: 610px; margin-bottom: 0;">' +
			'    <legend>Armor Type</legend>' +
			'    <input type="checkbox" value="Light" id="armor-search-armortype-light"><label for="armor-search-armortype-light" style="display: inline-block; width: 100px;">Light</label>' +
			'    <input type="checkbox" value="Medium" id="armor-search-armortype-medium"><label for="armor-search-armortype-medium" style="display: inline-block; width: 100px;">Medium</label>' +
			'    <input type="checkbox" value="Heavy" id="armor-search-armortype-heavy"><label for="armor-search-armortype-heavy" style="display: inline-block; width: 100px;">Heavy</label>' +
			'  </fieldset>' +
			'  <fieldset style="width: 200px; float: left;">' +
			'    <legend>Bonus</legend>' +
			'    <input type="checkbox" value="Agility Weapon Damage" id="armor-search-bonus-agility"><label for="armor-search-bonus-agility">Agility Weapon Damage</label><br>' +
			'    <input type="checkbox" value="Strength Weapon Damage" id="armor-search-bonus-strength"><label for="armor-search-bonus-strength">Strength Weapon Damage</label><br>' +
			'    <input type="checkbox" value="Concussive Damage" id="armor-search-bonus-concussive"><label for="armor-search-bonus-concussive">Concussive Damage</label><br>' +
			'    <input type="checkbox" value="Follower Damage" id="armor-search-bonus-follower"><label for="armor-search-bonus-follower">Follower Damage</label><br>' +
			'    <input type="checkbox" value="Health" id="armor-search-bonus-health"><label for="armor-search-bonus-health">Health</label><br>' +
			'    <input type="checkbox" value="Stamina" id="armor-search-bonus-stamina"><label for="armor-search-bonus-stamina">Stamina</label><br>' +
			'    <input type="checkbox" value="Carrying Capacity" id="armor-search-bonus-carrying"><label for="armor-search-bonus-carrying">Carrying Capacity</label><br>' +
			'  </fieldset>' +
			'  <fieldset style="width: 200px; float: right;">' +
			'    <legend>Source</legend>' +
			'    <input type="checkbox" value="Base Game" id="armor-search-source-basegame"><label for="armor-search-source-basegame">Base Game</label><br>' +
			'    <input type="checkbox" value="DLCs" id="armor-search-source-dlc"><label for="armor-search-source-dlc">DLCs</label><br>' +
			'    <input type="checkbox" value="Black Lotus Bazaar" id="armor-search-source-bazaar"><label for="armor-search-source-bazaar">Black Lotus Bazaar</label><br>' +
			'    <input type="checkbox" value="Battle Pass" id="armor-search-source-battlepass"><label for="armor-search-source-battlepass">Battle Pass</label><br>' +
			'    <input type="checkbox" value="Twitch Drop" id="armor-search-source-twitchdrop"><label for="armor-search-source-twitchdrop">Twitch Drop</label><br>' +
			'  </fieldset>' +
			'  <fieldset style="width: 200px; float: right; margin-left: 5px; margin-right: 5px;">' +
			'    <legend>Effect</legend>' +
			'    <input type="checkbox" value="Cursed" id="armor-search-effect-cursed"><label for="armor-search-effect-cursed">Cursed</label><br>' +
			'    <input type="checkbox" value="Durable" id="armor-search-effect-durable"><label for="armor-search-effect-durable">Durable</label><br>' +
			'    <input type="checkbox" value="Gas Protection" id="armor-search-effect-gas"><label for="armor-search-effect-gas">Gas Protection</label><br>' +
			'    <input type="checkbox" value="Water Breathing" id="armor-search-effect-water"><label for="armor-search-effect-water">Water Breathing</label><br>' +
			'    <input type="checkbox" value="Cold Insulated" id="armor-search-effect-cold"><label for="armor-search-effect-cold">Cold Insulated</label><br>' +
			'    <input type="checkbox" value="Heat Insulated" id="armor-search-effect-heat"><label for="armor-search-effect-heat">Heat Insulated</label><br>' +
			'    <input type="checkbox" value="Set Bonus" id="armor-search-effect-set"><label for="armor-search-effect-set">Set Bonus</label><br>' +
			'  </fieldset>' +
			'  <fieldset style="width: 610px; clear: both;">' +
			'    <legend>Slot</legend>' +
			'    <input type="checkbox" value="3" id="armor-search-slot-head"><label for="armor-search-slot-head" style="display: inline-block; width: 94px;">Head</label>' +
			'    <input type="checkbox" value="4" id="armor-search-slot-torso"><label for="armor-search-slot-torso" style="display: inline-block; width: 94px;">Torso</label>' +
			'    <input type="checkbox" value="5" id="armor-search-slot-hands"><label for="armor-search-slot-hands" style="display: inline-block; width: 94px;">Hands</label>' +
			'    <input type="checkbox" value="6" id="armor-search-slot-legs"><label for="armor-search-slot-legs" style="display: inline-block; width: 94px;">Legs</label>' +
			'    <input type="checkbox" value="7" id="armor-search-slot-feet"><label for="armor-search-slot-feet" style="display: inline-block; width: 94px;">Feet</label>' +
			'  </fieldset>' +
			'  <button id="armor-search-button" type="button">Search</button>' +
			'</form>'
			// '  <span id="armor-search-button" style="border: 1px solid white; padding: 2px 10px; text-align: center;">Search</span>' +
		armorSearch.append(container)
		
		// add onClick-Event to the search button
		var elem = document.getElementById("armor-search-button")
		elem.addEventListener("click", submitForm)
		
		console.log("armor search: end")
	
		function submitForm() {
			console.log("armor search: submitForm")
			
			// hide message
			var armorSearchMessageContainer = document.getElementById('conan-armor-search-message')
			armorSearchMessageContainer.style.display = 'none'
			
			// hide result table
			var armorSearchResultContainer = document.getElementById('conan-armor-search-result')
			armorSearchResultContainer.style.display = 'none'
			
			var params = prepareParameters()
			if(params == '') {
				// error message if nothing is selected
				armorSearchMessageContainer.innerHTML = '⚠️ At least one search option must be specified! ⚠️' 
				armorSearchMessageContainer.style.display = 'unset'
				return false
			}

			new mw.Api().get({
				action:'parse', 
				text: '{{#invoke:ItemSearch|Main|limit=' + (limit + 1) + '|type=Armor' + params + '}}', 
				contentmodel: 'wikitext', 
				format: 'json', 
				disablelimitreport: true
			}).done(function(data){
				var text = data.parse.text['*']
				console.log("armor search: text = " + text)
				
				// count rows
				var count = (text.match(/<\/td><\/tr>/g) || []).length;
				if(count == 0) {
					// message if the search result is empty
					armorSearchMessageContainer.innerHTML = 'Nothing found.' 
					armorSearchMessageContainer.style.display = 'unset'
					return false
				}
				
				if(count > limit) {
					// message if the search result exceeds the search limit
					armorSearchMessageContainer.innerHTML = 'Search result exceeds the maximum number. Only the first ' + limit + ' items are displayed.' 
					armorSearchMessageContainer.style.display = 'unset'
				}
				
				var innerHTML = armorSearchResultContainer.innerHTML
				console.log("armor search: innerHtml = " + innerHTML)
				
				if (text != null) {
					var regex = /<\/th><\/tr>([\s\S]*)<\/tbody>/
					var m;
					if ((m = regex.exec(text)) !== null) {
					    // console.log("armor search: match[1] = " + m[1])
					    
					    var result = innerHTML.replace(/<tbody>[\s\S]*<\/tbody>/, '<tbody>' + m[1] + '</tbody>')
					    
						armorSearchResultContainer.innerHTML = result
						armorSearchResultContainer.style.display = 'unset'
						
						$('#armor-search-result').tablesorter()
					}
				}
			});
			
			return false
		}
		
		function prepareParameters() {
			var params = ''
			
			var name = document.getElementById('armor-search-name')
			if(name.value != null && name.value != '') {
				params += '|name=' + name.value
			}
			
			var armorTypes = ''
			var possibleArmorTypes = Array('light', 'medium', 'heavy')
			for(var i in possibleArmorTypes) {
				var key = possibleArmorTypes[i]
				var element = document.getElementById('armor-search-armortype-' + key)
				if(element != null && element.checked) {
					if(armorTypes != '') {
						armorTypes += ','
					}
					armorTypes += key
				}
			}
			
			if(armorTypes != '') {
				params += '|armorTypes=' + armorTypes
			}

			var bonus = ''
			var bonusKeys = Array('agility', 'strength', 'concussive', 'follower', 'health', 'stamina', 'carrying')
			for(var j in bonusKeys) {
				var key = bonusKeys[j]
				var element = document.getElementById('armor-search-bonus-' + key)
				if(element != null && element.checked) {
					if(bonus != '') {
						bonus += ','
					}
					bonus += key
				}
			}
			
			if(bonus != '') {
				params += '|bonus=' + bonus
			}
			
			var slots = ''
			var slotKeys = Array('head', 'torso', 'hands', 'legs', 'feet')
			for(var k in slotKeys) {
				var key = slotKeys[k]
				var element = document.getElementById('armor-search-slot-' + key)
				if(element != null && element.checked) {
					if(slots != '') {
						slots += ','
					}
					slots += element.value
				}
			}
			
			if(slots != '') {
				params += '|slots=' + slots
			}

			var effects = ''
			var effectKeys = Array('cursed', 'durable', 'gas', 'water', 'cold', 'heat', 'set')
			for(var j in effectKeys) {
				var key = effectKeys[j]
				var element = document.getElementById('armor-search-effect-' + key)
				if(element != null && element.checked) {
					if(effects != '') {
						effects += ','
					}
					effects += key
				}
			}
			
			if(effects != '') {
				params += '|effects=' + effects
			}

			var sources = ''
			var sourceKeys = Array('basegame', 'dlc', 'bazaar', 'battlepass', 'twitchdrop')
			for(var j in sourceKeys) {
				var key = sourceKeys[j]
				var element = document.getElementById('armor-search-source-' + key)
				if(element != null && element.checked) {
					if(sources != '') {
						sources += ','
					}
					sources += key
				}
			}
			
			if(sources != '') {
				params += '|sources=' + sources
			}
			
			console.log("armor search: params = " + params)
			return params
		}
	}

	// Execute script after page is loaded
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);