var db;
var httpService = angular.module('httpService', ['angular-websql']);
templateservicemod.service('httpService', function($http, $webSql) {
    //SHOULD ADD LOADER AS WELL
    var maxTableLimit = 50;
    this.db = $webSql.openDatabase('httpService', '1.0', 'HTTP SERVICE Database', 2 * 1024 * 1024);
    var DB = this.db;
    db = DB;
    DB.createTable('httpCall', {
        "id": { // PRIMARY KEY
            "type": "INTEGER",
            "null": "NOT NULL", // default is "NULL" (if not defined)
            "primary": true, // primary
            "auto_increment": true // auto increment
        },
        "created": { // CreationTime
            "type": "TIMESTAMP",
            "null": "NOT NULL",
            "default": "CURRENT_TIMESTAMP" // default value
        },
        "modified": { // ModificationTime
            "type": "TIMESTAMP",
            "null": "NOT NULL",
            "default": "CURRENT_TIMESTAMP" // default value
        },
        "md5": { // MD5 OF RESPONSE
            "type": "TEXT",
            "null": "NOT NULL"
        },
        "url": { // URL FOR REQUEST
            "type": "TEXT",
            "null": "NOT NULL"
        },
        "type": { // GET OR POST
            "type": "TEXT",
            "null": "NOT NULL"
        },
        "request": { // REQUEST PARAM
            "type": "TEXT",
            "null": "NOT NULL"
        },
        "response": { // RESPONSE
            "type": "TEXT",
            "null": "NOT NULL"
        },
        "use": { // NO OF TIMES THIS IS BEEN USED
            "type": "INTEGER",
            "default": 0
        }
    });




    function startCall(url, req, callback, errorCallback, type) {

        function makeHttpCall(sqlResponse) {
            //HTTP SERVER CALL
            var httpCall;
            if (type == "GET") {
                httpCall = $http.get(url, {
                    params: req
                });
            } else if (type == "POST") {
                httpCall = $http.post(url, {
                    params: req
                });
            }

            //HTTP SUCCESS
            httpCall.success(function(data, status) {
                if (status == 200) { // STATUS 200
                    var md5 = $.md5(JSON.stringify(data));
                    if (sqlResponse && md5 != sqlResponse.md5) {
                        //UPDATE
                        console.log("UPDATE");
                        DB.update("httpCall", {
                            "md5": md5,
                            "url": url,
                            "type": type,
                            "request": JSON.stringify(req),
                            "response": JSON.stringify(data),
                            "use": sqlResponse.use + 1
                        }, {
                            "id": sqlResponse.id
                        });

                        if (callback) {
                            callback(data, status);
                        }
                    } else if (!sqlResponse) {
                        //INSERT
                        console.log("INSERT");
                        DB.insert("httpCall", {
                            "md5": md5,
                            "url": url,
                            "type": type,
                            "request": JSON.stringify(req),
                            "response": JSON.stringify(data),
                            "use": 0
                        });
                        if (callback) {
                            callback(data, status);
                        }
                    } else if (sqlResponse && md5 == sqlResponse.md5) {
                        console.log("No Change");
                        DB.update("httpCall", {
                            "use": sqlResponse.use + 1
                        }, {
                            "id": sqlResponse.id
                        });
                    }
                } else {
                    if (errorCallback) { // ERROR STATUS FROM SERVER
                        errorCallback(data, status);
                    }
                }
            });
            //HTTP ERROR
            if (errorCallback) {
                httpCall.error(errorCallback);
            }
        }

        //GET FROM LOCAL DATABASE
        if (!req) {
            req = null;
        }
        var reqString = JSON.stringify(req);

        DB.select("httpCall", {
            "url": {
                "value": url,
                "union": 'AND'
            },
            "request": {
                "value": reqString
            }
        }).then(function(results) {
            if (results.rows.length > 0) {
                sqlResponse = results.rows.item(0);
                sqlResponse.jsonResponse = JSON.parse(sqlResponse.response);
                if (callback) {
                    callback(sqlResponse.jsonResponse);
                }
                sqlResponse.jsonResponse = sqlResponse.response;
                makeHttpCall(sqlResponse);
            } else {
                makeHttpCall();
            }
        });
    }
    this.post = function(url, data, callback, errorCallback) {
        startCall(url, data, callback, errorCallback, "POST");
    };
    this.get = function(url, data, callback, errorCallback) {
        startCall(url, data, callback, errorCallback, "GET");
    };
    this.clearMemory = function() {
        DB.executeQuery("SELECT COUNT(*) as `count` FROM `httpCall`").then(function(data) {
            var diff = 0;
            var count = data.rows.item(0).count;
            if (count > maxTableLimit) {
                diff = count - maxTableLimit;
                DB.executeQuery("DELETE FROM `httpCall` WHERE `id` IN (SELECT `id` FROM `httpCall` ORDER BY `use` ASC,`modified` ASC LIMIT 0," + diff + " )").then(function(data) {});
            }
        });
    };
});
