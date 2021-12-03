from flask import request, g
from flask_json import FlaskJSON, JsonError, json_response, as_json
from psycopg2 import sql
from tools.token_tools import create_token

from tools.logging import logger

import bcrypt

def handle_request():
    logger.debug("Signup Handle Request")
    db = g.db
    cur = db.cursor()
    #use data here to auth the user
    password_from_user_form = request.form['password']
    
    user = {
            "sub" : request.form['username'] #sub is used by pyJwt as the owner of the token
            }

    dbQuery = sql.SQL("select {field} from {table} where {key} = %s").format(field = sql.Identifier('username'), table = sql.Identifier('users'),key = sql.Identifier('username'))
    cur.execute(dbQuery , (user['sub'],)) #syntax may needs fixing

    if cur.fetchone() is None:
        salted = bcrypt.hashpw( bytes(password_from_user_form, 'utf-8'),  bcrypt.gensalt(12))
        dbQuery = sql.SQL("insert into {table} ({field1} , {field2}) values (%s , %s);").format(table = sql.Identifier('users'), field1 = sql.Identifier('username'),field2 = sql.Identifier('password'))
        cur.execute(dbQuery, (user['sub'], salted.decode('utf-8'),))
        db.commit()
        return json_response(message="Successfully created account.")
    else:
        return json_response(message="Failed. Username already taken.")
