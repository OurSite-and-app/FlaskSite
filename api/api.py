from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from flask import Flask, request, url_for
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import random
import string
app=Flask(__name__, static_folder='build', static_url_path='/')
@app.route('/')
def index():
    return app.send_static_file('index.html')
app.config['SECRET_KEY'] = 'thisissecret'
app.config["SQLALCHEMY_DATABASE_URI"]= 'sqlite:///test.db'

##
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT']=587
app.config['MAIL_USERNAME']='yenmorris32@gmail.com'
app.config['MAIL_PASSWORD']='Qwerty123366'
app.config['MAIL_USE_SSL']=False
app.config['MAIL_USE_TLS']=True
app.config['MAIL_DEFAULT_SENDER']= ('Our Site')
s = URLSafeTimedSerializer('Thisisasecret!12')

db=SQLAlchemy(app)
mail = Mail(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    ##
    email = db.Column(db.String(50))
    ver_email = db.Column(db.Boolean)
    block_user= db.Column(db.Boolean) # блокировка пользователя 
    restricted = db.Column(db.Boolean) # ограничение к действиям
    #reset_pass=db.Column(db.Boolean) # был ли сброс пароля пользователя


# class Todo(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     text = db.Column(db.String(50))
#     complete = db.Column(db.Boolean)
#     user_id = db.Column(db.Integer)



class Party(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80)) # название события
    theme = db.Column(db.String(80)) # название темы вечеринки, тематика
    date_time = db.Column(db.String(80)) # время начала вечеринки
    dress_code = db.Column(db.String(80)) # дресс-код
    comments = db.Column(db.String(80)) # кодекс тусовки или комментарии к ней 
    ##
    user_id = db.Column(db.Integer)





def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=['HS256'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 423#401

        return f(current_user, *args, **kwargs)

    return decorated


# @app.route('/user', methods=['GET'])
# def get_all_users():

#     users = User.query.all()

#     output = []

#     for user in users:
#         user_data = {}
#         user_data['public_id'] = user.public_id
#         user_data['name'] = user.name
#         user_data['password'] = user.password
#         user_data['admin'] = user.admin
#         output.append(user_data)

#     return jsonify({'users' : output})




# @app.route('/user', methods=['GET'])

# def get_all_users(current_user): # для админ панели
#     return ''

@app.route('/api/user', methods=['GET'])
@token_required
def get_all_users(current_user):

    if not current_user.admin:
        return 'Not allowed',403#jsonify({'message' : 'Cannot perform that function!'})

    users = User.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['name'] = user.name
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        user_data['email'] = user.email
        user_data['ver_email'] = user.ver_email
        user_data['block_user'] = user.block_user
        user_data['restricted'] = user.restricted
        output.append(user_data)

    return jsonify({'users' : output})

@app.route('/api/user', methods=['POST'])
#@token_required
def create_user():#current_user):
    #if not current_user.admin:
    #    return jsonify({'message' : 'Cannot perform that function!'})

    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')
    ##
    users=User.query.all()
    
    for usr in users: # проверка на совпадение имён
        if(usr.name==data['name']):
            return 'Already Exist',401
    
    #проверка на то, чтобы не было одинаковых имейлов
    for usr in users:
        if(usr.email==data['email']):
            return 'Email Taken',403
    #проверка на правильность имейла на фронте
    email = data['email']
    token = s.dumps(email, salt='email-confirm')

    msg = Message('Confirm your Email', sender='MySite', recipients=[email])

    link = url_for('confirm_email', token=token, _external=True)
    ##
    print ("YOUR LINK ,",link)

    msg.body = 'Your link is {}'.format(link)

    mail.send(msg)

    ##

    new_user = User(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False,email=data['email'],ver_email=False,block_user=False,restricted=False)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message' : 'New user created!'})
    #return 'Done', 201

@app.route('/api/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message' : 'The user has been deleted!'})


@app.route('/api/user/<public_id>', methods=['PUT'])
@token_required
def block(current_user,public_id): # блокировка пользователя
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})
    
    if(user.block_user==False):
        user.block_user=True
    else:
        user.block_user=False
    db.session.commit()

    return jsonify({'message' : 'The user has been blocked/unblocked!'})

@app.route('/api/restr_user/<public_id>', methods=['PUT'])
@token_required
def restrict(current_user,public_id): #ограничить пользователя
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})
    if(user.restricted==False): 
        user.restricted=True
    else: # если уже есть ограничения, то повторный вызов функции разблокирует 
        user.restricted=False
    db.session.commit()

    return jsonify({'message' : 'The user has been restricted!/unrestricted'})

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str
    #print("Random string of length", length, "is:", result_str)

@app.route('/api/reset_password/<public_id>', methods=['PUT'])
@token_required
def res_pass(current_user,public_id):
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message' : 'No user found!'})
    new_password=get_random_string(8)
    new_hashed_password = generate_password_hash(new_password, method='sha256')
    user.password=new_hashed_password
    db.session.commit()
    msg=Message('Update Password',recipients=[user.email])
    msg.body = user.name +' your new password is '+ new_password
    mail.send(msg)
    return 'Success',201







