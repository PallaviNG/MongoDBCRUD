const express = require("express");
const httpErrors = require("http-errors");
const morgan = require("morgan");
const routes = require("./app/routes/indexRoutes");
const app =express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',routes);

app.use(function(req,res,next){
    next(404);
});

app.use(function(error,req,res,next){
    res.status(error.status || 500);
    res.send({status:false,...error});
});

app.listen(3050,function(){
    console.log("Server is running on port "+3050);
});