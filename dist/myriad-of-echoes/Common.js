mw.hook('wikipage.content').add(function($content) {
    $content.find('.drag-item').attr('draggable', 'true');
    
    $content.find('.drag-item:not(.bound-drag)').each(function() {
        let item = this;
        item.classList.add('bound-drag');

        item.addEventListener('dragstart', function(e) {
            window.robloxDraggedItem = this; 
            window.robloxSourceSlot = this.parentElement;
            setTimeout(() => this.style.opacity = '0.5', 0);
        });

        item.addEventListener('dragend', function() {
            this.style.opacity = '1';
            if (window.robloxDraggedItem === this) {
                window.robloxDraggedItem = null;
                window.robloxSourceSlot = null;
            }
        });
    });

    $content.find('.palette-grid:not(.bound-drop-grid)').each(function() {
        let grid = this;
        grid.classList.add('bound-drop-grid');

        grid.addEventListener('dragover', function(e) {
            e.preventDefault(); 
        });

        grid.addEventListener('drop', function(e) {
            e.preventDefault();
            if (window.robloxDraggedItem && window.robloxSourceSlot && window.robloxSourceSlot.classList.contains('roblox-slot')) {
                window.robloxDraggedItem.remove();
                if (window.robloxSourceSlot.children.length === 0) {
                    window.robloxSourceSlot.classList.add('empty-slot');
                }
            }
        });
    });

    $content.find('.roblox-slot:not(.bound-drop)').each(function() {
        let slot = this;
        slot.classList.add('bound-drop');

        slot.addEventListener('dragover', function(e) {
            if (window.robloxDraggedItem) {
                let isJacket = window.robloxDraggedItem.id === 'item-jacket' || window.robloxDraggedItem.classList.contains('jacket') || window.robloxDraggedItem.getAttribute('data-type') === 'jacket';
                if (this.id === 'slot-body' && !isJacket) return;
            }
            e.preventDefault(); 
        });

        slot.addEventListener('dragenter', function(e) {
            if (window.robloxDraggedItem) {
                let isJacket = window.robloxDraggedItem.id === 'item-jacket' || window.robloxDraggedItem.classList.contains('jacket') || window.robloxDraggedItem.getAttribute('data-type') === 'jacket';
                if (this.id === 'slot-body' && !isJacket) return;
            }
            e.preventDefault();
            this.style.borderColor = '#ffffff';
        });

        slot.addEventListener('dragleave', function() {
            this.style.borderColor = '#777777';
        });

        slot.addEventListener('drop', function(e) {
            if (!window.robloxDraggedItem) return;

            let isJacket = window.robloxDraggedItem.id === 'item-jacket' || window.robloxDraggedItem.classList.contains('jacket') || window.robloxDraggedItem.getAttribute('data-type') === 'jacket';
            if (this.id === 'slot-body' && !isJacket) return;

            e.preventDefault();
            this.style.borderColor = '#777777';
            this.classList.remove('empty-slot');

            if (window.robloxSourceSlot && window.robloxSourceSlot.classList.contains('palette-grid')) {
                const clone = window.robloxDraggedItem.cloneNode(true);
                clone.style.opacity = '1';
                clone.setAttribute('draggable', 'true');
                
                clone.addEventListener('dragstart', function(e) {
                    window.robloxDraggedItem = this;
                    window.robloxSourceSlot = this.parentElement;
                    setTimeout(() => this.style.opacity = '0.5', 0);
                });
                
                clone.addEventListener('dragend', function() {
                    this.style.opacity = '1';
                    if (window.robloxDraggedItem === this) {
                        window.robloxDraggedItem = null;
                        window.robloxSourceSlot = null;
                    }
                });
                
                this.innerHTML = ''; 
                this.appendChild(clone);
            } 
            else if (window.robloxSourceSlot && window.robloxSourceSlot.classList.contains('roblox-slot')) {
                if (this.children.length > 0) {
                    const existingItem = this.children[0];
                    window.robloxSourceSlot.appendChild(existingItem);
                } else {
                    window.robloxSourceSlot.classList.add('empty-slot');
                }
                this.appendChild(window.robloxDraggedItem);
                window.robloxDraggedItem.style.opacity = '1';
            }
        });
    });
});