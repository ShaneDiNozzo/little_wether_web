function loading(showOrHide) {
    setTimeout(function(){
        $.mobile.loading(showOrHide);
    }, 1);
}

function getCity() {
    var cityIn = document.getElementById('city_in').value;
    var url = "http://api.wunderground.com/api/0479c9ed433fc78e/geolookup/lang:HU/conditions/q/HU/" + cityIn + ".json";
    $('#main_cont').fadeOut(1000);
    $.getJSON(
        url,
        function(parsed_json) {
            var location = parsed_json['location']['city'];
            $('#loc').html(location);

            var temp_c = parsed_json['current_observation']['temp_c'];
            $('#temp').html(temp_c + "&degC");

            var imgicon = parsed_json['current_observation']['icon_url'];
            $('#wet_icon').attr('src', imgicon);

            var desc = parsed_json['current_observation']['weather'];
            $('#desc').html(desc);

            var wind_kph = parsed_json['current_observation']['wind_kph'];
            var wind_dir = parsed_json['current_observation']['wind_dir'];
            $('#wind').html("Szél: " + wind_dir.capitalize() + ", " + wind_kph + " km/h");

            var humidity = parsed_json['current_observation']['relative_humidity'];
            $('#humidity').html("Páratartalom: " + humidity);

            $('#main_cont').fadeIn(2000);

            //var imgkep = parsed_json['current_observation']['image']['url'];
            //var city_full = parsed_json['current_observation']['observation_location']['full'];
            //var co = parsed_json['current_observation']['display_location'];
            //var result = Object.keys(co);
            //alert(result);
        }
    );
}

function checkLocation() {
    $('#main_cont').fadeOut(1000);
    loading('show');
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

            var imgicon = parsed_json['current_observation']['icon_url'];
            $('#wet_icon').attr('src', imgicon);

            var desc = parsed_json['current_observation']['weather'];
            $('#desc').html(desc);

            var wind_kph = parsed_json['current_observation']['wind_kph'];
            var wind_dir = parsed_json['current_observation']['wind_dir'];
            $('#wind').html("Szél: " + wind_dir.capitalize() + ", " + wind_kph + " km/h");

            var humidity = parsed_json['current_observation']['relative_humidity'];
            $('#humidity').html("Páratartalom: " + humidity);

            loading('hide');
            $('#main_cont').fadeIn(2000);
        }
    );

    //$("#lat").html("Latitude: " + position.coords.latitude);
    //$("#long").html("Longitude: " + position.coords.longitude);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
