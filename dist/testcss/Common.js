/* Any JavaScript here will be loaded for all users on every page load. */

let Regina = 1234567890;
console.log(Regina);

/* User Tags */

window.UserTagsJS = {
    tags: {
        founder: { u: 'Founder' }
    },
    modules: {
        inactive: {
            days: 30,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'founder',
            'rollback',
            'bot'
        ],
        custom: {
            'KiwiReg': ['founder']
        }
    }
};

/*
Credits to MLB Wiki ^^
Implemented by Lara :>
*/