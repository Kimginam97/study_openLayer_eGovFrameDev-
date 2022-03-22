$(function(){
	
	baseMap = new ol.layer.Tile({
		source: new ol.source.XYZ({
			url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		})
	});
	
	olview = new ol.View({
		center: ol.proj.transform([127.07411741084566, 37.15886078613144], 'EPSG:4326', 'EPSG:3857'),
		zoom: 7,
        minZoom: 1,
        maxZoom: 18
	});

	map = new ol.Map({
		target: 'map',
		layers: [baseMap],
		interactions: ol.interaction.defaults({
		}),
		view: olview,
		controls: ol.control.defaults({
			attribution: false
		})
	});
});