function getCity() {
    var cityIn = document.getElementById('city_in').value;
    var url = "http://api.wunderground.com/api/0479c9ed433fc78e/geolookup/lang:HU/conditions/q/HU/" + cityIn + ".json";

    $.getJSON(
        url,
        function(parsed_json) {
            var location = parsed_json['location']['city'];
            $('#loc').html(location);

            var temp_c = parsed_json['current_observation']['temp_c'];
            $('#temp').html(temp_c + "&degC");

            var imgkep = parsed_json['current_observation']['image']['url'];

            var imgicon = parsed_json['current_observation']['icon_url'];
            $('#img').attr('src', imgicon);

            var desc = parsed_json['current_observation']['weather'];
            $('#desc').html(desc);

            //var wind = parsed_json['current_observation']['wind_string'];
            //var city_full = parsed_json['current_observation']['observation_location']['full'];
            //var co = parsed_json['current_observation']['display_location'];
            //var result = Object.keys(co);
            //alert(result);
        }
    );
}

function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        $("#long").html("Geolocation is not supported by this browser.");
    }
}
    
function getPosition(position) {
    var url = "http://api.wunderground.com/api/0479c9ed433fc78e/geolookup/lang:HU/conditions/q/" +
        position.coords.latitude + "," + position.coords.longitude + ".json";
    $.getJSON(
        url,
        function(parsed_json) {
            var location = parsed_json['location']['city'];
            $('#loc').html(location);

            var temp_c = parsed_json['current_observation']['temp_c'];
            $('#temp').html(temp_c + "&degC");

            var imgkep = parsed_json['current_observation']['image']['url'];

            var imgicon = parsed_json['current_observation']['icon_url'];
            $('#img').attr('src', imgicon);

            var desc = parsed_json['current_observation']['weather'];
            $('#desc').html(desc);
        }
    );

    $("#lat").html("Latitude: " + position.coords.latitude);
    $("#long").html("Longitude: " + position.coords.longitude);
}