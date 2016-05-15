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
            $("#naslov").html(f.text);
            $("#datum").html("Datum");
            $("#opis").html("Opis");
        });
    });
    console.log(data);
});

$(document).ready(function() {
    console.log("hi gays00");
    $(".yolo").click(function() {
        console.log("hi gays007");
        $("#hi").hide(1000);
    });
});



