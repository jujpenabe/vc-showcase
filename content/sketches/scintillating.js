  function setup() {
    createCanvas(400, 400);
    strokeWeight(3); // medium weight lines
    smooth(); // antialias lines
    noLoop();
  };

  function draw() {
    background(0);
    stroke(100, 100, 100); // dark grey colour for lines

    var step = 25;
    //vertical lines
    for (var x = step; x < width; x = x + step) {
      line(x, 0, x, height);
    }

    //horizontal lines
    for (var y = step; y < height; y = y + step) {
      line(0, y, width, y);
    }

    // Circles
    ellipseMode(CENTER);
    stroke(255, 255, 255); // white circles
    for (var i = step; i < width - 5; i = i + step) {
      for (var j = step; j < height - 15; j = j + step) {
        strokeWeight(6);
        point(i, j);
        strokeWeight(3);
      }
    }
  };
