function markerGen(md, map)
{
	var markerData=md.markers;
	for(var i=0; i < markerData.length; i++)
  	{
  		
  		mx=markerData[i].x;
  		my=markerData[i].y;
  		var m=new L.marker(map.unproject([mx,my],6),
			{
				icon: L.icon({iconUrl:"/wiki/Special:FilePath/"+markerData[i].icon,iconSize:md.iconSize,iconAnchor: md.ianchor, popupAnchor: md.panchor,}),
				title: markerData[i].name
			})
			m.addTo(map);
			m.on('mouseover',function(e){
				currentMarker=e.target;
			});
  		
  	}
	
}

function initMap(id)
{
	var md= mapData[$("#"+id).attr("data-map")];
	console.log(md)
	map = L.map(id,{
      			//scrollWheelZoom: 'center',
      			minZoom:md.bounds.minZoom,
				crs: L.CRS.Simple,
				gestureHandling: true,
				attributionControl: false,
				zoomControl: ($("#"+id).hasClass("nocontrol"))?false:true,
      		})
      		if(map.zoomControl)
      			map.zoomControl.setPosition('bottomright');
			L.tileLayer(md.tileUrl, {
      			continuousWorld: 'true',
      			errorTileUrl: md.errorTileUrl,
      			maxZoom: md.bounds.maxZoom,
			}).addTo(map);
			var bounds = L.latLngBounds(map.unproject(md.bounds.tl,md.bounds.maxZoom),map.unproject(md.bounds.br,md.bounds.maxZoom));
			map.setMaxBounds(bounds);
			map.setView(map.unproject(md.view,md.bounds.maxZoom), 1);
			if(!$("#"+id).hasClass("nomarkers"))
				markerGen(md,map);
				
			if($("#"+id).hasClass("nocontrol"))
			{
				map.dragging.disable();
				map.touchZoom.disable();
				map.doubleClickZoom.disable();
				map.scrollWheelZoom.disable();
				map.boxZoom.disable();
				map.keyboard.disable();
				
				if (map.tap) map.tap.disable();
			}
	
			//rectGen(map);
			//map.attributionControl.addAttribution("By <a target=\"blank\" href=\"http://digital-utopia.org\">Digital_Utopia</a> for <a target=\"blank\" href=\"http://fallout.wikia.com\">Nukapedia</a>");
			var zl;
			if($("#"+id).attr("data-zoom")!=undefined)
			{
				zl=$("#"+id).attr("data-zoom");
				if(zl > map.getMaxZoom())
					zl=map.getMaxZoom();
				if(zl < map.getMinZoom())
					zl=map.getMinZoom();
				map.setZoom(zl)
			}
			var multX = md.cellW/4096;
			var multY = md.cellH/4096;
			if($("#"+id).attr("data-posX")!=undefined && $("#"+id).attr("data-posX")!="")
			{
				if($("#"+id).attr("data-posY")!=undefined && $("#"+id).attr("data-posY")!="")
				{
					var posX=$("#"+id).attr("data-posX");
					var posY=$("#"+id).attr("data-posY");
					var finX = 65536+(posX*multX);
					var finY = 65536+((posY*multY)*-1);
					console.log(finX+" "+finY);
					map.setView(map.unproject([finX,finY],md.bounds.maxZoom), zl);
				}
			}
			if($("#"+id).attr("data-cellX")!=undefined && $("#"+id).attr("data-cellX")!="")
			{
				if($("#"+id).attr("data-cellY")!=undefined && $("#"+id).attr("data-cellY")!="")
				{
					var cellX=$("#"+id).attr("data-cellX");
					var cellY=$("#"+id).attr("data-cellY");
					var posX = (cellX*4096)+2048;
					var posY = (cellY*4096)+2048;
					var finX = 65536+(posX*multX);
					var finY = 65536+((posY*multY)*-1);
					var w = $("#"+id).width();
					var h = $("#"+id).height();
					var cellW=md.cellW;
					var cellH=md.cellH;
					var zt=6;
					while(cellW > w || cellH > h)
					{
						cellW/=2;
						cellH/=2;
						zt--;
					
					}
					map.setView(map.unproject([finX,finY],md.bounds.maxZoom), zt);
				}
			}
}