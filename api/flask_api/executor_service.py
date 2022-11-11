import logging
import json
from concurrent import futures

class ExecutionService:
    def __init__(self):
        pass

    def execute_action(self, action, *args):
        try:
            logging.info('Starting {0}: {1}'.format(str(action.__name__), self.__try_parse_str(*args)))
            with futures.ProcessPoolExecutor(max_workers=5) as executor:
                result = executor.submit(action, *args).result()        
                logging.info('Finished {0}'.format(str(action.__name__)))
                return result        
        except Exception as e:
            logging.error('Error on {0}: {1}'.format(str(action.__name__), str(e)))
            return json.dumps({'error': '{0}'.format(str(e))}), 500, {'ContentType': 'application/json'}

    def execute_action_no_future(self, action, *args):
        try:
            logging.info('Starting {0}: {1}'.format(str(action.__name__), self.__try_parse_str(*args)))
            result = action(*args)
            logging.info('Finished {0}'.format(str(action.__name__)))
            return result        
        except Exception as e:
            logging.error('Error on {0}: {1}'.format(str(action.__name__), str(e)))
            return json.dumps({'error': '{0}'.format(str(e))}), 500, {'ContentType': 'application/json'}

    def __try_parse_str(self, *value):
        try:
            return str(*value)
        except:
            return ''
