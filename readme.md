# 🚀 Full-Stack App Setup Guide

This project is a full-stack application using **Next.js (client)** and **Django (backend)** with PostgreSQL, PgBouncer, and Docker. Follow the instructions below to set it up and run it in development mode.

---

## 🧱 Prerequisites

Make sure the following tools are installed:

- [Docker & Docker Compose](https://www.docker.com/)
- [Node.js (v16+ recommended)](https://nodejs.org/)
- Python 3.10 or newer (Use [`pyenv`](https://github.com/pyenv/pyenv) on Mac if needed)

---

## 📁 1. Clone the repository

```bash
git clone https://github.com/mmmohajer/baserepo.git PROJECT_ROOT_FOLDER_NAME

cd PROJECT_ROOT_FOLDER_NAME
```

---

## 🐍 2. Create and activate Python virtual environment

### On **Mac/Linux**:

```bash
python3 -m venv venv
source venv/bin/activate
```

OR

```bash
python -m venv venv
source venv/bin/activate
```

### On **Windows**:

```powershell
python -m venv venv
.\venv\Scripts\activate
```

---

## 🧪 3. Install Python dependencies

```bash
pip install -r api/requirements.txt
```

---

## 🧪 4. Install Node dependencies

```bash
cd client
npm install
cd ..
```

---

## 🔐 5. Set up `.env` files

You need to copy the `.env.sample` files and rename them to `.env` in the following subfolders:

### 🔸 For the Django backend:

```bash
cp secrets/api/.env.sample secrets/api/.env
```

### 🔸 For the PSQL DB:

```bash
cp secrets/db/.env.sample secrets/db/.env
```

### 🔸 For PgBouncer:

```bash
cp secrets/pgbouncer/.env.sample secrets/pgbouncer/.env
```

Update the variables in each file as needed.

---

## ⚙️ 6. Set up Next.js config

Navigate to the `client` folder:

```bash
cd client
cp next.config.sample.js next.config.js
```

Edit `next.config.js` and update environment-specific values accordingly.

---

## 🐳 7. Run the app with Docker Compose

From the **root directory**, run:

```bash
docker-compose -f docker-compose-dev.yml up --build -d
```

This will:

- Build and start the Django backend
- Run the Next.js development server
- Set up PostgreSQL with PgBouncer
- Launch Redis, Celery, and other dependencies

---

---

### 🔐 8. Set up Basic Auth for Celery Flower (optional)

To protect the Celery Flower dashboard with a username and password, Nginx uses basic authentication via `.htpasswd`.

Follow these steps:

#### 1. Navigate to the `nginx` folder:

```bash
cd nginx
```

#### 2. Create a `.htpasswd` file using the `htpasswd` command:

```bash
htpasswd -c .htpasswd your_username
```

> 🔸 Replace `your_username` with the desired username.  
> 🔸 You’ll be prompted to enter and confirm a password.  
> 🔸 The `-c` flag creates the file. Omit it if adding more users later.

#### 3. Ensure the `.htpasswd` file is mounted in `docker-compose.yml`:

```yaml
volumes:
  - ./nginx/.htpasswd:/etc/nginx/.htpasswd
```

Now when you visit `http://localhost/flower/` (or your custom domain `/flower`), it will prompt for your credentials.

---

## 🧪 9. Verify Services

You can check if everything is working using:

```bash
docker ps
```

Check logs:

```bash
docker-compose logs -f
```

---

## ✅ 10. Access the App

Once everything is up:

- **Frontend (Next.js):** http://localhost:3000
- **Backend API (Django):** http://localhost:8000/api
- **PgBouncer:** localhost:6432 (used internally by Django)
- **Celery Flower (optional):** http://localhost:5555/flower/ (if enabled and protected)

---

## 🛑 Stopping the App

```bash
docker-compose -f docker-compose-dev.yml down
```

---

## 🤝 Contributing

If you're working in a team:

- Make sure to `git pull` regularly
- Keep your `.env` values out of version control
- Use descriptive commits

---

## 💡 Troubleshooting

- If Docker doesn't apply changes, try:
  ```bash
  docker-compose -f docker-compose-dev.yml down
  docker-compose -f docker-compose-dev.yml up --build -d
  ```
- If `python` isn't recognized, use `python3`
- Use `source venv/bin/activate` before running Django CLI commands

---

## 🧼 Cleanup (optional)

To remove all containers and volumes:

```bash
docker-compose -f docker-compose-dev.yml down -v
```

---

## 📬 Questions?

If you run into issues, feel free to reach out via the project's issue tracker or Slack channel (if applicable).

---
