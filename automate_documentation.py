import requests
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify

app = Flask(__name__)
load_dotenv()


@app.route('/ler-arquivo', methods=['POST'])
def ler_arquivo():
    try:
        dados = request.get_json()
        caminho = dados.get("caminho")

      
        if not caminho:
            return jsonify({"erro": "Caminho do arquivo não fornecido"}), 400
        
       
        try:
            with open(caminho, "r", encoding="utf-8") as f:
                conteudo = f.read()
        except FileNotFoundError:
            return jsonify({"erro": "Arquivo não encontrado"}), 404
        except Exception as e:
            return jsonify({"erro": f"Erro ao ler o arquivo: {str(e)}"}), 500

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
                {"role": "system", "content": "Você é um assistente que sabe tudo sobre documentação de código. porém não quero que você descreva oq fez ou oq achou, apenas documente o código como se fosse um desenvolvedor"},
                {"role": "user", "content": f"documente esse código: {conteudo}"}
            ],
            "temperature": 0.7
        }

        response = requests.post(url, headers=headers, json=data)

        if response.status_code == 200:
            resultado = response.json()
            return jsonify({"codigo_documentado": resultado['choices'][0]['message']['content']})
        else:
            return jsonify({"erro": f"Erro na API da OpenAI: {response.status_code}, {response.text}"}), 500

    except Exception as e:
        return jsonify({"erro": f"Erro inesperado: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)