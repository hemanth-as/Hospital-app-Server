const express=require("express");
const app=new express();
const data=require('./datas.json');
app.use(express.json());
const fs=require("fs");

app.get('/hospital',(req,res)=>{
    res.send(data);
})

app.post('/hospital',(req,res)=>{
    data.push(req.body);
    fs.writeFile("datas.json", JSON.stringify(data),(err, resp)=>{
        if(err){
            res.send("Data can not be written");
        }
        else{
            res.send("Data wriiten successfully");
        }
    })
});

app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.name==name){
            item.count=req.body.count;
            item.location=req.body.location;
        }
    })
    fs.writeFile("datas.json",JSON.stringify(data), (err,resp)=>{
        if(err){
            res.send("Data can not be updated");
        }
        else{
            res.send("Data updated succesfully");
        }
    })
});

app.delete('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    let value=data.filter(item=>item.name!==name);
    fs.writeFile("datas.json",JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Data can not be deleted")
        }
        else{
            res.send("Data deleted succesfully");
        }
    })
});

app.listen(3000);
console.log("Server listening to port 3000");