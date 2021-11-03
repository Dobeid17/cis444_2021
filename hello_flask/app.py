from flask import Flask,render_template,request,make_response, jsonify,redirect
from flask_json import FlaskJSON, JsonError, json_response, as_json
import jwt

import datetime
import bcrypt

from db_con import get_db_instance, get_db

app = Flask(__name__)
FlaskJSON(app)

USER_PASSWORDS = { "cjardin": "strong password"}

IMGS_URL = {
            "DEV" : "/static",
            "INT" : "https://cis-444-fall-2021.s3.us-west-2.amazonaws.com/images",
            "PRD" : "http://d2cbuxq67vowa3.cloudfront.net/images"
            }

CUR_ENV = "PRD"
JWT_SECRET = None
token = None
message = None
boughtMessage = 0

global_db_con = get_db()


with open("secret", "r") as f:
    JWT_SECRET = f.read()

@app.route('/') #endpoint
def index():
    return 'Web App with Python Caprice!' + USER_PASSWORDS['cjardin']


@app.route('/hello') #endpoint
def hello():
    return render_template('hello.html',img_url=IMGS_URL[CUR_ENV] ) 

@app.route('/back',  methods=['GET']) #endpoint
def back():
    return render_template('backatu.html',input_from_browser=request.args.get('usay', default = "nothing", type = str) )

@app.route('/backp',  methods=['POST']) #endpoint
def backp():
    print(request.form)
    salted = bcrypt.hashpw( bytes(request.form['fname'],  'utf-8' ) , bcrypt.gensalt(10))
    print(salted)

    print(  bcrypt.checkpw(  bytes(request.form['fname'],  'utf-8' )  , salted ))

    return render_template('backatu.html',input_from_browser= str(request.form) )

@app.route('/auth',  methods=['POST']) #endpoint
def auth():
        print(request.form)
        return json_response(data=request.form)



#Assigment 2
@app.route('/ss1') #endpoint
def ss1():
    return render_template('server_time.html', server_time= str(datetime.datetime.now()) )

@app.route('/getTime') #endpoint
def get_time():
    return json_response(data={"password" : request.args.get('password'),
                                "class" : "cis44",
                                "serverTime":str(datetime.datetime.now())
                            }
                )

@app.route('/auth2') #endpoint
def auth2():
    jwt_str = jwt.encode({"username" : "cary",
                            "age" : "so young",
                            "books_ordered" : ['f', 'e'] } 
                            , JWT_SECRET, algorithm="HS256")
    #print(request.form['username'])
    return json_response(jwt=jwt_str)

@app.route('/exposejwt') #endpoint
def exposejwt():
    jwt_token = request.args.get('jwt')
    print(jwt_token)
    return json_response(output=jwt.decode(jwt_token, JWT_SECRET, algorithms=["HS256"]))


@app.route('/hellodb') #endpoint
def hellodb():
    cur = global_db_con.cursor()
   # cur.execute("insert into users values( 2 ,'test_user' , '1234');")
    global_db_con.commit()
    return json_response(status="good")


@app.route('/bookstore' , methods=['GET']) #endpoint
def bookstore():
    cur = global_db_con.cursor()
    cur.execute("Select * from  books")
    books = cur.fetchall()
    return json_response(myBooks=books)




@app.route('/login' , methods =['POST' , 'GET'])  #endpoint
def login():
    global token
    cur = global_db_con.cursor()
    jwt_user = jwt.encode({'username':request.form['username']}, JWT_SECRET, algorithm="HS256")
    print("LOGIN: " + jwt_user)
    cur.execute("select * from users where username ='" + jwt_user + "';")
    #print(cur.fetchone())
    result = cur.fetchone()
    print("LOGIN PASS: " +request.form['password'])
    if result is None:
        print("INVALID")
    else:
        cur.execute("select * from users where username = '" + jwt_user + "';")
        #print(cur.fetchone())
        hashPass = cur.fetchone()[2]
        print(hashPass)
        print(bytes(hashPass, 'utf-8'))
        if bcrypt.checkpw(bytes(request.form['password'], 'utf-8'), bytes(hashPass, 'utf-8')):
            token = jwt_user
            return redirect(request.referrer)
        else:
            return json_reponse(message2 = "fail")
        #return json_response(jwt_user)



@app.route('/signup' , methods =['POST' , 'GET'])  #endpoint
def signup():
    
    global message
    jwt_token = jwt.encode({'username':request.form['username']}, JWT_SECRET, algorithm="HS256")
    jwt_user = jwt.encode({'username':request.form['username']}, JWT_SECRET, algorithm="HS256")
    print("SIGNUP: " + jwt_user)
    username = request.form['username']
    password = request.form['password']
    print("SIGNUP PASSWORD: " + password)
    cur = global_db_con.cursor()
    cur.execute("select * from users where username = '" + jwt.encode({'username':request.form['username']}, JWT_SECRET, algorithm="HS256") + "';")
    
    if cur.fetchone() is None:
        print("HITTING IF")
        #cur.execute(f"select * from users where username = '(username)';")
        salted = bcrypt.hashpw( bytes(request.form['password'] , 'utf-8') , bcrypt.gensalt(12))
        #print("SALTED LOGIN: " + salted)
        decryptSalt = salted.decode('utf-8')
        print ("DECRYPT SALT: " + decryptSalt)
        cur.execute(f"insert into users(user_id, username ,password)  values(001, '{jwt_user}','{decryptSalt}');")
        #cur = global_db_con.cursor()
        global_db_con.commit()
        message = "Signed Up"
        return redirect(request.referrer)
    else:
        print("Username already exists")
        return make_response(
                'Username exists',
                401,
                {'WWW-Authenticate' : 'Basic realm ="User doesnt exist !!"'})

@app.route('/getStatus')
def getStatus():
    global message
    return json_response(message=message)

@app.route('/getToken')
def getToken():
    global token
    return json_response(token=token)
#does nothing rn since token is set to none

@app.route('/buy' , methods=['POST'])
def buy():
   global boughtMessage
   boughtMessage = 1
   cur = global_db_con.cursor()
   cur.execute(f"select user_id from users where username = '{token}'")
   userID = cur.fetchone()[0]
   cur.execute(f"insert into bought values({userID} , '{request.form['book_name']}', '{request.form['price']}');")
   global_db_con.commit()
   return redirect(request.referrer)


@app.route('/getsBought')
def getsBought():
     global boughtMessage
     return json_response(isBought = boughtMessage)

app.run(host='0.0.0.0', port=80)


