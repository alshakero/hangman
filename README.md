# Hangman for 
[![N|Solid](https://www.omaralshaker.com/git/netguru/logo.jpg)](https://www.netguru.co/)

### Introducion
This is a ReactJS app for Netguru. Here I'll list the libs I've used and why.

  - [ReactJS], for re-usabily and my own comfort writing the app.
  - [Chai], [chai-enzyme] for testing. 
  - Web Audio API for sound effects.

### Features
- Fully responsive. 
- Works in all major browsers. Retina fellas are covered.
- Lightweight. The whole app with its assets is **~95KB**. 
- Own keyboard. For a better mobile/touch-device expeirence, I added a keyboard to the game, resize the window and it will pop.


### Sneak Peeks *(Chrome developer tools shots)*
### Mobile
![N|Solid](https://www.omaralshaker.com/git/netguru/shots/intro/ios.jpg)
![N|Solid](https://www.omaralshaker.com/git/netguru/shots/in/ios.jpg)

### Laptop
![N|Solid](https://www.omaralshaker.com/git/netguru/shots/intro/laptop.jpg)
![N|Solid](https://www.omaralshaker.com/git/netguru/shots/in/laptop.jpg)

### Retina
![N|Solid](https://www.omaralshaker.com/git/netguru/shots/intro/retina.jpg)
![N|Solid](https://www.omaralshaker.com/git/netguru/shots/in/retina.jpg)

### How many images were used
None, I didn't use any raster images. Only purely CSSed DIVs with a tiny vector (430bytes) for the sweat on the folk's forehead.
 
### Playing the game
You can play it [here], on GitHub pages. 

### Running the app locally
After cloning the repository  

```sh
$ cd NG-quiz
$ npm install
$ npm run start
```
the go to `http://localhost:3000`

### Testing 
```sh
$ cd NG-quiz
$ npm run test
```

### Production Build 
```sh
$ cd NG-quiz
$ npm run build
#outputs in ./build
```

### Notes
##### I've been asked: 

> Use real API for fetching a random word. Wordnik could be great for that

Well, for some uknown reason Wordkit won't send me my API Key. I tried another API and they didn't support HTTPS, GitHub pages (where the app lives) is strictly HTTPS, so mixed-content error rose. In the end I made a [little API] to generate a random word and used it.

##### Can it be made better?
Yes. The virtual keyboard needs more logic. It's now drawn depending solely on screen size. A big screen without a physical keyboard won't enjoy it. It's very simple to acheive.


**Looking forward for your advice!**

[ReactJS]: <https://github.com/reactjs>
[chai]: <http://chaijs.com/>
[chai-enzyme]: <https://github.com/producthunt/chai-enzyme>
[here]: <https://alshakero.github.io/NG-quiz/>
[little API]: <http://omaralshaker.com/word.php>