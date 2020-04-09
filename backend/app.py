'''import os
from flask import Flask, send_from_directory
#from flask_socketio import SocketIO, send, emit

print("hello hello")

app = Flask(__name__ , static_folder='build')
app.config['SECRET_KEY'] = 'mysecret'
#socket = SocketIO(app,cors_allowed_origins="*")

print("hello hello2222")

app.debug=True
#app.host='localhost'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')



@socket.on('enter_message')
def handleMessage(msg):
    print(msg)
    emit('get_message', {'message': msg}, broadcast=True)
    return None

if __name__ =='__main__':
    socket.
    app.run()'''

import os
from flask import Flask#, send_from_directory
app = Flask(__name__, static_folder='build')


#@app.route('/')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def root():
    return app.send_static_file('index.html')
#def hello():
 #   return "Hello World!"

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 33507)))