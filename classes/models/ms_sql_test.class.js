'use strict'; // important, but not in later node versions
class Mssql {

    constructor(connection, tableName) {
        this.connection = connection;
        this.tableName = tableName;
    }

    executeStatement() {
        var Request = require('tedious').Request;
        var sql = 'select * from ' + this.tableName;

        var request = new Request(sql, function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log("ROWS: ",rowCount);
            }
        });

//        request.on('row', function (columns) {
//            columns.forEach(function (column) {
//                console.log(column.colName);
//            });
//        });

        this.connection.execSql(request);
    }

}

module.exports = Mssql;


