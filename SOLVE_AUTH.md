# After You Get Your GitHub Token

Run these commands on your Linode:

```bash
cd /var/www
```

```bash
git clone https://github.com/sam-1141/Timer_archive.git timer
```

**When prompted:**
- Username: `samadul-1141`
- Password: `paste_your_token_here`

---

## If You Want to Avoid This - Use SSH

```bash
ssh-keygen -t ed25519
```
(Just press Enter 3 times)

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the output, then:
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Paste the key
4. Save

Then clone with:
```bash
git clone git@github.com:sam-1141/Timer_archive.git timer
```

