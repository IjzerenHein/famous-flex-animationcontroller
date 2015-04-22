/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */

/**
 * ViewContainer.
 *
 * @module
 */
define(function(require, exports, module) {

    // import dependencies
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var LayoutController = require('famous-flex/LayoutController');
    var BkImageSurface = require('famous-bkimagesurface/BkImageSurface');
    var isMobile = require('ismobilejs');

    /**
     * @class
     * @param {Object} options Configurable options.
     * @param {Object} options.factory Factory delegate for creating new renderables.
     * @alias module:PhoneFrameView
     */
    function PhoneFrameView(options) {
        View.apply(this, arguments);

        _createRenderables.call(this);
        _createLayout.call(this);
    }
    PhoneFrameView.prototype = Object.create(View.prototype);
    PhoneFrameView.prototype.constructor = PhoneFrameView;

    PhoneFrameView.DEFAULT_OPTIONS = {
        classes: ['frame'],
        imageSize: [400, 700],
        innerMargins: [100, 60, 100, 60]
    };

    function _createRenderables() {
        this._renderables = {
            image: new BkImageSurface({
                classes: this.options.classes.concat(['image']),
                content: require('./images/iphone.png'),
                sizeMode: 'cover'
            }),
            left: new Surface({
                classes: this.options.classes.concat(['background'])
            }),
            right: new Surface({
                classes: this.options.classes.concat(['background'])
            }),
            bottom: new Surface({
                classes: this.options.classes.concat(['background'])
            }),
            top: new Surface({
                classes: this.options.classes.concat(['background'])
            }),
            inner: new Surface({
                classes: this.options.classes.concat(['background', 'inner'])
            }),
            transparentTop: new Surface({
                classes: this.options.classes
            })
        };
    }

    function _createLayout() {
        this.layout = new LayoutController({
            autoPipeEvents: true,
            layout: function(context, options) {
                if (isMobile.phone || (context.size[0] < this.options.imageSize[0]) || (context.size[1] < this.options.imageSize[1])) {
                    context.set('content', {
                        size: context.size,
                        translate: [0, 0, 1]
                    });
                    context.set('inner', {
                        size: context.size,
                        translate: [0, 0, 0]
                    });
                    context.set('transparentTop', {
                        size: context.size,
                        translate: [0, 0, 100]
                    });
                }
                else {
                    var image = context.set('image', {
                        size: this.options.imageSize,
                        translate: [(context.size[0] - this.options.imageSize[0]) / 2, (context.size[1] - this.options.imageSize[1]) / 2, 100]
                    });
                    context.set('left', {
                        size: [image.translate[0] + this.options.innerMargins[3], context.size[1]],
                        translate: [0, 0, 99]
                    });
                    context.set('right', {
                        size: [context.size[0] - image.translate[0] - image.size[0] + this.options.innerMargins[1], context.size[1]],
                        translate: [image.translate[0] + image.size[0] - this.options.innerMargins[1], 0, 99]
                    });
                    context.set('top', {
                        size: [context.size[0], image.translate[1] + this.options.innerMargins[0]],
                        translate: [0, 0, 99]
                    });
                    context.set('bottom', {
                        size: [context.size[0], context.size[1] - image.translate[1] - image.size[1] + this.options.innerMargins[2]],
                        translate: [0, image.translate[1] + image.size[1] - this.options.innerMargins[2], 99]
                    });
                    var content = context.set('content', {
                        size: [
                            this.options.imageSize[0] - this.options.innerMargins[1] - this.options.innerMargins[3],
                            this.options.imageSize[1] - this.options.innerMargins[0] - this.options.innerMargins[2]
                        ],
                        translate: [
                            image.translate[0] + this.options.innerMargins[3],
                            image.translate[1] + this.options.innerMargins[0],
                            1
                        ]
                    });
                    context.set('inner', {
                        size: content.size,
                        translate: [content.translate[0], content.translate[1], 0]
                    });
                }
            }.bind(this),
            dataSource: this._renderables
        });
        this.add(this.layout);
        this.layout.pipe(this._eventOutput);
    }

    PhoneFrameView.prototype.setContent = function(content) {
        this.layout.insert('content', content);
    };

    module.exports = PhoneFrameView;
});
