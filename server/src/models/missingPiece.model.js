class MissingPiece {
  piece_id = "";
  set_id = "";
  image = "";
  quantity = 0;
  name = "";
  constructor(params) {
    Object.assign(this, params);
  }
}

module.exports = MissingPiece;