@app.route('/api/login', methods=['POST'])
def login():
    #auth = request.authorization
    auth = request.get_json() # получение логина и пароля
    print ("Hello",auth['name'])
    if not auth['name']:
        print ("goodbye")


    # if not auth or not auth['name'] or not auth['password']:
    #     return 'No username or password provided',401 #make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    
    if not auth or len(auth['name'])==0 or not 'password' in auth or len(auth['password']) == 0:
        return 'No username or password provided',401 #make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth['name']).first()
    #print ("Password of fisrt Dan:",user.password)
    #print ("Password of second Dan:",auth.password)


    if not user:
        return 'No such user',403 #make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    if user.ver_email==False:# не подтверждена почта
        return 'No email confr',406
    if user.block_user==True:# пользователь заблокирован
        return 'Account is blocked',410



    if check_password_hash(user.password, auth['password']):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm='HS256')

        return jsonify({'token' : token})#.decode('UTF-8')})

    return 'Incorrect password or login',401 #make_response('Could not verify1', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})




@app.route('/api/party_by_user', methods=['GET'])
@token_required
def get_all_parties_by_user(current_user): # get all todos
    #todos = Todo.query.filter_by(user_id=current_user.id).all()
    party_list = Party.query.filter_by(user_id=current_user.id).all()

    output = []

    # for todo in todos:
    #     todo_data = {}
    #     todo_data['id'] = todo.id
    #     todo_data['text'] = todo.text
    #     todo_data['complete'] = todo.complete
    #     output.append(todo_data)
    for party in party_list:
        party_data = {}
        party_data['id'] = party.id
        party_data['title'] = party.title
        party_data['theme'] = party.theme
        party_data['date_time'] = party.date_time
        party_data['dress_code'] = party.dress_code
        party_data['comments'] = party.comments
        output.append(party_data)

    return jsonify({'party_list' : output})


@app.route('/api/parties') # mine first
def parties():
    party_list = Party.query.all()
    parties = []

    for party in party_list:
        parties.append({'title' : party.title , 'theme' : party.theme, 'date_time' : party.date_time, 'dress_code': party.dress_code,'comments': party.comments })#, 'rating' : party.rating})
    
    print(parties)
    return jsonify({'parties' : parties})

####################



# @app.route('/todo', methods=['POST'])
# @token_required
# def create_todo(current_user):
#     data = request.get_json()

#     new_todo = Todo(text=data['text'], complete=False, user_id=current_user.id)
#     db.session.add(new_todo)
#     db.session.commit()

#     return jsonify({'message' : "Todo created!"})

@app.route('/api/add_new_party', methods=['POST'])
@token_required
def add_new_party(current_user): # create todo
    #проверка на ограничения пользователя
    if current_user.restricted==True:
        return 'Fail',403

    data = request.get_json()

    new_party = Party(title=data['title'], theme=data['theme'],date_time=data['date_time'],dress_code=data['dress_code'],comments=data['comments'] ,user_id=current_user.id)
    db.session.add(new_party)
    db.session.commit()

    return jsonify({'message' : "Party created!"})
    #return 'Added', 201



@app.route('/api/add_party', methods=['POST']) # mine
def add_party():
    party_data = request.get_json()

    new_party = Party(title=party_data['title'], theme=party_data['theme'], date_time=party_data['date_time'], dress_code=party_data['dress_code'],comments=party_data['comments'] ) #, rating=party_data['rating'])

    db.session.add(new_party)
    db.session.commit()

    return 'Done', 201







# @app.route('/todo/<todo_id>', methods=['DELETE'])
# @token_required
# def delete_todo(current_user, todo_id):
#     todo = Todo.query.filter_by(id=todo_id, user_id=current_user.id).first()

#     if not todo:
#         return jsonify({'message' : 'No todo found!'})

#     db.session.delete(todo)
#     db.session.commit()

#     return jsonify({'message' : 'Todo item deleted!'})

@app.route('/api/ch_party/<party_id>', methods=['PUT'])
@token_required
def complete_todo(current_user, party_id):
    data = request.get_json()

    party = Party.query.filter_by(id=party_id, user_id=current_user.id).first()

    if not party:
        return jsonify({'message' : 'No party found!'})

    party.theme=data['theme']
    party.date_time=data['date_time']
    party.dress_code=data['dress_code']
    party.comments=data['comments']
    db.session.commit()

    return jsonify({'message' : 'Party items has been updated!'})







@app.route('/api/del_party/<party_id>', methods=['DELETE']) # del todo
@token_required
def delete_party(current_user, party_id):
    party = Party.query.filter_by(id=party_id, user_id=current_user.id).first()

    if not party:
        return jsonify({'message' : 'No party found!'})

    db.session.delete(party)
    db.session.commit()

    return jsonify({'message' : 'Party deleted!'})


















@app.route('/api/confirm_email/<token>')
def confirm_email(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=86400)
        print ("This is",email)
        users=User.query.all()
        for usr in users: # проверка на совпадение имён
            if(usr.email==email):
                usr.ver_email=True
                db.session.commit()
                #return 'Verified',201
                return '<h1>The token works! Email confirmed</h1>'
    except SignatureExpired:
        return '<h1>The token is expired!</h1>'
    #return '<h1>The token works!</h1>'



@app.route('/api/login_adm', methods=['POST'])
def admin_login():
    auth=request.get_json()

    if not auth or len(auth['name'])==0 or not 'password' in auth or len(auth['password']) == 0:
        return 'No username or password provided',401
    
    user = User.query.filter_by(name=auth['name']).first()
    #print ("Password of fisrt Dan:",user.password)
    #print ("Password of second Dan:",auth.password)

    if not user:
        return 'No such user',404 #make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if user.admin== False:
        return 'Not Admin',403
    

    if check_password_hash(user.password, auth['password']):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'],algorithm='HS256')

        return jsonify({'token' : token})#.decode('UTF-8')})

    return 'Incorrect password or login',401 #make_response('Could not verify1', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    





if __name__ =='__main__':
    app.run(debug=True,port=5000)