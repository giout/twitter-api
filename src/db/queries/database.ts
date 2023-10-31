const queries = {
    createTablesAndTriggers: `
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL,
            alias VARCHAR(20) NOT NULL UNIQUE,
            first_name VARCHAR (30) NOT NULL,
            last_name VARCHAR (30) NOT NULL,
            followers_count INTEGER NOT NULL DEFAULT 0,
            biography TEXT NOT NULL,
            PRIMARY KEY (user_id)
        );
        
        CREATE TABLE IF NOT EXISTS followers (
            user_follower INTEGER NOT NULL,
            user_following INTEGER NOT NULL,
            PRIMARY KEY(user_follower, user_following),
            FOREIGN KEY (user_follower) REFERENCES users (user_id),
            FOREIGN KEY (user_following) REFERENCES users (user_id),
            CHECK (user_follower <> user_following)
        );
        
        CREATE TABLE IF NOT EXISTS tweets (
            tweet_id SERIAL,
            user_id INTEGER NOT NULL,
            tweet_content TEXT NOT NULL,
            tweet_likes INTEGER NOT NULL DEFAULT 0,
            creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
            comment_to INTEGER,
            PRIMARY KEY (tweet_id),
            FOREIGN KEY (user_id) REFERENCES users (user_id),
            FOREIGN KEY (comment_to) REFERENCES tweets (tweet_id),
            CHECK (tweet_id <> comment_to)
        );
        
        CREATE TABLE IF NOT EXISTS likes (
            tweet_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY(tweet_id, user_id),
            FOREIGN KEY (tweet_id) REFERENCES tweets (tweet_id),
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        );`
}

export default queries