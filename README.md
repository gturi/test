# youtube-dl-aas

This project is a wrapper which exposes [youtube-dl](https://github.com/ytdl-org/youtube-dl) functionalities via REST API. It also comes with a simple GUI that allows to any device connected to the network to download videos from youtube-dl the supported sites. 

## Install

The app is distributed in two versions:
- standard, that ships as a simple tray application
- headless, ideal to be run as a deamon when a system starts up

Download and run the [latest release](https://github.com/FlamingTuri/url-builder/releases).

The application is exposed at http://127.0.0.1:5000/home

## Development

### Install dependencies

```bash
# server
cd server
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
pip3 install -r requirements.gui.txt
pip3 install -r requirements.dev.txt
```

```bash
# client
cd client
npm install
```

### Run

```bash
# server
cd server
source venv/bin/activate
python3 -m src.main
```

```bash
# client
cd web-gui
npx ng serve --open
```

### Swagger

A swagger page is exposed at http://127.0.0.1:5000/swagger
