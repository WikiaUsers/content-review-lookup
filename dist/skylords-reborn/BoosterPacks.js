(function () {
	if (mw.config.get('wgPageName') == 'Booster_Packs') {
	    var boosterInfo;
	    var selectedBooster = 'General';
	    var boosterCache = [];
	    var cardStorage = document.querySelector('#booster-cards');
	
	    var cardScene = (function () {
	        var card = document.createElement('div');
	        card.className = 'bcard';
	        var back = document.createElement('div');
	        back.className = 'bcard-back';
	        card.appendChild(back);
	        return card;
	    })();
	
	    function getRandomCard(arr) {
	        var card = arr[Math.floor(Math.random() * arr.length)];
	
	        if (boosterCache.includes(card)) {
	            return getRandomCard(arr);
	        } else {
	            boosterCache.push(card);
	            return card;
	        }
	    }
	
	    function getSlot1() {
	        var rnd = Math.random() * 100;
	        if (rnd <= 0.5) {
	            if (boosterInfo[selectedBooster]['Promo']) {
	                return getRandomCard(boosterInfo[selectedBooster]['Promo']);
	            } else {
	                return getRandomCard(boosterInfo[selectedBooster]['Ultra Rare']);
	            }
	        } else if (rnd <= 20) {
	            return getRandomCard(boosterInfo[selectedBooster]['Ultra Rare']);
	        } else {
	            return getRandomCard(boosterInfo[selectedBooster]['Rare']);
	        }
	    }
	
	    function getSlot2() {
	        var rnd = Math.random() * 100;
	        if (rnd <= 15) {
	            return getRandomCard(boosterInfo[selectedBooster]['Rare']);
	        } else {
	            return getRandomCard(boosterInfo[selectedBooster]['Uncommon']);
	        }
	    }
	
	    function getSlot3() {
	        var rnd = Math.random() * 100;
	        if (rnd <= 20) {
	            return getRandomCard(boosterInfo[selectedBooster]['Uncommon']);
	        } else {
	            return getRandomCard(boosterInfo[selectedBooster]['Common']);
	        }
	    }
	
	    function getSlot4() {
	        return getRandomCard(boosterInfo[selectedBooster]['Uncommon']);
	    }
	
	    function getSlot5() {
	        return getRandomCard(boosterInfo[selectedBooster]['Common']);
	    }
	
	    function getCards() {
	        boosterCache = [];
	        var cards = [getSlot1(), getSlot2(), getSlot3(), getSlot4(), getSlot5(), getSlot5(), getSlot5(), getSlot5()];
	        var container = document.querySelector('#booster-board');
	
	        while (container.childNodes.length > 0) {
	            cardStorage.appendChild(container.childNodes[0]);
	        }
	
	        cards.forEach(function (c) {
	            var scene = cardScene.cloneNode(true);
	            scene.addEventListener('click', function() {this.classList.add('card--flipped')});
	            scene.appendChild(cardStorage.querySelector('.custom-tooltip[data-1="' + c + '"]').cloneNode(true));
	            container.appendChild(scene);
	        });
	    }
	
	    function turnAll() {
	        document.querySelectorAll('#booster-board .bcard').forEach(function (c) {
	            c.click();
	        });
	    }
	
	    function init() {
	        boosterInfo = JSON.parse(document.querySelector('#booster-data').innerHTML);
	
	        var newPackBtn = document.createElement('button');
	        newPackBtn.type = 'button';
	        newPackBtn.innerHTML = 'New Pack';
	        newPackBtn.onclick = getCards;
	
	        var turnAllBtn = document.createElement('button');
	        turnAllBtn.type = 'button';
	        turnAllBtn.innerHTML = 'Flip all cards';
	        turnAllBtn.onclick = turnAll;
	
	        var nav = document.querySelector('#booster-nav');
	        nav.childNodes.forEach(function (child) {
	            var label = document.createElement('label');
	            var image = child.childNodes[0];
	            var radio = document.createElement('input');
	            radio.type = 'radio';
	            radio.name = 'pack';
	            radio.value = child.title;
	            radio.onchange = function (e) {
	                selectedBooster = e.target.value;
	            };
	            if (child.title === 'General') {
	                radio.checked = 'checked';
	            }
	
	            label.append(radio, image);
	
	            child.parentNode.replaceChild(label, child);
	        });
	
	        document.querySelector('#booster-nav2').append(newPackBtn, turnAllBtn);
	
	        newPackBtn.click();
	    }
	
	    mw.hook('wikipage.content').add(init);
	}
})();