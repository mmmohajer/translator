# 🚀 Full-Stack App Setup Guide

This project is a full-stack application using **Next.js (client)** and **Django (backend)** with **PostgreSQL**, **PgBouncer**, **Redis**, **Celery**, and **Docker**. You can run it with or **without Docker** depending on your setup.

---

## 📚 Table of Contents

- [🔧 Prerequisites](#-prerequisites)
- [🐳 Run with Docker](#-run-with-docker)
  - [Clone the Repository](#clone-the-repository)
  - [Create Virtual Environment](#create-virtual-environment)
  - [Install Dependencies](#install-dependencies)
  - [Set Up Environment Files](#set-up-environment-files)
  - [Next.js Config](#nextjs-config)
  - [Basic Auth for Flower](#basic-auth-for-celery-flower)
  - [Run with Docker Compose](#run-with-docker-compose)
  - [Verify and Access Services](#verify-and-access-services)
- [💻 Run Without Docker (Local)](#-run-without-docker-local)
  - [Set Up Local Environment](#set-up-local-environment)
  - [Set Up Local PostgreSQL](#set-up-local-postgresql)
  - [Run Django Backend](#run-django-backend)
  - [Run Next.js Frontend](#run-nextjs-frontend)
- [💡 Additional Notes](#-additional-notes)

---

## 🔧 Prerequisites

Ensure the following tools are installed on your system:

- [Docker & Docker Compose](https://www.docker.com/) (If you are willing to run the app with Docker)
- [Node.js (v16+ recommended)](https://nodejs.org/)
- Python 3.10 or newer ([pyenv](https://github.com/pyenv/pyenv) recommended for Mac)

---

## 🐳 Run with Docker

### Clone the Repository

```bash
git clone https://github.com/mmmohajer/baserepo.git PROJECT_ROOT_FOLDER_NAME
cd PROJECT_ROOT_FOLDER_NAME
```

---

### Create Virtual Environment

#### On Mac/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

OR

```bash
python -m venv venv
source venv/bin/activate
```

#### On Windows:

```powershell
python -m venv venv
.\venv\Scripts\ctivate
```

---

### Install Dependencies

```bash
pip install -r api/requirements.txt
```

```bash
cd client
npm install
cd ..
```

---

### Set Up Environment Files

Copy and rename sample `.env` files:

```bash
cp secrets/api/.env.sample secrets/api/.env
cp secrets/db/.env.sample secrets/db/.env
cp secrets/pgbouncer/.env.sample secrets/pgbouncer/.env
cp redis/redis.conf.sample redis/redis.conf
```

Update values as needed in each file.

> 🔒 **Important:**  
> In `redis/redis.conf`, the `requirepass` value **must exactly match** the `REDIS_USER_PASS` variable defined in `secrets/api/.env`.
>
> This ensures that the Django application can authenticate with the Redis instance successfully.

---

### Next.js Config

```bash
cd client
cp next.config.sample.js next.config.js
```

Edit `next.config.js` and fill in environment-specific values.

---

### Basic Auth for Celery Flower

To protect Flower dashboard:

```bash
cd nginx
htpasswd -c .htpasswd your_username
```

---

### Run with Docker Compose

```bash
docker-compose -f docker-compose-dev.yml up --build -d
```

---

### Verify and Access Services

```bash
docker ps
docker-compose logs -f
```

- Frontend: http://localhost
- Backend API: http://localhost/api
- Celery Flower (optional): http://localhost/flower/

---

## 💻 Run Without Docker

### Clone the Repository

```bash
git clone https://github.com/mmmohajer/baserepo.git PROJECT_ROOT_FOLDER_NAME
cd PROJECT_ROOT_FOLDER_NAME
```

---

### Create Virtual Environment

#### On Mac/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

OR

```bash
python -m venv venv
source venv/bin/activate
```

#### On Windows:

```powershell
python -m venv venv
.\venv\Scripts\ctivate
```

---

### Install Dependencies

```bash
pip install -r api/requirements.txt
```

```bash
cd client
npm install
cd ..
```

---

### Set Up Environment Files

Copy and rename sample `.env` files:

```bash
cp secrets/api/.env.sample api/.env
```

Update values as needed in each file.

---

### Set Up Local PostgreSQL

Using `psql` or `pgAdmin`, create a database and user that matches:

- DB Name
- DB User
- DB Password
- Host: `localhost`
- Port: `5432`

---

### Next.js Config

```bash
cd client
cp next.config.sample.js next.config.js
```

Edit `next.config.js` and fill in environment-specific values.

---

### Run Django Backend

```bash
cd api
python manage.py runserver
```

Visit: http://localhost:8000

---

### Run Next.js Frontend

```bash
cd client
npm run dev
```

Visit: http://localhost:3000

---

## 💡 Additional Notes

### Stopping the App (Docker)

```bash
docker-compose -f docker-compose-dev.yml down
```

### Clean Up Docker Volumes

```bash
docker-compose -f docker-compose-dev.yml down -v
```

### Troubleshooting

- Docker changes not applying? Try:

```bash
docker-compose down
docker-compose up --build -d
```

- Use `python3` if `python` is not found.
- Always activate virtualenv before running backend commands.

---

## 📬 Questions?

Open an issue or reach out to the project maintainer.
