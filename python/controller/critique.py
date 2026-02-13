import request.request as req


def get_critiques_for_attraction(attraction_id):
    if not attraction_id:
        return []
    json = req.select_from_db(
        "SELECT critique_id, attraction_id, texte, note, nom, prenom FROM critique WHERE attraction_id = ? ORDER BY critique_id DESC",
        (attraction_id,)
    )
    return json


def add_critique(attraction_id, data):
    if not attraction_id:
        return False
    if "texte" not in data or not data["texte"]:
        return False
    if "note" not in data or data["note"] is None:
        return False
    note = int(data["note"])
    if note < 1 or note > 5:
        return False

    nom = data.get("nom") or None
    prenom = data.get("prenom") or None

    requete = "INSERT INTO critique (attraction_id, texte, note, nom, prenom) VALUES (?, ?, ?, ?, ?);"
    id_ = req.insert_in_db(requete, (attraction_id, data["texte"], note, nom, prenom))
    return id_
