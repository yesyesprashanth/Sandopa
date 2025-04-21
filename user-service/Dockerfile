# Use Python 3.9 Slim base image
FROM python:3.10-slim

WORKDIR /app

# Copy only requirements.txt first for caching
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set the virtual environment path
ENV PATH="/opt/venv/bin:$PATH"

# Expose the port the app runs on
EXPOSE 3017

# Set the default command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3017"]

# docker build -t prashanthshivanna/sandopa-be:02042025 .
# docker push prashanthshivanna/sandopa-be:02042025

#To Run locally on the development server
# docker run -d --name="sandopa-backend" -p="3017:3017" -e "POSTGRES_USER=k3sadm" -e "POSTGRES_PASSWORD=jss1234" -e "POSTGRES_HOST=host.docker.internal" -e "POSTGRES_PORT=5432" -e "POSTGRES_DB=earlyspark" prashanthshivanna/sandopa-be:02042025

# TO run on the server
# docker run -d --name=sandopa-backend -p="3017:3017" -e "POSTGRES_USER=k3sadm" -e "POSTGRES_PASSWORD=jss1234" -e "POSTGRES_HOST=database" -e "POSTGRES_PORT=5432" -e "POSTGRES_DB=earlyspark" -e "VIRTUAL_HOST=sandopa-be.jssish.com" -e "VIRTUAL_PORT=3017" -e "LETSENCRYPT_HOST=sandopa-be.jssish.com" --restart unless-stopped prashanthshivanna/sandopa-be:02042025
# docker network connect jssish-network sandopa-backend


# This will not run because including network in the command will restrict the access to the container to the outside world
# docker run -d --name=sandopa-backend --network jssish-network -p="3017:3017" -e "POSTGRES_USER=k3sadm" -e "POSTGRES_PASSWORD=jss1234" -e "POSTGRES_HOST=database" -e "POSTGRES_PORT=5432" -e "POSTGRES_DB=earlyspark" -e "VIRTUAL_HOST=sandopa-be.jssish.com" -e "VIRTUAL_PORT=3017" -e "LETSENCRYPT_HOST=sandopa-be.jssish.com" --restart unless-stopped prashanthshivanna/sandopa-be:02042025




