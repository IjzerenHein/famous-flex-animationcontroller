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

    var Slide = {
        NONE: undefined,
        LEFT: 'left',
        RIGHT: 'right',
        TOP: 'top',
        BOTTOM: 'bottom'
    };

    /**
     * @class
     * @param {Object} options Configurable options.
     * @param {Object} options.factory Factory delegate for creating new renderables.
     * @alias module:ViewContainer
     */
    function ViewContainer(options) {
        View.apply(this, arguments);

        _createViewStack.call(this);
    }
    ViewContainer.prototype = Object.create(View.prototype);
    ViewContainer.prototype.constructor = ViewContainer;

    ViewContainer.DEFAULT_OPTIONS = {
        zIndexOffset: 0.1
    };

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

    function _createViewStack() {
        this._viewStack = new LayoutController({
            layout: ViewStackLayout,
            layoutOptions: this.options,
            dataSource: []
        });
        this.add(this._viewStack);
    }

    /**
     * Shows a view and puts it on top of the view-stack.
     *
     * @return {ViewContainer} this
     */
    ViewContainer.prototype.show = function(show) {
        this._viewStack.push(show.view);
        return this;
    };

    /**
     * Hides the view and removes it from the view-stack.
     *
     * @return {ViewContainer} this
     */
    ViewContainer.prototype.hide = function(show) {
        var arr = this._viewStack.getDataSource();
        var index = -1;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === show.view) {
                index = i;
                break;
            }
        }
        if (index < 0) {
            return this;
        }
        this._viewStack.remove(index);
        return this;
    };

    module.exports = ViewContainer;
});
