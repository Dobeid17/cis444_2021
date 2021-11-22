from flask import request, g, session
from flask_json import FlaskJSON, JsonError, json_response, as_json

from tools.token_tools import create_token

from tools.logging import logger

def handle_request():
    logger.debug("Buy books request")
    
    cur = global_db_con.cursor()
    book_name = request.args.get('book_name', type=str)
    book_price = request.args.get('book_price', type=str)
    cur.execute(f"insert into bought (name,price) , values ('{book_name}' , {book_price});")
    global_db_con.commit()

    bought = True
    return json_response(status=bought)
