// Tooltip Configuration
window.tooltips_config = {
  offsetX: 15,
  offsetY: 15,
  waitForImages: true
};

// Pink Tooltip Template
window.tooltips_list = [
  {
    classname: 'char-tooltip',
    parse: '<div style="background:#c26fcc; border:3px solid #8c52ff; border-radius:15px; padding:15px; width:300px; color:white; font-family:Arial,sans-serif; box-shadow: 0 0 10px rgba(0,0,0,0.3);">' +
           '<div style="font-size:20px; font-weight:bold; margin-bottom:10px; padding-bottom:5px; border-bottom:2px solid white;"><#name#></div>' +
           '<div style="display: grid; grid-template-columns: 100px 1fr; gap: 8px; margin-top: 10px;">' +
             '<div style="font-weight:bold;">Occupation:</div><div><#occupation#></div>' +
             '<div style="font-weight:bold;">Species:</div><div><#species#></div>' +
             '<div style="font-weight:bold;">Gender:</div><div><#gender#></div>' +
             '<div style="font-weight:bold;">Debut:</div><div><#debut#></div>' +
           '</div>' +
           '</div>'
  }
];