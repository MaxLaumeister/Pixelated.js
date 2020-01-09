# "image-rendering: pixelated" CSS Polyfill

This is a polyfill for the `image-rendering: pixelated` CSS property, which is currently supported by webkit browsers (Chrome, Safari, Opera), but not by Edge or Firefox.

This polyfill makes it easier to display `img` tags that contain pixel art, without having to scale them beforehand.

This polyfill is also a more consistent alternative to using `image-rendering: crisp-edges`, because it guarantees that images will always be scaled using the nearest neighbor algorithm (and, it also works in Edge).

## Usage

(TODO)

## Example

(TODO: Screenshots here)

## Features

* Responds dynamically to resize events
* Preserves "right-click, save as" functionality
* Works on existing `img` elements, no need to change your HTML

## Under the Hood

To render an image, this polyfill wraps the `img` tag in a `div`, then renders the image to a `canvas` element on top of it.
