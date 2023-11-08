import pool from "../config/database"
import sql from "../queries/users.query"

export const findUsers  = async (search: string, offset: string | null, limit: string | null) => {
    let sentence = sql.selectAllBy.aliasOrName

    const users = await pool.query(sentence, [search, offset, limit])
    
    return users.rows
}

export const findUserByAlias = async (alias: string) => {
    let sentence = sql.selectAllBy.alias

    const user = await pool.query(sentence, [alias])

    if (user.rows[0])
        return user.rows[0]

    return
}

export const findUserByPk = async (id: string) => {
    let sentence = sql.selectAllBy.pk

    const user = await pool.query(sentence, [id])

    if (user.rows[0])
        return user.rows[0]

    return
}

export const createUser = async (alias: string, firstName: string, lastName: string, biography: string, password: string) => {
    const sentence = sql.insert

    const params = [alias, firstName, lastName, biography, password]

    const user = await pool.query(sentence, params)

    return user.rows[0]
}

export const deleteUser = async (id: string) => {
    const sentence = sql.delete

    await pool.query(sentence, [id])
}

export const updateUserByPk = async(id: string, entry: any) => {
    const { alias, first_name, last_name, password, biography } = entry

    if (alias) 
        await pool.query(sql.update.alias, [alias, id])
    
    if (first_name) 
        await pool.query(sql.update.first_name, [first_name, id])
        
    if (last_name) 
    await pool.query(sql.update.last_name, [last_name, id])
    
    if (biography) 
        await pool.query(sql.update.biography, [biography, id])
        
    if (password) 
        await pool.query(sql.update.password, [password, id])

    return findUserByPk(id)
}

export const findFollowersByPk = async (user_following: string, search: string, offset: string|null, limit: string|null) => {
    const followers = await pool.query(sql.selectFollowers, [user_following, search, offset, limit])
    return followers.rows
 }
 
 export const findFollowingsByPk = async (user_follower: string, search: string, offset: string|null, limit: string|null) => {
     const followings = await pool.query(sql.selectFollowings, [user_follower, search, offset, limit])
     return followings.rows
 }