# Quick Start Guide: Deploy Your Laravel App on Linode

## Step 1: Create Your First Linode Instance

### 1.1 Login to Linode
- Go to https://login.linode.com/
- Login with your credentials

### 1.2 Create Linode Instance

Click **"Create"** button (top right) → Select **"Linode"**

Fill in these details:

**Distribution:** Ubuntu 22.04 LTS

**Region:** Choose closest to your users (e.g., Singapore, Mumbai for Asia)

**Linode Plan:** 
- Select "Shared CPU"
- Choose: **$18/month - 2 GB RAM, 2 vCPU, 50 GB SSD**

**Linode Label:** `laravel-timer` (or any name you like)

**Root Password:** Set a strong password (save it securely!)

**SSH Keys (Optional but Recommended):**
- Add your SSH public key if you have one
- This makes secure login without passwords

Click **"Create Linode"** - Wait 2-3 minutes for provisioning

---

## Step 2: Prepare Your Local Machine

### 2.1 Get Your Linode IP Address

Once Linode is created, you'll see:
- Your Linode IP address (e.g., `172.233.12.34`)
- Status: "Running"

**Copy this IP address** - you'll need it!

### 2.2 Verify SSH Access

Open terminal on your local machine and test connection:

```bash
ssh root@YOUR_LINODE_IP
# Replace YOUR_LINODE_IP with your actual IP

# You may see a warning about authenticity - type 'yes'
# Enter your root password when prompted
```

✅ If you can connect, you're ready to continue!

---

## Step 3: Deploy to Linode

### Option A: Automated Deployment (Recommended for First Time)

**On your local machine:**

1. **Transfer deployment files to Linode:**
```bash
# From your project directory
scp linode-deploy.sh nginx-laravel.conf supervisor-worker.conf root@YOUR_LINODE_IP:~/
```

2. **Login to your Linode:**
```bash
ssh root@YOUR_LINODE_IP
```

3. **Run the deployment script:**
```bash
chmod +x linode-deploy.sh
./linode-deploy.sh
```

This will take 10-15 minutes and install:
- Nginx web server
- PHP 8.2
- MySQL database
- Node.js
- Composer
- Redis

### Option B: Manual Step-by-Step (If you prefer control)

Follow the detailed guide in `DEPLOYMENT.md`

---

## Step 4: Install Your Application

### 4.1 Create Database

```bash
# Still on your Linode server
sudo mysql -u root -p
# Enter your root password when prompted
```

Inside MySQL, run:
```sql
CREATE DATABASE CoreDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'laravel_user'@'localhost' IDENTIFIED BY 'choose_strong_password';
GRANT ALL PRIVILEGES ON CoreDB.* TO 'laravel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4.2 Clone Your Project

```bash
# Go to web directory
cd /var/www

# Clone your repository
# Replace with your actual Git repo URL
sudo git clone YOUR_REPO_URL timer

# Set permissions
sudo chown -R www-data:www-data /var/www/timer
sudo chmod -R 755 /var/www/timer
sudo chmod -R 775 /var/www/timer/storage
sudo chmod -R 775 /var/www/timer/bootstrap/cache
```

### 4.3 Install Dependencies

```bash
cd /var/www/timer

# Install PHP dependencies
sudo -u www-data composer install --optimize-autoloader --no-dev

# Install Node dependencies
sudo npm install --registry=https://registry.npmmirror.com

# Build frontend
sudo npm run build
```

### 4.4 Configure Environment

```bash
# Create .env file
sudo nano .env
```

Paste this (edit with your settings):
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
DB_PASSWORD=your_password_from_step_4.1

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

Save and exit (Ctrl+X, then Y, then Enter)

```bash
# Generate app key
sudo -u www-data php artisan key:generate
```

### 4.5 Run Migrations

```bash
sudo -u www-data php artisan migrate --force

# If you have seeders
sudo -u www-data php artisan db:seed
```

---

## Step 5: Configure Nginx

### 5.1 Setup Nginx Configuration

```bash
# Copy configuration file
sudo cp nginx-laravel.conf /etc/nginx/sites-available/timer

# Edit the file
sudo nano /etc/nginx/sites-available/timer
```

Change this line:
```nginx
server_name your-domain.com www.your-domain.com;
```

To (for now, use your Linode IP):
```nginx
server_name YOUR_LINODE_IP;
```

Save and exit

### 5.2 Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/timer /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## Step 6: Setup SSL (When You Have Domain)

Once you point your domain to the Linode IP:

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Step 7: Configure Queue Workers

```bash
# Copy supervisor config
sudo cp supervisor-worker.conf /etc/supervisor/conf.d/laravel-worker.conf

# Update supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-worker:*

# Check status
sudo supervisorctl status
```

---

## Step 8: Setup Cron Jobs

```bash
# Edit crontab
sudo crontab -u www-data -e

# Add this line at the end:
* * * * * cd /var/www/timer && php artisan schedule:run >> /dev/null 2>&1

# Save and exit
```

---

## Step 9: Optimize for Production

```bash
cd /var/www/timer

# Cache everything
sudo -u www-data php artisan config:cache
sudo -u www-data php artisan route:cache
sudo -u www-data php artisan view:cache
```

---

## Step 10: Test Your Application

Visit in your browser:
```
http://YOUR_LINODE_IP
```

You should see your Laravel application!

---

## 🎉 You're Live!

Your application is now hosted on Linode!

### Access Your Application
- **URL**: http://YOUR_LINODE_IP (or your domain once configured)
- **SSH**: `ssh root@YOUR_LINODE_IP`

### Next Steps (Optional)

1. **Point Your Domain** to Linode IP
2. **Setup SSL** with Certbot
3. **Configure Firewall**: `sudo ufw enable`
4. **Setup Monitoring** in Linode dashboard
5. **Configure Backups** (automatic via Linode)

### Important Commands

```bash
# View logs
tail -f /var/www/timer/storage/logs/laravel.log

# Restart services
sudo systemctl restart nginx
sudo supervisorctl restart laravel-worker:*

# Update application
cd /var/www/timer
sudo git pull
sudo -u www-data composer install --optimize-autoloader --no-dev
sudo npm run build
sudo -u www-data php artisan migrate --force
sudo -u www-data php artisan optimize
```

---

## 🆘 Troubleshooting

### Can't connect via SSH?
- Check Linode is running in dashboard
- Verify IP address is correct
- Make sure SSH keys are configured

### Website shows "404 Not Found"?
- Check Nginx configuration: `sudo nginx -t`
- Verify files in `/var/www/timer/public/` exist
- Check logs: `sudo tail -f /var/log/nginx/timer-error.log`

### Database connection error?
- Verify MySQL is running: `sudo systemctl status mysql`
- Check credentials in `.env` match database setup
- Test connection: `mysql -u laravel_user -p CoreDB`

---

## 📞 Need Help?

- Check detailed logs: `/var/www/timer/storage/logs/laravel.log`
- Linode Support: Available 24/7 in dashboard
- Laravel Documentation: https://laravel.com/docs

**Good luck with your deployment! 🚀**

