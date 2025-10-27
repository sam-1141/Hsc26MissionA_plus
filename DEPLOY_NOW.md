# Deploy Commands - Copy and Run These on Linode

**On your Linode server, run these commands:**

## Step 1: Go to web directory and clone your repo

```bash
cd /var/www
```

```bash
git clone https://github.com/sam-1141/Timer_archive.git timer
```

## Step 2: Set correct permissions

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

## Step 3: Install dependencies

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

## Step 4: Create .env file

```bash
nano .env
```

**Paste this and edit YOUR_LINODE_IP and DB_PASSWORD:**

```env
APP_NAME="Timer App"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://YOUR_LINODE_IP

DB_CONNECTION=CoreDB
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=CoreDB
DB_USERNAME=laravel_user
DB_PASSWORD=your_password_here

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

**Save:** Ctrl+X, then Y then Enter**

**Generate app key:**
```bash
php artisan key:generate
```

## Step 5: Run migrations

```bash
php artisan migrate --force
```

## Step 6: Setup Nginx

```bash
cp nginx-laravel.conf /etc/nginx/sites-available/timer
```

```bash
nano /etc/nginx/sites-available/timer
```

**Change `your-domain.com` to your Linode IP**

**Save:** Ctrl+X, Y, Enter

**Enable site:**
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

## Step 7: Setup queue workers

```bash
cp supervisor-worker.conf /etc/supervisor/conf.d/laravel-worker.conf
```

```bash
supervisorctl reread
supervisorctl update
supervisorctl start laravel-worker:*
```

## Step 8: Setup cron

```bash
crontab -u www-data -e
```

**Add this line at the end:**
```
* * * * * cd /var/www/timer && php artisan schedule:run >> /dev/null 2>&1
```

**Save:** Ctrl+X, Y, Enter

## Step 9: Optimize application

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Done! Visit your site

**Open in browser:**
```
http://YOUR_LINODE_IP
```

