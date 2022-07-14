let markers = [];
let maps = [];
function initMap() {

    map = new google.maps.Map(document.getElementById("start_map"), {
        center: { lat: 23.5154183, lng: 80.3135954 },
        zoom: 4,
        mapTypeId: "roadmap",
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });

    endMap = new google.maps.Map(document.getElementById("end_map"), {
        center: { lat: 23.5154183, lng: 80.3135954 },
        zoom: 4,
        mapTypeId: "roadmap",
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });

    maps.push(map, endMap);

    maps.forEach(function (element, index) {
        // Create the search box and link it to the UI element.
        const card = document.getElementById("pac-card-" + index);

        const input = document.getElementById("pac-input-" + index);
        const searchBox = new google.maps.places.SearchBox(input);
        element.controls[google.maps.ControlPosition.TOP_CENTER].push(card);
        // Bias the SearchBox results towards current map's viewport.
        element.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });

        // custom control for selecting existing checkpoints
        // $("#existing_checkpoints").show();
        // const checkpointControlDiv = document.createElement("div");
        // checkpointControl(checkpointControlDiv, map);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(checkpointControlDiv);

        var infowindow_content = document.getElementById("infowindow-content-" + index);
        infowindow = new google.maps.InfoWindow({
            content: infowindow_content
        });

        const places_service = new google.maps.places.PlacesService(map);

        element.addListener("click", (event) => {

            if ('placeId' in event) {
                event.stop();

                const request = {
                    placeId: event.placeId,
                    fields: ["name", "formatted_address", "rating", "geometry"],
                };

                places_service.getDetails(request, (response, status) => {

                    var marker = add_marker(
                        position = response.geometry.location,
                        address = response.formatted_address,
                        title = response.name
                    );

                    google.maps.event.trigger(marker, 'click');

                    // infowindow.open(map, marker);
                });
            }
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            clear_markers();

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    return;
                }

                // if (place.types.includes('gas_station')) {
                //     var icon = {
                //         url: "../static/images/temp.png",
                //         scaledSize: new google.maps.Size(18, 18), // scaled size
                //         origin: new google.maps.Point(0, 0), // origin
                //         anchor: new google.maps.Point(0, 0) // anchor
                //     }
                // }
                // else {
                //     var icon = {
                //         url: "../static/images/temp.png",
                //         scaledSize: new google.maps.Size(18, 18), // scaled size
                //         origin: new google.maps.Point(0, 0), // origin
                //         anchor: new google.maps.Point(0, 0) // anchor
                //     }
                // }

                // const marker = new google.maps.Marker({
                //     position: place.geometry.location,
                //     map: map,
                //     // icon: icon,
                //     // label: 'A'
                // });

                // const icon = {
                //     url: place.icon,
                //     size: new google.maps.Size(71, 71),
                //     origin: new google.maps.Point(0, 0),
                //     anchor: new google.maps.Point(17, 34),
                //     scaledSize: new google.maps.Size(25, 25),
                // };

                // Create a marker for each place.
                // const contentString =
                //     '<div id="content">' +
                //     '<div id="siteNotice">' +
                //     "</div>" +
                //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
                //     '<div id="bodyContent">' +
                //     "<p><b>Hello World</b></p>" +
                //     "</div>" +
                //     "</div>";
                // var infowindow_content = document.getElementById("infowindow-content");
                // const infowindow = new google.maps.InfoWindow({
                //     content: infowindow_content
                // });
                // const infowindow = new google.maps.InfoWindow({
                //     content: contentString,
                // });

                add_marker(
                    position = place.geometry.location,
                    address = place.formatted_address,
                    title = place.name,
                    map = element
                );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            element.fitBounds(bounds);
        });
    });
}

function clear_markers() {
    $('#pac-input').val("")
    // Clear out the old markers.
    markers.forEach((marker) => {
        marker.setMap(null);
    });
    markers = [];
}

function add_marker(position, address, title, map) {

    if (!position.lat || !position.lng) {
        return;
    }

    var marker = new google.maps.Marker({
        map,
        // icon,
        title: title,
        position: position,
        address: address,
        // rating: place.rating
    });

    marker.addListener("click", () => {
        var checkpoint_name = address ? (title + ', ' + address) : title;

        infowindow.close();
        $(infowindow.content).find(".title").text(title);
        $(infowindow.content).find(".address-line").text(address);
        $(infowindow.content).find("input[name='checkpoint_name']").val(checkpoint_name);
        $(infowindow.content).find("input[name='latitude']").val(position.lat);
        $(infowindow.content).find("input[name='longitude']").val(position.lng);
        infowindow.open(map, marker);
    });

    // Hacky but only way out. This fetches the div name.
    if (map['__gm']['div']['id'] == "start_map") {
        $("#start_location_name").val(address)
        $("#start_location_lat").val(position.lat)
        $("#start_location_long").val(position.lng)
    }
    else {
        $("#end_location_name").val(address)
        $("#end_location_lat").val(position.lat)
        $("#end_location_long").val(position.lng)
    }

    markers.push(
        marker
    );

    return marker;
}