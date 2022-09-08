# Motion Aftereffect

## Motion aftereffect (Waterfall Illusion)

Fixate on the central cross during the motion and watch the cycle at least three times. Observe the motion aftereffect in the resting figure (the Buddha of Kamakura). [There is a more flashy version on the next page.] The “warping” caused by the motion aftereffect applies to anything you look at.

You may also try to cover one eye, adapt over ≈3 cycles and then test with the other eye (for this, you will need to stop the movie at the right point…). Well, how strong is your “interocular transfer”?

This is often explained in terms of “fatigue” of the class of neurons encoding one motion direction. It is, however, more accurate to interpret this in terms of adaptation or “gain control”. These motion detectors are, for humans, not in the retina but in the brain (Bach & Hoffmann 2000). [Michael Bach] (https://michaelbach.de/ot/mot-adapt/index.html)

For a more detailed explanation and a neat demo of the “waterfall effect” see [George Mather’s MAE page](http://www.georgemather.com/MotionDemos/MAEMP4.html).


{{< details title="Waterfall Illusion" open=false >}}
{{< highlight html >}}
{{</*p5-div sketch="/vc-showcase/sketches/waterfall-illusion.js"*/>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-div sketch="/vc-showcase/sketches/waterfall-illusion.js" >}}

{{< details title="Motion Aftereffect Code" open=false >}}
{{< highlight md >}}
{{</* p5-instance-div id="waterfall-ilusion" >}}
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

    p5.preload = function() {
        img = p5.loadImage("/vc-showcase/sketches/buddha.jpg");
    };

    p5.setup = function() {
        p5.createCanvas(400, 400);
        p5.frameRate(fr);
    };

    p5.draw = function() {
        p5.background(128);
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
            (2 * p5.PI * j) / angles,
            (2 * p5.PI * (j + 1)) / angles
        );
        p5.pop();
        }
        let ringpos = [];
        for (let i = 0; i < rings; i++) {
            cursize = (p5.frameCount * speed + (size / rings) * i) % size;
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
                (2 * p5.PI * j) / angles,
                (2 * p5.PI * (j + 1)) / angles
            );
            p5.pop();
            }
        }
        p5.fill(0, 0, 255);
        p5.circle(200, 200, 30);
        p5.fill(255, 0, 0);
        p5.rect(199, 192, 2, 16);
        p5.rect(192, 199, 16, 2);
        if (p5.frameCount % delayTime == 0) showImage = !showImage;
        if (showImage) {
            delayTime = 200;
            p5.image(img, 0, 0, 400, 400);
        } else {
            p5.noFill();
            p5.stroke(64);
            p5.strokeWeight(100);
            p5.circle(200,200, 500);
            delayTime = 400;
        }
    };
{{< /p5-instance-div */>}}
{{< /highlight >}}
{{< /details >}}
