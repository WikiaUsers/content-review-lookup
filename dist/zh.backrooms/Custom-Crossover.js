// TEST
(function () {
    const table = document.getElementById('dataTable');
    const tbody = table.querySelector('tbody');
    const addRowBtn = document.getElementById('addRow');
    const screen = document.getElementById('screen');

    // 添加一行
    addRowBtn.addEventListener('click', () => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td><span class="del-btn">×</span></td>`;
        tbody.appendChild(tr);
    });

    // 删除一行（事件委托）
    tbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('del-btn')) {
            e.target.closest('tr').remove();
        }
    });

    // 读取表格内容，生成弹幕文本列表
    function getMessages() {
        const rows = tbody.querySelectorAll('tr');
        const msgs = [];
        rows.forEach(tr => {
            const cells = tr.querySelectorAll('td');
            const content = (cells[0] && cells[0].innerText.trim()) || '';
            const name = (cells[1] && cells[1].innerText.trim()) || '';
            const prize = (cells[2] && cells[2].innerText.trim()) || '';
            if (!content) return;
            msgs.push({ name, content, prize });
        });
        return msgs;
    }

    function buildBubble(msg) {
        const el = document.createElement('div');
        el.className = 'cloud-bubble';

        if (msg.name) {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'name';
            nameSpan.textContent = msg.name + '：';
            el.appendChild(nameSpan);
        }

        const contentSpan = document.createElement('span');
        contentSpan.textContent = msg.content;
        el.appendChild(contentSpan);

        if (msg.prize) {
            const prizeSpan = document.createElement('span');
            prizeSpan.className = 'prize';
            prizeSpan.textContent = '　🎉' + msg.prize;
            el.appendChild(prizeSpan);
        }
        return el;
    }

    // 弹道（车道）管理：按屏幕高度动态计算可容纳的行数
    const LANE_HEIGHT = 46;
    function getLaneCount() {
        return Math.max(3, Math.floor(screen.clientHeight / LANE_HEIGHT));
    }

    let laneIndex = 0;
    let msgIndex = 0;
    let running = true;

    function launchOne() {
        if (!running) return;

        const messages = getMessages();
        const laneCount = getLaneCount();

        if (messages.length === 0) {
            setTimeout(launchOne, 1200);
            return;
        }

        // 如果表格行数变化导致 msgIndex 越界，重置
        if (msgIndex >= messages.length) {
            msgIndex = 0;
            laneIndex = 0;
        }

        const msg = messages[msgIndex];
        const bubble = buildBubble(msg);
        bubble.style.top = (10 + (laneIndex % laneCount) * LANE_HEIGHT) + 'px';
        bubble.style.left = screen.clientWidth + 'px';
        screen.appendChild(bubble);

        const bubbleWidth = bubble.offsetWidth;
        const distance = screen.clientWidth + bubbleWidth + 40;
        const duration = Math.max(6, distance / 90); // 速度大致恒定

        requestAnimationFrame(() => {
            bubble.style.transition = `left ${duration}s linear`;
            bubble.style.left = (-bubbleWidth - 40) + 'px';
        });

        bubble.addEventListener('transitionend', () => bubble.remove());

        laneIndex++;
        msgIndex++;

        let delay = 850; // 每条弹幕发出的间隔

        if (msgIndex >= messages.length) {
            // 一轮结束：从上到下重新排列，暂停 1.5 秒后再循环
            msgIndex = 0;
            laneIndex = 0;
            delay = 1500;
        }

        setTimeout(launchOne, delay);
    }

    launchOne();
})();