/* Fandom Loader: SortableJS (ES2024) */
(() => {
    'use strict';
    if (window.FandomSortableLoaded) return;
    window.FandomSortableLoaded = true;

    let SortableClass = null;
    let loadPromise = null;

    const ensureSortable = () => {
        if (SortableClass) return Promise.resolve(SortableClass);
        loadPromise ??= (async () => {
            const { default: Sortable } = await import('https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/modular/sortable.esm.js');
            SortableClass = Sortable;
            return Sortable;
        })();
        return loadPromise;
    };

    const initSortable = async (nodes) => {
        let Sortable;
        try {
            Sortable = await ensureSortable();
        } catch (error) {
            console.error('[SortableJS Error]', error);
            return;
        }

        for (const node of nodes) {
            if (node.dataset.processed || !node.id) continue;
            node.dataset.processed = 'true';

            const storageKey = `fandom_sort_${node.id}`;
            let savedOrder = null;
            try {
                savedOrder = localStorage.getItem(storageKey);
            } catch {}

            if (savedOrder) {
                const orderArray = savedOrder.split('|');
                const itemsMap = new Map();

                for (const child of Array.from(node.children)) {
                    const id = child.dataset.id;
                    if (id) itemsMap.set(id, child);
                }

                for (const id of orderArray) {
                    if (itemsMap.has(id)) {
                        node.appendChild(itemsMap.get(id));
                        itemsMap.delete(id);
                    }
                }

                for (const child of itemsMap.values()) {
                    node.appendChild(child);
                }
            }

            new Sortable(node, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                dataIdAttr: 'data-id',
                onEnd() {
                    const order = this.toArray();
                    try {
                        localStorage.setItem(storageKey, order.join('|'));
                    } catch {
                        console.warn('LocalStorage limit reached');
                    }
                }
            });
        }
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-sortable:not([data-processed])');
            if (nodes.length > 0) initSortable(nodes);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const initialNodes = document.querySelectorAll('.wiki-sortable:not([data-processed])');
    if (initialNodes.length > 0) initSortable(initialNodes);
})();