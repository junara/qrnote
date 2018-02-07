# README

* App Name
  * [QRnote](https://qrnote.work)
* Description
  * The most simple schedule sharing.
* Ruby version
  * 2.4.1
* Configuration
  * config/settings.yml
  * app/javascript/modules/Setting.js
* Database
  * postgresql

* How to run the test suite
  * Install [Docker](https://store.docker.com/search?type=edition&offering=community). (I confirmed at only macOS)
  * And type following command
    ```
    docker-compose build
    docker-compose run web yarn install
    docker-compose run web rails db:create
    docker-compose run web rails db:migrate
    docker-compose up
    ```
  * access to [localhost](http://localhost:3000)
  * enjoy !
* Deployment instructions
  * I deployed this to AWS with ElasticBeanstalk.
  