<script>
/*
test
*/
function testAl()
{
	alert("test");
	return false;
}

/*
テンプレート一覧の取得
*/
function getTemplateList()
{
	var params = {
		namespace : "template"
	};

	getArticles(params);
}


/*
 ArticleApi
*/
function getArticles(params)
{
	var articleUrl = "http://ja.healthygamelife.wikia.com/api/v1/Articles/List?expand=1";

	data = "";
	for(var key in params){
		data += "&" + key + "=" + params[key];
	}

	$.ajax({
		type: "GET",
		url: articleUrl,
		data: params,
		dataType: "json",
		timeout: 10000,
		success: function(response){
			alert(response);
		}
	});

}
</script>