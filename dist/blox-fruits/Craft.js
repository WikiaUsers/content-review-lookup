mw.hook('wikipage.content').add(($content) => {
    const formatShort = (number) => {
        if (number >= 1e6) return +(number / 1e6).toFixed(1) + 'M';
        if (number >= 1e3) return +(number / 1e3).toFixed(1) + 'K';
        return String(number);
    };

    const setDisabled = ($button, disabled) => {
        $button
            .prop('disabled', disabled)
            .toggleClass('bfw-button-blue', !disabled)
            .toggleClass('bfw-button-grey', disabled);
    };

    $content
        .find('.crafting-table:not(.crafting-ready)')
        .addClass('crafting-ready')
        .each((_, table) => {
            const $table = $(table);
            const resultAmount = +$table.find('.crafting-result').data('amount');
            const limit = +table.dataset.limit || 99;

            const materials = $table.find('.crafting-material').get().map((element) => {
                const stack = +element.dataset.stack;

                return {
                    amount: +element.dataset.amount,
                    stack: stack || Infinity,
                    prefix: stack ? formatShort(stack) + '/' : '',
                    $count: $(element).find('.crafting-count')
                };
            });

            const updateCounts = (quantity) => {
                for (const { amount, stack, prefix, $count } of materials) {
                    const total = amount * quantity;

                    $count
                        .text(prefix + formatShort(total))
                        .toggleClass('crafting-over', total > stack)
                        .toggleClass('crafting-short', total > stack + 6);
                }
            };

            updateCounts(1);

            if (2 * resultAmount > limit) {
                return;
            }

            const $result = $table.find('.crafting-result .card-text-sup');
            const $minus = $('<button type="button" aria-label="Decrease quantity">-</button>');
            const $plus = $('<button type="button" aria-label="Increase quantity">+</button>');
            let quantity = 1;

            const setQuantity = (value) => {
                quantity = value;
                updateCounts(quantity);
                $result.text(`${resultAmount * quantity}x`);
                setDisabled($minus, quantity < 2);
                setDisabled($plus, (quantity + 1) * resultAmount > limit);
            };

            $minus.on('click', () => setQuantity(quantity - 1));
            $plus.on('click', () => setQuantity(quantity + 1));

            $table.find('.crafting-controls').append($minus, $plus);
            setDisabled($minus, true);
            setDisabled($plus, false);
        });
});