from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps


app=Flask(__name__)
app.config['SECRET_KEY'] = 'thisissecret'
app.config["SQLALCHEMY_DATABASE_URI"]= 'sqlite:///test.db'
db=SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

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
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/user', methods=['GET'])
def get_all_users():

    users = User.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['name'] = user.name
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        output.append(user_data)

    return jsonify({'users' : output})




# @app.route('/user', methods=['GET'])

# def get_all_users(current_user): # для админ панели
#     return ''


@app.route('/user', methods=['POST'])
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


    ##

    new_user = User(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message' : 'New user created!'})
    #return 'Done', 201




@app.route('/login', methods=['POST'])
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

    if check_password_hash(user.password, auth['password']):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'],algorithm='HS256')

        return jsonify({'token' : token})#.decode('UTF-8')})

    return 'Incorrect password or login',401 #make_response('Could not verify1', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})




@app.route('/party_by_user', methods=['GET'])
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


@app.route('/parties') # mine first
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

@app.route('/add_new_party', methods=['POST'])
@token_required
def add_new_party(current_user): # create todo
    data = request.get_json()

    new_party = Party(title=data['title'], theme=data['theme'],date_time=data['date_time'],dress_code=data['dress_code'],comments=data['comments'] ,user_id=current_user.id)
    db.session.add(new_party)
    db.session.commit()

    return jsonify({'message' : "Party created!"})
    #return 'Added', 201



@app.route('/add_party', methods=['POST']) # mine
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







@app.route('/del_party/<party_id>', methods=['DELETE']) # del todo
@token_required
def delete_party(current_user, party_id):
    party = Party.query.filter_by(id=party_id, user_id=current_user.id).first()

    if not party:
        return jsonify({'message' : 'No party found!'})

    db.session.delete(party)
    db.session.commit()

    return jsonify({'message' : 'Party deleted!'})































if __name__ =='__main__':
    app.run(debug=True,port=5000)