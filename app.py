from flask import Flask
from flask_cors import CORS
from api.routes import api

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
	app.run(debug=True)