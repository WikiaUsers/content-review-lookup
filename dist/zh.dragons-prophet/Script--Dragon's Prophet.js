/*
[[Category:Project]]
[[Category:Script]]
*/

function _dp_moon_ajax(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'xml',
        url: "https://spreadsheets.google.com/feeds/cells/0Am5CCSweD8j8dFpHaHRmZngyWllQbHJPRFlmSXRoV0E/oda/public/basic?range=A6%3AD8",
        success: function (xml) {

            var _data = [];

            var items = {};

            $('entry', xml).each(function (e) {

                var _id = $('id', this).text().replace(/.*public\/basic\//, '');

                items[_id] = $('content', this).text();

                //items.push($('content',this).text(), _id);

            });

            _data[0] = [
                items.R61, items.R6C2, items.R6C3, items.R6C4
            ];

            _data[1] = [
                items.R7C1, items.R7C2, items.R7C3, items.R7C4
            ];

            _data[2] = [
                items.R8C1, items.R8C2, items.R8C3, items.R8C4
            ];

            callback(_data);
        }
    });
};