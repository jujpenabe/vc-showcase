---
title: Home
type: docs
---

# Welcome

{{< hint info >}}
If you changed the repo name don't forget to update all the js related (both sketches and assets) urls.
{{< /hint >}}

## Image Test
{{< p5-div sketch="/vc-showcase/sketches/image-test.js" >}}
## Illusion 1

{{< details title="Waterfall Illusion" open=false >}}
{{< highlight html >}}
{{</*p5-div sketch="/vc-showcase/sketches/waterfall-illusion.js"*/>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-div sketch="/vc-showcase/sketches/waterfall-illusion.js" >}}

{{< p5-instance-div id="waterfall-ilusion" >}}
    let fr = 30;
    let img;
    let delayTime = 200;
    let size = 600;
    let angles = 12;
    let speed = 1;
    let anchor = 100;
    let rings = 12;

    let inverted = false;
    let exterior = false;
    let reversed = true;
    let showImage = false;

    p5.preload = function() {
        img = p5.loadImage("/vc-showcase/sketches/buddha.jpg");
    };

    p5.setup = function() {
        p5.createCanvas(400, 400);
        p5.frameRate(fr);
    };

    p5.draw = function() {
        p5.background(255);
        var cursize;
        p5.noStroke();
        for (let j = 0; j < angles; j++) {
            p5.push();
            if (j % 2 == 0) {
            if (exterior) p5.fill(255);
            else p5.fill(0);
            } else {
            if (exterior) p5.fill(0);
            else p5.fill(255);
        }
        p5.arc(
            200,
            200,
            size,
            size,
            (2 * PI * j) / angles,
            (2 * PI * (j + 1)) / angles
        );
        p5.pop();
        }
        let ringpos = [];
        for (let i = 0; i < rings; i++) {
            cursize = (frameCount * speed + (size / rings) * i) % size;
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
            p5.noStroke();
            p5.push();
            if (j % 2 == 0) {
                if (inverted) p5.fill(255);
                else p5.fill(0);
            } else {
                if (inverted) p5.fill(0);
                else p5.fill(255);
            }
            p5.arc(
                200,
                200,
                ringpos[i],
                ringpos[i],
                (2 * PI * j) / angles,
                (2 * PI * (j + 1)) / angles
            );
            p5.pop();
            }
        }
        p5.fill(0, 0, 255);
        p5.circle(200, 200, 30);
        p5.fill(255, 0, 0);
        p5.rect(199, 190, 2, 20);
        p5.rect(190, 199, 20, 2);
        if (frameCount % delayTime == 0) showImage = !showImage;
        if (showImage) {
            delayTime = 200;
            p5.image(img, 0, 0, 400, 400);
        } else delayTime = 400;
    };
{{< /p5-instance-div >}}

# P5 Test

