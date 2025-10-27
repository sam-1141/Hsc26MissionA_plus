# Connect to Linode - Commands to Copy

## Your Correct IP: `172.235.251.160`

**Copy and paste this (note the IP ends with 160, NOT 1603):**

```bash
ssh root@172.235.251.160
```

---

## If SSH Doesn't Work - Alternative Methods:

### Method 1: Use Linode Console (Easiest!)

**Go to Linode Dashboard:**
1. Login at: https://login.linode.com
2. Click on your Linode server
3. Click "Launch LISH Console" (top right)
4. Use the web-based console - no SSH needed!

### Method 2: Check if Linode is Running

**In Linode Dashboard:**
- Make sure your Linode shows "Running" status
- If it's stopped, click "Boot" to start it

### Method 3: Try with Password Explicitly

```bash
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no root@172.235.251.160
```

---

## Once Connected, Run These Commands:

### Clone Repository:
```bash
cd /var/www
git clone https://github.com/sam-1141/Timer_archive.git timer
```

**When prompted for GitHub authentication, you'll need a token.**

### Or Use SSH to Clone (if you setup SSH keys):
```bash
cd /var/www
git clone git@github.com:sam-1141/Timer_archive.git timer
```

