const mysql = require("mysql");
var express = require("express");
//var Joi =require("joi");
var emprouter =  express();

const connection = mysql.createConnection({
    host     : '200.0.1.217',
    user     : 'root',
    password : 'manager',
    database : 'emp',
   port:'3309'

  });

var myData =[];
connection.connect();

//function validate(bodyContent)
//{
 //  const schema = {
   //     "Name": Joi.string().length(6).required(),
   //     "No": Joi.number().required(),
   //     "Address": Joi.required()
   //     };
  // return Joi.validate(bodyContent , schema);
//}

emprouter.post("/",function(request, response){

    //let resultOfValidation= validate(request.body);
    //console.log(resultOfValidation);
    //if(resultOfValidation.error==null)
//{
    let eno = parseInt(request.body.S_No);
    let ename = request.body.Name;
    let eddress = request.body.Address; 
    
    let query = `insert into emp values(${eno}, '${ename}', '${eddress}')`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err); 
        }
    });
//}
//else{
//    response.contentType("application/json");
//    response.send(JSON.stringify(resultOfValidation));
//}       
});


emprouter.put("/:No",function(request, response){
    let eno = parseInt(request.params.No);
    let ename = request.body.Name;
    let eddress = request.body.Address; 
    
    let query = `update emp1 set name= '${ename}',address= '${eddress}' where no=${eno}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {   
           response.contentType("application/json");
           response.send(err); 
        }
    });
        
});

emprouter.delete("/:No",function(request, response){
    let eno = parseInt(request.params.No);
    let query = `delete from emp1 where S_No=${eno}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err); 
        }
    });
        
});



emprouter.get("/", function(request, response){
    connection.query("select * from emp1", function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           console.log(err); 
        //    response.send("Something went wrong!"); 
        }
    });
    
});

emprouter.get("/:No", function(request, response){
    console.log("You searched for " + request.params.No);
    connection.query(`select * from emp1 where S_No
     =${request.params.No}`, function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    });
    
module.exports = emprouter;
