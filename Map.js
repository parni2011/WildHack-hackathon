
    const map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let marker;

    var myIcon = L.icon({   
        iconUrl: 'images/red_marker.png',
        iconSize: [40, 40],
    }); 
    var lastMarker = null;  
    function AddMyMarker(lat, lng) {
        if(lastMarker) {
            map.removeLayer(lastMarker);
        }
        var singleMarker = L.marker([lat, lng], { icon: myIcon, draggable: true });
        var popup = singleMarker.bindPopup('You are here at ' + singleMarker.getLatLng()).openPopup()
        popup.addTo(map);
        lastMarker = singleMarker;
    }
    const lat_value = document.getElementById("latitude");
    const long_value = document.getElementById("longitude");
    document.getElementById("userLocation").addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            map.setView([lat, lon], 10);

            if (marker) map.removeLayer(marker);

            AddMyMarker(lat, lon);

            lat_value.value = lat;
            long_value.value = lon;
        });
    });

    // Search by entered lat/lon
    document.getElementById("searchLocation").addEventListener("click", () => {
        const lat = parseFloat(lat_value.value);
        const lon = parseFloat(long_value.value);

        if (!isNaN(lat) && !isNaN(lon)) {

            map.setView([lat, lon], 10);

            if (marker) map.removeLayer(marker);

            AddMyMarker(lat, lon);
        }
    });

    map.on('click', function(e) {
    const lat = e.latlng.lat;
    lat_value.value = lat;
    const lng = e.latlng.lng;
    long_value.value = lng;
    AddMyMarker(lat, lng);
}); 


async function loadWildlife() {
    const response = await fetch("http://127.0.0.1:5000/wildlife");
    const data = await response.json();

    data.forEach(record => {
        L.marker([record.lat, record.long])
            .addTo(map)
            .bindPopup(`
                <b>${record.species}</b><br>
                Country: ${record.country}<br>
                Year: ${record.year}<br>
                Status: ${record.status}
            `);
    });
}

loadWildlife();