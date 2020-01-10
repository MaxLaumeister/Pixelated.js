# Pixelated.js - an "image-rendering: pixelated" Polyfill

`Pixelated.js` is a polyfill that makes it easy to display clean, scaled-up pixel art in the browser.

It provides functionality similar to the `image-rendering: pixelated` CSS property, which is currently supported by webkit browsers (Chrome, Safari, Opera), but not by Edge or Firefox.

`Pixelated.js` is also a more consistent alternative to using `image-rendering: crisp-edges`, because it guarantees that images will be scaled using the nearest neighbor algorithm. [According to the spec, the scaling algorithm for `crisp-edges` is undefined](https://stackoverflow.com/a/20678910/2234742), so `Pixelated.js` makes sure your images look the same across all modern browsers.

## Live Demo

Click on the screenshot to see a [live demo](https://www.maxlaumeister.com/pixelated-js/).

<a href="https://www.maxlaumeister.com/pixelated-js/"><img alt="Pixelated.js Screenshot" src="/screenshot.png?raw=true" width="635" height="175" title="Click for Live Demo"></a>

## Usage

Start with one or more scaled-up `img` tags that you'd like to apply nearest-neighbor scaling to:

```html
<img src="switch.png" style="width: 300px;">
```

Then, add the following code to the end of your `body`:

```html
<script src="pixelated.min.js"></script>
<script>
    const elements = document.querySelectorAll('img');
    PixelatedPolyfill.pixelate(elements);
</script>
```

That's it!

`Pixelated.js` works by wrapping each of your `img` elements in a `div` with class `pixelated-wrap`. By default, the div is `inline-block`, which gives the wrapper similar behavior to a default-styled `img` tag.

For custom styling (for example to center your images), style the `.pixelated-polyfill` wrapper in your CSS:

```css
.pixelated-polyfill {
    display: block;
    text-align: center;
}
```

## Features

* Designed for all modern browsers (but not IE). Tested in Chrome, Firefox, and Edge.
* Responds gracefully to resize/reflow events, like a real `img` tag
* Preserves the `img` tag's "right-click, view image" and "save as" functionality
* Stays crisp on hidpi displays
* Exclusive browser activism feature - seeing blurry pixel art gently reminds IE users that they need to start using a browser that doesn't butcher my code

## Under the Hood

Here's how `Pixelated.js` works under the hood.

To render an image in a browser that does not support `image-rendering: pixelated`, `Pixelated.js` renders the image to a `canvas` element of the same size, then hides the original image. In browsers that support `image-rendering: pixelated` natively, this polyfill adds that property to the `img` tag so that the browser scales natively.

In either case, the `img` is wrapped in a `div` to ensure consistent CSS behavior.
