
const loginModel = require('../../models/dashboard');
const multer = require('multer');
var fs = require('fs');
var json2xls = require('json2xls');
var pdf = require('pdfkit')

var dir = './upload';


if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}



var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {

            callback(null, './upload');
        },
        filename: function (req, file, callback) {
            console.log(req.params);
            // callback(null, req.params.name + '-' + Date.now() +'.jpg' );
            if (file.mimetype.includes('image')) {
                callback(null, req.params.name + '-' + req.params.id + '.png');
            } else if (file.mimetype.includes('x-zip-compressed')) {
                callback(null, req.params.name + '-' + req.params.id + '.zip');
            } else if (file.mimetype.includes('application/pdf')) {
                callback(null, req.params.name + '-' + req.params.id + '.pdf');
            } else if (file.mimetype.includes('video/mp4')) {
                callback(null, req.params.name + '-' + req.params.id + '.mp4');
            }
            else {
                callback(null, req.params.name + '-' + req.params.id + '.docx');
            }
        }
    })

}).single('photo');

module.exports = () => {
    return {
        uploadFile: (req, res) => {


            upload(req, res, function (err) {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    var path = '';


                    var url;

                    if (req.params.title == 'image') {

                        url = '.profilePic';
                        path = "http://localhost:3000/api/" + req.params.name + '-' + req.params.id + '.png';
                    }

                    else if (req.params.title == 'video') {

                        url = '.videoDocs';
                        path = "http://localhost:3000/api/" + req.params.name + '-' + req.params.id + '.mp4';


                    }

                    else {

                        url = '.otherDocs';
                        path = "http://localhost:3000/api/" + req.params.name + '-' + req.params.id + '.zip';
                    }


                    var file = 'uploadfile';


                    loginModel.findByIdAndUpdate({ '_id': req.params.id }, { $set: { [file.concat(url)]: path } }, (err, data) => {
                        if (err) {
                            res.status(400).send(err);
                        }
                        else {

                            res.status(200).send({ "url": path });

                        }
                    })
                }
            })

        },
        displayImage: (req, res) => {

            loginModel.find({}, { "uploadfile.profilePic": 1 }, (err, data) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(data);
                }

            });

        },
        displayVideo: (req, res) => {

            loginModel.find({}, { "uploadfile.videoDocs": 1 }, (err, data) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(data);
                }

            });

        },
        getImage: (req, res) => {

            loginModel.find({ "_id": req.params.id }, { "uploadfile.profilePic": 1 }, (err, data) => {

                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(data);
                }

            });

        },
        getpdf: (req, res) => {

            res.status(200).download("node.pdf");
        },
        download: (req, res) => {

            loginModel.find({ '_id': req.params.id }, { "uploadfile.otherDocs": 1 }, (err, data) => {

                if (err) {
                    res.status(400).send(err);
                }
                else {


                    res.status(200).send({ "data": data });
                }

            });

        },

        downloadPersonalDetails: (req, res) => {


            loginModel.find({ '_id': req.params.id }, { "personalDetails": 1 }, (err, data) => {

                if (err) {
                    res.status(400).send(err);
                }
                else {
                    var myDoc = new pdf;
                    myDoc.pipe(fs.createWriteStream('node.pdf'));
                    myDoc.font('Times-Roman')
                        .fontSize(10)
                        .text(data, 20, 20);
                        myDoc.end();

                        res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment; filename=node.pdf',
                            'Content-Length': data.length
                          });
                          res.status(200).download("node.pdf");

                }

            });

        },
        exportFile: (req, res) => {
            exportfile = [];
            exportfile = req.body.exportId
            console.log(exportfile)
            loginModel.find({ '_id': { '$in': exportfile } }, (err, exportData) => {
                if (err) {

                    res.status(400).send(err);
                }
                else {
                    var results = exportData;
                    console.log(results);
                    var obj = [];

                    for (var i = 0; i < results.length; i++) {
                        obj.push({ 'uploadfile': results[i].uploadfile, 'email': results[i].email, 'name': results[i].name, 'feedback': results[i].feedBack });

                    }
                    var xls = json2xls(obj, {
                        fields: ['name', 'email', 'feedback', 'uploadfile']
                    });
                    fs.writeFileSync('data.xlsx', xls, 'binary');

                    // res.send(xls);
                    res.download(__dirname + '../../data.xlsx', 'data.xlsx', (error, ) => {
                        fs.unlink(__dirname + '../../data.xlsx', function (err) {
                            if (err) console.log("Error ", err);
                        });
                    });

                }
            });

        }

    }
    
}






