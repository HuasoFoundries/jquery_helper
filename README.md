
## jQuery Helper

This helper bundles jQuery library plus all the jQuery and jQuery-UI plugins our app uses
 in a single monolithic file. 

### Installation

Install it as a drop-in replacement of jQuery like so:

```
jspm install jquery=github:huasofoundries/jquery_helper
```

Or (in case you're not into jspm) just copy `dist/jquery_helper.js` to your project.



### Testing

I haven't made proper unit tests (althought these would be more like integration tests, 
right?) but you can check your build is working as expected by running:

```
grunt connect:local
```

And then pointing your browser to http://localhost:8086/



### Credits

I'm afraid I had to add a couple of dependencies to version control, 
because the original packages relied in jQuery as a global object and
I didn't want to resort to that.

- [jquery-ui-rotatable](https://github.com/godswearhats/jquery-ui-rotatable)
- [jquery-hotkeys](https://github.com/tzuryby/jquery.hotkeys)

