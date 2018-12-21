# Neighborhood Map Project

Neighborhood Map Project is the project where  google maps api and yelp api are used to mark bay area waterparks on the map. There is a filter search by max and min price on the left panel that is responsive and disappears then becomes hamburger menu on smaller displays. Insert min and max price and filter. Clicking on filter results will bounce and will change color of the marker and opens up infowindow with yelp rating and price information.

# Installation
* MondoDB needs to be installed  from [Install MongoDB](https://docs.mongodb.com/manual/installation/) and added to PATH

In order to install and use this project you must run two commands in the console:
* install all project dependencies with `npm install`
* start the development server with `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Backend Server
Web service implemented in Node.js running on localhost:8080 returning waterparks by location boundaries and price filter params. 



