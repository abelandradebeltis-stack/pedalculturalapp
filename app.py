from flask import Flask, render_template, request, redirect, url_for, session, jsonify, g
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
import csv
from datetime import datetime
from collections import Counter

app = Flask(__name__)
app.secret_key = "troque-para-uma-chave-segura"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "pedal_cultural.db")
UPLOAD_FOLDER = os.path.join("static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

CSV_FILENAME = "data.csv"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password_hash TEXT)")
    cur.execute("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, title TEXT, description TEXT, event_date TEXT, location TEXT, cover_image TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)")
    cur.execute("CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY, event_id INTEGER, image_path TEXT, FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE)")
    cur.execute("SELECT id FROM users WHERE username = ?", ("admin",))
    if not cur.fetchone():
        cur.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", ("admin", generate_password_hash("admin123")))
    conn.commit()
    conn.close()

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

init_db()

def is_logged_in():
    return "user_id" in session

@app.route("/")
def index():
    conn = get_db()
    events = conn.execute("SELECT * FROM events ORDER BY date(event_date) DESC").fetchall()
    return render_template("index.html", events=events)

@app.route("/evento/<int:event_id>")
def event_detail(event_id):
    conn = get_db()
    event = conn.execute("SELECT * FROM events WHERE id = ?", (event_id,)).fetchone()
    photos = conn.execute("SELECT * FROM photos WHERE event_id = ? ORDER BY id ASC", (event_id,)).fetchall()
    if not event:
        return redirect(url_for("index"))
    return render_template("event_detail.html", event=event, photos=photos)

@app.route("/login", methods=["GET", "POST"])
def login():
    if is_logged_in():
        return redirect(url_for("admin_events"))
    error = None
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        conn = get_db()
        user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        if user and check_password_hash(user["password_hash"], password):
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            return redirect(url_for("admin_events"))
        else:
            error = "Usuário ou senha inválidos."
    return render_template("login.html", error=error)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/admin/eventos")
def admin_events():
    if not is_logged_in():
        return redirect(url_for("login"))
    conn = get_db()
    events = conn.execute("SELECT * FROM events ORDER BY date(event_date) DESC").fetchall()
    return render_template("admin_events.html", events=events)

@app.route("/admin/evento/novo", methods=["GET", "POST"])
def admin_new_event():
    if not is_logged_in():
        return redirect(url_for("login"))
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        description = request.form.get("description", "").strip()
        event_date = request.form.get("event_date", "").strip()
        location = request.form.get("location", "").strip()
        cover_filename = None
        cover_file = request.files.get("cover_image")
        if cover_file and cover_file.filename:
            filename = secure_filename(cover_file.filename)
            cover_filename = f"{datetime.now().timestamp()}_{filename}"
            cover_file.save(os.path.join(app.config["UPLOAD_FOLDER"], cover_filename))
        conn = get_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO events (title, description, event_date, location, cover_image) VALUES (?, ?, ?, ?, ?)", (title, description, event_date, location, cover_filename))
        event_id = cur.lastrowid
        gallery_files = request.files.getlist("gallery_images")
        for g_file in gallery_files:
            if g_file and g_file.filename:
                g_name = secure_filename(g_file.filename)
                img_name = f"{datetime.now().timestamp()}_{g_name}"
                g_file.save(os.path.join(app.config["UPLOAD_FOLDER"], img_name))
                cur.execute("INSERT INTO photos (event_id, image_path) VALUES (?, ?)", (event_id, img_name))
        conn.commit()
        return redirect(url_for("admin_events"))
    return render_template("admin_event_form.html", event=None)

@app.route("/admin/evento/<int:event_id>/editar", methods=["GET", "POST"])
def admin_edit_event(event_id):
    if not is_logged_in():
        return redirect(url_for("login"))
    conn = get_db()
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        description = request.form.get("description", "").strip()
        event_date = request.form.get("event_date", "").strip()
        location = request.form.get("location", "").strip()
        event = conn.execute("SELECT * FROM events WHERE id = ?", (event_id,)).fetchone()
        cover_filename = event["cover_image"] if event else None
        cover_file = request.files.get("cover_image")
        if cover_file and cover_file.filename:
            filename = secure_filename(cover_file.filename)
            cover_filename = f"{datetime.now().timestamp()}_{filename}"
            cover_file.save(os.path.join(app.config["UPLOAD_FOLDER"], cover_filename))
        cur = conn.cursor()
        cur.execute("UPDATE events SET title=?, description=?, event_date=?, location=?, cover_image=? WHERE id=?", (title, description, event_date, location, cover_filename, event_id))
        gallery_files = request.files.getlist("gallery_images")
        for g_file in gallery_files:
            if g_file and g_file.filename:
                g_name = secure_filename(g_file.filename)
                img_name = f"{datetime.now().timestamp()}_{g_name}"
                g_file.save(os.path.join(app.config["UPLOAD_FOLDER"], img_name))
                cur.execute("INSERT INTO photos (event_id, image_path) VALUES (?, ?)", (event_id, img_name))
        conn.commit()
        return redirect(url_for("admin_events"))
    event = conn.execute("SELECT * FROM events WHERE id = ?", (event_id,)).fetchone()
    photos = conn.execute("SELECT * FROM photos WHERE event_id = ? ORDER BY id ASC", (event_id,)).fetchall()
    if not event:
        return redirect(url_for("admin_events"))
    return render_template("admin_event_form.html", event=event, photos=photos)

