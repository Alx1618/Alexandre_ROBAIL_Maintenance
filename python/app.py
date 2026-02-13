from flask import Flask, jsonify, request
from flask_cors import CORS

import request.request as req
import controller.auth.auth as user
import controller.attraction as attraction
import controller.critique as critique

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, Docker!'

# Attraction
@app.post('/attraction')
def addAttraction():
    print("okok", flush=True)
    # Fonction vérif token
    checkToken = user.check_token(request)
    if (checkToken != True):
        return checkToken

    json = request.get_json()
    retour = attraction.add_attraction(json)
    if (retour):
        return jsonify({"message": "Element ajouté.", "result": retour}), 200
    return jsonify({"message": "Erreur lors de l'ajout.", "result": retour}), 500

@app.get('/attraction')
def getAllAttraction():
    checkToken = user.check_token(request)
    visible_only = (checkToken is not True)
    if visible_only:
        result = attraction.get_visible_attractions()
    else:
        result = attraction.get_all_attraction()
    return result, 200


@app.get('/attraction/<int:index>')
def getAttraction(index):
    checkToken = user.check_token(request)
    visible_only = (checkToken is not True)
    result = attraction.get_attraction(index, visible_only=visible_only)
    if result == []:
        return jsonify({"message": "Attraction non trouvee ou non visible"}), 404
    return result, 200

@app.delete('/attraction/<int:index>')
def deleteAttraction(index):

    # Fonction vérif token
    checkToken = user.check_token(request)
    if (checkToken != True):
        return checkToken

    json = request.get_json()
    
    if (attraction.delete_attraction(index)):
        return "Element supprimé.", 200
    return jsonify({"message": "Erreur lors de la suppression."}), 500

@app.get('/attraction/<int:index>/critiques')
def getCritiques(index):
    result = critique.get_critiques_for_attraction(index)
    return result, 200


@app.post('/attraction/<int:index>/critique')
def addCritique(index):
    json = request.get_json()
    id_ = critique.add_critique(index, json)
    if id_:
        return jsonify({"message": "Critique ajoutee.", "result": id_}), 200
    return jsonify({"message": "Erreur lors de l'ajout de la critique."}), 400


@app.post('/login')
def login():
    json = request.get_json()

    if (not 'name' in json or not 'password' in json):
        result = jsonify({'messages': ["Nom ou/et mot de passe incorrect"]})
        return result, 400
    
    cur, conn = req.get_db_connection()
    requete = f"SELECT * FROM users WHERE name = '{json['name']}' AND password = '{json['password']}';"
    cur.execute(requete)
    records = cur.fetchall()
    conn.close()

    result = jsonify({"token": user.encode_auth_token(list(records[0])[0]), "name": json['name']})
    return result, 200