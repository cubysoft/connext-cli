connext-cli
===========

**connext-cli** is a command-line tool designed to quickly scaffold web development projects using pre-configured templates for HTML, JavaScript, and TypeScript.

Installation
------------

To install `connext-cli` globally on your system using npm, run the following command:

    npm install -g connext-cli

Usage
-----

After installation, you can start using the `connext-cli` tool to initialize new projects. Here’s an example:

    connext create

Follow the interactive prompts to set up your project. You'll be asked to select a template (HTML, JavaScript, or TypeScript), and the tool will scaffold a new project accordingly.

### Options

*   `connext create`: Initializes a new project with your choice of template.
*   `connext --help`: Shows the help menu with available commands and options.

Features
--------

*   Project scaffolding with pre-configured templates (HTML, JS, TS).
*   Automatically installs project dependencies.
*   Easy-to-use interactive prompts.

Examples
--------

### Create a New HTML Project

To create a new project using the HTML template, run:

    connext create

Select "HTML" from the template options when prompted.

### Create a New JavaScript Project

To create a new JavaScript project, run:

    connext create

Select "JavaScript" from the template options when prompted.

Requirements
------------

The following tools are required to use `connext-cli`:

*   Node.js v14 or later
*   NPM or Yarn

Contributing
------------

We welcome contributions! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push the branch (`git push origin feature/your-feature`).
5.  Open a pull request.

License
-------

connext-cli is licensed under the ISC license. See the [LICENSE](LICENSE) file for details.

Support
-------

If you encounter any issues or have questions, please open an issue on our [GitHub Issues page](https://github.com/cubysoft/connext-cli/issues).