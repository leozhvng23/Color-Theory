from collections import UserString
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json, random
app = Flask(__name__)

# user's answers to quiz questions
user = {
    "score":0,
    "answer_1": "",
    "answer_2":[],
    "answer_3": ["#fffff"],
    "answer_4": "complimentary",
    "answer_5": "",
    "answer_6": "",
}

# correct_answers to quiz questions
answers = {
    "answer_1": "",
    "answer_2":[],
    "answer_3": ["#fffff"],
    "answer_4": "complimentary",
    "answer_5": "",
    "answer_6": "",
}

media = {
    "img_1":{
        "URL":"",
        "colors":"", # list of hash codes
        "type":"complimentary"
    },
    "img_2":{
        "URL":"",
        "colors":"",
        "type":"analogous"
    }
}

colors = {
    # refer to the image in Google doc
    # all hex codes from primary, secondary, and tertiary colors are in there
    "primary": ["","",""], # red, yellow, blue
    "secondary": ["","",""], # 
    "tertiary": ["","","","","",""]
}

@app.route('/')
def display_home():
    return render_template('home.html')

@app.route('/learn')
def display_learn():
    return render_template('learn.html')  

# template for learn
@app.route('/learn/primary')
def display_learn_primary():
    global user
    global answers
    global media
    return render_template('learn_primary.html', colors = colors, media = media)

@app.route('/quiz')
def display_quiz():
    return render_template('quiz.html')

# template for routes
@app.route('/quiz/sec_1')
def display_quiz_1():
    global user
    global answers
    global media
    return render_template('quiz_sec_1.html', user = user, answers = answers, media = media)

if __name__ == '__main__':
   app.run(debug = True)