import logging
from controller import app
from env_configuration import configurate_logging

if __name__ == "__main__":    
    configurate_logging()
    logging.info("Starting server on port 8991")        
    app.run(host='0.0.0.0', port=8991, debug=False, threaded=True)

def get_app():
    configurate_logging()
    logging.info("Starting server...")
    return app