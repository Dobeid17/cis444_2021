from flask import request, g
from flask_json import FlaskJSON, JsonError, json_response, as_json
from tools.token_tools import create_token
from psycopg2 import sql
from tools.logging import logger
import bcrypt

def handle_request():
    logger.debug("Login Handle Request")
    #use data here to auth the user
    db = g.db
    cur = db.cursor()

    password_from_user_form = request.form['password']
    user = {
            "sub" : request.form['username'] #sub is used by pyJwt as the owner of the token
            }
    dbQuery = sql.SQL("select * from {table} where {key} = %s").format(table = sql.Identifier('users'),key=sql.Identifier('username'))
    cur.execute(dbQuery, (user['sub'],))

    if not cur.fetchone():
        return json_response(status_=401, message = 'Invalid credentials', authenticated =  False )

    else:
        cur.execute(dbQuery, (user['sub'],))
        hashPass = cur.fetchone()[2]

        if bcrypt.checkpw(bytes(password_from_user_form, 'utf-8'), bytes(hashPass, 'utf-8')):
            return json_response( token = create_token(user) , authenticated = True)
        else:
            return json_response(status_=401, message = 'Incorrect Username/Password', authenticated =  False )
