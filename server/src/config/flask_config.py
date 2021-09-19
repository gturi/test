from flask import Flask, render_template, redirect
from flask_cors import CORS
from src.config.pyinstaller_util import PyInstallerUtil


app = Flask(
    __name__,
    static_folder=PyInstallerUtil.load_from_resource('home'),
    template_folder=PyInstallerUtil.load_from_resource('templates')
)
app.config['RESTX_VALIDATE'] = True
app.config['CORS_EXPOSE_HEADERS'] = 'Content-Disposition'
CORS(app)


@app.route('/', methods=['GET'])
def to_index():
    return redirect('/home')


@app.route('/home', methods=['GET'])
@app.route('/home/', methods=['GET'])
def index():
    return render_template('index.html')


def init_api():
    from src.config.flask_restx_config import api

    api.init_app(app)

    from src.api.doc import ns as doc_namespace
    from src.api.download import ns as download_namespace
    from src.api.download_and_send import ns as download_and_send_namespace
    from src.api.file import ns as file_namespace
    from src.api.server_info import ns as server_info_namespace
    api.add_namespace(doc_namespace)
    api.add_namespace(download_namespace)
    api.add_namespace(download_and_send_namespace)
    api.add_namespace(file_namespace)
    api.add_namespace(server_info_namespace)


init_api()
