// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
    let img;
    p.preload = function() {
        //img = p.loadImage("/vc-showcase/sketches/lenna.png");
        img = p.loadImage("/vc-showcase/sketches/buddha.jpg");
    };
    
    p.setup = function () {
      p.createCanvas(400, 400);
    };
  
    p.draw = function () {
      p.background(0);
      p.image(img, 0, 0, 400, 400);
    };
  }, "image-test");
  