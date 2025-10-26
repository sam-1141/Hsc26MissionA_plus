#!/bin/bash
# PHP 8.2 Installation Script for Ubuntu

set -e

echo "Adding PHP 8.2 repository..."

# Add PHP repository
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y

echo "Updating package list..."
sudo apt update

echo "Installing PHP 8.2 and extensions..."
sudo apt install -y php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml \
    php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath php8.2-intl php8.2-cli

echo "Installing other required packages..."
sudo apt install -y nginx mysql-server nodejs supervisor redis-server

echo "Installing Composer..."
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

echo "Starting services..."
sudo systemctl enable php8.2-fpm mysql nginx supervisor redis-server
sudo systemctl start php8.2-fpm mysql nginx supervisor redis-server

echo "✅ Installation complete!"
echo "PHP version:"
php -v

echo ""
echo "MySQL version:"
mysql --version

echo ""
echo "Node version:"
node -v

echo ""
echo "Next steps:"
echo "1. Run 'mysql -u root -p' to set up MySQL"
echo "2. Follow the database setup instructions"

