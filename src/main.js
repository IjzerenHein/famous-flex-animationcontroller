/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */

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
    var NavBarView = require('./views/NavBarView');
    var Easing = require('famous/transitions/Easing');
    var PhoneFrameView = require('./PhoneFrameView');
    //var RenderController = require('famous/views/RenderController');

    // create the main context
    var mainContext = Engine.createContext();
    var phoneFrameView = new PhoneFrameView();
    mainContext.add(phoneFrameView);
    var animationController = new AnimationController({
        transition: {duration: 1000, curve: Easing.outBack},
        animation: AnimationController.Animation.Slide.Left,
        transfer: {
            transition: {duration: 1000, curve: Easing.inOutExpo},
            zIndez: 1000,
            items: {
                'image': ['image', 'navBarImage'],
                'navBarImage': ['image', 'navBarImage']
            }
        }
    });
    //animationController = new RenderController();
    phoneFrameView.setContent(animationController);

    // create views
    var viewIndex = 0;
    var view = new FullImageView({
        text: 'Click to animate'
    });
    phoneFrameView.on('click', _onClick);
    animationController.show(view);
    function _onClick() {
        for (var i = 0; i < 1; i++) {
            viewIndex++;
            switch (viewIndex % 4) {
                case 0:
                    view = new FullImageView();
                    animationController.show(view);
                    break;
                case 1:
                    view = new ProfileView();
                    animationController.show(view);
                    break;
                case 2:
                    view = new NavBarView({
                        left: false
                    });
                    animationController.show(view);
                    break;
                case 3:
                    view = new NavBarView({
                        left: true
                    });
                    animationController.show(view, {
                        transfer: {
                            transition: {duration: 1000, curve: Easing.outBack}
                        }
                    });
                    break;
            }
        }
    }
});
