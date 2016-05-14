var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.056, lng: 14.5058},
        zoom: 10
    });
}

$.get("/api/v1/entries", function(data) {
    for(var i = 0; i < data.length; i++) {
        var trenutni = data[i];
        var marker = new google.maps.Marker({
            position: {lat: trenutni.latitude, lng: trenutni.longitude},
            map: map,
            title: 'Hello World!'
        });
    }
    console.log(data);
})