window.tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};

window.tooltips_list = [
    {
        classname: 'character-tooltip',
        parse: '<div style="background:#1a1a1a;color:white;border:5px solid #8c52ff;border-radius:20px;padding:20px;width:400px;max-width:80vw;box-shadow:0 5px 20px rgba(140,82,255,0.3);">' +
               '<div style="font-size:24px;font-weight:bold;color:#8c52ff;margin-bottom:15px;border-bottom:2px solid #8c52ff;padding-bottom:8px;text-align:center;"><#name#></div>' +
               '<div style="display:flex;gap:20px;">' +
               '<div style="width:100px;height:100px;background:#2a2a2a;border:2px solid #8c52ff;border-radius:10px;overflow:hidden;flex-shrink:0;">[[File:<#image#>|100px]]</div>' +
               '<div style="flex:1;">' +
               '<div style="margin-bottom:8px;"><strong style="color:#8c52ff;display:inline-block;width:90px;">Species:</strong> <#species#></div>' +
               '<div style="margin-bottom:8px;"><strong style="color:#8c52ff;display:inline-block;width:90px;">Role:</strong> <#role#></div>' +
               '<div style="margin-bottom:8px;"><strong style="color:#8c52ff;display:inline-block;width:90px;">Gender:</strong> <#gender#></div>' +
               '<div><strong style="color:#8c52ff;display:inline-block;width:90px;">Debut:</strong> <#appearance#></div>' +
               '</div>' +
               '</div>' +
               '</div>'
    }
];