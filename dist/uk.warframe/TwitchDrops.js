//підтягує розклад Twitch Drops та будує таблицю

$(function () {
	if (!("#twitch-drops").length) return;
    const dropsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcJWZc9LXpAjKWbMNFrI7Gbry3GfkfsK55k8Mp3EW65rIJhAZZG0W9WGwgrSwAB5J8iaVTeKFWh2Or/pub?output=csv";
    const dictUrl = "https://warframe.fandom.com/uk/wiki/Config/TwitchDrops.json?action=raw";
	let dropsData, dict;

	$.when(
		$.ajax({ url: dropsUrl, dataType: 'text' }),
		$.ajax({ url: dictUrl, dataType: 'json' })
	).then((data, tr)=>{
		dropsData = data[0],
		dict = tr[0];
		buildTwitchDrops();
	});
    
    function buildTwitchDrops() {
        let $table = $("<table class='twitch-drops wikitable'><tr><th>Назва</th><th>Нагороди</th><th>Дата початку</th><th>Тривалість</th><th>Посилання</th></tr></table>");

        csvToJson(dropsData).forEach(function(entry) {
			const startDate = new Date(entry["Start Date"] + "T" + entry["Start Time"] + "Z");
            //if (!entry.Description || entry.Subject == "TennoConcert Ticket Sales" || entry.Subject == "TennoCon Ticket Sales" || /[Nn]o [Dd]rop(s)?/.test(entry.Description) || startDate.getTime() < new Date().getTime()) return;
			if (!/[Dd]rop(s)?:/.test(entry.Description) || startDate.getTime() < new Date().getTime()) return;

            const drops = formatDrops(entry.Description),
                url = entry.Location && entry.Location != "" ? `<a href = "${entry.Location}">${entry.Location}</a>` : "—",
                endDate = new Date(entry["End Date"] + "T" + entry["End Time"] + "Z"),
                $startString = `<span data-time="${startDate.getTime()}">${startDate.toLocaleString()}</span>`,
                [durD, durH, durM, durS] = secondsToDHMS(endDate.getTime() - startDate.getTime());

            let $tr = $("<tr></tr>");
            $tr.append(
                `<td>${entry.Subject}</td>`,
                `<td>${drops.join("<br/>")}</td>`,
                `<td>
                    ${startDate.toLocaleString()}
                    <br/>
                    ${$startString}
                </td>`,
                `<td>
                    ${durD ? durD + '&nbsp;дн' : ""}
                    ${durH ? durH + '&nbsp;год' : ""}
                    ${durM ? durM + '&nbsp;хв' : ""}
                    ${durS ? durS + '&nbsp;с' : ""}
                </td>`,
                `<td>${url}</td>`
            ).appendTo($table);
        });
        if (!$table.find("tr td").length) $("<tr><td colspan=5 style='text-align:center;font-weight:bold'>Twitch Drops поки що немає.</td></tr>").appendTo($table);
        $table.appendTo($("#twitch-drops"));
        $( '.twitch-drops span[data-time]' ).each((i, entry) => {
            setInterval(countdown, 1000, entry, 'time');
        });
    }

    function countdown(selector, dataAttr) {
        let $elem = $(selector),
            startDate = $elem.data(dataAttr),
            now = new Date().getTime(),
            diff = startDate - now,
            [d, h, m, s] = secondsToDHMS(diff),
            counter = (d > 0 ? d + "&nbsp;дн.&nbsp;" : '') + (h > 0 ? h + "&nbsp;год&nbsp;" : '') + (m > 0 ? m + "&nbsp;хв&nbsp;" : '') + s + "&nbsp;c";

        $elem.html(m <= 0 && s <= 0 ? "Завершилось" : counter);
    }
    const formatDrops = dropString => {
        let drops = dropString
        .replace(/Drop(s)?:\s?/, "")
        .split(" - ")
        .map(function(drop) {
            let [name, time] = drop.split(/\s\(/);
            if (time) {
            	time = (time.indexOf("min") !== -1) ? time.trim().replace(/\s?min(s)?/g, " хв") : false;
            	time && (time = `(${time.replace(")", "")})`);
            }
            return `${dict[name] || name} ${time || ""}`;
        });
        return drops;
    };
	const csvToJson = t => { let l = t.split("\n"), e = l[0].split(","), n = []; for (let i = 1; i < l.length; i++) { let r = l[i].split(","), s = {}; for (let o = 0; o < e.length; o++) { let p = e[o].trim(), f = r[o].trim(); s[p] = f } n.push(s) } return n };
    const secondsToDHMS=o=>[~~(o/864e5),~~(o%864e5/36e5),~~(o%36e5/6e4),~~(o%6e4/1e3)];
});