// Performs the authorization check
var hasAuthorization = function(con, authRequest) {

  var { actor, action, item } = authRequest;

  return new Promise(function(resolve, reject) {
    con.query('SELECT Count(*) as recordCount FROM authorization WHERE actor_id = ? and action_id = ? and item_id = ?',
      [actor, action, item], function(err,rows){
        if (err) {
          reject(err);
        } else {
          resolve({ hasAuthorization: (rows[0].recordCount === 1 ? true : false)});
        }
      });
    });
}

module.exports = { hasAuthorization }
