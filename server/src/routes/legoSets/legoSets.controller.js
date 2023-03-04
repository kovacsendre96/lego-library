const db = require("../../database/dbconfig");
const LegoSet = require("../../models/legoSet.model");

function store(req, res) {
  const body = req.body;
  const legoSet = new LegoSet(body);
  const sql = "INSERT INTO lego_sets SET ?";
  db.query(sql, legoSet, (error, result) => {
    if (error) {
      throw error;
    }
  });

  return res.status(200).json(legoSet);
}

function index(req, res) {
  const sql = "SELECT * FROM lego_sets";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).json(result);
  });
}

function show(req, res) {
  const sql = `SELECT * FROM lego_sets WHERE set_id = '${req.params.id}'`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).json(result[0]);
  });
}

function deleteLegoSet(req, res) {
  const sql = `DELETE  FROM lego_sets WHERE set_id = '${req.params.id}'`;
  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).json(result[0]);
  });
}

function update(req, res) {
  const sql = `UPDATE lego_sets SET ? WHERE set_id = '${req.params.id}'`;
  const body = req.body;
  const legoSet = new LegoSet(body);
  console.log(sql);
  db.query(sql, legoSet, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).json(result[0]);
  });
}

module.exports = {
  store,
  index,
  show,
  deleteLegoSet,
  update,
};
