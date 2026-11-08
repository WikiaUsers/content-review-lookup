const userGroups = mw.config.get('wgUserGroups') || [];
const isAdmin = userGroups.includes('sysop');

if (isAdmin) {
    console.log('Pengguna ini adalah seorang administrator.');
}