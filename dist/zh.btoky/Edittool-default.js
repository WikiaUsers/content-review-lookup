//define buttons　定義按鈕與下拉菜單
addEditButton("btnInterLink",{
	src        : "c/c0/Button_link.png",
	tagOpen    : "[[",
	sampleText : "链接标题",
	tagClose   : "]]",
	speedTip   : wgULS("内部链接","內部連結")
});
addEditButton("btnInterHashLink",{
	src        : "9/93/Button_sub_link.png",
	tagOpen    : wgULS("[[条目#","[[條目#"),
	sampleText : wgULS("章节|文本","章節|文本"),
	tagClose   : "]]",
	speedTip   : wgULS("内部段落链接","內部段落連結")
});
addEditButton("btnExtraLink",{
	src        : "7/73/External_link_icon.png",
	tagOpen    : "[",
	sampleText : "http://www.example.com 链接标题",
	tagClose   : "]",
	speedTip   : wgULS("外部链接（加前缀 http://）","外部連接（加前綴http://）")
});
addEditButton("btnTemplateLink",{
	src        : "9/97/Template_button.png",
	tagOpen    : "{{",
	sampleText : "模板名",
	tagClose   : "}}",
	speedTip   : wgULS("应用模板","應用模板")
});
addEditButton("btnCategory",{
	src        : "b/b4/Button_category03.png",
	tagOpen    : "[[Category:",
	sampleText : wgULS("分类名","分類名"),
	tagClose   : "]]",
	speedTip   : wgULS("分类","分類")
});
addEditButton("btnRedirect",{
	src        : "4/47/Button_redir.png",
	tagOpen    : "#REDIRECT [[",
	sampleText : wgULS("目标条目名","目標條目名"),
	tagClose   : "]]",
	speedTip   : "重定向"
});
addEditButton("btnImage",{
	src        : "f/f0/Image_icon.png",
	tagOpen    : "[[File:",
	sampleText : "Example.jpg",
	tagClose   : "]]",
	speedTip   : wgULS("嵌入图像","嵌入圖像")
});
addEditButton("btnNowiki",{
	src        : "8/82/Nowiki_icon.png",
	tagOpen    : "<nowiki>",
	sampleText : "插入非格式文本",
	tagClose   : "</nowiki>",
	speedTip   : "插入非格式文本"
});
addEditButton("btnSignature",{
	src        : "6/6d/Button_sig.png",
	tagOpen    : "—~~\~~",
	sampleText : "",
	tagClose   : "",
	speedTip   : wgULS("签名","簽名")
});
addEditButton("btnHeadline2",{
	src        : "e/e9/Button_headline2.png",
	tagOpen    : "== ",
	sampleText : "标题文字",
	tagClose   : " ==",
	speedTip   : wgULS("二级标题","二級標題"),
	action     : "lineInsert"
});
addEditButton("btnHr",{
	src        : "a/a4/H-line_icon.png",
	tagOpen    : "\n----\n",
	sampleText : "",
	tagClose   : "",
	speedTip   : wgULS("水平线","水平線")
});
addEditButton("btnBr",{
	src        : "1/13/Button_enter.png",
	tagOpen    : "<br />",
	sampleText : "",
	tagClose   : "",
	speedTip   : wgULS("换行","換行")
});
addEditButton("btnBold",{
	src        : "6/6f/Bold_icon.png",
	tagOpen    : "\'\'\'",
	sampleText : "粗体",
	tagClose   : "\'\'\'",
	speedTip   : wgULS("粗体","粗體")
});
addEditButton("btnItalic",{
	src        : "d/d7/Italic_icon.png",
	tagOpen    : "\'\'",
	sampleText : "斜体",
	tagClose   : "\'\'",
	speedTip   : wgULS("斜体","斜體")
});
addEditButton("btnStrike",{
	src        : "c/c9/Button_strike.png",
	tagOpen    : "<del>",
	sampleText : wgULS("删除线","刪除線"),
	tagClose   : "</del>",
	speedTip   : wgULS("删除线","刪除線")
});
addEditButton("btnBig",{
	src        : "5/56/Button_big.png",
	tagOpen    : "<span style='font-size:larger;'>",
	sampleText : "放大",
	tagClose   : "</span>",
	speedTip   : "放大"
});
addEditButton("btnSmall",{
	src        : "5/58/Button_small.png",
	tagOpen    : "<span style='font-size:smaller;'>",
	sampleText : wgULS("缩小","縮小"),
	tagClose   : "</span>",
	speedTip   : wgULS("缩小","縮小")
});
addEditButton("btnShift",{
	src        : "8/8e/Button_shifting.png",
	tagOpen    : ":",
	sampleText : "",
	tagClose   : "",
	speedTip   : wgULS("缩进","縮進"),
	action     : "lineInsert"
});
addEditButton("btnEnum",{
	src        : "8/88/Btn_toolbar_enum.png",
	tagOpen    : "#",
	sampleText : "",
	tagClose   : "",
	speedTip   : wgULS("数字列表","數字列表"),
	action     : "lineInsert"
});
addEditButton("btnList",{
	src        : "1/11/Btn_toolbar_liste.png",
	tagOpen    : "*",
	sampleText : "",
	tagClose   : "",
	speedTip   : wgULS("符号列表","符號列表"),
	action     : "lineInsert"
});
addEditButton("btnDefine",{
	src        : "d/d3/Button_definition_list.png",
	tagOpen    : "; ",
	sampleText : wgULS("释义","釋義") ,
	tagClose   : " : ",
	speedTip   : wgULS("定义文本","定義文本"),
	action     : "lineInsert"
});
addEditButton("btnColor",{
	src        : "1/1e/Button_font_color.png",
	tagOpen    : "<span style='color: ColorName;'>",
	sampleText : "彩色文本",
	tagClose   : "</span>",
	speedTip   : "彩色文本"
});
addEditButton("btnQuote",{
	src        : "f/fd/Button_blockquote.png",
	tagOpen    : "{\{quote|\n",
	sampleText : "引文",
	tagClose   : "\n}\}",
	speedTip   : wgULS("块引用","塊引用")
});
addEditButton("btnTable",{
	src        : "0/04/Button_array.png",
	tagOpen    : "\n{| border=\"1\" \n|- \n| 第一部分 || 第二部分 \n|- \n| 第三部分 || 第四部分",
	sampleText : "",
	tagClose   : "\n|}\n",
	speedTip   : "插入表格"
});
addEditButton("btnRef",{
	src        : "c/c4/Button_ref.png",
	tagOpen    : "<ref>",
	sampleText : wgULS("参考","參考"),
	tagClose   : "</ref>",
	speedTip   : wgULS("参考","參考")
});
addEditButton("btnRef2",{
	src        : "c/cf/Button_ref_adv.png",
	tagOpen    : "<ref name=''>",
	sampleText : wgULS("同项参考","同項參考"),
	tagClose   : "</ref>",
	speedTip   : wgULS("同项参考","同項參考"),
	width      : 12
});
addEditButton("btnReferences",{
	src        : "f/fe/Button_refs.png",
	tagOpen    : "\n==参考文献==\n<div class=\"references-small\">\n<references />\n</div>",
	sampleText : "",
	tagClose   : "",
	speedTip   : wgULS("参考文献区","參考文獻區")
});
delete __temp;


