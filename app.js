import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv';

const __dirname = path.resolve(); 

const port = 80;
const app = express();

dotenv.config();


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

await mongoose.connect(process.env.MONGO_URL)

app.get('/', (req, res) => {
    res.render('index');
})

const schema = new mongoose.Schema({
    name: String,
    email: String,
    company: String,
    message: String
})
const Schema = mongoose.model('form', schema);

app.post("/post", (req, res) => {
    const { name, email, company, message } = req.body;
    const schema = new Schema({ name, email, company, message })
    schema.save()
    res.render('afterSubmit')
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})