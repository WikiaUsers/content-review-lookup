$(window).load(function() {
  if ($("#calculator").length === 0) {
    return;
  }

  $('#calculator').html(
    '<style>' +
    '#calculator label { display: inline-block; width: 150px; text-align: right; margin-right: 10px; }' +
    '#calculator input { width: 80px; }' +
    '#calculator table,th,td { border: 1px solid black; border-collapse: collapse; }' +
    '#calculator td { min-width: 50px; }' +
    '/* Chrome, Safari, Edge, Opera */' +
    '#calculator input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }' +
    '/* Firefox */' +
    'input[type=number] { -moz-appearance: textfield; }' +
    '</style>' +
    '<!--<h3>Damage = (Visible Attack * Total Buffs * DM * Damage Rate * Damage Roll) - Defense</h3>-->' +
    '<label>Visible Attack:</label>' +
    '<input type="number" id="calc_v1" name="calc_v1"><br><br>' +
    '<label>Total Buffs:</label>' +
    '<input type="number" id="calc_v2" name="calc_v2" step="any"><br><br>' +
    '<label>Damage Rate:</label>' +
    '<input type="number" id="calc_v3" name="calc_v3" step="any"><br><br>' +
    '<label>DM:</label>' +
    '<input type="number" id="calc_v4" name="calc_v4" step="any"><br><br>' +
    '<label>Defense:</label>' +
    '<input type="number" id="calc_v5" name="calc_v5"><br><br>' +
    '<button id="calc_button">Calculate</button>' +
    '<br><br>' +
    '<div id="calc_result"></div>'
  );


  $('#calc_button').click(function() {
    $('#calc_result').html('');

    var val1, val2, val3, val4, val5, invalid_fields, res;

    val1 = $('#calc_v1').val();
    val2 = $('#calc_v2').val();
    val3 = $('#calc_v3').val();
    val4 = $('#calc_v4').val();
    val5 = $('#calc_v5').val();

    //invalid_fields = [val1, val2, val3, val4, val5].filter(v => isNaN(v) || v === '').length;
    invalid_fields = [val1, val2, val3, val4, val5].filter(function(v) { return isNaN(v) || v === ''; }).length;

    if (invalid_fields > 0) {
      return;
    }

    val1 = parseInt(val1);
    val2 = parseFloat(val2);
    val3 = parseFloat(val3);
    val4 = parseFloat(val4);
    val5 = parseInt(val5);

    //invalid_fields = [val1, val2, val3, val4, val5].filter(v => v < 0).length;
    invalid_fields = [val1, val2, val3, val4, val5].filter(function(v) { return v < 0; }).length;

    if (invalid_fields > 0) {
      return;
    }

    //res = [0.99, 1, 1.01].map(x => [0, 1].map(y => Math.max(Math.floor(x * val1 * val2 * val3 * val4 - val5), 1) + y));
    res = [0.99, 1, 1.01].map(function(x) { return [0, 1].map(function(y) { return Math.max(Math.floor(x * val1 * val2 * val3 * val4 - val5), 1) + y; }); });

    $('#calc_result').html(
      '<table>' +
      '<tr>' +
      '  <th>Damage Roll</th>' +
      '  <th>+0</th>' +
      '  <th>+1</th>' +
      '</tr>' +
      '<tr>' +
      '  <td>0.99</td>' +
      '  <td>' + res[0][0] + '</td>' +
      '  <td>' + res[0][1] + '</td>' +
      '</tr>' +
      '<tr>' +
      '  <td>1</td>' +
      '  <td>' + res[1][0] + '</td>' +
      '  <td>' + res[1][1] + '</td>' +
      '</tr>' +
      '<tr>' +
      '  <td>1.01</td>' +
      '  <td>' + res[2][0] + '</td>' +
      '  <td>' + res[2][1] + '</td>' +
      '</tr>' +
      '</table>'
    );

  });
});