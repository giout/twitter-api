import pool from "../config/database"
import sql from "./queries/posts.query"


export const findPostByPk = async (id: string) => {
    const posts = await pool.query(sql.selectAllBy.pk, [id])
    
    if (posts.rows[0]) 
        return posts.rows[0]
    
    return
}