var MessageBlock = {
  title : 'Blocked',
  message : '{{Blocked|reason=$1|length=$2}}',
  autocheck : true
};

jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})