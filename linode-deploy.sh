#!/bin/bash
# Linode Deployment Script for Laravel Application

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Laravel Application Linode Deployment Script ===${NC}"

# Update system
echo -e "${BLUE}Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Nginx
echo -e "${BLUE}Installing Nginx...${NC}"
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Install PHP 8.2 and required extensions
echo -e "${BLUE}Installing PHP 8.2 and extensions...${NC}"
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml \
    php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath php8.2-intl php8.2-cli

# Install MySQL
echo -e "${BLUE}Installing MySQL...${NC}"
sudo apt install -y mysql-server
sudo mysql_secure_installation

# Install Node.js (using NodeSource repository for latest LTS)
echo -e "${BLUE}Installing Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Install Composer
echo -e "${BLUE}Installing Composer...${NC}"
cd ~
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Supervisor for queue workers
echo -e "${BLUE}Installing Supervisor...${NC}"
sudo apt install -y supervisor

# Install Redis (optional but recommended for caching)
echo -e "${BLUE}Installing Redis...${NC}"
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

echo -e "${GREEN}=== Basic installation complete! ===${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Create MySQL database and user"
echo "2. Clone your project"
echo "3. Configure .env file"
echo "4. Run composer install"
echo "5. Run npm install && npm run build"
echo "6. Set up Nginx configuration"
echo "7. Configure Supervisor for queue workers"

