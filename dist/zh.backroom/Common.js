/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/* 警告：任何人请不要编辑该JavaScript页面，这有可能会导致您的账号甚至整个Wiki崩溃 */
a.tag {
    color: inherit;
}
window.UserTagsJS = {
	modules: {},
	tags: {
		member: { u:'成员' },
		inactive:{ u:'休假中' }
	}
};
.tag.usergroup-bureaucrat {
	background-color: gold !important;
	color: black !important;
}
.tag.usergroup-featured {
	background-color: blue !important;
	color: white !important;
}
UserTagsJS.modules.inactive = {
	days: 20,
	namespaces: [0],
	zeroIsInactive: true // 條目編輯次數為0 = 休假中
};
/** 用户标签临时更改区域（每周末操作）**/
UserTagsJS.modules.custom = {
	'LBR team': ['member'], 
	'LBR team X': ['member'],
	'Terminatorrrrrrrs': ['member'],
	'Terminatorrrrrrr': ['member']
};
/** 用户标签样式 **/
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'member', order:1 },
		b: { u: 'inactive', order:2 },
	},
	oasisPlaceBefore: '> h1'
};
UserTagsJS.modules.custom = {
	'Lunarity': ['a', 'b', 'inactive']
};
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: '> h2' // Place tags before the H2
};