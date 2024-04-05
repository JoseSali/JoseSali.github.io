// Function to create the map
function createMap(bikeStations) {
  // Define initial coordinates and zoom level
  let newYorkCoords = [40.73, -74.0059];
  let mapZoomLevel = 12;

  // Create the tile layer for the map background
  let lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  });

  // Create a    object to hold the lightmap layer
  let baseMaps = {
    "Light Map": lightmap
  };

  // Create the map object
  let map = L.map('map-id', {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap]
  });

  // Create a layer group for bike stations
  let bikeStationsLayer = L.layerGroup(bikeStations);

  // Add bike stations layer to the map
  bikeStationsLayer.addTo(map);

  // Create a layer control and add it to the map
  L.control.layers(baseMaps, {
    "Bike Stations": bikeStationsLayer
  }).addTo(map);
}

// Function to create markers for bike stations
function createMarkers(response) {
  // Retrieve stations data from the response
  let stations = response.data.stations;

  // Initialize an array to hold bike markers
  let bikeMarkers = [];

  // Loop through stations to create markers
  stations.forEach(station => {
    // Create marker for each station
    let marker = L.marker([station.lat, station.lon])
      .bindPopup(`<b>${station.name}</b><br>Capacity: ${station.capacity}`);

    // Add marker to bikeMarkers array
    bikeMarkers.push(marker);
  });

  // Call createMap function with bikeMarkers as argument
  createMap(bikeMarkers);
}

// Perform API call to Citi Bike station information endpoint
fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
  .then(response => response.json())
  .then(data => createMarkers(data));
