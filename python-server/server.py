from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration for file upload
app.config['UPLOAD_FOLDER'] = './uploads'

@app.route('/submit', methods=['POST'])
def submit_form():
    # Get form data
    name = request.form.get('name')
    age = request.form.get('age')

    # Handle file upload
    uploaded_file = request.files.get('file')
    if uploaded_file:
        filename = secure_filename(uploaded_file.filename)
        uploaded_file.save(f"{app.config['UPLOAD_FOLDER']}/{filename}")

    # Return the data as JSON
    response = {
        "name": name,
        "age": age,
        "file": filename if uploaded_file else None
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(port=5000)