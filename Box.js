let BOX = {
  "vertices": [
    [ 0.5,  0.5,  0.5],
    [ 0.5,  0.5, -0.5],
    [ 0.5, -0.5, -0.5],
    [ 0.5, -0.5,  0.5],
    [-0.5, -0.5,  0.5],
    [-0.5, -0.5, -0.5],
    [-0.5,  0.5, -0.5],
    [-0.5,  0.5,  0.5]
  ],
  "indices": [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 7], [1, 6], [2, 5], [3, 4]
  ]
};

function project3Dto2D(distance, vertex3D) {
  let vertex2D = [];
  let denom = 1 + vertex3D[3] / distance;

  vertex2D[0] = vertex3D[0] / denom;
  vertex2D[1] = vertex3D[1] / denom;

  return vertex3D;
}

function project2DtoCanvas(canvas, scale, vertex2D) {
  let vertexCanvas = [];
  let w2 = canvas.width  / 2;
  let h2 = canvas.height / 2;

  vertexCanvas[0] = vertex2D[0] *  scale + w2;
  vertexCanvas[1] = vertex2D[1] * -scale + h2;

  return vertexCanvas;
}

function drawBox(canvas, scale, distance, srt) {
  let mat = srt.toMatrix();
  let vertices3D = Matrix.mulMVs(mat, BOX.vertices);
  let verticesCanvas = [];
  for (let i = 0; i < vertices3D.length; i++)
    verticesCanvas[i] = project2DtoCanvas(
      canvas, scale, project3Dto2D(
        distance, vertices3D[i]
      )
    );
  let indices = BOX.indices;
  for (let i = 0; i < indices.length; i++) {
    let v0 = verticesCanvas[indices[i][0]];
    let v1 = verticesCanvas[indices[i][1]];
    canvas.line(v0[0], v0[1], v1[0], v1[1]);
  }
}
