let data;
let dots = [];
let tooltip;
let stopMovement = false;
let parallaxSpeeds = [1, 0.5, 0.2]; // Adjust these speeds for each layer

function preload() {
  // Load your CSV file here
  data = loadTable('IDMC_GIDD_Disasters_Internal_Displacement_Data/1_Disaster_Displacement_data-Table 1.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, 1800);
  noStroke();
  createDots();
  tooltip = createTooltip();
}

function draw() {
  background('#f0f0f0');
  moveDots();
  displayDots();
  checkHover();
  displayTooltip();
}

function createDots() {
    let hazardTypes = Array.from(new Set(data.getColumn('Hazard Type'))); // Get unique hazard types
  
    for (let hazardType of hazardTypes) {
      let filteredData = data.findRows(hazardType, 'Hazard Type');
      
      for (let i = 0; i < filteredData.length; i++) {
        let x = map(i, 0, filteredData.length - 1, 0, width - 50); // Adjust the range as needed
        let y = random(height);
        let color = getColorBasedOnHazardType(hazardType, filteredData[i].getNum('Disaster Internal Displacements (Raw)'));
        dots.push({ x, y, color, info: filteredData[i] });
      }
    }
  }

function moveDots() {
  for (let dot of dots) {
    if (!stopMovement) {
      // Randomly change both x and y coordinates
      dot.x += random(-2, 2);
      dot.y += random(-2, 2);


      // Wrap dots around the screen when they go out of bounds
      if (dot.x < 0) {
        dot.x = width;
      } else if (dot.x > width) {
        dot.x = 0;
      }

      if (dot.y < 0) {
        dot.y = height;
      } else if (dot.y > height) {
        dot.y = 0;
      }
    }
  }
}


function displayDots() {
  for (let dot of dots) {
    fill(dot.color);
    ellipse(dot.x, dot.y, 20, 20);
  }
}

function checkHover() {
  let hoveredDot = null;

  for (let dot of dots) {
    let d = dist(mouseX, mouseY, dot.x, dot.y);

    if (d < 10) {
      hoveredDot = dot;
      break;
    }
  }

  if (hoveredDot) {
    displayTooltip(hoveredDot);
    stopMovement = true; // Stop movement when hovering
  } else {
    hideTooltip();
    stopMovement = false; 
    hoveredDot = null; // Resume movement when not hovering
  }
}

function createTooltip() {
  let tooltip = createDiv('');
  tooltip.class('tooltip');

  // Create tooltiptext element
  let tooltiptext = createDiv('');
  tooltiptext.class('tooltiptext');
  tooltip.child(tooltiptext);

  return tooltip;
}

function hideTooltip() {
  tooltip.hide();
}

function displayTooltip(dot) {
  if (dot && typeof dot.info !== 'undefined' && typeof dot.info.getString === 'function' && typeof dot.x !== 'undefined' && typeof dot.y !== 'undefined') {
    tooltip.position(dot.x, dot.y);

    // Customize the columns you want to display in the tooltip
    let columnsToShow = ['Country / Territory', 'Hazard Type', 'Year', 'Disaster Internal Displacements (Raw)'];

    let tooltipContent = columnsToShow.map(column => {
      try {
        let columnValue = dot.info.getString(column);
        return `${column}: ${columnValue !== null ? columnValue : 'N/A'}`;
      } catch (error) {
        console.error(`Error accessing column '${column}' for dot:`, dot);
        return `${column}: N/A`;
      }
    }).join('<br>');

    // Set the tooltip content
    tooltip.child(0).html(tooltipContent);
    tooltip.show();
  } else {
    hideTooltip(); // Hide the tooltip if dot or its properties are undefined
  }
}





function getColorBasedOnHazardType(hazardType, displacement) {
    // Adjust the color values based on your specific criteria
    let baseColor;
    if (hazardType === 'Flood') {
      baseColor = color(224, 0, 0); // Red
    } else if (hazardType === 'Earthquake') {
      baseColor = color(224, 112, 0); // orange
    } else if (hazardType === 'Erosion') {
        baseColor = color(224, 224, 0); // yellowish
    } else if (hazardType === 'Drought') {
        baseColor = color(168, 224, 0); // Green
    } else if (hazardType === 'Extreme Temperature') {
        baseColor = color(0, 224, 0); // bright green
    } else if (hazardType === 'Mass Movement') {
        baseColor = color(0, 192, 120); // blue
    } else if (hazardType === 'Storm') {
        baseColor = color(0, 168, 192); // lightish blue
    } else if (hazardType === 'Volcanic activity') {
        baseColor = color(0, 48, 192); // darker blue
    } else if (hazardType === 'Wave action') {
        baseColor = color(144, 0, 192); // purple
    } else if (hazardType === 'Wildfire') {
        baseColor = color(192, 0, 72); // blueish
    } else {
      baseColor = color(0, 80, 160); // Blue
    }
  
    return baseColor;
  }