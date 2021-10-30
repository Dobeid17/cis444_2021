from flask import Flask,render_template,request,make_response, jsonify
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

global_db_con = get_db()


with open("secret", "r") as f:
    JWT_SECRET = f.read()

@app.route('/') #endpoint
def index():
    return 'Web App with Python Caprice!' + USER_PASSWORDS['cjardin']

@app.route('/buy') #endpoint
def buy():
    return 'Buy'

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
    cur.execute("Select books")
    books = cur.fetchall()
    if books == None:
        return "No books in table"
    else:
        for book in books:
            bookList.append(book)
    return json_response(bookList=books)

@app.route('/user', methods =['GET'])
def user(current_user):
    # querying the database
    # for all the entries in it
    user = users.query.all()
    # converting the query objects
    # to list of jsons
    output = []
    for user in users:
        # appending the user data json
        # to the response list
        output.append({
            'user_id': users.user_id,
            'name' : users.username,
            'password' : users.password
        })
  
    return jsonify({'users': output})



@app.route('/userAuth' , methods =['POST'])  #endpoint
def userAuth():
    auth = request.form 

    if not auth or not auth.get('username') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
        )
    user = users.query\
        .filter_by(password = auth.get('password'))\
        .first()


    if user.password and auth.password =='password':
        jwt_token = jwt.encode({
            'user_id': users.id,
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes = 60)
         }, app.config['JWT_SECRET'])

        return jsonify({'jwt_token' : jwt_token.decode(jwt_token, JWT_SECRET, algorithms=["HS256"])})


@app.route('/signup' , methods =['POST'])  #endpoint
def signup():
    global token
    jwt_token = jwt.encode({'username':request.form['username']}, JWT_SECRET, algorithm="HS256")

    username = request.form['username']
    password = request.form['password']
    cur = global_db_con.cursor()
    cur.execute(f"select * from users where username = '(username)';")
    checkName = cur.fetchone()
    if checkName == None:
        salted = bcrypt.hashpw( bytes(request.form['password'] , 'utf-8') , bcrypt.gensalt(12))
        decryptSalt = salted.decode('utf-8')
        print (decryptSalt)
        cur.execute(f"insert into users(user_id, username ,password)  values(001, '{username}','{decryptSalt}');")
        cur = global_db_con.cursor()
        global_db_con.commit()
        token = jwt_token
        return jsonify(token)
    else:
        print("Username already exists")
        return make_response(
                'Username exists',
                401,
                {'WWW-Authenticate' : 'Basic realm ="User doesnt exist !!"'})





app.run(host='0.0.0.0', port=80)


