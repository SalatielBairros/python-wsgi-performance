from fastapi import APIRouter
from request_info_data import RequestInfoData
from executor_service import ExecutionService
from config_service import first_config_service, second_config_service, third_config_service
import json

router = APIRouter()

@router.post('/first')
def first_endpoint(data: RequestInfoData):
    try:
        return ExecutionService().execute_action_no_future(first_config_service, data)
    except Exception as e:
        return json.dumps({'exception': str(e)}), 500, {'ContentType': 'application/json'}
        
@router.post('/second')
def second_endpoint(data: RequestInfoData):
    try:
        return ExecutionService().execute_action_no_future(second_config_service, data)
    except Exception as e:
        return json.dumps({'exception': str(e)}), 500, {'ContentType': 'application/json'}
        
@router.post('/third')
def third_endpoint(data: RequestInfoData):
    try:
        return ExecutionService().execute_action_no_future(third_config_service, data)
    except Exception as e:
        return json.dumps({'exception': str(e)}), 500, {'ContentType': 'application/json'}
