mw.hook('wikipage.content').add(function() {
if (mw.config.get('wgPageName') !== 'EVENTS') return; // adjust to your exact page name

var events = [
{
name: 'Christmas',
month: 'December',
duration: 'Approx. 3 weeks',
first: '2023',
color: '#7ecfff',
glow: 'rgba(126, 207, 255, 0.35)',
desc: 'Your Christmas description here.'
},
{
name: 'April Fools',
month: 'April',
duration: 'Approx. 1\u20133 days',
first: '2024',
color: '#ff69b4',
glow: 'rgba(255, 105, 180, 0.35)',
desc: 'Your April Fools description here.'
},
{
name: 'Easter',
month: 'April',
duration: 'Approx. 1\u20132 weeks',
first: '2024',
color: '#c77dff',
glow: 'rgba(199, 125, 255, 0.35)',
desc: 'Your Easter description here.'
},
{
name: 'Halloween',
month: 'October',
duration: 'Approx. 2\u20133 weeks',
first: '2024',
color: '#ff8c00',
glow: 'rgba(255, 140, 0, 0.35)',
desc: 'Your Halloween description here.'
},
{
name: 'Reaper Trials',
month: 'October',
duration: 'Approx. 2\u20133 weeks (alongside Halloween)',
first: '2024',
color: '#4a9eff',
glow: 'rgba(74, 158, 255, 0.35)',
desc: 'Your Reaper Trials description here. The WRATH variant of the Halloween event, featuring Sixbones and Reaper Sans.'
}
];

var current = 0;

function applyEvent(idx) {
var e = events[idx];
var display = document.getElementById('so2-event-display');
var title = document.getElementById('so2-event-title');
var month = document.getElementById('so2-event-month');
var duration = document.getElementById('so2-event-duration');
var first = document.getElementById('so2-event-first');
var desc = document.getElementById('so2-event-desc');
var counter = document.getElementById('so2-event-counter');
var arrows = document.querySelectorAll('.so2-event-arrow');

if (!display) return;

display.style.borderColor = e.color;
display.style.boxShadow = '0 0 14px ' + e.glow + ', inset 0 0 6px ' + e.glow;

title.textContent = e.name;
title.style.color = e.color;
title.style.textShadow = '0 0 10px ' + e.color;

month.textContent = e.month;
duration.textContent = e.duration;
first.textContent = e.first;
desc.textContent = e.desc;
counter.textContent = (idx + 1) + ' / ' + events.length;

arrows.forEach(function(el) {
el.style.color = e.color;
el.style.borderColor = e.color;
el.style.boxShadow = '0 0 8px ' + e.glow;
});
}

var prevBtn = document.getElementById('so2-event-prev');
var nextBtn = document.getElementById('so2-event-next');

if (prevBtn) prevBtn.addEventListener('click', function() {
current = (current - 1 + events.length) % events.length;
applyEvent(current);
});

if (nextBtn) nextBtn.addEventListener('click', function() {
current = (current + 1) % events.length;
applyEvent(current);
});

applyEvent(0);
});