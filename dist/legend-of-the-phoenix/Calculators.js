//Calculations
function calculateMomentum(authPot, totalPot, level, authAttr, knowledge, food, percentage) {
	return Math.floor((1 + (percentage/100)) * (((((authPot * 30) + (totalPot * 5)) * level) + (authAttr * 0.1)) + 100) + knowledge + food);
}

function calculateAttribute(level, pot){
	return Math.floor((level * level * pot + level * pot + pot * 18 + 100) / 10);
}

function calculateAttributeDiff(oldLevel, oldPot, newLevel, newPot){
	var oldAttr = calculateAttribute(oldLevel, oldPot);
	var newAttr = calculateAttribute(newLevel, newPot);
	return newAttr - oldAttr;
}

//Form injection
var momentumForm = document.getElementById('momentum-form');
if(momentumForm) {
	momentumForm.innerHTML = '<div style="font-weight:bold; text-decoration: underline;">Base Momentum</div><div class="form-group"><label>Authority Potential</label><input type="number" name="authPot" min="0"/></div><div class="form-group"><label>Total Potential</label><input type="number" min="0" name="totalPot"/></div><div class="form-group"><label>Level</label><input type="number" name="level" min="0"/></div><div class="form-group"><label>Authority Attribute</label><input type="number" name="authAttr" min="0"/></div><div style="font-weight:bold; text-decoration: underline;">Modifiers</div><div class="form-group"><label>Knowledge Percentage Bonus</label><input type="number" name="percentage" min="0"/></div><div class="form-group"><label>Knowledge Static Bonus</label><input type="number" name="knowledge" min="0"/></div><div class="form-group"><label>Food Bonus</label><input type="number" name="food" min="0"/></div><div class="form-group"><label>Momentum</label><div id="momentumResult" class="result"></div></div><button type="button" id="momentumBtn">Calculate</button>';
	document.getElementById('momentumBtn').addEventListener('click', calcMomentum);
}

var attrForm = document.getElementById('attr-form');
if(attrForm) {
	attrForm.innerHTML = '<div class="form-group"><label>Wis</label><input type="number" name="wisPot" min="0"/></div><div class="form-group"><label>Pol</label><input type="number" min="0" name="polPot"/></div><div class="form-group"><label>Cha</label><input type="number" min="0" name="chaPot"/></div><div class="form-group"><label>Auth</label><input type="number" min="0" name="authPot"/></div><div class="form-group"><label>Level</label><input type="number" min="0" name="level"/></div><div class="form-group"><label>Wis Attr</label><div id="wisAttr" class="result"></div></div><div class="form-group"><label>Pol Attr</label><div id="polAttr" class="result"></div></div><div class="form-group"><label>Cha Attr</label><div id="chaAttr" class="result"></div></div><div class="form-group"><label>Auth Attr</label><div id="authAttr" class="result"></div></div><div class="form-group"><label>Total Attr</label><div id="totalAttr" class="result"></div></div><button type="button" id="attrBtn">Calculate</button>';
	document.getElementById('attrBtn').addEventListener('click', calcAttributes);
}

//Parse Form Data
function calcMomentum() {
	var authPot = getIntFromField(momentumForm, 'authPot');
	var totalPot = getIntFromField(momentumForm, 'totalPot');
	var level = getIntFromField(momentumForm, 'level');
	var authAttr = getIntFromField(momentumForm, 'authAttr');
	var knowledge = getIntFromField(momentumForm, 'knowledge');
	var food = getIntFromField(momentumForm, 'food');
	var percentage = getIntFromField(momentumForm, 'percentage');
	var momentum = calculateMomentum(authPot, totalPot, level, authAttr, knowledge, food, percentage);
	momentumForm.querySelector('#momentumResult').innerHTML = momentum;
}

function calcAttributes() {
	var wisPot = attrForm.querySelector('input[name="wisPot"]').value;
	var polPot = attrForm.querySelector('input[name="polPot"]').value;
	var chaPot = attrForm.querySelector('input[name="chaPot"]').value;
	var authPot = attrForm.querySelector('input[name="authPot"]').value;
	var level = attrForm.querySelector('input[name="level"]').value;
	var wisAttr = calculateAttribute(level, wisPot);
	var polAttr = calculateAttribute(level, polPot);
	var chaAttr = calculateAttribute(level, chaPot);
	var authAttr = calculateAttribute(level, authPot);
	attrForm.querySelector('#wisAttr').innerHTML = wisAttr;
	attrForm.querySelector('#polAttr').innerHTML = polAttr;
	attrForm.querySelector('#chaAttr').innerHTML = chaAttr;
	attrForm.querySelector('#authAttr').innerHTML = authAttr;
	attrForm.querySelector('#totalAttr').innerHTML = wisAttr + polAttr + chaAttr + authAttr;
}

//Helper Functions
function getIntFromField(form, fieldName){
	var value = form.querySelector('input[name="' + fieldName + '"]').value;
	if(value){
		return parseInt(value);
	}
	return 0;
}