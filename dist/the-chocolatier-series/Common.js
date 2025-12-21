/* Chocolatier Family Tree Engine */
(function() {
    function drawTreeLines() {
        const trees = document.querySelectorAll('.chocolatier-tree');
        trees.forEach(tree => {
            let svg = tree.querySelector('.tree-svg-layer');
            if (svg) svg.remove();

            svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add('tree-svg-layer');
            svg.setAttribute('style', `position:absolute; top:0; left:0; width:${tree.scrollWidth}px; height:${tree.scrollHeight}px; pointer-events:none; z-index:1;`);
            tree.style.position = 'relative';
            tree.prepend(svg);

            const treeRect = tree.getBoundingClientRect();
            const nodes = Array.from(tree.querySelectorAll('.tree-node-wrapper'));

            // 1. Draw Marriage Lines First
            nodes.forEach(node => {
                const id = node.getAttribute('data-id');
                const spouseId = node.getAttribute('data-spouse');
                const content = node.querySelector('.tree-node-content');
                if (spouseId && id < spouseId && content) {
                    const spouseNode = tree.querySelector(`[data-id="${spouseId}"] .tree-node-content`);
                    if (spouseNode) {
                        const s1 = content.getBoundingClientRect();
                        const s2 = spouseNode.getBoundingClientRect();
                        
                        const x1 = (s1.right - treeRect.left + tree.scrollLeft);
                        const y1 = (s1.top + s1.height / 2) - treeRect.top + tree.scrollTop;
                        const x2 = (s2.left - treeRect.left + tree.scrollLeft);
                        const y2 = (s2.top + s2.height / 2) - treeRect.top + tree.scrollTop;

                        createPath(svg, `M ${x1} ${y1} L ${x2} ${y2}`, "#d9b89c", "3", "4,4");
                    }
                }
            });

            // 2. Draw Descent Lines (From Marriage Midpoints)
            nodes.forEach(node => {
                const parentsStr = node.getAttribute('data-parents');
                const content = node.querySelector('.tree-node-content');
                if (!parentsStr || !content) return;

                const parentIds = parentsStr.split(',').map(id => id.trim());
                const childRect = content.getBoundingClientRect();
                const childX = (childRect.left + childRect.width / 2) - treeRect.left + tree.scrollLeft;
                const childY = (childRect.top) - treeRect.top + tree.scrollTop;

                let startX, startY;

                if (parentIds.length === 2) {
                    const p1 = tree.querySelector(`[data-id="${parentIds[0]}"] .tree-node-content`);
                    const p2 = tree.querySelector(`[data-id="${parentIds[1]}"] .tree-node-content`);
                    if (p1 && p2) {
                        const r1 = p1.getBoundingClientRect();
                        const r2 = p2.getBoundingClientRect();
                        // Start from the dead center of the marriage gap
                        startX = ((r1.right + r2.left) / 2) - treeRect.left + tree.scrollLeft;
                        startY = (r1.top + r1.height / 2) - treeRect.top + tree.scrollTop;
                    }
                } else {
                    const p1 = tree.querySelector(`[data-id="${parentIds[0]}"] .tree-node-content`);
                    if (p1) {
                        const r1 = p1.getBoundingClientRect();
                        startX = (r1.left + r1.width / 2) - treeRect.left + tree.scrollLeft;
                        startY = r1.bottom - treeRect.top + tree.scrollTop;
                    }
                }

                if (startX && startY) {
                    const midY = startY + (childY - startY) * 0.5;
                    const d = `M ${startX} ${startY} L ${startX} ${midY} L ${childX} ${midY} L ${childX} ${childY}`;
                    createPath(svg, d, "#a76949", "2");
                }
            });
        });
    }

    function createPath(svg, d, color, width, dash = "") {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", width);
        if (dash) path.setAttribute("stroke-dasharray", dash);
        path.setAttribute("fill", "none");
        svg.appendChild(path);
    }

    mw.hook('wikipage.content').add(() => setTimeout(drawTreeLines, 800));
    window.addEventListener('resize', drawTreeLines);
})();