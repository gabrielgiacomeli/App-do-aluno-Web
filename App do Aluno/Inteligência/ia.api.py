from transformers import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS  # Para permitir requisições do frontend

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# Função para resumir textos
def resumir_texto(texto, max_length=130, min_length=30):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    resumo = summarizer(texto, max_length=max_length, min_length=min_length, do_sample=False)
    return resumo[0]['summary_text']

# Rota da API
@app.route('/resumir', methods=['POST'])
def resumir():
    data = request.json
    texto = data.get('texto')
    if not texto:
        return jsonify({'erro': 'Texto não fornecido'}), 400
    resumo = resumir_texto(texto)
    return jsonify({'resumo': resumo})

# Executa a aplicação
if __name__ == '__main__':
    app.run(debug=True)