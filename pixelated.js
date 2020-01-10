/**
 *  Pixelated.js
 * 
 *  A polyfill for `image-rendering: pixelated`.
 * 
 *  @author Maximillian Laumeister
 *  @link https://github.com/MaxLaumeister/pixelated-polyfill
 *  @license http://opensource.org/licenses/MIT MIT License
 *  @copyright 2020 Maximillian Laumeister
 */
(function() {
    class PixelatedPolyfill {
        constructor(img) {
            // TODO: lint
            this.img = img;
        }

        init() {
            // Set up div wrappers

            const outerDiv = document.createElement('div');
            outerDiv.className = "pixelated-polyfill";

            this.div = document.createElement('div');
            this.div.className = "pixelated-polyfill-inner";

            // Add to DOM

            wrap(this.img, this.div);
            wrap(this.div, outerDiv);
            
            // Polyfill time

            if (!CSS.supports("image-rendering", "pixelated")) {
                // Set up canvas
                this.canvas = document.createElement('canvas');
                this.canvas.style.display = "block";
                this.canvas.style.width = "100%";
                this.canvas.style.height = "100%";
                this.canvas.style.position = "absolute";
                this.canvas.style.top = "0";
                this.canvas.style.left = "0";
                this.canvas.style.pointerEvents = "none";

                this.ctx = this.canvas.getContext("2d");

                this.div.appendChild(this.canvas);

                // Size the canvas and draw

                this.updateCanvas();

                // Hide image, while still allowing it to be clicked on

                this.img.style.opacity = "0";

                // Listen for size changes

                new ResizeObserver(this.updateCanvas.bind(this)).observe(this.div);
            }
        }

        updateCanvas() {
            // Update canvas size
            const dpr = window.devicePixelRatio || 1;
            const w = this.div.clientWidth * dpr;
            const h = this.div.clientHeight * dpr;
            if (!this.lastSize || this.lastSize.w !== w || this.lastSize.h !== h) {
                this.canvas.width = w;
                this.canvas.height = h;
                this.lastSize = { w, h };
            }
            // Redraw
            this.ctx.save();
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }

    function wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

    PixelatedPolyfill.initialized = false;

    PixelatedPolyfill.pixelate = (elements) => {
        if (typeof elements[Symbol.iterator] !== 'function') {
            // If the user passed in a single element, convert it to an array to normalize the code
            elements = [elements];
        }
        
        if (!PixelatedPolyfill.initialized) {
            // Set up CSS - insert styles before all other styles in the page, so the user can override it

            PixelatedPolyfill.initialized = true;

            const styles = `
                .pixelated-polyfill {
                    display: inline-block;
                    font-size: 0;
                }
                .pixelated-polyfill-inner {
                    display: inline-block;
                    position: relative;
                }
            `;

            const firstStyleTag = document.querySelector("style, link[type='text/css']");

            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.textContent = styles;
            if (firstStyleTag) {
                firstStyleTag.parentNode.insertBefore(styleSheet, firstStyleTag);
            } else {
                document.head.appendChild(styleSheet);
            }
        }

        // Set up elements
        elements.forEach( img => {
            if (img instanceof HTMLImageElement) {
                img.style.imageRendering = "pixelated";
                const pixelImg = new PixelatedPolyfill(img);
                if (img.complete) {
                    pixelImg.init();
                } else {
                    img.onload = () => {
                        pixelImg.init();
                    };
                }
            }
        });
    };

    window.PixelatedPolyfill = PixelatedPolyfill;
})();
