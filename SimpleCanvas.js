class SimpleCanvas {
  constructor(element, width, height) {
    this.canvas = document.createElement('canvas');
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
    element.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.lineColor(255, 255, 255);
    this.clearColor(0, 0, 0);
    this.clear();
  }

  clearColor(r, g, b) {
    this.ctx.fillStyle = "rgb("+ r +", "+ g +", "+ b +")";
  }

  lineColor(r, g, b) {
    this.ctx.strokeStyle = "rgb("+ r +", "+ g +", "+ b +")";
  }

  clear() {
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  line(x0, y0, x1, y1) {
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }

}
