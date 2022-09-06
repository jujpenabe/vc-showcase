new p5((p) => {
    let fr = 30;
    let img;
    let delayTime = 400;
    let size = 100;
    let angles = 12;
    let speed = 5;
    let anchor = 100;
    let rings = 12;
    let inverted = false;
    let exterior = false;
    let reversed = true;

    let showImage = false;
    p.preload = function() {
        img = p.loadImage("/vc-showcase/sketches/buddha.jpg");
    };

    p.setup = function() {
        p.createCanvas(400, 400);
        p.frameRate(fr);
    };

    p.draw = function () {
        p.background(255);
        p.fill(255);
        p.push();
        p.ellipse(200,200,100,100);
        p.arc(150, 55, 290, 290, 0, HALF_PI);
        p.ellipse(100,100, 100, 100);
        p.pop();
        p.image(img, 0, 0, 50, 50);
    };
}, "waterfall-illusion");
