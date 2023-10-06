const jwt = require("jsonwebtoken");
const JohnDoeRailway = require("../models/johnDoeRailwaySchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Company = require("../models/companySchema");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");

const johnDoeRailwayController={

    registerCompany:catchAsyncErrors(async(req,res,next)=>{
        const companyExists = await Company.find({companyName:req.body.companyName})

        if(companyExists.length!==0){
            return next(new ErrorHandler("Company already registered",403))
        }

        const company = await Company.create(req.body);

        company.isRegistered = true;

        const clientID=crypto.randomBytes(12).toString("hex");
        const clientSecret=crypto.randomBytes(8).toString("hex");

        company.clientID = clientID
        company.clientSecret = clientSecret
        
        await company.save({validateBeforeSave: false});

        res.status(200).json({
            "companyName":company.companyName,
            "clientID":clientID,
            "clientSecret":clientSecret
        })

    }),

    getAuthToken:catchAsyncErrors(async(req,res,next)=>{
        const data = req.body

        const token = createToken(data)

        res.status(200).json({
            "token_type":"Bearer",
            "access_token":token,
            "expires_in":16826289
        })
    }),

    getAllTrains:catchAsyncErrors(async(req,res,next)=>{
        const trains = await JohnDoeRailway.find()

        if(trains.length===0){
            return next(new ErrorHandler("No trains available",404))
        }

        res.status(200).json({trains})
    }),

    getTrainById : catchAsyncErrors(async(req,res,next)=>{
        const id = req.params.id;

        const train = await JohnDoeRailway.findById(id);

        if(!train){
            return next(new ErrorHandler("No train available for the given id",404))
        }

        res.status(200).json({train})
    })
}

const createToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  };

  module.exports=johnDoeRailwayController