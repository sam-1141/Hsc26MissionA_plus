# Deployment Checklist for Linode

## Before Deployment

- [ ] Purchase and configure Linode instance (2GB RAM, 2 CPU minimum)
- [ ] Point domain to Linode IP address
- [ ] Have SSH access to Linode
- [ ] Backup existing data (if upgrading)
- [ ] Review and update environment variables
- [ ] Test application locally
- [ ] Ensure all migrations are ready
- [ ] Verify database schema

## Server Setup

- [ ] SSH into Linode server
- [ ] Run `linode-deploy.sh` or manually install packages
- [ ] Verify PHP 8.2 is installed: `php -v`
- [ ] Verify MySQL is running: `sudo systemctl status mysql`
- [ ] Verify Node.js is installed: `node -v`
- [ ] Verify Composer is installed: `composer --version`
- [ ] Verify Nginx is installed: `nginx -v`

## Database Setup

- [ ] Create database `CoreDB`
- [ ] Create database user `laravel_user`
- [ ] Grant appropriate permissions
- [ ] Test database connection

## Application Deployment

- [ ] Clone repository to `/var/www/timer`
- [ ] Set proper file permissions (755 dirs, 644 files)
- [ ] Set storage permissions (775)
- [ ] Create `.env` file
- [ ] Generate application key: `php artisan key:generate`
- [ ] Configure `.env` with production settings
- [ ] Install Composer dependencies: `composer install --optimize-autoloader --no-dev`
- [ ] Install Node dependencies: `npm install`
- [ ] Build frontend assets: `npm run build`

## Database Migration

- [ ] Run migrations: `php artisan migrate --force`
- [ ] Seed database (if needed): `php artisan db:seed`
- [ ] Verify database tables are created
- [ ] Test database queries

## Nginx Configuration

- [ ] Copy `nginx-laravel.conf` to `/etc/nginx/sites-available/timer`
- [ ] Update domain name in configuration
- [ ] Update root path to `/var/www/timer/public`
- [ ] Enable site: `ln -s /etc/nginx/sites-available/timer /etc/nginx/sites-enabled/`
- [ ] Test Nginx config: `nginx -t`
- [ ] Reload Nginx: `systemctl reload nginx`

## SSL Certificate

- [ ] Install Certbot
- [ ] Obtain SSL certificate: `certbot --nginx -d yourdomain.com`
- [ ] Verify HTTPS is working
- [ ] Test SSL auto-renewal (it should be automatic)

## Queue Workers

- [ ] Copy `supervisor-worker.conf` to `/etc/supervisor/conf.d/laravel-worker.conf`
- [ ] Update supervisor: `supervisorctl reread && supervisorctl update`
- [ ] Start workers: `supervisorctl start laravel-worker:*`
- [ ] Verify workers are running: `supervisorctl status`

## Cron Jobs

- [ ] Set up Laravel scheduler in crontab
- [ ] Verify cron is executing: check logs

## Optimization

- [ ] Cache config: `php artisan config:cache`
- [ ] Cache routes: `php artisan route:cache`
- [ ] Cache views: `php artisan view:cache`
- [ ] Enable Redis caching (if using)

## Security

- [ ] Set up UFW firewall: `ufw allow OpenSSH`, `ufw allow 'Nginx Full'`
- [ ] Enable firewall: `ufw enable`
- [ ] Configure fail2ban (optional but recommended)
- [ ] Disable SSH password authentication (use keys only)
- [ ] Set strong database passwords
- [ ] Review file permissions
- [ ] Configure auto-updates: `apt install unattended-upgrades`

## Testing

- [ ] Test homepage loads
- [ ] Test user registration/login
- [ ] Test all major features
- [ ] Test API endpoints
- [ ] Test file uploads
- [ ] Test queue processing
- [ ] Check browser console for errors
- [ ] Test on mobile devices

## Monitoring

- [ ] Configure Linode Cloud Manager monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log rotation
- [ ] Set up disk space alerts
- [ ] Set up memory alerts
- [ ] Review Laravel logs: `tail -f storage/logs/laravel.log`

## Final Checks

- [ ] Website is accessible via domain
- [ ] HTTPS is working correctly
- [ ] Database connection is stable
- [ ] Queue workers are processing jobs
- [ ] No errors in logs
- [ ] Performance is acceptable
- [ ] All features are working
- [ ] Backup strategy is in place

## Post-Deployment

- [ ] Monitor application for 24-48 hours
- [ ] Set up automated backups
- [ ] Document changes
- [ ] Update team about new deployment
- [ ] Create rollback plan

## Rollback Plan (If Needed)

1. Stop Nginx: `sudo systemctl stop nginx`
2. Restore previous version: `git checkout <previous-commit>`
3. Clear caches: `php artisan optimize:clear`
4. Restart services
5. Test functionality

## Useful Commands Reference

```bash
# View application logs
tail -f /var/www/timer/storage/logs/laravel.log

# View Nginx logs
tail -f /var/log/nginx/timer-error.log

# Restart services
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
sudo supervisorctl restart laravel-worker:*

# Clear caches
cd /var/www/timer && php artisan optimize:clear

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
htop
```

