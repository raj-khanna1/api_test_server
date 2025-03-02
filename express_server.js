
// creating a basic server without the use of any other external module like express.js
const methods=require('./api_testing_website_data.js');
const http=require('http');// 'http' provides us with many functions.
// so it returns an object with a lot of functions

const PORT = process.env.PORT || 35711;
// now we will use createServer() to createServer.
// createServer takes a callback as an argument , which takes two parameters .
// where :-
    // 1. Request -> It contains all the data related to the request from url, to the call method and all.
    // 2. Response -> It contains all the functions which is neccesary for giving a respnse on the request.
const server=http.createServer(function(req,res){
        // printing the request method
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const mthd=req.method;
        // console.log(mthd);
        const url=req.url;
        if(mthd=='GET'){
            let ts=url.substring(0,10);
            // console.log("char at 11= ",url[11]);
            // console.log("url= ",url);
            if(url=='/api/users'){
                let ar=new Array;
                usersMap.forEach((val,key)=>{
                    let s="id: "+key;
                    ar.push({id:key,userInfo:val});
                });
                // console.log(ar);
                res.end(JSON.stringify(ar));
            }
            else if(url=='/api/websiteData'){
                // console.log("camed");
                res.end(JSON.stringify(methods.methods1));
            }
            else if(url.length>11&&url[11]>='1'&&url[11]<='9'){
                let tid=Number(url.substring(11));
                // console.log("id= ",tid);
                if(usersMap.has(tid)){
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end(JSON.stringify(usersMap.get(tid)));// we can't print object in res.write or end we have to stringfy the json into string.
                }
                else {res.end("NO USER");}
            }
            else {res.writeHead(200, { "Content-Type": "text/plain" });res.end("Don't Know what are u trying to do,Go and watch TWD!");}
        }
        else if(mthd=='POST'){
            // console.log("url = ",url);
            if(url=='/api/users'){
                let data='';
                req.on('data',function(chunk){
                    data+=chunk.toString();
                });
                req.on('end',function(){
                    // console.log("data= ",data);
                    try{
                        let parsedBody = JSON.parse(data);
                        // console.log("parse body= ",parsedBody);
                        usersMap.set(parsedBody.id,parsedBody.userInfo);
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("USER ADDED CHK BY GETTING BY ID");
                    }catch(error){
                        // console.log("error= ",error);
                        res.end("bad post data, required json");
                    }
                    
                });
            }
            else if(url=='/api/register'){
                // console.log("in register");
                let data='';
                req.on('data',function(chunk){
                    data+=chunk.toString();
                });
                req.on('end',function(){
                    try{
                        let parsedBody = JSON.parse(data);
                        if(valid(parsedBody)){
                            // if the given login/sign up details are succesful
                            loginMap.set(parsedBody.uesrId,parsedBody.password);
                            res.writeHead(200, { "Content-Type": "text/plain" });
                            res.end("USER SIGNED UP CHK BY Loging");
                        }
                        else throw("bekar");
                        
                    }catch(error){
                        // console.log("error= ",error);
                        res.end("NOT CORRECT INFO");
                    }
                    
                });
            }
            else if(url=='/api/login'){
                // console.log("in login");
                let data='';
                req.on('data',function(chunk){
                    data+=chunk.toString();
                });
                req.on('end',function(){
                    // console.log("data= ",data);
                    try{
                        let parsedBody = JSON.parse(data);
                        // console.log("parse body= ",parsedBody);
                        if(validLoginDetails(parsedBody)){
                            // if the given login/sign up details are succesful
                            res.end("LOGED IN");
                        }
                        else throw("NOT VALID LOGIN DETAILS");
                        
                    }catch(error){
                        // console.log("error= ",error);
                        res.end("NOT VALID LOGIN DETAILS");
                    }
                    
                });
            }
            else res.end("SEND BETTERLY!");
        }
        else if(mthd=='PUT'){
            if(url=='/api/users'){
                let data='';
                req.on('data',function(chunk){
                    data+=chunk.toString();
                });
                req.on('end',function(){
                    try{
                        let parsedBody = JSON.parse(data);
                        // console.log("parse body= ",parsedBody);
                        if(usersMap.has(parsedBody.id)){
                            usersMap.set(parsedBody.id,parsedBody.userInfo);
                            res.writeHead(200, { "Content-Type": "text/plain" });
                            res.end("USER UPDATED CHK BY GETTING BY ID");
                        }                        
                    }catch(error){
                        res.end("bad post data, required json");
                    }
                    
                })
            }
            else res.end("SEND BETTERLY!");
        }
        else if(mthd=='PATCH'){
            if(url=='/api/users'){
                let data='';
                req.on('data',function(chunk){
                    data+=chunk.toString();
                });
                req.on('end',function(){
                    try{
                        let parsedBody = JSON.parse(data);
                        if(usersMap.has(parsedBody.id)){
                            usersMap.set(parsedBody.id,parsedBody.userInfo);
                            res.writeHead(200, { "Content-Type": "text/plain" });
                            res.end("USER UPDATED CHK BY GETTING BY ID");
                        }
                        else{
                            res.end("NOT AVAILABLE USER")
                        }
                        
                    }catch(error){
                        res.end("bad post data, required json");
                    }
                    json
                })
            }
            else res.end("SEND BETTERLY!");
        }
        else if(mthd=='DELETE'){
            let ts=url.substring(0,10);
            if(url.length>11&&url[11]>='1'&&url[11]<='9'){
                let tid=Number(url.substring(11));
                if(usersMap.has(tid)){
                    usersMap.delete(tid);
                    res.end("Deleted.");
                }
                else {res.writeHead(200, { "Content-Type": "text/plain" });res.end("NO USER");}
            }
            else res.end("Don't Know what are u trying to do,Go and watch TWD!");
        }
        
});

// After setting up the sever we will start it using .listen funciton
server.listen(PORT,function process(){
    // this callback will be executed when the server will start on the Given port.
    console.log("SERVER Started at PORT: ",PORT);
});


let usersMap=new Map();
let loginMap=new Map();
usersMap.set(35711,{
    name:"Rana",
    job:"board member"
});
loginMap.set("bhaskar@gmail.com",{
    uesrId: "bhaskar@gmail.com",
    password: "watchmen"
});

function valid(obj){
    if(obj.uesrId==undefined||obj.password==undefined||loginMap.has(obj.uesrId)||obj.uesrId.length==0||obj.password.length==0)return 0;
    return 1;
}
function validLoginDetails(obj){
    // console.log("obid= ",obj.uesrId);
    if(obj.uesrId==undefined||obj.password==undefined||loginMap.has(obj.uesrId)==false)return 0;
    return 1;
}