const uploadService=require('../services/upload');

module.exports = (app) => {
    app.post('/upload/:id/:name/:title', (req,res) => {
      
        uploadService().uploadFile(req,res);
    });

    app.get('/displayImage', (req,res) => {
        uploadService().displayImage(req,res);
    });
 
    app.get('/getImage/:id', (req,res) => {
        uploadService().getImage(req,res);
    });
    
    app.get('/displayVideo', (req,res) => {
        uploadService().displayVideo(req,res);
    });

    app.get('/download/:id', (req,res) => {
       
        uploadService().download(req,res);
    });

    app.post('/exportFile', (req,res) => {
       
        uploadService().exportFile(req,res);
    });

    app.get('/downloadPersonalData/:id', (req,res) => {
       
        uploadService().downloadPersonalDetails(req,res);
    });
   
    app.get('/getpdf', (req,res) => {
       
        uploadService().getpdf(req,res);
    });
   
}