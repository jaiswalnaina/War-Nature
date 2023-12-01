let dataMap1 = [40, 30, 20, 10]; // Sample data for Map 1
let dataMap2 = [10, 20, 30, 40]; // Sample data for Map 2
let currentMap;

function setup() {
  createCanvas(windowWidth, windowHeight);
  selectMap('map1'); // Initial map
}

let map;

function setup() {
  createCanvas(800, 600);
  setupMap();
}

function draw() {
  // Your p5.js drawing code goes here
}

function setupMap() {
  // Create a Leaflet map centered at (0, 0) with zoom level 2
  map = L.map('map').setView([0, 0], 2);

  // Add a tile layer from OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Add a marker at a specific location (e.g., New York City)
  L.marker([40.7128, -74.0060]).addTo(map).bindPopup('New York City');
}

function draw() {
  background(0);
  // Draw background shapes or elements based on your design

  if (currentMap === 'map1') {
    drawMap('map1', dataMap1, width / 2, height / 2); // Draw Map 1
  } else if (currentMap === 'map2') {
    drawMap('map2', dataMap2, width / 2, height / 2); // Draw Map 2
  }

  // Add other visual elements or information based on your design
}

function drawMap(mapId, data, x, y) {
  // Your map drawing code goes here
  // Use data to draw shapes, lines, or points based on your data

  // Placeholder map drawing
  fill(255);
  ellipse(x, y, 200, 200);

  // Draw a bar chart based on the data
  let barWidth = 50;
  let barHeight;
  let xPos = mapId === 'map1' ? x - barWidth : x;
  
  for (let i = 0; i < data.length; i++) {
    barHeight = map(data[i], 0, max(data), 0, height / 2 - 50);
    fill(255);
    rect(xPos, height - barHeight - 30, barWidth, barHeight);
    xPos += barWidth + 10;
  }
}

function selectMap(map) {
  currentMap = map;

  // Remove 'selected' class from all buttons
  document.getElementById('map1Btn').classList.remove('selected');
  document.getElementById('map2Btn').classList.remove('selected');

  // Add 'selected' class to the clicked button
  document.getElementById(`${map}Btn`).classList.add('selected');
}

function changeMap(map) {
  selectMap(map);
  redraw(); // Redraw the canvas with the selected map
}
