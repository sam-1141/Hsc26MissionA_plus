# Commands to Copy and Run

## Run these commands on your Linode server (one at a time)

### Step 1: Add PHP repository
```bash
apt install -y software-properties-common
```

```bash
add-apt-repository ppa:ondrej/php -y
```

### Step 2: Update package list
```bash
apt update
```

### Step 3: Install PHP 8.2
```bash
apt install -y php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath php8.2-intl php8.2-cli
```

### Step 4: Install other services
```bash
apt install -y nginx mysql-server nodejs supervisor redis-server
```

### Step 5: Install Composer
```bash
curl -sS https://getcomposer.org/installer | php
```

```bash
mv composer.phar /usr/local/bin/composer
```

### Step 6: Start all services
```bash
systemctl enable php8.2-fpm mysql nginx supervisor redis-server
```

```bash
systemctl start php8.2-fpm mysql nginx supervisor redis-server
```

### Step 7: Verify installation
```bash
php -v
```

```bash
node -v
```

```bash
mysql --version
```

---

## All Commands in One Block (if you prefer)

Run all of these at once:

```bash
apt install -y software-properties-common && \
add-apt-repository ppa:ondrej/php -y && \
apt update && \
apt install -y php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath php8.2-intl php8.2-cli nginx mysql-server nodejs supervisor redis-server && \
curl -sS https://getcomposer.org/installer | php && \
mv composer.phar /usr/local/bin/composer && \
systemctl enable php8.2-fpm mysql nginx supervisor redis-server && \
systemctl start php8.2-fpm mysql nginx supervisor redis-server
```

