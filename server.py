import json
import random
from collections import UserString
from xml.dom.expatbuilder import parseString

from flask import Flask, Response, jsonify, render_template, request

app = Flask(__name__)

# user's answers to quiz questions
user = {
    "score":0,
    "answer_1": "",
    "answer_2":[],
    "answer_3": ["#fffff"],
    "answer_4": "complimentary",
    "answer_5": "analogus",
    "answer_6": "",
}

# correct_answers to quiz questions
answers = {
    "answer_1": "",
    "answer_2":[],
    "answer_3": ["#fffff"],
    "answer_4": "complimentary",
    "answer_5": "analogus",
    "answer_6": "",
}

media = {
    "color_wheel":{
        "URL":"https://wallpapercave.com/wp/wp4423381.png",
    },
    "primary_colors":{
        "URL":"https://media.istockphoto.com/vectors/primary-colors-of-red-yellow-blue-and-mixing-color-on-white-vector-id1058733546?b=1&k=20&m=1058733546&s=170667a&w=0&h=HKoqxfQgvLRbM2GLzGSLPU_8YXQ0LGbRMyvuQjuNxuI="
    },
    "analogous_colors":{
        "URL":"https://upload.wikimedia.org/wikiversity/en/c/cf/Analogous_Color.gif"
    },
    "complementary_colors":{
        "URL":"https://www.color-meanings.com/wp-content/uploads/complementary-color-scheme-wheel-1024x861.png"
    }, 
    "color_theory_in_context":{
        "URL":"https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg"
    },

    "color_theory_in_architecture":{
        "URL":"http://cdn.home-designing.com/wp-content/uploads/2018/07/Schro%CC%88der-house.jpg"
    },

    "color_context_1":{
        "id":"1",
        "url":"https://2u6x5g2hw94422e8f15fpzjq-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/A-Bit-of-Summer-16x20-600px.jpeg",
        "colors":[],
        "type":"comlementary"
    },
    "color_context_2":{
        "id":"2",
        "url":"https://laurelberninteriors.com/wp-content/uploads/2014/05/kqsofia.blogspot.com_sofiakwang-1300x949(pp_w842_h614).jpg",
        "colors":[],
        "type":"analogus"
    },
    "color_context_3":{
        "id":"3",
        "url":"https://media.cntraveler.com/photos/54888f18860c74c1162c813d/16:9/w_2560,c_limit/frank-lloyd-wright-house-spring-green-wisconsin.jpg",
        "colors":["#19306d","#a35033","#492921","#cf97b3","#8ca4b8","#8cb891"],
        "type":"comlementary"
    },
    "color_context_4":{
        "id":"4",
        "url":"https://media.newyorker.com/photos/5ed06a238ceb0acbb5640565/1:1/w_3274,h_3274,c_limit/Nighthawks_by_Edward_Hopper_1942.jpg",
        "colors":["#181f1f","#6a9a75","#cbc277","#5f513b","#2f6e57","#412c1e"],
        "type":"comlementary"
    },
    "color_context_5":{
        "id":"5",
        "url":"https://media.newyorker.com/photos/5ed06a238ceb0acbb5640565/1:1/w_3274,h_3274,c_limit/Nighthawks_by_Edward_Hopper_1942.jpg",
        "colors":["#181f1f","#6a9a75","#cbc277","#5f513b","#2f6e57","#412c1e"],
        "type":"analogus"
    }
}

