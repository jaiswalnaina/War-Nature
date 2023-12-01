let barChart;
let pieChart;
let lineChart;
let doughnutChart;

function setup() {
  createCanvas(1, 1); // Dummy canvas, not used in this example
  noLoop();

  // Create bar chart
  barChart = new BarChart('barChart', [50, 120, 200, 80]);

  // Create pie chart
  pieChart = new PieChart('pieChart', [30, 40, 90, 60]);

  // Create line chart
  lineChart = new LineChart('lineChart', [30, 60, 90, 120]);

  // Create doughnut chart
  doughnutChart = new DoughnutChart('doughnutChart', [50, 80, 120, 40]);
}

function draw() {
  // Not used in this example
}

class BarChart {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    this.drawChart();
  }

  drawChart() {
    const canvas = createCanvas(300, 300);
    canvas.parent(this.id);

    let x = 50;
    const y = height - 50;

    for (let i = 0; i < this.data.length; i++) {
      fill(this.colors[i]);
      rect(x, y - this.data[i], 50, this.data[i]);
      x += 80;
    }
  }
}

class PieChart {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    this.drawChart();
  }

  drawChart() {
    const canvas = createCanvas(300, 300);
    canvas.parent(this.id);

    let angle = 0;

    for (let i = 0; i < this.data.length; i++) {
      fill(this.colors[i]);
      arc(width / 2, height / 2, 200, 200, angle, angle + radians(map(this.data[i], 0, 240, 0, 360)));
      angle += radians(map(this.data[i], 0, 240, 0, 360));
    }
  }
}

class LineChart {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.drawChart();
  }

  drawChart() {
    const canvas = createCanvas(300, 300);
    canvas.parent(this.id);

    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < this.data.length; i++) {
      let x = i * 80 + 50;
      let y = height - this.data[i] - 50;
      vertex(x, y);
    }
    endShape();
  }
}

class DoughnutChart {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    this.drawChart();
  }

  drawChart() {
    const canvas = createCanvas(300, 300);
    canvas.parent(this.id);

    let total = 0;
    for (let i = 0; i < this.data.length; i++) {
      total += this.data[i];
    }

    let angle = 0;

    for (let i = 0; i < this.data.length; i++) {
      fill(this.colors[i]);
      let sliceAngle = radians(map(this.data[i], 0, total, 0, 360));
      arc(width / 2, height / 2, 200, 200, angle, angle + sliceAngle);
      angle += sliceAngle;
    }

    noFill();
    ellipse(width / 2, height / 2, 120, 120);
  }
}
