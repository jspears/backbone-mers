define(['app/views/base', 'underscore', 'tpl!tpl/cartoon'], function (View, _, template) {
    function image($img, data, width, height) {
        $img.attr('width', width);
        $img.attr('height', height);
        $img.attr('src', data);
    }

    return View.extend({
        events: {
            'change input[type="file"]': 'onFileChange'
        },
        onFileChange: function (e) {
            var $img = this.$('.img1');
            var $img2 = this.$('.img2');
            var $img3 = this.$('.img3');
            var grey = this.grey;
            var invert = this.invert;
            var transform = this.transform;
            this.thumbnail(this.$(e.currentTarget), function (err, data, width, height) {
                image($img, data, width, height);
                image($img2, transform(data, [grey], width, height), width, height);
                image($img3, transform(data, [grey, invert], width, height), width, height);
            });
        },

        thumbnail: function thumbnail($el, callback) {
            var file = $el[0].files[0]
            var img = new Image();
            var reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result
            }
            reader.readAsDataURL(file);
            var maxHeight = this.maxHeight;
            var scale = _.partial(this.scaleY, maxHeight);
            $(img).on('load', function () {
                $el.replaceWith($el.clone(true));
                var canvas = $('<canvas></canvas>')[0];
                var width = scale(img);
                canvas.width = img.width;
                canvas.height = maxHeight;
                canvas.getContext("2d").drawImage(img, 0, 0, img.width, maxHeight);
                var url = canvas.toDataURL('image/png');
                callback(null, url, img.width, maxHeight);
            });
        },
        transform: function (src, transforms) {
            transforms = Array.isArray(transforms) ? transforms : [transforms];
            var canvas = document.createElement('canvas');
            //get its context
            var ctx = canvas.getContext('2d');
            //create empty image
            var imgObj = new Image();
            //start to load image from src url
            imgObj.src = src;
            //resize canvas up to size image size
            canvas.width = imgObj.width;
            canvas.height = imgObj.height;
            //draw image on canvas, full canvas API is described here http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
            ctx.drawImage(imgObj, 0, 0);
            //get array of image pixels
            var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            //run through all the pixels
            _.each(transforms, function(f){
                f(imgPixels.data, canvas.width, canvas.height);
            });
            //draw pixels according to computed colors
            ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
            return canvas.toDataURL();
        },
        invert: function (data) {

            for (var i = 0; i < data.length; i += 4) {
                // red
                data[i] = 255 - data[i];
                // green
                data[i + 1] = 255 - data[i + 1];
                // blue
                data[i + 2] = 255 - data[i + 2];
            }
        },
        grey: function (data, width, height) { //Creates a canvas element with a grayscale version of the color image
            //run through all the pixels
            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    //here is x and y are multiplied by 4 because every pixel is four bytes: red, green, blue, alpha
                    var i = (y * 4) * width + x * 4; //Why is this multiplied by 4?
                    //compute average value for colors, this will convert it to bw
                    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    //set values to array
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
            }
        },
        maxHeight: 100,
        scaleY: function (maxHeight, img) {
            var oheight = img.height;
            var owidth = img.width;
            var ratio = maxHeight / oheight;
            img.height = ratio * img.height;
            img.width = ratio * img.width;
            return img;
        },
        template: template
    })


})
;