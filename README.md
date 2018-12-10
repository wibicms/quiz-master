# README

This is simple CRUD using Rails and Reactjs


## Installation and Setup
After cloning to your workspace, please rename file ```application.yml.tmp``` under config folder to ```application.yml``` and fill content with your database environment then run ```bunlde install``` to perform installation of libraries and dependencies of rails. Then run ```yarn``` to install Javascript library.

## Migration and Seeding
After performing ```bunlde install``` and ```yarn``` you have to run ```rake db:migrate``` in order to create tables.
You may run seed to fill data by run ```rake db:seed```

## Running
To run in development environment please run ```rails s```. Be default you can open at http://localhost:3000

## Testing
This app comes with rspec testing. You can run test by running ```rpsec```
