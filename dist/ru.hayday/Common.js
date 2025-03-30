//начало
//let storage = window.localStorage;

// перевод английских клавиш на клавиатуре в русские (всё в нижнем регистре)
let engToRusKeys = {'q':'й','w':'ц','e':'у','r':'к','t':'е','y':'н','u':'г','i':'ш','o':'щ','p':'з','[':'х',']':'ъ','a':'ф','s':'ы','d':'в','f':'а','g':'п','h':'р','j':'о','k':'л','l':'д',';':'ж','\'':'э','z':'я','x':'ч','c':'с','v':'м','b':'и','n':'т','m':'ь',',':'б','.':'ю','`':'ё','~':'ё','{':'х','}':'ъ',':':'ж','"':'э','<':'б','>':'ю'};

//svg картинки
let gearSvg, sunSvg, snowSvg, cloudSvg, moonSvg, closeSvg;
{
	// Источник: https://www.svgrepo.com
	gearSvg = '<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentcolor" class="wds-icon" stroke-width="0.48"><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm-1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path><path fill-rule="evenodd" d="M12 1c-.268 0-.534.01-.797.028-.763.055-1.345.617-1.512 1.304l-.352 1.45c-.02.078-.09.172-.225.22a8.45 8.45 0 00-.728.303c-.13.06-.246.044-.315.002l-1.274-.776c-.604-.368-1.412-.354-1.99.147-.403.348-.78.726-1.129 1.128-.5.579-.515 1.387-.147 1.99l.776 1.275c.042.069.059.185-.002.315-.112.237-.213.48-.302.728-.05.135-.143.206-.221.225l-1.45.352c-.687.167-1.249.749-1.304 1.512a11.149 11.149 0 000 1.594c.055.763.617 1.345 1.304 1.512l1.45.352c.078.02.172.09.22.225.09.248.191.491.303.729.06.129.044.245.002.314l-.776 1.274c-.368.604-.354 1.412.147 1.99.348.403.726.78 1.128 1.129.579.5 1.387.515 1.99.147l1.275-.776c.069-.042.185-.059.315.002.237.112.48.213.728.302.135.05.206.143.225.221l.352 1.45c.167.687.749 1.249 1.512 1.303a11.125 11.125 0 001.594 0c.763-.054 1.345-.616 1.512-1.303l.352-1.45c.02-.078.09-.172.225-.22.248-.09.491-.191.729-.303.129-.06.245-.044.314-.002l1.274.776c.604.368 1.412.354 1.99-.147.403-.348.78-.726 1.129-1.128.5-.579.515-1.387.147-1.99l-.776-1.275c-.042-.069-.059-.185.002-.315.112-.237.213-.48.302-.728.05-.135.143-.206.221-.225l1.45-.352c.687-.167 1.249-.749 1.303-1.512a11.125 11.125 0 000-1.594c-.054-.763-.616-1.345-1.303-1.512l-1.45-.352c-.078-.02-.172-.09-.22-.225a8.469 8.469 0 00-.303-.728c-.06-.13-.044-.246-.002-.315l.776-1.274c.368-.604.354-1.412-.147-1.99-.348-.403-.726-.78-1.128-1.129-.579-.5-1.387-.515-1.99-.147l-1.275.776c-.069.042-.185.059-.315-.002a8.465 8.465 0 00-.728-.302c-.135-.05-.206-.143-.225-.221l-.352-1.45c-.167-.687-.749-1.249-1.512-1.304A11.149 11.149 0 0012 1zm-.69 1.525a9.648 9.648 0 011.38 0c.055.004.135.05.162.16l.351 1.45c.153.628.626 1.08 1.173 1.278.205.074.405.157.6.249a1.832 1.832 0 001.733-.074l1.275-.776c.097-.06.186-.036.228 0 .348.302.674.628.976.976.036.042.06.13 0 .228l-.776 1.274a1.832 1.832 0 00-.074 1.734c.092.195.175.395.248.6.198.547.652 1.02 1.278 1.172l1.45.353c.111.026.157.106.161.161a9.653 9.653 0 010 1.38c-.004.055-.05.135-.16.162l-1.45.351a1.833 1.833 0 00-1.278 1.173 6.926 6.926 0 01-.25.6 1.832 1.832 0 00.075 1.733l.776 1.275c.06.097.036.186 0 .228a9.555 9.555 0 01-.976.976c-.042.036-.13.06-.228 0l-1.275-.776a1.832 1.832 0 00-1.733-.074 6.926 6.926 0 01-.6.248 1.833 1.833 0 00-1.172 1.278l-.353 1.45c-.026.111-.106.157-.161.161a9.653 9.653 0 01-1.38 0c-.055-.004-.135-.05-.162-.16l-.351-1.45a1.833 1.833 0 00-1.173-1.278 6.928 6.928 0 01-.6-.25 1.832 1.832 0 00-1.734.075l-1.274.776c-.097.06-.186.036-.228 0a9.56 9.56 0 01-.976-.976c-.036-.042-.06-.13 0-.228l.776-1.275a1.832 1.832 0 00.074-1.733 6.948 6.948 0 01-.249-.6 1.833 1.833 0 00-1.277-1.172l-1.45-.353c-.111-.026-.157-.106-.161-.161a9.648 9.648 0 010-1.38c.004-.055.05-.135.16-.162l1.45-.351a1.833 1.833 0 001.278-1.173 6.95 6.95 0 01.249-.6 1.832 1.832 0 00-.074-1.734l-.776-1.274c-.06-.097-.036-.186 0-.228.302-.348.628-.674.976-.976.042-.036.13-.06.228 0l1.274.776a1.832 1.832 0 001.734.074 6.95 6.95 0 01.6-.249 1.833 1.833 0 001.172-1.277l.353-1.45c.026-.111.106-.157.161-.161z"></path></g></svg>';
	
	sunSvg = '<svg class="wds-icon wds-icon-small"><symbol id="wds-icons-sun-small" viewBox="0 0 18 18"><path d="M9,14a5,5,0,1,1,5-5A5,5,0,0,1,9,14ZM9,6a3,3,0,1,0,3,3A3,3,0,0,0,9,6Zm.2-4a.64.64,0,0,0,.18-.06l.18-.09.15-.12A1.05,1.05,0,0,0,10,1,1,1,0,0,0,9.92.62,1,1,0,0,0,9.71.29L9.56.17,9.38.08A.64.64,0,0,0,9.2,0a1,1,0,0,0-.58.06,1.15,1.15,0,0,0-.33.21,1,1,0,0,0-.21.33A1,1,0,0,0,8,1a1,1,0,0,0,.08.38,1.15,1.15,0,0,0,.21.33A1.05,1.05,0,0,0,9,2Zm.51,15.73a1.15,1.15,0,0,0,.21-.33A1,1,0,0,0,10,17a1,1,0,0,0-1.71-.71A1.05,1.05,0,0,0,8,17a1,1,0,0,0,.08.38,1.15,1.15,0,0,0,.21.33,1,1,0,0,0,1.42,0Zm8-8a1.58,1.58,0,0,0,.12-.15.76.76,0,0,0,.09-.18A.64.64,0,0,0,18,9.2,1.5,1.5,0,0,0,18,9a1,1,0,1,0-2,0,1.5,1.5,0,0,0,0,.2.64.64,0,0,0,.06.18.76.76,0,0,0,.09.18l.12.15a1,1,0,0,0,1.42,0Zm-16,0,.12-.15a.76.76,0,0,0,.09-.18A.64.64,0,0,0,2,9.2,1.5,1.5,0,0,0,2,9a.84.84,0,0,0-.08-.38,1,1,0,0,0-.21-.33,1,1,0,0,0-1.42,0,1,1,0,0,0-.21.33A1,1,0,0,0,0,9a1.5,1.5,0,0,0,0,.2.64.64,0,0,0,.06.18.76.76,0,0,0,.09.18l.12.15a1,1,0,0,0,.33.21A.84.84,0,0,0,1,10,1.05,1.05,0,0,0,1.71,9.71ZM14.85,4.32,15,4.27a1,1,0,0,0,.17-.1.44.44,0,0,0,.15-.12l.13-.15a1.4,1.4,0,0,0,.09-.17,1.39,1.39,0,0,0,.06-.19,1.36,1.36,0,0,0,0-.2A1,1,0,0,0,15.58,3a.87.87,0,0,0-.22-.32.64.64,0,0,0-.15-.13A.91.91,0,0,0,15,2.42l-.19-.06a1,1,0,0,0-.58.06.87.87,0,0,0-.32.22,1,1,0,0,0-.29.7.68.68,0,0,0,0,.2,1.33,1.33,0,0,0,.05.19l.1.17a.79.79,0,0,0,.12.15,1,1,0,0,0,.32.22,1.07,1.07,0,0,0,.39.07A.62.62,0,0,0,14.85,4.32Zm-10.8,11a1,1,0,0,0,.29-.7,1.07,1.07,0,0,0-.07-.39A1,1,0,0,0,4.05,14a1,1,0,0,0-1.41,0,.87.87,0,0,0-.22.32,1.09,1.09,0,0,0-.08.39,1,1,0,0,0,.08.38.87.87,0,0,0,.22.32,1,1,0,0,0,1.41,0Zm11.31,0a1,1,0,0,0,.3-.7,1.09,1.09,0,0,0-.08-.39.87.87,0,0,0-.22-.32A1,1,0,0,0,14,14a1,1,0,0,0-.22.32,1.07,1.07,0,0,0-.07.39,1,1,0,0,0,.07.38,1,1,0,0,0,.22.32,1,1,0,0,0,1.41,0ZM4.05,4.05a.79.79,0,0,0,.12-.15l.1-.17a1.33,1.33,0,0,0,.05-.19.68.68,0,0,0,0-.2,1,1,0,0,0-.29-.7.87.87,0,0,0-.32-.22,1,1,0,0,0-.77,0,.87.87,0,0,0-.32.22A.87.87,0,0,0,2.42,3a1,1,0,0,0-.08.38,1.36,1.36,0,0,0,0,.2l.06.19a1.4,1.4,0,0,0,.09.17l.13.15A1,1,0,0,0,3,4.27a1,1,0,0,0,1.09-.22Z"></path></symbol><use href="#wds-icons-sun-small"></use></svg>';
	
	moonSvg = '<svg class="wds-icon wds-icon-small"><symbol id="wds-icons-moon-small" viewBox="0 0 18 18"><path d="M9 17C6.97016 16.9786 5.02436 16.1863 3.55687 14.7837C2.08938 13.3812 1.20995 11.4732 1.09679 9.44639C0.983621 7.41959 1.64518 5.42556 2.94741 3.86835C4.24965 2.31113 6.09516 1.3072 8.11 1.05996C8.30858 1.03515 8.51004 1.07049 8.68832 1.16141C8.86659 1.25233 9.01349 1.39465 9.11 1.56996C9.204 1.74498 9.24374 1.94403 9.22414 2.14172C9.20455 2.33942 9.12652 2.5268 9 2.67996C8.3519 3.47677 7.99868 4.47286 8 5.49996C8.00265 6.69263 8.4776 7.83568 9.32094 8.67903C10.1643 9.52237 11.3073 9.99732 12.5 9.99996C13.5271 10.0013 14.5232 9.64806 15.32 8.99996C15.4742 8.87503 15.6621 8.7988 15.8598 8.78099C16.0574 8.76319 16.2559 8.8046 16.43 8.89996C16.6053 8.99648 16.7476 9.14337 16.8386 9.32165C16.9295 9.49993 16.9648 9.70138 16.94 9.89996C16.719 11.8518 15.7877 13.6541 14.3234 14.9635C12.8591 16.2728 10.9643 16.9977 9 17V17ZM6.27 3.64996C5.42973 4.08218 4.70343 4.70674 4.15023 5.47279C3.59703 6.23884 3.23257 7.12471 3.08655 8.05828C2.94053 8.99184 3.01706 9.94669 3.30992 10.8451C3.60278 11.7435 4.10368 12.56 4.77183 13.2281C5.43999 13.8963 6.2565 14.3972 7.15489 14.69C8.05328 14.9829 9.00813 15.0594 9.94169 14.9134C10.8753 14.7674 11.7611 14.4029 12.5272 13.8497C13.2932 13.2965 13.9178 12.5702 14.35 11.73C13.7498 11.9098 13.1265 12.0007 12.5 12C10.7769 11.9973 9.12515 11.3116 7.90673 10.0932C6.68832 8.87482 6.00265 7.22306 6 5.49996C5.99925 4.87342 6.09021 4.25015 6.27 3.64996V3.64996Z"></path></symbol><use href="#wds-icons-moon-small"></use></svg>';
	
	cloudSvg = '<svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="616" height="300" viewBox="0 0 163 79" style="height: auto;">'+
	'<g id="layer1" transform="translate(-371,-102)">'+
	'<path stroke-width="5" d="m 389.58682,154.9836 c 1.96987,-14.28425 13.22385,-22.55888 33.11549,-19.04026 3.75596,-11.90853 18.3944,-17.67658 28.27486,-8.33745 13.97612,-19.15901 39.46489,-24.209 52.92473,-0.725 17.37094,3.59296 15.9784,14.66685 13.41244,24.64988 11.59322,2.4844 6.08985,18.86819 -0.3625,18.8499 l -127.59936,0.725 c -10.87315,-0.0503 -5.54274,-17.90322 0.23434,-16.12207 z"/>'+
	'</g></svg>';
	
	// Источник: https://www.svgrepo.com
	snowSvg = '<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_iconCarrier">'+
	'<path d="M12 2V18M12 22V18M12 18L15 21M12 18L9 21M15 3L12 6L9 3" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round"></path>'+
	'<path d="M3.33978 7.00042L6.80389 9.00042M6.80389 9.00042L17.1962 15.0004M6.80389 9.00042L5.70581 4.90234M6.80389 9.00042L2.70581 10.0985M17.1962 15.0004L20.6603 17.0004M17.1962 15.0004L21.2943 13.9023M17.1962 15.0004L18.2943 19.0985" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round"></path>'+
	'<path d="M20.66 7.00042L17.1959 9.00042M17.1959 9.00042L6.80364 15.0004M17.1959 9.00042L18.294 4.90234M17.1959 9.00042L21.294 10.0985M6.80364 15.0004L3.33954 17.0004M6.80364 15.0004L2.70557 13.9023M6.80364 15.0004L5.70557 19.0985" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round"></path></g></svg>';
	
	closeSvg = '<svg class="wds-icon wds-icon-tiny"><use href="#wds-icons-close-tiny"></use></svg>';
}

