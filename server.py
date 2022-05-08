from cgitb import reset
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
    "score": 0,
    "sec_1/q1/1": "",
    "sec_1/q1/2": "",
    "sec_1/q1/3": "",
    "sec_2/q1/1": "",
    "sec_2/q1/2": "",
    "sec_2/q1/6": "",
    "sec_2/q1/7": "",
    "sec_2/q2/3": [],
    "sec_2/q2/4": [],
    "sec_2/q3/5": []
}

scores = {
    "sec_1/q1/1": 0,
    "sec_1/q1/2": 0,
    "sec_1/q1/3": 0,
    "sec_2/q1/1": 0,
    "sec_2/q1/2": 0,
    "sec_2/q1/6": 0,
    "sec_2/q1/7": 0,
    "sec_2/q2/3": 0,

    "sec_2/q2/4": 0,
    "sec_2/q3/5": 0
}


def update_score(question, ans):
    user[question] = ans
    is_correct = 0
    if question in ["sec_2/q2/3", "sec_2/q2/4", "sec_2/q3/5"]:
        ans.sort()
        answers[question].sort()
    if answers[question] == ans:
        scores[question] = 1
        is_correct = 1
    else:
        scores[question] = 0
    new_score = 0
    for i in scores:
        new_score += scores[i]
    user["score"] = new_score
    data = {}
    data["is_correct"] = is_correct
    data['correct_ans'] = answers[question]
    data['user_ans'] = ans
    print(data)
    return data

@app.route('/')
def display_home():
    return render_template('home.html')


@app.route('/learn')
def display_learn():
    return render_template('learn.html', media=media["color_wheel"], text=text["intro_to_colorwheel"], flow=flow["learn"])


@app.route('/learn/primary')
def display_learnprimary():
    return render_template('learn.html', media=media["primary_colors"], text=text["primary_colors"], flow=flow["learn/primary"], colors=colors)


@app.route('/learn/secondary')
def display_learnsecondary():
    return render_template('learn_interactive.html', text=text["secondary_colors"], flow=flow["learn/secondary"], js_path="learn_secondary.js", colors=colors)


@app.route('/learn/tertiary')
def display_learntertiary():
    return render_template('learn_interactive.html', text=text["tertiary_colors"], flow=flow["learn/tertiary"], js_path="learn_tertiary.js", colors=colors)


@app.route('/learn/analogous')
def display_learnanalogous():
    return render_template('learn_interactive.html', text=text["analogous_colors"], flow=flow["learn/analogous"], js_path="learn_analogous.js", colors={"colors": colors["12_colors"]})


@app.route('/learn/complementary')
def display_learncomplementary():
    return render_template('learn_interactive.html', text=text["complementary_colors"], flow=flow["learn/complementary"], js_path="learn_complementary.js", colors={"colors": colors["12_colors"]})


@app.route('/learn/color_context')
def display_learncolorcontext():
    return render_template('learn.html', media=media["color_theory_in_context"], text=text["color_theory_in_context"], flow=flow["learn/color_context"])


@app.route('/learn/color_architecture')
def display_learncolorarchitecture():
    return render_template(
        'learn_static.html', media=media["color_theory_in_architecture"],
        text=text["color_theory_in_architecture"],
        colors=colors["primary_colors"],
        flow=flow["learn/color_architecture"])


@app.route('/learn/color_film')
def display_learncolorfilm():
    return render_template('learn_static.html', media=media["color_theory_in_film"], text=text["color_theory_in_film"], colors=colors["moonlight"], flow=flow["learn/color_film"])


