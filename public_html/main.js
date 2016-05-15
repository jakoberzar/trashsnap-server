var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.056, lng: 14.7058},
        zoom: 8
    });
}


var entries = [];


$.get("/api/v1/entries", function(data) {
    console.log(data);
    var marker = [];
    data.forEach(function(f) {
        var trenutni = f;
        var mk = {
            position: {lat: trenutni.latitude, lng: trenutni.longitude},
            map: map,
            title: ""
        };
        var mark = new google.maps.Marker(mk)
        marker.push(mark);
        
        var address = ""; // get address
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + trenutni.latitude
                    + "," + trenutni.longitude + "&sensor=true";
        $.getJSON( url, function( json ) { //thanks for my data
            trenutni.address = json.results.length ? json.results[0].formatted_address : "";
        });
        console.log(trenutni.time);
        var time1 = trenutni.time.split(" ")[0].split("-");
        var date = time1[2] + "." + time1[1] + "." + time1[0];
        
        mark.addListener('click', function() {
            $("#slika").html("<img class='slika1' src='" + trenutni.imglink + "' >");
            $("#naslov").html(trenutni.address);
            $("#datum").html(date);
            $("#opis").html(f.text);
            $("#map").removeClass("col-md-12").addClass("col-md-9");
            $("#hi").css("visibility","visible");
        });
    });
});

$(document).ready(function() {
    $(".yolo").click(function() {
        $("#map").removeClass("col-md-9").addClass("col-md-12");
        google.maps.event.trigger(map, 'resize');
    });
});



