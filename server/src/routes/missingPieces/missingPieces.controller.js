const db = require("../../database/dbconfig");
const MissingPiece = require("../../models/missingPiece.model");

function index(req, res) {
  const params = req.params;
  let sql = "SELECT * FROM missing_pieces";
  if (params.id) {
    sql = `SELECT * FROM missing_pieces WHERE set_num = '${params.id}'`;
  }
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).json(result);
  });
}

function store(req, res) {
  const body = req.body;
  const sql = "INSERT INTO missing_pieces SET ?";
  const missing_piece = new MissingPiece(body);
  console.log(missing_piece);
  db.query(sql, missing_piece, (error, result) => {
    if (error) {
      throw error;
    }
  });

  return res.status(200).json(req.body);
}

function update(req, res) {
  let sql = `UPDATE missing_pieces SET collected = 1 WHERE piece_id = ${req.params.piece_id}`;
  if (!req.body.collected) {
    sql = `UPDATE missing_pieces SET collected = 0 WHERE piece_id = ${req.params.piece_id}`;
  }
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
  });

  return res.status(200).json(req.body);
}

function deletePiece(req, res) {
  const sql = `DELETE FROM missing_pieces WHERE piece_id = ${req.params.piece_id}`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
  });
  return res.status(200).json(req.body);
}

module.exports = {
  index,
  store,
  deletePiece,
  update,
};
