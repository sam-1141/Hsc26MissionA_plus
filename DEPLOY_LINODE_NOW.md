# Deploy Commands - Run These on Your Linode Now

## You're now on your Linode server. Let's deploy!

### Step 1: Clone Your Repository

```bash
cd /var/www
```

```bash
git clone https://github.com/sam-1141/Timer_archive.git timer
```

**When prompted for GitHub credentials:**
- You'll need a GitHub Personal Access Token (not your password)
- See instructions below for getting a token

---

## Get GitHub Token (Do this on your local computer):

### Quick Steps:
1. **Go to:** https://github.com/settings/tokens/new
2. **Name:** `Linode Deployment`
3. **Expiration:** 90 days
4. **Scopes:** Check `repo` 
5. **Click:** Generate token
6. **COPY THE TOKEN** (you won't see it again!)

### When Git asks for password on Linode:
- **Username:** `samadul-1141`
- **Password:** `paste_your_token_here`

---

## After Successful Clone:

### Step 2: Set Permissions

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

### Step 3: Install Dependencies

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

### Step 4: Create .env File

```bash
nano .env
```

**Paste this configuration (edit where marked):**

```env
APP_NAME="Timer App"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://172.235.251.160

DB_CONNECTION=CoreDB
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=CoreDB
DB_USERNAME=laravel_user
DB_PASSWORD=your_mysql_password

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

**Save:** Ctrl+X, then Y, then Enter

```bash
php artisan key:generate
```

### Step 5: Run Migrations

```bash
php artisan migrate --force
```

### Step 6: Setup Nginx

```bash
cp nginx-laravel.conf /etc/nginx/sites-available/timer
```

```bash
nano /etc/nginx/sites-available/timer
```

**Find this line:**
```
server_name your-domain.com www.your-domain.com;
```

**Change to:**
```
server_name 172.235.251.160;
```

**Also verify:**
```
root /var/www/timer/public;
```

**Save:** Ctrl+X, Y, Enter

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

### Step 7: Setup Queue Workers

```bash
cp supervisor-worker.conf /etc/supervisor/conf.d/laravel-worker.conf
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

### Step 8: Setup Cron

```bash
crontab -u www-data -e
```

**Add this line at the bottom:**
```
* * * * * cd /var/www/timer && php artisan schedule:run >> /dev/null 2>&1
```

**Save:** Ctrl+X, Y, Enter

### Step 9: Optimize Application

```bash
php artisan config:cache
```

```bash
php artisan route:cache
```

```bash
php artisan view:cache
```

## Done! 🎉

**Visit your application:**
```
http://172.235.251.160
```

