from flask import Flask, jsonify
from terrainGenerator import generate_terrain

app = Flask(__name__)

@app.route('/terrain-data-url')
def terrain_data():
    terrain = generate_terrain()
    return jsonify(terrain)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
