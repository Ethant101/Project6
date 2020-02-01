# Getting Started

Start by importing the constructor function

```
const ReadAndWrite = require("read-and-write").ReadAndWrite;
```

Next create a new instance of the constructor function with the path to the file that you want to read from and write to

```
const fileReader = new ReadAndWrite("./users.txt");
```

# Reading From A File

## Synchronously

The following line reads all records from the file

```
let users = fileReader.readAllRecordsSync();
```

It should return an array of objects, each object representing one record

Example:
```
[
  {
    username: 'berrybloxinator',
    firstName: 'Brady',
    lastName: 'Liechty',
    email: 'berrybloxinator@gmail.com',
    age: '20',
    userId: '03a13ff9-9bfe-483f-8cc5-fa16caf1898b',
    timeCreated: '1/28/2020, 2:33:33 PM'
  },
  {
    username: 'skateboardnerd',
    firstName: 'John',
    lastName: 'Hill',
    email: 'skateboard4life@gmail.com',
    age: '25',
    userId: '3ef6972e-6c71-4fd2-82df-da4c2dc9baf5',
    timeCreated: '1/28/2020, 2:34:18 PM'
  }
]
```

## Asynchronously

To use this function asynchronously you have the option pass a callback that will be called when all the files contents have been read

The readAllRecords function will call your callback with the file contents formatted as an array of objects just like with the readAllRecordsSync function

```
let users = [];
fileReader.readAllRecords(fileContents => {
    users = fileContents;
});
```

# Appending Records

## Synchronously

To append records pass in an array of objects

```
let users = [];
const d = new Date();
const tempUsers = [
    {
        username: "Destiny",
        firstName: "Steven",
        lastName: "Bonnell",
        email: "destiny@gmail.com",
        age: 32,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    },
    {
        username: "xXhardcore_gamerXx",
        firstName: "Doug",
        lastName: "Smith",
        email: "league4life@gmail.com",
        age: 29,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    }
];
fileReader.appendRecordsSync(tempUsers);
```

Append records does not return anything so in this case I have to manually add the appended users to my array

```
users.push(...tempUsers);
```

Appending records will not overwrite the file, only add to the end of it.

## Asynchronously

If you do this function asynchronously you have the option of passing in a callback that will do whatever you want it to whenever the function has appended the user(s)

This callback is not called with any parameters

```
let users = [];
const d = new Date();
const tempUsers = [
    {
        username: "Destiny",
        firstName: "Steven",
        lastName: "Bonnell",
        email: "destiny@gmail.com",
        age: 32,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    },
    {
        username: "xXhardcore_gamerXx",
        firstName: "Doug",
        lastName: "Smith",
        email: "league4life@gmail.com",
        age: 29,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    }
];
fileReader.appendRecords(tempUsers, () => {
    console.log("user successfully appended to file");
});
users.push(...tempUsers);
```

# Writing Records

## Synchronously

Writing records is done almost the exact same way except for the fact that the file is overwritten

```
let users = [];
const d = new Date();
const tempUsers = [
    {
        username: "Destiny",
        firstName: "Steven",
        lastName: "Bonnell",
        email: "destiny@gmail.com",
        age: 32,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    },
    {
        username: "xXhardcore_gamerXx",
        firstName: "Doug",
        lastName: "Smith",
        email: "league4life@gmail.com",
        age: 29,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    }
];
fileReader.writeRecordsSync(tempUsers);
users = tempUsers;
```

## Asynchronously

Just like the asynchronous version of appendUsers you can pass in a callback that will do whatever you want when the users are written to the file

This callback is not called with any parameters

```
let users = [];
const d = new Date();
const tempUsers = [
    {
        username: "Destiny",
        firstName: "Steven",
        lastName: "Bonnell",
        email: "destiny@gmail.com",
        age: 32,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    },
    {
        username: "xXhardcore_gamerXx",
        firstName: "Doug",
        lastName: "Smith",
        email: "league4life@gmail.com",
        age: 29,
        userId: uuid.v4(),
        timeCreated: d.toLocaleString()
    }
];
fileReader.writeRecords(tempUsers, () => {
    console.log("Users successfully written to file");
});
users = tempUsers;
```

# Deleting Records

## Synchronously

To delete a record you have to pass in an id

An id is an object that is used to identify the record that you want to be deleted

```
let users = [];
users = fileReader.deleteRecordSync({
    key: "name",
    value: "Brady"
});
```

Pretty self explanatory

This will find the record with the key and value that you pass in

It will remove it from the file and return an array with all of of the records except the one that was deleted

## Asynchronously

Keep in mind that for deleteRecord your callback will be called with an updated array of your records

```
let users = [];
fileReader.deleteRecord({
    key: "name",
    value: "Brady"
}, refactoredUsers => {
    users = refactoredUsers;
});
```

# Editing Records

## Synchronously

This is the most complicated function in this package

Just like the delete records function, the first parameter is an id to determine which record to edit

The second parameter is an array of id's to tell the function which parts of the record you want to change

The second parameter is where you specify the key and then specify what value you want the keys value to change to

```
let users = [];
users = fileReader.editRecordSync({
    key: "userId",
    value: 3ef6972e-6c71-4fd2-82df-da4c2dc9baf5
}, [
    {
        key: "username",
        value: "AnthonyPadilla"
    }, {
        key: "email",
        value: "anthony.padilla@gmail.com"
    }
]);
```

After running this the record with the userId of 3ef6972e-6c71-4fd2-82df-da4c2dc9baf5 would change from

```
{
    username: "A_Padilla",
    firstName: "Anthony",
    lastName: "Padilla",
    email: "a_padilla@gmail.com",
    age: 29,
    userId: 3ef6972e-6c71-4fd2-82df-da4c2dc9baf5,
    timeCreated: 1/28/2020, 2:34:18 PM
}
```

to

```
{
    username: "AnthonyPadilla",
    firstName: "Anthony",
    lastName: "Padilla",
    email: "anthony.padilla@gmail.com",
    age: 29,
    userId: 3ef6972e-6c71-4fd2-82df-da4c2dc9baf5,
    timeCreated: 1/28/2020, 2:34:18 PM
}
```

The editRecordSync function will return an array with all of the records including the edited record

## Asynchronously

Your callback will again be called with an updated array of your records

```
let users = [];
fileReader.editRecord({
    key: "userId",
    value: 3ef6972e-6c71-4fd2-82df-da4c2dc9baf5
}, [
    {
        key: "username",
        value: "AnthonyPadilla"
    }, {
        key: "email",
        value: "anthony.padilla@gmail.com"
    }
], refactoredUsers => {
    users = refactoredUsers;
});
```

## Notes

The records that you write to a file can have any amount of key value pairs and you can have whatever keys and values you wish

The callback is optional for every asynchronous version of all functions

Synchronous functions will always end with Sync and asynchronous functions will not

> readAllRecordsSync (synchronous)

> readAllRecords (asynchronous)