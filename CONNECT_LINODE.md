# Connect to Your Linode Server

## Your Linode IP: `172.235.251.160`

## To Connect from Your Local Machine:

**Open terminal on your local machine and run:**

```bash
ssh root@172.235.251.160
```

**If it asks for a password:**
- Enter the root password you set when creating the Linode

**If it says "Permission denied" and asks for a key:**
- You can set up password authentication, or
- Add your SSH key to the Linode

---

## If You Need to Set Up SSH Key:

### On Your Local Machine:

**Check if you already have an SSH key:**
```bash
ls -la ~/.ssh
```

**If you have `id_rsa.pub` or `id_ed25519.pub`, copy it:**
```bash
cat ~/.ssh/id_rsa.pub
# or
cat ~/.ssh/id_ed25519.pub
```

**Copy the output, then on your Linode:**
```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
```

**Paste your public key, save (Ctrl+X, Y, Enter)**

**Then you can connect:**
```bash
ssh root@172.235.251.160
```

---

## Or Use Password Authentication (Easier):

**On your Linode (via Linode console or previous session):**

```bash
nano /etc/ssh/sshd_config
```

**Find the line:**
```
PasswordAuthentication no
```

**Change it to:**
```
PasswordAuthentication yes
```

**Then:**
```bash
systemctl restart ssh
```

**Now you can connect with:**
```bash
ssh root@172.235.251.160
```

