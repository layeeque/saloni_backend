const loginService=require('../service/login');

module.exports = (app) => {
    app.post('/login', (req,res) => {
        console.log('fgfg')
        loginService().login(req,res);
    });

    app.post('/register', (req,res) => {
        loginService().register(req,res);
    });

    app.post('/forgotPassword', (req,res) => {
       loginService().forgotPassword(req,res);
    });

    app.post('/changePassword/:id', (req,res) => {
        console.log('dsdfsdf')
        loginService().changePassword(req,res);
     });
   
   
    

}