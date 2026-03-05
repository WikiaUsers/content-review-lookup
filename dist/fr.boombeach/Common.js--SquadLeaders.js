$(function() {
    // 1. Injection de la liste déroulante dans le span dédié
    $('#SLNiveau').html(`
        <select id="sl-level-dropdown" class="bonusInput">
            <option value="0" selected>Aucun</option>
            <option value="1">Niveau 1</option>
            <option value="2">Niveau 2</option>
            <option value="3">Niveau 3</option>
            <option value="4">Niveau 4</option>
            <option value="5">Niveau 5</option>
        </select>
    `);

    const SL_BONUS = {
        0: { Santé: 0, Dégâts: 0 },
        1: { Santé: 5, Dégâts: 0 },
        2: { Santé: 5, Dégâts: 5 },
        3: { Santé: 10, Dégâts: 5 },
        4: { Santé: 10, Dégâts: 10 },
        5: { Santé: 15, Dégâts: 10 }
    };

    function processStats(element, bonusPercent, isReset = false) {
        let base = $(element).data('base');
        
        // Stockage de la valeur initiale (nettoyage des espaces et formats)
        if (base === undefined) {
            let rawText = $(element).text().replace(/[^\d.,]/g, '').replace(',', '.');
            base = parseFloat(rawText);
            if (isNaN(base)) return;
            $(element).data('base', base);
        }

        // Si Reset ou pas de bonus, on revient à l'affichage simple
        if (isReset || bonusPercent === 0) {
            $(element).text(base.toLocaleString());
            return;
        }

        const addedValue = Math.round(base * (bonusPercent / 100));
        const totalValue = base + addedValue;

        // Structure HTML demandée : Gris (Base) + Rose (Bonus) <br> Gras (Total)
        const htmlContent = `
            <span style="color: #666; font-size: 0.9em;">${base.toLocaleString()}</span> 
            <span style="color: #ff66cc; font-size: 0.9em;"> + ${addedValue.toLocaleString()}</span><br>
            <span style="font-weight: bold;">${totalValue.toLocaleString()}</span>
        `;
        
        $(element).html(htmlContent);
    }

    // 2. Écouteur pour le bouton APPLIQUER (via son ID)
    $('#changeBonusButton').on('click', function() {
        const level = $('#sl-level-dropdown').val();
        const bonus = SL_BONUS[level];

        $('.SLH').each(function() { processStats(this, bonus.Santé); });
        $('.SLD').each(function() { processStats(this, bonus.Dégâts); });
    });

    // 3. Écouteur pour le bouton DÉSACTIVER (via son ID)
    $('#resetBonusButton').on('click', function() {
        $('#sl-level-dropdown').val("0"); 
        $('.SLH, .SLD').each(function() { processStats(this, 0, true); });
    });
});