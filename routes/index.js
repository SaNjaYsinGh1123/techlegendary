const express = require('express');
const Quiz = require('../models/quiz');
const {validationResult,matchedData} = require('express-validator')
const validationRule = require('../middleware/validation-rule');

const router = express.Router();

router.post('/quizzes',validationRule.form ,async(req,res)=>{
  const {question,options,rightAnswer,startDate,endDate} = req.body;
  
    const errors= validationResult(req);
    if(!errors.isEmpty()){
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.json({errors:errMsg, inputData:inputData});

     }else{
        var inputData = matchedData(req);
        const s = new Date(startDate).getTime();
        const e = new Date(endDate).getTime();
        if(rightAnswer >= options.length){
            res.json("rightAnswer is not correct index,it must be less than options")
        }
        else if(s >= e){
            res.json("quiz end time must be greater than quiz start time")
        }else{
            try{
                const quizData = {
                    question: question,
                    options:options,
                    rightAnswer:rightAnswer,
                    startDate: s,
                    endDate: e
                }   
                const newQuiz = new Quiz(quizData);
                const savedQuiz = await newQuiz.save();         
                res.status(200).json(inputData);
            }catch(error){
                res.status(500).json(error);
            }
        }
    }

})

router.get('/quizzes/active',async(req,res)=>{
    const currentTime = new Date().getTime();
    try{
    const activeQuizzes =await Quiz.find({startDate:{ $lte: currentTime},endDate:{$gte:currentTime}});
    res.json(activeQuizzes);
    }catch(err){
     res.json(err)
    }
})
router.get('/quizzes/all',async(req,res)=>{
    try{
        console.log("hi");
        const allquizzes = await Quiz.find({});
        res.json(allquizzes);
    }catch(err){
        res.json(err);
    }
})

router.get('/quizzes/:id/result',async(req,res)=>{
    try{
        const id = req.params.id;
        const currentTime = new Date().getTime();
        const quizData = await Quiz.findById(id);
        
        console.log("current",currentTime);
        console.log("quizDate",quizData.endDate);
        var diff = (currentTime - quizData.endDate)/1000;

        if(diff > 0)
        {
            diff/= 60;
            const exactDiffInminutes = Math.abs(Math.round(diff));        
            if(exactDiffInminutes >= 5){
                res.json(quizData.rightAnswer);
            }else{
                res.json(`wait please ${5-exactDiffInminutes}`);
            }
        }else{
            res.json("quiz is not end")
        }
    }catch(err){
        res.json(err);
    }
})




module.exports = router;