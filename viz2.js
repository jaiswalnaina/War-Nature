let data;
let dots = [];
let allowMovement = true;
let titleHeight = 50;
let hoverText = 'Hover here';
let defaultText = 'Each dot represents an event caused by climate change ranging from 2008 to 2022.<br><br>An average of almost 3.2 million children get displaced every year due to climate change.<br><br>Hover over any dot to get more insights and details on the incident.';

function preload() {
  // Load your CSV file
  data = loadTable('File/1_Disaster_Displacement_data-Table 1.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth * 4.9 / 6, windowHeight);
  frameRate(60);

  let title = createP('Navigating New Realities: Showing Children Displaced due to Climate Change');
  title.style('font-size', '30px');
  title.style('text-align', 'center');
  title.style('color', '#f8fafa');
  title.style('font-family', 'Lato, sans-serif');
  title.position(width / 3, titleHeight / 4);

  // Shuffle the rows of the data
  shuffleArray(data.rows);

  // Create a maximum of 100 dots based on data
  for (let i = 0; i < min(150, data.getRowCount()); i++) {
    let x = random(width * 6 / 6);
    let y = map(i, 0, min(150, data.getRowCount()), titleHeight * 2, height);
    let dot = new Dot(x, y, data.getRow(i));
    dots.push(dot);
  }

  // Create text container for default state
  let defaultTextContainer = createDiv(defaultText);
  defaultTextContainer.parent('data-container');
  defaultTextContainer.style('font-size', '18px');
  defaultTextContainer.style('text-align', 'left');
  defaultTextContainer.style('color', '#f8fafa');
  defaultTextContainer.style('font-family', 'Lato, sans-serif');
  defaultTextContainer.id('default-text-container');
}


// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function draw() {
  background(0, 0, 0);

  // Move and draw rising tides
  for (let dot of dots) {
    if (allowMovement) {
      dot.move();
    }
    dot.display();
  }
}

function mouseMoved() {
  allowMovement = true; // Allow movement by default

  // Check if the mouse is over a dot
  let hovering = false;
  for (let dot of dots) {
    dot.checkHover();
    if (dot.hovered) {
      allowMovement = false; // Stop movement when hovering
      hovering = true;
    }
  }

  // Show/hide default text based on hover state
  let defaultTextContainer = select('#default-text-container');
  defaultTextContainer.style('display', hovering ? 'none' : 'block');
}

class Dot {
  constructor(x, y, rowData) {
    this.x = x;
    this.y = y;
    this.rowData = rowData;
    this.radius = 8;
    this.hovered = false;
    this.xSpeed = random(1, 1); // Random horizontal speed
    this.textContainer = null; // Store the text container reference
  }

  move() {
    // Move the dot horizontally
    this.x += this.xSpeed;

    // Wrap around when the dot goes off the right side of the canvas
    if (this.x > width * 6 / 6 + this.radius) {
      this.x = -this.radius;
    }
  }

  display() {
    fill(this.hovered ? color(255, 0, 0) : color(0, 0, 255));
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  checkHover() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    this.hovered = d < this.radius;

    if (this.hovered && !this.textContainer) {
      // Create text container only once when hovering starts
      this.textContainer = createDiv('');
      this.textContainer.parent('data-container');
      this.textContainer.style('font-size', '18px');
      this.textContainer.style('text-align', 'left');
      this.textContainer.style('color', '#f8fafa');
      this.textContainer.style('font-family', 'Lato, sans-serif');

      for (let column in this.rowData.obj) {
        let p = createP(`${column}: ${this.rowData.getString(column)}`);
        p.parent(this.textContainer);
      }
    } else if (!this.hovered && this.textContainer) {
      // Remove text container when hovering stops
      this.textContainer.remove();
      this.textContainer = null;
    }
  }
}
