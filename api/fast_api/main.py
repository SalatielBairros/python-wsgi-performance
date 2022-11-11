from env_configuration import configurate_logging
from fastapi import FastAPI
from controller import router

configurate_logging()
app = FastAPI()
app.include_router(router)
