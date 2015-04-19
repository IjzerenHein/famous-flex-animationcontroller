/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */

/*global console */
/*eslint no-console:0 */

define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('famous/core/famous.css');
    require('./styles.css');
    require('./index.html');
    //</webpack>

    // import dependencies
    var Engine = require('famous/core/Engine');
    var AnimationController = require('./AnimationController');
    var ProfileView = require('./views/ProfileView');
    var FullImageView = require('./views/FullImageView');
    var Easing = require('famous/transitions/Easing');
    //var RenderController = require('famous/views/RenderController');

    // create the main context
    var mainContext = Engine.createContext();
    var animationController = new AnimationController({
        transition: {duration: 400, curve: Easing.outBack},
        animations: {
            slide: 'left'
            //fade: 0,
            //flip: 'right'
            //zoom: [0.5, 0.5]
        },
        transfer: {
            transition: {duration: 400, curve: Easing.inOutExpo},
            items: {
                'image': 'image'
            }
        }
    });
    //animationController = new RenderController();
    mainContext.add(animationController);

    // create views
    var viewIndex = 0;
    animationController.show(new FullImageView());
    animationController.on('click', function() {
        console.log('click');
        var view;
        viewIndex++;
        switch (viewIndex % 2) {
            case 0:
                view = new FullImageView();
                break;
            case 1:
                view = new ProfileView();
                break;
        }
        animationController.show(view);
    });
});
