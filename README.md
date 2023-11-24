<br/>
<p align="center">
  <a href="https://github.com/elliepriestley/Chaptrs_Mobile_App">
    <img src="./chaptrs.jpg" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Chaptrs Mobile</h3>

  <p align="center">
    Welcome to Chaptrs, an app for bookworms! Plan and track your bookclubs with fellow book lovers right here.
    <br/>
    <br/>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/elliepriestley/Chaptrs_Mobile_App?color=dark-green) ![Forks](https://img.shields.io/github/forks/elliepriestley/Chaptrs_Mobile_App?style=social) ![Stargazers](https://img.shields.io/github/stars/elliepriestley/Chaptrs_Mobile_App?style=social) ![Issues](https://img.shields.io/github/issues/elliepriestley/Chaptrs_Mobile_App) 

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Authors](#authors)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
  - [Creating A Pull Request](#creating-a-pull-request)
- [License](#license)

## About The Project

Welcome to Chaptrs, an app for bookworms! Plan and track your bookclubs with fellow book lovers right here. Discover Brontë with buddies, find new friends with Fitzgerald, and review your favourites with Rowling. Read on to explore your very first Chaptr!

## Authors

* **[Ellie Priestley](https://github.com/elliepriestley)**
* **[Rikie Patrick](https://github.com/1sAndZeros)**
* **[Alina Ermakova](https://github.com/alalinaermakova)**
* **[Ami Day](https://github.com/ami-day)**
* **[Cloud Spotter](https://github.com/cloud-spotter)**
* **[Emily Cowan](https://github.com/Emily-RC)**
* **[Roberto Quadraccia](https://github.com/super-robbin)**

## Built With

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Node](https://nodejs.org/)

## Getting Started

To get the app running on an android device / iOS device via Expo Go, Android phone emulator via Android Studio or iOS emulator via XCode, follow these simple example steps.

### Prerequisites

* npm

```sh
npm install npm@latest -g
```

Expo, Android Studio and Xcode are the three ways you can run the application. You do not need all three.

* Expo
```
Signup to expo
Download Expo Go on your Android Device or iOS Device
```

* Android Studio
```
Download Android Studio along with the Android phone emulator
Launch the device emulator to preview the application via Expo
```

* XCode
```
Download XCode and launch the iOS phone simulator
```

* MongoDB
```
brew tap mongodb/brew
brew install mongodb-community@6.0
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/elliepriestley/Chaptrs_Mobile_App.git
```

2. Install NPM packages

```sh
cd Chaptrs_Mobile_App
cd api
npm install
cd ../frontend
npm install
```

3. Create a .env file in the root of the api folder with the following

```
JWT_SECRET = <YOUR-SECRET-HERE>
```

4. Start MongoDB

```sh
brew services start mongodb-community@6.0
```

5. Start API Server

```sh
cd api
npm run dev
```

6. Start React Native App using Expo

```sh
cd frontend
npm start
```

This should give you a QR Code which you can scan using your camera app on iOS (Expo Go must be installed), or scan using the Expo Go app on your android device

To run on the Android Studio emulator, press `a` in the terminal while the simulator is running

To run on the XCode emulator, press `i` in the terminal while the simulator is running

7. Create a .env file in the root of the frontend folder with the following

```
EXPO_PUBLIC_API_URL=http://192.168.1.???:8080
```
Replace the ??? part with the appropriate digits from the IP address particular to your device, where you run the frontend. You can find this IP address after running npm start in the frontend folder (just under the QR code in a line starting “Metro waiting on …”). Leave the port the same as above (8080). 

Restart the backend and the frontend. This step is needed to signup/login. 

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/elliepriestley/Chaptrs_Mobile_App/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/elliepriestley/Chaptrs_Mobile_App/blob/main/LICENSE.md) for more information.
