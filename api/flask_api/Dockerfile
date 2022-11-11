FROM python:3.10.5
RUN pip install pip --upgrade
RUN pip install gunicorn
RUN pip install waitress
RUN pip install flask
COPY ./ ./app
WORKDIR ./app
EXPOSE 8991
# CMD python main.py
# CMD waitress-serve --port=8991 --threads=128 --call main:get_app
CMD gunicorn -b 0.0.0.0:8991 --workers=8 --threads=12 'main:get_app()'