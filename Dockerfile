
# STAGE 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY package*.json /app

# Install all the dependencies
RUN npm install  
COPY . /app

# Generate the build of the application
RUN npm run build --prod -aot false
RUN ls -alt

# Use official nginx image as the base image 
FROM nginx:latest

# Copy the build output to replace the default nginx contents. 
COPY --from=build /app/dist/super-hero-daynis/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 
EXPOSE 80