text = {
    "intro_to_colorwheel":{
        "title":"The Color Wheel",
        "content":"The color wheel, sometimes called a color circle, is a circular arrangement of colors organized by their chromatic relationship to one another. The primary colors are equidistant from each other on the wheel, and secondary and tertiary colors sit between them. It’s used in art and design to choose colors and color schemes based on their relationships to one another."
    },
    "primary_colors":{
        "title":"Primary Colors",
        "content":"Red, yellow and blue.\
            In traditional color theory (used in paint and pigments), primary colors are the 3 pigment colors that cannot be mixed or formed by any combination of other colors. All other colors are derived from these 3 hues. "
    },
    "secondary_colors":{
        "title":"Secondary Colors",
        "content":"Green, orange and purple\
                    These are the colors formed by mixing the primary colors.\
                    Try to creating the secondary colors yourself! Drag any two primary colors into the mixing area to create a secondary color."
    },
    "tertiary_colors":{
        "title":"Tertiary Colors",
        "content":"Yellow-orange, red-orange, red-purple, blue-purple, blue-green & yellow-green\
                    These are the colors formed by mixing a primary and a secondary color. That's why the hue is a two word name, such as blue-green, red-violet, and yellow-orange."
    },
    "analogous_colors":{
        "title":"Analogous Colors",
        "content": "Analogous colors are any three colors which are side by side on a 12-part color wheel, such as yellow-green, yellow, and yellow-orange. Usually one of the three colors predominates."
    },
    "complementary_colors":{
        "title":"Complementary Colors",
        "content":"Complementary colors are any two colors which are directly opposite each other, such as red and green and red-purple and yellow-green. In the illustration above, there are several variations of yellow-green in the leaves and several variations of red-purple in the orchid. These opposing colors create maximum contrast and maximum stability."
    },
    "color_theory_in_context":{
        "title":"Color Theory in Context",
        "content":"In visual experiences, harmony is something that is pleasing to the eye. It engages the viewer and it creates an inner sense of order, a balance in the visual experience. Color harmony delivers visual interest and a sense of order. We see practices of harmonizing color in our every day lives such as architecture, interior design, art, and film."
    },
    "color_theory_in_architecture":{
        "title":"Color Theory in Architecture",
        "content":"The Rietveld Schröder House is an architectural master piece featuring fluid transitions between interior and exterior, clean horizontal and vertical lines and the use of all primary colors, alongside white, grey and black."
    },
    "color_theory_in_film":{
        "title":"Color Theory in Film",
        "content":"Barry Jenkin's “Moonlight” is praised for using two sets of complimentary colors to contrast different characters, moods, and emotions."
    },
    "quiz_sec_1":{
        "section":"1",
        "title":"Primary Secondary, and Tertiary Colors",
        "content":"In this section, we will ask you to create a color using only the primary colors.\
                    To create a new color, drag any two colors into the mixing area and a new color will appear in the center. You can repeat this task a number of times until you are satisfied with your answer. Drop your final color in answer box to continue.\
                    Note: You will be penalized if you create any unnecessary colors in the process!\
                    You can practice using the mixing tools here before you start the quiz."
    },
    "quiz_sec_2":{
        "section":"2",
        "title":"Colors in Context",
        "content":"Here we ask you to identify the types of color harmony in the pictures shown. Select whether the main colors in the picture is analogous or complementary.\
                    Here is the color wheel for your reference. "
    }
}

colors = {
    # refer to the image in Google doc
    # all hex codes from primary, secondary, and tertiary colors are in there
    "primary_colors": ["#FF0000","#0000FF","#FFFF00"], # red, yellow, blue
    "secondary_colors": ["#FF0000","#0000FF","#FFFF00"], # 
    "tertiary_colors": ["#FF0000","#0000FF","#FFFF00","#ff8100","#099420","#7400b6"]
}

questions = {
    "0" : {
        "reference" : "#ff8100",
        "choices" : ["#FF0000","#0000FF","#FFFF00"],
    },
}

global_flow ={
    "quiz/sec_2/cover":{
        "cur":"quiz/sec_2/cover",
        "next":"quiz/sec_2/q1/1"
    },
    "quiz/sec_2/q1/1":{
        "cur":"quiz/sec_2/q1/1",
        "previous":"quiz/sec_2/cover",
        "next":"quiz/sec_2/q1/2"
    },
    "quiz/sec_2/q1/2":{
        "cur":"quiz/sec_2/q1/1",
        "previous":"quiz/sec_2/q1/1",
        "next":"quiz/sec_2/q2/3"
    },
    "quiz/sec_2/q2/3":{
        "previous":"quiz/sec_2/q1/2",
        "next":"quiz/sec_2/q2/4"
    },
    "quiz/sec_2/q2/4":{
        "previous":"quiz/sec_2/q2/3",
        "next":"quiz/sec_2/q3/5"
    },
    "quiz/sec_2/q3/5":{
        "previous":"quiz/sec_2/q2/4",
        "next":"quiz/end"
    },
    "quiz/end":{
        "previous":"quiz/sec_2/q3/5",
    }
}

@app.route('/')
def display_home():
    return render_template('home.html')

@app.route('/learn')
def display_learn():
    return render_template('learn.html', media = media["color_wheel"], text=text["intro_to_colorwheel"])  

# template for learn
@app.route('/learn/primary')
def display_learnprimary():
    return render_template('learn_primary.html', media = media["primary_colors"], text= text["primary_colors"])

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

# template for routes
@app.route('/quiz/sec_1')
def display_quiz_1():
    global user
    global answers
    global media
    return render_template('quiz_sec_1.html', user = user, answers = answers, media = media)

# quiz section2 cover
# @id: the id of the img for question
@app.route('/quiz/sec_2/cover')
def quiz_sec2_cover():
    global user
    global media
    global global_flow
    flow = global_flow["quiz/sec_2/cover"]
    return render_template('quiz_sec2_cover.html', user = user, flow=flow )

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
