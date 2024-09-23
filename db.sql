CREATE SCHEMA IF NOT EXISTS twitter;

CREATE TABLE IF NOT EXISTS twitter.users (
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

CREATE TABLE IF NOT EXISTS twitter.follows (
    user_follower INTEGER,
    user_following INTEGER,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_follower, user_following),
    FOREIGN KEY (user_follower) REFERENCES twitter.users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_following) REFERENCES twitter.users (user_id) ON DELETE CASCADE,
    CHECK (user_follower <> user_following)
);

CREATE TABLE IF NOT EXISTS twitter.posts (
    post_id SERIAL,
    user_id INTEGER NOT NULL,
    post_content TEXT NOT NULL,
    post_likes INTEGER NOT NULL DEFAULT 0,
    post_comments INTEGER NOT NULL DEFAULT 0,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    image_url TEXT,
    comment_to INTEGER,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES twitter.users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_to) REFERENCES twitter.posts (post_id) ON DELETE CASCADE,
    CHECK (post_id <> comment_to)
);

CREATE TABLE IF NOT EXISTS twitter.likes (
    post_id INTEGER,
    user_id INTEGER,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES twitter.posts (post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES twitter.users (user_id) ON DELETE CASCADE
);

-- al agregar un registro a la tabla likes, se incrementa post_likes en el post correspondiente
CREATE OR REPLACE FUNCTION twitter.increase_post_likes() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE twitter.posts
        SET post_likes=post_likes+1
        WHERE post_id = NEW.post_id;
        RETURN NEW;
    END
    $$
    LANGUAGE PLPGSQL;

CREATE TRIGGER like_post
    AFTER INSERT 
    ON twitter.likes
    FOR EACH ROW
    EXECUTE FUNCTION twitter.increase_post_likes();

-- al eliminar un registro a la tabla likes, se decrementa post_likes en el post correspondiente
CREATE OR REPLACE FUNCTION twitter.decrease_post_likes() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE twitter.posts
        SET post_likes=post_likes-1
        WHERE post_id = OLD.post_id;
        RETURN OLD;
    END
    $$
    LANGUAGE PLPGSQL;

CREATE TRIGGER unlike_post
    AFTER DELETE 
    ON twitter.likes
    FOR EACH ROW
    EXECUTE FUNCTION twitter.decrease_post_likes();

-- al agregar un registro a la tabla follows, se incrementa el valor de user_followers en el registro del usuario que esta siendo seguido y se incrementa el valor de user_followings en el registro del usuario que esta siguiendo
CREATE OR REPLACE FUNCTION twitter.increase_user_followers() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE twitter.users
        SET user_followers = user_followers + 1
        WHERE user_id = NEW.user_following;
        UPDATE twitter.users
        SET user_followings = user_followings + 1
        WHERE user_id = NEW.user_follower;
        RETURN NEW;
    END
    $$
    LANGUAGE PLPGSQL;

CREATE TRIGGER follow_user
    AFTER INSERT 
    ON twitter.follows
    FOR EACH ROW
    EXECUTE FUNCTION twitter.increase_user_followers();

-- al eliminar un registro de la tabla follows, se decrementa el valor de user_followers en el registro del usuario al cual se dejo de seguir y se decrementa el valor de user_followings en el registro del usuario que que dejo de seguir
CREATE OR REPLACE FUNCTION twitter.decrease_user_followers() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE twitter.users
        SET user_followers = user_followers - 1
        WHERE user_id = OLD.user_following;
        UPDATE twitter.users
        SET user_followings = user_followings - 1
        WHERE user_id = OLD.user_follower;
        RETURN OLD;
    END
    $$
    LANGUAGE PLPGSQL;

CREATE TRIGGER unfollow_user
    AFTER DELETE 
    ON twitter.follows
    FOR EACH ROW
    EXECUTE FUNCTION twitter.decrease_user_followers();


-- al agregar un registro a la tabla posts con un valor de comment_to apuntando a otro post, se incrementa el valor de post_coments en el post al que se apunta.
CREATE OR REPLACE FUNCTION twitter.increase_comments() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE twitter.posts
        SET post_comments = post_comments + 1
        WHERE post_id = NEW.comment_to;
        RETURN NEW;
    END
    $$
    LANGUAGE PLPGSQL;

CREATE TRIGGER comment_post
    AFTER INSERT
    ON twitter.posts
    FOR EACH ROW
    EXECUTE FUNCTION twitter.increase_comments();

-- al eliminar un registro de la tabla posts con un valor de comment_to apuntando a otro post, se decrementa el valor de post_coments en el post al que se apunta.
CREATE OR REPLACE FUNCTION twitter.decrease_comments() 
    RETURNS TRIGGER 
    AS 
    $$
    BEGIN
        UPDATE twitter.posts
        SET post_comments = post_comments - 1
        WHERE post_id = OLD.comment_to;
        RETURN OLD;    
    END
    $$
    LANGUAGE PLPGSQL;

CREATE TRIGGER uncomment_post
    AFTER DELETE 
    ON twitter.posts
    FOR EACH ROW
    EXECUTE FUNCTION twitter.decrease_comments();