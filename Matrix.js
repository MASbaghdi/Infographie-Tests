class Matrix {
  static identity() {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }

  static mulMM(mat1, mat2) {
    let mat3 = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let p = 0;
        for (let k = 0; k < 4; k++) {
          p += mat1[i][k] * mat2[k][j];
        }
        mat3[i][j] = p;
      }
    }
    return mat3;
  }

  static mulMV(mat, vec1) {
    if (!vec1[3]) vec1[3] = 1;
    let vec2 = [];
    for (let i = 0; i < 4; i++) {
      let p = 0;
      for (let k = 0; k < 4; k++) {
        p += mat[i][k] * vec1[k];
      }
      vec2[i] = p;
    }
    return vec2;
  }

  static mulMVs(mat, vecs1) {
    let vecs2 = [];
    for (let i = 0; i < vecs1.length; i++)
      vecs2[i] = Matrix.mulMV(mat, vecs1[i]);
    return vecs2;
  }

  static rotationX(ang) {
    let c = Math.cos(ang);
    let s = Math.sin(ang);
    return [
      [ 1,  0,  0,  0],
      [ 0,  c, -s,  0],
      [ 0,  s,  c,  0],
      [ 0,  0,  0,  1]
    ];
  }

  static rotationY(ang) {
    let c = Math.cos(ang);
    let s = Math.sin(ang);
    return [
      [ c,  0,  s,  0],
      [ 0,  1,  0,  0],
      [-s,  0,  c,  0],
      [ 0,  0,  0,  1]
    ];
  }

  static rotationZ(ang) {
    let c = Math.cos(ang);
    let s = Math.sin(ang);
    return [
      [ c, -s,  0,  0],
      [ s,  c,  0,  0],
      [ 0,  0,  1,  0],
      [ 0,  0,  0,  1]
    ];
  }

}

// scale -> rotation -> translation transform.
class SRT {
  constructor() {
    this.scale       = [1, 1, 1];
    this.rotation    = [0, 0, 0];
    this.translation = [0, 0, 0];
  }

  scaleBy(x, y = 1, z = 1) {
    this.scale[0] *= x;
    this.scale[1] *= y;
    this.scale[2] *= z;
  }

  rotateBy(x, y = 0, z = 0) {
    this.rotation[0] += x;
    this.rotation[1] += y;
    this.rotation[2] += z;
  }

  translateBy(x, y = 0, z = 0) {
    this.translation[0] += x;
    this.translation[1] += y;
    this.translation[2] += z;
  }

  toMatrix() {
    let mat = Matrix.identity();
    mat[0][0] = this.scale[0];
    mat[1][1] = this.scale[1];
    mat[2][2] = this.scale[2];

    mat = Matrix.mulMM(Matrix.rotationZ(this.rotation[0]), mat);
    mat = Matrix.mulMM(Matrix.rotationY(this.rotation[1]), mat);
    mat = Matrix.mulMM(Matrix.rotationX(this.rotation[2]), mat);

    mat[0][3] = this.translation[0];
    mat[1][3] = this.translation[1];
    mat[2][3] = this.translation[2];

    return mat;
  }

}
