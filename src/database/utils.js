
var mysql = require('mysql')

var findAll = function(table, con) {

  return new Promise(function(resolve, reject) {
    con.query('SELECT * FROM ' + table,
      function(err,rows){
        if (err) {
          reject(err);
        } else {
          resolve({rows});
        }
      });
    });
}

var findById = function(table, con, id) {

  return new Promise(function(resolve, reject) {
    con.query('SELECT * FROM ' + table + ' WHERE unique_id = ?',
      [id],
      function(err,rows){
        if (err) {
          reject(err);
        } else {
          resolve({rows});
        }
      });
    });
}

var removeById = function(table, con, id) {
  return new Promise(function(resolve, reject) {
    con.query('DELETE FROM ' + table + ' WHERE unique_id = ?',
      [id],
      function(err,rows){
        if (err) {
          reject(err);
        } else {
          resolve({rows});
        }
      });
    });
}

var create = function(table, con, params) {
  return new Promise(function(resolve, reject) {
    var sql = con.query('INSERT INTO ' + table + ' SET ? ',
      params,
      function(err,rows) {
        if (err) {
          reject(err);
        } else {
          resolve({rows});
        }
      });
    });
    console.log(sql.sql);
}

var updateById = function(table, con, id, params) {
  return new Promise(function(resolve, reject) {
    con.query('UPDATE ' + table + ' SET ? WHERE unique_id = ' + mysql.escape(id),
      params,
      function(err,rows){
        if (err) {
          reject(err);
        } else {
          resolve({rows});
        }
      });
    });
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  removeById,
}
