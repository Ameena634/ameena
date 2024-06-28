
// let user=[{'name':'john',email:'test@example.com','username':'johny'},{'name':'ameena',email:'ami@gmail.com','username':'aami'}];
 //app.use(cors());
 //app.use(express.json());

// let information=[{'name':'john',email:'test@example.com','username':'johny',phone:'8906443'},{'name':'ameena',email:'ami@gmail.com','username':'aami',phpne:'2345677'}];

// app.get('/users',function(req,res){
//     res.json(user)

// })
// app.get('/info',function(req,res){
//     res.json(information)
// })
//let product=[{'title':'wallet','description':'beautiful','price': 500,'stalk':4}];


    



const express=require('express');
const app=express();
const cors = require('cors');
const {MongoClient}=require ('mongodb');

let user =[]
let db='';


async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
   ;
 }
 
app.use(cors())

app.use(express.json())

app.get('/users', async function (req, res) {
    let output = await db.collection('user').find({}).toArray();
    res.json(output);
});


app.post('/reg', async function(req, res) {
   let output = await db.collection('user').insertOne(req.body);
   console.log(req.body);
    if(output.length==0){
        res.json("email not found")
    }
    else{
        if(output[0].password==req.body.password){
            returnres.json(output[0])
        }
    }
    // app.post('/log', async function (req, res) {
    //     console.log(req.body);
    //     let output = await db.collection('user').find({"email": req.body.email}).toArray();
    //      console.log(output);
    //      if(output.length == 0) {
    //         return  res.json('email not found')
    //      } else {
    //         if(output[0].password == req.body.password) {
    //             return res.json(output[0])
    //         }
    //         return res.json('email not found')
    //      }
    
    
    });
       
    



app.listen(5000,function(){
    console.log('server is ready,listening on port 5000 ');
    mongoConnect();
})
 app.post('/log',function(req,res){
     console.log(req.body);
    for(let i=0;i<user.length;i++){
        if(user[i].email==req.body.email){
             if(user[i].password==req.body.password){
                 return res.json(user[i]);
            }
         }
    }
    return res.json("email not found")
 })



