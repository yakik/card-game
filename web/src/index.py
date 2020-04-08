from flask import Flask, send_from_directory
from flask_socketio import SocketIO, send, emit

app = Flask(__name__ , static_folder='../build')
app.config['SECRET_KEY'] = 'mysecret'
socket = SocketIO(app,cors_allowed_origins="*")

app.debug=True
app.host='localhost'

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
    socket.run(app)