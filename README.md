# Pixelated.js - an "image-rendering: pixelated" Polyfill

`Pixelated.js` is a polyfill that makes it easy to display clean, scaled-up pixel art in the browser.

It provides functionality similar to the `image-rendering: pixelated` CSS property, which is currently supported by webkit browsers (Chrome, Safari, Opera), but not by Edge or Firefox.

`Pixelated.js` is also a more consistent alternative to using `image-rendering: crisp-edges`, because it guarantees that images will be scaled using the nearest neighbor algorithm. [According to the spec, the scaling algorithm for `crisp-edges` is undefined](https://stackoverflow.com/a/20678910/2234742), so `Pixelated.js` makes sure your images look the same across all modern browsers.

## Usage

Get started with the following code at the end of your `body`:

    <script src="pixelated.min.js"></script>
    <script>
    const elements = document.querySelectorAll('img');
    PixelatedPolyfill.pixelate(elements);
    </script>

`Pixelated.js` wraps your `img` element in a `div` with class `pixelated-wrap`. By default, the div is `inline-block`, which gives it similar behavior to an `img` tag.

To make your images `display: block`, use the following style:

    .pixelated-polyfill {
        display: block;
    }

You can use this same `pixelated-polyfill` class to add borders, change opacity, etc.

## Example

(TODO: Screenshots and link to live demo here)

## Features

* Designed for all modern browsers (not IE). Tested in Chrome, Firefox, and Edge.
* Responds gracefully to resize/reflow events, like a real `img` tag
* Preserves the `img` tag's "right-click, view image" and "save as" functionality
* Stays crisp on hidpi displays
* Exclusive browser activism feature - seeing blurry pixel art gently reminds IE users that they need to start using a browser that doesn't butcher my code

## Under the Hood

To render an image, `Pixelated.js` wraps the `img` tag in a `div`, then renders the image to a `canvas` element on top of it. In browsers that support `image-rendering: pixelated` natively, this polyfill still wraps the image in a `div` to ensure consistent CSS behavior, however it lets the native `img` tag show instead of using canvas rendering.
