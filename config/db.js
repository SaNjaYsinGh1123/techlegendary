const mongoose = require('mongoose');

mongoose.set('strictQuery',true);



mongoose.connect('mongodb+srv://megacloud:megacloud@cluster0.gijawgh.mongodb.net/techlegendary?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(console.log('connected to database'))
  .catch((err)=> console.log(err));
