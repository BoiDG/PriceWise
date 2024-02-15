
# PriceWise

Web Scraping eCommerce Price Tracker. This project is design to scrape products from Amazon where it would store the data in a MongoDB database, and send email notifications to users if there are changes in the product details. 



## Features

- Sending notification email 📧
- Product pages with data from scraped web 🏬




## Technology used
- Next.js: A React framework for building web applications. It is used for both the frontend and the backend of the application.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs. It is used for styling the application.
- TypeScript: A statically typed superset of JavaScript. It is used for writing the code.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js. It is used for defining the product schema and interacting with the MongoDB database.
- Nodemailer: A module for Node.js applications to allow easy email sending. It is used for sending email notifications to users.
- Axios: A promise-based HTTP client for the browser and Node.js. It is used for making HTTP requests to scrape product details from Amazon.
- Cheerio: A fast, flexible, and lean implementation of core jQuery designed specifically for the server. It is used for parsing the HTML response from the Amazon product page.
- React Responsive Carousel: A lightweight carousel component for React. It is used for displaying a carousel of images on the home page.

## Acknowledgements

 - [Learned from adrianhajdin](https://github.com/adrianhajdin/pricewise)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [This readme generator](https://readme.so/)


# Setup
## Installation

clone the repository
```bash
  https://github.com/BoiDG/PriceWise.git
```

Install package with npm

```bash
  npm install
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Deployment used by `npx convex dev`
```bash
MONGODB_URI=
```

start the app
```bash
npx run start
```
