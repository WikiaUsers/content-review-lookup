(() => {
    if (window.FandomSortableLoaded) return;
    window.FandomSortableLoaded = true;

    const initSortable = async (nodes) => {
        const { default: Sortable } = await import('https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/modular/sortable.esm.js');

        nodes.forEach(node => {
            if (node.dataset.processed || !node.id) return; // ID обязателен для кэширования
            node.dataset.processed = "true";

            const storageKey = `fandom_sort_${node.id}`;
            const savedOrder = localStorage.getItem(storageKey);

            // Если есть кэш — восстанавливаем порядок DOM до инициализации
            if (savedOrder) {
                const orderArray = savedOrder.split('|');
                const itemsMap = new Map();
                
                // Собираем элементы по их data-id
                Array.from(node.children).forEach(child => {
                    const id = child.dataset.id;
                    if (id) itemsMap.set(id, child);
                });

                // Перестраиваем DOM безопасно (без innerHTML)
                orderArray.forEach(id => {
                    if (itemsMap.has(id)) {
                        node.appendChild(itemsMap.get(id));
                        itemsMap.delete(id);
                    }
                });
                
                // Оставшиеся новые элементы кидаем в конец
                itemsMap.forEach(child => node.appendChild(child));
            }

            // Инициализируем библиотеку
            new Sortable(node, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                dataIdAttr: 'data-id',
                // При окончании перетаскивания сохраняем в кэш
                onEnd: function (evt) {
                    const order = this.toArray();
                    try {
                        localStorage.setItem(storageKey, order.join('|'));
                    } catch (e) { console.warn('LocalStorage limit reached'); }
                }
            });
        });
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