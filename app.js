const express=require('express');
const app=new express();
const data=require('./datas.json');
app.get("/hospital", (req, res) => {
    res.send(data);
})


app.listen(3000);
console.log("Server listening to port 3000");