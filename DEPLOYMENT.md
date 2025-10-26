# Linode Deployment Guide for Laravel Application

## Prerequisites
- A Linode account with SSH access
- Domain name pointing to your Linode IP address
- Basic knowledge of Linux command line

## 🚀 Quick Deployment Steps

### 1. Initial Server Setup

```bash
# Log into your Linode server
ssh root@your-linode-ip

# Run the deployment script
chmod +x linode-deploy.sh
./linode-deploy.sh
```

### 2. Create MySQL Database

```bash
sudo mysql -u root -p

# Inside MySQL prompt:
CREATE DATABASE CoreDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'laravel_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON CoreDB.* TO 'laravel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Clone Your Project

```bash
# Navigate to web directory
cd /var/www

# Clone your repository (replace with your actual repo URL)
sudo git clone <your-repo-url> timer

# Set proper permissions
sudo chown -R www-data:www-data /var/www/timer
sudo chmod -R 755 /var/www/timer
sudo chmod -R 775 /var/www/timer/storage
sudo chmod -R 775 /var/www/timer/bootstrap/cache
```

### 4. Configure Environment

```bash
cd /var/www/timer

# Create .env file
sudo cp .env.example .env  # if you have .env.example
# Or create manually:
sudo nano .env

# Generate application key
sudo -u www-data php artisan key:generate
```

### 5. Configure .env File

Update the `.env` file with your production settings:

```env
APP_NAME="Timer App"
APP_ENV=production
APP_KEY=base64:... (generated automatically)
APP_DEBUG=false
APP_URL=https://your-domain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=CoreDB
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=CoreDB
DB_USERNAME=laravel_user
DB_PASSWORD=your_strong_password

# Cache & Session
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail Configuration (if using email features)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=hello@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"
```

### 6. Install Dependencies

```bash
cd /var/www/timer

# Install PHP dependencies
sudo -u www-data composer install --optimize-autoloader --no-dev

# Install Node.js dependencies
sudo npm install --registry=https://registry.npmmirror.com

# Build frontend assets
sudo npm run build
```

### 7. Run Migrations

```bash
sudo -u www-data php artisan migrate --force

# Optional: Seed initial data
sudo -u www-data php artisan db:seed
```

### 8. Configure Nginx

```bash
# Copy the nginx configuration
sudo cp nginx-laravel.conf /etc/nginx/sites-available/timer

# Edit the configuration to match your domain
sudo nano /etc/nginx/sites-available/timer

# Enable the site
sudo ln -s /etc/nginx/sites-available/timer /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

Update `/etc/nginx/sites-available/timer`:
- Replace `your-domain.com` with your actual domain
- Ensure `root /var/www/timer/public;` points to your app's public directory

### 9. Configure SSL with Certbot (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot will automatically configure HTTPS and auto-renewal
```

### 10. Set Up Queue Workers with Supervisor

```bash
# Copy supervisor configuration
sudo cp supervisor-worker.conf /etc/supervisor/conf.d/laravel-worker.conf

# Reload Supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-worker:*

# Check worker status
sudo supervisorctl status
```

### 11. Configure Laravel Scheduler (Cron Job)

```bash
# Edit crontab for www-data user
sudo crontab -u www-data -e

# Add this line:
* * * * * cd /var/www/timer && php artisan schedule:run >> /dev/null 2>&1
```

### 12. Optimize Laravel for Production

```bash
cd /var/www/timer

# Cache configuration
sudo -u www-data php artisan config:cache

# Cache routes
sudo -u www-data php artisan route:cache

# Cache views
sudo -u www-data php artisan view:cache

# Clear all caches
sudo -u www-data php artisan optimize:clear
```

### 13. Set Up Firewall (UFW)

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 14. Final Checks

```bash
# Check Nginx status
sudo systemctl status nginx

# Check PHP-FPM status
sudo systemctl status php8.2-fpm

# Check MySQL status
sudo systemctl status mysql

# Check Redis status
sudo systemctl status redis-server

# Check Supervisor status
sudo supervisorctl status

# Check Laravel logs
tail -f /var/www/timer/storage/logs/laravel.log
```

## 🔧 Maintenance Commands

### Clear Caches
```bash
cd /var/www/timer
sudo -u www-data php artisan cache:clear
sudo -u www-data php artisan config:clear
sudo -u www-data php artisan route:clear
sudo -u www-data php artisan view:clear
sudo -u www-data php artisan optimize
```

### Update Application
```bash
cd /var/www/timer
sudo git pull origin main  # or your branch name
sudo -u www-data composer install --optimize-autoloader --no-dev
sudo -u www-data php artisan migrate --force
sudo npm run build
sudo -u www-data php artisan optimize
sudo supervisorctl restart laravel-worker:*
```

### View Logs
```bash
# Laravel logs
tail -f /var/www/timer/storage/logs/laravel.log

# Nginx logs
tail -f /var/log/nginx/timer-error.log

# Queue worker logs
tail -f /var/www/timer/storage/logs/worker.log
```

## 🛡️ Security Checklist

- [ ] Change default SSH port (optional but recommended)
- [ ] Set up SSH key authentication only
- [ ] Configure firewall (UFW)
- [ ] Set up SSL certificate
- [ ] Use strong database passwords
- [ ] Enable automatic security updates
- [ ] Configure fail2ban for SSH protection
- [ ] Set proper file permissions (755 for directories, 644 for files)
- [ ] Keep Laravel and dependencies updated

## 📊 Monitoring Recommendations

- Set up Linode Cloud Manager monitoring
- Configure Laravel logging to external service
- Set up uptime monitoring (UptimeRobot, etc.)
- Monitor disk space, memory, and CPU usage
- Set up log rotation

## 🚨 Troubleshooting

### Website not loading
```bash
sudo systemctl status nginx
sudo nginx -t
tail -f /var/log/nginx/timer-error.log
```

### Database connection errors
```bash
sudo mysql -u laravel_user -p
# Test connection
```

### Queue workers not running
```bash
sudo supervisorctl status
sudo supervisorctl restart laravel-worker:*
tail -f /var/www/timer/storage/logs/worker.log
```

### Permission issues
```bash
sudo chown -R www-data:www-data /var/www/timer
sudo chmod -R 755 /var/www/timer
sudo chmod -R 775 /var/www/timer/storage
sudo chmod -R 775 /var/www/timer/bootstrap/cache
```

## 📦 Linode Resource Recommendations

| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| RAM | 2GB | 4GB | More RAM for queue workers & caching |
| CPU | 1 Core | 2 Cores | Better performance with more cores |
| Storage | 40GB | 80GB | Node modules & vendor files take space |
| Transfer | 2TB | 4TB | Depends on traffic |

## 🌐 Domain Configuration

1. Point your domain's A record to Linode IP
2. Point www CNAME to your domain
3. Wait for DNS propagation (can take 24-48 hours)
4. Configure SSL certificate after DNS is ready

## 💡 Performance Optimization

- Enable OPcache in PHP
- Use Redis for caching
- Configure Nginx caching for static files
- Use CDN for assets (Cloudflare, etc.)
- Enable HTTP/2 in Nginx
- Optimize images before upload

