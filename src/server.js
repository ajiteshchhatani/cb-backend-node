import express from "express";
import cors from "cors";
import createRandomUser from "../generateUserData.js";

const app = express();
app.use(express.json())
app.use(cors());

const USERS = [];

Array.from({length: 15}).forEach(() => {
    USERS.push(createRandomUser());
})

function getRandomSeconds() {
    return Math.floor(Math.random() * 4000);
}

app.post('/fakeApi/login', (req, res) => {
    const timeElapsed = getRandomSeconds();
    setTimeout(() => {
        res.send({
            "data": {
                "status": "success",
                "user": {
                    "id": 2,
                    "email": "janet.weaver@reqres.in",
                    "first_name": "Janet",
                    "last_name": "Weaver",
                    "avatar": "https://reqres.in/img/faces/2-image.jpg"
                }
            }
        })
    }, timeElapsed);
})

app.get('/fakeApi/users', (req, res) => {
    const timeElapsed = getRandomSeconds();
    let page = 0;
    let rowsPerPage = 15;
    let totalRecords = USERS.length;
    let totalPages = totalRecords / rowsPerPage  //3;
    let offset = rowsPerPage * page //   100 / page ( 100 / 4 ) = 25
    let limit = offset + rowsPerPage;
    let hasNextPage;
    setTimeout(() => {
        res.send({
            "page": page, //1,
            "rowsPerPage": 5,
            "total": totalRecords, //10,
            "total_pages": totalPages, //2,
            "data": [
                ...USERS.slice(offset, limit) //...USERS
            ]
        })
    }, timeElapsed)
})

app.post('/fakeApi/deleteUser', (req, res) => {
    const timeElapsed = getRandomSeconds();
    if(req.body.id) {
        const deleteIndex = USERS.findIndex((row) => row.id === req.body.id)
        USERS.splice(deleteIndex, 1)
        setTimeout(() => {
            res.send({
                "status": "Success",
                "data": [
                    ...USERS
                ]
            })
        }, timeElapsed)
    }
})

app.listen(8080, () => console.log("Server running on http://localhost:8080"))