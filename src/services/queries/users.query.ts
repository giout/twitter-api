const sqlQueries = {
    aliasOrName: (search: string) => `SELECT * FROM users WHERE alias iLIKE '${search}%' OR first_name iLIKE '${search}%' OR last_name iLIKE '${search}%'`,

    alias: 'SELECT * FROM users WHERE alias = $1',
    
    pk: 'SELECT * FROM users WHERE user_id = $1'
}

export default sqlQueries