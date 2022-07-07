var OSMPICKER = (function () {
	var app = {};

	var map;
	var marker;
	var circle;
	app.initmappicker = function (divName, lat, lon, r, option) {

		try {
			map = new L.Map(divName);
		} catch (e) {
			console.log(e);
		}
		var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
		var osm = new L.TileLayer(osmUrl, { minZoom: 1, maxZoom: 20, attribution: osmAttrib });
		map.setView([lat, lon], 10);
		map.addLayer(osm);
		if (!marker) {
			marker = new L.marker([lat, lon], { draggable: 'true' });
			circle = new L.circle([lat, lon], r, {
				weight: 2
			});
		} else {
			marker.setLatLng([lat, lon]);
			circle.setLatLng([lat, lon]);
		}

		marker.on('dragend', function (e) {
			circle.setLatLng(e.target.getLatLng());
			map.setView(e.target.getLatLng());
			$("#" + option.latitudeId).val(e.target.getLatLng().lat);
			$("#" + option.longitudeId).val(e.target.getLatLng().lng);
		});
		map.addLayer(marker);
		map.addLayer(circle);

		const provider = new GeoSearch.OpenStreetMapProvider();

		const search = new GeoSearch.GeoSearchControl({
			provider: provider,
			style: 'bar',
			autoComplete: true, // optional: true|false  - default true
			autoCompleteDelay: 250,
			showMarker: true, // optional: true|false  - default true
			showPopup: true, // optional: true|false  - default false
			marker: {
				// optional: L.Marker    - default L.Icon.Default
				icon: new L.Icon.Default(),
				draggable: true,
			},
			resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
			maxMarkers: 1, // optional: number      - default 1
			retainZoomLevel: false, // optional: true|false  - default false
			animateZoom: true, // optional: true|false  - default true
			autoClose: true, // optional: true|false  - default false
			searchLabel: 'Enter starting address', // optional: string      - default 'Enter address'
			keepResult: true, // optional: true|false  - default false
			updateMap: true, // optional: true|false  - default true
		});


		map.addControl(search);


		$("#" + option.latitudeId).val(lat);
		$("#" + option.latitudeId).on('change', function () {
			marker.setLatLng([Number($(this).val()), marker.getLatLng().lng]);
			circle.setLatLng(marker.getLatLng());
			map.setView(marker.getLatLng());
		});

		$("#" + option.longitudeId).val(lon);
		$("#" + option.longitudeId).on('change', function () {
			marker.setLatLng([marker.getLatLng().lat, Number($(this).val())]);
			circle.setLatLng(marker.getLatLng());
			map.setView(marker.getLatLng());
		});

		$("#" + option.radiusId).val(r);
		$("#" + option.radiusId).on('change', function () {
			circle.setRadius(Number($(this).val()));
		});

		$("#" + option.addressId).on('change', function () {
			var item = searchLocation($(this).val(), newLocation);
		});

		function newLocation(item) {
			$("#" + option.addressId).val(item.display_name);
			$("#" + option.longitudeId).val(item.lon);
			marker.setLatLng([item.lat, item.lon]);
			circle.setLatLng([item.lat, item.lon]);
			map.setView([item.lat, item.lon]);
		}

		function searchEventHandler(result) {
			$("#" + option.addressId).val(result.location['label']);
			$("#" + option.longitudeId).val(result.location['x']);
			$("#" + option.latitudeId).val(result.location['y']);
		}

		function dragEventHandler(result) {
			$("#" + option.longitudeId).val(result.location['lng']);
			$("#" + option.latitudeId).val(result.location['lat']);
		}

		map.on('geosearch/showlocation', searchEventHandler);

		map.on('geosearch/marker/dragend', dragEventHandler);
		/*
		var osmGeocoder = new L.Control.OSMGeocoder({
			collapsed: false,
			position: 'bottomright',
			text: 'Find!',
		});
		map.addControl(osmGeocoder);
		*/
	};

	function searchLocation(text, callback) {
		var requestUrl = "http://nominatim.openstreetmap.org/search?format=json&q=" + text;
		$.ajax({
			url: requestUrl,
			type: "GET",
			dataType: 'json',
			error: function (err) {
				console.log(err);
			},
			success: function (data) {
				console.log(data);
				var item = data[0];
				callback(item);
			}
		});
	};



	return app;
})();