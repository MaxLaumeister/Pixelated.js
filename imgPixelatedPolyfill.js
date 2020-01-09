(function() {
    class PixelImg {
        constructor(img) {
            // TODO: hidpi displays
            // TODO: lint
            this.img = img;
        }

        init() {
            // Set up div wrapper
            this.div = document.createElement('div');
            this.div.style.display = 'inline-block';
            this.div.style.fontSize = '0';
            this.div.style.position = "relative";
            this.div.className = "img-pixelated-polyfill-wrap";
            wrap(this.img, this.div);

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

            // Draw

            this.updateCanvasSize();

            // Hide image, while still allowing it to be clicked on

            this.img.style.opacity = "0";

            // Listen for size changes

            new ResizeObserver(this.updateCanvasSize.bind(this)).observe(this.div);
        }

        updateCanvasSize() {
            const w = this.div.clientWidth;
            const h = this.div.clientHeight;
            if (!this.lastSize || this.lastSize.w !== w || this.lastSize.h !== h) {
                this.canvas.width = w;
                this.canvas.height = h;
                this.lastSize = { w, h }
            }
            this.draw();
        }

        draw() {
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

    PixelImg.pixelize = (elements) => {
        elements.forEach( img => {
            if (img instanceof HTMLImageElement) {
                img.style.imageRendering = "pixelated";
                if (!CSS.supports("image-rendering", "pixelated")) {
                    const pixelImg = new PixelImg(img);
                    if (img.complete) {
                        pixelImg.init();
                    } else {
                        img.onload = () => {
                            pixelImg.init();
                        };
                    }
                }
            }
        });
    };

    window.PixelImg = PixelImg;
})();
