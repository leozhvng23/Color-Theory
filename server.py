from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json, random
app = Flask(__name__)


@app.route('/')
def display_home():
    return render_template('home.html')

@app.route('/learn')
def display_learn():
    return render_template('learn.html')  

@app.route('/quiz')
def display_quiz():
    return render_template('quiz.html') 

if __name__ == '__main__':
   app.run(debug = True)