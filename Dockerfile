# Get the latest Playwright version from Docker Hub (adjust version to match package.json)
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies strictly from the lockfile
RUN npm ci

# Copy the rest of your source code
COPY . .

# (Optional) specific environment variables
# ENV CI=true

# Default command to run when the container starts
CMD ["npx", "playwright", "test"]