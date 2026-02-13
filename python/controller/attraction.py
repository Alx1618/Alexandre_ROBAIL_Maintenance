import request.request as req

def add_attraction(data):
    print(data, flush=True)
    if (not "nom" in data or data["nom"] == ""):
        return False
    
    if (not "description" in data or data["description"] == ""):
        return False

    if (not "difficulte" in data or data["difficulte"] is None):
        return False

    if (not "visible" in data):
        data["visible"] = True

    if ("attraction_id" in data and data["attraction_id"]):
      requete = "UPDATE attraction SET nom=?, description=?, difficulte=?, visible=? WHERE attraction_id = ?"
      req.update_from_db(requete, (data["nom"], data["description"], data["difficulte"], data["visible"], data["attraction_id"]))
      id = data["attraction_id"]
    else:
      requete = "INSERT INTO attraction (nom, description, difficulte, visible) VALUES (?, ?, ?, ?);"
      id = req.insert_in_db(requete, (data["nom"], data["description"], data["difficulte"], data["visible"]))

    return id

def get_all_attraction(visible_only=False):
    if visible_only:
        json = req.select_from_db("SELECT * FROM attraction WHERE visible = 1")
    else:
        json = req.select_from_db("SELECT * FROM attraction")
    return json


def get_visible_attractions():
    return get_all_attraction(visible_only=True)


def get_attraction(id, visible_only=False):
    if (not id):
        return False

    if visible_only:
        json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ? AND visible = 1", (id,))
    else:
        json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ?", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_attraction(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM attraction WHERE attraction_id = ?", (id,))

    return True