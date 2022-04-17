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
    "color_context_1":{
        "url":"https://2u6x5g2hw94422e8f15fpzjq-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/A-Bit-of-Summer-16x20-600px.jpeg",
        "colors":[],
        "type":"comlementary"
    },
    "color_context_2":{
        "url":"https://laurelberninteriors.com/wp-content/uploads/2014/05/kqsofia.blogspot.com_sofiakwang-1300x949(pp_w842_h614).jpg",
        "colors":[],
        "type":"analogus"
    },
    "color_context_3":{
        "url":"https://media.cntraveler.com/photos/54888f18860c74c1162c813d/16:9/w_2560,c_limit/frank-lloyd-wright-house-spring-green-wisconsin.jpg",
        "colors":["#19306d","#a35033","#492921","#cf97b3","#8ca4b8","#8cb891"],
        "type":"analogus"
    },
    "color_context_4":{
        "url":"https://media.cntraveler.com/photos/54888f18860c74c1162c813d/16:9/w_2560,c_limit/frank-lloyd-wright-house-spring-green-wisconsin.jpg",
        "colors":["#19306d","#a35033","#492921","#cf97b3","#8ca4b8","#8cb891"],
        "type":"analogus"
    },
    "color_context_5":{
        "url":"https://media.cntraveler.com/photos/54888f18860c74c1162c813d/16:9/w_2560,c_limit/frank-lloyd-wright-house-spring-green-wisconsin.jpg",
        "colors":["#19306d","#a35033","#492921","#cf97b3","#8ca4b8","#8cb891"],
        "type":"analogus"
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

# quiz section2 question type1 -- choose picture type from complementary & analogus
# @id: the id of the img for question
@app.route('/quiz/sec_2/q1/<id>')
def quiz_sec2_q1(id):
    global user
    global media
    return render_template('quiz_sec2_q1.html', user = user, question = media["color_context_"+str(id)] )


# quiz section2 question type2 -- choose complementary colors
# @id: the id of the img for question
@app.route('/quiz/sec_2/q2/<id>')
def quiz_sec2_q2(id):
    global user
    global media
    return render_template('quiz_sec2_q2.html', user = user, question = media["color_context_"+str(id)] )

# quiz section2 question type2 -- choose analogus colors
# @id: the id of the img for question
@app.route('/quiz/sec_2/q3/<id>')
def quiz_sec2_q3(id):
    global user
    global media
    return render_template('quiz_sec2_q3.html', user = user, question = media["color_context_"+str(id)] )


if __name__ == '__main__':
   app.run(debug = True)