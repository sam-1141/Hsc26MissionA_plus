<h1 align="center">🚀 Laravel Project Setup Guide (Ubuntu)</h1>

---

## 🧰 Prerequisites

Make sure the following are installed:  
**PHP 8.1+**, **Composer**, **MySQL**, **Node.js**, **npm**, **git**

<pre>
<code>php -v && composer -v && mysql --version && node -v && npm -v && git --version</code>
</pre>

Install missing packages:
<pre>
<code>sudo apt update && sudo apt install php php-cli php-mbstring php-xml php-bcmath php-curl php-mysql mysql-server nodejs npm composer unzip git -y</code>
</pre>

---

## 📦 Clone Project
<pre>
<code>git clone &lt;your-repo-url&gt;
cd &lt;your-project-folder&gt;</code>
</pre>

---

## 🧩 Install PHP Dependencies
<pre>
<code>composer install</code>
</pre>

If version issues occur:
<pre>
<code>composer update</code>
</pre>

---

## 🎨 Install Frontend Dependencies
<pre>
<code>npm install</code>
</pre>

Build assets for development:
<pre>
<code>npm run dev</code>
</pre>

For production build:
<pre>
<code>npm run build</code>
</pre>

---

## ⚙️ Setup Environment File
Copy `.env.example` to `.env`:
<pre>
<code>cp .env.example .env</code>
</pre>

Edit environment file:
<pre>
<code>nano .env</code>
</pre>

Example configuration:
<pre>
<code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=CoreDB
DB_USERNAME=laravel_user
DB_PASSWORD=secret123
APP_URL=http://127.0.0.1:8000</code>
</pre>

---

## 🔑 Generate Laravel App Key
<pre>
<code>php artisan key:generate</code>
</pre>

---

## 🗄️ Setup Database

Login to MySQL:
<pre>
<code>mysql -u root -p</code>
</pre>

Inside MySQL:
<pre>
<code>CREATE DATABASE CoreDB;
EXIT;</code>
</pre>

Run migrations and seeders:
<pre>
<code>php artisan migrate --seed</code>
</pre>

Run a specific seeder:
<pre>
<code>php artisan db:seed --class=ChapterLecturesSeeder</code>
</pre>

---

## 🔒 Set Storage Permissions
<pre>
<code>sudo chmod -R 775 storage bootstrap/cache
sudo chown -R $USER:www-data storage bootstrap/cache</code>
</pre>

---

## ▶️ Run Laravel Server
<pre>
<code>php artisan serve</code>
</pre>

For DB setup:

<h1 align="center">🧠 Laravel Database Setup Guide for ExamDB</h1>

---

## ⚙️ Environment Configuration

Set your `.env` file like this:

<pre>
<code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ExamDB
DB_USERNAME=exam_user
DB_PASSWORD=secret123</code>
</pre>

💡 **Note:**  
- Always use `127.0.0.1` instead of `localhost` to avoid socket connection issues.  
- `ExamDB` and `exam_user` must exist in MySQL.  

---

## 🗄️ MySQL Setup Commands

Login as root:
<pre>
<code>mysql -h 127.0.0.1 -P 3306 -u laravel_user -p HscMissionExamDB</code>
</pre>

Inside MySQL:
<pre>
<code>-- Reset password and grant privileges for localhost
ALTER USER 'laravel_user'@'localhost' IDENTIFIED BY 'secret123';
GRANT ALL PRIVILEGES ON HscMissionExamDB.* TO 'laravel_user'@'localhost';
</code>
</pre>

---

## 🧩 Apply Migrations and Seed Data

Once the `.env` file is ready and the database is created:

<pre>
<code>php artisan migrate --seed</code>
</pre>

Run a specific seeder (optional):
<pre>
<code>php artisan db:seed --class=ExamTableSeeder</code>
</pre>

---

## 🧰 Troubleshooting

### 🔸 Database not found?
Make sure you ran:
<pre>
<code>CREATE DATABASE ExamDB;</code>
</pre>

### 🔸 Access denied for user?
Check that the user exists:
<pre>
<code>SELECT User, Host FROM mysql.user;</code>
</pre>

If missing, recreate the user and grant permissions again.

---

✅ **Done!**  
Your Laravel app can now connect to `ExamDB` using: