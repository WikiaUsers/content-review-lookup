/* =========================================
   НШСДЕКС: Инфо-Навигатор + Симулятор Боя (v9 ГАЛИЧ)
   ========================================= */

$(document).ready(function() {
    // 1. Сайдбар
    if (mw.config.get('wgNamespaceNumber') >= 0) {
        var sidebarHTML = `
        <div id="nshs-sidebar" style="position: fixed; top: 100px; right: 20px; width: 220px; background: #fff; border: 4px solid #000; border-radius: 15px; padding: 20px; box-shadow: 6px 6px 0px #000; font-family: '07NikumaruFont', 'Comic Sans MS', sans-serif; z-index: 1000; color: #000;">
            <h3 style="margin: 0 0 15px 0; font-size: 1.5em; text-align: center; border-bottom: 3px solid #000; padding-bottom: 10px;">Инфо<br>Навигатор</h3>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                <li><a href="/ru/wiki/НШСДекс" style="display: block; background: #fff; border: 2px solid #000; border-radius: 10px; padding: 8px; text-align: center; color: #000; text-decoration: none; font-size: 1.1em; box-shadow: 2px 2px 0px #000;">О боте</a></li>
                <li><a href="/ru/wiki/Rarity list" style="display: block; background: #fff; border: 2px solid #000; border-radius: 10px; padding: 8px; text-align: center; color: #000; text-decoration: none; font-size: 1.1em; box-shadow: 2px 2px 0px #000;">Rarity List</a></li>
                <li><a href="/ru/wiki/Арена" style="display: block; background: #4ade80; border: 2px solid #000; border-radius: 10px; padding: 8px; text-align: center; color: #000; text-decoration: none; font-size: 1.1em; box-shadow: 2px 2px 0px #000; font-weight: bold;">⚔️ Арена</a></li>
            </ul>
        </div>
        `;
        $('body').append(sidebarHTML);
        if ($(window).width() > 1200) {
            $('#mw-content-text').css('margin-right', '260px');
        }
    }

    // 2. Интерфейс Арены
    if ($('#arena-app').length > 0) {
        var arenaHTML = `
            <div style="display: flex; gap: 20px; justify-content: center; margin: 25px 0; align-items: center; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px;">
                    <label style="font-size: 1.2em; font-weight: bold;">Болл 1 (Имя статьи):</label><br>
                    <input type="text" id="boll1-input" value="Галич" style="margin-top: 10px; padding: 12px; border: 3px solid #000; border-radius: 10px; width: 90%; text-align: center; font-size: 1.1em; outline: none; box-shadow: 3px 3px 0px #000; font-family: inherit;">
                </div>
                <div style="font-size: 2em; font-weight: bold; padding-top: 20px;">VS</div>
                <div style="flex: 1; min-width: 200px;">
                    <label style="font-size: 1.2em; font-weight: bold;">Болл 2:</label><br>
                    <input type="text" id="boll2-input" value="Пиз" style="margin-top: 10px; padding: 12px; border: 3px solid #000; border-radius: 10px; width: 90%; text-align: center; font-size: 1.1em; outline: none; box-shadow: 3px 3px 0px #000; font-family: inherit;">
                </div>
            </div>
            <button id="start-battle-btn" style="padding: 15px 40px; border: 3px solid #000; border-radius: 15px; background: #4ade80; font-weight: bold; font-size: 1.3em; cursor: pointer; box-shadow: 4px 4px 0px #000; font-family: inherit; color: #000;">
                НАЧАТЬ БОЙ!
            </button>
            <div id="battle-result" style="margin-top: 20px; text-align: left;"></div>
        `;
        $('#arena-app').html(arenaHTML);

        $('#start-battle-btn').on('click', function() {
            var b1 = $('#boll1-input').val();
            var b2 = $('#boll2-input').val();
            startBattle(b1, b2);
        });
    }
});

// 3. Функция получения редкости из Rarity List
// 3. Функция получения редкости из Rarity List (ИСПРАВЛЕНО)
function getRarityList() {
    return new Promise((resolve, reject) => {
        $.get('/ru/wiki/Rarity list?action=raw', function(text) {
            let rarityData = {};
            
            // Эта регулярка ищет ВСЕ блоки, где есть число (например >5<) и потом любую ссылку или текст
            // Она игнорирует картинки, так как мы ищем только цифры перед тегом закрытия div
            let regex = />\s*([0-9\.]+)\s*<\/div>[\s\S]*?\[\[([^|\]]+?)(?:\.png|\.jpg)?(?:\|([^\]]+))?\]\]/g;
            let match;
            
            while ((match = regex.exec(text)) !== null) {
                let rarity = parseFloat(match[1]); 
                let engName = match[2].trim(); // Берем первую часть ссылки (Английское имя)
                let rusName = match[3] ? match[3].trim() : null; // Берем вторую часть (Русское имя)
                
                // Если это картинка, пропускаем
                if (engName.includes('.png') || engName.includes('.jpg')) continue;

                // Сохраняем по всем возможным ключам
                if (!rarityData[engName]) rarityData[engName] = rarity;
                if (rusName && !rarityData[rusName]) rarityData[rusName] = rarity;
            }
            
            // Добавляем костыль для Галича и других, если вдруг ссылка не спарсилась
            if (!rarityData['Галич']) rarityData['Галич'] = 5;
            if (!rarityData['Гал']) rarityData['Гал'] = 8;

            console.log("Редкости загружены:", rarityData);
            resolve(rarityData);
        }).fail(function() {
            resolve({}); 
        });
    });
}

