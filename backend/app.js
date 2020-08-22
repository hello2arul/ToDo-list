const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./util/database');

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.post("/postItem", (req, res) => {
  postedItem = req.body.name;
  db.execute(`INSERT INTO items(name) VALUES('${postedItem}');`)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get("/getItems", (req, res) => {
  db.execute('SELECT name FROM items;')
  .then((result)=>{
    //console.log(JSON.stringify(res));
    res.json(result[0]);
  })
  .catch((err)=> {
    console.log(err);
  });
});

app.post("/deleteItem", (req, res) => {
  postedItem = req.body.name;
  db.execute(`DELETE FROM items WHERE name='${postedItem}';`)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
});



app.listen(4000, ()=> {
  console.log("app running at port 4000");
});
