# Next Steps After Installation

## Step 1: Create MySQL Database

```bash
mysql -u root -p
```

(This will ask for root password. If you didn't set one yet, just press Enter)

**Inside MySQL, run these commands:**

```sql
CREATE DATABASE CoreDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'laravel_user'@'localhost' IDENTIFIED BY 'change_this_password';
GRANT ALL PRIVILEGES ON CoreDB.* TO 'laravel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

*(Replace `change_this_password` with a strong password, remember it!)*

---

## Step 2: Clone Your Project

**First, get your Git repository URL from GitHub/GitLab/etc.**

```bash
cd /var/www
```

```bash
git clone YOUR_GIT_REPO_URL timer
```

**Example:**
```bash
git clone https://github.com/yourusername/yourrepo.git timer
```

---

## Step 3: Set Correct Permissions

```bash
chown -R www-data:www-data /var/www/timer
```

```bash
chmod -R 755 /var/www/timer
```

```bash
chmod -R 775 /var/www/timer/storage
```

```bash
chmod -R 775 /var/www/timer/bootstrap/cache
```

---

## Step 4: Install Application Dependencies

```bash
cd /var/www/timer
```

```bash
composer install --optimize-autoloader --no-dev
```

```bash
npm install --registry=https://registry.npmmirror.com
```

```bash
npm run build
```

---

## Step 5: Configure Environment

```bash
cp .env.example .env
```

(Or if you don't have .env.example, create it manually)

```bash
nano .env
```

**Copy and paste this configuration (EDIT where needed):**

```env
APP_NAME="Timer App"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://YOUR_LINODE_IP
APP_KEY=

DB_CONNECTION=CoreDB
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=CoreDB
DB_USERNAME=laravel_user
DB_PASSWORD=change_this_password

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

**Save with:** Ctrl+X, then Y, then Enter

**Generate app key:**
```bash
php artisan key:generate
```

---

## Step 6: Run Database Migrations

```bash
php artisan migrate --force
```

---

## Step 7: Configure Nginx

```bash
cp /var/www/timer/nginx-laravel.conf /etc/nginx/sites-available/timer
```

```bash
nano /etc/nginx/sites-available/timer
```

**Change this line:**
```
server_name your-domain.com www.your-domain.com;
```

**To:**
```
server_name YOUR_LINODE_IP;
```

**Also change:**
```
root /var/www/timer/public;
```

**Save and exit (Ctrl+X, Y, Enter)**

**Enable the site:**
```bash
ln -s /etc/nginx/sites-available/timer /etc/nginx/sites-enabled/
```

```bash
rm /etc/nginx/sites-enabled/default
```

```bash
nginx -t
```

```bash
systemctl reload nginx
```

---

## Step 8: Setup Queue Workers

```bash
cp /var/www/timer/supervisor-worker.conf /etc/supervisor/conf.d/laravel-worker.conf
```

```bash
supervisorctl reread
```

```bash
supervisorctl update
```

```bash
supervisorctl start laravel-worker:*
```

---

## Step 9: Setup Cron Job

```bash
crontab -u www-data -e
```

**Add this line at the end:**
```
* * * * * cd /var/www/timer && php artisan schedule:run >> /dev/null 2>&1
```

**Save and exit (Ctrl+X, Y, Enter)**

---

## Step 10: Optimize Application

```bash
php artisan config:cache
```

```bash
php artisan route:cache
```

```bash
php artisan view:cache
```

---

## Test Your Application

**Visit in browser:**
```
http://YOUR_LINODE_IP
```

You should see your Laravel application!