@app.route('/quiz/sec_1/cover')
def quiz_sec1_cover():
    global user
    global text
    global scores
    user = {
        "score": 0,
        "sec_1/q1/1": "",
        "sec_1/q1/2": "",
        "sec_1/q1/3": "",
        "sec_2/q1/1": "",
        "sec_2/q1/2": "",
        "sec_2/q1/6": "",
        "sec_2/q1/7": "",
        "sec_2/q2/3": [],
        "sec_2/q2/4": [],
        "sec_2/q3/5": []
    }
    scores = {
        "sec_1/q1/1": 0,
        "sec_1/q1/2": 0,
        "sec_1/q1/3": 0,
        "sec_2/q1/1": 0,
        "sec_2/q1/2": 0,
        "sec_2/q1/6": 0,
        "sec_2/q1/7": 0,
        "sec_2/q2/3": 0,

        "sec_2/q2/4": 0,
        "sec_2/q3/5": 0
    }

    return render_template('quiz_sec1_cover.html', user=user, text=text["quiz_sec_1"], flow=flow["quiz/sec_1/cover"], js_path="quiz_sec1_cover.js", section='1')


@app.route('/quiz/sec_1/q1/<id>')
def quiz_sec1_q1(id=None):
    global user
    global answers
    # return render_template('quiz_sec1_q1.html', id = id, user = user, flow = flow["quiz/sec_1/q1/1"])
    return render_template('quiz_interactive.html', user=user, flow=flow["quiz/sec_1/q1/" + id], media={}, js_path="quiz_sec1_q1.js", section=1, id=id, ans_section='sec_1/q1/'+str(id))


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
        section=2, ans_section='sec_2/q1/'+str(id), id=id,
        js_path="quiz_sec2_part1.js")


# quiz section2 question type2 -- choose complementary colors
# @id: the id of the img for question
@app.route('/quiz/sec_2/q2/<id>')
def quiz_sec2_q2(id):
    global user
    global media
    return render_template(
        'quiz_interactive.html', user=user, flow=flow["quiz/sec_2/q2/" + str(id)],
        media=media["color_context_" + str(id)],
        section=2, ans_section='sec_2/q2/'+str(id), id=id,
        js_path="quiz_sec2_part2.js")

# quiz section2 question type2 -- choose analogus colors
# @id: the id of the img for question


@app.route('/quiz/sec_2/q3/<id>')
def quiz_sec2_q3(id):
    global user
    global media
    return render_template(
        'quiz_interactive.html', user=user, flow=flow["quiz/sec_2/q3/" + str(id)],
        media=media["color_context_" + str(id)],
        section=2, ans_section='sec_2/q3/'+str(id), id=id,
        js_path="quiz_sec2_part3.js")
# quiz section2 end
# @id: the id of the img for question


@app.route('/quiz/end')
def quiz_end():
    global user
    section_1 = {}
    section_1["sec"] = "Color mixing"
    section_1["score"] = 0
    for sec in ["sec_1/q1/1", "sec_1/q1/2", "sec_1/q1/3"]:
        if scores[sec] == 1:
            section_1["score"] += 1
    section_2 = {}
    section_2["score"] = 0
    section_2["sec"] = "Select comlementary/analogous "
    for sec in ["sec_2/q1/1", "sec_2/q1/2", "sec_2/q1/6", "sec_2/q1/7"]:
        if scores[sec] == 1:
            section_2["score"] += 1
    section_3 = {}
    section_3["score"] = 0
    section_3["sec"] = "Pair complementary/analogous colors"
    for sec in ["sec_2/q2/3", "sec_2/q2/4", "sec_2/q3/5", ]:
        if scores[sec] == 1:
            section_3["score"] += 1
    result = [section_1, section_2, section_3]
    return render_template('quiz_end.html', user=user, flow=flow["quiz/end"], result=result)


# update score
@app.route('/update_ans', methods=["POST"])
def update_ans():
    global user
    json_data = request.get_json()
    ans = update_score(json_data['section'], json_data['answer'])
    response = {}
    response['user'] = user
    response['ans'] = ans
    return jsonify(data=response)


if __name__ == '__main__':
	import click

	@click.command()
	@click.option('--debug', is_flag=True)
	@click.option('--threaded', is_flag=True)
	@click.argument('HOST', default='127.0.0.1')
	@click.argument('PORT', default=5000, type=int)
	def run(debug, threaded, host, port):
		HOST, PORT = host, port
		print("running on %s:%d", HOST, PORT)
		app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)
	run()
