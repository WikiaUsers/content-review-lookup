function log(b, n) {
    return Math.log(n) / Math.log(b);
};

function convertUTCDateToLocal(date) {
	date = new Date(date);
	var plusOrMinus = date.getTimezoneOffset() > 0 ? 'plus' : 'minus';
	if (plusOrMinus == 'plus') {
		return new Date(date.getTime() - (Math.abs(date.getTimezoneOffset()) * 60 * 1e3))
	} else {
		return new Date(date.getTime() + (Math.abs(date.getTimezoneOffset()) * 60 * 1e3))
	};
};

function randomBetween(min, max, whole) {
	const low = Math.min(min, max);
	const high = Math.max(min, max);
	if (whole) {
		return Math.floor(Math.random() * (high - low) + low);
	} else {
		return Math.random() * (high - low) + low;
	};
};

// formatDate source: https://stackoverflow.com/users/361684/gilly3
// example usage: formatDate(new Date("2024-08-15"), 'dd/MM/yyyy')
// revamped for ES6 by User:TheSeal27 for the SAKTKIA51 Wiki: https://saktkia51.fandom.com/wiki/MediaWiki:BasicFunctions.js
function formatDate(date, format, utc) {
    const _MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const _MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const _dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const _ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        let s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    };

    let y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    let M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + _MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + _MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    let d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + _dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + _ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    let H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    let h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    let m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    let s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    let T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    let t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    let tz = -date.getTimezoneOffset();
    let K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        let tzHrs = Math.floor(tz / 60);
        let tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    };
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    const day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(_dddd[0], "g"), _dddd[day]);
    format = format.replace(new RegExp(_ddd[0], "g"), _ddd[day]);

    format = format.replace(new RegExp(_MMMM[0], "g"), _MMMM[M]);
    format = format.replace(new RegExp(_MMM[0], "g"), _MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};

function removeAllKeys(obj) {
	const outputObj = {
		count:0,
		keys:[],
	};
	for (let key in obj) {
		if (delete obj[key]) {
			outputObj.keys.push(key);
			outputObj.count++;
		};
	};
	return outputObj;
};

function hasTheseItems(targetArr, sourceArr = []) {
	return targetArr.every(function(item) {
		return sourceArr.includes(item);
	});
};
function doesNotHaveTheseItems(...args) {
	return !hasTheseItems.apply(this, args);
};

function hasTheseKeys(targetObj, sourceArr = []) {
	const l = sourceArr.length;
	let bool = true;
	for (let j = 0; j < l; j++) {
		const k = sourceArr[j];
		if (Reflect.has(targetObj, k) === false) {
			bool = false; break;
		};
	};
	return bool;
};
function doesNotHaveTheseKeys(...args) {
	return !hasTheseKeys.apply(this, args);
};

function isNullish(input) {
	return input === undefined || input === null;
};
function isNotNullish(...args) {
	return !isNullish.apply(this, args);
};

function isBetween(input, start, end) {
	return input >= start && input <= end;
};

function convertToBinary(input) {
	input = input.toString();
	const output = [];
	const l = input.length;
	for (let j = 0; j < l; j++) {
		output.push(input[j].charCodeAt(0).toString(2));
	};
	return output.join(' ');
};
function convertFromBinary(input) {
	input = input.split(' ');
	let output = '';
	const l = input.length;
	for (let j = 0; j < l; j++) {
		output += String.fromCharCode(parseInt(input[j], 2));
	};
	return output;
};

function create(tag, appendLocation) {
	tag ??= 'div';
	const elem = document.createElement(tag);
	if (!isNullish(appendLocation)) {
		appendLocation.appendChild(elem);
	};
	return elem;
};