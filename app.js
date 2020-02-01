const express = require('express');
const app = express();
const path = require('path');
const csv = require('csv-parser');
const bodyParser = require('body-parser')
const fs = require('fs');
const { uuid } = require('uuidv4');
const ReadAndWrite = require("read-and-write").ReadAndWrite;
const fileReader = new ReadAndWrite("./users.json");


const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './users.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'email', title: 'EMAIL'},
        {id: 'age', title: 'AGE'},
        {id: 'id', title: 'ID'}
    ]
});
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public'))); //dynamically serve all the static files

app.get('/', (req, res) => {
    res.render('index', {}); //name of file we want to render
});


app.post('/newUser', (req, res) => {
    
    let firstName = req.body.name;
    let emailAddress = req.body.email;
    let userAge = req.body.age;
    let users = [];
    const tempUsers = [
        {
            name: firstName,
            email: emailAddress,
            age: userAge,
            id: uuid()
        },
    ];
    fileReader.appendRecordsSync(tempUsers);
    users.push(...tempUsers);
    res.redirect('/');
    // const records = [{name: `${firstName}`, email: `${emailAddress}`, age: `${userAge}`, id: uuid()}]
    // csvWriter.writeRecords(records)       // returns a promise
    // .then(() => {
    //     console.log('userAdded');
    // });
    // res.redirect('/');
})
//push objects of users into users array from csv file



app.get('/viewUsers', (req, res) => {
    let users = fileReader.readAllRecordsSync();
    res.end(res.render('viewUsers', {userObj: users}))

    // fs.createReadStream('./users.csv')
	// .pipe(csv())
	// .on('data', (row) => {
    //     users.push({name: row.NAME, email:row.EMAIL, age:row.AGE})
	// })
	// .on('end', () => {
    //     console.log(users);
    //     res.render('viewUsers', {userObj: users});
    // });
})
app.get('/edit/:user', (req, res) => {
    let user = req.params.user;
    let userInfo;
    // let userInfo = {name:"Ethan Thompson",email:"my18yearoldet@gmail.com",age:"2"}
    let usersData = fileReader.readAllRecordsSync();
    for(let i = 0; i < usersData.length; i++) {
        if(usersData[i].id === user) {
            userInfo = usersData[i]
        }
    }
    res.render('editUser', userInfo);
})
app.post('/editUser', (req, res) => {
    //delete user from file
    let users = fileReader.deleteRecordSync({
        key: "id",
        value: req.body.id
    });
    //creating new entry
    console.log('user id: ' + req.params.user)
    let firstName = req.body.name;
    let emailAddress = req.body.email;
    let userAge = req.body.age;
    const tempUsers = [
        {
            name: firstName,
            email: emailAddress,
            age: userAge,
            id: uuid()
        },
    ];
    fileReader.appendRecordsSync(tempUsers);
    res.redirect('./viewUsers');
});

app.get('/delete/:user', (req, res) => {
    let user = req.params.user;
    let userInfo;
    let usersData = fileReader.readAllRecordsSync();
    for(let i = 0; i < usersData.length; i++) {
        if(usersData[i].id === user) {
            userInfo = usersData[i]
        }
    }
    //loads whole user object to deleteUser
    res.render('deleteUser', userInfo);
})
app.post('/deleteUser', (req, res) => {
    //delete user from file
    let users = fileReader.deleteRecordSync({
        key: "id",
        value: req.body.id
    });    
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});