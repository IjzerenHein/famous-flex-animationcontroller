/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */

/*global define, console*/
/*eslint no-use-before-define:0, no-console:0 */

/**
 * ViewContainer.
 *
 * @module
 */
define(function(require, exports, module) {

    // import dependencies
    var View = require('famous/core/View');
    var LayoutController = require('famous-flex/LayoutController');
    var Easing = require('famous/transitions/Easing');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var RenderNode = require('famous/core/RenderNode');
    var OptionsManager = require('famous/core/OptionsManager');

    /**
     * @class
     * @param {Object} options Configurable options.
     * @param {Object} options.factory Factory delegate for creating new renderables.
     * @alias module:ViewContainer
     */
    function ViewContainer(options) {
        View.apply(this, arguments);

        _createLayout.call(this);
    }
    ViewContainer.prototype = Object.create(View.prototype);
    ViewContainer.prototype.constructor = ViewContainer;

    ViewContainer.DEFAULT_OPTIONS = {
        zIndexOffset: 0.1,
        transition: {
            duration: 700,
            curve: Easing.outBack
        },
        origin: [0.5, 0.5],
        animations: {
            slide: {
                enabled: false,
                direction: 'top'
            },
            fade: {
                enabled: false,
                opacity: 0
            },
            flip: {
                enabled: false,
                direction: 'top'
            },
            zoom: {
                enabled: false,
                scale: [0.5, 0.5]
            }
        }
    };

    /**
     * Out of the box supported animations.
     */
    ViewContainer.animations = {
        slide: function(show, options, size) {
            switch (options.direction) {
            case 'left':
                return {transform: Transform.translate(show ? size[0] : -size[0], 0, 0)};
            case 'right':
                return {transform: Transform.translate(show ? -size[0] : size[0], 0, 0)};
            case 'top':
                return {transform: Transform.translate(0, show ? size[1] : -size[1], 0)};
            case 'bottom':
                return {transform: Transform.translate(0, show ? -size[1] : size[1], 0)};
            }
        },
        fade: function(show, options, size) {
            return {opacity: options.opacity};
        },
        zoom: function(show, options, size) {
            return {transform: Transform.scale(options.scale[0], options.scale[1], 1)};
        },
        flip: function(show, options, size) {
            switch (options.direction) {
            case 'left':
                return {transform: Transform.rotate(0, show ? Math.PI : -Math.PI, 0)};
            case 'right':
                return {transform: Transform.rotate(0, show ? -Math.PI : Math.PI, 0)};
            case 'top':
                return {transform: Transform.rotate(show ? Math.PI : -Math.PI, 0, 0)};
            case 'bottom':
                return {transform: Transform.rotate(show ? -Math.PI : Math.PI, 0, 0)};
            }
        }
    };

    /**
     * Stacks the renderables on top of each other
     * with a z-translation of this.options.zIndexOffset.
     */
    function ViewStackLayout(context, options) {
        var set = {
            size: context.size,
            translate: [0, 0, 0]
        };
        var node = context.next();
        while (node) {
            context.set(node, set);
            set.translate[2] += options.zIndexOffset;
            node = context.next();
        }
    }

    /**
     * Creates the view-stack layout.
     */
    function _createLayout() {
        this._renderables = [];
        this._viewStack = [];
        this.layout = new LayoutController({
            layout: ViewStackLayout,
            layoutOptions: this.options,
            dataSource: this._renderables
        });
        this.add(this.layout);
        this.layout.on('layoutend', _startAnimations.bind(this));
    }

    /**
     * Starts a show or hide animation.
     */
    function _startAnimations(event) {
        for (var i = 0; i < this._viewStack.length; i++) {
            var item = this._viewStack[i];
            if (item.show || item.hide) {
                _startAnimation.call(this, item, event.size);
            }
        }
    }

    function _startAnimation(item, size) {
        var transform = Transform.identity;
        var opacity = 1;
        for (var key in item.options.animations) {
            if ((item.options.animations[key].enabled) || (item.options.animations[key].enabled === undefined)) {
                var result = ViewContainer.animations[key](item.show, item.options.animations[key], size);
                if (result && result.transform) {
                    transform = Transform.multiply(transform, result.transform);
                }
                if (result && (result.opacity !== undefined)) {
                    opacity *= result.opacity;
                }
            }
        }

        item.mod.halt();
        if (item.show) {
            item.show = false;
            item.mod.setTransform(transform);
            item.mod.setOpacity(opacity);
            item.mod.setTransform(Transform.identity, item.options.transition, item.callback);
            item.mod.setOpacity(1, item.options.transition);
        }
        else if (item.hide) {
            item.hide = false;
            item.mod.setTransform(transform, item.options.transition, item.callback);
            item.mod.setOpacity(opacity, item.options.transition);
        }
    }

    /**
     * Creates a view-item.
     */
    function _createItem(view, options, callback) {
        var itemOptions = this.constructor.DEFAULT_OPTIONS;
        if (options) {
            itemOptions = Object.create(this.constructor.DEFAULT_OPTIONS);
            var optionsManager = new OptionsManager(itemOptions);
            optionsManager.setOptions(options);
        }
        var item = {
            view: view,
            options: itemOptions,
            mod: new StateModifier({
                align: itemOptions.origin,
                origin: itemOptions.origin
            }),
            show: true,
            callback: callback
        };
        item.node = new RenderNode(item.mod);
        item.node.add(view);
        return item;
    }

    /**
     * Shows a view and puts it on top of the view-stack.
     *
     * @return {ViewContainer} this
     */
    ViewContainer.prototype.show = function(view, options, callback) {
        var item = _createItem.call(this, view, options, callback);
        item.view.pipe(this._eventOutput);
        this._renderables.push(item.node);
        this._viewStack.push(item);
        this.layout.reflowLayout();
        return this;
    };

    /**
     * Hides the view and removes it from the view-stack.
     *
     * @return {ViewContainer} this
     */
    ViewContainer.prototype.hide = function(view, options, callback) {
        var index = view ? -1 : (this._viewStack.length - 1);
        for (var i = 0; i < this._viewStack.length; i++) {
            if (this._viewStack[i].view === view) {
                index = i;
                break;
            }
        }
        if (index < 0) {
            return this;
        }
        var item = this._viewStack[index];
        item.hide = true;
        item.callback = callback;
        item.options = this.constructor.DEFAULT_OPTIONS;
        if (options) {
            item.options = Object.create(this.constructor.DEFAULT_OPTIONS);
            var optionsManager = new OptionsManager(item.options);
            optionsManager.setOptions(options);
        }
        this.layout.reflowLayout();
        //show.view.unpipe(this._eventOutput);
        //this._renderables.splice(index, 1);
        //this._viewStack.splice(index, 1);
        return this;
    };

    module.exports = ViewContainer;
});
