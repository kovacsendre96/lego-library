class LegoSet {
  set_name = "";
  set_id = "";
  number_of_pieces = 0;
  year_released = 0;
  banner = "";
  box = "";
  real_picture = "";
  min_price = 0;
  max_price = 0;
  constructor(params) {
    Object.assign(this, params);
  }
}

module.exports = LegoSet;