// 4. Функция парсинга статьи
function getBollData(pageName) {
    return new Promise((resolve, reject) => {
        $.get('/ru/wiki/' + encodeURIComponent(pageName) + '?action=raw', function(text) {
            if (!text) {
                reject('Страница не найдена: ' + pageName);
                return;
            }
            let nameMatch = text.match(/\|Имя=([^\|\}]+)/i);
            let name = nameMatch ? nameMatch[1].trim() : pageName;
            
            let hpMatch = text.match(/(\d+|Бесконечность)\s*❤️/i);
            let atkMatch = text.match(/(\d+|Бесконечность)\s*🗡️/i);
            
            let hp = hpMatch ? (hpMatch[1].toLowerCase() === 'бесконечность' ? 999999 : parseInt(hpMatch[1])) : 0;
            let atk = atkMatch ? (atkMatch[1].toLowerCase() === 'бесконечность' ? 999999 : parseInt(atkMatch[1])) : 0;
            
            let abilityMatch = text.match(/'''СПОСОБНОСТЬ:\s*([^\n']+)/i);
            let ability = abilityMatch ? abilityMatch[1].trim() : 'Нет данных';
            
            resolve({ name: name, pageName: pageName, hp: hp, atk: atk, ability: ability });
        }).fail(function() {
            reject('Ошибка загрузки: ' + pageName);
        });
    });
}

// 5. Логика боя
function startBattle(boll1Name, boll2Name) {
    var resultDiv = $('#battle-result');
    resultDiv.html('<p style="text-align: center; font-weight: bold; font-size: 1.2em;">Идет загрузка данных и редкостей...</p>');

    getRarityList().then(rarityList => {
        Promise.all([getBollData(boll1Name), getBollData(boll2Name)])
            .then(([b1, b2]) => {
                function findRarity(boll, list) {
                    let searchKeys = [boll.pageName, boll.name, boll.pageName.replace(/_/g, ' '), boll.name.replace(/_/g, ' ')];
                    for (let key of searchKeys) { if (list[key] !== undefined) return list[key]; }
                    return 99;
                }

                b1.rarity = findRarity(b1, rarityList);
                b2.rarity = findRarity(b2, rarityList);

                let log = '';
                let b1Hp = b1.hp, b2Hp = b2.hp;
                let b1Stunned = false, b2Stunned = false;
                let turn = 1;
                let b1AbilityUsed = false;
                let b2AbilityUsed = false;

                // Проверка на ваншот (Сан-Марино)
                let isSMR1 = b1.ability.toLowerCase().includes('ваншотнуть');
                let isSMR2 = b2.ability.toLowerCase().includes('ваншотнуть');

                if (isSMR1) {
                    if (b1.rarity < b2.rarity) { b2Hp = 0; log += `<br>💀 <b>${b1.name}</b> ваншотит <b>${b2.name}</b>!`; } 
                    else { b1Hp = 0; log += `<br>💀 <b>${b1.name}</b> пытался ваншотнуть, но отлетел сам!`; }
                }
                if (isSMR2) {
                    if (b2.rarity < b1.rarity) { b1Hp = 0; log += `<br>💀 <b>${b2.name}</b> ваншотит <b>${b1.name}</b>!`; } 
                    else { b2Hp = 0; log += `<br>💀 <b>${b2.name}</b> пытался ваншотнуть, но отлетел сам!`; }
                }

                while (b1Hp > 0 && b2Hp > 0 && turn < 30) {
                    // === ХОД БОЛЛА 1 ===
                    if (!b1Stunned) {
                        let ab = b1.ability.toLowerCase();
                        let dmg = b1.atk;

                        if (ab.includes('отключить') && !b1AbilityUsed) {
                            b2Stunned = true; b1AbilityUsed = true;
                            log += `<br>⚡ <b>${b1.name}</b> использует: ${b1.ability}! <b>${b2.name}</b> пропускает ход.`;
                        }
                        else if (ab.includes('принудительно меняет порядок')) { // ГАЛИЧ
                            b1.atk = Math.floor(b1.atk * 1.25); // Бафф +25%
                            b1AbilityUsed = true;
                            log += `<br>🔄 <b>${b1.name}</b> меняет очередь! Получает +25% к атаке (Теперь ${b1.atk}).`;
                        }
                        else if (ab.includes('урон своего союзника') && !b1AbilityUsed) {
                            dmg = b1.atk * 2; b1AbilityUsed = true;
                            log += `<br>🤖 <b>${b1.name}</b> активирует: ${b1.ability}! Удар усилен до ${dmg}.`;
                            b2Hp -= dmg;
                        }
                        else if (ab.includes('менее 50% хп') && b1Hp < (b1.hp / 2)) {
                            dmg = b1.atk / 2;
                            log += `<br>🥒 <b>${b1.name}</b> в ярости! Урон снижен вдвое (${dmg}).`;
                            b2Hp -= dmg;
                        }
                        else if (ab.includes('объединить урон') && !b1AbilityUsed) {
                            dmg = (b1.atk * 3) / 1.5; b1AbilityUsed = true;
                            log += `<br>👑 <b>${b1.name}</b> собирает урон команды! Удар на ${dmg}.`;
                            b2Hp -= dmg;
                        }
                        else if (ab.includes('+100 хп и +30 урона') && !b1AbilityUsed) {
                            b1Hp += 100; b1.atk += 30; b1AbilityUsed = true;
                            log += `<br>💣 <b>${b1.name}</b> бафает себя: +100 HP и +30 Урона!`;
                        }
                        else if (ab.includes('заспавнить') && !b1AbilityUsed) {
                            if (Math.random() <= 0.12) {
                                dmg += 100;
                                log += `<br>👾 <b>${b1.name}</b> заспавнил Абобу! +100 урона.`;
                            } else {
                                log += `<br>👾 <b>${b1.name}</b> пытался заспавнить Абобу, но не вышло.`;
                            }
                            b1AbilityUsed = true; b2Hp -= dmg;
                        }
                        else if (ab.includes('в 2 раза больше за каждого отца')) {
                            dmg = b1.atk * 2;
                            log += `<br>🍑 <b>${b1.name}</b> бьет с усилением от отцов (${dmg}).`;
                            b2Hp -= dmg;
                        }
                        else if (ab.includes('барьер') && !b1AbilityUsed) {
                            b1AbilityUsed = true; b1.barrier = true;
                            log += `<br>🛠️ <b>${b1.name}</b> строит барьер!`;
                        }
                        else {
                            b2Hp -= dmg;
                            log += `<br>⚔️ <b>${b1.name}</b> бьет на ${dmg}. У <b>${b2.name}</b> остается ${Math.max(0, Math.round(b2Hp))} HP.`;
                        }
                    } else {
                        log += `<br>💤 <b>${b1.name}</b> пропускает ход.`;
                        b1Stunned = false;
                    }

                    if (b2Hp <= 0) break;

                    // === ХОД БОЛЛА 2 ===
                    if (!b2Stunned) {
                        let ab = b2.ability.toLowerCase();
                        let dmg = b2.atk;

                        if (ab.includes('отключить') && !b2AbilityUsed) {
                            b1Stunned = true; b2AbilityUsed = true;
                            log += `<br>⚡ <b>${b2.name}</b> использует: ${b2.ability}! <b>${b1.name}</b> пропускает ход.`;
                        }
                        else if (ab.includes('принудительно меняет порядок')) { // ГАЛИЧ
                            b2.atk = Math.floor(b2.atk * 1.25); 
                            b2AbilityUsed = true;
                            log += `<br>🔄 <b>${b2.name}</b> меняет очередь! Получает +25% к атаке (Теперь ${b2.atk}).`;
                        }
                        else if (ab.includes('урон своего союзника') && !b2AbilityUsed) {
                            dmg = b2.atk * 2; b2AbilityUsed = true;
                            log += `<br>🤖 <b>${b2.name}</b> активирует: ${b2.ability}! Удар усилен до ${dmg}.`;
                            b1Hp -= dmg;
                        }
                        else if (ab.includes('менее 50% хп') && b2Hp < (b2.hp / 2)) {
                            dmg = b2.atk / 2;
                            log += `<br>🥒 <b>${b2.name}</b> в ярости! Урон снижен вдвое (${dmg}).`;
                            b1Hp -= dmg;
                        }
                        else if (ab.includes('объединить урон') && !b2AbilityUsed) {
                            dmg = (b2.atk * 3) / 1.5; b2AbilityUsed = true;
                            log += `<br>👑 <b>${b2.name}</b> собирает урон команды! Удар на ${dmg}.`;
                            b1Hp -= dmg;
                        }
                        else if (ab.includes('+100 хп и +30 урона') && !b2AbilityUsed) {
                            b2Hp += 100; b2.atk += 30; b2AbilityUsed = true;
                            log += `<br>💣 <b>${b2.name}</b> бафает себя: +100 HP и +30 Урона!`;
                        }
                        else if (ab.includes('заспавнить') && !b2AbilityUsed) {
                            if (Math.random() <= 0.12) {
                                dmg += 100;
                                log += `<br>👾 <b>${b2.name}</b> заспавнил Абобу! +100 урона.`;
                            } else {
                                log += `<br>👾 <b>${b2.name}</b> пытался заспавнить Абобу, но не вышло.`;
                            }
                            b2AbilityUsed = true; b1Hp -= dmg;
                        }
                        else if (ab.includes('в 2 раза больше за каждого отца')) {
                            dmg = b2.atk * 2;
                            log += `<br>🍑 <b>${b2.name}</b> бьет с усилением от отцов (${dmg}).`;
                            b1Hp -= dmg;
                        }
                        else if (ab.includes('барьер') && !b2AbilityUsed) {
                            b2AbilityUsed = true; b2.barrier = true;
                            log += `<br>🛠️ <b>${b2.name}</b> строит барьер!`;
                        }
                        else {
                            if (b1.barrier) {
                                log += `<br>🛡️ <b>${b1.name}</b> поглощает удар барьером!`;
                                b1.barrier = false;
                            } else {
                                b1Hp -= dmg;
                                log += `<br>⚔️ <b>${b2.name}</b> бьет на ${dmg}. У <b>${b1.name}</b> остается ${Math.max(0, Math.round(b1Hp))} HP.`;
                            }
                        }
                    } else {
                        log += `<br>💤 <b>${b2.name}</b> пропускает ход.`;
                        b2Stunned = false;
                    }

                    if (b2.barrier && b1Hp > 0) {
                        log += `<br>🛡️ <b>${b2.name}</b> поглощает удар барьером!`;
                        b2.barrier = false;
                    }
                    turn++;
                }

                let winnerText = '';
                if (b1Hp <= 0 && b2Hp <= 0) winnerText = 'Ничья!';
                else if (b1Hp <= 0) winnerText = `🏆 Победил ${b2.name}!`;
                else if (b2Hp <= 0) winnerText = `🏆 Победил ${b1.name}!`;
                else winnerText = 'Бой затянулся...';

                resultDiv.html(`
                    <div style="margin-top: 20px; padding: 20px; border: 3px solid #000; border-radius: 15px; background: #fff; box-shadow: 4px 4px 0px #000;">
                        <h3 style="margin-top: 0; text-align: center; font-size: 1.5em;">${winnerText}</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; background: #f3f4f6; padding: 10px; border-radius: 10px; border: 2px solid #000;">
                            <div style="width: 45%;">
                                <strong>${b1.name}</strong> (Редкость: ${b1.rarity})<br>❤️ ${b1.hp} | 🗡️ ${b1.atk}<br><small>${b1.ability}</small>
                            </div>
                            <div style="font-size: 2em; align-self: center; font-weight: bold;">VS</div>
                            <div style="width: 45%; text-align: right;">
                                <strong>${b2.name}</strong> (Редкость: ${b2.rarity})<br>❤️ ${b2.hp} | 🗡️ ${b2.atk}<br><small>${b2.ability}</small>
                            </div>
                        </div>
                        <div style="max-height: 300px; overflow-y: auto; background: #fff; border: 2px dashed #000; padding: 10px; border-radius: 10px; font-size: 0.95em;">
                            <strong>Лог боя:</strong>${log}
                        </div>
                    </div>
                `);
            })
            .catch(err => {
                resultDiv.html('<span style="color: red; font-weight: bold;">Ошибка: ' + err + '</span>');
            });
    });
}