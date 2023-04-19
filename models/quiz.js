const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question:{
        type:String,
        require:true
    },
    options:{
        type:Array,
        require:true
    },
    rightAnswer:{
        type:Number,
        require:true
    },
    startDate:{
        type:Number,
        require:true
    },
    endDate:{
        type:Number,
        require:true
    },
},{
    timestamps:true
})

module.exports = mongoose.model('quiz',QuizSchema);