var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.056, lng: 14.5058},
        zoom: 10
    });
}


var entries = [];


$.get("/api/v1/entries", function(data) {
    for(var i = 0; i < data.length; i++) {
        var trenutni = data[i];
        var marker = new google.maps.Marker({
            position: {lat: trenutni.latitude, lng: trenutni.longitude},
            map: map,
            title: ' World!'
        });
        entries.push(marker);
        /**marker.addListener('click', function() {
            map.setCenter(marker.getPosition());
            
        });
        **/
    }
    console.log(data);
})