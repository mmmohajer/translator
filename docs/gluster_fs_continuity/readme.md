## 2. Set up a systemd service to run the script in the background

### Create a systemd service file:

```bash
sudo nano /etc/systemd/system/glusterfs-watchdog.service
```

### Paste this into the file:

```ini
[Unit]
Description=GlusterFS Watchdog Script
After=network.target docker.service
Requires=docker.service

[Service]
ExecStart=/var/www/app/glusterfs_watchdog.sh
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=glusterfs-watchdog

[Install]
WantedBy=multi-user.target
```

---

## 3. Enable and start the service

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable glusterfs-watchdog.service
sudo systemctl start glusterfs-watchdog.service
```

---

## 4. Check service status and logs

### To check service status:

```bash
sudo systemctl status glusterfs-watchdog.service
```

### To follow the logs:

```bash
journalctl -u glusterfs-watchdog.service -f
```
