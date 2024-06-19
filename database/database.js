const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "bartertrype",
    connectionLimit: 10
});
pool.query(`select * from users`, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
});
module.exports = { pool };