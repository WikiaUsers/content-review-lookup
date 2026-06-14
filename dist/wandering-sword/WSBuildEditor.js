// // --------------------------------------------------------------------------------------------
// //
// $(function () {

//     const emulatorURL = 'https://vik22.altervista.org/WS_Builds/index.php';

//     function loadFrame(el) {

//         if (el.classList.contains('loaded')) return;

//         const iframe = document.createElement('iframe');
//         iframe.src = emulatorURL;
//         iframe.width = "100%";
//         iframe.height = "600";
//         iframe.loading = "lazy";
//         iframe.sandbox = "allow-scripts allow-same-origin";

//         el.classList.add('loaded');
//         el.innerHTML = "";
//         el.appendChild(iframe);
//     }

//     mw.hook('wikipage.content').add(function ($content) {

//         const frames = $content.find('.EmulatorFrame:not(.observer-set)');

//         frames.each(function () {

//             const el = this;
//             el.classList.add('observer-set');

//             const observer = new IntersectionObserver((entries, obs) => {

//                 entries.forEach(entry => {

//                     if (entry.isIntersecting) {

//                         loadFrame(el);
//                         obs.disconnect();

//                     }

//                 });

//             }, {
//                 rootMargin: "200px"
//             });

//             observer.observe(el);

//         });

//     });

// });

// // --------------------------------------------------------------------------------------------
// //
// const statsData={
// yin:{STR:2,CON:3,AGI:1,HP:20,MP:10,ATK:2,DEF:4,CRIT:1},
// yang:{STR:5,CON:2,AGI:2,HP:15,MP:5,ATK:5,DEF:1,CRIT:2},
// conception:{STR:1,CON:4,AGI:1,HP:25,MP:20,ATK:1,DEF:3,CRIT:0},
// girdle:{STR:3,CON:2,AGI:4,HP:10,MP:8,ATK:3,DEF:2,CRIT:3},
// governing:{STR:4,CON:4,AGI:2,HP:18,MP:12,ATK:4,DEF:4,CRIT:1},
// penetrating:{STR:2,CON:1,AGI:5,HP:8,MP:10,ATK:3,DEF:1,CRIT:5}
// };

// document.querySelectorAll(".node").forEach(node=>{

// node.onclick=()=>{

// let meridian=node.dataset.meridian;

// openMeridian(meridian);

// };

// });

// function openMeridian(name){

// document.getElementById("wheel").style.display="none";

// let screen=document.getElementById("mapScreen");

// screen.style.display="block";

// document.querySelector(".map-title").innerText=name.toUpperCase()+" MERIDIAN";

// loadMap(name);

// updateStats(name);

// }

// function loadMap(name){

// 	let container=document.querySelector(".map-container");
	
// 	container.innerHTML="Loading " + mw.html.escape(name) + " map...";
	
// 	fetch(name+".json")
// 		.then(r=>r.json())
// 		.then(data=>{
// 			container.innerHTML="<pre>" + mw.html.escape(JSON.stringify(data,null,2)) + "</pre>";
// 		});

// }

// function updateStats(name){

// let stats=statsData[name];

// for(let s in stats){

// document.getElementById(s).innerText=stats[s];

// }

// }

// if (document.querySelector(".reset")) {
// 	document.querySelector(".reset").onclick=()=>{
// 		document.getElementById("mapScreen").style.display="none";
// 		document.getElementById("wheel").style.display="block";
// 	};
// }