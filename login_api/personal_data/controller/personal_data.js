const personal_dataervice=require('../service/personal_data');

module.exports = (app) => {
    app.post('/personal-data/:id', (req,res) => {
        personal_dataervice().personal_data(req,res);
     });

     
    

}