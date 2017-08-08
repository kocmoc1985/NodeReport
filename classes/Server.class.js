'use strict';

module.exports = class Server {
    constructor() {
        // save our settings to this
        this.settings = g.settings.Server;

        // add express to this
        this.app = m.express();

        //Enables that node_modules are available in Anguular
        this.app.use(m.express.static('www'));
        this.app.use(m.express.static('./'));

        // run the setup method
        this.setup();
        this.main();
        this.listen();
    }

    setup() {
        // tell express to use middleware to parse JSON
        this.app.use(m.bodyparser.json({limit: '5mb'}));
        // declare a webroot
        this.app.use(
                m.express.static(
                        m.path.join(g.settings.appRoot, this.settings.webroot)
                        )
                );

        // compress all files using gzip
        this.app.use(m.compression());

        // parse all request cookies
        this.app.use(m.cookieparser());

        // parse all urlencoded request body data
        // for example from "standard" HTML forms
        //Restrouter also needs this
        this.app.use(m.bodyparser.urlencoded({extended: false, limit: '5mb'}));
    }

    main() {
        var sha1 = require('sha1');
        global.sha1 = sha1;
        global.passwordSalt = "kocmoc";

        var Mymiddleware = require('./moduls/MyMiddleware.class');
        var Restrouter = require('./restrouterP.class');

        var mset = g.settings.MONGOOSE; // see 'settingsConstr.js'

        if (mset.connect === 'true') {
            require('tedious').TDS_VERSION;
            var Connection = require('tedious').Connection;
            //
            var config = {
                userName: 'opc',
                password: 'kocmoc',
                server: '10.87.0.2',
                options: {
                    database: 'MILLS',
                    tdsVersion: '7_1', //Specify version 7_1 if using MS SQL 2000
                    rowCollectionOnRequestCompletion: 'true'
                }

                // If you're on Windows Azure, you will need this:
//                options: {encrypt: true}
            };
            //
            //Implements some basic functionality, OBS! Must be placed here
            new Mymiddleware(this.app);
            //
//            var startPageModel = require('./models/content.model')(mongoose);
            //
//            new Restrouter(this.app, startPageModel, "content", true);
            //
            var connection = new Connection(config);
            var Request = require('tedious').Request;
            
            var Mssql = require('./models/ms_sql_test.class');

            var mssql = new Mssql(connection,"BATCH_INFO");
            
            connection.on('connect', function (err) {

                mssql.executeStatement();
            }
            );

//            function executeStatement() {
//                var sql = 'select * from BATCH_INFO';
//                
//                var request = new Request(sql, function (err, rowCount) {
//                    if (err) {
//                        console.log(err);
//                    } else {
//                        console.log(rowCount + ' rows');
//                    }
//                });
//
//                request.on('row', function (columns) {
//                    columns.forEach(function (column) {
//                        console.log(column.value);
//                    });
//                });
//
//                connection.execSql(request);
//            }

        }//mset.connection


        // If no other route rule fulfilled then return www/index.html
        var myIndexFile = m.path.join(__dirname, '..', 'www', 'index.html');
        this.app.get('*', (req, res) => {
            res.sendFile(myIndexFile);
        });

    }

    listen() {
        // listen on port 3000
        var me = this;
        this.app.listen(this.settings.port, function () {
            console.log("Server listening on port " + me.settings.port);
        });
    }

};


