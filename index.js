//my back end witou firebase fuacion

const express =require("express");
const cors =require("cors")
const dotenv=require("dotenv")
dotenv.config()
//stipe need secret key to init
const stripe=require("stripe")(process.env.STRIPE_KEY);

// console.log(stripe)
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const app=express();
app.use(cors({origin:true}));
app.use(express.json())

 


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"success",


    });
});

app.post('/payment/create', async(req,res)=>{
    const total= parseInt(req.query.total);
    
    console.log(total)
    if(total>0){
    const paymentIntent= await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
    
    })
    
    res.status(201).json({ client_secret: paymentIntent.client_secret });
    
    
    console.log(total)
    console.log("payyyyemnt sucess gedaaa")
    
    }else{
        res.status(403).json({
            message:"total must be greater than 0"
        })
    }
    })
//!as server need to listen to with speicv port but in our case we will pass it to firebase to listen handle it 
app.listen(5000,(err)=>{
    if(err) throw err;
    console.log("Amzon server is Runnning in Port:4000, http://localhost:5000/")
})
