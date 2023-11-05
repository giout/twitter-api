-- Postgresql 14
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL,
    alias VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    followers_count INTEGER NOT NULL DEFAULT 0,
    biography TEXT NOT NULL,
    password TEX NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS follows (
    user_follower INTEGER,
    user_following INTEGER,
    PRIMARY KEY(user_follower, user_following),
    FOREIGN KEY (user_follower) REFERENCES users (user_id),
    FOREIGN KEY (user_following) REFERENCES users (user_id),
    CHECK (user_follower <> user_following)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL,
    user_id INTEGER NOT NULL,
    post_content TEXT NOT NULL,
    post_likes INTEGER NOT NULL DEFAULT 0,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    comment_to INTEGER,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (comment_to) REFERENCES posts (post_id),
    CHECK (post_id <> comment_to)
);

CREATE TABLE IF NOT EXISTS likes (
    post_id INTEGER,
    user_id INTEGER,
    PRIMARY KEY(post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts (post_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Al agregar un registro a likes, se incrementa el valor post_likes en el registro de posts, y al eliminar un registro, ocurre lo opuesto
CREATE OR REPLACE FUNCTION increase_post_likes() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE posts
        SET post_likes=post_likes+1
        WHERE post_id = NEW.post_id;
        RETURN NEW;
    END
    $$
    LANGUAGE PLPGSQL

CREATE OR REPLACE FUNCTION decrease_post_likes() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE posts
        SET post_likes=post_likes-1
        WHERE post_id = OLD.post_id;
        RETURN OLD;
    END
    $$
    LANGUAGE PLPGSQL

CREATE OR REPLACE TRIGGER like_post
    AFTER INSERT 
    ON likes
    FOR EACH ROW
    EXECUTE FUNCTION increase_post_likes();

CREATE OR REPLACE TRIGGER unlike_post
    AFTER DELETE 
    ON likes
    FOR EACH ROW
    EXECUTE FUNCTION decrease_post_likes();

    --