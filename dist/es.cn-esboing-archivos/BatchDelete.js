(function () {
    if (!mw.config.get('wgCanonicalSpecialPageName') === 'Allpages') return;

    function addCheckboxes() {
        document.querySelectorAll('.mw-allpages-body li').forEach(function (li) {
            if (li.querySelector('input')) return;

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.style.marginRight = '5px';

            li.prepend(checkbox);
        });
    }

    function addButton() {
        var button = document.createElement('button');
        button.textContent = 'Eliminar seleccionadas';
        button.style.margin = '10px';
        button.style.padding = '5px';

        button.onclick = async function () {
            var checked = document.querySelectorAll('.mw-allpages-body input:checked');

            if (checked.length === 0) {
                alert('No has seleccionado nada');
                return;
            }

            if (!confirm('¿Seguro que quieres borrar ' + checked.length + ' páginas?')) return;

            for (let cb of checked) {
                let title = cb.parentElement.innerText;

                try {
                    await new mw.Api().postWithToken('csrf', {
                        action: 'delete',
                        title: title,
                        reason: 'Borrado en lote'
                    });
                    cb.parentElement.style.textDecoration = 'line-through';
                } catch (e) {
                    console.error('Error borrando:', title);
                }
            }

            alert('Proceso terminado');
        };

        document.querySelector('.mw-allpages-nav').appendChild(button);
    }

    $(document).ready(function () {
        addCheckboxes();
        addButton();
    });
})();