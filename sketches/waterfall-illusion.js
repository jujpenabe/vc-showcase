new p5((p) => {
    let fr = 30;
    let img;
    let delayTime = 200;
    let size = 560;
    let angles = 12;
    let speed = 2;
    let anchor = 100;
    let rings = 14;

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

    p.draw = function() {
        p.background(128);
        var cursize;
        p.noStroke();
        for (let j = 0; j < angles; j++) {
            p.push();
            if (j % 2 == 0) {
            if (exterior) p.fill(255);
            else p.fill(0);
            } else {
            if (exterior) p.fill(0);
            else p.fill(255);
        }
        p.arc(
            200,
            200,
            size,
            size,
            (2 * p.PI * j) / angles,
            (2 * p.PI * (j + 1)) / angles
        );
        p.pop();
        }
        let ringpos = [];
        for (let i = 0; i < rings; i++) {
            cursize = (p.frameCount * speed + (size / rings) * i) % size;
            if (cursize == 0) {
            inverted = !inverted;
            exterior = !exterior;
            }
            if (reversed) cursize = size - cursize;
            ringpos[i] = cursize;
        }
        ringpos.sort(function (a, b) {
            return b - a;
        });
        for (let i = 0; i < rings; i++) {
            inverted = !inverted;
            for (let j = 0; j < angles; j++) {
            p.noStroke();
            p.push();
            if (j % 2 == 0) {
                if (inverted) p.fill(255);
                else p.fill(0);
            } else {
                if (inverted) p.fill(0);
                else p.fill(255);
            }
            p.arc(
                200,
                200,
                ringpos[i],
                ringpos[i],
                (2 * p.PI * j) / angles,
                (2 * p.PI * (j + 1)) / angles
            );
            p.pop();
            }
        }
        p.fill(0, 0, 255);
        p.circle(200, 200, 30);
        p.fill(255, 0, 0);
        p.rect(199, 192, 2, 16);
        p.rect(192, 199, 16, 2);
        if (p.frameCount % delayTime == 0) showImage = !showImage;
        if (showImage) {
            delayTime = 200;
            p.image(img, 0, 0, 400, 400);
        } else {
            p.noFill();
            p.stroke(64);
            p.strokeWeight(100);
            p.circle(200,200, 500);
            delayTime = 400;
        }
    };
}, "waterfall-illusion");
