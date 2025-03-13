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
        noticias = requestS.get("infos", "Sem notícias disponíveis")
        print(noticias)
        
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
                {"role": "system", "content": "Você precisa resumir noticias da internet, o seu resumo precisa estar em html e css inline, desta forma os titulos terão h1, h2, etc, para ser destacado e não precisa criar uma pagina interia eu quero que vc coloque a resposta dentro de uma div apenas. Coloque o backgroud de cada noticia intercalando as seguintes cores:  #C2BDEC #EC9EB4. Para o texto use essa cor #000. E coloque uma padding de 15px nas noticias e gap de 10px entre as noticias. NÃO ESCREVA NADA ALEM DO RESUMO E USE AS NOTICIAS PARA FAZER O RESUMO"},
                {"role": "user", "content": f"Segue as noticias para serem resumidas: {noticias}"}
            ],
            "temperature": 0.7
        }

        response = requests.post(url, headers=headers, json=data)
        print(response.text)

        if response.status_code == 200:
            resultado = response.json()
            return jsonify({"result": resultado['choices'][0]['message']['content']})
        else:
            print('bbb')
            return jsonify({"erro": f"Erro na API da OpenAI: {response.status_code}, {response.text}"}), 500

    except Exception as e:
        print('xxx')
        return jsonify({"erro": f"Erro inesperado: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)