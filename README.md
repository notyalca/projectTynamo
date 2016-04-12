# projectTynamo

[![Build Status](https://travis-ci.org/notyalca/projectTynamo.svg?branch=master)](https://travis-ci.org/notyalca/projectTynamo)

## Purpose

Project Tynamo is intended to be a simple way to create a REST API with simple routes.

Specify your routes via a file, and the application will create the routes requested.

Example routes file:

    {
        "routes":[
            {
                "path": "/test1",
                "method": "GET",
                "handler": {
                    "type": "text",
                    "message": "hello world",
                    "code": 404
                }
            },
            {
                "path": "/test2",
                "method": "GET",
                "handler": {
                    "type": "text",
                    "message": "world not found",
                    "code": 404
                }
            }
        ]
    }
    
## Installation

Clone this project. Then run:

    npm install

## Running the application

    node app.js