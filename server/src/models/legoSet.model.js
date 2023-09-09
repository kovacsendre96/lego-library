class LegoSet {
  last_modified_dt = '';
  name = '';
  num_parts = 0;
  set_img_url = '';
  set_num = '';
  set_url = '';
  theme_id = 0;
  year = 0;
  min_price = 0;
  max_price = 0;
  box_img_url = "";
  real_picture_img_url = "";
  constructor(params) {
    Object.assign(this, params);
  }
}

module.exports = LegoSet;