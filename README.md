# Welcome

Welcome to a publically accessible api to create a news website. The api responds with information stored in a PostgreSQL database containing article, topic and comment information.

# Link

You can find the api live hosted here:

https://nc-news-qkml.onrender.com/api

Here you can find example endpoints and responses.


# Getting Started

To get started, run the following commands in terminal to create a local repository and install dependencies:

```console
git clone https://github.com/DanielCouperthwaite/NC-News-Backend-Project.git

npm install
```

Please create a new environment variable for each database you wish to work with. You can see the .env-example file to use as an example.

In each file, you should add the name of your database to the following line. So  PGDATABASE=database_name_here will contain the name of your local data.

You can create a different file for test, development and user data, but each must have their own corresponding environment file.

Then you can seed the database with:

```console
npm run seed
```


Finally, you can run tests with:
```console
npm test
```

# Requirements

Minimum versions required: 

 Postgres: 3.3.4 and above
 Node JS: 0.4.0

# Feedback

Feel free to post bugs at https://github.com/northcoders/be-nc-news/issues.

Or, you can send feedback directly via the contact section at https://danielcouperthwaite.tech/

Have fun!

