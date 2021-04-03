var MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true  // set to false, if automatic block messages are not desired
};

window.LockForums = {
    lockMessageWalls: true,
    warningDays: 15,
};

window.PortableListUsers = {
    avatars: false,
    editcount: '5',
    landing: 'autoconfirmed',
    storage: false,
    time: 'timeago'
};

ajaxPages = ["Special:WikiActivity", "Special:RecentChanges", "Special:Contributions", "Special:Images"];