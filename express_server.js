
// creating a basic server without the use of any other external module like express.js
const http=require('http');// 'http' provides us with many functions.
// so it returns an object with a lot of functions
let obj={
    name:"raj",
    age:34
}
const PORT=35711;
// now we will use createServer() to createServer.
// createServer takes a callback as an argument , which takes two parameters .
// where :-
    // 1. Request -> It contains all the data related to the request from url, to the call method and all.
    // 2. Response -> It contains all the functions which is neccesary for giving a respnse on the request.
const server=http.createServer(function(request,response){
        // printing the request method
        console.log(request.method);
        if(request.method=='POST'){
            let body='';
            request.on('data',function(chunk){
                // console.log("chunk data= ",chunk);
                body+=chunk.toString();
            });
            request.on('end',function(){
                response.end("ended post call with body= "+body);
            });
        }
        else{
            if(request.url=='/'){
                response.end("root directory");
            }
            else if(request.url=='/home'){
                response.end("root/home directory");
            }
            else if(request.url=='/faq'){
                response.end("root/faq directory");
            }
            else if(request.url=='/ram'){
                console.log(obj);
                response.write(JSON.stringify(obj));
                response.end("root/ram directory");
            }
            else 
            response.end(", IN REAL!");
        }
        
});

// After setting up the sever we will start it using .listen funciton
server.listen(PORT,function process(){
    // this callback will be executed when the server will start on the Given port.
    console.log("SERVER Started at PORT: ",PORT);
});
