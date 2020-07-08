const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router();

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect(
//     " mongodb+srv://fosfat:12345@cluster0-dlm3x.mongodb.net/MERNDB?retryWrites=true&w=majority", {//For MongoDB connection(cloud)
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });
// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log('Data base  fdfdfd connection...');
// });

// "mongodb+srv://fosfat:12345@cluster0-etxrz.azure.mongodb.net/fosfatDB?retryWrites=true&w=majority"
// " mongodb+srv://fosfat:12345@cluster0-dlm3x.mongodb.net/MERNDB?retryWrites=true&w=majority"
async function start() {
    try {
        //? DB connection//////////////////////////////////////////////////////////
        await mongoose.connect(
            " mongodb+srv://fosfat:12345@cluster0-dlm3x.mongodb.net/MERNDB?retryWrites=true&w=majority", {//For MongoDB connection(cloud)
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Data base connected...');
        ///? Routes//////////////////////////////////////////////////////////////////
        // todoRoutes.route('/').get((req, res) => {
        //     Todo.find((err, todos) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             res.json(todos);
        //         }
        //     });
        // });
        //! Get all
        todoRoutes.get('/', (req, res) => {
            Todo.find((err, todos) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(todos);
                }
            });
        });
        //!Get all sort 
        todoRoutes.get('/sort/:id', (req, res) => {
            let id = req.params.id;
            Todo.find().sort({ todo_priority: id, todo_responsible: 1 }).exec((err, todos) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(todos);
                }
            });
        });
        //!Get by id
        todoRoutes.route('/:id').get((req, res) => {
            let id = req.params.id;
            Todo.findById((id), (err, todo) => {
                if (err) throw err;
                res.json(todo);
            });
        });
        //! Delete by id
        todoRoutes.route('/:id').delete((req, res) => {
            let id = req.params.id;
            Todo.findByIdAndDelete((id), (err, todo) => {
                if (err) throw err;
                res.json('todo deleted');
            });
        });
        //! Add new 
        todoRoutes.route('/add').post((req, res) => {
            let todo = new Todo(req.body);
            todo.save()
                .then(todo => {
                    res.status(200).json({ 'todo': 'todo added successfully' });
                })
                .catch(err => {
                    res.status(400).send('adding new todo failed');
                });
        });
        //!Update 
        todoRoutes.route('/update/:id').post((req, res) => {
            Todo.findById(req.params.id, (err, todo) => {
                if (!todo) {
                    res.status(404).send('data is not found');
                } else {
                    todo.todo_description = req.body.todo_description;
                    todo.todo_responsible = req.body.todo_responsible;
                    todo.todo_priority = req.body.todo_priority;
                    todo.todo_completed = req.body.todo_completed;
                    todo.save()
                        .then(todo => {
                            res.json('Todo updated');
                        })
                        .catch(err => {
                            res.status(400).send('Update failed');
                        })
                }
            })
        })
        //! Connect app with router
        app.use('/todos', todoRoutes);

        app.listen(PORT, () => console.log(`Server has been  started on port ${PORT}...`));//For server running
    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}
start();