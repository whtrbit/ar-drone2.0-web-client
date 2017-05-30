# ar-drone2.0-web-client
Node Express/Socket.IO/ar-drone web application to interact with Ar-Drone 2.0

## Installation & Starting the app
Remember to install Node at least at version v6.10.3.
Then follow provided steps:

```bash
npm i
npm run build
npm run start
```

Go to [http://localhost:3000/public/index.html](http://localhost:3000/public/index.html)

## Controlling the drone with keyboard
Go front `arrow up`

Go back `arrow down`

Go left `arrow left`

Go right `arrow right`

Increase altitude `w`

Deacrease altitude `s`

Turn left `a`

Turn right `d`

Land `space`

Hover in position `ctrl`

Takeoff `enter`

## Development
You can easily download this reposiory to play around. Any pull request is welcome to.
In order to dev I recommend using:
`npm run dev` that runs nodemon process which automatically reloads the server on any Javascript change
`npm run watch` that runs Gulp process to build JS and LESS
