# my-pizza-shop
[![Build Status](https://travis-ci.org/tonyguesswho/my-pizza-shop.svg?branch=main)](https://travis-ci.org/tonyguesswho/my-pizza-shop)


## Description
The **my-pizza-shop-app** is an application that allows the user to order pizza with different ingredient. The project is divided into two parts. The Frontend build on **ReactJs - Javascript** and the Backend built on **Django(DRF) - Python**.


## Key Application features
- Order Pizza and seleect ingredient
- List all pizza orders with status, name and ingredients


## Technology Stack

- Django
- DRF
- Postgres
- Docker
- ReactJS


## Set Up Development With Docker For Backend Application

1. Download Docker from [here](https://docs.docker.com/)
2. Set up an account to download Docker
3. Install Docker after download
4. Go to your terminal run the command `docker login`
5. Input your Docker email and password

To setup for development with Docker after cloning the repository please do/run the following commands in the order stated below:

-   `cd <project dir>` to check into the dir
-   `docker-compose build`
-   `docker-compose up -d` to start the api after the previous command is successful

The `docker-compose build` command builds the docker image where the api and its postgres database would be situated.
Also this command does the necessary setup that is needed for the API to connect to the database.

To run test run `docker-compose run orders sh -c "python manage.py test"`

- Visit the endpoint Documentation
	```
	http://localhost:8000/api/doc/
	```


## Setup Frontend locally After the Starting Backend

#### (Setting up the front end locally)
- Check that Node (recommended v11.12+) and npm are installed on your machine.

- Install dependencies
```
cd into the frontend folder and yarn install 
```
- Run app
```
yarn start
```
- Open Application in browser
```
http://127.0.0.1:3000
```


To stop the running backend container run the command `docker-compose down`
To Stop the FE APP `ctrl or command C`





#### Follow Up Questions

Q- How would you deal with customers, who would like to create their own pizza: base dough plus their favourite ingredients. How would you design a database for this task?

ANSWER:

Since I already have an ingredieents table, I will add an ENUM field called `type` to the ingredient table, this field will differentaite two types of ingredient,
Ingredeint for the pizza itself(type P) and Ingredient for making a custom dough(type D). So when an order request comes , it contains the ingredients for the pizza and the dough.
If no ingredient of type D was sent(i.e no dough ingredieent then we default to the standard dough)

How would you deal with a customer, who would like to add some extras? For example, I would like to get extra cheese in all pizzas in my order and extra tomatoes in one of the pizzas. How would you design a database for this task?

ANSWER:

Personally I will add a json field that will hold the extra details for any pizza order, Basically if any order nees any  thing extra, it is added to the json extra field on the order table.

A question to think about: how would you design a system if you have CPU heavy long-running (5min plus) machine learning task that needs to be executed in order to recommend the best pizza for registered customers (later sent via email) - make a diagram.


ANSWER:

For a task like this I will pass the long running process to a worker such as Celery  to handle the machine learning task  and also send the email, So the user gets a response and later gets an email.I will most likely use redis as the message broker.

- Diagram
![Diagram](https://user-images.githubusercontent.com/19865565/95784462-c51f7680-0ccb-11eb-834e-fc5e5cde444b.png)	


I will appreciate any feedback on this project :)


