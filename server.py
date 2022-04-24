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
# quiz_1_questions = json_data["quiz_1_questions"]
flow = json_data["flow"]

user = {
    "score":0,
    "sec_1/q1/1": ["#fffff"],
    "sec_1/q1/2": ["#fffff"],
    "sec_2/q1/1": "",
    "sec_2/q1/2": "",
    "sec_2/q2/3": ["#fffff"],
    "sec_2/q2/4": ["#fffff"],
    "sec_2/q3/5": ["#fffff"]
}

scores = {
    "sec_1/q1/1": 0,
    "sec_1/q1/2": 0,
    "sec_2/q1/1": 0,
    "sec_2/q1/2": 0,
    "sec_2/q2/3": 0,
    "sec_2/q2/4": 0,
    "sec_2/q3/5": 0
}


def update_score(question, ans):
    user[question] = ans
    if answers[question] == ans:
        scores[question] = 1
    else:
        scores[question] = 0
    new_score = 0
    for i in scores:
        new_score += scores[i]
    user["score"] = new_score


@app.route('/')
def display_home():
    return render_template('home.html')

@app.route('/learn')
def display_learn():
    return render_template('learn.html', media = media["color_wheel"], text=text["intro_to_colorwheel"], flow=flow["learn"])  

@app.route('/learn/primary')
def display_learnprimary():
    return render_template('learn.html', media = media["primary_colors"], text= text["primary_colors"], flow=flow["learn/primary"])

@app.route('/learn/secondary')
def display_learnsecondary():
    return render_template('learn_interactive.html', text= text["secondary_colors"], flow=flow["learn/secondary"], js_path="learn_secondary.js")
    
@app.route('/learn/tertiary')
def display_learntertiary():
    return render_template('learn_interactive.html', text= text["tertiary_colors"], flow=flow["learn/tertiary"], js_path="learn_tertiary.js")

@app.route('/learn/analogous')
def display_learnanalogous():
    return render_template('learn_interactive.html', media = media["analogous_colors"], text=text["analogous_colors"], flow=flow["learn/analogous"], js_path="learn_analogous.js")

@app.route('/learn/complementary')
def display_learncomplementary():
    return render_template('learn_interactive.html', media = media["complementary_colors"], text=text["complementary_colors"], flow=flow["learn/complementary"], js_path="learn_complementary.js")

@app.route('/learn/color_context')
def display_learncolorcontext():
    return render_template('learn.html', media = media["color_theory_in_context"], text=text["color_theory_in_context"], flow=flow["learn/color_context"])

@app.route('/learn/color_architecture')
def display_learncolorarchitecture():
    return render_template('learn_static.html', media = media["color_theory_in_architecture"], text=text["color_theory_in_architecture"], colors=colors["primary_colors"], flow=flow["learn/color_architecture"]) 

@app.route('/learn/color_film')
def display_learncolorfilm():
    return render_template('learn_static.html', media = media["color_theory_in_film"], text=text["color_theory_in_film"], colors=colors["primary_colors"], flow=flow["learn/color_film"]) 

@app.route('/quiz/sec_1/cover')
def quiz_sec1_cover():
    global user
    global text
    return render_template('quiz_sec1_cover.html', user = user, text = text["quiz_sec_1"], flow = flow["quiz/sec_1/cover"], js_path="quiz_sec1_cover.js")
    # return render_template('quiz_static.html', user = user, text = text["quiz_sec_1"], flow = flow["quiz/sec_1/cover"])


@app.route('/quiz/sec_1/q1/<id>')
def quiz_sec1_q1(id = None):
    global user
    global answers
    # return render_template('quiz_sec1_q1.html', id = id, user = user, flow = flow["quiz/sec_1/q1/1"])
    return render_template('quiz_interactive.html', user = user, flow = flow["quiz/sec_1/q1/" + id], js_path = "quiz_sec1_q1.js", id = id)



# quiz section2 cover
# @id: the id of the img for question
@app.route('/quiz/sec_2/cover')
def quiz_sec2_cover():
    global user
    global media
    global flow
    global text
    return render_template('quiz_static.html', user=user, flow=flow['quiz/sec_2/cover'], media=media["color_wheel"], text=text["quiz_sec_2"], section=2)

# quiz section2 question type1 -- choose picture type from complementary & analogus
# @id: the id of the img for question
@app.route('/quiz/sec_2/q1/<id>')
def quiz_sec2_q1(id):
    global user
    global media
    global flow
    global media
    return render_template(
        'quiz_interactive.html', user=user, flow=flow["quiz/sec_2/q1/" + str(id)],
        media=media["color_context_" + str(id)],
        section=2, ans_section='sec_2/q1/'+str(id),
        js_path="quiz_sec2_part1.js")




# quiz section2 question type2 -- choose complementary colors
# @id: the id of the img for question
@app.route('/quiz/sec_2/q2/<id>')
def quiz_sec2_q2(id):
    global user
    global media
    return render_template('quiz_sec2_q2.html', user = user, question = media["color_context_"+str(id)], flow=flow["quiz/sec_2/q2/"+str(id)])

# quiz section2 question type2 -- choose analogus colors
# @id: the id of the img for question
@app.route('/quiz/sec_2/q3/<id>')
def quiz_sec2_q3(id):
    global user
    global media
    return render_template('quiz_sec2_q3.html', user = user, question = media["color_context_"+str(id)],flow=flow["quiz/sec_2/q3/"+str(id)])

# quiz section2 end
# @id: the id of the img for question
@app.route('/quiz/end')
def quiz_end():
    global user
    return render_template('quiz_end.html', user = user,flow=flow["quiz/end"])


# update score
@app.route('/update_ans', methods=["POST"])
def update_ans():
    global user
    json_data = request.get_json()
    update_score(json_data['section'], json_data['answer'])
    return jsonify(data=user)

#
#
#
#
#
# ====== BELOW ARE THE NEW QUIZ TEMPLATES ======
# need a new route for each quiz page
# 
# the jQuery templates are:
#   quiz_sec1.js
#   quiz_sec2_part1.js
#   quiz_sec2_part2.js
#
#
#
#
#

# template for static quiz page


@app.route('/quiz/static_template/<section>')
def quiz_static_template(section):
    global user
    return render_template('quiz_static.html', user=user, flow="/learn", media=media["color_wheel"], text=text["quiz_sec_"+section], section=section)
    
# template for static(left) interactive(right) quiz page
@app.route('/quiz/static_interactive_template')
def quiz_static_interactive_template():
    global user
    return render_template('quiz_static_interactive.html', user=user, flow="/learn", media = media["color_context_5"], text=text["quiz_sec_2"], section=2, colors = colors, js_path= "quiz_sec2_part1.js")

# template for page with no text and just interactive module
@app.route('/quiz/interactive_template')
def quiz_interactive_template():
    global user
    return render_template('quiz_interactive.html', user=user, flow="/learn", media = media["color_wheel"], section=1, js_path= "quiz_sec1.js")


if __name__ == '__main__':
   app.run(debug = True)
