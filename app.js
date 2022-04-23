//import the packages
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const postRoutes = require("./Routes/postsData");

//Initialize express
const app = express();
const port = process.env.PORT || 8080;
// console.log(port);
//initiate the server
const server = http.createServer(app);

//Switch to different routes
app.use("/api", postRoutes);

//Error Handling
app.use((err, req, res, next) => {
  console.log("message : " + err.message);
  res.write(err);
  res.write(req.statuCode);
  res.send();
});

//Encode the URl with bodyParser framework
app.use(bodyParser.urlencoded({ extended: true }));

//Put the server in the listen mode
const boot = () => {
  server.listen(port, () => {
    console.log("Server is running and listen in port " + port);
  });
};
const shutdown = () => {
  server.close();
};
if (require.main === module) {
  boot();
} else {
  console.info("Running app as a module");
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get(port);
}
