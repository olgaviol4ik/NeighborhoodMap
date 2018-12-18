export default function Map() {
  var map, list;
  var waterparks = [];
  var markersByWaterparkId = {};
  var markers = [];
  var largeInfowindow;


  this.setList = function (value) {
    list = value;
  };

  window.pullWaterparks = function (clear) {
    if (clear) {
      //against flickering while moving map
      clearMarkers();
    }
    var bounds = map.getBounds();
    var params = {
      topLeftLat: bounds.getNorthEast().lat(),
      topLeftLong: bounds.getNorthEast().lng(),
      bottomRightLat: bounds.getSouthWest().lat(),
      bottomRightLong: bounds.getSouthWest().lng()
    };
    var minPrice = document.getElementById("min-price").value;
    var maxPrice = document.getElementById("max-price").value;
    if (minPrice) {
      params.minPrice = minPrice;
    }
    if (maxPrice) {
      params.maxPrice = maxPrice;
    }
    let url = new URL("http://localhost:8080");
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (response) {
        if (response.waterparks) {
          waterparks = response.waterparks;
          createMarkers();
          list.setState({
            waterparks: waterparks.map(function (value) {
              value.marker = markersByWaterparkId[value._id];
              return value;
            })
          });
        }
      });
  };

  function pullYelpInfo(id, callback) {
    let url = "http://localhost:8080/yelp/?business=" + id;
    fetch(url, {
      method: "GET",
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (response) {
        callback(response);
      });
  }

  window.initMap = function () {
    var google = window.google;

    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5724142, lng: -123.1140619 },
      zoom: 8,
      mapTypeControl: false
    });
 
    google.maps.event.addListener(map, "idle", function () {
      window.pullWaterparks();

    });

    largeInfowindow = new google.maps.InfoWindow();


  };

  // The following group uses the location array to create an array of markers on initialize.
  function createMarkers() {
    var google = window.google;
    for (var i = 0; i < waterparks.length; i++) {
      var waterpark = waterparks[i];
      if (markersByWaterparkId[waterpark._id]) continue;
      // Get the position from the location array.
      var position = {
        lat: waterpark.lat,
        lng: waterpark.long
      };
      var title = waterpark.name;
      var defaultIcon = makeMarkerIcon('0091ff');
      var highlightedIcon = makeMarkerIcon('FFFF24');
     
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i,
        price: waterpark.price,
        yelpid: waterpark.yelpid,
        icon: defaultIcon, 
      });
      
      markers.push(marker); // Push the marker to our array of markers.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
      marker.setMap(map);
      markersByWaterparkId[waterpark._id] = marker;
      marker.addListener("click", function () {
        populateInfoWindow(this, largeInfowindow);
      });

    }
  }
  function makeMarkerIcon(markerColor){
    var markerImage = new window.google.maps.MarkerImage('http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2')
    return markerImage;
  }

  // This function populates the infowindow when the marker is clicked. 
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      let content = "<div>" +
        marker.title +
        "</div><div>Admission Price: $" +
        marker.price +
        "</div>";
      infowindow.setContent(content);
      pullYelpInfo(marker.yelpid, (response) => infowindow.setContent(content + '<div class="i-stars i-stars--large-' + response.rating.toString().replace(".5", "-half") + '">'));
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener("closeclick", function () {
        infowindow.marker = null;
      });
    }
  }
  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
      delete markers[i];
    }
    markers = [];
    markersByWaterparkId = {};
  }
  let script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRbQH4MCtwzV-gXSCVU0NwcP8qPJa2Z_I&v=3&callback=initMap";
  script.async = true;
  let scripts = document.getElementsByTagName("script")[0];
  scripts.parentNode.insertBefore(script, scripts);
}
