# My Personal Website

A simple personal website built with React and TypeScript, packaged to run anywhere with Docker.

# What's Here
A basic React website using TypeScript
Docker setup that works on regular computers and Raspberry Pis

# What do you need to install?

```bash
npm install -D webpack-cli
```

## Docker Setup
This lets you run the website in a container that works on most devices.

# Build the image:
For a Raspberry Pi then use this:
```bash
docker build --platform linux/amd64,linux/arm64 -t <Image name> .
```
```bash
docker push <Image name>
```

# How It's Put Together
The website lives in the app folder

Dockerfile contains instructions for packaging everything

It uses a small web server (http-server) to show the site

If You Want To Change Things
Most of the website code is in app/src

Styles can be modified in the CSS files

The main page is in app/index.html

# Deployment Options
You can:

Run it directly with Node.js

Use the Docker container on a single computer

Set it up on multiple Raspberry Pis (though you'll need additional tools for that)

# Why did i make it a image?
My repo was to big to fetch, so i made the website a image.
