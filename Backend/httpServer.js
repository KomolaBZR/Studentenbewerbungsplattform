const express = require('express');
const bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');

const cors = require('cors');

const fs = require('fs');
const https = require('https');

const database = require('./database/db');

const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');


const testRoutes = require('./endpoints/test/testRoutes');
const userRoutes = require('./endpoints/user/UserRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const publicUsersRoutes = require('./endpoints/user/PublicUsersRoute');
const fileUploadRoute = require('./endpoints/fileUpload/FileUploadRoute');
const degreeCourseRoutes = require('./endpoints/degreeCourse/DegreeCourseRoute');
const degreeCourseApplicationRoutes = require('./endpoints/degreeCourseApplication/DegreeCourseApplicationRoute');

const app = express();

const server = https.createServer({ key: key, cert: cert }, app);

app.use("*", cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});

app.use(bodyParser.json());
//app.use(cors());

//app.use(fileUpload({
//  createParentPath:true,
//  limits:{ fileSize: 50 * 1024 * 1024},
//  useTempFiles: true,
//  tempFileDir:'/Temp/'
//}));

/* Adding the routes*/
app.use('/', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authenticate', authenticationRoutes);
app.use('/api/publicUsers',publicUsersRoutes);
//app.use('/fileUpload',fileUploadRoute);
app.use('/api/degreeCourses', degreeCourseRoutes );
app.use('/api/degreeCourseApplications', degreeCourseApplicationRoutes );


database.initDB(function(err, db){
  if(db){
    console.log("Message: Database connection successful.");
  } else {
    console.log("Error: Database connection failed.");
  }
});

//Error Handler

app.use(function(req, res, next){
  res.status(404).send({"Error": 'Sorry, we cannot find the requested resource/page..'});
});

app.use(function(req, res, next){
  res.status(500).send({"Error": 'Oops! Sorry, something went wrong..'});
});



server.listen(443, () => { console.log("App listening at http://localhost:443") });
  
//const port = 80;

//app.listen(port, () => {
//  //console.log(`Example app listening on port ${port}`)
//  console.log(`Example app listening at http://localhost:${port}`);
//});
