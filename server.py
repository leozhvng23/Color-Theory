import json
import random
from collections import UserString
from xml.dom.expatbuilder import parseString

from flask import Flask, Response, jsonify, render_template, request

app = Flask(__name__)

f = open("data.json")
json_data = json.load(f)
f.close()

answers = json_data["answers"]
media = json_data["media"]
text = json_data["text"]
colors = json_data["colors"]
questions = json_data["questions"]
global_flow = json_data["global_flow"]

user = {
    "score":0,
    "answer_1": "",
    "answer_2":[],
    "answer_3": ["#fffff"],
    "answer_4": "complimentary",
    "answer_5": "analogus",
    "answer_6": "",
}

@app.route('/')
def display_home():
    return render_template('home.html')

@app.route('/learn')
def display_learn():
    return render_template('learn.html', media = media["color_wheel"], text=text["intro_to_colorwheel"])  

@app.route('/learn/primary')
def display_learnprimary():
    return render_template('learn_primary.html', media = media["primary_colors"], text= text["primary_colors"])

@app.route('/learn/secondary')
def display_learnsecondary():
    return render_template('learn_secondary.html', text= text["secondary_colors"])
    
@app.route('/learn/tertiary')
def display_learntertiary():
    return render_template('learn_tertiary.html', text= text["tertiary_colors"])

@app.route('/learn/analogous')
def display_learnanalogous():
    return render_template('learn_analogous.html', media = media["analogous_colors"], text=text["analogous_colors"])

@app.route('/learn/complementary')
def display_learncomplementary():
    return render_template('learn_complementary.html', media = media["complementary_colors"], text=text["complementary_colors"])

@app.route('/learn/color_context')
def display_learncolorcontext():
    return render_template('learn_color_context.html', media = media["color_theory_in_context"], text=text["color_theory_in_context"])

@app.route('/learn/color_architecture')
def display_learncolorarchitecture():
    return render_template('learn_color_architecture.html', media = media["color_theory_in_architecture"], text=text["color_theory_in_architecture"], colors=colors["primary_colors"]) 

@app.route('/quiz/sec_1/cover')
def quiz_sec1_cover():
    global user
    global text
    global global_flow
    flow = global_flow["quiz/sec_1/cover"]
    return render_template('quiz_sec1_cover.html', user = user, text = text["quiz_sec_1"], flow = flow)

# # template for routes
# @app.route('/quiz/sec_1')
# def display_quiz_1():
#     global user
#     global answers
#     global media
#     return render_template('quiz_sec_1.html', user = user, answers = answers, media = media)

# quiz section2 cover
# @id: the id of the img for question
@app.route('/quiz/sec_2/cover')
def quiz_sec2_cover():
    global user
    global media
    global global_flow
    flow = global_flow["quiz/sec_2/cover"]
    return render_template('quiz_sec2_cover.html', user = user, flow=flow, content = text['quiz_sec_2'] )

# quiz section2 question type1 -- choose picture type from complementary & analogus
# @id: the id of the img for question
@app.route('/quiz/sec_2/q1/<id>')
def quiz_sec2_q1(id):
    global user
    global media
    global global_flow
    flow = global_flow["quiz/sec_2/q1/"+str(id)]
    return render_template('quiz_sec2_q1.html', user = user, question = media["color_context_"+str(id)], flow=flow )


# quiz section2 question type2 -- choose complementary colors
# @id: the id of the img for question
@app.route('/quiz/sec_2/q2/<id>')
def quiz_sec2_q2(id):
    global user
    global media
    global global_flow
    flow = global_flow["quiz/sec_2/q2/"+str(id)]
    return render_template('quiz_sec2_q2.html', user = user, question = media["color_context_"+str(id)], flow=flow)

# quiz section2 question type2 -- choose analogus colors
# @id: the id of the img for question
@app.route('/quiz/sec_2/q3/<id>')
def quiz_sec2_q3(id):
    global user
    global media
    global global_flow
    flow = global_flow["quiz/sec_2/q3/"+str(id)]
    return render_template('quiz_sec2_q3.html', user = user, question = media["color_context_"+str(id)],flow=flow  )

# quiz section2 end
# @id: the id of the img for question
@app.route('/quiz/end')
def quiz_end():
    global user
    global global_flow
    flow = global_flow["quiz/end"]
    return render_template('quiz_end.html', user = user,flow=flow  )

# template for learn
@app.route('/learn/<section>')
def display_learn_primary(section = None):
    global user
    global answers
    global media
    global colors
    global text
    return render_template('learn_primary.html', colors = colors, text = text, section = section)

@app.route('/quiz')
def display_quiz():
    global questions
    return render_template('quiz.html', colors = colors, questions = questions, text = text)


if __name__ == '__main__':
   app.run(debug = True)
