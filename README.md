<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">MongoDB Ephemeral Server</h3>

  <p align="center">
    MongoDB Ephemeral Server to test your NodeJS Application.
    <br />
    <a href="https://github.com/adarrshpaul/mongodb-ephemeral-server"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    ·
    <a href="https://github.com/adarrshpaul/mongodb-ephemeral-server/issues">Report Bug</a>
    ·
    <a href="https://github.com/adarrshpaul/mongodb-ephemeral-server/issues">Request Feature</a>
    ·
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

This project will spin up an mongodb server specified the configuration for the same. This package uses the ephemeral storage for the database content. This means once the database instance is stopped, all data will be lost.

This makes it ideal for testing purpose or even development(if you wish).

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

The project is built using a combination of JavaScript and TypeScript.

* [TypeScript](https://www.typescriptlang.org/)
* [JavaScript](https://www.javascript.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To install the package simply run the following simple steps

### Prerequisites

To run this, please make sure you have to following things installed.

* NodeJs - version 12.x+
* MongoDB - version 4.2+

### Installation

* npm
  ```sh
  npm i mongodb-ephemeral-server
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Example code to show the usage of the package: 

1. Import the package in your code:
    ```javascript
    const mongodbEphemeralServer = require("mongodb-ephemeral-server")
    ```

2. Provide the database configurations:
    ```javascript
    const PORT = 27025; // Or anything you wish.
    const dbPath = '/home/user/mongodb-ephemeral/data'; // Path to your database
    const logPath = '/home/user/mongodb-ephemeral/log'; // Path to your database logs
    const dbName = 'sample_db_name';
    /**
     * In case you want to run test on windows - add the mongodExeLocation
     * Note adding this on linux won't have any effect
     * So, if you have written test on window machine
     * You need not to worry when running on a linux machine
     */
    const mongodExeLocation = 'C:/Program Files/MongoDB/Server/4.2/bin'
    ```
3. Create the ephemeral instance:
    ```javascript
    const ephemeralInstance = new mongodbEphemeralServer(port, logpath, dbpath, mongodExeLocation);
    ```
4. Start the mongodb-ephemeral-server:
    ```javascript
    ephemeralInstance.start();
    const dbUri = ephemeralInstance.getDbUri(dbName);
    ```
5. Connect to the database:
    ```javascript
    // Connect to the Database using the uri obtained.
    // If using the mongoose ODM use the below code:
    const { mongoose } = require('mongoose');
    await mongoose.connect(dbUri, {});
    ```
6. Close the database connection: (Optional)
    ```javascript
    // If using the mongoose ODM
    await mongoose.connection.close();
    ```
7. Terminate the mongodb-ephemeral-server:
    ```javascript
    ephemeralInstance.stop();
    ```

_For more examples, please refer to the [sample project](https://github.com/adarrshpaul/mongodb-ephemeral-server)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Adarrsh Paul - [@AdarrshPaul](https://twitter.com/adarrsh_dev)

Project Link: [https://github.com/adarrshpaul/mongodb-ephemeral-server](https://github.com/adarrshpaul/mongodb-ephemeral-server)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/adarrshpaul/mongodb-ephemeral-server?style=for-the-badge

[contributors-url]: https://github.com/adarrshpaul/mongodb-ephemeral-server/graphs/contributors

[stars-shield]: https://img.shields.io/github/stars/adarrshpaul/mongodb-ephemeral-server?style=for-the-badge

[stars-url]: https://github.com/adarrshpaul/mongodb-ephemeral-server/stargazers

[issues-shield]: https://img.shields.io/github/issues/adarrshpaul/mongodb-ephemeral-server?style=for-the-badge

[issues-url]: https://github.com/adarrshpaul/mongodb-ephemeral-server/issues

[license-shield]: https://img.shields.io/github/license/adarrshpaul/mongodb-ephemeral-server?style=for-the-badge

[license-url]: https://github.com/adarrshpaul/mongodb-ephemeral-server/blob/master/LICENSE
