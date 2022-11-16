# Python WSGI performance test

This project uses [K6](https://k6.io/) to test the performance of the applications. The objective is to compare different WSGI python servers and, for a base line, compare with a .NET application.

The project was motivated by a message that Flask Development Server is not suitable for production that is shown as a warning in the Console. A simple change of WSGI to Waitress decrease de requests per second of the applications. 

## Project structure

Each of the following folders contains a different application with a respective K6 test script and Dockerfile.
The code created to test contains a combination of Object Oriented and Functional programming:

1. Receive `POST` requests with a JSON body on three different endpoints;
2. Call a method that receives the serialized JSON body and a callback function to execute;
3. The function passed as a parameter calls a Repository with its specific parameters;
4. The repository logs the calls and waits for 2 seconds before ending the process.

Obviously, this is a very simple example, but it is enough to test the performance of the servers. Also there is differences between the implementation of the services in Python and .NET.

### `/dotnet_api`
A API written in .NET 6. It uses the [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-6.0) server.

### `/flask_api`
A API written in Python 3.10. It uses the [Flask](https://flask.palletsprojects.com/en/2.0.x/) framework.
This API is tested using:

1. [Gunicorn](https://gunicorn.org/) as a WSGI server;
2. [Waitress](https://docs.pylonsproject.org/projects/waitress/en/stable/) as a WSGI server;
3. [Flask development server](https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask.run) as a WSGI server.

### `/fast_api`
A API written in Python 3.10. It uses the [FastAPI](https://fastapi.tiangolo.com/) framework using `Uvicorn`, as recommended by its documentation.

## Running the tests

To execute the tests you need to have [Docker](https://www.docker.com/) and [K6](https://k6.io/) installed. After that, you can just build and run the image on the port 8991 and execute the K6 script. This can be done with the following commands:

```
    docker build -t image_name:tag_name .
    docker run -d -p 8991:8991 image_name:tag_name
    k6 run api_performance_test.js
```

## Results

The results can be accessed in the folder `results` in excel format. They answer the initial question: Why Flask Development Server is not suitable for production? The answer is: It is not suitable for production, but it is suitable for development. The results show that the Flask Development Server is the fastest server, but it is not suitable for production because it is not thread-safe. The other servers are slower, but they are suitable for production. However, the Waitress server is the slowest of all.

Besides that, the thread-safe problem can be mitigated using class instances instead of global variables and functions.

Using Docker containers, 500 concurrent users for 5 minutes on a Laptop with 16GB RAM and Intel i7-1165, the results were:

1. .NET with Kestrel: 495 requests per second. It was the fastest server, but uses almost 500mb of RAM. It had 100% success rate and processed 150000 requests;
2. Flask Development Server: 270 requests per second with a total of 82500 requests and a success rate of 89%;
3. FastAPI with Uvicorn: 82 requests per second with a total of 26409 requests and a success rate of 94%;
4. Flask with Gunicorn: 33 requests per second with a total of 10565 requests and a success rate of 99%;
5. Flask with Waitress: 2 requests per second with a total of 6881 requests and a success rate of 59%.
