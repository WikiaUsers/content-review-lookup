if (mw.config.get("wgCanonicalNamespace") === "Project" && mw.config.get("wgTitle") === "Калькулятор") {
    mw.loader.using(["oojs-ui"], function() {
        const calc_inputLvl = new OO.ui.TextInputWidget({
            classes: ["calc__input-text", "calc__input-text--lvl"],
            placeholder: "10",
            validate: "integer"
        });
        const calc_inputWpn = new OO.ui.TextInputWidget({
            classes: ["calc__input-text", "calc__input-text--wpn"],
            placeholder: "10",
            validate: "integer"
        });
        const calc_inputUnq = new OO.ui.CheckboxInputWidget({
            classes: ["calc__input-checkbox"]
        });
        const calc_inputBtn = new OO.ui.ButtonInputWidget({
            classes: ["calc__input-button"],
            label: "Рассчитать",
            disabled: true
        });

        const calc_fieldset = new OO.ui.FieldsetLayout({
            classes: ["calc__fieldset"],
            label: "Калькулятор призыва"
        });
       
        calc_fieldset.addItems([
            new OO.ui.FieldLayout(calc_inputLvl, {
                classes: ["calc__field"],
                label: "Уровень"
            }),
            new OO.ui.FieldLayout(calc_inputWpn, {
                classes: ["calc__field"],
                label: "Оружие"
            }),
            new OO.ui.FieldLayout(calc_inputUnq, {
                classes: ["calc__field"],
                label: "Уникальное"
            }),
            new OO.ui.FieldLayout(calc_inputBtn, {
                classes: ["calc__field"]
            })
        ]);

        const calc_panel = new OO.ui.PanelLayout({
            classes: ["calc__panel"],
            expanded: false,
            framed: true,
            padded: true,
            content: [calc_fieldset]
        });

        function validateInputs() {
            var valididy = {
                lvl: false,
                wpn: false
            }

            calc_inputLvl.getValidity()
            .done(function () { valididy.lvl = true; })
            .fail(function () { valididy.lvl = false; })

            calc_inputWpn.getValidity()
            .done(function () { valididy.wpn = true; })
            .fail(function () { valididy.wpn = false; })
           
            if (valididy.lvl === true && valididy.wpn === true) return calc_inputBtn.setDisabled(false);
            else return calc_inputBtn.setDisabled(true);
        }

        setInterval(validateInputs, 100);

        calc_inputBtn.$element.click(function (e) {
            if (calc_inputBtn.isDisabled()) return;

            e.preventDefault();

            var value_lvl = calc_inputLvl.getValue(),
                value_wpn = calc_inputWpn.getValue(),
                value_unq = calc_inputUnq.isSelected();

            calculate(value_lvl, value_wpn, value_unq);
        });

        const $calc = $(".calc");
        $calc.append(calc_panel.$element);
    });

    /**
     * @param {number} soulValue
     * @param {number} weaponValue
     * @param {boolean} isUnique
     * @returns {Object<string, string>}
    */
    function calculate(soulValue, weaponValue, isUnique) {
        soulValue = parseInt(soulValue);
        weaponValue = parseInt(weaponValue);

        /** @type {Object<string, Object<string, number>>} */
        const results = {
            /** @type {Object<string, number>} */
            canSummonMinCoop: {},
            /** @type {Object<string, number>} */
            canSummonMaxCoop: {},
            /** @type {Object<string, number>} */
            canBeSummonedMinCoop: {},
            /** @type {Object<string, number>} */
            canBeSummonedMaxCoop: {},
            /** @type {Object<string, number>} */
            canSummonMinPVP: {},
            /** @type {Object<string, number>} */
            canSummonMaxPVP: {},
            /** @type {Object<string, number>} */
            canBeSummonedMinPVP: {},
            /** @type {Object<string, number>} */
            canBeSummonedMaxPVP: {}
        };

        for (const property in results) {
            Object.assign(results[property], {
                soul: -1,
                weaponR: -1,
                weaponU: -1
            });
        }

        /** @type {number} */
        const MIN_LEVEL = 1;
        /** @type {number} */
        const MAX_LEVEL = Number.MAX_VALUE;

        if (!isNaN(soulValue) && soulValue >= MIN_LEVEL && soulValue <= MAX_LEVEL) {
            /** @type {number} */
            var canSummonMinCoop = Math.ceil((soulValue - 10) - (soulValue * 0.1)),
                /** @type {number} */
                canSummonMaxCoop = Math.trunc((soulValue + 10) + (soulValue * 0.1)),
                /** @type {number} */
                canBeSummonedMinCoop = Math.ceil((soulValue - 10) / (1.1)),
                /** @type {number} */
                canBeSummonedMaxCoop = Math.trunc((soulValue + 10) / (0.9));

            /** @type {number} */
            var canSummonMinPVP = Math.ceil(0.9 * soulValue),
                /** @type {number} */
                canSummonMaxPVP = Math.trunc((soulValue + 20) + (soulValue * 0.1)),
                /** @type {number} */
                canBeSummonedMinPVP = Math.ceil((soulValue - 20) * 10 / 11),
                /** @type {number} */
                canBeSummonedMaxPVP = Math.trunc(10 / 9 * soulValue);

            results.canSummonMinCoop.soul = (canSummonMinCoop < MIN_LEVEL) ? MIN_LEVEL : canSummonMinCoop;
            results.canSummonMaxCoop.soul = (canSummonMaxCoop > MAX_LEVEL) ? MAX_LEVEL : canSummonMaxCoop;
            results.canBeSummonedMinCoop.soul = (canBeSummonedMinCoop < MIN_LEVEL) ? MIN_LEVEL : canBeSummonedMinCoop;
            results.canBeSummonedMaxCoop.soul = (canBeSummonedMaxCoop > MAX_LEVEL) ? MAX_LEVEL : canBeSummonedMaxCoop;

            results.canSummonMinPVP.soul = (canSummonMinPVP < MIN_LEVEL) ? MIN_LEVEL : canSummonMinPVP;
            results.canSummonMaxPVP.soul = (canSummonMaxPVP > MAX_LEVEL) ? MAX_LEVEL : canSummonMaxPVP;
            results.canBeSummonedMinPVP.soul = (canBeSummonedMinPVP < MIN_LEVEL) ? MIN_LEVEL : canBeSummonedMinPVP;
            results.canBeSummonedMaxPVP.soul = (canBeSummonedMaxPVP > MAX_LEVEL) ? MAX_LEVEL : canBeSummonedMaxPVP;
        }
       
        /** @type {number} */
        const MIN_REG_LEVEL = 0;
        /** @type {number} */
        const MAX_REG_LEVEL = 25;
        /** @type {number} */
        const MIN_UNI_LEVEL = 0;
        /** @type {number} */
        const MAX_UNI_LEVEL = 10;
        /** @type {number} */
        const MIN_WEAPON_LEVEL = (isUnique) ? MIN_UNI_LEVEL : MIN_REG_LEVEL;
        /** @type {number} */
        const MAX_WEAPON_LEVEL = (isUnique) ? MAX_UNI_LEVEL : MAX_REG_LEVEL;

        /** @type {Object<number, number[]>} */
        const RANGES_REG = {
            0: [0, 3, 0, 1],
            1: [0, 4, 0, 1],
            2: [0, 5, 0, 2],
            3: [0, 6, 0, 2],
            4: [1, 7, 1, 3],
            5: [2, 8, 1, 3],
            6: [3, 10, 2, 4],
            7: [4, 11, 2, 4],
            8: [5, 12, 2, 5],
            9: [6, 13, 3, 5],
            10: [6, 14, 3, 5],
            11: [7, 15, 3, 6],
            12: [8, 17, 4, 7],
            13: [9, 18, 4, 7],
            14: [10, 19, 4, 7],
            15: [11, 20, 5, 8],
            16: [12, 21, 5, 8],
            17: [12, 22, 5, 9],
            18: [13, 24, 6, 9],
            19: [14, 25, 6, 10],
            20: [15, 25, 6, 10],
            21: [16, 25, 7, 10],
            22: [17, 25, 7, 10],
            23: [18, 25, 8, 10],
            24: [18, 25, 8, 10],
            25: [19, 25, 8, 10],
        };

        /** @type {Object<number, number[]>} */
        const RANGES_UNI = {
            0: [0, 3, 0, 1],
            1: [0, 5, 0, 2],
            2: [2, 8, 1, 3],
            3: [4, 11, 2, 4],
            4: [6, 14, 3, 5],
            5: [8, 17, 4, 7],
            6: [11, 20, 5, 8],
            7: [12, 22, 5, 9],
            8: [15, 25, 6, 10],
            9: [17, 25, 7, 10],
            10: [19, 25, 8, 10],
        };

        if (!isNaN(weaponValue) && (weaponValue >= MIN_WEAPON_LEVEL) && (weaponValue <= MAX_WEAPON_LEVEL)) {
            results.canSummonMinCoop.weaponR = isUnique ? RANGES_UNI[weaponValue][0] : RANGES_REG[weaponValue][0];
            results.canSummonMaxCoop.weaponR = isUnique ? RANGES_UNI[weaponValue][1] : RANGES_REG[weaponValue][1];
            results.canBeSummonedMinCoop.weaponR = isUnique ? RANGES_UNI[weaponValue][0] : RANGES_REG[weaponValue][0];
            results.canBeSummonedMaxCoop.weaponR = isUnique ? RANGES_UNI[weaponValue][1] : RANGES_REG[weaponValue][1];

            results.canSummonMinPVP.weaponR = isUnique ? RANGES_UNI[weaponValue][0] : RANGES_REG[weaponValue][0];
            results.canSummonMaxPVP.weaponR = isUnique ? RANGES_UNI[weaponValue][1] : RANGES_REG[weaponValue][1];
            results.canBeSummonedMinPVP.weaponR = isUnique ? RANGES_UNI[weaponValue][0] : RANGES_REG[weaponValue][0];
            results.canBeSummonedMaxPVP.weaponR = isUnique ? RANGES_UNI[weaponValue][1] : RANGES_REG[weaponValue][1];

            results.canSummonMinCoop.weaponU = isUnique ? RANGES_UNI[weaponValue][2] : RANGES_REG[weaponValue][2];
            results.canSummonMaxCoop.weaponU = isUnique ? RANGES_UNI[weaponValue][3] : RANGES_REG[weaponValue][3];
            results.canBeSummonedMinCoop.weaponU = isUnique ? RANGES_UNI[weaponValue][2] : RANGES_REG[weaponValue][2];
            results.canBeSummonedMaxCoop.weaponU = isUnique ? RANGES_UNI[weaponValue][3] : RANGES_REG[weaponValue][3];

            results.canSummonMinPVP.weaponU = isUnique ? RANGES_UNI[weaponValue][2] : RANGES_REG[weaponValue][2];
            results.canSummonMaxPVP.weaponU = isUnique ? RANGES_UNI[weaponValue][3] : RANGES_REG[weaponValue][3];
            results.canBeSummonedMinPVP.weaponU = isUnique ? RANGES_UNI[weaponValue][3] : RANGES_REG[weaponValue][2];
            results.canBeSummonedMaxPVP.weaponU = isUnique ? RANGES_UNI[weaponValue][3] : RANGES_REG[weaponValue][3];
        }

        /** @type {Object<string, string>} */
        var endResults = {};

        for (const property in results) {
            endResults[property] = ((results[property].soul !== -1) ? results[property].soul : '') +
                ((results[property].soul !== -1 && results[property].weaponR !== -1) ? ' / ' : '') +
                ((results[property].weaponR !== -1) ? results[property].weaponR + ' (+' + results[property].weaponU + ')' : '');
        }

        for (const res in endResults) {
            switch (res) {
                case "canSummonMinCoop":
                    document.querySelector("#calc-result-min").innerText = endResults[res];
                    break;
                case "canSummonMaxCoop":
                    document.querySelector("#calc-result-max").innerText = endResults[res];
                    break;
                case "canBeSummonedMinCoop":
                    document.querySelector("#calc-result-min1").innerText = endResults[res];
                    break;
                case "canBeSummonedMaxCoop":
                    document.querySelector("#calc-result-max1").innerText = endResults[res];
                    break;
                case "canSummonMinPVP":
                    document.querySelector("#calc-result-min2").innerText = endResults[res];
                    break;
                case "canSummonMaxPVP":
                    document.querySelector("#calc-result-max2").innerText = endResults[res];
                    break;
                case "canBeSummonedMinPVP":
                    document.querySelector("#calc-result-min3").innerText = endResults[res];
                    break;
                case "canBeSummonedMaxPVP":
                    document.querySelector("#calc-result-max3").innerText = endResults[res];
                    break;
            }
        }
    }
}