import express from 'express'
import {createUser, getUserById, removeUserById, schema, validator} from "./user.service";
const app = express();
const router = express.Router()

export const data = [{
    id: '1',
    login: "login1",
    password: "password1",
    age: 1,
    isDeleted: false

}, {
    id: '2',
    login: "login2",
    password: "password2",
    age: 2,
    isDeleted: true

}, {
    id: '3',
    login: "login3",
    password: "password3",
    age: 3,
    isDeleted: false

}, {
    id: '4',
    login: "login4",
    password: "password4",
    age: 4,
    isDeleted: true

}, {
    id: '5',
    login: "login5",
    password: "password5",
    age: 5,
    isDeleted: false

}, {
    id: '6',
    login: "login6",
    password: "password6",
    age: 6,
    isDeleted: true

}, {
    id: '7',
    login: "login7",
    password: "password7",
    age: 7,
    isDeleted: false

}, {
    id: '8',
    login: "login8",
    password: "password8",
    age: 8,
    isDeleted: true

}, {
    id: '9',
    login: "login9",
    password: "password9",
    age: 9,
    isDeleted: false

}, {
    id: '10',
    login: "login10",
    password: "password10",
    age: 10,
    isDeleted: true

}]

app.listen(3001, function() {
    console.log('listening on 3001')
})
app.use(express.json())





//routers
router.post('/user', validator.body(schema),  createUser)

router.get('/user/:id', getUserById)

router.put('/user/:id', removeUserById)


app.use("/", router)
