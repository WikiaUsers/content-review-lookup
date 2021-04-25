(async () => {
    const mw_api = new mw.Api()
	await $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.4.0/jsoneditor.min.js")
	$('<link/>', {
       rel: 'stylesheet',
       type: 'text/css',
       href: "https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.4.0/jsoneditor.min.css"
    }).appendTo('head')
    const json_editors = []
    for (const el of $(".json-config")) {
        const editor = new JSONEditor(el)
        const config_page = $(el).data("config-page")
        const json_str = $(await mw_api.parse(new mw.Title(`Cấu_hình_đặc_biệt/${config_page}`)).catch(() => "{}")).text()
	    editor.set(JSON.parse(json_str))
        json_editors.push({
            element: editor,
            page: config_page
        })
    }
    $(".save-config").on("click", async () => {
        for (const json_editor of json_editors) {
            try {
                await mw_api.edit(`Cấu_hình_đặc_biệt/${json_editor.page}`, () => ({
                    text: json_editor.element.getText(),
                    summary: "Chỉnh sửa từ JSON Editor"
                }))
            }
            catch (e) {
                await mw_api.create(`Cấu_hình_đặc_biệt/${json_editor.page}`, {summary: "A edit from json_editor!"}, json_editor.element.getText())
            }
        }
    })
})()