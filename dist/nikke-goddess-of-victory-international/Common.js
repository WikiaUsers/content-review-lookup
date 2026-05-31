/* Any JavaScript here will be loaded for all users on every page load. */



(function () {
    'use strict';

    function initCostumeGalleries() {
     
        document.querySelectorAll('.cg-root').forEach(function (root) {
            
            root.querySelectorAll('.cg-tab').forEach(function (tab) {
                tab.addEventListener('click', function () {
                    cgSwitchTab(root, tab);
                });
               
                tab.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        cgSwitchTab(root, tab);
                    }
                });
            });
        });
    }

    function cgSwitchTab(root, activeTab) {
        var targetId = activeTab.getAttribute('data-cg-target');

        root.querySelectorAll('.cg-tab').forEach(function (t) {
            t.removeAttribute('data-cg-active');
        });
        root.querySelectorAll('.cg-panel').forEach(function (p) {
            p.classList.remove('cg-panel--active');
        });

        activeTab.setAttribute('data-cg-active', 'true');
        var panel = root.querySelector('#' + targetId);
        if (panel) { panel.classList.add('cg-panel--active'); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCostumeGalleries);
    } else {
        initCostumeGalleries();
    }
}());