@app.route("/admin/evento/<int:event_id>/deletar", methods=["POST"])
def admin_delete_event(event_id):
    if not is_logged_in():
        return redirect(url_for("login"))
    conn = get_db()
    cur = conn.cursor()
    photos = cur.execute("SELECT image_path FROM photos WHERE event_id = ?", (event_id,)).fetchall()
    for p in photos:
        img_path = os.path.join(app.config["UPLOAD_FOLDER"], p["image_path"])
        if os.path.exists(img_path):
            os.remove(img_path)
    event = cur.execute("SELECT cover_image FROM events WHERE id = ?", (event_id,)).fetchone()
    if event and event["cover_image"]:
        cover_path = os.path.join(app.config["UPLOAD_FOLDER"], event["cover_image"])
        if os.path.exists(cover_path):
            os.remove(cover_path)
    cur.execute("DELETE FROM photos WHERE event_id = ?", (event_id,))
    cur.execute("DELETE FROM events WHERE id = ?", (event_id,))
    conn.commit()
    return redirect(url_for("admin_events"))

@app.route("/admin/foto/<int:photo_id>/deletar", methods=["POST"])
def admin_delete_photo(photo_id):
    if not is_logged_in():
        return redirect(url_for("login"))
    conn = get_db()
    cur = conn.cursor()
    photo = cur.execute("SELECT * FROM photos WHERE id = ?", (photo_id,)).fetchone()
    if photo:
        img_path = os.path.join(app.config["UPLOAD_FOLDER"], photo["image_path"])
        if os.path.exists(img_path):
            os.remove(img_path)
        cur.execute("DELETE FROM photos WHERE id = ?", (photo_id,))
        conn.commit()
        event_id = photo["event_id"]
    else:
        event_id = None
    if event_id:
        return redirect(url_for("admin_edit_event", event_id=event_id))
    return redirect(url_for("admin_events"))

@app.route("/api/dashboard-data")
def dashboard_data():
    csv_path = os.path.join(BASE_DIR, CSV_FILENAME)
    
    try:
        with open(csv_path, mode='r', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            header = next(reader, None)
            if not header:
                return jsonify({"error": "CSV está vazio ou o cabeçalho não foi encontrado."}), 500

            num_columns = len(header)
            skip_columns_indices = {i for i, col in enumerate(header) if col.strip().lower() == 'carimbo de data/hora'}

            data = [row for row in reader if any(field.strip() for field in row)] # Ignora linhas totalmente vazias
            total_participantes = len(data)
            
            charts_data = []
            locais_counter = Counter()
            locais_col_name = "Principais locais de pedal"

            for col_idx, col_name in enumerate(header):
                if col_idx in skip_columns_indices:
                    continue

                if "cidade ou bairro de pedal" in col_name.lower():
                    locais_col_name = col_name
                    for row in data:
                        if len(row) > col_idx and row[col_idx].strip():
                            locais = [loc.strip() for loc in row[col_idx].split(",")]
                            locais_counter.update(locais)
                    continue

                column_values = [row[col_idx] for row in data if len(row) > col_idx and row[col_idx].strip()]
                if not column_values:
                    continue

                counts = Counter(column_values)
                charts_data.append({
                    "id": f"chart-{col_idx}",
                    "title": col_name,
                    "data": dict(counts)
                })

            if locais_counter:
                 charts_data.append({
                    "id": "chart-locais",
                    "title": locais_col_name,
                    "data": dict(locais_counter)
                 })

            return jsonify({
                "total_participantes": total_participantes,
                "charts": charts_data,
                "locais_mapeados": len(locais_counter)
            })

    except FileNotFoundError:
        return jsonify({"error": f"Arquivo {CSV_FILENAME} não encontrado."}), 404
    except Exception as e:
        # Log do erro no servidor para depuração
        app.logger.error(f"Erro ao processar CSV: {e}")
        return jsonify({"error": "Ocorreu um erro inesperado ao processar os dados.", "details": str(e)}), 500

@app.route("/api/map-data")
def map_data():
    # Como não temos coordenadas no CSV, vamos retornar dados fixos.
    # O ideal seria geocodificar os locais do CSV.
    locations = [
        {"name": "Av. Paulista", "coords": [-23.561, -46.656]},
        {"name": "Parque Ibirapuera", "coords": [-23.588, -46.658]},
        {"name": "Centro Histórico", "coords": [-23.548, -46.634]},
        {"name": "Vila Madalena", "coords": [-23.555, -46.699]}
    ]
    return jsonify(locations)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
