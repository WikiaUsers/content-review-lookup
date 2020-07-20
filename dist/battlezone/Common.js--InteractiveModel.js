if(wgCategories.indexOf("Interactive Model") >= 0) {
    var TextureLoader = function (filename)
    {
        //var properURL = filename;
        //var httpRequest = new XMLHttpRequest();
        //httpRequest.open('GET', "http://battlezone.wikia.com/wiki/"+filename+"?action=raw", false);
        //httpRequest.send();
        //properURL = httpRequest.responseText
        //return THREE.ImageUtils.loadTexture(properURL);
        
        return THREE.ImageUtils.loadTexture("data:image/x-ms-bmp;base64,Qk08AAAAAAAAADYAAAAoAAAAAQAAAAEAAAABABAAAAAAAAYAAAASCwAAEgsAAAAAAAAAAAAAe29sAAAA");
    };
    
    function startRenderModel()
    {
        THREE.ImageUtils.crossOrigin = '';
          
        var containers = $(".modelviewer");
        $.each(containers,function(idx,elem){
            var $elem = $(elem);
            var modeldata = $elem.data('model');
            var container = elem;
            //var container = document.getElementById( 'modelhere' );
            var renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
            renderer.setClearColor(0xEEEEEE, 1.0);
            renderer.clear();
            window.camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 1, 10000);
            camera.position.x = 1; camera.position.y = 1; camera.position.z = 1;
            var cameraControls;
            cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
            cameraControls.target.set( 0, 0, 0);
            cameraControls.maxDistance = 400;
            cameraControls.minDistance = 10;
            cameraControls.noPan = true;
            cameraControls.update();
    
            var scene = new THREE.Scene();
    
            var ambientLight = new THREE.AmbientLight(0x888888);
            scene.add(ambientLight);
         
            var light = new THREE.SpotLight();
            light.castShadow = true;
            light.position.set( 170, 330, -160 );
            scene.add(light);



            var ApplySkin = function(geometry,skinData) {
                $.each(skinData.textures,function(idx,elem){
                    var name = elem.name;
                    var filename = elem.file;
                    $.ajax({
                        url: "http://battlezone.wikia.com/wiki/"+filename+"?action=raw",
                        dataType: "text",
                        success: function(data) {
                            var textureBase64 = data;
                            geometry.scene.traverse( function ( child ) {
                                if ( child instanceof THREE.Mesh ) {
                                    if(child.material != null && child.material.name == name) {
                                        //if(child.material.map.image != null) {
                                        //    if(child.material.map.image.src != textureBase64) {
                                        //        child.material.map.image.src = textureBase64;
                                        //        child.material.map.needsUpdate = true;
                                        //    }
                                        //}else{
                                            //if(child.material.map.sourceFile != textureBase64) {
                                                var imag = new Image();
                                                imag.src = textureBase64;
                                                child.material.map.image = imag;
                                                child.material.map.needsUpdate = true;
                                            //}
                                        //}
                                    }
                                }
                            });
                        }
                    });
                });
            };




            var loader = new THREE.ColladaLoader(TextureLoader);
            loader.load( "http://battlezone.wikia.com/wiki/"+modeldata.model+"?action=raw", function(geometry, materials ) {
                scene.add( geometry.scene );
         
                // T.P. adapted this to use un-flattened DAE hierarchy; see ColladaLoader.js
                // for more information
                /*var skin = geometry.scene.children[0].children[1].children[0];
                camera.lookAt(skin.position);
                if ( skin.geometry.animation ) {
                    THREE.AnimationHandler.add( skin.geometry.animation );
                    var animation = new THREE.Animation( skin, skin.geometry.animation.name );
                    // animation.loop = false;
                    animation.play();
                }*/
                
                var skinData = modeldata.skins[0];
                ApplySkin(geometry, modeldata.skins[0]);
                
                var skinList = $('<select style="position:absolute;top:2px;right:2px;"></select>');
                $.each(modeldata.skins,function(idx,elem){
                    skinList.append('<option value="'+idx+'">'+elem.name+'</option>');
                });
                $elem.append(skinList);
                //$.removeData($elem,'model'); // doesn't seem to be cleaning the dom, might need something more agressive
                
                skinList.change(function() {
                    var skinData = modeldata.skins[$(this).val()];
                    ApplySkin(geometry,skinData);
                });
            });
            
            renderer.render(scene, camera);
         
            function update() {
                requestAnimationFrame( update );
                /*var timer = Date.now() * 0.01;
                sphereGroup.rotation.y -= 0.002;
                smallSphere.position.set(
                    Math.cos( timer * 0.1 ) * 30,
                    Math.abs( Math.cos( timer * 0.2 ) ) * 20 + 5,
                    Math.sin( timer * 0.1 ) * 30
                );
                smallSphere.rotation.y = ( Math.PI / 2 ) - timer * 0.1;
                smallSphere.rotation.z = timer * 0.8;*/
                cameraControls.update();
                renderer.render(scene, camera);
            }
            
            update();
        });
    }

  window.colladaLoaded = function () {
    console.log("Collada Loader Ready");
    startRenderModel();
  }
  
  /*Loaded first layer of stack, load 2nd*/
  window.orbitcontrolsLoaded = function () {
    console.log("Orbit Controller Ready");
    importScriptPage('MediaWiki:Common.js/three.js/ColladaLoader.js','battlezone');
  }
  
  /*Loaded first layer of stack, load 2nd*/
  window.threejsLoaded = function () {
    console.log("Three.js Ready");
    importScriptPage('MediaWiki:Common.js/three.js/controls/OrbitControls.js','battlezone');
  }

  /*Start Loading 3D Stack*/
  //importScriptPage('MediaWiki:Common.js/three.js','battlezone');
  //importScriptPage('Loadables/Three.js', 'dev');
  $.getScript( "https:///ajax.googleapis.com/ajax/libs/threejs/r69/three.min.js", function() {
    if ($.isFunction(window.threejsLoaded)) {
      window.threejsLoaded();
    }
  });
}