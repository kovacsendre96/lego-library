class MissingPiece {
  id = "";
  part_num = "";
  img = "";
  quantity = 0;
  name = "";
  link = "";
  color = "";
  constructor(params) {
    Object.assign(this, params);
  }
}

module.exports = MissingPiece;
