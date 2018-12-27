const dashboardService=require('../services/dashboard');

module.exports = (app) => {
    app.get('/getAll', (req,res) => {
        dashboardService().getAll(req,res);
     });

     app.delete('/delete/:id', (req,res) => {
        dashboardService().deleteData(req,res);
     });
     app.post('/deleteById', (req,res) => {
      dashboardService().deleteById(req,res);
   });

     app.post('/addData', (req,res) => {
        dashboardService().addData(req,res);
     });
   
     app.put('/editData/:id', (req,res) => {
        dashboardService().edit(req,res);
     });

     app.post('/deleteAll', (req,res) => {
      dashboardService().deleteAll(req,res);
    });

   app.post('/sendFeedback/:id', (req,res) => {
      dashboardService().sendFeedback(req,res);
   });
   app.get('/employeeCount', (req,res) => {
      dashboardService().getEmployeeCount(req,res);
   });
    

}