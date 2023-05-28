<script type="text/javascript">
VK.Api.call('share.get', {user_ids: 51991174, fields: 'bdate'}, function(r) {
if(r.response) {
alert(r.response[0].bdate);
}
});
</script>