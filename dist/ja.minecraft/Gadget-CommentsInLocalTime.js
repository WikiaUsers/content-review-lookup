/*
	Documentation: [[wikipedia:Help:UTCの時刻を地方時で表示する]]
*/

jQuery(function($)
{
	/*
		Language
	*/
	var language =
	{
		'ja' : {
			// relative terms
			'Today'		: 	'本日',
			'Yesterday'	: 	'昨日',
			'Tomorrow'	: 	'明日',

			'last'		: 	'前の',
			'this'		: 	'次の',

			// days of the week
			'Sunday'	: 	'日曜日',
			'Monday'	: 	'月曜日',
			'Tuesday'	: 	'火曜日',
			'Wednesday'	: 	'水曜日',
			'Thursday'	: 	'木曜日',
			'Friday'	: 	'金曜日',
			'Saturday'	: 	'土曜日',

			// days of the week (abbreviation)
			'Sun'		: 	'日',
			'Mon'		: 	'月',
			'Tue'		: 	'火',
			'Wed'		: 	'水',
			'Thu'		: 	'木',
			'Fri'		: 	'金',
			'Sat'		: 	'土',

			// months of the year
			'January'	: 	'1月',
			'February'	: 	'2月',
			'March'		: 	'3月',
			'April'		: 	'4月',
			'May'		: 	'5月',
			'June'		: 	'6月',
			'July'		: 	'7月',
			'August'	: 	'8月',
			'September'	: 	'9月',
			'October'	: 	'10月',
			'November'	: 	'11月',
			'December'	: 	'12月',

			// difference words
			'ago'		: 	'前',
			'from now'	: 	'後',

			// date phrases
			'year'		: 	'年',
			'years'		: 	'年',
			'month'		: 	'か月',
			'months'	: 	'か月',
			'day'		: 	'日',
			'days'		: 	'日',

			// difference format
			'separator_value_unit'		: 	'',
			'separator_before_month'	: 	'',
			'separator_before_day'		: 	'と'
		},
		'en' : {
			// relative terms
			'Today'		: 	'Today',
			'Yesterday'	: 	'Yesterday',
			'Tomorrow'	: 	'Tomorrow',

			'last'		: 	'last',
			'this'		: 	'this',

			// days of the week
			'Sunday'	: 	'Sunday',
			'Monday'	: 	'Monday',
			'Tuesday'	: 	'Tuesday',
			'Wednesday'	: 	'Wednesday',
			'Thursday'	: 	'Thursday',
			'Friday'	: 	'Friday',
			'Saturday'	: 	'Saturday',

			// days of the week (abbreviation)
			'Sun'		: 	'Sun',
			'Mon'		: 	'Mon',
			'Tue'		: 	'Tue',
			'Wed'		: 	'Wed',
			'Thu'		: 	'Thu',
			'Fri'		: 	'Fri',
			'Sat'		: 	'Sat',

			// months of the year
			'January'	: 	'January',
			'February'	: 	'February',
			'March'		: 	'March',
			'April'		: 	'April',
			'May'		: 	'May',
			'June'		: 	'June',
			'July'		: 	'July',
			'August'	: 	'August',
			'September'	: 	'September',
			'October'	: 	'October',
			'November'	: 	'November',
			'December'	: 	'December',

			// difference words
			'ago'		: 	'ago',
			'from now'	: 	'from now',

			// date phrases
			'year'		: 	'year',
			'years'		: 	'years',
			'month'		: 	'month',
			'months'	: 	'months',
			'day'		: 	'day',
			'days'		: 	'days',

			// difference format
			'separator_value_unit'		: 	' ',
			'separator_before_month'	: 	', ',
			'separator_before_day'		: 	', '
		}
	};

	/*
		Settings
	*/
	if (typeof(LocalComments) == 'undefined')
		LocalComments = {};

	if (typeof(LocalComments.dateDifference) == 'undefined')
		LocalComments.dateDifference = true;

	if (typeof(LocalComments.language) == 'undefined')
		LocalComments.language = mw.config.get('wgUserLanguage');
	else
		LocalComments.language = LocalComments.language.toLowerCase();
	var lang = LocalComments.language;
	if (language[lang] == null)
		lang = 'en'; //言語対応していない場合とりあえず英語設定

	if (typeof(LocalComments.dateFormat) == 'undefined')
	{
		if (lang == 'ja')
			LocalComments.dateFormat = 'ja-default';
		else
			LocalComments.dateFormat = 'dmy';
	} else {
		LocalComments.dateFormat = LocalComments.dateFormat.toLowerCase();
	}

	if (typeof(LocalComments.timeFirst) == 'undefined')
		LocalComments.timeFirst = true;

	if (typeof(LocalComments.twentyFourHours) == 'undefined')
		LocalComments.twentyFourHours = true;
	/*
		End Settings
	*/

	/*
		Date and time format
	*/
	var full_format;
	var date_format;
	var time_format;

	switch (LocalComments.dateFormat)
	{
		case 'dmy':
			if (LocalComments.timeFirst)
				full_format = '%time%, %date% (UTC%utc_offset%)';
			else
				full_format = '%date%, %time% (UTC%utc_offset%)';
			date_format = '%day% %month_name% %year%, %last%%day_of_the_week% %diff%';
			time_format = '%hour%:%minute%%ampm%';
			break;
		case 'mdy':
			if (LocalComments.timeFirst)
				full_format = '%time%, %date% (UTC%utc_offset%)';
			else
				full_format = '%date%, %time% (UTC%utc_offset%)';
			date_format = '%month_name% %day%, %year%, %last%%day_of_the_week% %diff%';
			time_format = '%hour%:%minute%%ampm%';
			break;
		case 'ja-default':
		default:
			full_format = '%date% %time% (UTC%utc_offset%)';
			date_format = '%year%年%month_num%月%day%日 (%day_of_the_week_abbr%) %diff%';
			time_format = '%hour%:%minute%%ampm%';
	}

	switch (mw.config.get('wgCanonicalNamespace'))
	{
		case '':
		case 'MediaWiki':
		case 'Special':
			return;
	}

	var element_id = null;
	if(mw.config.get('wgAction') == 'view') {
		switch(mw.config.get('skin')) {
			case 'chick':
			case 'monobook':
			case 'myskin':
			case 'simple':
			case 'vector':
			case 'hydra':
				element_id = 'bodyContent';
				break;
			case 'cologneblue':
			case 'nostalgia':
			case 'standard':
				element_id = 'article';
				break;
			case 'modern':
				element_id = 'mw_contentholder';
				break;
		}
	} else if(mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
		element_id = 'wikiPreview';
	}

	if(element_id)
		replace_text(document.getElementById(element_id),
		/(?:(\d{4})年(\d{1,2})月(\d{1,2})日 \([日月火水木金土]\) (\d\d):(\d\d)|(\d\d):(\d\d) (\d{4})年(\d{1,2})月(\d{1,2})日) \(UTC\)/,
		adjust_time);

function add_leading_zero(number)
{
	if (number < 10)
		number = '0' + number;
	return number;
}

function adjust_time(original_timestamp, old_year, old_month, old_day, old_hour, old_minute,
                                         old_hour2, old_minute2, old_year2, old_month2, old_day2)
{
	if(old_year == '' || old_year === undefined) old_year = old_year2;
	if(old_month == '' || old_month === undefined) old_month = old_month2;
	if(old_day == '' || old_day === undefined) old_day = old_day2;
	if(old_hour == '' || old_hour === undefined) old_hour = old_hour2;
	if(old_minute == '' || old_minute === undefined) old_minute = old_minute2;

	var today = new Date(), yesterday = new Date(), tomorrow = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	tomorrow.setDate(tomorrow.getDate() + 1);

	// set the date entered
	var time = new Date();
	time.setUTCFullYear(old_year, convert_month_to_number(old_month), old_day);
	time.setUTCHours(old_hour);
	time.setUTCMinutes(old_minute);

	// determine the time offset
	var utc_offset = -1 * time.getTimezoneOffset() / 60;
	if (utc_offset >= 0)
		utc_offset = '+' + utc_offset;
	else
		utc_offset = '−' + Math.abs(utc_offset);

	// set the date bits to output
	var year = time.getFullYear(), month = add_leading_zero(time.getMonth() + 1);
	var day = time.getDate();
	var hour = parseInt(time.getHours()), minute = add_leading_zero(time.getMinutes());

	// output am or pm depending on the date
	var ampm = '';
	if (!LocalComments.twentyFourHours)
	{
		ampm = ' AM';
		if (hour > 11) ampm = ' PM';
		if (hour > 12) hour -= 12;
		if (hour == '00') hour = 12;
	}

	// return 'today' or 'yesterday' if that is the case
	if (year == today.getFullYear() && month == add_leading_zero(today.getMonth() + 1) && day == today.getDate())
		var date = language[lang]['Today'];
	else if (year == yesterday.getFullYear() && month == add_leading_zero(yesterday.getMonth() + 1) && day == yesterday.getDate())
		var date = language[lang]['Yesterday'];
	else if (year == tomorrow.getFullYear() && month == add_leading_zero(tomorrow.getMonth() + 1) && day == tomorrow.getDate())
		var date = language[lang]['Tomorrow'];
	else
	{
		// calculate day of week
		var day_of_the_week = new Array(language[lang]['Sunday'],
		                                language[lang]['Monday'],
		                                language[lang]['Tuesday'],
		                                language[lang]['Wednesday'],
		                                language[lang]['Thursday'],
		                                language[lang]['Friday'],
		                                language[lang]['Saturday'])[time.getDay()];
		var day_of_the_week_abbr = new Array(language[lang]['Sun'],
		                                     language[lang]['Mon'],
		                                     language[lang]['Tue'],
		                                     language[lang]['Wed'],
		                                     language[lang]['Thu'],
		                                     language[lang]['Fri'],
		                                     language[lang]['Sat'])[time.getDay()];

		if (LocalComments.dateDifference)
		{
			// calculate time difference from today and the timestamp
			today = new Date(today.getYear(), today.getMonth(), today.getDate());
			time = new Date(time.getYear(), time.getMonth(), time.getDate());

			var milliseconds_ago = today.getTime() - time.getTime();
			var days_ago = Math.round(milliseconds_ago / 1000 / 60 / 60 / 24);

			var difference, difference_word = '', last = '';
			if (today.valueOf() >= time.valueOf())
			{
				difference = new Date(today.valueOf() - time.valueOf());
				difference_word = language[lang]['ago'];
				if (days_ago <= 7)
					last = language[lang]['last'] + ' ';
			}
			else
			{
				difference = new Date(time.valueOf() - today.valueOf());
				difference_word = language[lang]['from now'];
				if (days_ago >= -7)
					last = language[lang]['this'] + ' ';
			}
			difference = new Date(difference.getUTCFullYear(), difference.getUTCMonth(), difference.getUTCDate() - 1);
			var descriptive_difference = [];

			if (difference.getYear() - 70 > 0)
			{
				var years_ago = (difference.getYear() - 70) + language[lang]['separator_value_unit'] + pluralize(language[lang]['year'], difference.getYear() - 70, language[lang]['years']);
				descriptive_difference.push(years_ago);
			}
			if (difference.getMonth() > 0)
			{
				var months_ago = difference.getMonth() + language[lang]['separator_value_unit'] + pluralize(language[lang]['month'], difference.getMonth(), language[lang]['months']);
				descriptive_difference.push(months_ago);
			}
			if (difference.getDate() > 0)
			{
				var new_days_ago = difference.getDate() + language[lang]['separator_value_unit'] + pluralize(language[lang]['day'], difference.getDate(), language[lang]['days']);
				descriptive_difference.push(new_days_ago);
			}

			descriptive_difference = '';
			if (years_ago != undefined) {
				descriptive_difference += years_ago;
			}
			if (months_ago != undefined) {
				descriptive_difference += (descriptive_difference == '' ? '' : language[lang]['separator_before_month']) + months_ago;
			}
			if (new_days_ago != undefined) {
				descriptive_difference += (descriptive_difference == '' ? '' : language[lang]['separator_before_day']) + new_days_ago;
			}
			descriptive_difference = '(' + descriptive_difference + language[lang]['separator_value_unit'] + difference_word + ')';
		}
		else
		{
			descriptive_difference = '';
			last = '';
		}

		// format the date according to user preferences
		var date = date_format.replace('%year%', year)
		                      .replace('%month_num%', time.getMonth() + 1)
		                      .replace('%month_name%', convert_number_to_month(time.getMonth()))
		                      .replace('%day%', day)
		                      .replace('%day_of_the_week%', day_of_the_week)
		                      .replace('%day_of_the_week_abbr%', day_of_the_week_abbr)
		                      .replace('%last%', last)
		                      .replace('%diff%', descriptive_difference);
	}

	var time = hour + ':' + minute + ampm;
	var time = time_format.replace('%hour%', hour)
	                      .replace('%minute%', minute)
	                      .replace('%ampm%', ampm);

	var return_date = full_format.replace('%date%', date)
	                             .replace('%time%', time)
	                             .replace('%utc_offset%', utc_offset);

	return return_date;
}

function convert_month_to_number(month)
{
   var output = new Date('2001/' + month + '/1');
   return output.getMonth();
}

function convert_number_to_month(number)
{
	var month = new Array(language[lang]['January'], language[lang]['February'], language[lang]['March'], language[lang]['April'], language[lang]['May'], language[lang]['June'], language[lang]['July'], language[lang]['August'], language[lang]['September'], language[lang]['October'], language[lang]['November'], language[lang]['December']);
	return month[number];
}

function pluralize(term, count, plural)
{
  if (plural == null)
    plural = term + 's';

  return (count == 1 ? term : plural)
}

function replace_text(node, search, replace)
{
	if (!node)
		return;

	if (node.nodeType == 3)
	{
		var value = node.nodeValue;
		if (search.test(value))
		{
			var new_node = document.createDocumentFragment();

			while(true) {
				var pos = value.search(search);
				if(pos < 0) break;

				var match = value.match(search)[0];

				// Create <span class="localcomments" style="font-size: 95%; white-space: nowrap;" title="match">replace(match)</span>
				var span = document.createElement('span');
				span.setAttribute('class', 'localcomments');
				span.style.fontSize = '95%';
				span.style.whiteSpace = 'nowrap';
				span.setAttribute('title', match);
				span.appendChild(document.createTextNode(match.replace(search, replace)));

				new_node.appendChild(document.createTextNode(value.substring(0, pos)));
				new_node.appendChild(span);

				value = value.substring(pos + match.length);
			}
			new_node.appendChild(document.createTextNode(value));
			node.parentNode.replaceChild(new_node, node);
		}
	}
	else
	{
		var children = [], child = node.firstChild;
		while (child)
		{
			children[children.length] = child;
			child = child.nextSibling;
		}

		for (var child = 0; child < children.length; child++)
			replace_text(children[child], search, replace);
	}
}

});