import pool from "../config/database"

const selectAll = 'SELECT * FROM users '

export const findUsers  = async (search: string = '') => {
    let sentence = selectAll +
    `WHERE alias iLIKE '${search}%' 
    OR first_name iLIKE '${search}%' 
    OR last_name iLIKE '${search}%'`

    const users = await pool.query(sentence)
    
    return users.rows
}

export const findUserByAlias = async (alias: string) => {
    let sentence = selectAll +
    `WHERE alias = $1`

    const user = await pool.query(sentence, [alias])

    if (user.rows[0])
        return user.rows[0]

    return
}

export const findUserByPk = async (id: string) => {
    let sentence = selectAll +
    `WHERE user_id = $1`

    const user = await pool.query(sentence, [id])

    if (user.rows[0])
        return user.rows[0]

    return
}

export const createUser = async (alias: string, firstName: string, lastName: string, biography: string, password: string) => {
    const sentence = 
    `INSERT INTO users (alias, first_name, last_name, biography, password) 
    VALUES ($1, $2, $3, $4, $5)`

    const params = [alias, firstName, lastName, biography, password]

    await pool.query(sentence, params)
}

export const deleteUser = async (id: string) => {
    const sentence = 
    `DELETE FROM users WHERE id=$1`

    await pool.query(sentence, [id])
}

/*
const test = async () => {
    //await createUser('giout','Giovanni', 'Urdaneta', 'a')
    const a = await findUsers('ju')
    console.log(a)
}

test()
*/