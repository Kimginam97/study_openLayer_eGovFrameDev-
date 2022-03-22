window.onload = init;
var {fromLonLat} = ol.proj;
var {easeIn, easeOut} = ol.easing;

// 121.140.146.242:3004 
// 192.168.0.7:3004
var ServerUrl = "http://192.168.0.7:3004/MapPrimeServer/";

const gasanCenterCoordinate = [14124524.6573398,4505979.392707504]

function init(){
  // 광명,고양,서울,하남,안양 여행
  const gwangmyeong = fromLonLat([126.85303547914758,37.4716871056387]);
  const goyang = fromLonLat([126.8369382400014,37.66491386853102]);
  const seoul = fromLonLat([126.99339932816294,37.550805692378795]);
  const hanam = fromLonLat([127.20071493926748,37.522937982161714]);
  const anyang = fromLonLat([126.93213794851728,37.403110279673825]);

  const view = new ol.View({
      center: gasanCenterCoordinate,
      zoom: 12,
      // extent: [14121619.03579896, 4504446.840269455, 14127654.523695534, 4507460.079985201]
    });
  
  const map = new ol.Map({
    view: view,
	//layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
    target: 'map'
  })
  
  //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Style ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  
  // GasanCitiesStyle
  const gasanCitiesStyle = function(feature){
    let cityID = feature.get('ID');
    let cityIDString = cityID.toString();
    const styles = [
      new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: [255, 102, 204, 0.6]
          }),
          stroke: new ol.style.Stroke({
            color: [153, 51, 255, 1],
            width: 2
          }),
          radius: 12
        }),
        text: new ol.style.Text({
          text: cityIDString,
          scale: 1.5,
          fill: new ol.style.Fill({
            color: [0, 0, 0, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [232, 26, 26, 1],
            width:0.3
          })
        })
      })
    ]
    return styles
  }
  
  const styleForSelect = function(feature){
    let cityID = feature.get('ID');
    let cityIDString = cityID.toString();
    const styles = [
      new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: [40, 119, 247, 0.5]
          }),
          stroke: new ol.style.Stroke({
            color: [6, 125, 34, 1],
            width: 2
          }),
          radius: 12
        }),
        text: new ol.style.Text({
          text: cityIDString,
          scale: 1.5,
          fill: new ol.style.Fill({
            color: [87, 9, 9, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [87, 9, 9, 1],
            width:0.5
          })
        })
      })
    ]
    return styles
  }
  
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡBase Layersㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  
  // Openstreet Map Standard
  const openstreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),    
    visible: true,
    title: 'OSMStandard'
  })
  
  // Openstreet Map Humanitarian
  const openstreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OSMHumanitarian'
  })
  
  // CartoDB BaseMap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
      attributions: '© CARTO'
    }),
    visible: false,
    title: 'CartoDarkAll'
  })
  
  // StamenTerrain layer
  const StamenTerrain = new ol.layer.Tile({
	    source: new ol.source.XYZ({
	      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
	      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
	    }),
	    visible: false,
	    title: 'StamenTerrain'
	  })
  
  // Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetMapStandard, openstreetMapHumanitarian, cartoDBBaseLayer, StamenTerrain
    ]
  })
  map.addLayer(baseLayerGroup);
 
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  vectorLayer ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // geojson Layer
  const gasanCitiesLayer = new ol.layer.Vector({
	    source: new ol.source.Vector({
	      format: new ol.format.GeoJSON(),
	      url: 'resources/data/gasan.geojson'
	    }),
	    style: gasanCitiesStyle,
	    visible: true,
	    title: 'GasanCitiesLayer'
	  })
  

  // MapPrimeLayer
  const mapPrimeLayer = new ol.layer.Vector({
	    source: new ol.source.Vector({
	      format: new ol.format.GeoJSON(),
	      url: ServerUrl + 'map/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=mapprime:kgn_ctprvn&VERSION=1.0.0&MAXFEATURES=50&OUTPUTFORMAT=application/json',
	     
	    }),
	    visible: false,
	    title: 'MapPrimeLayer'
	  })
  
  // Raster Tile Layer Group
  const LayerGroup = new ol.layer.Group({
    layers:[
    	gasanCitiesLayer, mapPrimeLayer
    ]
  })
  
  map.addLayer(LayerGroup);
 
  //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  기능  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  
  // Map Features Click Logic
  const navElements = document.querySelector('.position-sticky');
  const cityNameElement = document.getElementById('imagename');
  const ImageElement = document.getElementById('image');
  const mapView = map.getView();

  map.on('singleclick', function(evt){
    map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
      let featureName = feature.get('맛집이름');
      let navElement = navElements.children.namedItem(featureName);      
	  mainLogic(feature, navElement);
    },{
        layerFilter: function(layerCandidate){
        	 return layerCandidate.get('title') ==='GasanCitiesLayer'
         
        }
     })
  })
  
  function mainLogic(feature, clickedAnchorElement){
	// Re-assign active class to the clicked element
    let currentActiveStyledElement = document.querySelector('.active');
    currentActiveStyledElement.className = currentActiveStyledElement.className.replace('nav-link active', 'nav-link');
    clickedAnchorElement.className = 'nav-link active';

    // Default style for all features
    let gasanCitiesFeatures = gasanCitiesLayer.getSource().getFeatures();
    gasanCitiesFeatures.forEach(function(feature){
      feature.setStyle(gasanCitiesStyle);
    })

	// Home logic
    if(clickedAnchorElement.id === '가산동'){ 
      mapView.animate({center: gasanCenterCoordinate}, {zoom: 15})
      cityNameElement.innerHTML  = 'Welcome to Gasan Digital Cities Food Map';
      ImageElement.setAttribute('src', 'resources/data/images/main_image.jpg');
    } 
    // Change view, and content in the menu based on the feature
    else{ 
    	feature.setStyle(styleForSelect) 	
		let featureCoordinates = feature.get('geometry').getCoordinates();
    	mapView.animate({center: featureCoordinates}, {zoom: 16})
    	
    	let featureName = feature.get('맛집이름');
    	let featureImage = feature.get('맛집이미지');
    	cityNameElement.innerHTML = '음식점 이름: ' + featureName
    	ImageElement.setAttribute('src', 'resources/data/images/' + featureImage + '.jpg');
    }

  }
   // Navigation Button Logic
  const anchorNavElements = document.querySelectorAll('.position-sticky > a');
  for(let anchorNavElement of anchorNavElements){
  	anchorNavElement.addEventListener('click', function(e){
  	
  	  let clickedAnchorElement = e.currentTarget;
      let clickedAnchorElementID = clickedAnchorElement.id;
      let gasanCitiesFeatures = gasanCitiesLayer.getSource().getFeatures();
      
 	  gasanCitiesFeatures.forEach(function(feature){
 	  	let featureCityName = feature.get('맛집이름');
        if(clickedAnchorElementID === featureCityName){
          mainLogic(feature, clickedAnchorElement);
        }
      })
      
      // Home Navigation Case
      if(clickedAnchorElementID === '가산동'){
        mainLogic(undefined, clickedAnchorElement)
      }
  	})
  }

  // Features Hover Logic
  const popoverTextElement = document.getElementById('popover-text');
  const popoverTextLayer = new ol.Overlay({
    element: popoverTextElement,
    positioning: 'bottom-center',
    stopEvent: false
  })
  map.addOverlay(popoverTextLayer);

  map.on('pointermove', function(evt){
    let isFeatureAtPixel = map.hasFeatureAtPixel(evt.pixel);
    if(isFeatureAtPixel){
      let featureAtPixel = map.getFeaturesAtPixel(evt.pixel);
      let featureName = featureAtPixel[0].get('맛집이름');
      
      popoverTextLayer.setPosition(evt.coordinate);
      popoverTextElement.innerHTML = featureName;
      
      map.getViewport().style.cursor = 'pointer';
      
    } else {
      popoverTextLayer.setPosition(undefined)
      map.getViewport().style.cursor = '';
    }
  })
  
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡradio checkbox 기능 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  
  // 라디오 기본레이어 기능
  const baseLayerElements = document.querySelectorAll('.form-check > input[type=radio]')
  for(let baseLayerElement of baseLayerElements){	  
	    baseLayerElement.addEventListener('change', function(){	    	
	      let baseLayerElementValue = this.value;      
	      baseLayerGroup.getLayers().forEach(function(element, index, array){
	    	  
	        let baseLayerName = element.get('title');
	        element.setVisible(baseLayerName === baseLayerElementValue) 
	        
	      })
	    })
	  }
 
 // 체크박스 지도서비스 기능
 const tileRasterLayerElements = document.querySelectorAll('.form-check > input[type=checkbox]');
 for(let tileRasterLayerElement of tileRasterLayerElements){
   tileRasterLayerElement.addEventListener('change', function(){
	   
     let tileRasterLayerElementValue = this.value;
     let tileRasterLayer;

     LayerGroup.getLayers().forEach(function(element, index, array){
       if(tileRasterLayerElementValue === element.get('title')){
         tileRasterLayer = element;
       }
     })
     
     this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false)
   })
 }
 
 // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ view animation ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

 // 바운스 기능
 function bounce(t) {
   const s = 7.5625;
   const p = 2.75;
   let l;
   if (t < 1 / p) {
     l = s * t * t;
   } else {
     if (t < 2 / p) {
       t -= 1.5 / p;
       l = s * t * t + 0.75;
     } else {
       if (t < 2.5 / p) {
         t -= 2.25 / p;
         l = s * t * t + 0.9375;
       } else {
         t -= 2.625 / p;
         l = s * t * t + 0.984375;
       }
     }
   }
   return l;
 }

 // 탄성기능
 function elastic(t) {
   return (
     Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1
   );
 }

 // 비행기능
 function flyTo(location, done) {
 	  const duration = 2000;
 	  const zoom = view.getZoom();
 	  let parts = 2;
 	  let called = false;
 	  
 	  function callback(complete) {
 	    --parts;
 	    if (called) {
 	      return;
 	    }
 	    if (parts === 0 || !complete) {
 	      called = true;
 	      done(complete);
 	    }
 	  }
 	  view.animate(
 	    {
 	      center: location,
 	      duration: duration,
 	    },
 	    callback
 	  );
 	  view.animate(
 	    {
 	      zoom: zoom - 1,
 	      duration: duration / 2,
 	    },
 	    {
 	      zoom: zoom,
 	      duration: duration / 2,
 	    },
 	    callback
 	  );
 	}

 // 클릭함수
 function onClick(id, callback) {
	  document.getElementById(id).addEventListener('click', callback);
	}

 // 여행로직
 function food_tour() {
 	  const locations = [gwangmyeong, goyang, seoul, hanam, anyang];
 	  let index = -1;
 	  
 	  function next(more) {
 	    if (more) {
 	      ++index;
 	      if (index < locations.length) {
 	        const delay = index === 0 ? 0 : 750;
 	        setTimeout(function () {
 	          flyTo(locations[index], next);
 	        }, delay);
 	      } else {
 	        alert('여행 완료');
 	      }
 	    } else {
 	      alert('여행 취소');
 	    }
 	  }
 	  next(true);
 	}
 
 	// 왼쪽회전 기능
 	onClick('rotate-left', function () {
	  view.animate({
	    rotation: view.getRotation() + Math.PI / 2,
	  });
	});

 	// 오른쪽회전 기능
	onClick('rotate-right', function () {
	  view.animate({
	    rotation: view.getRotation() - Math.PI / 2,
	  });
	});
	onClick('food_tour',food_tour);
	
	// 광명 (바운스) 기능
	onClick('bounce-to-gwangmyeong', function () {
		  view.animate({
		    center: gwangmyeong,
		    duration: 2500,
		    easing: bounce,
		  });
		});
 
	// 고양 (탄성) 기능
	onClick('elastic-to-goyang', function () {
		  view.animate({
		    center: goyang,
		    duration: 4000,
		    easing: elastic,
		  });
		});
	
	// 안양 회전 기능
	onClick('spin-to-anyang', function () {
		  // Rotation animation takes the shortest arc, so animate in two
			// parts
		  const center = view.getCenter();
		  view.animate(
			{
		      center: [
		        center[0] + (anyang[0] - center[0]) / 2,
		        center[1] + (anyang[1] - center[1]) / 2,
		      ],
		      rotation: Math.PI,
		      easing: easeIn,
		    },
		    {
		      center: anyang,
		      rotation: 2 * Math.PI,
		      easing: easeOut,
		    }
		  );
		});
	
	// 하남 비행 기능
	onClick('fly-to-hanam', function () {
		  flyTo(hanam, function () {});
		});
	
	// 서울 주위 회전
	onClick('rotate-around-seoul', function () {
		  // Rotation animation takes the shortest arc, so animate in two parts
		  const rotation = view.getRotation();
		  view.animate(
		    {
		      rotation: rotation + Math.PI,
		      anchor: seoul,
		      easing: easeIn,
		    },
		    {
		      rotation: rotation + 2 * Math.PI,
		      anchor: seoul,
		      easing: easeOut,
		    }
		  );
		});
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

}

