<script>
<body>
function changeImage()
{
element=document.getElementById('myimage')
if (element.src.match("bulbon"))
  {
  element.src="https://images.wikia.nocookie.net/__cb20131115070718/carstoys/images/e/e3/Window2.png";
  }
else
  {
  element.src="https://images.wikia.nocookie.net/__cb20131115070623/carstoys/images/3/3a/Window1.png";
  }
}


<img id="myimage" onclick="changeImage()"
src="https://images.wikia.nocookie.net/__cb20131115070718/carstoys/images/e/e3/Window2.png" width="246" height="247">
</script>
</script>