//nтекущее время
let now = new Date();
let month = now.getMonth();
let date = now.getDate();



console.log(document.body);

//проверка body
var intervaleditCount = setInterval(editcountcalc, 500);

function editcountcalc(){
if (document.body) {clearInterval(intervaleditCount);

let side = document.querySelector('.page-side-tools');

//окно настроек 
{
	let openSett = function(){
		if (!settOpen) {
			settOpen = true;
			div.style.display = 'block';
			backdrop.style.display = 'block';
			let oldW = document.body.clientWidth;
			document.body.style.overflowY = 'hidden';
			let newW = document.body.clientWidth;
			
			//console.log(oldW, newW);
			if (oldW != newW) {
				document.body.style.paddingRight = (newW-oldW)+'px';
			}
		}
	};
	let closeSett = function(){
		if (settOpen){
			settOpen = false;
			div.style.display = 'none';
			backdrop.style.display = 'none';
			document.body.style.overflowY = 'auto';
			document.body.style.paddingRight = 0;
		}
	};
	
	let button = document.createElement('button');
	button.className = 'page-side-tool';
	button.innerHTML = gearSvg;
	button.title = 'Настройки';
	let settOpen = false;
	
	//let settProps = Object.assign({}, storageSett);
	//console.log(settProps);
	let backdrop = document.createElement('backdrop');
	backdrop.id = 'hayday-settings-backdrop';
	backdrop.style.display = 'none';
	
	let div = document.createElement('div');
	div.id = 'hayday-settings-box';
	div.style.display = 'none';
	console.log(storageGet('fps'));
	
	let snowOn = storageGet('noSnow') == 'true' ? '' : 'checked="true"';

	let cloudOn = storageGet('noClouds') == 'true' ? '' : 'checked="true"';
	
	let settHtml = '<button id="close-sett">'+closeSvg+'</button><div id="hayday-settings-level">Ваш уровень (минимум 1, максимум 1000): <input id="level" value="'+(storageGet('level')||'')+'" min="1" max="1000" type="number"/></div>'+
	'<div id="hayday-settings-snow"><b>Настройки снега (в светлой теме)</b>'+
	'<div>Снег включен: <input type="checkbox" id="snow-enabled" '+snowOn+'/></div>'+
	'<div>Интенсивность снега: <small>Меньше</small><input type="range" min="10" max="50" step="10" id="snow-range" value="'+(storageGet('snowDensity')||'10')+'"/><small>Больше</small></div>'+
	'</div>'+
	'<div id="hayday-settings-cloud"><b>Настройки облаков (в тёмной теме)</b>'+
	'<div>Облака включены: <input type="checkbox" id="cloud-enabled" '+cloudOn+'/></div>'+
	'</div><div id="hayday-settings-all"><b>Общие настройки</b>'+
	'<div>Частота кадров в секунду/FPS (минимум 1, максимум 60): <input id="fps" type="number" min="1" max="60" value="'+(storageGet('fps')||'20')+'"/></div>'+
	'</div><button id="submit">Сохранить</button>';
	console.log(settHtml);
	div.innerHTML = settHtml;
	
	let settLvlBox = div.querySelector('#hayday-settings-level');
	let settSnowBox = div.querySelector('#hayday-settings-snow');
	let settCloudBox = div.querySelector('#hayday-settings-cloud');
	let settAllBox = div.querySelector('#hayday-settings-all');
	//let settEndBox = div.querySelector('#hayday-settings-end');
	//if (!((month == 11||month==0||month==1)||(month==3&&date==1))){settSnowBox.style.display = 'none';}
	
	/*let settSimple = div.querySelectorAll('.simple');
	let settAdv = div.querySelectorAll('.advanced');
	settAdv.forEach(function(e){
		e.style.display = 'none';
	});
	
	let settSimpleMode = true;
	let settModeChanger = div.querySelector('a#setmode');
	settModeChanger.addEventListener('click',function(event){
		settSimpleMode = !settSimpleMode;
		if (settSimpleMode){//включить простой
			settSimple.forEach(function(e){e.style.display = 'block';});
			settAdv.forEach(function(e){e.style.display = 'none';});
		} else {
			settSimple.forEach(function(e){e.style.display = 'none';});
			settAdv.forEach(function(e){e.style.display = 'block';});
		}
	});*/
	
	let saveBtn = div.querySelector('#submit');
	saveBtn.addEventListener('click',(ev)=>{
		let goodData = true;
		
		let level = +div.querySelector('input#level').value;
		let fps = +div.querySelector('input#fps').value;
		let snowDensity = +div.querySelector('input#snow-range').value;
		let snowOn = div.querySelector('input#snow-enabled').checked;
		let cloudOn = div.querySelector('input#cloud-enabled').checked;
		
		if (level > 1000 || level < 1) goodData = false;
		if (fps > 60 || fps < 1) goodData = false;
		if (snowDensity < 10 || snowDensity > 50 || snowDensity % 10 != 0) goodData = false;
		
		if (goodData){
			storageSet('level',level);
			storageSet('fps',fps);
			storageSet('noSnow',!snowOn);
			storageSet('noClouds',!cloudOn);
			storageSet('snowDensity',snowDensity);
			
			closeSett();
			
			if (confirm('Для применения изменений требуется перезагрузка страницы. Перезагрузить сейчас?')) location.reload();
		} else {
			alert('Где-то в введённых данных ошибка.\nЯ это узнал, так как goodData = false');
		}
	});
	
	let closeBtn = div.querySelector('#close-sett');
	closeBtn.addEventListener('click',(ev)=>{
		ev.preventDefault();
		closeSett();
	});
	
	
	
	button.addEventListener('click', ()=> openSett() );
	
	backdrop.addEventListener('click', ()=> closeSett() );
	
	document.addEventListener('keydown', (event)=>{
		if (event.code == 'KeyC' && event.altKey && !event.repeat) openSett();
	});
	
	document.body.append(backdrop);
	document.body.append(div);
	side.append(button);
	
}

//отображение данных в зависимости от уровня

let levelPars = document.querySelectorAll('.parohod-level-box');
if(levelPars.length){
	levelPars.forEach((div)=>{
		let usrLevel = storageGet('level');

		let lvlBlock = div.querySelector('.parohod-level');
		let unknownBlock = div.querySelector('.parohod-unknown');
		let blockedBlock = div.querySelector('.parohod-blocked');
		div.querySelector('.parohod-default-text').style.display = 'none';
		let errBlock = div.querySelector('.parohod-error');
		let loadBlock = div.querySelector('.parohod-load');
		
		if (usrLevel){
			usrLevel = +usrLevel;
			if(usrLevel >= 17){
				loadBlock.style.display = 'block';
				getJsonPage('Data:Levels.json').then((res)=>{
					loadBlock.style.display = 'none';
					
					//console.log(res);
					lvlBlock.style.display='block';
					let prodBoatValue = +lvlBlock.dataset.boatValue;
					lvlBlock.querySelector('span.usr-level').innerText = usrLevel;
					
					let boatValue = res[usrLevel-1].boat_value;
					
					let values = [];
					let valuesMax = [];
					if (usrLevel < 20) {
						values.push(Math.ceil(boatValue[0]/(prodBoatValue*9)));
						values.push(Math.ceil(boatValue[0]/(prodBoatValue*6)));
						values.push(Math.ceil(boatValue[1]/(prodBoatValue*9)));
						values.push(Math.ceil(boatValue[1]/(prodBoatValue*6)));
						
						valuesMax.push(Math.ceil(boatValue[1]/(prodBoatValue*6))*2);
						valuesMax.push(Math.ceil(boatValue[1]/(prodBoatValue*9))*3);
					} else if (usrLevel < 25) {
						values.push(Math.ceil(boatValue[0]/(prodBoatValue*9)));
						values.push(Math.ceil(boatValue[1]/(prodBoatValue*9)));
						
						valuesMax.push(Math.ceil(boatValue[1]/(prodBoatValue*9))*3);
					} else {
						values.push(Math.ceil(boatValue[0]/(prodBoatValue*9)));
						values.push(Math.ceil(boatValue[0]/(prodBoatValue*12)));
						values.push(Math.ceil(boatValue[1]/(prodBoatValue*9)));
						values.push(Math.ceil(boatValue[1]/(prodBoatValue*12)));
						
						valuesMax.push(Math.ceil(boatValue[1]/(prodBoatValue*9))*3);
						valuesMax.push(Math.ceil(boatValue[1]/(prodBoatValue*12))*4);
					}
					let min = values[0];
					let max = values[0];
					for (let i = 1; i < values.length; i++){
						let v = values[i];
						if (v>max){max=v;}
						if (v<min){min=v;}
					}
					let maxAll = valuesMax[0];
					for (let i = 1; i < valuesMax.length; i++){
						let v = valuesMax[i];
						if(v>maxAll){maxAll=v;}
					}
					
					let plSp;
					let colBox = lvlBlock.querySelector('span.product-col');
					if (min == max){
						colBox.innerText = min;
						plSp = 'span.plural';
					} else {
						colBox.innerText = 'от '+min+' до '+max;
						plSp = 'span.dplural';
					}
					
					let sMax = String(max);
					if (sMax.at(-1)=='1'&& sMax.at(-2)!='1'){
						lvlBlock.querySelector(plSp+'1').style.display = 'inline';
					} else if (['2','3','4'].includes(sMax.at(-1)) && !['2','3','4'].includes(sMax.at(-2))) {
						lvlBlock.querySelector(plSp+'2').style.display = 'inline';
					} else {
						lvlBlock.querySelector(plSp+'3').style.display = 'inline';
					}
					
					lvlBlock.querySelector('span.product-col-max').innerText = maxAll;
					//lvlBlock.querySelector('span.product-col').innerText = lvlBoatValue[0] + '|'+lvlBoatValue[1]+'|'+boatValue;
				},
				(err) =>{
					loadBlock.style.display = 'none';
					console.error(err);
					
					errBlock.style.display = 'block';
				});
			} else {
				blockedBlock.style.display = 'block';
				blockedBlock.querySelector('span.usr-level').innerText = usrLevel;
			}
		} else {
			unknownBlock.style.display = 'block';
		}
	});
}

// пароход в списках товаров
let goodsListBoats = document.querySelectorAll('.goods-list-boat');
if(goodsListBoats.length){
	let level = storageGet('level');
	if (level) {
		level = +level;
		if (level >= 17){
			getJsonPage('Data:Levels.json').then((res)=>{
				goodsListBoats.forEach((div)=>{
					div.querySelector('.goods-list-boat-default').style.display = 'none';
					let block = div.querySelector('.goods-list-boat-disp');
					
					let lValues = res[level-1].boat_value;
					let pValue = +div.dataset.boatValue;
					
					block.style.display = 'inline';
					block.querySelector('span.usr-lvl').innerText = level;
					
					let min, max, maxAll;
					if (level < 20){
						max = Math.max(Math.ceil(lValues[1]/(pValue*6)), Math.ceil(lValues[1]/(pValue*9)));
						min = Math.min(Math.ceil(lValues[0]/(pValue*6)), Math.ceil(lValues[0]/(pValue*9)));
						maxAll = Math.max(Math.ceil(lValues[1]/(pValue*6))*2, Math.ceil(lValues[1]/(pValue*9))*3);
					} else if (level < 25) {
						max = Math.ceil(lValues[1]/(pValue*9));
						min = Math.ceil(lValues[0]/(pValue*9));
						maxAll = Math.ceil(lValues[1]/(pValue*9))*3;
					} else {
						max = Math.max(Math.ceil(lValues[1]/(pValue*12)), Math.ceil(lValues[1]/(pValue*9)));
						min = Math.min(Math.ceil(lValues[0]/(pValue*12)), Math.ceil(lValues[0]/(pValue*9)));
						maxAll = Math.max(Math.ceil(lValues[1]/(pValue*12))*4, Math.ceil(lValues[1]/(pValue*9))*3);
					}
					
					let insCol = max == min ? min : min+'-'+max;
					
					block.querySelector('span.col').innerText = insCol;
					block.querySelector('span.max-col').innerText = maxAll;
					
				});
			});
		}
	}
}


//кол-во монет в событиях с заданиями
let taskRoadItems = document.querySelectorAll('.sobytie .it-con');
if(taskRoadItems.length){
	let level = storageGet('level');
	if(level){
		level = +level;
		getJsonPage('Data:Levels.json').then((res)=>{
			let rate = res[level-1].dia_rate;
			
			taskRoadItems.forEach((div)=>{
				if(div.querySelector('.wind').innerText.trim() == 'Монеты') {
					let colBox = div.querySelector('.item .col');
					console.log(colBox);
					let col = +colBox.innerText.trim().slice(1);
					console.log(col);
					//console.warn(col);
					col *= rate;
					
					let ret;
					if (col >= 100000){
						ret = Math.floor(col/10000)*10000;
					} else if (col >= 10000){
						ret = Math.floor(col/1000)*1000;
					} else if (col >= 1000){
						ret = Math.floor(col/100)*100;
					} else if (col >= 100){
						ret = Math.floor(col/10)*10;
					} else {
						ret = col;
					}
					
					colBox.innerText = 'x'+ret;
				}
				
			});
		});
	}
}

// калькулятор заказов парохода
if (document.querySelector('.boat-orders-calc')) {
	let updateData = function(goods, levels, good, level, div, langName) {
		let imgBox = div.querySelector('.good-icon');
		div.querySelector('.no-boat').style.display = 'none';
		div.querySelector('.result').style.display = 'none';
		div.querySelector('.small-level').style.display = 'none';
		imgBox.innerHTML = '';
		if (good) {
			getImgPath('Файл:'+good+'.png').then(
				(res) => imgBox.innerHTML = '<a href="/ru/wiki/'+good+'" title="'+(langName||good)+'" target="_blank"><img alt="'+(langName||good)+'" src="'+res+'" /></a>',
				(err) => console.error(err)
			);
			
			if (!goods[good].no_boat && level){
				if(goods[good].level > level){
					div.querySelector('.small-level').style.display = 'block';
					div.querySelector('span.good-level').innerText = goods[good].level;
					div.querySelector('span.input-level').innerText = div.querySelector('span.level input').value;
				}
				let lValues = levels[level-1].boat_value;
				let pValue = goods[good].boat_value;
				
				let boxes = div.querySelectorAll('.boxes');
				
				div.querySelector('.result').style.display = 'block';
				
				let min1, max1, min2, max2, maxAll;
				if (level < 20){
					max1 = Math.ceil(lValues[1]/(pValue*6)); max2 = Math.ceil(lValues[1]/(pValue*9));
					min1 = Math.ceil(lValues[0]/(pValue*6)); min2 = Math.ceil(lValues[0]/(pValue*9));
					maxAll = Math.max(Math.ceil(lValues[1]/(pValue*6))*2, Math.ceil(lValues[1]/(pValue*9))*3);
					
					let insCol1 = max1 == min1 ? min1 : min1+'-'+max1;
					let insCol2 = max2 == min2 ? min2 : min2+'-'+max2;
					
					boxes[0].style.display = 'block';
					boxes[0].querySelector('.col').innerText = insCol1;
					boxes[1].style.display = 'block';
					boxes[1].querySelector('.col').innerText = insCol2;
				} else if (level < 25) {
					max2 = Math.ceil(lValues[1]/(pValue*9));
					min2 = Math.ceil(lValues[0]/(pValue*9));
					maxAll = Math.ceil(lValues[1]/(pValue*9))*3;
					
					let insCol2 = max2 == min2 ? min2 : min2+'-'+max2;
					
					boxes[1].style.display = 'block';
					boxes[1].querySelector('.col').innerText = insCol2;
				} else {
					max1 = Math.ceil(lValues[1]/(pValue*12)); max2 = Math.ceil(lValues[1]/(pValue*9));
					min1 = Math.ceil(lValues[0]/(pValue*12)); min2 = Math.ceil(lValues[0]/(pValue*9));
					maxAll = Math.max(Math.ceil(lValues[1]/(pValue*12))*4, Math.ceil(lValues[1]/(pValue*9))*3);
					
					let insCol1 = max1 == min1 ? min1 : min1+'-'+max1;
					let insCol2 = max2 == min2 ? min2 : min2+'-'+max2;
					
					boxes[2].style.display = 'block';
					boxes[2].querySelector('.col').innerText = insCol1;
					boxes[1].style.display = 'block';
					boxes[1].querySelector('.col').innerText = insCol2;
				}
				
				div.querySelector('.col-max').innerHTML = maxAll;
				
			} else if (goods[good].no_boat) {
				div.querySelector('.no-boat').style.display = 'block';
			}
		}
	};
	
	let url = new URL(window.location.href);
	//let urlS = url.searcParams;
	let allowedLangs = [];
	
	let div = document.querySelector('.boat-orders-calc');
	
	let lang = url.searchParams.get('uselang');
	let langInp = document.createElement('select');
	langInp.innerHTML = '<option selected value="ru">Русский</option>';
	langInp.addEventListener('change', (ev)=>{
		url.searchParams.delete('uselang');
		//console.log(ev.target.value);
		url.searchParams.set('uselang', ev.target.value);
		//console.log(window.location.href, url.searchParams.get('uselang'));
		history.replaceState({},'',url);
		location.reload();
	});
	
	
	let langDataSpans = div.querySelectorAll('#lang-data span');
	langDataSpans.forEach((span)=>{
		allowedLangs.push(span.dataset.lang);
		if(span.dataset.lang == lang) document.querySelector('#firstHeading').innerText = span.dataset.title;
		langInp.innerHTML = langInp.innerHTML + '<option value="'+span.dataset.lang+'">'+span.innerText+'</option>';
	});
	
	// промис для синхронной загрузки 2-х страниц с данными — уровни и товары
	getJsonPage(['Data:Levels.json','Data:Goods.json','Data:Langs.json'], true).then((res)=>{
		//console.log(res);
		let goods = res['Data:Goods.json'], levels = res['Data:Levels.json'], langNames = res['Data:Langs.json'];
		let goodsList = Object.keys(goods).map((x) => x.trim());
		
		div.querySelector('span.lang').append(langInp);
		
		let langGoods = {};
		if(allowedLangs.includes(lang)){
			let langGoodsNames = [];
			langInp.value = lang;
			
			let langSpans = div.querySelectorAll('span.text-trans');
			langSpans.forEach((span)=>span.innerText = span.dataset[(lang == 'pt-br')?'ptBr':lang]);
			
			for(let key in langNames) {
				if(goodsList.includes(key)){
					langGoods[langNames[key][lang]] = key;
					langGoodsNames.push(langNames[key][lang]);
				}
			}
			goodsList = langGoodsNames;
		} else {
			lang = null;
		}
		
		div.querySelector('.default-text').style.display = 'none';
		let resBox = div.querySelector('div.result');
		
		let level = 0, good = '';
		
		// поле ввода уровня
		let levelInp = document.createElement('input');
		let storLvl = storageGet('level');
		if(storLvl){
			storLvl = +storLvl;
			if (storLvl >= 17) { levelInp.value = storLvl; level = storLvl}
		}
		levelInp.type = 'number'; levelInp.min = 17; levelInp.max = 1000;
		div.querySelector('span.level').append(levelInp);
		
		levelInp.addEventListener('input',(ev)=>{
			let lvl = +levelInp.value;
			if (lvl >= 17 && lvl <= 1000) {
				level = lvl;
				updateData(goods, levels, langGoods[good]||good, level, div, good);
			}
		});
		
		//поле ввода продукта
		let goodInp = document.createElement('input');
		goodInp.type = 'text';
		div.querySelector('span.good').append(goodInp);
		
		let hintBox = document.createElement('div');
		hintBox.className = 'hint-box';
		let hintCover = false;
		let hintN = -1;
		hintBox.addEventListener('mouseover', (ev) => hintCover = true);
		hintBox.addEventListener('mouseout', (ev) => hintCover = false);
		
		goodInp.addEventListener('input', (ev)=>{
			let g = goodInp.value;
			
			
			//console.log('goodInp edited!');
			
			if(g){
				g = g.toLowerCase().trim();
				//console.log(g);
				if(!lang){
					let newG = '';
					for (let i = 0; i < g.length; i++){
						let bk = g[i];
						//console.log(bk);
						newG = newG+ (engToRusKeys[bk]||bk);
						//onsole.log(newG);
					}
					g = newG;
				}
				//console.log(g);
				// блок подсказок
				let hintList = [];
				
				div.querySelector('span.good').append(hintBox);
				hintBox.innerHTML = '';
				
				good = '';
				goodsList.forEach((x)=>{
					if(x.toLowerCase().includes(g)){
						hintList.push(x);
					}
					if(x.toLowerCase() == g) {
						good = x;
						//setTimeout(()=>goodInp.blur(), 20);
					}
				});
				
				hintList.forEach((hint, i)=>{
					// 5 подсказок
					if (i < 5) {
						let x = document.createElement('div');
						x.className = 'hint';
						x.innerText = hint;
						hintBox.append(x);
						x.addEventListener('mousedown',(eve) => {
							good = hint;
							goodInp.value = hint;
							hintBox.remove();
							updateData(goods, levels, langGoods[good]||good, level, div, good);
						});
					}
				});
				
				updateData(goods, levels, langGoods[good]||good, level, div, good);
			} else {
				hintBox.remove();
			}
		});
		goodInp.addEventListener('focus', (ev)=>{
			let g = goodInp.value;
			if (g){
				g = g.toLowerCase().trim();
				//console.log(g);
				if(!lang){
					let newG = '';
					for (let i = 0; i < g.length; i++){
						let bk = g[i];
						//console.log(bk);
						newG = newG+ (engToRusKeys[bk]||bk);
						//onsole.log(newG);
					}
					g = newG;
				}
				
				div.querySelector('span.good').append(hintBox);
				let hintList = [];
				
				hintBox.innerHTML = '';
				
				goodsList.forEach((x) => {
					if(x.toLowerCase().includes(g)){
						hintList.push(x);
					}
				});
				
				hintList.forEach((hint, i)=>{
					// 5 подсказок
					if (i < 5) {
						let x = document.createElement('div');
						x.className = 'hint';
						x.innerText = hint;
						hintBox.append(x);
						x.addEventListener('mousedown',(eve) => {
							good = hint;
							goodInp.value = hint;
							hintBox.remove();
							updateData(goods, levels, langGoods[good]||good, level, div, good);
						});
					}
				});
			}
		});
		
		goodInp.addEventListener('keydown', (ev)=>{
			let hints = hintBox.querySelectorAll('.hint');
			if(ev.key == 'Enter') {
				if (hintN > -1 && hintN < hints.length) {
					let hint = hints[hintN];
					goodInp.value = hint.innerText;
					good = hint.innerText;
				}
				goodInp.blur();
				hintBox.remove();
				hintCover = false;
				
				updateData(goods, levels, langGoods[good]||good, level, div, good);
			}
			if(ev.key == 'ArrowUp'){
				ev.preventDefault();
				hintN += 1;
				if (hintN >= hints.length) hintN = 0;
				hints.forEach((h, i)=>{
					if (i == hintN) {
						h.classList.add('checked');
					} else {
						h.classList.remove('checked');
					}
				});
			} else if(ev.key == 'ArrowDown'){
				ev.preventDefault();
				hintN -= 1;
				if (hintN < 0) hintN = hints.length-1;
				hints.forEach((h, i)=>{
					if (i == hintN) {
						h.classList.add('checked');
					} else {
						h.classList.remove('checked');
					}
				});
			}
		});
		
		//удаление блока подсказок по завершению ввода
		goodInp.addEventListener('blur', (ev) => {if(!hintCover) hintBox.remove()});
		
		
	},(err)=> console.error(err));
	
	
}


//vk video
let vkVideos = document.querySelectorAll('.vk-video');
if(vkVideos.length){
	vkVideos.forEach((vid)=>{
		let id = vid.dataset.id;
		let oid = vid.dataset.oid;
		let width = vid.dataset.width || '853';
		let height = vid.dataset.height || '480';
		vid.innerHTML = '<iframe src="https://vk.com/video_ext.php?oid='+oid+'&id='+id+'&hd=2" width="'+width+'" height="'+height+'" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>';
	});
}

//снег в светлой теме
if (document.body.className.includes('theme-fandomdesktop-light')) {

	if ((month == 11||month==0||month==1)||(month==3&&date==1)){
		//let snowDisabled = storageGet('noSnow');
		let summonID;
		let snowBoxes = [];
		for (let i=0; i < 6; i++) {
			let div = document.createElement('div');
			div .className = 'snow-box';
			div.style.height = '100px';
			snowBoxes.push(div);
			document.body.prepend(div);
		}
		
		let checkSnow = function () {
			let winHeight = window.innerHeight;
			snowBoxes.forEach(function(box){
				let height = parseInt(box.style.height);
				//console.log(box.children);
				for(let i=0; i<box.children.length;i++){
					let snow = box.children[i];
					let bottom = parseInt(snow.style.bottom);
					if (height-bottom > winHeight+1000) {
						snow.remove();
					}
				}
			});
		};
		
		
		//let allClouds = [];
		let moveSnow = function (fps) {
		//allClouds.forEach(function(snowflake, i){
			for (let i=0; i<snowBoxes.length;i++){
				let box = snowBoxes[i];
				let height = parseInt(box.style.height);
				box.style.height = (height+(i+1)*(25/fps)) + 'px';
				box.style.left = (-30+Math.sin(height/70)*30)+'px';
			}
		};
		let summonSnow = function(){
			let boxN = randint(0,6);
			
			let snowflake = document.createElement('div');
			let size = randint(10, 21);
			//let color = Math.random()*0.3+0.5;
			//snowflake.speed = randint(2,7);
			//snowflake.rSpeed = randint(-10,10);
			//snowflake.degree = 0;
			let bottom = randint(0, window.innerWidth+60);
			snowflake.className = 'snow';
			//console.log((parseInt(snowBoxes[boxN].style.height)-100) + 'px');
			snowflake.style.bottom = (parseInt(snowBoxes[boxN].style.height)-100) + 'px';
			snowflake.style.left = bottom + 'px';
			snowflake.style.width = size+'px';
			snowflake.style.height = size+'px';
			
			snowflake.innerHTML = randint(0,2)?'<svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_iconCarrier">'+
			'<path d="M12 2V18M12 22V18M12 18L15 21M12 18L9 21M15 3L12 6L9 3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path>'+
			'<path d="M3.33978 7.00042L6.80389 9.00042M6.80389 9.00042L17.1962 15.0004M6.80389 9.00042L5.70581 4.90234M6.80389 9.00042L2.70581 10.0985M17.1962 15.0004L20.6603 17.0004M17.1962 15.0004L21.2943 13.9023M17.1962 15.0004L18.2943 19.0985" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path>'+
			'<path d="M20.66 7.00042L17.1959 9.00042M17.1959 9.00042L6.80364 15.0004M17.1959 9.00042L18.294 4.90234M17.1959 9.00042L21.294 10.0985M6.80364 15.0004L3.33954 17.0004M6.80364 15.0004L2.70557 13.9023M6.80364 15.0004L5.70557 19.0985" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path></g></svg>':
			'<div style="width:60%;height:60%;border-radius:50%;background-color: white;"></div>';
			snowBoxes[boxN].prepend(snowflake);
			//allClouds.push(snowflake);
			//let moveId = setInterval(moveCloud, 40, snowflake, speed, moveId);
			let dens = +(storageGet('snowDensity') || 10);
			summonID = setTimeout(summonSnow, Math.ceil(randint(200, 601)*(17450/(dens*window.innerWidth))));
		};
		let moveInterval;// = setInterval(moveSnow, 50);
		let checkInterval;
		
		//let side = document.querySelector('.page-side-tools');
		let button = document.createElement('button');
		button.className = 'page-side-tool';
		if (storageGet('noSnow') !== 'true'){
			summonID = setTimeout(summonSnow, 1000);
			button.title = 'Ясная погода';
			button.innerHTML = sunSvg;
			let fps = +(storageGet('fps')||20);
			moveInterval = setInterval(moveSnow, Math.ceil(1000/fps), fps);
			checkInterval = setInterval(checkSnow, 5000);
			
		} else {
			button.title = 'Устроить снегопад';
			button.innerHTML = snowSvg;
			
		}
		
		
		/*document.addEventListener('keydown', function(event) {
			if (event.code == 'KeyC' && event.altKey && !event.repeat) {
				if (storageGet('noSnow') == 'true'){
					summonID = setTimeout(summonSnow, 1000);
					storageSet('noSnow', 'false');
					button.title = 'Ясная погода';button.innerHTML = sunSvg;
					let fps = +(storageGet('fps')||20);
					moveInterval = setInterval(moveSnow, Math.ceil(1000/fps), fps);
					checkInterval = setInterval(checkSnow, 5000);
					
				} else {
					clearTimeout(summonID);
					clearInterval(moveInterval);
					clearInterval(checkInterval);
					storageSet('noSnow', 'true');
					button.title = 'Устроить снегопад';button.innerHTML = snowSvg;
					snowBoxes.forEach(function(box){
						box.innerHTML = '';
					});
				}
			}
		});
		button.addEventListener('click', function(){
			if (storageGet('noSnow') == 'true'){
				summonID = setTimeout(summonSnow, 1000);
				storageSet('noSnow', 'false');
				button.title = 'Ясная погода';button.innerHTML = sunSvg;
				let fps = +(storageGet('fps')||20);
				moveInterval = setInterval(moveSnow, Math.ceil(1000/fps), fps);
				checkInterval = setInterval(checkSnow, 5000);
			} else {
				clearTimeout(summonID);
				clearInterval(moveInterval);
				clearInterval(checkInterval);
				storageSet('noSnow', 'true');
				button.title = 'Устроить снегопад';button.innerHTML = snowSvg;
				
				snowBoxes.forEach(function(box){
					box.innerHTML = '';
				});
				
			}
		});*/
		document.addEventListener("visibilitychange", ()=>{
			if (storageGet('noSnow') !== 'true'){
				if (document.hidden){
					console.log('Вкладка не активна');
					clearInterval(moveInterval);
					clearTimeout(summonID);
					clearInterval(checkInterval);
				} else {
					console.log('Вкладка активна');
					let fps = +(storageGet('fps')||20);
					moveInterval = setInterval(moveSnow, Math.ceil(1000/fps), fps);
					summonID = setTimeout(summonSnow, randint(200, 601));
					checkInterval = setInterval(checkSnow, 5000);
				}
			}
		});
		//side.append(button);
	}
}

//облака в тёмной теме
if (document.body.className.includes('theme-fandomdesktop-dark')) {
	//let cloudDisabled = storageGet('noClouds');
	let summonID;
	
	let cloudBoxes = [];
	for (let i=0; i < 4; i++) {
		let div = document.createElement('div');
		div .className = 'dark-cloud-box';
		div.style.width = '500px';
		cloudBoxes.push(div);
		document.body.prepend(div);
	}
	
	let checkClouds = function() {
		let winWidth = window.innerWidth;
		cloudBoxes.forEach(function(box){
			let width = parseInt(box.style.width);
			//console.log(box.children);
			for(let i=0; i<box.children.length;i++){
				let cloud = box.children[i];
				let right = parseInt(cloud.style.right);
				if (width-right > winWidth+1000) {
					cloud.remove();
				}
			}
		});
	};
	
	//let allClouds = [];
	let moveClouds = function(fps) {
		//allClouds.forEach(function(cloud, i){
		for (let i=0; i<cloudBoxes.length;i++){
			let box = cloudBoxes[i];
			box.style.width = (parseInt(box.style.width)+(i+2)*(20/fps)) + 'px';
		}
	};
	let summonCloud = function(){
		let boxN = randint(0,4);
		
		
		let cloud = document.createElement('div');
		let size = randint(150, 401);
		let color = Math.random()*0.3+0.5;
		//cloud.speed = randint(2,7);
		let bottom = randint(10, 71);
		cloud.className = 'dark-cloud';
		cloud.style.right = (parseInt(cloudBoxes[boxN].style.width)-500) + 'px';
		cloud.style.top = bottom + 'px';
		cloud.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="616" height="300" viewBox="0 0 163 79" style="width: '+size+'px; height: auto;">'+
		'<g id="layer1" transform="translate(-371,-102)">'+
		'<path style="fill: #000000;fill-opacity: 0.6;stroke-width: 0.264583px;filter: contrast('+color+');" d="m 389.58682,154.9836 c 1.96987,-14.28425 13.22385,-22.55888 33.11549,-19.04026 3.75596,-11.90853 18.3944,-17.67658 28.27486,-8.33745 13.97612,-19.15901 39.46489,-24.209 52.92473,-0.725 17.37094,3.59296 15.9784,14.66685 13.41244,24.64988 11.59322,2.4844 6.08985,18.86819 -0.3625,18.8499 l -127.59936,0.725 c -10.87315,-0.0503 -5.54274,-17.90322 0.23434,-16.12207 z"/>'+
		'</g></svg>';
		cloudBoxes[boxN].prepend(cloud);
		//allClouds.push(cloud);
		//let moveId = setInterval(moveCloud, 40, cloud, speed, moveId);
		summonID = setTimeout(summonCloud, randint(2000, 6001));
	};
	
	let moveInterval;
	let checkInterval;
	
	//let side = document.querySelector('.page-side-tools');
	let button = document.createElement('button');
	button.className = 'page-side-tool';
	if (storageGet('noClouds') !== 'true'){
		summonID = setTimeout(summonCloud, 1000);
		checkInterval = setInterval(checkClouds, 5000);
		let fps = +(storageGet('fps') || 20);
		moveInterval = setInterval(moveClouds, Math.ceil(1000/fps), fps);
		button.title = 'Ясная погода';
		button.innerHTML = moonSvg;
	} else {
		button.title = 'Пасмурная погода';
		button.innerHTML = cloudSvg;
	}
	
	/*document.addEventListener('keydown', function(event) {
		if (event.code == 'KeyC' && event.altKey && !event.repeat) {
			if (storageGet('noClouds') == 'true'){
				summonID = setTimeout(summonCloud, 1000);
				storageSet('noClouds', 'false');
				button.title = 'Ясная погода';button.innerHTML = moonSvg;
				let fps = +(storageGet('fps') || 20);
				moveInterval = setInterval(moveClouds, Math.ceil(1000/fps), fps);
				checkInterval = setInterval(checkClouds, 5000);
			} else {
				clearInterval(moveInterval);
				clearTimeout(summonID);
				clearInterval(checkInterval);
				storageSet('noClouds', 'true');
				button.title = 'Пасмурная погода';button.innerHTML = cloudSvg;
				cloudBoxes.forEach(function(box){
					box.innerHTML = '';
				});
			}
		}
	});
	
	button.addEventListener('click', function(){
		if (storageGet('noClouds') == 'true'){
			summonID = setTimeout(summonCloud, 1000);
			storageSet('noClouds', 'false');
			button.title = 'Ясная погода';button.innerHTML = moonSvg;
			let fps = +(storageGet('fps') || 20);
			moveInterval = setInterval(moveClouds, Math.ceil(1000/fps), fps);
			checkInterval = setInterval(checkClouds, 5000);
		} else {
			clearInterval(moveInterval);
			clearTimeout(summonID);
			clearInterval(moveInterval);
			storageSet('noClouds', 'true');
			button.title = 'Пасмурная погода';button.innerHTML = cloudSvg;
			cloudBoxes.forEach(function(box){
				box.innerHTML = '';
			});
		}
	});*/
	
	document.addEventListener("visibilitychange", (ev)=>{
		if (storageGet('noClouds') !== 'true') {
			if (document.hidden){
				console.log('Вкладка не активна');
				clearInterval(moveInterval);
				clearTimeout(summonID);
				clearInterval(moveInterval);
			} else {
				console.log('Вкладка активна');
				let fps = +(storageGet('fps') || 20);
				moveInterval = setInterval(moveClouds, Math.ceil(1000/fps), fps);
				summonID = setTimeout(summonCloud, 1000);
				checkInterval = setInterval(checkClouds, 5000);
			}
		}
	});
	//side.append(button);
}

// добавление кнопок
//события с заданиями
if (document.body.className.includes('page-События_с_заданиями_Список_заданий')) {
	
	/* функции */
	let addClickTaskEvent = function(elem) {
		let btn = elem.querySelector('button');
		btn.addEventListener("click", ()=> {
			let level = Number(elem.querySelector("input").value);
			if (level > 0) {
				let rows = document.querySelectorAll('#hidelevels tbody tr');
				for (let i = 0; i < rows.length; i++) {
					let minTxt = rows[i].querySelector("td:nth-child(3)").textContent.trim();
					//console.log(minTxt)
					let min;
					if (minTxt.includes('(')) {
						min = 36;
					} else {
						min = Number(minTxt);
					}
					let maxTxt = rows[i].querySelector("td:nth-child(4)").textContent.trim();
					let max = Number(maxTxt);
					if (max == 0) {
						max = 1000;
					}
				
					//console.log('min:' + min + ', max:' + max)
					if (level >= min && level <= max) {
						rows[i].style="display: table-row;";
					} else {
						rows[i].style="display: none;";
					}
				}
			}
		});
	};

	let taskTable = document.querySelector("#hidelevels");
	let btnCon = document.createElement("span");
	btnCon.style = "float: right;";
	btnCon.innerHTML = 'Введите ваш текущий уровень: <input type="number" min="1" max="1000" style="width: 50px;"><button class="game-button">Показать</button>';
	taskTable.before(btnCon);
	addClickTaskEvent(btnCon);
}

//украшения
if (document.body.className.includes('page-Список_украшений')) {
	let url = new URL(window.location.href);
	let settings = {filters:[],sources:[],tags:[],collections:[],types:[],themes:[],animals:[],size:[],gif:false,save:false,mode:[1, 0],level:0};
	let filtersBox;
	
	let main = function(){
		
		
		let decoTable = document.querySelector("#deco-changed");
		let tbody = document.querySelector('#deco-changed>tbody');
		let rows = tbody.querySelectorAll('tr');
		let sorter = document.querySelector('#deco-sorter');
		
		let saverUrl = sorter.querySelector('#save');
		saverUrl.addEventListener('click',()=>{
			let checked = saverUrl.dataset.checked;
			if(checked=='false'){checked=false}else{checked=true}
			saverUrl.dataset.checked=!checked;
			settings.save=!checked;
			saveFilters();
		});
	
		let decoList = getDecoList(rows);
		console.log(decoList);
		
		sorter.querySelector('#level-input').innerHTML = '<input type="number" width="30"/>';
		let level = sorter.querySelector('#level-input').querySelector('input');
		let switchGif = sorter.querySelector('#gif');
		let modeChanger = sorter.querySelector('#mode');
		filtersBox = sorter.querySelectorAll('.filters');
		let allFilters = sorter.querySelectorAll('.filter');
		let typesFilters = sorter.querySelectorAll('.type-filter');
		let filterNames = Array.from(typesFilters).map(function(z){return z.dataset.type;});
		
		if (url.searchParams.get('save')=='1'){
			settings.save=true;
			saverUrl.dataset.checked = true;
			let x = url.searchParams;
			filterNames.forEach((a, i)=>{
				if(x.has(a)){
					let l = x.get(a).trim().split('|');
					//console.log(a, i, l);
					settings[a]=l;
					allFilters.forEach((f)=>{
						if(l.includes(f.dataset.value)){f.dataset.checked = true;}
						//console.log(f, f.dataset.value, l.includes(f.dataset.value), f.dataset.checked);
					});
				}
			});
			
			if (x.has('mode')){
				let a = x.get('mode').trim();
				settings.mode=[+a[0],+a[1]];
				if (a == '01'){
					modeChanger.innerText = modeChanger.dataset.bMode;
					modeChanger.dataset.mode = 1;
				}
			}
			
			if (x.has('filters')){
				f = x.get('filters').trim().split('');
				f.forEach((a, i)=>{
					if (a == '1'){settings.filters.push(filterNames[i]);typesFilters[i].dataset.checked = true;filtersBox[i].style.display="block";}
				});
				sortDecoTable(rows, decoList, true);
			}
			
			if (x.has('gif')){
				if (x.get('gif')== '1'){
					settings.gif= true;
					switchGif.dataset.checked = true;
					decoGif(rows, decoList, settings.gif, true);
				}
			}
			
			if (x.has('level')){
				let l = x.get('level');
				settings.level = +l;
				level.value = l;
				decoLevel(rows, decoList, +l, true);
			}
			console.log(settings);
		} else {
			allFilters.forEach((filter)=>{
				filter.dataset.checked="false";
			});
		}
		
		allFilters.forEach((filter)=>{
			filter.addEventListener('click',(event)=>{
				let type = filter.parentNode.dataset.type;
				let target = filter.dataset.value;
				let checked = filter.dataset.checked;
				if(checked==='false'){checked=false; settings[type].push(target);}else{checked=true;settings[type].splice(settings[type].indexOf(target),1);}
				filter.dataset.checked = !checked;
				//console.log(type, target, settings);
				sortDecoTable(rows, decoList);
			});
		});
		
		typesFilters.forEach((span)=>{
			span.addEventListener('click',(event)=> changeFilters(event, rows, decoList, settings.mode));
		});
		
		modeChanger.addEventListener('click', ()=>{
			let nameA = modeChanger.dataset.aMode;
			let nameB = modeChanger.dataset.bMode;
			let currentMode = modeChanger.dataset.mode;
			
			if (currentMode == '1'){
				settings.mode = [1, 0];
				modeChanger.dataset.mode = '0';
				modeChanger.innerText=nameA;
			} else {
				settings.mode = [0, 1];
				modeChanger.dataset.mode = '1';
				modeChanger.innerText=nameB;
			}
			sortDecoTable(rows, decoList);
		});
		
		
		sorter.querySelector('#search-input').innerHTML = '<input type="text" />';
		let search = sorter.querySelector('#search-input').querySelector('input');
		let switchRegExp = sorter.querySelector('#reg-exp');
		let switchRegister = sorter.querySelector('#register');
		regExp = false;
		register = false;
		search.addEventListener('input',()=>decoSearch(rows, decoList, search.value, regExp, register));
		switchRegExp.addEventListener('click', ()=>{
			let checked = switchRegExp.dataset.checked;
			if (checked == 'false'){checked=true}else{checked=false}
			switchRegExp.dataset.checked = checked;
			regExp = checked;
		});
		switchRegister.addEventListener('click', ()=>{
			let checked = switchRegister.dataset.checked;
			if (checked == 'false'){checked=true}else{checked=false}
			switchRegister.dataset.checked = checked;
			register = checked;
		});
		
		switchGif.addEventListener('click',()=>{
			let checked = switchGif.dataset.checked;
			if(checked==='false'){checked=false;}else{checked=true;}
			switchGif.dataset.checked = !checked;
			settings.gif=!checked;
			decoGif(rows, decoList, settings.gif);
		});
		
		level.addEventListener('input', (event)=>{
			settings.level=+event.target.value;
			decoLevel(rows, decoList, +event.target.value);
		});
		
		sorter.querySelector('#reset').innerHTML = '<button class="game-button">Сбросить</button>';
		sorter.querySelector('#reset').querySelector('button').addEventListener('click',(event)=>resetAll(rows,sorter));
		
		sorter.querySelector('#mix').innerHTML = '<button class="game-button">Перемешать украшения</button>';
		sorter.querySelector('#mix').querySelector('button').addEventListener('click',(event)=>mixDeco(rows, tbody));
	};
	let getDecoList = function(decos){
		decoSet=[];

		decos.forEach((row, i)=>{
			deco = {};
			
			let tags = row.dataset.tags;
			deco.tags=tags;
			
			let tds = row.querySelectorAll('td');
			
			deco.name = tds[1].querySelector('b').innerText.trim();
			
			deco.sources = [];
			let sources = tds[2].querySelectorAll('li');
			sources.forEach((source)=>{
				let a = source.querySelector('a');
				let text = a ? a.innerText.trim() : source.innerText.trim();
				deco.sources.push(text);
			});
			
			deco.collections = [];
			let collections = tds[5].querySelectorAll('li');
			collections.forEach((collection)=>{
				let text = collection.innerText.trim();
				deco.collections.push(text);
			});
			
			deco.type = tds[8].innerText.trim();
			deco.theme = tds[6].innerText.trim();
			deco.animal = tds[2].querySelectorAll('a')[1] ? tds[2].querySelectorAll('a')[1].title : '';
			
			deco.size = tds[4].innerText.trim().slice(0,1)+tds[4].innerText.trim().slice(2,3);
			
			deco.level = +tds[7].innerText.trim()||1;
			
			decoSet.push(deco);
		});
		//console.log(decos, decoTags);
		
		return decoSet;
	};
	let changeFilters = function(event, rows, decoList, mode){
		console.log(event, filtersBox, settings.filters);
		let span = event.target;
		let target = span.dataset.type;
		let checked = span.dataset.checked;
		if(checked==='false'){checked=false; settings.filters.push(target);}else{checked=true;settings.filters.splice(settings.filters.indexOf(target),1);}
		span.dataset.checked = !checked;
		filtersBox.forEach((filter)=>{
			if (filter.dataset.type == target){
				filter.style.display = checked ? 'none' : 'block';
			}
		});
		sortDecoTable(rows, decoList);
	};
	let sortDecoTable = function(decos, decoParams, fromURL){
		let mode = settings.mode; //mode[0] - пересечение, mode[1] - объединениe
		decos.forEach((deco, i)=>{
			let result = 1;
			let x;
			if (settings.filters.includes('sources')){
				x = 1;
				settings.sources.forEach((source)=>{
					if (decoParams[i].sources.includes(source)) x *= 0;
				});
				result *= x ? mode[1] : mode[0];
			}
			if (settings.filters.includes('tags')){
				x = 1;
				settings.tags.forEach(function(tag){
					if (decoParams[i].tags.includes(tag)){
						x *= 0;
					}
				});
				result *= x ? mode[1] : mode[0];
			}
			if (settings.filters.includes('collections')){
				x = 1;
				settings.collections.forEach((collection)=>{
					if (decoParams[i].collections.includes(collection)) x *= 0;
				});
				result *= x ? mode[1] : mode[0];
			}
			if (settings.filters.includes('types')){
				x = 1;
				settings.types.forEach((type)=>{
					if (decoParams[i].type == type) x *= 0;
				});
				result *= x ? mode[1] : mode[0];
			}
			if (settings.filters.includes('themes')){
				x = 1;
				settings.themes.forEach((theme)=>{
					if (decoParams[i].theme == theme) x *= 0;
				});
				result *= x ? mode[1] : mode[0];
			}
			if (settings.filters.includes('size')){
				x = 1;
				settings.size.forEach((siz)=>{
					if (decoParams[i].size == siz) x *= 0;
				});
				result *= x ? mode[1] : mode[0];
			}
			if (settings.filters.includes('animals')){
				x = 1;
				settings.animals.forEach((animal)=>{
					if (decoParams[i].animal.includes(animal)) x *= 0;
				});
				result *= x ? mode[1] : mode[0];
			}
			if ((!result&&mode[1])||result&&mode[0]){
				deco.dataset.filterHide = 'false';
			}else{
				deco.dataset.filterHide = 'true';
			}
		});
		if (!fromURL) saveFilters();
	};
	let decoSearch = function(decos, decoParams, text, regExp, register){
		decos.forEach((deco, i)=>{
			text = register ? text : text.toLowerCase();
			let name = register ? decoParams[i].name : decoParams[i].name.toLowerCase();
			if (regExp){
				deco.dataset.searchHide=new RegExp(text).test(name)?'false':'true';
			} else {
				deco.dataset.searchHide=name.includes(text)?"false":'true';
			}
		});
	};
	let decoGif = function(decos, decoParams, gif, fromURL){
		decos.forEach((deco, i)=>deco.dataset.gifHide = (decoParams[i].tags.includes('gif')||!gif)?'false':'true');
		if(!fromURL) saveFilters();
	};
	let decoLevel = function(decos, decoParams, level, fromURL){
		decos.forEach((deco, i)=>{
			let decoLvl = decoParams[i].level;
			deco.dataset.levelHide = (decoLvl>level)?'true':'false';
		});
		if(!fromURL) saveFilters();
	};
	let resetAll = function(decos, filters){
		decos.forEach((deco)=>{
			deco.dataset.filterHide = 'false';
			deco.dataset.gifHide = 'false';
			deco.dataset.levelHide = 'false';
		});
		let typesFilters = filters.querySelectorAll('.type-filter');
		let filtersBox = filters.querySelectorAll('.filters');
		let allFilters = filters.querySelectorAll('.filter');
		typesFilters.forEach((filter)=> filter.dataset.checked=false);
		allFilters.forEach((filter)=>filter.dataset.checked=false);
		filtersBox.forEach((filter) =>filter.style.display='none');
		filters.querySelector('#gif').dataset.checked=false;
		filters.querySelector('#save').dataset.checked=false;
		filters.querySelector('#level-input').querySelector('input').value='';
		
		settings = {filters:[],sources:[],tags:[],collections:[],types:[],themes:[],animals:[],size:[],mode:[1,0],save:false};
		saveFilters();
	};
	let saveFilters = function(){
		if (settings.save){
			console.log(settings);
			//if(params.build){URL.searchParams.set('build', parseInt(params.build.join(''), 2).toString(36));}
			//if(params.star){URL.searchParams.set('star', parseInt(params.star.join(''), 2).toString(36));}
			//if(params.level){URL.searchParams.set('level', params.level);}
			let filters = '';
			filters += settings.filters.includes('sources')?'1':'0';
			filters += settings.filters.includes('tags')?'1':'0';
			filters += settings.filters.includes("collections")?'1':'0';
			filters += settings.filters.includes("types")?'1':'0';
			filters += settings.filters.includes("themes")?'1':'0';
			filters += settings.filters.includes("animals")?'1':'0';
			filters += settings.filters.includes("size")?'1':'0';
			url.searchParams.set('filters', filters);
			
			if(settings.sources.length)url.searchParams.set('sources', settings.sources.join('|'));
			if(settings.tags.length)url.searchParams.set('tags', settings.tags.join('|'));
			if(settings.collections.length)url.searchParams.set('collections', settings.collections.join('|'));
			if(settings.types.length)url.searchParams.set('types', settings.types.join('|'));
			if(settings.themes.length)url.searchParams.set('themes', settings.themes.join('|'));
			if(settings.animals.length)url.searchParams.set('animals', settings.animals.join('|'));
			if(settings.size.length)url.searchParams.set('size', settings.size.join('|'));
			
			url.searchParams.set('gif', settings.gif?'1':'0');
			if(settings.level)url.searchParams.set('level', settings.level);
			
			url.searchParams.set('mode', settings.mode.join(''));
			
			url.searchParams.set('save', 1);
			history.replaceState({},'',url);
		} else {
			url.searchParams.delete('filters');
			url.searchParams.delete('sources');
			url.searchParams.delete('tags');
			url.searchParams.delete('collections');
			url.searchParams.delete('types');
			url.searchParams.delete('themes');
			url.searchParams.delete('animals');
			url.searchParams.delete('size');
			url.searchParams.delete('gif');
			url.searchParams.delete('level');
			url.searchParams.delete('save');
			url.searchParams.delete('mode');
			history.replaceState({},'',url);
		}
	};
	let mixDeco = function(decos, table){
		let copyDeco = Array.from(decos);
		while(copyDeco.length){
			let indx = Math.floor(Math.random()*copyDeco.length);
			let delDeco = copyDeco.splice(indx,1);
			console.log(delDeco, indx);
			table.prepend(delDeco[0]);
		}
	};
	
	setTimeout(main, 5000);
}

//скачки 320
if (document.body.className.includes('page-Скачки')) {
	let derbySortSpan = document.createElement("span");
	derbySortSpan.id = "derby-sort";
	derbySortSpan.style = "float: right;";
	let derbySortTxt = document.createTextNode("Введите ваш уровень: ");
	let derbyInput = document.createElement("input");
	derbyInput.type = "number";
	derbyInput.min = 1;
	derbyInput.max = 1000;
	derbyInput.style.width = "50px";
	derbySortSpan.append(derbySortTxt, derbyInput);
	
	let derbyPlace = document.querySelectorAll(".derby-grid")[0];
	derbyPlace.before(derbySortSpan);
	derbyPlace.style.clear = "right";
	
	//console.log(derbyPlace, derbySortSpan);
	
	
	/* функции */
	let derbyAutoSort = function(input) {
		//console.log(input);
		input.addEventListener("input", ()=>{
			//console.log("input");
			let level = +input.value;
			if (level) {
				let tables = document.querySelectorAll(".derby-grid");
				//console.log(level);
				tables.forEach((table)=>{
					let tasks = table.querySelectorAll('.derby-task');
					tasks.forEach((task)=>{
						//console.log(task);
						let localLevel = +task.lastChild.lastChild.firstChild.textContent;
						if (localLevel > level) {
							task.style.display = "none";
						} else {
							task.style.display = "flex";
						}
					});
				});
			}
			
		});
	};
	
	derbyAutoSort(derbyInput);
}

// список продуктов
if (document.body.className.includes('page-Список_продуктов')) {
	let plURL = new URL(window.location.href);
	let plURLBuild = plURL.searchParams.get('build') ? parseInt(plURL.searchParams.get('build'), 36).toString(2) : null;
	let plURLStar = plURL.searchParams.get('star') ? parseInt(plURL.searchParams.get('star'), 36).toString(2) : null;
	let plURLLevel = parseInt(plURL.searchParams.get('level')) ? parseInt(plURL.searchParams.get('level')) : 0;
	let plURLSave = plURL.searchParams.get('save') ? 1 : 0;
	//console.log(plURLBuild);
	//setTimeout(productListAddScroll, 2000);
	//pl — productsList, список продуктов
	//элементы
	let plTable = document.querySelector("#products-list");
	let plRows = plTable.querySelectorAll('tr');
	let plParams = document.querySelector('#products-list-settings');
	let plLevel = plParams.querySelector('#products-list-level');
	let plBuild = plParams.querySelector('#products-list-buildings');
	let plBuildSelect = plBuild.querySelector('.select-all');
	let plStar = plParams.querySelector('#products-list-star');
	let plStarSelect = plStar.querySelector('.select-all');
	let plClear = plParams.querySelector('#products-list-clear');
	let plSave = plParams.querySelector('#products-list-save');
	plSave.innerHTML = '<input type="checkbox"/>';
	let plSaveInp = plSave.querySelector('input');
	let plIsSave;
	if (plURLSave){
		plIsSave = true;
		plSaveInp.checked = true;
	} else {
		plIsSave = false;
		plSaveInp.checked = false;
	}
	
	
	/* функции */
	let plCheckBuilds = function (value, zd, rows, lvl) {
		rows.forEach((row, i) =>{
			if (i) {
				let tds = row.querySelectorAll('td');
				let build = tds[2].dataset.build;//.innerText.trim().replace(/\n/g, ' ');
				let rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
				//console.log(value, tds[2], tds[2].firstChild, build, zd);
				if (build == zd) {
					if (value) {
						if(rowLvl<=lvl||!level){row.style.display='table-row';}
					} else {
						row.style.display='none';
					}
				}
			}
		});
	};
	let plCheckStar = function (value, zd, rows) {
		rows.forEach((row, i) =>{
			if (i) {
				let tds = row.querySelectorAll('td');
				let build = tds[2].dataset.build;
				if (build == zd) {
					let standardTime = row.querySelector('.standard-time');
					let starTime = row.querySelector('.star-time');
					let standardVigoda = row.querySelector('.standard-vigoda');
					let starVigoda = row.querySelector('.star-vigoda');
					if (value) {
						starTime.style.display = 'table-cell';
						standardTime.style.display = 'none';
						row.insertBefore(starTime, standardTime);
						row.append(standardTime);
						starVigoda.style.display = 'table-cell';
						standardVigoda.style.display = 'none';
						row.insertBefore(starVigoda, standardVigoda);
						row.append(standardVigoda);
					} else {
						starTime.style.display = 'none';
						standardTime.style.display = 'table-cell';
						row.insertBefore(standardTime, starTime);
						row.append(starTime);
						starVigoda.style.display = 'none';
						standardVigoda.style.display = 'table-cell';
						row.insertBefore(standardVigoda, starVigoda);
						row.append(starVigoda);
					}
				}
			}
		});
	};
	let plSaveSet = function (params){
		if(params.build) params.url.searchParams.set('build', parseInt(params.build.join(''), 2).toString(36));
		if(params.star) params.url.searchParams.set('star', parseInt(params.star.join(''), 2).toString(36));
		if(params.level) params.url.searchParams.set('level', params.level);
		params.url.searchParams.set('save', 1);
		history.replaceState({},'',params.url);
	};
	
	//кнопки/ввод
	plLevel.innerHTML = '<input type="number" min="1" max="1000" style="width: 50px;" />';
	let plLevelInp = plLevel.querySelector('input');
	if(plURLLevel){
		plLevelInp.value = plURLLevel;
		plRows.forEach((row, i)=>{
			if(i){
				let tds = row.querySelectorAll('td');
				let rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
				//console.log(level, rowLvl);
				if (rowLvl>plURLLevel&&plURLLevel){
					row.style.display='none';
				} else {
					row.style.display='table-row';
				}
			}
		});
	}
	
	
	plClear.innerHTML = '<button class="game-button">Сбросить</button>';
	let plClearBtn = plClear.querySelector('button');
	
	plBuildSelect.innerHTML = '<button class="game-button">Снять выбор</button>';
	let plBuildBtn = plBuildSelect.querySelector('button');
	plStarSelect.innerHTML = '<button class="game-button">Выбрать всё</button>';
	let plStarBtn = plStarSelect.querySelector('button');
	let plBuildIsAll = true;
	let plStarIsAll = false;
	
	//выбор зданий
	let plBuildNames = [];
	let plBuildList = [];
	let plBuildAll = plBuild.querySelectorAll('.click-box');
	
	let plStarList = [];
	let plStarAll = plStar.querySelectorAll('.click-box');
	
	let plURLUseBuild;
	if(plURLBuild) {
		while(plURLBuild.length<plBuildAll.length){plURLBuild='0'+plURLBuild}
		plURLBuild=plURLBuild.split('');
		plURLUseBuild=true;
	} else {
		plURLBuild=[];
		plURLUseBuild=false;
	}
	
	plBuildAll.forEach((span, i)=> {
		img = span.querySelector('img');
		img.ondragstart = () => false;
		build = img.alt;
		plBuildNames.push(build);
		
		if(plURLUseBuild) {
			if(+plURLBuild[i]){
				plBuildList.push(true);
				span.style.background = '#88888830';
			} else {
				plBuildList.push(false);
				span.style.background = 'transparent';
				plStarAll[i].style.display='none';
				plCheckBuilds(false, plBuildNames[i], plRows, 1000);
			}
		} else {
			plBuildList.push(true);
			plURLBuild.push(1);
			span.style.background = '#88888830';
		}
		
		span.addEventListener('click', () =>{
			let x;
			let level = +plLevelInp.value;
			if(!level) level=1000;
			if (plBuildList[i]) {
				plURLBuild[i]=0;
				plBuildList[i] = false;
				span.style.background = 'transparent';
				plStarAll[i].style.display='none';
				x = 1;
				plBuildList.forEach( (is, i) => x *= +!is);
				if(x) plBuildIsAll=false;
				plBuildBtn.textContent = 'Выбрать всё';
			} else {
				plURLBuild[i]=1;
				plBuildList[i] = true;
				span.style.background = '#88888830';
				plStarAll[i].style.display='inline-block';
				x = 1;
				plBuildList.forEach((is, i)=> x *= +is );
				if(x) plBuildIsAll=true;
				plBuildBtn.textContent = 'Снять выбор';
			}
			plCheckBuilds(plBuildList[i], plBuildNames[i], plRows, level);
			if (plIsSave) plSaveSet({url: plURL, build: plURLBuild});
		});
	});
	
	//время с мастерством
	let plURLUseStar;
	if(plURLStar){
		while(plURLStar.length<plStarAll.length) plURLStar='0'+plURLStar;
		plURLStar = plURLStar.split('');
		plURLUseStar = true;
	} else {
		plURLStar=[];
		plURLUseStar=false;
	}
	
	plStarAll.forEach((span, i) =>{
		img = span.querySelector('img');
		img.ondragstart = () => false;
		//plStarList.push(false);
		
		if(plURLUseStar){
			if(+plURLStar[i]){
				plStarList.push(true);
				span.style.background = '#88888830';
				plCheckStar(true, plBuildNames[i], plRows);
			} else {
				plStarList.push(false);
				span.style.background = 'transparent';
			}
		} else {
			plStarList.push(false);
			plURLStar.push(0);
			span.style.background = 'transparent';
		}
		//span.style.display='none';
		span.addEventListener('click', ()=>{
			if (plStarList[i]) {
				plStarList[i] = false;
				span.style.background = 'transparent';
				plURLStar[i] = 0;
			} else {
				plStarList[i] = true;
				span.style.background = '#88888830';
				plURLStar[i] = 1;
			}
			plCheckStar(plStarList[i], plBuildNames[i], plRows);
			if (plIsSave) plSaveSet({url: plURL, star: plURLStar});
		});
	});
	
	//сохранение настроек
	plSaveInp.addEventListener('change', (e)=>{
		plIsSave = e.target.checked;
		if (plIsSave){
			plSaveSet({url: plURL, build: plURLBuild, star: plURLStar, level: plURLLevel});
		} else {
			plURL.searchParams.delete('build');
			plURL.searchParams.delete('star');
			plURL.searchParams.delete('level');
			plURL.searchParams.delete('save');
			history.replaceState({},'',plURL);
		}
	});
	
	//кнопки
	plBuildBtn.addEventListener('click', ()=>{
		let level = +plLevelInp.value;
		if (!level) level=1000;
		if(plBuildIsAll){
			plBuildIsAll = false;
			plBuildBtn.textContent = 'Выбрать всё';
			plBuildAll.forEach((span, i)=>span.style.background = 'transparent');
			plStarAll.forEach((span, i)=>span.style.display='none');
			plRows.forEach((row, i)=> i && row.style.display = 'none' );
			plBuildList = plBuildList.map(()=> false);
			plURLBuild = plURLBuild.map(() => 0);
			if (plIsSave) plSaveSet({url: plURL, build: plURLBuild});
		} else {
			plBuildIsAll = true;
			plBuildBtn.textContent = 'Снять выбор';
			plBuildAll.forEach((span, i)=>span.style.background = '#88888830');
			plStarAll.forEach((span, i)=>span.style.display='inline-block');
			plRows.forEach((row, i)=>{
				if(i){
					let tds = row.querySelectorAll('td');
					let rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
					if(rowLvl<=level||!level){row.style.display='table-row';}
				}
			});
			plBuildList = plBuildList.map(()=> true);
			plURLBuild = plURLBuild.map(()=> 1);
			if (plIsSave) plSaveSet({url: plURL, build: plURLBuild});
		}
		//console.log(plBuildList);
	});
	plStarBtn.addEventListener('click', ()=>{
		if(plStarIsAll) {
			plStarIsAll = false;
			plStarBtn.textContent = 'Выбрать всё';
			plStarAll.forEach((span, i)=>span.style.background='transparent');
			plRows.forEach((row, i)=>{
				if (i) {
					let tds = row.querySelectorAll('td');
					let build = tds[2].dataset.build;
					//console.log('inner:'+tds[2].innerText, 'content:'+tds[2].textContent);
					let j = plBuildNames.indexOf(build);
					//console.log('build '+build, 'index '+j, 'value '+plStarList[j]);
					let standardTime = row.querySelector('.standard-time');
					let starTime = row.querySelector('.star-time');
					let standardVigoda = row.querySelector('.standard-vigoda');
					let starVigoda = row.querySelector('.star-vigoda');
					if (plStarList[j]) {
						starTime.style.display = 'none';
						standardTime.style.display = 'table-cell';
						row.insertBefore(standardTime, starTime);
						row.append(starTime);
						starVigoda.style.display = 'none';
						standardVigoda.style.display = 'table-cell';
						row.insertBefore(standardVigoda, starVigoda);
						row.append(starVigoda);
					}
				}
			});
			plStarList = plStarList.map(()=> false);
			plURLStar = plURLStar.map(()=> 0);
			if (plIsSave) plSaveSet({url: plURL, star: plURLStar});
		} else {
			plStarIsAll = true;
			plStarBtn.textContent = 'Снять выбор';
			plStarAll.forEach((span, i)=>span.style.background='#88888830');
			plRows.forEach((row, i)=>{
				if (i) {
					let tds = row.querySelectorAll('td');
					let build = tds[2].dataset.build;
					//console.log('inner:'+tds[2].innerText, 'content:'+tds[2].textContent);
					let j = plBuildNames.indexOf(build);
					//console.log('build '+build, 'index '+j, 'value '+plStarList[j]);
					let standardTime = row.querySelector('.standard-time');
					let starTime = row.querySelector('.star-time');
					let standardVigoda = row.querySelector('.standard-vigoda');
					let starVigoda = row.querySelector('.star-vigoda');
					if (!plStarList[j]){
						starTime.style.display = 'table-cell';
						standardTime.style.display = 'none';
						row.insertBefore(starTime, standardTime);
						row.append(standardTime);
						starVigoda.style.display = 'table-cell';
						standardVigoda.style.display = 'none';
						row.insertBefore(starVigoda, standardVigoda);
						row.append(standardVigoda);
					}
				}
			});
			plStarList = plStarList.map(()=> true);
			plURLStar = plURLStar.map(()=> 1);
			if (plIsSave) plSaveSet({url: plURL, star: plURLStar});
		}
	});
	
	//сброс
	plClearBtn.addEventListener('click', ()=>{
		plBuildAll.forEach((span, i)=>span.style.background = '#88888830');
		plStarAll.forEach((span, i)=>{span.style.background = 'transparent';span.style.display='inline-block'});
		plLevelInp.value='';
		let plBuildIsAll = true;
		let plStarIsAll = false;
		plStarBtn.textContent = 'Выбрать всё';
		plBuildBtn.textContent = 'Снять выбор';
		plRows.forEach((row, i)=>{
			if (i){
				row.style.display='table-row';
				let tds = row.querySelectorAll('td');
				let build = tds[2].dataset.build;
				//console.log('inner:'+tds[2].innerText, 'content:'+tds[2].textContent);
				let j = plBuildNames.indexOf(build);
				//console.log('build '+build, 'index '+j, 'value '+plStarList[j]);
				let standardTime = row.querySelector('.standard-time');
				let starTime = row.querySelector('.star-time');
				let standardVigoda = row.querySelector('.standard-vigoda');
				let starVigoda = row.querySelector('.star-vigoda');
				if (plStarList[j]) {
					starTime.style.display = 'none';
					standardTime.style.display = 'table-cell';
					row.insertBefore(standardTime, starTime);
					row.append(starTime);
					starVigoda.style.display = 'none';
					standardVigoda.style.display = 'table-cell';
					row.insertBefore(standardVigoda, starVigoda);
					row.append(starVigoda);
				}
			}
		});
		plStarList = plStarList.map(()=> false);
		plBuildList = plBuildList.map(()=> true);
		plURLStar = plURLStar.map(()=> 0);
		plURLBuild = plURLBuild.map(()=> 1);
		plURLLevel = 0;
		if (plIsSave) plSaveSet({url: plURL, star: plURLStar, build: plURLBuild, level: 0});
	});
	
	//уровень
	plLevelInp.addEventListener('input', ()=>{
		let level = +plLevelInp.value;
		if(level){
			plURLLevel = level;
			plRows.forEach((row, i)=>{
				if(i){
					let tds = row.querySelectorAll('td');
					let rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
					let build = tds[2].dataset.build;
					let j = plBuildNames.indexOf(build);
					//console.log(level, rowLvl);
					row.style.display = (rowLvl > level && level) || !plBuildList[j] ? 'none' : 'table-row';
				}
			});
		}
		if (plIsSave) plSaveSet({url: plURL, level: plURLLevel});
	});
	
	console.log(plBuildList, plStarList, plBuildNames);
	

}

//перелистывание
let rotateds = document.querySelectorAll('.rotated-box');
if (rotateds.length) {
	rotateds.forEach((rotatedBox, index) => {
		let pageWidth = (+getComputedStyle(rotatedBox).width.slice(0, -2)) / 2;
		console.log(index, pageWidth);
		
		let rotatesRight = 0;
		let rotatesLeft = 0;
		let movesRight = 0;
		let movesLeft = 0;
		let isMoved = false;
		let isPicked = false;
		
		let rotated = rotatedBox.firstElementChild;
		
		let allPages = rotated.children;
		let activeSide = rotated.lastElementChild;
		
		let strlLeft = rotatedBox.querySelector('.to-left');
		strlLeft.innerHTML = '<img src="https://static.wikia.nocookie.net/hayday/images/9/97/Стрелка_влево.png/revision/latest/scale-to-width-down/40?cb=20240815141934&path-prefix=ru"/>';
		strlLeft.querySelector('img').ondragstart = () => false;
		
		let strlRight = rotatedBox.querySelector('.to-right');
		strlRight.innerHTML = '<img src="https://static.wikia.nocookie.net/hayday/images/b/b7/Стрелка_вправо.png/revision/latest/scale-to-width-down/40?cb=20240815141954&path-prefix=ru"/>';
		strlRight.querySelector('img').ondragstart = () => false;
		
		allPages = Array.from(allPages);
		allPages.splice(-1, 1);
		let page = 1;
		let maxPage = Math.floor(allPages.length / 2) - 1;
		let isMouse = false;
		
		allPages.forEach((elem,i) => elem.style.visibility = 'hidden');
		
		activeSide.append(allPages[2].firstElementChild);
		activeSide.append(allPages[3].firstElementChild);
	
		rotatedBox.addEventListener('mouseenter', ()=> isMouse = true);
		rotatedBox.addEventListener('mouseleave', ()=> isMouse = false);
		
				
		// функции
		let startRightPage = function (){
			allPages[page*2+1].style.visibility = 'visible';
			
			allPages[page*2+1].append(activeSide.lastElementChild);
			activeSide.append(allPages[(page+1)*2+1].firstElementChild);
			
			allPages[page*2+1].style.transform='rotateY(-90deg)';
			allPages[page*2+1].style.zIndex=100-page;
			allPages[(page+1)*2].style.transform='rotateY(90deg)';
			page++;
			rotatesRight++;
			
			strlLeft.style.filter = 'grayscale(0)';
			if (page == maxPage) {strlRight.style.filter = 'grayscale(1)';}
			
			
			setTimeout(closeRightPage, 500, allPages, page, activeSide, false);
		};
		let startLeftPage = function (){
			allPages[page*2].style.visibility = 'visible';
			
			allPages[page*2].append(activeSide.firstElementChild);
			activeSide.prepend(allPages[(page-1)*2].firstElementChild);
			
			allPages[page*2].style.transform='rotateY(90deg)';
			allPages[page*2].style.zIndex=2+page;
			allPages[(page-1)*2+1].style.transform='rotateY(-90deg)';
			page--;
			rotatesLeft++;
			
			if (page == 0) {strlLeft.style.filter = 'grayscale(1)';}
			strlRight.style.filter = 'grayscale(0)';
			
			setTimeout(closeLeftPage, 500, allPages, page, activeSide, false);
		};
		let closeRightPage = function (pages, page, activeSide, moved){
			pages[(page-1)*2+1].style.zIndex=0;
			pages[(page-1)*2+1].style.transform='rotateY(0deg)';
			pages[(page-1)*2+1].style.visibility='hidden';
			pages[page*2].style.visibility='visible';
			pages[page*2].style.transform='rotateY(0deg)';
			pages[page*2].style.zIndex=1+page;
			setTimeout(endRightPage, 500, pages, page, activeSide, moved);
		};
		let closeLeftPage = function (pages, page, activeSide, moved){
			pages[(page+1)*2].style.zIndex=0;
			pages[(page+1)*2].style.transform='rotateY(0deg)';
			pages[(page+1)*2].style.visibility='hidden';
			pages[page*2+1].style.visibility='visible';
			pages[page*2+1].style.transform='rotateY(0deg)';
			pages[page*2+1].style.zIndex=100-page;
			setTimeout(endLeftPage, 500, pages, page, activeSide, moved);
		};
		let endRightPage = function (pages, page, activeSide, moved){
			pages[page*2].style.zIndex=0;
			
			pages[(page-1)*2].append(activeSide.firstElementChild);
			activeSide.prepend(pages[page*2].firstElementChild);
			
			pages[page*2].style.visibility='hidden';
			if (!moved) {rotatesRight--;} else {movesRight--;allPages[(page-1)*2+1].style.transition = 'transform .5s linear';}
		};
		let endLeftPage = function (pages, page, activeSide, moved){
			pages[page*2+1].style.zIndex=0;
			
			pages[(page+1)*2+1].append(activeSide.lastElementChild);
			activeSide.append(pages[page*2+1].firstElementChild);
			
			pages[page*2+1].style.visibility='hidden';
			if (!moved) {rotatesLeft--;} else {movesLeft--;allPages[(page+1)*2].style.transition = 'transform .5s linear';}};
		let endRightMove = function (){
			isMoved = false;
			rotatesRight--;
			allPages[page*2+1].style.visibility = 'hidden';
			allPages[(page+1)*2].style.transition = 'transform .5s linear';
			allPages[page*2+1].style.transition = 'transform .5s linear';
			allPages[(page+1)*2+1].append(activeSide.lastElementChild);
			activeSide.append(allPages[page*2+1].firstElementChild);
			allPages[page*2+1].style.zIndex=0;
		};
		let endLeftMove = function (){
			isMoved = false;
			rotatesLeft--;
			allPages[page*2].style.visibility = 'hidden';
			allPages[(page-1)*2+1].style.transition = 'transform .5s linear';
			allPages[page*2].style.transition = 'transform .5s linear';
			allPages[(page-1)*2].append(activeSide.firstElementChild);
			activeSide.prepend(allPages[page*2].firstElementChild);
			allPages[page*2].style.zIndex=0;
		};
	
		rotated.onpointerdown = (event)=>{
			if(event.target.localName != 'img'){
				isPicked = true;
				rotated.setPointerCapture(event.pointerId);
				let rect = rotated.getBoundingClientRect();
				
				let clickX = event.pageX-rect.left;
				console.log(clickX, event);
				if (clickX < pageWidth && !rotatesRight&&!rotatesLeft && page > 0 && !movesRight && event.isPrimary && event.button === 0) {
					// схвачена левая страница
					console.log('pick up left', isMoved, isPicked);	
					
					rotated.onpointermove = (event) =>{
						if (!isMoved){
							isMoved = true;
							isPicked = false;
							
							console.log('start move: ', isMoved,isPicked);
							
							allPages[page*2].style.transition = 'transform 0s linear';
							allPages[page*2].style.visibility = 'visible';
							allPages[page*2].append(activeSide.firstElementChild);
							allPages[(page-1)*2+1].style.transition = 'transform 0s linear';
							allPages[(page-1)*2+1].style.transform='rotateY(-90deg)';
							
							activeSide.prepend(allPages[(page-1)*2].firstElementChild);
							allPages[page*2].style.zIndex=2;
							
							rotated.onpointercancel = (event) =>{
								//console.log(event);
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								
								rotatesLeft++;
								
								console.log('move cancel in left', isMoved, isPicked);
								
								
								allPages[page*2].style.transition = 'transform 1ms linear';
								allPages[page*2].style.transform='rotateY(0deg)';
								allPages[(page-1)*2+1].style.transform='rotateY(0deg)';
								
								setTimeout(endLeftMove, 1);
							};
							rotated.onpointerup = (event)=> {
								let ms = Math.floor(((event.pageX-rect.left)-clickX)*(500/pageWidth));
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								rotatesLeft++;
								
								console.log('mouse up in left', isMoved, isPicked);
								
								allPages[page*2].style.transition = 'transform '+ms+'ms linear';
								allPages[page*2].style.transform='rotateY(0deg)';
								allPages[(page-1)*2+1].style.transform='rotateY(0deg)';
								
								setTimeout(endLeftMove, ms);
							};
						}
						
						let mouseX = event.pageX-rect.left;
						let deg = (mouseX-clickX)*(90/pageWidth);
						if (deg < 0) {deg = 0;}
						console.log('move',mouseX, deg);
						
						if (deg > 90) {
							rotated.onpointermove = null;
							rotated.onpointerup = null;
							rotated.onpointercancel = null;
							isMoved = false;
							
							allPages[(page-1)*2+1].style.transition = 'transform .5s linear';
							
							movesLeft++;
							page--;
							
							if (page == 0) strlLeft.style.filter = 'grayscale(1)';
							strlRight.style.filter = 'grayscale(0)';
							
							closeLeftPage(allPages, page, activeSide, true);
						} else {
							allPages[page*2].style.transform='rotateY('+deg+'deg)';
						}
					};
					
					
				} else if (!rotatesRight&&!rotatesLeft && page < maxPage && !movesLeft && event.isPrimary && event.button === 0) {
					// схвачена правая страница
					console.log('pick up right', isMoved, isPicked);
					rotated.onpointermove = (event) =>{
						if (!isMoved) {
							isMoved = true;
							isPicked = false;
							console.log('start move');
							
							allPages[page*2+1].style.transition = 'transform 0s linear';
							allPages[page*2+1].style.visibility = 'visible';
							allPages[page*2+1].append(activeSide.lastElementChild);
							allPages[(page+1)*2].style.transition = 'transform 0s linear';
							allPages[(page+1)*2].style.transform='rotateY(90deg)';
							
							activeSide.append(allPages[(page+1)*2+1].firstElementChild);
							allPages[page*2+1].style.zIndex=2;
							
							rotated.onpointercancel = (event)=> {
								//console.log(event);
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								
								rotatesRight++;
								
								console.log('move cancel in right', isMoved, isPicked);
								
								allPages[page*2+1].style.transition = 'transform 1ms linear';
								allPages[page*2+1].style.transform='rotateY(0deg)';
								allPages[(page+1)*2].style.transform='rotateY(0deg)';
								
								setTimeout(endRightMove, 1);
							};
							
							rotated.onpointerup = (event) =>{
								let ms = Math.floor((clickX-(event.pageX-rect.left))*(500/pageWidth));
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								rotatesRight++;
								
								console.log('mouse up in right', isMoved, isPicked);
								
								allPages[page*2+1].style.transition = 'transform '+ms+'ms linear';
								allPages[page*2+1].style.transform='rotateY(0deg)';
								allPages[(page+1)*2].style.transform='rotateY(0deg)';
								
								setTimeout(endRightMove, ms);
							};
						}
						
						let mouseX = event.pageX-rect.left;
						let deg = -((clickX-mouseX)*(90/pageWidth));
						if (deg > 0) deg = 0;
						//console.log(mouseX, deg);
						
						if (deg < -90) {
							rotated.onpointermove = null;
							rotated.onpointerup = null;
							rotated.onpointercancel = null;
							isMoved = false;
							
							allPages[(page+1)*2].style.transition = 'transform .5s linear';
							
							movesRight++;
							page++;
							
							strlLeft.style.filter = 'grayscale(0)';
							if (page == maxPage) strlRight.style.filter = 'grayscale(1)';
								
							closeRightPage(allPages, page, activeSide, true);
						} else {
						
							allPages[page*2+1].style.transform='rotateY('+deg+'deg)';
						}
					};
				}
				rotated.onpointerup = (event)=>{
					rotated.onpointermove = null;
					rotated.onpointerup = null;
					rotated.onpointercancel = null;
					
					isPicked = false;
					
					console.log('mouse up', isMoved, isPicked);
				};
				rotated.onpointercancel = (event)=>{
					rotated.onpointermove = null;
					rotated.onpointerup = null;
					rotated.onpointercancel = null;
					
					isPicked = false;
					
					console.log('pointer cancel', isMoved, isPicked);
				};
			}
		};
	
		document.addEventListener('keydown', (event)=>{
			//console.log('pressed', event.key, page, allPages.length, isMouse);
			if (event.key=='ArrowRight' && page < maxPage && isMouse && !rotatesLeft && !isMoved && !movesLeft && !isPicked) {
				startRightPage();
			}
			if (event.key=='ArrowLeft' && page > 0 && isMouse && !rotatesRight && !isMoved && !movesRight && !isPicked) {
				startLeftPage();
			}
		});
		
		strlLeft.addEventListener("click", ()=>{
			if (page > 0 && !rotatesRight && !isMoved && !movesRight && !isPicked) {
				startLeftPage();
			}
		});
		strlRight.addEventListener("click", ()=>{
			if (page < maxPage && !rotatesLeft && !isMoved && !movesLeft && !isPicked) {
				startRightPage();
			}
		});

	});

}

//интересные факты заглавная
let facts = document.querySelectorAll(".mainpage-fact");
if (facts.length>0) {
	let factError = document.querySelector(".mainpage-fact-error");
	factError.style.display = "none";
	let randIndx=randint(0,facts.length);
	console.log('Факт номер '+randIndx);
	facts[randIndx].style.display="block";
	
	// функции 
	let hideFact = function (fact) {
		fact.style.display="none";
		fact.style.left="0";
		fact.style.zIndex="1";
	};
	let updateFact = function (facts, oldIndx){
		facts[oldIndx].style.left="300px";
		facts[oldIndx].style.zIndex="100";
		randIndx = randint(0,facts.length);
		console.log('Факт номер'+randIndx);
		while (randIndx === oldIndx) {
			randIndx = randint(0,facts.length);
			console.log(randIndx);
		}
		facts[randIndx].style.display="block";
		setTimeout(hideFact, 1000, facts[oldIndx]);
		setTimeout(updateFact, 15000, facts, randIndx);
	};
	
	setTimeout(updateFact, 15000, facts, randIndx);
}


//noimage
let linksToNewImg = document.querySelectorAll('.mw-parser-output a');
//console.log(linksToNewImg);
if (linksToNewImg.length) {
	linksToNewImg.forEach((link)=> {
		if (link.href.includes('wpDestFile=')) link.innerHTML = '<img src="https://static.wikia.nocookie.net/hayday/images/7/7d/Нет_картинки.gif/revision/latest?cb=20231204095429&format=original&path-prefix=ru" style="width:150px; height:auto;" alt="Нет картинки" />';
	});
}

// События с заданиями: эффект мыши
if (document.body.className.includes('page-События_с_заданиями')) {
	let sobytieRoads = document.querySelectorAll(".sobytie .road");
	sobytieRoads.forEach((road)=>{
		let roadPolosa = road.querySelector(".polosa");
		let roadPolosaBorder = road.querySelector(".polosa-border");
		let points = road.querySelectorAll(".points");
		
		let nowPoint = document.createElement("div");
		nowPoint.className = "now-point hayday";
		nowPoint.style.left="-50px";
		nowPoint.innerHTML = '<svg width="20px" height="13px"><polygon points="0,13 10,0 20,13" fill="white"/></svg>';
		let nowPointText = document.createTextNode("0");
		nowPoint.append(nowPointText);
		road.append(nowPoint);
		
		let numPoint = 0;
		road.addEventListener("pointermove", ()=>{
			let rect = road.getBoundingClientRect();
			let mouseX = event.pageX-rect.left+road.scrollLeft;
			roadPolosa.style.width=mouseX+"px";
			roadPolosaBorder.style.width=(mouseX-3)+"px";
			nowPoint.style.left = (Math.floor(mouseX)-25)+"px";
			
			if (mouseX<150){
				numPoint = Math.floor((points[0].textContent / 150)*mouseX);
			} else if (mouseX > (points.length-1)*300+150) {
				numPoint = points[points.length-1].textContent;
			} else {
				let i = Math.floor((mouseX-150)/300);
				numPoint = Math.floor(((+points[i+1].textContent-Number(points[i].textContent))/300)*(mouseX-i*300-150)+Number(points[i].textContent));
			}
			//console.log(numPoint, points[0].textContent, mouseX);
			nowPointText.textContent = String(numPoint);
		});
		
		road.addEventListener("pointerout", ()=>{
			roadPolosa.style.width="100%";
			roadPolosaBorder.style.width="calc(100% - 3px)";
			nowPointText.textContent = "0";
			nowPoint.style.left = "-50px";
		});
	});
}

//добавление кнопки перемотки к окну редактирования
if (new URL(window.location.href).searchParams.get('action')==='edit') side.insertAdjacentHTML('beforeend','<a class="page-side-tool" href="#editform" title="Перейти к редактору"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-menu-control-small"></use></svg></a>');

//код за этими фигурными скобками не должен вызывать элементы страницы, так как может не сработать
}}


