const loginModel = require('../../models/dashboard');



module.exports = () => {
    return {
      
        personal_data: (req, res) => {
            var title = req.body.title;

            loginModel.findById({'_id': req.params.id}, function (err, data1) {
               
                if (err) {
                    res.status(400).send(err);

                } else {
                         loginModel.findByIdAndUpdate({'_id': req.params.id},{$set : {[title] :req.body.content}}, (err, data) => {
                           
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                 
                                res.status(200).send({"data":data});

                            }

                        });
                    

                }
            });


        }
      


    }
}

