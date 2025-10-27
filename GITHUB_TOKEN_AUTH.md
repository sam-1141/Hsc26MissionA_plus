# How to Get GitHub Personal Access Token

## Quick Solution:

### Step 1: Go to GitHub Settings
Visit: https://github.com/settings/tokens

### Step 2: Generate New Token
- Click "Generate new token"
- Select "classic" token
- Give it a name: "Linode Deployment"
- Set expiration: No expiration (or 90 days)
- Select scopes: Check "repo" (this gives read access)

### Step 3: Copy the Token
**IMPORTANT:** Copy the token immediately - you won't see it again!

### Step 4: Use Token as Password
When Git asks for password, paste the token (not your GitHub password)

---

## Alternative: Use SSH (Recommended for security)

### Step 1: Generate SSH Key on Linode
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
(Press Enter to accept defaults)

### Step 2: Copy Public Key
```bash
cat ~/.ssh/id_ed25519.pub
```

### Step 3: Add to GitHub
- Go to: https://github.com/settings/keys
- Click "New SSH key"
- Paste the public key
- Save

### Step 4: Test Connection
```bash
ssh -T git@github.com
```

### Step 5: Clone with SSH
```bash
git clone git@github.com:sam-1141/Timer_archive.git timer
```

---

## Alternative 2: Make Repo Public (Temporary)

1. Go to your repository settings
2. Scroll down to "Danger Zone"
3. Click "Change visibility"
4. Make it public temporarily
5. Clone without authentication
6. (You can make it private again later)

