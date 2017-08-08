module.exports = function JSONLoader(models) {
    this.models = models;

//    this.loginModel = models[0];
//    this.accessModel = models[1];

//    this.startpageJson = require('./content.json');
//    this.articleJson = require('./article.json');

//    this.loginJson = require('./login.json');
//    this.accessModelJson = require('./access.json');
    
    this.langJson = require('./lang.json');

    this.jsons = [langJson];//this.startpageJson,this.articleJson

    this.fillData = function () {
        deleteAll(function (err, resp) {
            console.log(resp + " / " + err);
            //
            createFillSchemas(function (err, resp) {
                console.log(resp + " / " + err);

//                bindKeys(function (resp) {
//                    console.log(resp);
//                });

            });
        });
    };

    function deleteAll(cb) {
        this.models.forEach(function (model, index) {
            model.deleteAll(function (err, resp) {
                if (index === (models.length - 1)) {
                    cb(err, "All databases cleared");
                }
            });
        });
    }

    function createFillSchemas(cb) {
        this.jsons.forEach(function (currJson, index) {
            this.models[index].createFromJsonWithNotify(currJson, function (err, resp) {
                console.log("schema created: " + resp.toString());
                if (index === (this.models.length - 1)) {
                    cb(err, "All shemas created ");
                }
            });
        });
    }

    function bindCustom(cb) {
        console.log("bind custom");
        var me = this;
        this.educationModel.findOne({name: 'suw16'}, function (err, edu) {
            me.studentModel.findOne({epost: 'gmor@gmail.com'}, function (err, stud) {
                stud._education = edu._id;
                stud.save(function (err, doc) {
//                    console.log("saved morge:", doc);
                });
            });

        });

    }

    function bindKeys(cb) {
        var me = this;
        //bind brokers to fastigheter
        this.brokersModel.find({}, function (err, brokers) {
            me.fastighetsModel.find({}, function (err, fastigheter) {
                fastigheter.forEach(function (fastighet) {
                    var randomBroker = getRandom(brokers);
                    fastighet.broker = randomBroker._id;
                    fastighet.save(function (err, doc) {
                        console.log("A:_id set for: " + fastighet.zip + " : " + randomBroker._id);
                    });

                });
            });
            cb("Bind keys done");
        });
    }

    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }



    //
    return this;
};

