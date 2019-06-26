let canvas = new SimpleCanvas(document.body, 640, 480);

let box1 = new SRT();
box1.translateBy(-80, 50);
box1.scaleBy(100, 100, 100);

let box2 = new SRT();
box2.translateBy(100, -50);
box2.scaleBy(40, 80, 120);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function draw() {
  canvas.clear();

  let ax = getRandom(0, Math.PI/50);
  let bx = getRandom(0, Math.PI/50);
  let cx = getRandom(0, Math.PI/50);

  box1.rotateBy(ax, bx, cx);
  box2.rotateBy(ax, bx, cx);

  drawBox(canvas, 1, 10, box1);
  drawBox(canvas, 1, 10, box2);

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
