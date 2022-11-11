from flask import request, Flask
from executor_service import ExecutionService
from config_service import first_config_service, second_config_service, third_config_service
import json

app = Flask(__name__)
app.config["DEBUG"] = False

@app.route('/first', methods=['POST'])
def first_endpoint():
    try:
        data = request.get_json()
        return ExecutionService().execute_action_no_future(first_config_service, data)
    except Exception as e:
        return json.dumps({'exception': str(e)}), 500, {'ContentType': 'application/json'}
        
@app.route('/second', methods=['POST'])
def second_endpoint():
    try:
        data = request.get_json()
        return ExecutionService().execute_action_no_future(second_config_service, data)
    except Exception as e:
        return json.dumps({'exception': str(e)}), 500, {'ContentType': 'application/json'}
        
@app.route('/third', methods=['POST'])
def third_endpoint():
    try:
        data = request.get_json()
        return ExecutionService().execute_action_no_future(third_config_service, data)
    except Exception as e:
        return json.dumps({'exception': str(e)}), 500, {'ContentType': 'application/json'}
