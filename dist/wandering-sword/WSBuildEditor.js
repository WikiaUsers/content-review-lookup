mw.hook('wikipage.content').add(function () {
    const currentPage = mw.config.get('wgPageName');
    const nativeEditIds = ['ca-edit', 'ca-ve-edit', 'ca-viewsource'];

    // 1) Consumables / Miscellaneous
    const pagesToRedirect1 = ['Consumables', 'Miscellaneous'];
    if (pagesToRedirect1.includes(currentPage)) {
        const templateEditUrl = '/wiki/Consumables/Miscellaneous?action=edit';
        nativeEditIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.href = templateEditUrl;
        });
    }

    // 2) Cookable_Dishes / HP_Cooking
    const pagesToRedirect2 = ['Cookable_Dishes', 'HP_Cooking'];
    if (pagesToRedirect2.includes(currentPage)) {
        const templateEditUrl = '/wiki/Cookable_Dishes/HP_Cooking?action=edit';
        nativeEditIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.href = templateEditUrl;
        });
    }

    // 3) Forging_Weapons / Fist_Weapon_Blueprints
    const pagesToRedirect3 = ['Forging_Weapons', 'Fist_Weapon_Blueprints'];
    if (pagesToRedirect3.includes(currentPage)) {
        const templateEditUrl = '/wiki/Forging_Weapons/Fist_Weapons?action=edit';
        nativeEditIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.href = templateEditUrl;
        });
    }

    // 4) Tailoring_Equipments / Headgear
    const pagesToRedirect4 = ['Tailoring_Equipments', 'Headgear'];
    if (pagesToRedirect4.includes(currentPage)) {
        const templateEditUrl = '/wiki/Tailoring_Equipments/Headgear?action=edit';
        nativeEditIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.href = templateEditUrl;
        });
    }

    // 5) Materials / Cloths
    const pagesToRedirect5 = ['Materials', 'Cloths'];
    if (pagesToRedirect5.includes(currentPage)) {
        const templateEditUrl = '/wiki/Materials/Cloths?action=edit';
        nativeEditIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.href = templateEditUrl;
        });
    }
});

if (btn) {
    btn.href = templateEditUrl;
    btn.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = templateEditUrl;
    });
}