FROM python:3.10.5
RUN pip install pip --upgrade
RUN pip install fastapi
RUN pip install uvicorn
RUN pip install pydantic
COPY ./ ./app
WORKDIR ./app
EXPOSE 8991
CMD uvicorn main:app --host 0.0.0.0 --port 8991 --workers 4