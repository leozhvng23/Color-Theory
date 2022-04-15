from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json, random
app = Flask(__name__)


@app.route('/')
def display_home():
    return render_template('home.html') 

if __name__ == '__main__':
   app.run(debug = True)