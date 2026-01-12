# Playwright Docker Automation

A robust, containerized end-to-end testing framework using Playwright, TypeScript, and Docker.

## 📂 Project Structure

```text
.
├── src/
│   ├── tests/           # Test specifications (*.spec.ts)
│   └── page-objects/    # Page Object Model classes
├── playwright-report/   # HTML reports (generated after runs)
├── Dockerfile           # Docker image configuration
├── playwright.config.ts # Playwright configuration
└── package.json         # Dependencies and scripts

```

# 🚀 Getting Started Locally
Prerequisites
Node.js (v18+)

Docker Desktop (running)

## Installation
Install dependencies:
```bash
npm ci
```

## Install Playwright browsers:
```bash
npx playwright install --with-deps
```

Running Tests Locally
Run all tests (Headless):

```bash
npm test
```

## Run with UI Mode (Interactive Debugging):

```Bash
npm run test:ui
```
## View HTML Report:

```Bash
npm run report
```

# 🐳 Running in Docker
Containerizing tests ensures they run in the exact same environment (OS, Browser, Dependencies) every time, eliminating "it works on my machine" issues.

1. Build the Docker Image
Important: Whenever you update package.json (especially Playwright versions), you must rebuild the image.

```bash
docker build -t my-playwright-image .
```

## 2. Run Tests inside Docker
- **🔵 OPTION 1 (Recommended for CI/CD Process)**
- Is not necessary docker run or any other command,  
  
This command runs the container, executes the tests, and removes the container (--rm) when finished.

```bash
docker run --rm --ipc=host my-playwright-image
```

## **This command line makes:** (Recommended for CI/CD Process) 
```shell
1. Create a container
2. Run Playwright
3. Show Results
4. Remove container
```

🔴 **OPTION 2 (Persistent container + Run test manually)**
- ### 👉 This is for debug purposes: 

## Make a container and leave it alive
```shell
docker run -it --name my-playwright-container my-playwright-image bash
```

Then you can run all the existing test: 
```shell
npx playwright test
```

# Go inside the docker container: 

```shell
andres@andres:~/Documents/githubAndres/my-playwright-project$ docker ps
CONTAINER ID   IMAGE                        COMMAND   CREATED          STATUS          PORTS     NAMES
b3b97938fdab   my-playwright-image:latest   "bash"    22 minutes ago   Up 22 minutes             my-playwright-execution
```

## Check the whole list of files within the container. 
```shell
andres@andres:~/Documents/githubAndres/my-playwright-project$ docker exec -it my-playwright-execution bash
root@b3b97938fdab:/app# ls -la
total 52
drwxr-xr-x 1 root root 4096 Dec 29 04:14 .
drwxr-xr-x 1 root root 4096 Dec 29 04:11 ..
-rw-rw-r-- 1 root root   57 Dec 27 05:50 .dockerignore
-rw-rw-r-- 1 root root  554 Dec 27 07:23 Dockerfile
-rw-rw-r-- 1 root root 1980 Dec 27 07:57 README.md
drwxr-xr-x 9 root root 4096 Dec 29 03:42 node_modules
-rw-rw-r-- 1 root root 3288 Dec 27 06:20 package-lock.json
-rw-rw-r-- 1 root root  468 Dec 27 06:52 package.json
drwxr-xr-x 2 root root 4096 Dec 29 04:14 playwright-report
-rw-rw-r-- 1 root root 1659 Dec 27 06:38 playwright.config.ts
drwxrwxr-x 4 root root 4096 Dec 27 06:14 src
drwxr-xr-x 2 root root 4096 Dec 29 04:14 test-results
-rw-rw-r-- 1 root root  756 Dec 27 06:21 tsconfig.json
```

## Run test inside container: 
```shell
root@b3b97938fdab:/app# npx playwright test

Running 2 tests using 2 workers
  2 passed (1.8s)

To open last HTML report run:

  npx playwright show-report
```

# 1. Run Tests & Extract Report
To view the HTML report generated inside Docker, you must mount a volume mapping the container's report folder to your local machine.

Run this command:

```bash
docker run --rm --ipc=host \
  -v $(pwd)/playwright-report:/app/playwright-report \
  my-playwright-image
```

## After the run finishes:
You will see a playwright-report folder in your project root.\
Open it locally:

```bash
npx playwright show-report
```
___
# 🐳 Docker Volumes & Bind Mounts Strategy
By design, Docker containers are ephemeral and stateless. When a container is stopped and removed (especially when using the `--rm` flag), its internal writable layer is destroyed, and all data generated during runtime is lost.

To overcome this, we utilize Bind Mounts via the `-v` flag. This creates a direct mapping between a directory on the Host OS and a directory inside the `Container`.

## Syntax Breakdown
The command maps the filesystem paths as follows:

```bash
-v "<HOST_PATH>:<CONTAINER_PATH>"
```


## Use Cases in this Project
1. Artifact Persistence (Reporting) Since the container is destroyed immediately after test execution, internal reports are lost. By mounting the report directory, we bypass the container's ephemeral file system and write directly to the host.

```bash
# Maps the local folder to the container's output directory
# Example:
docker run --rm -v "$(pwd)/playwright-report:/app/playwright-report" my-playwright-image /bin/bash
```

## Result: 
The HTML report survives the `container` teardown, allowing for local analysis.

2. Configuration Injection & Hot-Reloading (Debugging) During development/debugging, rebuilding the image for every code change is inefficient. We use bind mounts to inject local source code into the running container.

```bash
# Overwrites the container's /src with the local /src
# Example:
docker run --rm -it --ipc=host -v "$(pwd)/src:/app/src" my-playwright-image /bin/bash
```

## Result: 
Changes made in the local IDE are immediately reflected inside the `container`, enabling a rapid "edit-run-debug" loop without image rebuilding.


👷🏻‍♂️ Demo Playwright Framework 🚀