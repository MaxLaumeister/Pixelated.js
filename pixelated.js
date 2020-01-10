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
    class PixelatedPolyfill extends HTMLElement {
        constructor() {
            super();

            // Create img tag

            this.img = document.createElement("img");
            this.img.style.imageRendering = "pixelated";
            copyAttributes(this, this.img);
            if (this.style.width) {
                this.style.removeProperty("width");
            }
            if (this.style.height) {
                this.style.removeProperty("height");
            }
            this.img.src = this.getAttribute("src");
            this.img.onload = () => {
                this.init();
            };

            // Set up div wrappers

            this.attachShadow({ mode: 'open' });

            this.div = document.createElement('div');
            this.div.style.display = "inline-block";
            this.div.style.position = "relative";

            // Set up styles

            const styles = `
                :host {
                    display: inline-block;
                    font-size: 0;
                }
            `;
            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.textContent = styles;
            this.shadowRoot.appendChild(styleSheet);

            // Add to DOM

            this.div.appendChild(this.img);
            this.shadowRoot.appendChild(this.div);
        }

        init() {
            
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

    function copyAttributes(sourceEl, destEl) {
        for (let i = 0; i < sourceEl.attributes.length; i++) {
            const attribute = sourceEl.attributes[i];
            destEl.setAttribute(attribute.name, attribute.value);
        }
    }

    PixelatedPolyfill.pixelate = (elements) => {
        if (typeof elements[Symbol.iterator] !== 'function') {
            // If the user passed in a single element, convert it to an array to normalize the code
            elements = [elements];
        }
        
        if (!PixelatedPolyfill.initialized) {
            // Set up CSS - insert styles before all other styles in the page, so the user can override it

            PixelatedPolyfill.initialized = true;

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
    };

    customElements.define('img-pixelated', PixelatedPolyfill);
