# Comprehensive Guide to Managing Node.js Versions with NVM

When developing multiple Node.js applications on a single machine, it is common to encounter the need for different versions of Node.js across various projects. For example, one project may depend on Node.js 14.x, while another might require Node.js 18.x or the latest LTS version. To efficiently manage multiple versions of Node.js, **NVM (Node Version Manager)** is an indispensable tool that allows developers to install, switch between, and manage Node.js versions with ease.

This article will walk you through the process of using NVM to manage Node.js versions, offering examples and explanations of key commands that can help streamline your development workflow.

## What is NVM?

**NVM (Node Version Manager)** is a tool that enables you to manage multiple Node.js versions on the same machine. By using NVM, you can easily install, switch between, and set default versions of Node.js for different terminal sessions or specific projects. This ensures that each project runs the version of Node.js it requires without causing conflicts with other projects.

### Key Benefits of NVM:
- **Version isolation**: Each project can run a different version of Node.js.
- **Ease of switching**: Seamlessly switch between different versions of Node.js in your terminal.
- **Automatic version selection**: Configure projects to automatically use the correct Node.js version by setting a `.nvmrc` file.

## Step-by-Step Guide to Managing Node.js Versions with NVM

### 1. Installing NVM

To begin using NVM, you first need to install it on your machine.

1. Open your terminal.
2. Install NVM by running the following command:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   ```

3. Load NVM into your shell environment by adding the following line to your shell configuration file (e.g., `.bashrc`, `.zshrc`, or `.profile`):
   ```bash
   source ~/.nvm/nvm.sh
   ```

4. Apply the changes by running:
   ```bash
   source ~/.nvm/nvm.sh
   ```

### 2. Installing Specific Versions of Node.js

Once NVM is installed, you can use it to install multiple versions of Node.js. For instance, if your projects require Node.js versions 14.x, 18.x, and 20.x, you can install them using the following commands:

```bash
nvm install 14.17.0  # Install Node.js 14.17.0
nvm install 18.16.0  # Install Node.js 18.16.0
nvm install 20.3.0   # Install Node.js 20.3.0
```

### 3. Listing Installed Node.js Versions

You can view all the Node.js versions installed on your machine using the `nvm ls` command:

```bash
nvm ls
```

#### Example Output:
```
->      v18.16.0
        v14.17.0
        v20.3.0
default -> v18.16.0
node -> stable (-> v18.16.0) (default)
```

The `->` symbol indicates the currently active version, and `default` shows the version that NVM will use by default for new terminal sessions.

### 4. Listing All Available Node.js Versions

NVM can list all versions of Node.js available for installation. You can see the full list of available versions by running:

```bash
nvm ls-remote
```

This command will show every version of Node.js that you can install through NVM.

### 5. Switching Between Node.js Versions

To switch to a specific version of Node.js, use the `nvm use` command. For example, if you want to run your project using Node.js 14.x or 18.x, you can switch versions as follows:

```bash
nvm use 14.17.0  # Switch to Node.js 14.17.0
nvm use 18.16.0  # Switch to Node.js 18.16.0
```

### 6. Setting a Default Node.js Version

You can configure a default Node.js version that NVM will use for every new terminal session. This is useful if you frequently use a specific version for most projects.

```bash
nvm alias default 18.16.0
```

This command sets Node.js 18.16.0 as the default version whenever you open a new terminal window.

### 7. Running a Node.js Script with a Specific Version

NVM allows you to run a Node.js script using a specific version without globally switching the Node.js version in your terminal. This is useful for testing a script under different versions.

```bash
nvm run 14.17.0 app.js  # Run app.js with Node.js version 14.17.0
```

### 8. Uninstalling a Node.js Version

If you no longer need a particular version of Node.js, you can remove it using the `nvm uninstall` command:

```bash
nvm uninstall 12.22.9  # Uninstall Node.js version 12.22.9
```

### 9. Using the System-Installed Node.js Version

If your machine has a system-installed version of Node.js (outside of NVM), you can temporarily switch to that version by running:

```bash
nvm use system
```

This is useful when you want to use the system-wide version of Node.js for specific tasks.

### 10. Checking the Active Node.js Version

To confirm which version of Node.js is currently active in your terminal session, use the following command:

```bash
node -v
```

This will display the version of Node.js that is currently in use.

### 11. Automatically Selecting a Version Using `.nvmrc`

NVM allows you to automatically switch Node.js versions when you navigate into a project directory by using a `.nvmrc` file. This file specifies the version of Node.js that should be used for that project.

#### Example of Creating a `.nvmrc` File:

For a project that requires Node.js 18.x, navigate to the project root and create a `.nvmrc` file:

```bash
echo "18.16.0" > .nvmrc
```

Now, whenever you navigate into this directory, you can run the following command to switch to the appropriate Node.js version:

```bash
nvm use
```

This will automatically set Node.js 18.16.0 for the project, based on the `.nvmrc` file.

### 12. Reinstalling Global Node.js Packages Across Versions

When switching Node.js versions, you may need to reinstall global packages. NVM provides a convenient way to do this by copying global packages from one version to another:

```bash
nvm reinstall-packages 14.17.0
```

This command reinstalls all globally installed packages from Node.js 14.17.0 to the current active version.

### 13. Using the Latest LTS Version

NVM makes it easy to install and use the latest Long-Term Support (LTS) version of Node.js.

#### Installing the Latest LTS Version:
```bash
nvm install --lts
```

#### Switching to the Latest LTS Version:
```bash
nvm use --lts
```

#### Setting the Latest LTS Version as the Default:
```bash
nvm alias default lts/*
```

This ensures that your terminal always uses the latest LTS version by default.

## Conclusion

NVM is an essential tool for any developer working with multiple Node.js projects or versions. It allows you to install, manage, and switch between different versions of Node.js efficiently, ensuring that your projects always use the appropriate version.

By mastering NVM commands, such as `nvm install`, `nvm use`, `nvm alias`, and using `.nvmrc` files, you can maintain a flexible and conflict-free development environment. This ensures that each project is built and run with the exact version of Node.js it requires, without any manual intervention or version conflicts.

