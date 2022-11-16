import logging
import time
import json

class Repository:
    def __init__(self):
        pass

    def execute_action(self, data, name_list):
        logging.info(f'Executing {name_list} with data: {data}')
        time.sleep(2)
        return json.dumps(f'{name_list} Executed'), 200, {'ContentType': 'application/json'}
