/**
 * Fichier de correspondance : Temps (minutes) -> Coût (Diamants)
 * Ce dictionnaire est utilisé par le module StatueStatsForm pour calculer
 * la réduction du coût immédiat en fonction de la durée.
 */
window.TempsDiamantsData = {
    15: 8,
    30: 14,
    45: 20,
    60: 24,
    75: 29,
    90: 34,
    105: 38,
    120: 42,
    180: 56,
    225: 68,
    240: 71,
    300: 84,
    360: 96,
    420: 108,
    480: 119,
    540: 131,
    600: 142,
    720: 162,
    780: 172,
    840: 182,
    900: 192,
    960: 202,
    1020: 210,
    1080: 220,
    1200: 238,
    1320: 256,
    1440: 274,
    1500: 281,
    1680: 307,
    1800: 324,
    1920: 339,
    1980: 347,
    2100: 364,
    2160: 371,
    2340: 395,
    2400: 402,
    2640: 432,
    2700: 439,
    2880: 461,
    3000: 475,
    3060: 483,
    3120: 488,
    3180: 496,
    3300: 511,
    3360: 516,
    3480: 532,
    3540: 537,
    3600: 545,
    3660: 551,
    3720: 559,
    3840: 572,
    3900: 578,
    4020: 592,
    4080: 598,
    4140: 604,
    4200: 612,
    4260: 618,
    4320: 624,
    4380: 630,
    4500: 644,
    4620: 657,
    4680: 663,
    4740: 669,
    4800: 675,
    4860: 683,
    5040: 700,
    5100: 707,
    5400: 738,
    5700: 769,
    6000: 799,
    6120: 812,
    6300: 830,
    6360: 834,
    6480: 848,
    6600: 859,
    6720: 870,
    6780: 877,
    6900: 888,
    7020: 900,
    7140: 911,
    7200: 918,
    7260: 923,
    7320: 934,
    7500: 946,
    7620: 957,
    7680: 962,
    7740: 969,
    7800: 974,
    8100: 1002,
    11520: 1304
};

/**
 * Fonction estimerDiamants
 * Calcule la valeur en diamants même si les minutes ne sont pas dans la liste.
 * Elle utilise les deux points les plus proches pour une estimation précise.
 */
window.estimerDiamants = function(min) {
    // 1. Force le format nombre et vérifie la validité
    min = Math.round(Number(min)); 
    if (isNaN(min) || min <= 0) return 0;

    const data = window.TempsDiamantsData;
    if (!data) return 0;

    // 2. Vérification directe (On évite l'interpolation si le chiffre existe)
    if (data[min] !== undefined) return data[min];

    // 3. Préparation des références
    const minutesRef = Object.keys(data).map(Number).sort((a, b) => a - b);
    
    if (min <= minutesRef[0]) return data[minutesRef[0]];
    if (min >= minutesRef[minutesRef.length - 1]) return data[minutesRef[minutesRef.length - 1]];

    // 4. Recherche des bornes (Interpolation)
    for (let i = 0; i < minutesRef.length - 1; i++) {
        let m1 = minutesRef[i];
        let m2 = minutesRef[i + 1];
        if (min > m1 && min < m2) {
            let d1 = data[m1];
            let d2 = data[m2];
            // Formule de réduction linéaire
            let estimation = d1 + (min - m1) * (d2 - d1) / (m2 - m1);
            return Math.ceil(estimation); 
        }
    }
    return 0;
};