# Useful PM2 commands

Here’s a list of **useful PM2 commands** covering application management, CPU/memory profiling, error handling, and managing multiple apps with PM2.

---

### **1. Managing Multiple Applications with PM2**

You can manage several applications simultaneously using PM2, allowing easy control over all processes from one location.

#### **Start Multiple Applications**
You can start multiple apps using individual commands or through an ecosystem file.

- **Starting each app individually:**

```bash
pm2 start dist/app1.js --name "app1"
pm2 start dist/app2.js --name "app2"
pm2 start dist/app3.js --name "app3"
```

- **Start using an ecosystem file:**

You can define multiple apps inside the `ecosystem.config.js` file:

```typescript
module.exports = {
  apps: [
    {
      name: 'app1',
      script: './dist/app1.js',
    },
    {
      name: 'app2',
      script: './dist/app2.js',
    },
    {
      name: 'app3',
      script: './dist/app3.js',
    },
  ],
};
```

Start all apps with one command:

```bash
pm2 start ecosystem.config.js
```

#### **Stop Multiple Applications**

- To stop a specific app:

```bash
pm2 stop app1
```

- To stop all running applications:

```bash
pm2 stop all
```

#### **Restart Multiple Applications**

- Restart a specific app:

```bash
pm2 restart app1
```

- Restart all apps:

```bash
pm2 restart all
```

#### **Delete (Remove) Applications**

- To delete a specific app from PM2:

```bash
pm2 delete app1
```

- To delete all apps:

```bash
pm2 delete all
```

---

### **2. Profiling CPU and Memory Usage**

PM2 offers powerful monitoring capabilities, allowing you to profile CPU and memory usage in real-time.

#### **Monitor a Specific Application**

Use the following command to get live resource usage (CPU and memory) for an individual app:

```bash
pm2 monit
```

This will display a live monitoring dashboard for all PM2-managed applications, showing memory and CPU usage in real-time.

#### **List All Processes with Resource Usage**

To get a quick snapshot of all running applications with their CPU and memory usage, use:

```bash
pm2 list
```

This command will display a table listing each app’s status, memory usage, and CPU percentage.

#### **Detailed Information on Application Stats**

To get detailed metrics of a specific app:

```bash
pm2 show app1
```

This will show comprehensive information about the app, including process ID, uptime, restarts, memory, and CPU usage.

---

### **3. Error Handling and Auto-Restart on Failure**

PM2 has robust error-handling mechanisms, which allow automatic recovery from app failures and in-depth error tracking.

#### **Automatic Restart on Failure**

By default, PM2 will automatically restart an application if it crashes. You can also manually configure the restart behavior in the `ecosystem.config.js` file:

```typescript
module.exports = {
  apps: [
    {
      name: 'app1',
      script: './dist/app1.js',
      max_restarts: 5,  // Restart up to 5 times in case of failure
      restart_delay: 5000,  // 5 seconds delay between restarts
      exp_backoff_restart_delay: 100, // Exponential backoff restart delay
    },
  ],
};
```

#### **Handling Crash Logs**

PM2 logs all errors and restarts to help with post-mortem debugging. You can view the logs using:

```bash
pm2 logs
```

To view logs for a specific application:

```bash
pm2 logs app1
```

This will show both standard output and error logs, helping you understand what caused the app to fail.

#### **Configure Log File Rotation**

To avoid log files growing indefinitely, PM2 allows you to configure log rotation:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M  # Rotate when logs reach 10MB
pm2 set pm2-logrotate:retain 30     # Keep logs for 30 days
```

---

### **4. CPU/Memory Profiling for Performance Analysis**

PM2 can profile your applications to diagnose performance bottlenecks using CPU and heap snapshots.

#### **Enable Profiling on a Specific Application**

To capture a CPU profile:

```bash
pm2 profile start app1
# Let it run for a while, then stop profiling
pm2 profile stop app1
```

You can find the generated CPU profile in the `.pm2/profiles` directory, which you can open in Chrome DevTools for detailed analysis.

#### **Heap Snapshot for Memory Profiling**

To capture a memory heap snapshot:

```bash
pm2 heapdump app1
```

This will create a snapshot in the `.pm2/heapdumps` directory. You can open the `.heapsnapshot` files in Chrome DevTools to analyze memory usage.

---

### **5. Graceful Reload and Zero-Downtime Deployment**

PM2 supports zero-downtime application reloads using the following command:

#### **Graceful Reload**

Reload an application without downtime, ensuring requests in progress are handled before restarting:

```bash
pm2 reload app1
```

#### **Reload All Applications**

To reload all applications:

```bash
pm2 reload all
```

---

### **6. Managing Startup Behavior**

PM2 can automatically restart your applications on system reboot.

#### **Configure PM2 for Auto-Startup**

To enable auto-start on system boot:

```bash
pm2 startup
```

This command will generate a startup script. Follow the instructions to configure it for your operating system. Afterward, save your running processes:

```bash
pm2 save
```

#### **Remove PM2 Startup Script**

To remove the PM2 startup script and disable auto-start on boot:

```bash
pm2 unstartup
```

---

### **7. Useful General Commands**

#### **Get PM2 Version**

Check the current version of PM2:

```bash
pm2 -v
```

#### **PM2 Configuration Backup**

Backup your current PM2 configuration, including all running apps, so they can be restored later:

```bash
pm2 save
```

Restore the saved configuration:

```bash
pm2 resurrect
```

#### **Application Restarts on File Changes (Watch Mode)**

Automatically restart your app when files change in development:

```bash
pm2 start app1 --watch
```

---

### **Conclusion**

PM2 offers a wealth of powerful commands that allow you to manage multiple applications, monitor performance, handle errors, and ensure reliable operations with zero downtime. Whether you're managing a small Node.js app or a large-scale, multi-instance production system, PM2 makes your life easier by automating key tasks, enabling real-time monitoring, and providing robust error handling.

By leveraging the commands and features outlined in this guide, you'll be able to streamline your development and operations workflow while ensuring that your applications run smoothly and efficiently.

