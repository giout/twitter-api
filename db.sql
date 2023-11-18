-- Postgresql 14
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL,
    alias VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    followers_count INTEGER NOT NULL DEFAULT 0,
    biography TEXT NOT NULL,
    user_followers INTEGER NOT NULL DEFAULT 0,
    user_followings INTEGER NOT NULL DEFAULT 0,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    password TEXT NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS follows (
    user_follower INTEGER,
    user_following INTEGER,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_follower, user_following),
    FOREIGN KEY (user_follower) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_following) REFERENCES users (user_id) ON DELETE CASCADE,
    CHECK (user_follower <> user_following)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL,
    user_id INTEGER NOT NULL,
    post_content TEXT NOT NULL,
    post_likes INTEGER NOT NULL DEFAULT 0,
    post_comments INTEGER NOT NULL DEFAULT 0,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    image_url TEXT,
    comment_to INTEGER,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_to) REFERENCES posts (post_id) ON DELETE CASCADE,
    CHECK (post_id <> comment_to)
);

CREATE TABLE IF NOT EXISTS likes (
    post_id INTEGER,
    user_id INTEGER,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- al agregar un registro a la tabla likes, se incrementa post_likes en el post correspondiente
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

CREATE OR REPLACE TRIGGER like_post
    AFTER INSERT 
    ON likes
    FOR EACH ROW
    EXECUTE FUNCTION increase_post_likes();

-- al eliminar un registro a la tabla likes, se decrementa post_likes en el post correspondiente
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

CREATE OR REPLACE TRIGGER unlike_post
    AFTER DELETE 
    ON likes
    FOR EACH ROW
    EXECUTE FUNCTION decrease_post_likes();

-- al agregar un registro a la tabla follows, se incrementa el valor de user_followers en el registro del usuario que esta siendo seguido y se incrementa el valor de user_followings en el registro del usuario que esta siguiendo
CREATE OR REPLACE FUNCTION increase_user_followers() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE users
        SET user_followers = user_followers + 1
        WHERE user_id = NEW.user_following;
        UPDATE users
        SET user_followings = user_followings + 1
        WHERE user_id = NEW.user_follower;
        RETURN NEW;
    END
    $$
    LANGUAGE PLPGSQL

CREATE OR REPLACE TRIGGER follow_user
    AFTER INSERT 
    ON follows
    FOR EACH ROW
    EXECUTE FUNCTION increase_user_followers();

-- al eliminar un registro de la tabla follows, se decrementa el valor de user_followers en el registro del usuario al cual se dejo de seguir y se decrementa el valor de user_followings en el registro del usuario que que dejo de seguir
CREATE OR REPLACE FUNCTION decrease_user_followers() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE users
        SET user_followers = user_followers - 1
        WHERE user_id = OLD.user_following;
        UPDATE users
        SET user_followings = user_followings - 1
        WHERE user_id = OLD.user_follower;
        RETURN OLD;
    END
    $$
    LANGUAGE PLPGSQL

CREATE OR REPLACE TRIGGER unfollow_user
    AFTER DELETE 
    ON follows
    FOR EACH ROW
    EXECUTE FUNCTION decrease_user_followers();


-- al agregar un registro a la tabla posts con un valor de comment_to apuntando a otro post, se incrementa el valor de post_coments en el post al que se apunta.
CREATE OR REPLACE FUNCTION increase_comments() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE posts
        SET post_comments = post_comments + 1
        WHERE post_id = NEW.comment_to;
        RETURN NEW;
    END
    $$
    LANGUAGE PLPGSQL

CREATE OR REPLACE TRIGGER comment_post
    AFTER INSERT
    ON posts
    FOR EACH ROW
    EXECUTE FUNCTION increase_comments();

-- al eliminar un registro de la tabla posts con un valor de comment_to apuntando a otro post, se decrementa el valor de post_coments en el post al que se apunta.
CREATE OR REPLACE FUNCTION decrease_comments() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE posts
        SET post_comments = post_comments - 1
        WHERE post_id = OLD.comment_to;
        RETURN OLD;    
    END
    $$
    LANGUAGE PLPGSQL

CREATE OR REPLACE TRIGGER uncomment_post
    AFTER DELETE 
    ON posts
    FOR EACH ROW
    EXECUTE FUNCTION decrease_comments();