from flask import Flask, Response
from flask_cors import CORS
from wildlife_search import WildlifeDatabase

api = Flask(__name__)
CORS(api)
    
@api.route('/wildlife', methods=['GET'])
def get_wildlife():
    data = WildlifeDatabase.get_all_occurrences()

    return Response(
        response=data,
        status=200,
        mimetype='application/json'
    )

if __name__ == '__main__':
    api.run(debug=True)