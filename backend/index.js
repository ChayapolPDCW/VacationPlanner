// EXAMPLE

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

let users = [];
let counter = 1;

 


// path = GET /users -------------------------------------------------
app.get('/users', (req, res) => {
    const filteredUsers = users.map(user => {
        return {
            id : user.id, 
            firstName : user.firstName,
            fullName : user.firstName + ' ' + user.lastName,

        }
    })
    res.json(filteredUsers);
})

// get user by id
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const selectedUser = users.findIndex(user => user.id == id);
    res.json(users[selectedUser]); 
})

//path = pOST /user -------------------------------------------------
app.post('/user', (req, res) => {
    let user = req.body; 
    user.id = counter;
    counter++;



    users.push(user);
    res.json({
        message: "User created successfully",
        users: users 
    }); 
})  


//path = PUT /user/:id -------------------------------------------------    
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    let selectedIndex = users.findIndex(user => user.id == id);

    users[selectedIndex].firstName = updatedUser.firstName || users[selectedIndex].firstName;
    users[selectedIndex].lastName = updatedUser.lastName || users[selectedIndex].lastName;
    users[selectedIndex].email = updatedUser.email || users[selectedIndex].email;
    users[selectedIndex].age = updatedUser.age || users[selectedIndex].age;
    users[selectedIndex].gender = updatedUser.gender || users[selectedIndex].gender;

    res.json({
        message: "User updated successfully",
        data: {
            user : updatedUser,
            indexUpdated : selectedIndex
        }
    })
})



app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    let selectedIndex = users.findIndex(user => user.id == id);
    if(updatedUser.firstName){
        users[selectedIndex].firstName = updatedUser.firstName;
    }
    if(updatedUser.lastName){
        users[selectedIndex].lastName = updatedUser.lastName;
    }
    if(updatedUser.email){
        users[selectedIndex].email = updatedUser.email;
    }
    if(updatedUser.age){
        users[selectedIndex].age = updatedUser.age;
    }   
    if(updatedUser.gender){
        users[selectedIndex].gender = updatedUser.gender;
    }


    res.json({
        message: "User updated successfully",
        data: {
            user : updatedUser,
            indexUpdated : selectedIndex
        }
    })
})


//path = DELETE /user/:id -------------------------------------------------
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let selectedIndex = users.findIndex(user => user.id == id);
    
    users.splice(selectedIndex, 1);

    res.json({
        message: "User deleted successfully",
        indexDeleted : selectedIndex,
    })
})

// -------------------------------------------------------------------
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
