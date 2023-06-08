const express =require ('express')
const app = express()
const mysql = require('mysql');
const cors =require('cors')
const multer=require('multer')
const nodemailer=require('nodemailer')
const dotenv=require('dotenv')
const razorpay=require('razorpay')


app.use(cors());
app.use(express.json());

// let uid ="salman@gmail.com";
let today=new Date();
dd=today.getDate();
mm=today.getMonth()+1;
yy=today.getFullYear()
let cdate=yy+"-"+mm+"-"+dd;
let ctime=today.toLocaleTimeString();



const dbcom = mysql.createConnection({
    host :"localhost",
    "user" :"root",
    "password" : "",
    "database":"food_order"
});
//
dbcom.connect(function(err){
    if(err) throw err;
    console.log("Connected!")
});



app.listen(3001,() => {
    console.log("running on port 3001")
});

app.get("/",(req,res) => {
    res.send("Hello world react js");
});


//login Authentication code
app.post('/login',(req,res)=>{
    console.log("Hey...!yes")
    logdata =req.body.logindata
    username=logdata.username
    password=logdata.password
    dbcom.query("SELECT * from login where username =? AND password =?",[username,password],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});






app.post('/payment',(req,res)=>{
    console.log("Hey...!yes")
    paymentdata =req.body.paymentdata
    userid=paymentdata.userid
    orderid=paymentdata.orderid
    amount=paymentdata.amount
    Payment_date=paymentdata.Payment_date
   
   // utype=user
    dbcom.query("insert into payment(userid,orderid,amount,Payment_date)values(?,?,?,?)",[userid,orderid,amount,Payment_date],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});




let imgconfig= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../client/public/upload/");
        //callback(null,"./client/public/upload")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

//image filter



const isImage =(req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is Allowed"))
    }
};



let upload =multer({
    storage:imgconfig,
    fileFilter:isImage
});




app.post('/addfooditems',upload.single("file"),(req,res)=>{
    console.log("Hey...!yes")

    category=req.body.category
    item_name=req.body.item_name
    uom=req.body.uom
    qty=req.body.qty
    price=req.body.price
    const {filename}=req.file
    console.log(req.file)

    const sql="insert into addfooditems(category,item_name,uom,qty,price,image)values(?,?,?,?,?,?)";

   // utype=user
    dbcom.query(sql,[category,item_name,uom,qty,price,filename],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.get('/home',(req,res)=>{
    dbcom.query("select * from addfooditems",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.get('/userhome',(req,res)=>{
    dbcom.query("select * from addfooditems",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.get('/displayreg',(req,res)=>{
    dbcom.query("select * from user_reg",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete('/displayreg/delete/:id',(req,res) => {
    const id=req.params.id
    console.log("hey"+id);
    dbcom.query("delete from user_reg where id = ?",id,(err,result) => {
        if (err){
            console.log(err)
        }
        else {
            res.send(result);
        }
    });
});

app.delete('/addfooddisplay/delete/:id',(req,res) => {
    const id=req.params.id
    console.log("hey"+id);
    dbcom.query("delete from addfooditems where id = ?",id,(err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    });
});

app.delete('/deletefood/:id',(req,res) => {
    const id=req.params.id
    console.log("hey"+id);
    dbcom.query("delete from addfooditems where id = ?",id,(err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    });
});

app.delete('/fooddisplay/delete/:id',(req,res) => {
    const id=req.params.id
    console.log("hey"+id);
    dbcom.query("delete from customerorder where id = ?",id,(err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    });
});

app.get('/addfooddisplay',(req,res)=>{
    dbcom.query("select * from addfooditems",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


// app.post('/feedback',(req,res)=>{
//     console.log("Hey...!yes")
//     feedbackdata=req.body.feedback
//     userid=feedbackdata.userid
//     About_product=feedbackdata.About_product
//     About_Service=feedbackdata.About_Service

//     dbcom.query("insert into feedback(userid,About_product,About_Service)values(?,?,?)",[userid,About_product,About_Service],
//     (err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     });
// });


app.post('/feedback',(req,res) => {
    feeddata=req.body.feeddata
    uid=req.body.uid
    about_service=feeddata.about_service
    comments=feeddata.comments

    dbcom.query("insert into feedback(userid,about_service,comments)values(?,?,?)",
    [uid,about_service,comments],
    (err,result)=> {
        if(err){console.log(err);}
        else{
            console.log(uid)
            res.send(result); 
        }     
    });  
});

app.post('/user_reg',(req,res)=>{
    console.log("Hey...!yes")
    signupdata =req.body.signupdata
    fullname=signupdata.fullname
    city=signupdata.city
    address=signupdata.address
    pincode=signupdata.pincode
    contact=signupdata.contact
    email=signupdata.email
    password =signupdata.password
    utype='user'
    dbcom.query("insert into user_reg(fullname,city,address,pincode,contact,email)values(?,?,?,?,?,?)",[fullname,city,address,pincode,contact,email],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            dbcom.query("insert into login(username,password,utype)values(?,?,?)",[email,password,utype])
            res.send(result);
        }
    });
});

//send order
app.post('/sendorder/:id',(req,res)=>{

    console.log("Order Send")
    qty=req.body.qty
    id=req.body.id
    uid=req.body.uid

   // user=localStorage.getItem('user')
   
    const q ="select * from  addfooditems where id=?";
    dbcom.query(q,[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{

            const price=result[0].price
            const total=price*qty
            const item_name=result[0].item_name

            dbcom.query("insert into customerorder(userid,item_name,qty,price,total,order_date,order_time,payment_status,order_status,p_id)values(?,?,?,?,?,?,?,?,?,?)",
            [uid,item_name,qty,price,total,cdate,ctime,'pending','pending',id])

             console.log(result)
             res.send(result);
        }
    });
});

// get user order list by user id
app.get('/customerorder/:id',(req,res) => {
    const uid=req.params.id;
    const q="select a.id,a.p_id,a.userid,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.item_name from customerorder as a join  addfooditems as b on a.userid=? and a.p_id=b.id";
    dbcom.query(q,[uid],(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});




// Order Confirm by user

app.post('/orderconfirm/:id',(req,res)=> {
    const id=req.params.id
    console.log("Hey"+id)
    let status='confirmed'
     dbcom.query("update customerorder set order_status='Confirmed' where id = ?",[id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });


 app.get('/categorylist',(req,res) => {
    dbcom.query("select * from category",(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});



 app.get('/sendmail/',async(req,res)=>{
    let testAccount= await nodemailer.createTestAccount();
    //connect with email
    let transporter = await nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        auth:{
            user:"sayedgouse1995@gmail.com",
            pass:"uesivmekddgafywg"
        }
    });

    let info = await transporter.sendMail({
        from:'"salman"<sayedgouse1995@gmail.com>',
        to:"salmapeerzade07@gmail.com",
        subject:"Hello Kabir",
        text:"Hello kabir sing",
        html:"<b>Hello habibi</b>",
     });
     console.log("Message sent :%s",info.messageId);
     res.json(info);
 })

 app.post('/forgotpass',(req,res)=> {
    const otp=Math.floor(Math.random()*(9999 - 1000 + 1) + 1000)
    username=req.body.email
    console.log(username)
     dbcom.query("select * from login where username = ?",[username],(err,result)=>{
         if(err)
         {console.log(err)}
         else
         {
            let transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:587,
                auth:{
                    user:"sayedgouse1995@gmail.com",
                    pass:"uesivmekddgafywg"
                }
            });
        
            let info =transporter.sendMail({
                from:'"salman"<sayedgouse1995@gmail.com>',
                to:username,
                subject:"One Time Password",
                html:"Your OTP :" + [otp],
                //html:"<b>Food Order System</b>"+[otp],
             }); 
            dbcom.query("insert into otp(otp,status)values(?,?)",[otp,'active'])

            res.send(result);}
     });
 });

 // Otp Verification
app.post('/otp',(req,res) => {
    otp=req.body.otp
    console.log(otp)
    dbcom.query("SELECT * from otp where otp =?",[otp],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
            
           res.send(result); }     
    }
    );
});

// Reset Password Code

app.post('/resetpass',(req,res) => {
    newpass=req.body.newpass
    confirmpass=req.body.confirmpass
    uid=req.body.uid

        dbcom.query("update login set password=? where username =?",[newpass,uid],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
           res.send(result); }     
    }
    ); 
   
});

// Order Confirm by user

app.post('/orderconfirm/:id',(req,res)=> {
    const id=req.params.id
    console.log("Hey"+id)
    let status='Confirmed'
     dbcom.query("update customerorder set order_status='Confirmed' where id = ?",[id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });

app.post('/paybill/:id',(req,res) => {
   console.log("Payment inserted")
   const id=req.params.id
   price =req.body.price,
   payment_id=req.body.payment_id
   uid=req.body.uid
   const status="paid"
   const q="update customerorder set payment_status=? where id=?";
   dbcom.query(q,[status,id],(err,result)=>{
    if(err){
        console.log(err)
    }else{
        dbcom.query("insert into payment(userid,orderid,amount,Payment_date)values(?,?,?,?)",[uid,id,price,cdate,payment_id])
        res.send(result)
    }
   })
});

app.get('/allorder',(req,res)=>{
    dbcom.query("select * from customerorder",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })

})

app.get('/adminhome',(req,res)=>{
    dbcom.query("select * from customerorder",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })

})

app.delete('/adminhome/delete/:id',(req,res)=>{
    const id=req.params.id

    dbcom.query("delete from customerorder where id = ?",id,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

// view all old and new orders
app.get('/customerordersall/',(req,res) => {
    const uid=req.params.id;
    const status='Paid'
    const q="select a.id,a.p_id,a.userid,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,a.delivered_status,b.item_name from customerorder as a join addfooditems as b on a.p_id=b.id and payment_status=?";
    dbcom.query(q,status,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});

// Delete Order By Admin
app.delete('/delorderbyadmin/:id',(req,res)=> {
    const id=req.params.id
     //console.log("hey"+id);
     dbcom.query("delete from customerorder where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });


 // send to delivery order 

 app.post('/sendtodelivery/:id',(req,res)=> {
    const id=req.params.id
    const status='progressing'
     console.log("hey"+id);

     dbcom.query("update customerorder set delivered_status=? where id=?",[status,id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });


 // Get Individual Customer Data
app.get('/customerview/:userid',(req,res) => {
    const uid=req.params.userid;
    console.log(uid)
    const q="select * from user_reg where email=?";
    dbcom.query(q,[uid],(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// View feedback details

app.get('/viewfeedback/',(req,res) => {

    const q="select * from feedback";
    dbcom.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});

// Get Category Wise Products
app.get('/catwise/:cat',(req,res) => {
    const cat=req.params.cat;
    const q="select * from addfooditems where category=?";
    dbcom.query(q,cat,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// fetching Category List

// app.get('/categorylist',(req,res) => {
//     dbcom.query("select * from category",(err,result) => {
//         if(err){
//         console.log(err);}
//         else{
//             res.send(result);}
//     });
// });


app.post('/updatedeliverystatus/:id',(req,res)=> {
    const id=req.params.id
    const status='delivered'
     console.log("hey"+id);

     dbcom.query("update customerorder set delivered_status=? where id=?",[status,id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });

  // view all old and new orders
  app.get('/serviceorders/',(req,res) => {
    const uid=req.params.id;
    const status='Paid'
    const ostatus='progressing'
    const q="select a.id,a.p_id,a.userid,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,a.delivered_status,b.item_name from customerorder as a join addfooditems as b on a.p_id=b.id and payment_status=? and delivered_status=?";
    dbcom.query(q,[status,ostatus],(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// View Food Item List / Admin Panel

app.get('/viewfooditem/',(req,res) => {
    const q="select * from addfooditems";
    dbcom.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});

app.get('/categorylist',(req,res) => {
    dbcom.query("select * from category",(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});


 // view all old and new orders
 app.get('/serviceorder/',(req,res) => {
    const uid=req.params.id;
    const status='Paid'
    const ostatus='progressing'
    const q="select a.id,a.p_id,a.userid,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,a.delivered_status,b.item_name from customerorder as a join addfooditems as b on a.p_id=b.id and payment_status=? and delivered_status=?";
    dbcom.query(q,[status,ostatus],(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});





 

 





// const express =require ('express')
// const app = express()
// const mysql = require ('mysql');
// const cors =require ('cors')
// app.use (cors());
// app.use(express.json());

// //database configuration code
// const dbcon =mysql.createConnection({
//     host: "localhost",
//     "user": "root",
//     "password": "",
//     "database":"food_order",

// })

// // end database connection code

//     dbcon.connect(function(err){
//         if (err)throw err;
//         console.log("connected!");
//     });


// app.listen(3001,()=>{
//          console.log("running on port 3001");
// });

// app.get("/",(req,res)=>{
//     res.send("Hello World React..|")
// })

// //login Authentication code
// app.post('/login',(req,res)=>{
//     console.log("Hey..!")
//     logdata=req.body.logindata
//     username=logdata.username
//     password=logdata.password
//     dbcon.query("SELECT * from login where username=? AND password =?",[username,password],
//     (err,result)=> {
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send(result); }

//         }
//     );
//     });