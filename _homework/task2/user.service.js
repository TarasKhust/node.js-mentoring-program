import { data } from "./server";


export const createUser = (req, res) => {
    const users = req.body
    const user = data.findIndex((obj => obj.id === users.id));
    console.log(user)

    if (user >= 0) {

        data[user].age = users.age
        data[user].login = users.login
        data[user].password = users.password
        data[user].isDeleted = user.isDeleted

        res.status(200).json({message: `User with id ${users.id} successfully update`})

    } else {
        data.push(users)
        res.status(200).json({message: `User successfully created`})
    }


}

export const getUserById = (req, res) => {
    const user = data.find(({ id }) => id === req.params.id)

   if (user === undefined) {
       res.status(404).json({message: `User with id ${req.params.id} not found `})
   } else {
       res.json(user)
   }


}


export const removeUserById = (req, res) => {
    const users = req.body
    const user = data.findIndex((obj => obj.id === users.id));

    if (user >= 0) {

        data[user].isDeleted = true

        res.status(200).json({message: `User with id ${users.id} successfully remove`})

    } else {
        res.status(404).json({message: `User with id ${users.id} not found`})
    }

}
