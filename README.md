## Table of Contents

### Introduction

### Technologies used

### Responsive

## Introduction

The exam track:

The time has come to put into practice everything you have studied in the advanced JavaScript course. You will develop an application with the aim of encouraging the reading of books through the external Open Library service.

The application should consist of a simple text box (Google style) to allow the user to search for all books in a specific category.

Once the user clicks on an appropriate button, the application should contact the API of the external Open Library service: https://openlibrary.org/subjects/fantasy.json where fancy is the category entered by the user. Once the application has retrieved the list of books, it only needs to display the title and the list of authors.

When the user clicks on a book or on a book button, the application must be able to display the description of the book. To make this functionality available, the application must contact another API of the Open Library service by passing the book key in the response to the previously contacted service.

I have added to the application:

- The function that displays the date of first publication of the book

## Technologies used

To create the Mosaic Books searcher, I used several technologies:

- Visual Studio Code, as an editor for writing the code.
- Canva, with an editor for the images, videos and icons used.
- HTML, to create the counter structure. Bootstrap, the CSS framework for developing the web interface that I used to make the site 100% responsive.
- CSS, for the style sheets;
- JavaScript, the programming language I use for the search functionality.
- Webpack, the open source module bundler for JavaScript applications. It takes your code and all its dependencies, such as style sheets, images and other resources, and bundles them together into a single optimised file or set of files. This simplifies application management and deployment, while improving performance by reducing the number of network requests required to load your site.
- Axios, the JavaScript library that is used to make HTTP requests in both browser and Node. js environments. Axios is commonly used in web development to interact with web APIs and is particularly useful when creating single-page applications that rely on data from a back-end server.
- Git, by far the most widely used modern version control system today.
- Netlify, the free hosting to host the project and make it visible.

## Responsive

Thanks to the use of Media Queries, I was able to take care of the responsive aspect of the search and results, which adapts perfectly to the changing size of the device on which it is displayed.
