# Transfer Your Local Project to Linode

## On Your LOCAL Machine (not Linode):

**Run these commands to transfer your project:**

```bash
cd ~/MY_Projects/New_Timer
```

```bash
scp -r . root@172.235.251.160:/var/www/timer
```

(This will copy everything from your local folder to /var/www/timer on Linode)

**It might ask for password - enter your Linode root password**

---

## Alternative: Use rsync (better, excludes unnecessary files)

```bash
cd ~/MY_Projects/New_Timer
```

```bash
rsync -avz --exclude 'node_modules' --exclude 'vendor' --exclude '.git' . root@172.235.251.160:/var/www/timer
```

(This is faster and excludes large folders)

---

## After Files Are Transferred:

**Connect to Linode and continue:**

```bash
ssh root@172.235.251.160
```

**Then on Linode, run:**

```bash
cd /var/www/timer
```

```bash
chown -R www-data:www-data /var/www/timer
chmod -R 755 /var/www/timer
chmod -R 775 /var/www/timer/storage
chmod -R 775 /var/www/timer/bootstrap/cache
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

