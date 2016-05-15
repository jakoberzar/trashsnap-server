var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.056, lng: 14.7058},
        zoom: 8
    });
}


var entries = [];


$.get("/api/v1/entries", function(data) {
    var marker = [];
    for(var i = 0; i < data.length; i++) {
        var trenutni = data[i];
        var mk = {
            position: {lat: trenutni.latitude, lng: trenutni.longitude},
            map: map,
            title: 'World! ' + [i]
        };
        var mark = new google.maps.Marker(mk)
        marker.push(mark);
        //console.log(marker[i].title);
        //var naslov = marker[i].title;
        
        mark.addListener('click', function() {
            $("#slika").html("<img class='slika1' src='" + trenutni.imglink + "' >");
            $("#naslov").html("FUCK YOU " + mk.text);
            $("#datum").html("Datum");
            $("#opis").html("Opis");
        });
    }
    
    data.forEach(function(f) {
        var trenutni = f;
        var mk = {
            position: {lat: trenutni.latitude, lng: trenutni.longitude},
            map: map,
            title: 'World! ' + f.text
        };
        var mark = new google.maps.Marker(mk)
        marker.push(mark);
        //console.log(marker[i].title);
        //var naslov = marker[i].title;
        
        mark.addListener('click', function() {
            $("#slika").html("<img class='slika1' src='" + trenutni.imglink + "' >");
            $("#naslov").html("FUCK YOU " + f.text);
            $("#datum").html("Datum");
            $("#opis").html("Opis");
        });
    });
    console.log(data);
})

