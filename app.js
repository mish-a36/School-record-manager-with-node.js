const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/school_records', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(error));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
// Home - List all students
app.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('index', { students });
});

// New student form
app.get('/students/new', (req, res) => {
  res.render('new');
});

// Create a new student
app.post('/students', async (req, res) => {
  const { name, grade, age } = req.body;
  await Student.create({ name, grade, age });
  res.redirect('/');
});

// Edit student form
app.get('/students/:id/edit', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('edit', { student });
});

// Update student
app.post('/students/:id', async (req, res) => {
  const { name, grade, age } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, grade, age });
  res.redirect('/');
});

// Delete student
app.post('/students/:id/delete', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
