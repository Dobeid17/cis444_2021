from flask import request, g, session
from flask_json import FlaskJSON, JsonError, json_response, as_json

from tools.token_tools import create_token

from tools.logging import logger
from db_con import get_db_instance, get_db


global_db_con = get_db()

def handle_request():
    logger.debug("Buy books request")
    
    cur = global_db_con.cursor()
    book_name = request.args.get('book_name', type=[str])
    price = request.args.get('book_price', type=[str])
    
    data = request.args.get('data')
    print("LOGGER DATA")
    logger.debug(data)

    cur.execute(f"insert into bought (book_name , price) values('{book_name}' , {price});")
    global_db_con.commit()

    bought = True
    return json_response(status=bought)
