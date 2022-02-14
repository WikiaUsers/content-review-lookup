(function () {
    var tt = '<span style="cursor:help; border-bottom:1px dotted;" title="Power Cost can\'t be 0">NaN</span>';

    function round(num) {
        return +(Math.round(num + 'e+2') + 'e-2');
    }

    function getRatio(ratio, dmg, hp, cost) {
        switch (ratio) {
            case 'ratio1':
                return round(dmg / cost);
            case 'ratio2':
                return round(hp / cost);
            case 'ratio3':
                return round(((dmg / cost) * (hp / cost) * cost) / 1000);
            case 'ratio4':
                return round((dmg / cost) * (hp / cost));
            default:
                return 0;
        }
    }

    function onChange(container) {
        var dmg = parseFloat(container.querySelector('.dmg > input').value);
        var hp = parseFloat(container.querySelector('.hp > input').value);
        var cost = parseFloat(container.querySelector('.cost > input').value);
        container.querySelectorAll('.ratio1,.ratio2,.ratio3,.ratio4').forEach(function (el) {
            var ratio = getRatio(el.className, dmg, hp, cost);
            el.innerText = ratio === 'NaN' ? tt : ratio;
        });
    }

    function init(container, _index) {
        container.querySelectorAll('.cost,.dmg,.hp').forEach(function (el) {
            var inp = document.createElement('input');
            inp.type = 'number';
            inp.min = 0;
            inp.max = 99999;
            inp.value = 0;
            inp.addEventListener('input', function (e) {
                var v = parseFloat(this.value) || 0;
                if (v < 0 || v > 99999) {
                    this.value = this.getAttribute('data-old') || 0;
                } else {
                    this.setAttribute('data-old', v);
                }
                onChange(container);
            });
            el.appendChild(inp);
        });
        container.parentElement.parentElement.querySelector('thead').appendChild(container);
    }

    mw.hook('wikipage.content').add(function () {
        document.querySelectorAll('tr.stats-calculator').forEach(init);
    });
})();