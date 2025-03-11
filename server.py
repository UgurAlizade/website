from flask import Flask, request, jsonify
import openai

app = Flask(_name_)

openai.api_key = "your_api_key_here"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": user_input}]
    )
    return jsonify(response["choices"][0]["message"]["content"])

if _name_ == "_main_":
    app.run(debug=True)