addDropdownMenu("articleEdit",wgULS("条目编辑","條目編輯"),[
	{
		id         : "elink",
		text       : wgULS("外部链接章节","外部連結章節"),
		tagOpen    : wgULS("\n==外部链接==\n* [", "\n==外部連結==\n* ["),
		sampleText : "网页地址 网页说明" ,
		tagClose   : "]\n"
	},
	{ 
		id         : "seealso",
		text       : wgULS("参见章节","參見章節"),
		tagOpen    : "\n==参见==\n* [[" ,
		sampleText : "参见地址" ,
		tagClose   : "]]\n"
	},
	{ 
		id         : "stub",
		text       : "小作品",
		tagOpen    : "\n{\{" ,
		sampleText : "" ,
		tagClose   : "小作品}\}"
	},
	{ 
		id         : "Disambig",
		text       : wgULS("消歧义","消歧義"),
		tagOpen    : "\n'''{{PAGENAME}}'''可以指：\n" ,
		sampleText : "* [[歧义1]]，描述1\n* [[歧义2]]，描述2" ,
		tagClose   : "\n{\{disambig}\}"
	},
	{ 
		id         : "otheruses",
		text       : wgULS("条目消歧义","條目消歧義"),
		tagOpen    : "{\{Otheruses|",
		sampleText : "条目名称|subject=本页主題描述|other=同名或類似名的其它條目描述",
		tagClose   : "}\}"
	},
	{
		id         : "inuse",
		text       : wgULS("正在编辑","正在編輯"),
		tagOpen    : "{\{Inuse}\}",
		sampleText : "",
		tagClose   : ""
	},
	{ 
		id         : "Current",
		text       : wgULS("正在发生","正在發生"),
		tagOpen    : "{\{Current}\}",
		sampleText : "",
		tagClose   : ""
	},
	{ 
		id         : "noconv",
		text       : wgULS("取消繁简转换","取消繁簡轉換"),
		tagOpen    : "-\{" ,
		sampleText : "不转换内容",
		tagClose   : "}\-"
	},
	{ 
		id         : "title",
		text       : wgULS("标题错误","標題錯誤"),
		tagOpen    : "-\{T|",
		sampleText : "正确标题名称",
		tagClose   : "}\-"
	},
	{ 
		id         : "noteTA",
		text       : wgULS("标题全文转换","標題全文轉換"),
		tagOpen    : "{\{noteTA\n",
		sampleText : "|T=zh:中;zh-hans:简体;zh-hant:繁體;zh-cn:大陆;zh-tw:台灣;zh-hk:香港;zh-sg:新马;\n|G1=公共组名\n|1=zh:中;zh-hans:简体;zh-hant:繁體;zh-cn:大陆;zh-tw:台灣;zh-hk:香港;zh-sg:新马;\n",
		tagClose   : "}\}"
	},
	{ 
		id         : "mergeto",
		text       : wgULS("合并本条目到","合併本條目到"),
		tagOpen    : "{\{mergeto|",
		sampleText : "合并本条目到的条目名称",
		tagClose   : "}\}"
	},
	{ 
		id         : "mergefrom",
		text       : wgULS("合并到本条目","合併到本條目"),
		tagOpen    : "{\{mergefrom|",
		sampleText : "需要合并到本条目的条目名称",
		tagClose   : "}\}"
	},
	{ 
		id         : "split",
		text       : wgULS("分拆条目","分拆條目"),
		tagOpen    : "{\{Split}\}",
		sampleText : "",
		tagClose   : ""
	},
	{ 
		id         : "translation",
		text       : wgULS("正在翻译","正在翻譯"),
		tagOpen    : "{\{subst:Translating/auto}\}",
		sampleText : "",
		tagClose   : ""
	},
	{             
		id         : "Unreferenced",
		text       : wgULS("缺少参考文献","缺少參考文獻"),
		tagOpen    : "{\{subst:Unreferenced/auto}\}",
		sampleText : "",
		tagClose   : ""
	},
	{ 
		id         : "lrm",
		text       : "LRM符",
		tagOpen    : "\u200E",
		sampleText : "",
		tagClose   : ""
	}
]);