var Feature = ol.Feature;
var Map = ol.Map;
var Point = ol.geom.Point;
var View = ol.View;

var CircleStyle= ol.style.Circle;
var Stroke = ol.style.Stroke;
var Style = ol.style.Style;

var OSM = ol.source.OSM;
var VectorSource = ol.source.Vector;

var TileLayer = ol.layer.Tile;
var VectorLayer = ol.layer.Vector;

var {easeOut} = ol.easing;
var {fromLonLat} = ol.proj;
var {getVectorContext} = ol.render;
var {unByKey} = ol.Observable;

    

const tileLayer = new TileLayer({
  source: new OSM({
    wrapX: false,
  }),
});

const source = new VectorSource({
  wrapX: false,
});
const vector = new VectorLayer({
  source: source,
});

const map = new Map({
  layers: [tileLayer, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 1,
    multiWorld: true,
  }),
});

function addRandomFeature() {
  const x = Math.random() * 360 - 180;
  const y = Math.random() * 170 - 85;
  const geom = new Point(fromLonLat([x, y]));
  const feature = new Feature(geom);
  source.addFeature(feature);
}

const duration = 3000;
function flash(feature) {
  const start = Date.now();
  const flashGeom = feature.getGeometry().clone();
  const listenerKey = tileLayer.on('postrender', animate);

  function animate(event) {
    const frameState = event.frameState;
    const elapsed = frameState.time - start;
    if (elapsed >= duration) {
      unByKey(listenerKey);
      return;
    }
    const vectorContext = getVectorContext(event);
    const elapsedRatio = elapsed / duration;
    // radius will be 5 at start and 30 at end.
    const radius = easeOut(elapsedRatio) * 25 + 5;
    const opacity = easeOut(1 - elapsedRatio);

    const style = new Style({
      image: new CircleStyle({
        radius: radius,
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, ' + opacity + ')',
          width: 0.25 + opacity,
        }),
      }),
    });

    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    // tell OpenLayers to continue postrender animation
    map.render();
  }
}

source.on('addfeature', function (e) {
  flash(e.feature);
});

window.setInterval(addRandomFeature, 1000);