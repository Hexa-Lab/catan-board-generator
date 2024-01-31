# Settlers of Catan Board Generator

## Overview
We've always enjoyed playing Settlers of Catan, despite its one drawback: the lengthy setup time, which can be quite tedious. To streamline this process and enhance our gaming experience, we've developed a browser-based generator. This tool is designed to assist in quickly setting up a variety of game scenarios, making it easier and more enjoyable to dive straight into the game.

## Features
Our generator now supports an expanded range of games, ensuring a more diverse and engaging Settlers of Catan experience:
- **Base Catan:** The classic game setup.
- **Extended Base Catan:** Accommodates 5-6 players for larger group play.
- **Seafarers:** Includes the exciting 'Four Islands' map variant for Seafarers expansion.
- **Cities & Knights:** Adds depth with new gameplay elements for the classic game.

## How to Play
Easily select your game mode:
- Press **1** for Base Catan.
- Press **2** for Extended Base Catan (5-6 players).
- Press **3** for Seafarers (Four Islands variant).
- While in Base Catan or Extended Base Catan mode, press **V** to access the Barbarians Tracker.

## Development
This project is a full-stack application comprising a React-based frontend (`/client`) and a NodeJS backend (`/server`). Follow these steps to set up the environment:
```bash
$ git clone git@github.com:JakeKrummenacher/catan-board-generator.git
$ cd ./catan-board-generator

# Root level dependencies
$ npm install

# Client level dependencies
$ npm run install-client

# Server level dependencies
$ npm run install-server 
```

To run both server and client concurrently (using the `concurrently` npm package):
```bash
$ npm start
```
Note: The client will automatically route API requests to the server.

To run only the server:
```bash
$ npm run server
```

To run only the client:
```bash
$ npm run client
```