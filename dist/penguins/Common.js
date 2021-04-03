/* Any JavaScript here will be loaded for all users on every page load. */
ta['ca-nstab-forum'] = new Array('c','View the forum page');

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);