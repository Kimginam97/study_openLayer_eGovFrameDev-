window.onload = init;

function init(){
  const gasanCenterCoordinate = [14124524.6573398,4505979.392707504]
  const map = new ol.Map({
    view: new ol.View({
      center: gasanCenterCoordinate,
      zoom: 15,
      extent: [14121619.03579896, 4504446.840269455, 14127654.523695534, 4507460.079985201],    
  
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map'
  })
  
  
  // Gasan Cities GeoJSON
  const gasanCitiesStyle = function(feature){
    let cityID = feature.get('ID');
    let cityIDString = cityID.toString();
    const styles = [
      new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: [77, 219, 105, 0.6]
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
            color: [232, 26, 26, 1]
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
            color: [247, 26, 10, 0.5]
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

  const gasanCitiesLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'resources/data/gasan.geojson'
    }),
    style: gasanCitiesStyle
  })
  map.addLayer(gasanCitiesLayer);
  
  // Map Features Click Logic
  const navElements = document.querySelector('.position-sticky');
  const cityNameElement = document.getElementById('imagename');
  const ImageElement = document.getElementById('image');
  const mapView = map.getView();

  map.on('singleclick', function(evt){
    //console.log(evt.coordinate);
    map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
      let featureName = feature.get('맛집이름');
      let navElement = navElements.children.namedItem(featureName);      
	  mainLogic(feature, navElement);
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

	// Home Element : Change content in the menu to HOME
    if(clickedAnchorElement.id === '가산동'){ 
      mapView.animate({center: gasanCenterCoordinate}, {zoom: 15})
      cityNameElement.innerHTML  = 'Welcome to Gasan Digital Cities Food Map';
      ImageElement.setAttribute('src', 'resources/data/images/main_image.jpg');
    } 
    // Change view, and content in the menu based on the feature
    else{ 
    	feature.setStyle(styleForSelect) 	
		let featureCoordinates = feature.get('geometry').getCoordinates();
    	mapView.animate({center: featureCoordinates}, {zoom: 17})
    	
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
}

