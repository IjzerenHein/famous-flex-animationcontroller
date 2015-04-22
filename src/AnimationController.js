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
 * AnimationController.
 *
 * @module
 */
define(function(require, exports, module) {

    // import dependencies
    var View = require('famous/core/View');
    var LayoutController = require('famous-flex/LayoutController');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var RenderNode = require('famous/core/RenderNode');
    var Timer = require('famous/utilities/Timer');
    var Easing = require('famous/transitions/Easing');

    /**
     * @class
     * @param {Object} options Configurable options.
     * @alias module:AnimationController
     */
    function AnimationController(options) {
        View.apply(this, arguments);

        _createLayout.call(this);

        if (options) {
            this.setOptions(options);
        }
    }
    AnimationController.prototype = Object.create(View.prototype);
    AnimationController.prototype.constructor = AnimationController;

    AnimationController.DEFAULT_OPTIONS = {
        transition: {duration: 400, curve: Easing.outBack},
        animations: {
            //slide: 'left'
            //fade: 0,
            //flip: 'top',
            //zoom: [0, 0]
        },
        show: {
            // transition,
            // animations
        },
        hide: {
            // transition,
            // animations
        },
        transfer: {
            zIndex: 10 // z-index offset the items are translated while transferring
            // transition,
            // items: {
            //   'image': 'image'
            // }
        },
        zIndexOffset: {
            views: 1
        },
        transferIdSeparator: '.'
    };

    var ItemState = {
        NONE: 0,
        HIDE: 1,
        HIDING: 2,
        SHOW: 3,
        SHOWING: 4,
        VISIBLE: 5,
        QUEUED: 6
    };

    /**
     * Out of the box supported animations.
     */
    AnimationController.animations = {
        slide: function(show, value, size) {
            switch (value) {
            case 'left':
                return {transform: Transform.translate(show ? size[0] : -size[0], 0, 0)};
            case 'right':
                return {transform: Transform.translate(show ? -size[0] : size[0], 0, 0)};
            case 'up':
                return {transform: Transform.translate(0, show ? size[1] : -size[1], 0)};
            case 'down':
                return {transform: Transform.translate(0, show ? -size[1] : size[1], 0)};
            }
        },
        fade: function(show, value, size) {
            return {opacity: value};
        },
        zoom: function(show, value, size) {
            return {transform: Transform.scale(value[0], value[1], 1)};
        },
        flip: function(show, value, size) {
            switch (value) {
            case 'left':
                return {transform: Transform.rotate(0, show ? Math.PI : -Math.PI, 0)};
            case 'right':
                return {transform: Transform.rotate(0, show ? -Math.PI : Math.PI, 0)};
            case 'up':
                return {transform: Transform.rotate(show ? Math.PI : -Math.PI, 0, 0)};
            case 'down':
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
        var views = context.get('views');
        var transferables = context.get('transferables');
        for (var i = 0; i < Math.min(views.length, 2); i++) {
            var item = this._viewStack[i];
            switch (item.state) {
                case ItemState.HIDE:
                case ItemState.HIDING:
                case ItemState.VISIBLE:
                case ItemState.SHOW:
                case ItemState.SHOWING:

                    // Layout view
                    var view = views[i];
                    context.set(view, set);

                    // Layout any transferables
                    for (var j = 0; j < transferables.length; j++) {
                        for (var key in item.transferables) {
                            if (transferables[j].renderNode === item.transferables[key].renderNode) {
                                context.set(transferables[j], {
                                    translate: [0, 0, set.translate[2]],
                                    size: [context.size[0], context.size[1]]
                                });
                            }
                        }
                    }

                    // Increase z-index for next view
                    set.translate[2] += options.zIndexOffset.views;
                    break;
            }
        }
    }

    /**
     * Creates the view-stack layout.
     */
    function _createLayout() {
        this._renderables = {
            views: [],
            transferables: []
        };
        this._viewStack = [];
        this.layout = new LayoutController({
            layout: ViewStackLayout.bind(this),
            layoutOptions: this.options,
            dataSource: this._renderables
        });
        this.add(this.layout);
        this.layout.on('layoutend', _startAnimations.bind(this));
    }

    /**
     * Gets the delegate through which we can get/replace
     * renderables inside the view.
     */
    /*function _getTransferableDelegate(view, id) {
        if (view.getSpec && view.get && view.replace) {
            if (view.get(id) !== undefined) {
                return view;
            }
            else if (this.options.transferIdSeparator && (id.indexOf(this.options.transferIdSeparator) >= 0)) {
                var ids = id.split(this.options.transferIdSeparator);
                var idIndex = 0;
                view = _getViewDelegate(view, ids[idIndex]);
                while (view && (idIndex < (ids.length - 1))) {
                    idIndex++;
                    view = _getViewDelegate(view, ids[idIndex]);
                }
                return view;
            }
        }
        if (view.layout) {
            return _getViewDelegate.call(this, view.layout, id);
        }
    }*/

    /**
     * Gets the spec from a spec.
     */
    function _getViewSpec(item, view, id, callback) {
        if (!item.view) {
            return;
        }
        var spec = view.getSpec(id);
        if (spec) {
            callback(spec);
        }
        else {
            Timer.after(_getViewSpec.bind(this, item, view, id, callback), 1);
        }
    }

    /**
     * Gets the transferable delegate for the given id.
     */
    function _getTransferable(item, view, id) {
        var transferable;
        // 1. If view supports getTransferable, use that
        if (view.getTransferable) {
            transferable = view.getTransferable(id);
            if (transferable) {
                return transferable;
            }
        }
        // 2. If view is derived from layoutcontroller, use that
        if (view.getSpec && view.get && view.replace) {
            if (view.get(id) !== undefined) {
                transferable = {
                    get: function() {
                        return view.get(id);
                    },
                    show: function(renderable) {
                        view.replace(id, renderable);
                    },
                    getSpec: _getViewSpec.bind(this, item, view, id)
                };
                return transferable;
            }
        }
        // 3. If view has an embedded layout, use that as fallback
        if (view.layout) {
            return _getTransferable.call(this, item, view.layout, id);
        }
    }

    /**
     * Begins visual transfer or renderables from the previous item
     * to the new item.
     */
    function _startTransferableAnimations(item, prevItem) {
        for (var sourceId in item.options.transfer.items) {
            _startTransferableAnimation.call(this, item, prevItem, sourceId);
        }
    }
    function _startTransferableAnimation(item, prevItem, sourceId) {
        var targetId = item.options.transfer.items[sourceId];
        var transferable = {};
        transferable.source = _getTransferable.call(this, prevItem, prevItem.view, sourceId);
        transferable.target = _getTransferable.call(this, item, item.view, targetId);
        if (transferable.source && transferable.target) {
            transferable.source.getSpec(function(sourceSpec) {

                // Replace source & target renderables in the views
                // source: dummy-node
                // target: target-renderable with opacity: 0.
                transferable.originalSource = transferable.source.get();
                transferable.source.show(new RenderNode(new Modifier(sourceSpec)));
                transferable.originalTarget = transferable.target.get();
                var targetNode = new RenderNode(new Modifier({opacity: 0}));
                targetNode.add(transferable.originalTarget);
                transferable.target.show(targetNode);

                // Take ownership of the source renderable.
                // This renderable will be layouted by the layout-function
                var zIndexMod = new Modifier({
                    transform: Transform.translate(0, 0, item.options.transfer.zIndex)
                });
                var mod = new StateModifier(sourceSpec);
                transferable.renderNode = new RenderNode(zIndexMod);
                transferable.renderNode.add(mod).add(transferable.originalSource);
                item.transferables[targetId] = transferable;
                this._renderables.transferables.push(transferable.renderNode);
                this.layout.reflowLayout();

                // Wait for the target spec to have settled. This may take a couple render
                // cycles if for instance, this involves a true-size renderable or the
                // renderable is affected by other true-size renderables around itsself.
                Timer.after(function() {
                    transferable.target.getSpec(function(targetSpec) {
                        if (sourceSpec.transform || targetSpec.transform) {
                            mod.setTransform(targetSpec.transform || Transform.identity, item.options.transfer.transition);
                        }
                        if ((sourceSpec.opacity !== undefined) || (targetSpec.opacity !== undefined)) {
                            mod.setOpacity((targetSpec.opacity === undefined) ? 1 : targetSpec.opacity, item.options.transfer.transition);
                        }
                        if (sourceSpec.size || targetSpec.size) {
                            mod.setSize(targetSpec.size || sourceSpec.size, item.options.transfer.transition);
                        }
                    });
                }, 1);
            }.bind(this));
        }
    }

    /**
     * Called whenever the view has been shown and the
     * transferable animations should be ended. This returns
     * the renderables to their original views.
     */
    function _endTransferableAnimations(item) {
        for (var key in item.transferables) {
            var transferable = item.transferables[key];
            for (var i = 0; i < this._renderables.transferables.length; i++) {
                if (this._renderables.transferables[i] === transferable.renderNode) {
                    this._renderables.transferables.splice(i, 1);
                    break;
                }
            }
            transferable.source.show(transferable.originalSource);
            transferable.target.show(transferable.originalTarget);
        }
        item.transferables = {};
        this.layout.reflowLayout();
    }

    /**
     * Starts a show or hide animation.
     */
    function _startAnimations(event) {
        var prevItem;
        for (var i = 0; i < this._viewStack.length; i++) {
            var item = this._viewStack[i];
            switch (item.state) {
                case ItemState.HIDE:
                    item.state = ItemState.HIDING;
                    _startAnimation.call(this, item, prevItem, event.size, false);
                    _updateState.call(this);
                    break;
                case ItemState.SHOW:
                    item.state = ItemState.SHOWING;
                    _startAnimation.call(this, item, prevItem, event.size, true);
                    _updateState.call(this);
                    break;
            }
            prevItem = item;
        }
    }

    /**
     * Starts the view animation.
     */
    function _startAnimation(item, prevItem, size, show) {
        var transform;
        var opacity;
        var animations = show ? item.options.show.animations : item.options.hide.animations;
        for (var key in animations) {
            if (animations[key] !== undefined) {
                var result = AnimationController.animations[key](show, animations[key], size);
                if (result && result.transform) {
                    if (transform) {
                        transform = Transform.multiply(transform, result.transform);
                    }
                    else {
                        transform = result.transform;
                    }
                }
                if (result && (result.opacity !== undefined)) {
                    if (opacity !== undefined) {
                        opacity *= result.opacity;
                    }
                    else {
                        opacity = result.opacity;
                    }
                }
            }
        }
        item.mod.halt();
        var callback;
        if (show) {
            callback = item.showCallback;
            if (transform) {
                item.mod.setTransform(transform);
                item.mod.setTransform(Transform.identity, item.options.show.transition, callback);
                callback = undefined;
            }
            if (opacity !== undefined) {
                item.mod.setOpacity(opacity);
                item.mod.setOpacity(1, item.options.show.transition, callback);
                callback = undefined;
            }
            if (prevItem) {
                _startTransferableAnimations.call(this, item, prevItem);
            }
            if (callback) {
                callback();
            }
        }
        else {
            callback = item.hideCallback;
            if (transform) {
                item.mod.setTransform(transform, item.options.hide.transition, callback);
                callback = undefined;
            }
            if (opacity !== undefined) {
                item.mod.setOpacity(opacity, item.options.hide.transition, callback);
                callback = undefined;
            }
            if (callback) {
                callback();
            }
        }
    }

    /**
     * Creates a view-item.
     */
    function _createItem(view, options, callback) {
        var item = {
            view: view,
            mod: new StateModifier(),
            state: ItemState.QUEUED,
            options: {
                show: {
                    transition: this.options.show.transition || this.options.transition,
                    animations: this.options.show.animations || this.options.animations
                },
                hide: {
                    transition: this.options.hide.transition || this.options.transition,
                    animations: this.options.hide.animations || this.options.animations
                },
                transfer: {
                    transition: this.options.transfer.transition || this.options.transition,
                    items: this.options.transfer.items || {},
                    zIndex: this.options.transfer.zIndex
                }
            },
            callback: callback,
            transferables: {} // renderables currently being transfered
        };
        if (options) {
            item.options.show.transition = (options.show ? options.show.transition : undefined) || options.transition || item.options.show.transition;
            item.options.show.animations = (options.show ? options.show.animations : undefined) || options.animations || item.options.show.animations;
            item.options.hide.transition = (options.hide ? options.hide.transition : undefined) || options.transition || item.options.hide.transition;
            item.options.hide.animations = (options.hide ? options.hide.animations : undefined) || options.animations || item.options.hide.animations;
            item.options.transfer.transition = (options.transfer ? options.transfer.transition : undefined) || options.transition || item.options.transfer.transition;
            item.options.transfer.items = (options.transfer ? options.transfer.items : undefined) || item.options.transfer.items;
            item.options.transfer.zIndex = (options.transfer && (options.transfer.zIndex !== undefined)) ? options.transfer.zIndex : item.options.transfer.zIndex;
        }
        item.node = new RenderNode(item.mod);
        item.node.add(view);
        return item;
    }

    /**
     * Updates the state.
     */
    function _updateState() {
        var prevItem;
        var invalidated = false;
        for (var i = 0; i < Math.min(this._viewStack.length, 2); i++) {
            var item = this._viewStack[i];
            if (item.state === ItemState.QUEUED) {
                if (!prevItem ||
                    (prevItem.state === ItemState.VISIBLE) ||
                    (prevItem.state === ItemState.HIDING)) {
                    if (prevItem && (prevItem.state === ItemState.VISIBLE)) {
                        prevItem.state = ItemState.HIDE;
                    }
                    item.state = ItemState.SHOW;
                    invalidated = true;
                }
                break;
            }
            else if ((item.state === ItemState.VISIBLE) && item.hide) {
                item.state = ItemState.HIDE;
            }
            if ((item.state === ItemState.SHOW) || (item.state === ItemState.HIDE)) {
                this.layout.reflowLayout();
            }
            prevItem = item;
        }
        if (invalidated) {
            _updateState.call(this);
            this.layout.reflowLayout();
        }
    }

    /**
     * Shows a renderable using an animation and hides the old renderable.
     *
     * When multiple show operations are executed, they are queued and
     * shows in that sequence. Use `.halt` to cancel any pending show
     * operations from the queue.
     *
     * @return {AnimationController} this
     */
    AnimationController.prototype.show = function(view, options, callback) {
        if (!view) {
            return this.hide(options, callback);
        }
        var item = this._viewStack.length ? this._viewStack[this._viewStack.length - 1] : undefined;
        if (item && (item.view === view)) {
            item.hide = false;
            return this;
        }
        item = _createItem.call(this, view, options, callback);
        item.showCallback = function() {
            item.state = ItemState.VISIBLE;
            _updateState.call(this);
            _endTransferableAnimations.call(this, item);
            if (callback) {
                callback();
            }
        }.bind(this);
        item.hideCallback = function() {
            var index = this._viewStack.indexOf(item);
            this._renderables.views.splice(index, 1);
            this._viewStack.splice(index, 1);
            item.view = undefined;
            _updateState.call(this);
        }.bind(this);
        this._renderables.views.push(item.node);
        this._viewStack.push(item);
        _updateState.call(this);
        return this;
    };

    /**
     * Hides the current view with an animation.
     *
     * @return {AnimationController} this
     */
    AnimationController.prototype.hide = function(options, callback) {
        var item = this._viewStack.length ? this._viewStack[this._viewStack.length - 1] : undefined;
        if (!item || (item.state === ItemState.HIDING)) {
            return this;
        }
        item.hide = true;
        if (options) {
            item.options.hide.transition = (options.hide ? options.hide.transition : undefined) || options.transition || item.options.hide.transition;
            item.options.hide.animations = (options.hide ? options.hide.animations : undefined) || options.animations || item.options.hide.animations;
        }
        item.hideCallback = function() {
            var index = this._viewStack.indexOf(item);
            this._renderables.views.splice(index, 1);
            this._viewStack.splice(index, 1);
            item.view = undefined;
            _updateState.call(this);
            if (callback) {
                callback();
            }
        }.bind(this);
        _updateState.call(this);
        return this;
    };

    /**
     * Clears the queue of any pending show animations.
     *
     * @return {AnimationController} this
     */
    AnimationController.prototype.halt = function() {
        for (var i = 0; i < this._viewStack.length; i++) {
            var item = this._viewStack[this._viewStack.length - 1];
            if ((item.state === ItemState.QUEUED) || (item.state === ItemState.SHOW)) {
                this._renderables.views.splice(this._viewStack.length - 1, 1);
                this._viewStack.splice(this._viewStack.length - 1, 1);
                item.view = undefined;
            }
            else {
                break;
            }
        }
    };

    /**
     * Gets the currently visible or being shown renderable.
     *
     * @return {Renderable} currently visible view/surface
     */
    AnimationController.prototype.get = function() {
        for (var i = 0; i < this._viewStack.length; i++) {
            var item = this._viewStack[i];
            if ((item.state === ItemState.VISIBLE) ||
                (item.state === ItemState.SHOW) ||
                (item.state === ItemState.SHOWING)) {
                return item.view;
            }
        }
        return undefined;
    };

    module.exports = AnimationController;
});
