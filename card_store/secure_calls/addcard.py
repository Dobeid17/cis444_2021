from flask import request, g, session
from flask_json import FlaskJSON, JsonError, json_response, as_json

from tools.token_tools import create_token

from tools.logging import logger
from db_con import get_db_instance, get_db


global_db_con = get_db()

def handle_request():
    logger.debug("add cards request")
    
    cur = global_db_con.cursor()
    playerName = request.args.get('playername',type=str)
    cardMake = request.args.get('cardmaker',type=str)
    cardNumber = request.args.get('number',type=int)
    cardSport = request.args.get('sport',type=str)
    cardGrade = request.args.get('grade',type=int)

    cur.execute(f"insert into cards (playername , cardmaker, number , sport, grade) values('{playerName}' , '{cardMake}' , {cardNumber} , '{cardSport}' , {cardGrade} );")
    global_db_con.commit()

    added = True
    return json_response(data = {'playername': playerName , 'cardmaker': cardMake , 'number':cardNumber , 'sport' : cardSport , 'grade': cardGrade})
