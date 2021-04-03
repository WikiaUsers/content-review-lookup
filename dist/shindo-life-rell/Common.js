/* Any JavaScript here will be loaded for all users on every page load. */
var MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true  // set to false, if automatic block messages are not desired
};
TBL_GROUP = "roblox-en";