// полезные функции
// случайное целое число включая минимальное и не включая максимальное
function randint(min, max) {
	return min + Math.floor(Math.random()*(max-min));
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// сохраняет параметр в cookie
function setCookie(name, value) {
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  document.cookie = updatedCookie;
}

// получение json данных со страниц пространства имён Data в формате json
// данные json должны быть обёрнуты в символы $. Использование символов $ внутри json не запрещается
// принимает 2 аргумента. 2 аргумент — булевый.
//При истинном значении загружает все страницы из массива page и возвращает объект объектов-результатов после загрузки всех. Ключ — страница, переданная в pages
// если 2 аргумент — ложный, то загружает одну страницу из первого аргумента и возвращает объект из неё
function getJsonPage(pages, multi){
	//let mwc = mw.config.get(['wgScriptPath', 'wgSassParams', 'wgArticlePath']);
	//let apiPage = new mw.Uri({path:'/ru/api.php'});
	
	
	if (multi) {// несколько страниц
		let l = pages.length;
		
		let promise = new Promise(function(resolve, reject){
			let res = {};
			
			for (let i = 0; i < l; i++){
				let page = pages[i];
				// вызывается эта же функция для одной страницы
				getJsonPage(page, false).then(function(r){
					res[page] = r;
					if (Object.keys(res).length == l){
						resolve(res);
					}
				},function(err){
					reject(err);
				});
			}
		});
		
		return promise;
	} else { //одна страница
		let page = pages;
		let url = '/ru/api.php?page='+page+'&action=parse&format=json&formatversion=2';
		//console.log(apiPage);
		return new Promise(function(resolve, reject){
			fetch(url).then(function(response){
				//console.log(response.json());
				response.json().then(function(res){
					try {
						let text = res.parse.text;
						let firstPos = text.indexOf('$');
						let secondPos = text.lastIndexOf('$');
						
						let ret = JSON.parse(text.slice(firstPos+1,secondPos));
						
						resolve(ret);
					} catch (err){
						reject('Data Parsing Error: '+err);
					}
				},function(err){
					reject(err);
				});
			});
		});
	}
}

// получает прямую ссылку на файл по его названию (с префиксом "Файл:" и расширением) с помощью api
// img — строка, результат — строка
function getImgPath(img){
	let url = '/ru/api.php?action=query&titles='+img+'&iiprop=url&prop=imageinfo&format=json';
	return new Promise(function(resolve, reject){
		fetch(url).then(function(response){
			//console.log(response.json());
			response.json().then(function(data){
				try {
					let im = getVal(getObj(data.query, 'imageinfo'), 'url');
					if (im.length){
						im = im[0];
					} else {
						reject('Img Not Found');
					}
					
					resolve(im);
				} catch (err){
					reject('Data Error: '+err);
				}
			}, function(err){
				reject(err);
			});
		});
	});
}

//получение объекта по ключу с рекурсивным проваливанием в объект
function getObj (data, key) {
    // traverse through object tree
    let ret = [], r;
    for (let k in data) {
        if (data[k] instanceof Object) {
            if (k === key) {
                ret.push(data[k]);
            }
            r=getObj(data[k], key);
            if (r) ret=ret.concat(r);
        } // if obj
    } // for k in data
    return ret;
} // getObj

//получение значения по ключу с рекурсивным проваливанием в объект
function getVal (data, key) {
    // travers through object tree
    let ret = [], r;
    for (let k in data) {
        if (data[k] instanceof Object) {
            r=getVal(data[k], key);
            if (r) {
                ret=ret.concat(r);
            }
        } else {
            if (k === key) {
                ret.push(data[k]);
            }
        } // if obj
    } // for k in data
    return ret;
} // getVal

// запись и получение данных в window.localStorage с префиксом haydayWiki_ во избежание конфликтов с другими данными
function storageSet(key, val) {
	window.localStorage.setItem('haydayWiki_'+key, val);
}
function storageGet(val) {
	return window.localStorage.getItem('haydayWiki_'+key);
}

// linkJs 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Links.js'
    ]
});
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/hayday/images/7/7d/Нет_картинки.gif/revision/latest?cb=20231204095429&format=original&path-prefix=ru';
window.pPreview.defimage = 'https://static.wikia.nocookie.net/hayday/images/e/ed/Загрузка.gif/revision/latest?cb=20231127121344&format=original&path-prefix=ru';
window.pPreview.RegExp.noinclude = ['.ignor', '.portable-infobox', '.sobytie .item p'];
window.pPreview.delay = 1000;
window.pPreview.tlen = 200;
window.pPreview.apid = false;
window.pPreview.RegExp.iimages = ['Часы.png', 'Помогите.gif', 'Кричащая_курица_в_групповом_запросе.gif'];
window.pPreview.RegExp.ilinks = [/.*HayDay[_ ]вики.*/];
window.pPreview.nonstandard = {'Уровни': 'Текущий уровень.png', 'Продукты':'Хлеб.png', 'Список товаров': 'Товары.png', 'Валюты': 'Монета.png', 'Список продуктов': 'Хлеб.png', 'Список культур': 'Пшеница.png'};