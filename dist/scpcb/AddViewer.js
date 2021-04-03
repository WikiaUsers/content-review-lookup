///Easy .obj model viewer
///Use [[Template:Model Viewer]]

function addViewer(elem) {
   var canvas = document.createElement("canvas");
   canvas.width = elem.clientWidth;
   canvas.height = elem.clientHeight;
   elem.style.height = elem.clientHeight+"px";
   
   var imgs = elem.getElementsByTagName("img");
   var bgUrl = "";
   var txUrl = "";
   var cfIndex = 0;
   var cfQuery = "cloudfront.net/scpcb_gamepedia/";
   for (var j=0;j<imgs.length;j++) {
      if (imgs[j].alt=="texture") {
        txUrl=imgs[j].src;
        cfIndex = txUrl.indexOf(cfQuery);
        txUrl = "/media/"+txUrl.substring(cfIndex+cfQuery.length);
        console.log(txUrl);
      }
      if (imgs[j].alt=="background") { bgUrl=imgs[j].src; }
   }
   elem.innerHTML = "";
   elem.appendChild(canvas);

   var viewer = new JSC3D.Viewer(canvas);
   viewer.setParameter('SceneUrl', '/index.php?title='+elem.getAttribute("data-meshpath")+'&action=raw');
   viewer.setParameter('InitRotationX', parseFloat(elem.getAttribute("data-initpitch")));
   viewer.setParameter('InitRotationY', parseFloat(elem.getAttribute("data-inityaw")));
   viewer.setParameter('InitRotationZ', parseFloat(elem.getAttribute("data-initroll")));
   viewer.setParameter('ModelColor', '#FFFFFF');
   viewer.setParameter('BackgroundColor1', '#000000');
   viewer.setParameter('BackgroundColor2', '#000000');
   viewer.setParameter('RenderMode', 'texturesmooth');
   viewer.setParameter('Definition', 'standard');
   viewer.setParameter('Renderer', 'webgl');
   if (bgUrl!="") {
      viewer.setParameter('BackgroundImageUrl', bgUrl);
   } else {
      viewer.setParameter('Background','off');
   }
   viewer.init();
   viewer.update();
   viewer["txUrl"] = txUrl;

   viewer.onloadingcomplete = function() {
      var mat = new JSC3D.Material();
      mat.simulateSpecular = false;
      mat.diffuseColor = 0xffffff;
      mat.transparency = 0;
      this.scene.children[0].setMaterial(mat);

      this["tex"] = new JSC3D.Texture;
      this["tex"]["viewr"] = this;
      this["tex"].onready = function() {
         this.hasTransparency = false;
         this["viewr"].scene.children[0].setTexture(this);
         this["viewr"].update();
      };
      this["tex"].createFromUrl(this["txUrl"]);   
   }
}