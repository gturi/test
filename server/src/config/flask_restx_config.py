from flask_restx import Api

api = Api(version='1.0', title='Youtube dl as a service API', doc='/swagger')


@api.errorhandler
def default_error_handler(error: Exception):
    return {'message': str(error)}, 500
