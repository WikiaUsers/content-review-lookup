// Message sent to users upon being blocked.
   // $1 = the reason given
   // $2 = the duration selected
   // autocheck = true will set checkbox by default
var MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true  // set to false, if automatic block messages are not desired
};