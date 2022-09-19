let originalImage;
let filtered;

let last_key;
let changed = true;

let mtx_ker = [
  [
    [0, 0, 0],
    [0, 1, 0],          // Identity
    [0, 0, 0]
  ],
  [
    [-1, -1, -1],
    [-1, 9, -1],        // Sharpen
    [-1, -1, -1]
  ]
]

function preload() {
    originalImage = loadImage("/vc-showcase/sketches/buddha.jpg");
    filtered = originalImage;
};

function setup() {
    frameRate(30);
    var canvas = createCanvas(400,400);
    canvas.parent("image-processing"); // same name as script
    
    fill(245, 123, 158);
    textSize(50);
    noLoop();
};

function draw() {
  clear();
  changed = false;
  background(128);
  image(filtered, 0, 0, 400, 400);
  text(key, 5, 55);


  // filtrado(matriz);
};
function checkered(height, width, amount) {
    
}

function keyPressed() {
    if (last_key != key) {
      if (key === "o"){
        filtered = originalImage
      }
      if (key === "1"){
        filtered = image_filtering(originalImage, mtx_ker[0], 400, 400, 4);
      }
      if (key === "2"){
        filtered = image_filtering(originalImage, mtx_ker[1], 400, 400, 4);
      }

      changed = true;
      last_key = key;
      print("REDRAW!");
      redraw();
    }

    /*if (key === "1") {
      filtrado([[-1, -1, -1 ], [ -1,  9, -1 ], [-1, -1, -1 ]])
    } else if (key === "2") {
      filtrado([[-1, -1, -1],[-1, 8, -1],[-1, -1, -1]])
    } else if (key === "3") {filter(originalImage, matrix);
      filtrado([[-2, -1, 0],[-1, 1, 1],[0, 1, 2]])
    }  else if (key === "6") {
      filtrado([[1/9, 1/9, 1/9],[1/9, 1/9, 1/9],[1/9, 1/9, 1/9]])
    }*/
};

function image_filtering(img, ker, w, h, channels = 4) {
  // Resize in order to reduce computing if needed
  img.resize(w, h);
  
  let img_mtx = image_to_matrix(img,channels);

  const ker_len = ker.length;
  const ker_offset = (ker_len-1)/2;

  // Empty final matrix
  let final_mtx = new Array();

  let newImg;
  let R, G, B;
  let r, g, b, a;
  // TODO Move to independent function (convolution)
  for (let i = 0; i < img_mtx.length; i++) {
    final_mtx[i] = new Array();
    for (let j = 0; j < img_mtx[0].length; j++) {
      R = 0;
      G = 0;
      B = 0;
      A = 0;
      if (!(i === 0 || i === (img_mtx.length-1) || j === (img_mtx[0].length-1) || j === 0)){
        for (kx = 0; kx < ker_len; kx++) {
          for (ky = 0; ky < ker_len; ky++) {
            let posy = i+ky-ker_offset;
            let posx = j+kx-ker_offset;
  
            r = img_mtx[posy][posx][0];
            g = img_mtx[posy][posx][1];
            b = img_mtx[posy][posx][2];
            a = img_mtx[posy][posx][3];
  
            R += ker[ky][kx] * r;
            G += ker[ky][kx] * g;
            B += ker[ky][kx] * b;
            A += ker[ky][kx] * a;
          }
        }
      }
      final_mtx[i][j] = [R, G, B, A];
      // newImg.set(x, y, color(R, G, B));
    }
  }
  newImg = matrix_to_image(final_mtx,channels);
  return newImg;
};

function image_to_matrix(img, channels = 3) {
  let w = img.width;
  let h = img.height;

  img.loadPixels();

  let pxs = img.pixels;
  let mtx = new Array();
  let idx;

  for (let i = 0; i < h; i++) {
    mtx[i] = new Array();
    for (let j = 0; j < w; j++) {
      idx = ((i * w) + j) * channels;
      mtx[i][j] = [];
      for (let k = 0; k < channels; k++) {
        mtx[i][j].push(pxs[idx + k]);
      }
    }
  }
  return mtx;
};

function matrix_to_image(mtx, channels = 3) {
  let img = createImage(mtx.length, mtx[0].length);
  let idx;
  img.loadPixels();
  print("Matrix Height: " + mtx[0].length);
  print("Matrix Width: " + mtx.length);
  print("Image Height: " + img.height);
  print("Image Width: " + img.width);
  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      idx = ((i * img.width) + j) * channels;
      for (let k = 0; k < channels; k++) {
        img.pixels[idx + k] = mtx[i][j][k];
      }
    }
  }
  img.updatePixels();
  return img;
};