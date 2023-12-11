let dots = [];
const numDots = 700;
const dotSize = 15;
const colors = '#9E8472';
const popupPaddingX = 20;
const popupPaddingY = 40;
let dataset;
let allowMovement = true;
let hoveredDot = null;
let currentYearIndex = 0;

// Dynamically create and append the banner element
const banner = document.createElement('div');


function preload() {
    console.log('Attempting to load CSV file...');
    dataset = loadTable('File/1_Disaster_Displacement_data-Table 1.csv', 'csv', 'header', function() {
      console.log('CSV file loaded:', dataset.getRowCount(), 'rows');
    });
  }
  

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Populate dots array with data from CSV
  for (let i = 100; i < numDots; i++) {
    let dot = createDot();
    dot.y += 50; // Add a padding of 50 pixels from the top
    dots.push(dot);
  }

  // Dynamically create and append the banner element
  const banner = document.createElement('div');
  banner.id = 'banner';
  document.body.appendChild(banner);

  // Create and set up the title element
  const title = document.createElement('h1');
  title.innerText = 'Rising Navigating New Realities: Showing Children Displaced by Climate Change';
  banner.appendChild(title);
}

function draw() {
    console.log('Drawing...');
    background('#4C392D');

 

    for (let i = 0; i < dots.length; i++) {
      if (allowMovement) {
        moveDot(dots[i]);
      }
      displayDot(dots[i]);

        // Check for mouse hover
  hoveredDot = null; // Reset hoveredDot
  for (let i = 0; i < dots.length; i++) {
    if (isMouseOver(dots[i])) {
      allowMovement = false;
      hoveredDot = dots[i];
      break; // Exit the loop when a dot is hovered over
    }
  }
    
  if (!hoveredDot) {
    allowMovement = true;
  }

  // Display popup if a dot is hovered over
  if (hoveredDot) {
    displayPopup(hoveredDot);
    }
  }
} 
function createDot() {
  let row = int(random(dataset.getRowCount()));
  let x = dataset.getNum(row, 'Year');
  let y = dataset.getNum(row, 'Disaster Internal Displacements (Raw)')+50;
  let year = dataset.getNum(row, 'Year');
  let raw = dataset.getNum(row, 'Disaster Internal Displacements (Raw)');
  let label = dataset.getString(row, 'Hazard Type');
  let eventName = dataset.getString(row, 'Event Name'); // Retrieve event name

  y += 50;
  
  
  currentYearIndex++;

  console.log('Loaded Dot Data:', { x, y, label, eventName }); // Log data for debugging

  return {
    x: x,
    y: y,
    year: year,
    raw: raw,
    speed: random(8,10),
    color: '#9E8472',
    label: label,
    eventName: eventName, // Store event name in the dot object
  };
}

function moveDot(dot) {
  dot.x += dot.speed; // Move dots horizontally (optional)

  // Reset dot if it goes beyond the canvas height
  if (dot.x > windowWidth) {
    console.log('Dot reached bottom; resetting.');

    dot.y = random(width);
    dot.x = random(height);
    dot.color = '#9E8472';
  }
}

function displayDot(dot) {
  fill(dot.color);
  noStroke();
  ellipse(dot.x, dot.y, dotSize, dotSize);
}

function isMouseOver(dot) {
  let d = dist(mouseX, mouseY, dot.x, dot.y);
  return d < dotSize / 2;
}

function displayPopup(dot) {
    // Set styles
    fill(255);
    stroke(0);
    strokeWeight(1);
    // Add background color, rounded corners, and drop shadow
    let popupWidth = textWidth(`Event Name: ${dot.eventName}`) + popupPaddingX;
    let popupHeight = textAscent() * 4 + popupPaddingY;
    let borderRadius = 10;
    let shadowDistance = 0;
  
    // Draw the popup background
    fill(0, 50); // Adjust the alpha value for the drop shadow
      rect(
        mouseX + 10 ,
        mouseY - popupHeight + 10 ,
        popupWidth,
        popupHeight,
        borderRadius
      );
    
  
   // Draw the actual popup
  fill(255);
  noStroke();
  rect(
    mouseX + 10 - shadowDistance,
    mouseY - popupHeight - shadowDistance,
    popupWidth,
    popupHeight,
    borderRadius
  );
  
     // Title styles
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(20); // Larger font size for the title

   let x = dot.x;
   let y = dot.y - 50; // Adjust for the top padding

    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
  
    // Display additional information
    text(`Hazard Type: ${dot.label}`, mouseX + 20, mouseY - popupHeight + 20);
    text(`Event Name: ${dot.eventName}`, mouseX + 20, mouseY - popupHeight + 60); // Added line for event name
    text(`Year: ${dot.year}`, mouseX + 20, mouseY - popupHeight + 100);
    text(`Children Displaced: ${dot.raw}`, mouseX + 20, mouseY - popupHeight + 140);
  }
