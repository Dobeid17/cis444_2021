from flask import request, g, session
from flask_json import FlaskJSON, JsonError, json_response, as_json

from tools.token_tools import create_token

from tools.logging import logger
from db_con import get_db_instance, get_db


global_db_con = get_db()

def handle_request():
    logger.debug("Buy cards request")
    
    cur = global_db_con.cursor()
    nameOfCard = request.args.get('cardName',type=str)
    sportOfCard = request.args.get('sport',type=str)
    cur.execute(f"insert into cardcollect (card_name , sport) values('{nameOfCard}' , {priceOfCard});")
    global_db_con.commit()

    bought = True
    return json_response(status=bought)
