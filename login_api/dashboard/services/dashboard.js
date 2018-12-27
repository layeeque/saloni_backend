const loginModel = require('../../models/dashboard');


module.exports = () => {
    return {
        getAll: (req, res) => {

            loginModel.find({}, (err, data) => {
             
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(data);
                }

            });
        },
        deleteData: (req, res) => {

            loginModel.findByIdAndDelete({ '_id': req.params.id }, (err, Deletedata) => {

                if (err) {
                    res.status(400).send(err);
                }
                else {
                    loginModel.find({}, (err, data) => {
                      
                        if (err) {
                            res.status(400).send(err);
                        }
                        else {
                            res.status(200).send(data);
                        }

                    });

                }

            });
        },
        deleteById: (req, res) => {

            Deleteid = [];
            Deleteid = req.body.delete
            loginModel.remove({ '_id': { '$in': Deleteid } }, (err, removeData) => {
                if (err) {

                    res.status(400).send(err);
                }
                else {
                    loginModel.find({}, (err, data) => {
                      
                        if (err) {
                            res.status(400).send(err);
                        }
                        else {
                            res.status(200).send(data);
                        }

                    });

                }
            })




        },
        addData: (req, res) => {

            loginModel.create(req.body, (err, Adddata) => {
              
                if (err) {
                    res.status(400).send(err);
                }
                else {
                   
                    res.status(200).send(Adddata);
                }

            });
        },
        deleteAll: (req, res) => {

            loginModel.remove({}, (err, deletedata) => {
              
                if (err) {
                    res.status(400).send(err);
                }
                else {
                   
                    res.status(200).send(deletedata);
                }

            });
        },


        edit: (req, res) => {

            loginModel.findByIdAndUpdate({ '_id': req.params.id }, { $set: req.body }, (err, editdata) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(editdata);
                }

            });
        },
        sendFeedback: (req, res) => {
          
            loginModel.findByIdAndUpdate({ '_id': req.params.id }, { 'feedBack': req.body.feedBack }, (err, feedback) => {
                if (err) {
                   
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(feedback);
                }
            });


        },
        getEmployeeCount: (req, res) => {

            loginModel.find({}, (err, data) => {
            
                if (err) {
                    res.status(400).send(err);
                }
                else {
                  
                    res.status(200).send({"data":data.length});
                }

            });
        }



    }
}

