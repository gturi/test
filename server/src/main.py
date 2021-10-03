from src.config.flask_config import app


def start_flask_app():
    print(" * App swagger will be available at: http://127.0.0.1:5000/swagger")
    app.run(host="0.0.0.0", debug=False)


if __name__ == '__main__':
    start_flask_app()
