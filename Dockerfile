# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Step 4: Install dependencies (including dev dependencies like TypeScript)
RUN npm install --legacy-peer-deps

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Start the app using the Next.js production start command
CMD ["npm", "start"]
