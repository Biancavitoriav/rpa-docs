import requests
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify

app = Flask(__name__)
load_dotenv()


@app.route('/ler-arquivo', methods=['POST'])
def ler_arquivo():
    try:
        requestS = request.get_json()
        

        url = "https://api.openai.com/v1/chat/completions"
        api_key = os.getenv("API_KEY")

        if not api_key:
            return jsonify({"erro": "Chave de API não fornecida"}), 400

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "Você precisa resumir noticias da internet, o seu resumo precisa estar em markdown, desta forma os titulos terão ## para ser destacado"},
                {"role": "user", "content": f"Segue as noticias para ser resumidas: {requestS}"}
            ],
            "temperature": 0.7
        }

        response = requests.post(url, headers=headers, json=data)

        if response.status_code == 200:
            resultado = response.json()
            return jsonify({"resu": resultado['choices'][0]['message']['content']})
        else:
            return jsonify({"erro": f"Erro na API da OpenAI: {response.status_code}, {response.text}"}), 500

    except Exception as e:
        return jsonify({"erro": f"Erro inesperado: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)