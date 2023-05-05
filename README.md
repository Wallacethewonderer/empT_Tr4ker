# empT_Tr4ker

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses)

## Description

 A simple command-line application which is used to track employees info from a database AKA content management systems (CMS).

## Table of Contents

- [Installation](##installation)
- [Usage](##usage)
- [Contributing](##contributing)
- [Tests](##tests)
- [License](##license)
- [Questions](##questions)

## Installation

npm i mysql inquirer@8.2.4 dotenv

## Usage
First you need to create a database in mysql, then you need to insert the tables in the database. You can use the schema.sql and seed.sql files in the db folder to create the database and tables.

In the terminal, you need to run mysql by typing "mysql -u root -p" and enter your password. Then you can create the database by typing "source db/schema.sql" and "source db/seed.sql" to create the tables and insert data into the tables.

Second you need to install the dependencies by typing "npm i mysql inquirer@8.2.4 dotenv" in the terminal.

Third you need to create an .env file in the root folder and put your mysql user name, password and database name in it. 
Then you can run the application by typing "node index.js" in the terminal.

Content of .env file would be like this:
DB_USER=root   //(your user name)
DB_PASSWORD=password   //(your password)
DB_NAME=db_name    //(your database name)



## Contributing

OPEN-SOURCE

## Tests

N/A

## License

This project is licensed under the MIT license. Click the badge at the top of the README to learn more about the license terms and conditions.

## Questions

If you have any questions about this project, please contact me via:

- Email: yuhe.liang@outlook.com
- GitHub: https://github.com/Wallacethewonderer

## Link to the video
[Link of the video](https://drive.google.com/file/d/1wyrKSWPoMJHQ5kiYcOKla3BoLAR3Pu3u/view)