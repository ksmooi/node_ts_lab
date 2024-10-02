# How to Upgrade Node.js and npm Using nvm: A Step-by-Step Guide

Keeping your Node.js and npm versions up to date is crucial for ensuring access to the latest features, bug fixes, performance improvements, and security patches. One of the best tools for managing Node.js versions on your machine is **nvm** (Node Version Manager). With **nvm**, you can easily switch between different versions of Node.js, making it ideal for developers who work on multiple projects with varying version requirements.

This article provides a detailed guide on how to upgrade **Node.js** and **npm** using **nvm**. We’ll cover installation, version management, and upgrading to specific versions.

### Table of Contents:
1. [What is nvm?](#what-is-nvm)
2. [Why Use nvm to Manage Node.js Versions?](#why-use-nvm)
3. [Installing nvm](#installing-nvm)
4. [Upgrading Node.js with nvm](#upgrading-nodejs)
5. [Upgrading npm](#upgrading-npm)
6. [Setting a Default Node.js Version](#setting-default-node)
7. [Conclusion](#conclusion)

---

<a name="what-is-nvm"></a>
## What is nvm?

**nvm (Node Version Manager)** is a command-line utility that allows developers to install, manage, and switch between multiple versions of Node.js on a single machine. It’s particularly useful when working on multiple Node.js projects that require different versions of the runtime.

<a name="why-use-nvm"></a>
## Why Use nvm to Manage Node.js Versions?

- **Version Flexibility**: Easily switch between different versions of Node.js without affecting the global environment.
- **Per-Project Version Control**: Set specific Node.js versions for different projects, allowing you to work on legacy code and new code without conflict.
- **Simplicity**: `nvm` simplifies the process of upgrading Node.js and npm, ensuring that you have full control over the environment and versions.
- **Non-Destructive Upgrades**: Unlike global Node.js installations, nvm allows you to upgrade or downgrade Node.js versions without breaking existing applications.

<a name="installing-nvm"></a>
## Installing nvm

Before upgrading Node.js and npm, you’ll need to install `nvm` on your machine. Follow these steps for installation on Linux or macOS.

### Step 1: Install nvm

To install the latest version of nvm, use the following script provided by the nvm team:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

### Step 2: Add nvm to your shell

Once installed, add nvm to your shell configuration file to ensure it loads every time you open a terminal. Run the following commands depending on your shell:

- For **bash** users:
  ```bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```

- For **zsh** users:
  ```bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```

### Step 3: Verify the installation

After installation, verify that nvm is working by running:

```bash
nvm --version
```

You should see the version number of nvm.

<a name="upgrading-nodejs"></a>
## Upgrading Node.js with nvm

With **nvm** installed, upgrading or installing a specific version of Node.js becomes very easy.

### Step 1: Check Available Node.js Versions

To see the available versions of Node.js, you can use the following command:

```bash
nvm ls-remote
```

This will display a list of all Node.js versions available for installation.

### Step 2: Install the Desired Version

To install a specific version of Node.js (for example, version 22.9.0), run:

```bash
nvm install 22.9.0
```

This will download and install the requested version of Node.js. If you already have an older version of Node.js installed, nvm won’t override it but will install the new version alongside it.

### Step 3: Use the New Node.js Version

After installation, you can switch to the new version by running:

```bash
nvm use 22.9.0
```

To verify that the correct version of Node.js is active, use the following command:

```bash
node -v
```

This should display the newly installed version (`v22.9.0` in this case).

<a name="upgrading-npm"></a>
## Upgrading npm

When you install a new version of Node.js using nvm, it comes bundled with a default version of npm. However, you may want to upgrade npm to a specific version or the latest version. Here’s how to do it.

### Step 1: Check the Current npm Version

To check the current version of npm, run:

```bash
npm -v
```

### Step 2: Upgrade npm

To upgrade npm to the latest version, run:

```bash
npm install -g npm
```

If you want to install a specific version of npm, for example `10.8.3`, you can run:

```bash
npm install -g npm@10.8.3
```

After upgrading npm, verify the version with:

```bash
npm -v
```

<a name="setting-default-node"></a>
## Setting a Default Node.js Version

If you want to set a particular Node.js version as the default version used whenever you open a terminal session, you can use the following command:

```bash
nvm alias default 22.9.0
```

This command sets `v22.9.0` as the default version of Node.js. From now on, every time you start a new terminal, nvm will use this version automatically.

<a name="conclusion"></a>
## Conclusion

Upgrading Node.js and npm using **nvm** is a straightforward and powerful method, offering flexibility and ease of use. With **nvm**, you can switch between different Node.js versions effortlessly, making it ideal for developers who work on multiple projects with varying requirements.

### Key Takeaways:
- **nvm** simplifies managing multiple versions of Node.js.
- Upgrading to a new version of Node.js is as simple as running `nvm install <version>`.
- You can upgrade npm independently using `npm install -g npm@<version>`.
- Always set a default Node.js version for convenience.

By following these steps, you can ensure your development environment stays up to date, secure, and optimized for performance. Whether you're upgrading to a new version of Node.js or maintaining older projects, **nvm** provides the flexibility you need.

