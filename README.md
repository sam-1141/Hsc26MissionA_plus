
# ft_repo
# 1️⃣ Go to your projects folder
cd ~/MY_Projects

# 2️⃣ Clone the project (or move it)
git clone <repository_url> sheduler
cd sheduler

# 3️⃣ Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# 4️⃣ Install PHP dependencies (Composer)
composer install

# 5️⃣ Clear Laravel caches (optional but recommended)
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# 6️⃣ Install Node.js dependencies (npm)
npm install --registry=https://registry.npmmirror.com

# 7️⃣ Build frontend assets for development (hot reload)
npm run dev

# 8️⃣ Start Laravel server
php artisan serve
# Timer_archive
