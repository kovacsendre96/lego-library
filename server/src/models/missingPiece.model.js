class MissingPiece {
  id = "";
  set_num = "";
  img = "";
  quantity = 0;
  name = "";
  link = "";
  color = "";
  collected = false;
  constructor(params) {
    Object.assign(this, params);
  }
}

module.exports = MissingPiece;
