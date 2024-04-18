
const userName = "practice"
const password = "1XxhHiNQ1USZTSFN"
const dbName = "todoList"
const url = `mongodb+srv://${userName}:${password}@learnmongodb.nhbmsow.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=LearnMongoDB`

// 'mongodb+srv://practice:1XxhHiNQ1USZTSFN@learnmongodb.nhbmsow.mongodb.net/todoList?retryWrites=true&w=majority&appName=LearnMongoDB'

const option = { 
    autoIndex: true,
}
const mongoose = require('mongoose');
mongoose.connect(url, option)
.then(() => {
    console.log("DB Connected")
})
.catch((err) => {
    console.log(err)
})
