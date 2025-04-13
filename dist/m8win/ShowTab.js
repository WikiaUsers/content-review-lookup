<script>
	function showTab(tabId) {
		document.querySelectorAll('.content').forEach(content => {
			content.classList.remove('active');
		});
		document.querySelectorAll('.tab').forEach(tab => {
			tab.classList.remove('active');
		});
		document.getElementById(tabId).classList.add('active');
		document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
	}
</script>