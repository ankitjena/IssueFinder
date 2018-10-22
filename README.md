# IssueFinder
An application for better problem solving in a community. The app gives a social media like experience to the users to post their problems and see other users' problems at the same time. They can upvote, downvote on a specific issue to certify it's validity. Users can have a discussion in the comments section. The administrator can view all the problems posted by the users according to highest number of valid points i.e upvotes minus downvotes. Thus they can start acting on the issues on the get go and all post the status of the ongoing solution which the users can see.

# Installation
## Pre-requisites
Your machine should have NPM and NodeJS installed. A full guide for installing each of these is given below. Before you install any packages, ensure your package list is up to date with:

    sudo apt-get update

#### Install npm

    sudo apt-get install -y npm

#### Install node

    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    
## Local setup

#### Clone the repo

    git clone https://github.com/ankitjena/IssueFinder.git
    
#### Install dependencies
To download the node modules:-

    cd client
    npm install
    cd ..
    cd server
    npm install
    
#### Running the server
Open two terminals one in the client folder and one in the server folder.
In the client terminal run:

    npm run dev
    
In the server terminal run:
    
    npm start
    
The browser opens up a new window in http://localhost:3000. The server runs in http://localhost:8000. The app is ready to be used.

# Technologies used:
* React
* Semantic UI
* Express
* NodeJS
* MongoDB

# Authors:
* [Ankit Jena](https://github.com/ankitjena)
* [Aquib Baig](https://github.com/aquibbaig)
* [P Ganesh Patro](https://github.com/ganeshpatro321)
