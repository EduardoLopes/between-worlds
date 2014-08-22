# My Ludum Dare 30 Boilerplate

Need to install [gulp](http://gulpjs.com/) globally:

`npm install --global gulp`

After install gulp, install all dev dependencies:

`npm install`

Gulp Tasks
----------

'gulp' run the default task that generate the `dist` folder with all images (.png or .jpg) and all css and js concatenated and minified.

`gulp watch` run a live reload server

Notes:
------

`namespace.js` is used to place some constants and helpers functions. The `Game` namespace is Global.

`game.js` have the LD namespace, that it's private for that file. So you can define `LD.score = 1574`, and anyone will change this value using the broswer console.

I made this really quickly, i don't know if the code in the `map.js` to help detect collision really works. ¯\_(ツ)_/¯