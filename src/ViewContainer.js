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

    var Slide = {
        NONE: undefined,
        LEFT: 'left',
        RIGHT: 'right',
        TOP: 'top',
        BOTTOM: 'bottom',
    };

    /**
     * @class
     * @param {Object} options Configurable options.
     * @param {Object} options.factory Factory delegate for creating new renderables.
     * @alias module:ViewContainer
     */
    function ViewContainer(options) {
        View.apply(this, arguments);

        this._viewStack = [];
        _createViewStackLayout.call(this);
    }
    ViewContainer.prototype = Object.create(View.prototype);
    ViewContainer.prototype.constructor = ViewContainer;

    ViewContainer.DEFAULT_OPTIONS = {
        zIndexOffset: 0.1
    };

    function ViewStackLayout(context, options) {
        var set = {
            size: context.size
        };
        var node = context.next();
        while (node) {
            context.set()
            node = context.next();
        }
    }

    function _createViewStackLayout() {
        this._viewStackLayout = new LayoutController({
            layout: ViewStackLayout,
            dataSource: this._viewStack
        });
        this.add(this._viewStackLayout);
    }

    /**
     * Get previous node.
     *
     * @return {VirtualViewSequence} previous node.
     */
    ViewContainer.prototype.show = function(show) {
    };

    /**
     * Get previous node.
     *
     * @return {VirtualViewSequence} previous node.
     */
    ViewContainer.prototype.hide = function(show) {
    };

    module.exports = ViewContainer;
});
