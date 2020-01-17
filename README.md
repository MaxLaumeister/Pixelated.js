# Pixelated.js - an "image-rendering: pixelated" Polyfill

`Pixelated.js` is a polyfill that makes it easy to display clean, scaled-up pixel art in the browser.

It provides functionality similar to the `image-rendering: pixelated` CSS property, which is currently supported by webkit browsers (Chrome, Safari, Opera), but not by Edge or Firefox.

`Pixelated.js` is also a more consistent alternative to using `image-rendering: crisp-edges`, because it guarantees that images will be scaled using the nearest neighbor algorithm. [According to the spec, the scaling algorithm for `crisp-edges` is undefined](https://stackoverflow.com/a/20678910/2234742), so `Pixelated.js` makes sure your images look the same across all modern browsers.

## Live Demo

Click on the screenshot to see a [live demo](https://www.maxlaumeister.com/software/pixelated-js/).

<a href="https://www.maxlaumeister.com/software/pixelated-js/"><img alt="Pixelated.js Screenshot" src="/screenshot.png?raw=true" width="635" title="Click for Live Demo"></a>

## Scaling With Nearest-Neighbor

Start with one or more scaled-up `img` tags that you'd like to apply nearest-neighbor scaling to. Add the `pixelated` attribute:

```html
<img src="switch.png" style="width: 300px;" pixelated>
```

Then, include `pixelated.js` anywhere in your document:

```html
<script src="pixelated.min.js"></script>
```

That's it!

`Pixelated.js` adds the `image-rendering: pixelated` property if the browser supports it, and if not, `Pixelated.js` polyfills it by automatically replacing the `src` of your image with a dynamically-generated scaled-up image.

## Scaling With XBR

`Pixelated.js` optionally supports background-threaded [xbr](https://en.wikipedia.org/wiki/Pixel-art_scaling_algorithms#xBR_family) pixel art scaling using [XbrWasm](https://www.maxlaumeister.com/xbr-wasm/), a proprietary library. To get this working, [grab a copy of XbrWasm](https://www.maxlaumeister.com/xbr-wasm/license/) and extract it into the same folder as `Pixelated.js`. Then, load it before `Pixelated.js` like this:

```html
<script src="XbrWasm.js"></script>
<script src="pixelated.min.js"></script>
```

Then, on your images, specify the `xbr` algorithm like this:

```html
<img src="switch.png" style="width: 300px;" pixelated pixelated-algo="xbr">
```

## Features

* Designed for all modern browsers (but not IE). Tested in Chrome, Firefox, and Edge.
* Responds gracefully to resize/reflow events, like a real `img` tag
* Stays crisp on hidpi displays
* Exclusive browser activism feature - seeing blurry pixel art gently reminds IE users that they need to start using a browser that doesn't butcher JavaScript

## Limitations

* Due to the way `Pixelated.js` uses `canvas`, it only works with images loaded from the same origin. This means that it is unable to polyfill hotlinked images from other domains. As a side note, this also means that the included `demo.html` file will only run properly if loaded from a real web server, not if loaded directly from the filesystem.
