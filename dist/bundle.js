/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2015
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
	    //<webpack>
	    __webpack_require__(/*! famous-polyfills */ 5);
	    __webpack_require__(/*! famous/core/famous.css */ 11);
	    __webpack_require__(/*! ./styles.css */ 9);
	    __webpack_require__(/*! ./index.html */ 6);
	    //</webpack>
	
	    // import dependencies
	    var Engine = __webpack_require__(/*! famous/core/Engine */ 7);
	    var AnimationController = __webpack_require__(/*! famous-flex/AnimationController */ 13);
	    var ProfileView = __webpack_require__(/*! ./views/ProfileView */ 1);
	    var FullImageView = __webpack_require__(/*! ./views/FullImageView */ 2);
	    var NavBarView = __webpack_require__(/*! ./views/NavBarView */ 3);
	    var Easing = __webpack_require__(/*! famous/transitions/Easing */ 8);
	    var PhoneFrameView = __webpack_require__(/*! ./PhoneFrameView */ 4);
	    var FastClick = __webpack_require__(/*! fastclick/lib/fastclick */ 14);
	    FastClick.attach(document.body);
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/*!******************************!*\
  !*** ./views/ProfileView.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
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
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var View = __webpack_require__(/*! famous/core/View */ 15);
	    var Surface = __webpack_require__(/*! famous/core/Surface */ 16);
	    var LayoutController = __webpack_require__(/*! famous-flex/LayoutController */ 17);
	    var BkImageSurface = __webpack_require__(/*! famous-bkimagesurface/BkImageSurface */ 23);
	
	    /**
	     * @class
	     * @param {Object} options Configurable options.
	     * @param {Object} options.factory Factory delegate for creating new renderables.
	     * @alias module:ProfileView
	     */
	    function ProfileView(options) {
	        View.apply(this, arguments);
	
	        _createRenderables.call(this);
	        _createLayout.call(this);
	    }
	    ProfileView.prototype = Object.create(View.prototype);
	    ProfileView.prototype.constructor = ProfileView;
	
	    ProfileView.DEFAULT_OPTIONS = {
	        classes: ['view', 'profile'],
	        imageSize: [200, 200],
	        imageScale: [1, 1, 1],
	        nameHeight: 60,
	        profileText: 'Scarlett Johansson was born in New York City. Her mother, Melanie Sloan, is from an Ashkenazi Jewish family, and her father, Karsten Johansson, is Danish. Scarlett showed a passion for acting at a young age and starred in many plays.<br><br>She has a sister named Vanessa Johansson, a brother named Adrian, and a twin brother named Hunter Johansson born three minutes after her. She began her acting career starring as Laura Nelson in the comedy film North (1994).<br><br>The acclaimed drama film The Horse Whisperer (1998) brought Johansson critical praise and worldwide recognition. Following the film\'s success, she starred in many other films including the critically acclaimed cult film Ghost World (2001) and then the hit Lost in Translation (2003) with Bill Murray in which she again stunned critics. Later on, she appeared in the drama film Girl with a Pearl Earring (2003).'
	    };
	
	    function _createRenderables() {
	        this._renderables = {
	            background: new Surface({
	                classes: this.options.classes.concat(['background'])
	            }),
	            image: new BkImageSurface({
	                classes: this.options.classes.concat(['image']),
	                content: __webpack_require__(/*! ../images/scarlett.jpg */ 26),
	                sizeMode: 'cover'
	            }),
	            name: new Surface({
	                classes: this.options.classes.concat(['name']),
	                content: '<div>Scarlett Johansson</div>'
	            }),
	            text: new Surface({
	                classes: this.options.classes.concat(['text']),
	                content: this.options.profileText
	            })
	        };
	    }
	
	    function _createLayout() {
	        this.layout = new LayoutController({
	            autoPipeEvents: true,
	            layout: function(context, options) {
	                context.set('background', {
	                    size: context.size
	                });
	                var image = context.set('image', {
	                    size: this.options.imageSize,
	                    translate: [(context.size[0] - this.options.imageSize[0]) / 2, 20, 1],
	                    scale: this.options.imageScale
	                });
	                var name = context.set('name', {
	                    size: [context.size[0], this.options.nameHeight],
	                    translate: [0, image.size[1] + image.translate[1], 1]
	                });
	                context.set('text', {
	                    size: [context.size[0], context.size[1] - name.size[1] - name.translate[1]],
	                    translate: [0, name.translate[1] + name.size[1], 1]
	                });
	            }.bind(this),
	            dataSource: this._renderables
	        });
	        this.add(this.layout);
	        this.layout.pipe(this._eventOutput);
	    }
	
	    module.exports = ProfileView;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/*!********************************!*\
  !*** ./views/FullImageView.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2015
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var View = __webpack_require__(/*! famous/core/View */ 15);
	    var Surface = __webpack_require__(/*! famous/core/Surface */ 16);
	    var LayoutController = __webpack_require__(/*! famous-flex/LayoutController */ 17);
	    var BkImageSurface = __webpack_require__(/*! famous-bkimagesurface/BkImageSurface */ 23);
	
	    /**
	     * @class
	     * @param {Object} options Configurable options.
	     * @param {Object} options.factory Factory delegate for creating new renderables.
	     * @alias module:ProfileView
	     */
	    function FullImageView(options) {
	        View.apply(this, arguments);
	
	        _createRenderables.call(this);
	        _createLayout.call(this);
	    }
	    FullImageView.prototype = Object.create(View.prototype);
	    FullImageView.prototype.constructor = FullImageView;
	
	    FullImageView.DEFAULT_OPTIONS = {
	        classes: ['view', 'fullImage'],
	        margins: [20, 20, 20, 20],
	        textHeight: 30
	    };
	
	    function _createRenderables() {
	        this._renderables = {
	            background: new Surface({
	                classes: this.options.classes.concat(['background'])
	            }),
	            image: new BkImageSurface({
	                classes: this.options.classes.concat(['image']),
	                content: __webpack_require__(/*! ../images/scarlett.jpg */ 26),
	                sizeMode: 'cover'
	            }),
	            text: new Surface({
	                classes: this.options.classes.concat(['text']),
	                content: this.options.text
	            })
	        };
	    }
	
	    function _createLayout() {
	        this.layout = new LayoutController({
	            autoPipeEvents: true,
	            layout: function(context, options) {
	                context.set('background', {
	                    size: context.size
	                });
	                var imageSize = [
	                    context.size[0] - this.options.margins[1] - this.options.margins[3],
	                    context.size[1] - this.options.margins[0] - this.options.margins[2]
	                ];
	                if (imageSize[0] > imageSize[1]) {
	                    imageSize[0] = imageSize[1];
	                }
	                else {
	                    imageSize[1] = imageSize[0];
	                }
	                context.set('image', {
	                    size: imageSize,
	                    translate: [(context.size[0] - imageSize[0]) / 2, (context.size[1] - imageSize[1]) / 2, 1]
	                });
	                context.set('text', {
	                    size: [context.size[0], this.options.textHeight],
	                    translate: [0, context.size[1] - this.options.textHeight, 1]
	                });
	            }.bind(this),
	            dataSource: this._renderables
	        });
	        this.add(this.layout);
	        this.layout.pipe(this._eventOutput);
	    }
	
	    module.exports = FullImageView;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/*!*****************************!*\
  !*** ./views/NavBarView.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
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
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var View = __webpack_require__(/*! famous/core/View */ 15);
	    var Surface = __webpack_require__(/*! famous/core/Surface */ 16);
	    var LayoutController = __webpack_require__(/*! famous-flex/LayoutController */ 17);
	    var LayoutDockHelper = __webpack_require__(/*! famous-flex/helpers/LayoutDockHelper */ 18);
	    var BkImageSurface = __webpack_require__(/*! famous-bkimagesurface/BkImageSurface */ 23);
	
	    /**
	     * @class
	     * @param {Object} options Configurable options.
	     * @alias module:NavBarView
	     */
	    function NavBarView(options) {
	        View.apply(this, arguments);
	
	        _createRenderables.call(this);
	        _createLayout.call(this);
	    }
	    NavBarView.prototype = Object.create(View.prototype);
	    NavBarView.prototype.constructor = NavBarView;
	
	    NavBarView.DEFAULT_OPTIONS = {
	        classes: ['view', 'profile'],
	        navBar: {
	            height: 50,
	            left: false
	        },
	        profileText: 'Scarlett Johansson was born in New York City. Her mother, Melanie Sloan, is from an Ashkenazi Jewish family, and her father, Karsten Johansson, is Danish. Scarlett showed a passion for acting at a young age and starred in many plays.<br><br>She has a sister named Vanessa Johansson, a brother named Adrian, and a twin brother named Hunter Johansson born three minutes after her. She began her acting career starring as Laura Nelson in the comedy film North (1994).<br><br>The acclaimed drama film The Horse Whisperer (1998) brought Johansson critical praise and worldwide recognition. Following the film\'s success, she starred in many other films including the critically acclaimed cult film Ghost World (2001) and then the hit Lost in Translation (2003) with Bill Murray in which she again stunned critics. Later on, she appeared in the drama film Girl with a Pearl Earring (2003).'
	    };
	
	    /*
	    NavBarView.prototype.getTransferable = function(id) {
	        if (id === 'image') {
	            this._navBar.getTransferable('')
	        }
	    }*/
	
	    function _createRenderables() {
	        this._renderables = {
	            background: new Surface({
	                classes: this.options.classes.concat(['background'])
	            }),
	            navBarBackground: new Surface({
	                classes: this.options.classes.concat(['navbar', 'background'])
	            }),
	            navBarTitle: new Surface({
	                classes: this.options.classes.concat(['navbar', 'title']),
	                content: '<div>' + 'Scarlett Johansson' + '</div>'
	            }),
	            navBarImage: new BkImageSurface({
	                classes: this.options.classes.concat(['navbar', 'image']),
	                content: __webpack_require__(/*! ../images/scarlett.jpg */ 26),
	                sizeMode: 'cover'
	            }),
	            content: new Surface({
	                classes: this.options.classes.concat(['text']),
	                content: this.options.profileText
	            })
	        };
	    }
	
	    function _createLayout() {
	        this.layout = new LayoutController({
	            autoPipeEvents: true,
	            layout: function(context, options) {
	                var dock = new LayoutDockHelper(context, options);
	                dock.fill('background');
	                dock.top('navBarBackground', this.options.navBar.height, 1);
	                context.set('navBarTitle', {
	                    size: [context.size[0], this.options.navBar.height],
	                    translate: [0, 0, 2]
	                });
	                context.set('navBarImage', {
	                    size: [32, 32],
	                    translate: [this.options.left ? 20 : (context.size[0] - 20 - 32), 9, 2]
	                });
	                dock.top(undefined, 20);
	                dock.fill('content', 1);
	            }.bind(this),
	            dataSource: this._renderables
	        });
	        this.add(this.layout);
	        this.layout.pipe(this._eventOutput);
	    }
	
	    module.exports = NavBarView;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/*!***************************!*\
  !*** ./PhoneFrameView.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
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
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var View = __webpack_require__(/*! famous/core/View */ 15);
	    var Surface = __webpack_require__(/*! famous/core/Surface */ 16);
	    var LayoutController = __webpack_require__(/*! famous-flex/LayoutController */ 17);
	    var BkImageSurface = __webpack_require__(/*! famous-bkimagesurface/BkImageSurface */ 23);
	    var isMobile = __webpack_require__(/*! ismobilejs */ 24);
	
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
	                content: __webpack_require__(/*! ./images/iphone.png */ 25),
	                sizeMode: 'contain'
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
	            /*flow: true,
	            flowOptions: {
	                properties: {
	                    size: false,
	                    opacity: false,
	                    align: false,
	                    origin: false,
	                    translate: false,
	                    rotate: true,
	                    scale: false,
	                    skew: false
	                }
	            },*/
	            layout: function(context, options) {
	                // full screen
	                var canShowPortrait = (context.size[0] >= this.options.imageSize[0]) && (context.size[1] >= this.options.imageSize[1]);
	                var canShowLandscape = (context.size[0] >= this.options.imageSize[1]) && (context.size[1] >= this.options.imageSize[0]);
	                if (isMobile.phone || (!canShowPortrait && !canShowLandscape)) {
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
	                    return;
	                }
	                // portrait
	                var imageSize;
	                var margins;
	                var rotate;
	                if ((context.size[0] >= this.options.imageSize[0]) && (context.size[1] >= this.options.imageSize[1])) {
	                    imageSize = this.options.imageSize;
	                    margins = this.options.innerMargins;
	                    rotate = [0, 0, 0];
	                }
	                else {
	                    imageSize = [this.options.imageSize[1], this.options.imageSize[0]];
	                    margins = [
	                        this.options.innerMargins[1],
	                        this.options.innerMargins[2],
	                        this.options.innerMargins[3],
	                        this.options.innerMargins[0]
	                    ];
	                    rotate = [0, 0, -Math.PI / 2];
	                }
	                context.set('image', {
	                    size: this.options.imageSize,
	                    translate: [0, 0, 100],
	                    rotate: rotate,
	                    origin: [0.5, 0.5],
	                    align: [0.5, 0.5]
	                });
	                var imageTranslate = [
	                    (context.size[0] - imageSize[0]) / 2,
	                    (context.size[1] - imageSize[1]) / 2,
	                    100
	                ];
	                context.set('left', {
	                    size: [imageTranslate[0] + margins[3], context.size[1]],
	                    translate: [0, 0, 99]
	                });
	                context.set('right', {
	                    size: [context.size[0] - imageTranslate[0] - imageSize[0] + margins[1], context.size[1]],
	                    translate: [imageTranslate[0] + imageSize[0] - margins[1], 0, 99]
	                });
	                context.set('top', {
	                    size: [context.size[0], imageTranslate[1] + margins[0]],
	                    translate: [0, 0, 99]
	                });
	                context.set('bottom', {
	                    size: [context.size[0], context.size[1] - imageTranslate[1] - imageSize[1] + margins[2]],
	                    translate: [0, imageTranslate[1] + imageSize[1] - margins[2], 99]
	                });
	                var content = context.set('content', {
	                    size: [
	                        imageSize[0] - margins[1] - margins[3],
	                        imageSize[1] - margins[0] - margins[2]
	                    ],
	                    translate: [
	                        imageTranslate[0] + margins[3],
	                        imageTranslate[1] + margins[0],
	                        1
	                    ]
	                });
	                context.set('inner', {
	                    size: content.size,
	                    translate: [content.translate[0], content.translate[1], 0]
	                });
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/*!**************************************!*\
  !*** ../~/famous-polyfills/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./classList.js */ 20);
	__webpack_require__(/*! ./functionPrototypeBind.js */ 21);
	__webpack_require__(/*! ./requestAnimationFrame.js */ 22);

/***/ },
/* 6 */
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ },
/* 7 */
/*!**********************************!*\
  !*** ../~/famous/core/Engine.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Context = __webpack_require__(/*! ./Context */ 27);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 28);
	var OptionsManager = __webpack_require__(/*! ./OptionsManager */ 29);
	var Engine = {};
	var contexts = [];
	var nextTickQueue = [];
	var currentFrame = 0;
	var nextTickFrame = 0;
	var deferQueue = [];
	var lastTime = Date.now();
	var frameTime;
	var frameTimeLimit;
	var loopEnabled = true;
	var eventForwarders = {};
	var eventHandler = new EventHandler();
	var options = {
	    containerType: 'div',
	    containerClass: 'famous-container',
	    fpsCap: undefined,
	    runLoop: true,
	    appMode: true
	};
	var optionsManager = new OptionsManager(options);
	var MAX_DEFER_FRAME_TIME = 10;
	Engine.step = function step() {
	    currentFrame++;
	    nextTickFrame = currentFrame;
	    var currentTime = Date.now();
	    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
	        return;
	    var i = 0;
	    frameTime = currentTime - lastTime;
	    lastTime = currentTime;
	    eventHandler.emit('prerender');
	    var numFunctions = nextTickQueue.length;
	    while (numFunctions--)
	        nextTickQueue.shift()(currentFrame);
	    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
	        deferQueue.shift().call(this);
	    }
	    for (i = 0; i < contexts.length; i++)
	        contexts[i].update();
	    eventHandler.emit('postrender');
	};
	function loop() {
	    if (options.runLoop) {
	        Engine.step();
	        window.requestAnimationFrame(loop);
	    } else
	        loopEnabled = false;
	}
	window.requestAnimationFrame(loop);
	function handleResize(event) {
	    for (var i = 0; i < contexts.length; i++) {
	        contexts[i].emit('resize');
	    }
	    eventHandler.emit('resize');
	}
	window.addEventListener('resize', handleResize, false);
	handleResize();
	function initialize() {
	    window.addEventListener('touchmove', function (event) {
	        event.preventDefault();
	    }, true);
	    addRootClasses();
	}
	var initialized = false;
	function addRootClasses() {
	    if (!document.body) {
	        Engine.nextTick(addRootClasses);
	        return;
	    }
	    document.body.classList.add('famous-root');
	    document.documentElement.classList.add('famous-root');
	}
	Engine.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function)
	        return target.subscribe(Engine);
	    else
	        return eventHandler.pipe(target);
	};
	Engine.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function)
	        return target.unsubscribe(Engine);
	    else
	        return eventHandler.unpipe(target);
	};
	Engine.on = function on(type, handler) {
	    if (!(type in eventForwarders)) {
	        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
	        addEngineListener(type, eventForwarders[type]);
	    }
	    return eventHandler.on(type, handler);
	};
	function addEngineListener(type, forwarder) {
	    if (!document.body) {
	        Engine.nextTick(addEventListener.bind(this, type, forwarder));
	        return;
	    }
	    document.body.addEventListener(type, forwarder);
	}
	Engine.emit = function emit(type, event) {
	    return eventHandler.emit(type, event);
	};
	Engine.removeListener = function removeListener(type, handler) {
	    return eventHandler.removeListener(type, handler);
	};
	Engine.getFPS = function getFPS() {
	    return 1000 / frameTime;
	};
	Engine.setFPSCap = function setFPSCap(fps) {
	    frameTimeLimit = Math.floor(1000 / fps);
	};
	Engine.getOptions = function getOptions(key) {
	    return optionsManager.getOptions(key);
	};
	Engine.setOptions = function setOptions(options) {
	    return optionsManager.setOptions.apply(optionsManager, arguments);
	};
	Engine.createContext = function createContext(el) {
	    if (!initialized && options.appMode)
	        Engine.nextTick(initialize);
	    var needMountContainer = false;
	    if (!el) {
	        el = document.createElement(options.containerType);
	        el.classList.add(options.containerClass);
	        needMountContainer = true;
	    }
	    var context = new Context(el);
	    Engine.registerContext(context);
	    if (needMountContainer)
	        mount(context, el);
	    return context;
	};
	function mount(context, el) {
	    if (!document.body) {
	        Engine.nextTick(mount.bind(this, context, el));
	        return;
	    }
	    document.body.appendChild(el);
	    context.emit('resize');
	}
	Engine.registerContext = function registerContext(context) {
	    contexts.push(context);
	    return context;
	};
	Engine.getContexts = function getContexts() {
	    return contexts;
	};
	Engine.deregisterContext = function deregisterContext(context) {
	    var i = contexts.indexOf(context);
	    if (i >= 0)
	        contexts.splice(i, 1);
	};
	Engine.nextTick = function nextTick(fn) {
	    nextTickQueue.push(fn);
	};
	Engine.defer = function defer(fn) {
	    deferQueue.push(fn);
	};
	optionsManager.on('change', function (data) {
	    if (data.id === 'fpsCap')
	        Engine.setFPSCap(data.value);
	    else if (data.id === 'runLoop') {
	        if (!loopEnabled && data.value) {
	            loopEnabled = true;
	            window.requestAnimationFrame(loop);
	        }
	    }
	});
	module.exports = Engine;

/***/ },
/* 8 */
/*!*****************************************!*\
  !*** ../~/famous/transitions/Easing.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Easing = {
	    inQuad: function (t) {
	        return t * t;
	    },
	    outQuad: function (t) {
	        return -(t -= 1) * t + 1;
	    },
	    inOutQuad: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t;
	        return -0.5 * (--t * (t - 2) - 1);
	    },
	    inCubic: function (t) {
	        return t * t * t;
	    },
	    outCubic: function (t) {
	        return --t * t * t + 1;
	    },
	    inOutCubic: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t * t;
	        return 0.5 * ((t -= 2) * t * t + 2);
	    },
	    inQuart: function (t) {
	        return t * t * t * t;
	    },
	    outQuart: function (t) {
	        return -(--t * t * t * t - 1);
	    },
	    inOutQuart: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t * t * t;
	        return -0.5 * ((t -= 2) * t * t * t - 2);
	    },
	    inQuint: function (t) {
	        return t * t * t * t * t;
	    },
	    outQuint: function (t) {
	        return --t * t * t * t * t + 1;
	    },
	    inOutQuint: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t * t * t * t;
	        return 0.5 * ((t -= 2) * t * t * t * t + 2);
	    },
	    inSine: function (t) {
	        return -1 * Math.cos(t * (Math.PI / 2)) + 1;
	    },
	    outSine: function (t) {
	        return Math.sin(t * (Math.PI / 2));
	    },
	    inOutSine: function (t) {
	        return -0.5 * (Math.cos(Math.PI * t) - 1);
	    },
	    inExpo: function (t) {
	        return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
	    },
	    outExpo: function (t) {
	        return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
	    },
	    inOutExpo: function (t) {
	        if (t === 0)
	            return 0;
	        if (t === 1)
	            return 1;
	        if ((t /= 0.5) < 1)
	            return 0.5 * Math.pow(2, 10 * (t - 1));
	        return 0.5 * (-Math.pow(2, -10 * --t) + 2);
	    },
	    inCirc: function (t) {
	        return -(Math.sqrt(1 - t * t) - 1);
	    },
	    outCirc: function (t) {
	        return Math.sqrt(1 - --t * t);
	    },
	    inOutCirc: function (t) {
	        if ((t /= 0.5) < 1)
	            return -0.5 * (Math.sqrt(1 - t * t) - 1);
	        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	    },
	    inElastic: function (t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t === 0)
	            return 0;
	        if (t === 1)
	            return 1;
	        if (!p)
	            p = 0.3;
	        s = p / (2 * Math.PI) * Math.asin(1 / a);
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	    },
	    outElastic: function (t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t === 0)
	            return 0;
	        if (t === 1)
	            return 1;
	        if (!p)
	            p = 0.3;
	        s = p / (2 * Math.PI) * Math.asin(1 / a);
	        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
	    },
	    inOutElastic: function (t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t === 0)
	            return 0;
	        if ((t /= 0.5) === 2)
	            return 1;
	        if (!p)
	            p = 0.3 * 1.5;
	        s = p / (2 * Math.PI) * Math.asin(1 / a);
	        if (t < 1)
	            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
	    },
	    inBack: function (t, s) {
	        if (s === undefined)
	            s = 1.70158;
	        return t * t * ((s + 1) * t - s);
	    },
	    outBack: function (t, s) {
	        if (s === undefined)
	            s = 1.70158;
	        return --t * t * ((s + 1) * t + s) + 1;
	    },
	    inOutBack: function (t, s) {
	        if (s === undefined)
	            s = 1.70158;
	        if ((t /= 0.5) < 1)
	            return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
	        return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
	    },
	    inBounce: function (t) {
	        return 1 - Easing.outBounce(1 - t);
	    },
	    outBounce: function (t) {
	        if (t < 1 / 2.75) {
	            return 7.5625 * t * t;
	        } else if (t < 2 / 2.75) {
	            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
	        } else if (t < 2.5 / 2.75) {
	            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
	        } else {
	            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
	        }
	    },
	    inOutBounce: function (t) {
	        if (t < 0.5)
	            return Easing.inBounce(t * 2) * 0.5;
	        return Easing.outBounce(t * 2 - 1) * 0.5 + 0.5;
	    }
	};
	module.exports = Easing;

/***/ },
/* 9 */
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 19)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!./styles.css */ 10));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 10 */
/*!************************************!*\
  !*** ../~/css-loader!./styles.css ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"body, div {\n  font-family: \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;\n\n  /* prevent text selection */\n  -moz-user-select: -moz-none;\n \t-khtml-user-select: none;\n \t-webkit-user-select: none;\n \t-ms-user-select: none;\n \tuser-select: none;\n}\nbody {\n  background-color: #333333;\n}\n\n.frame.background {\n  -background-color: #333333;\n  background-color: white;\n}\n.frame.background.inner {\n  background-color: #FAFAFA;\n}\n\n.view.background {\n  background-color: #FAFAFA;\n}\n.view.image {\n  border-radius: 50%;\n}\n.view.text {\n  text-align: center;\n  font-size: 16px;\n}\n\n.view.navbar.title > div, .view.profile.name > div {\n  text-align: center;\n  font-size: 18px;\n  color: #444444;\n  /* align vertical */\n  display: block;\n  position: relative;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n.view.profile.text {\n  padding: 0 25px;\n  font-size: 16px;\n  color: #888888;\n}\n.view.navbar.title > div {\n  color: #666666;\n}\n.view.navbar.background {\n  background-color: #EEEEEE;\n  border-bottom: 1px solid #DDDDDD;\n}\n";

/***/ },
/* 11 */
/*!***********************************!*\
  !*** ../~/famous/core/famous.css ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 19)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!../~/famous/core/famous.css */ 12));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 12 */
/*!***************************************************!*\
  !*** ../~/css-loader!../~/famous/core/famous.css ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2015\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    opacity: .999999; /* ios8 hotfix */\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n";

/***/ },
/* 13 */
/*!***************************************************!*\
  !*** ../~/famous-flex/src/AnimationController.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2015
	 */
	
	/**
	 * Animating between famo.us views in awesome ways.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var View = __webpack_require__(/*! famous/core/View */ 15);
	    var LayoutController = __webpack_require__(/*! ./LayoutController */ 17);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 32);
	    var Modifier = __webpack_require__(/*! famous/core/Modifier */ 33);
	    var StateModifier = __webpack_require__(/*! famous/modifiers/StateModifier */ 34);
	    var RenderNode = __webpack_require__(/*! famous/core/RenderNode */ 30);
	    var Timer = __webpack_require__(/*! famous/utilities/Timer */ 35);
	    var Easing = __webpack_require__(/*! famous/transitions/Easing */ 8);
	
	    /**
	     * @class
	     * @param {Object} [options] Configurable options.
	     * @param {Object} [options.transition] Transition options (default: `{duration: 400, curve: Easing.inOutQuad}`).
	     * @param {Function} [options.animation] Animation function (default: `AnimationController.Animation.Slide.Left`).
	     * @param {Number} [options.zIndexOffset] Optional z-index difference between the hiding & showing renderable (default: 0).
	     * @param {Object} [options.show] Show specific options.
	     * @param {Object} [options.show.transition] Show specific transition options.
	     * @param {Function} [options.show.animation] Show specific animation function.
	     * @param {Object} [options.hide] Hide specific options.
	     * @param {Object} [options.hide.transition] Hide specific transition options.
	     * @param {Function} [options.hide.animation] Hide specific animation function.
	     * @param {Object} [options.transfer] Transfer options.
	     * @param {Object} [options.transfer.transition] Transfer specific transition options.
	     * @param {Number} [options.transfer.zIndex] Z-index the tranferables are moved on top while animating (default: 10).
	     * @param {Bool} [options.transfer.fastResize] When enabled, scales the renderable i.s.o. resizing when doing the transfer animation (default: true).
	     * @param {Array} [options.transfer.items] Ids (key/value) pairs (source-id/target-id) of the renderables that should be transferred.
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
	
	    /**
	     * Out of the box supported animations.
	     */
	    AnimationController.Animation = {
	        Slide: {
	            Left: function(show, size) {
	                return {transform: Transform.translate(show ? size[0] : -size[0], 0, 0)};
	            },
	            Right: function(show, size) {
	                return {transform: Transform.translate(show ? -size[0] : size[0], 0, 0)};
	            },
	            Up: function(show, size) {
	                return {transform: Transform.translate(0, show ? size[1] : -size[1], 0)};
	            },
	            Down: function(show, size) {
	                return {transform: Transform.translate(0, show ? -size[1] : size[1], 0)};
	            }
	        },
	        Fade: function(show, size) {
	            return {
	                opacity: (this && (this.opacity !== undefined)) ? this.opacity : 0
	            };
	        },
	        Zoom: function(show, size) {
	            var scale = (this && (this.scale !== undefined)) ? this.scale : 0.5;
	            return {
	                transform: Transform.scale(scale, scale, 1),
	                align: [0.5, 0.5],
	                origin: [0.5, 0.5]
	            };
	        },
	        FadedZoom: function(show, size) {
	            var scale = show ? ((this && (this.showScale !== undefined)) ? this.showScale : 0.9) : ((this && (this.hideScale !== undefined)) ? this.hideScale : 1.1);
	            return {
	                opacity: (this && (this.opacity !== undefined)) ? this.opacity : 0,
	                transform: Transform.scale(scale, scale, 1),
	                align: [0.5, 0.5],
	                origin: [0.5, 0.5]
	            };
	        }
	        /*,
	        Flip: {
	            Left: function(show, size) {
	                return {transform: Transform.rotate(0, show ? Math.PI : -Math.PI, 0)};
	            },
	            Right: function(show, size) {
	                return {transform: Transform.rotate(0, show ? -Math.PI : Math.PI, 0)};
	            },
	            Up: function(show, size) {
	                return {transform: Transform.rotate(show ? Math.PI : -Math.PI, 0, 0)};
	            },
	            Down: function(show, size) {
	                return {transform: Transform.rotate(show ? -Math.PI : Math.PI, 0, 0)};
	            }
	        }*/
	    };
	
	    AnimationController.DEFAULT_OPTIONS = {
	        transition: {duration: 400, curve: Easing.inOutQuad},
	        animation: AnimationController.Animation.Fade,
	        show: {
	            // transition,
	            // animation
	        },
	        hide: {
	            // transition,
	            // animation
	        },
	        transfer: {
	            fastResize: true,
	            zIndex: 10 // z-index offset the items are translated while transferring
	            // transition,
	            // items: {
	            //   'image': 'image'
	            //   'image': ['image', 'image2']
	            // }
	        },
	        zIndexOffset: 0
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
	                        for (var k = 0; k < item.transferables.length; k++) {
	                            if (transferables[j].renderNode === item.transferables[k].renderNode) {
	                                context.set(transferables[j], {
	                                    translate: [0, 0, set.translate[2]],
	                                    size: [context.size[0], context.size[1]]
	                                });
	                            }
	                        }
	                    }
	
	                    // Increase z-index for next view
	                    set.translate[2] += options.zIndexOffset;
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
	        // 1. If view supports getTransferable, use that
	        if (view.getTransferable) {
	            return view.getTransferable(id);
	        }
	        // 2. If view is derived from layoutcontroller, use that
	        if (view.getSpec && view.get && view.replace) {
	            if (view.get(id) !== undefined) {
	                return {
	                    get: function() {
	                        return view.get(id);
	                    },
	                    show: function(renderable) {
	                        view.replace(id, renderable);
	                    },
	                    getSpec: _getViewSpec.bind(this, item, view, id)
	                };
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
	        var target = item.options.transfer.items[sourceId];
	        var transferable = {};
	        transferable.source = _getTransferable.call(this, prevItem, prevItem.view, sourceId);
	        if (Array.isArray(target)) {
	            for (var i = 0; i < target.length; i++) {
	                transferable.target = _getTransferable.call(this, item, item.view, target[i]);
	                if (transferable.target) {
	                    break;
	                }
	            }
	        }
	        else {
	            transferable.target = _getTransferable.call(this, item, item.view, target);
	        }
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
	                item.transferables.push(transferable);
	                this._renderables.transferables.push(transferable.renderNode);
	                this.layout.reflowLayout();
	
	                // Wait for the target spec to have settled. This may take a couple render
	                // cycles if for instance, this involves a true-size renderable or the
	                // renderable is affected by other true-size renderables around itsself.
	                Timer.after(function() {
	                    transferable.target.getSpec(function(targetSpec, transition) {
	                        mod.halt();
	                        if ((sourceSpec.opacity !== undefined) || (targetSpec.opacity !== undefined)) {
	                            mod.setOpacity((targetSpec.opacity === undefined) ? 1 : targetSpec.opacity, transition|| item.options.transfer.transition);
	                        }
	                        if (item.options.transfer.fastResize) {
	                            if (sourceSpec.transform || targetSpec.transform || sourceSpec.size || targetSpec.size) {
	                                var transform = targetSpec.transform || Transform.identity;
	                                if (sourceSpec.size && targetSpec.size) {
	                                    transform = Transform.multiply(transform, Transform.scale(targetSpec.size[0] / sourceSpec.size[0], targetSpec.size[1] / sourceSpec.size[1], 1));
	                                }
	                                mod.setTransform(transform, transition || item.options.transfer.transition);
	                            }
	                        }
	                        else {
	                            if (sourceSpec.transform || targetSpec.transform) {
	                                mod.setTransform(targetSpec.transform || Transform.identity, transition || item.options.transfer.transition);
	                            }
	                            if (sourceSpec.size || targetSpec.size) {
	                                mod.setSize(targetSpec.size || sourceSpec.size, transition || item.options.transfer.transition);
	                            }
	                        }
	                    }, true);
	                }, 1);
	            }.bind(this), false);
	        }
	    }
	
	    /**
	     * Called whenever the view has been shown and the
	     * transferable animations should be ended. This returns
	     * the renderables to their original views.
	     */
	    function _endTransferableAnimations(item) {
	        for (var j = 0; j < item.transferables.length; j++) {
	            var transferable = item.transferables[j];
	            for (var i = 0; i < this._renderables.transferables.length; i++) {
	                if (this._renderables.transferables[i] === transferable.renderNode) {
	                    this._renderables.transferables.splice(i, 1);
	                    break;
	                }
	            }
	            transferable.source.show(transferable.originalSource);
	            transferable.target.show(transferable.originalTarget);
	        }
	        item.transferables = [];
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
	        var animation = show ? item.options.show.animation : item.options.hide.animation;
	        var spec = animation ? animation.call(undefined, show, size) : {};
	        item.mod.halt();
	        var callback;
	        if (show) {
	            callback = item.showCallback;
	            if (spec.transform) {
	                item.mod.setTransform(spec.transform);
	                item.mod.setTransform(Transform.identity, item.options.show.transition, callback);
	                callback = undefined;
	            }
	            if (spec.opacity !== undefined) {
	                item.mod.setOpacity(spec.opacity);
	                item.mod.setOpacity(1, item.options.show.transition, callback);
	                callback = undefined;
	            }
	            if (spec.align) {
	                item.mod.setAlign(spec.align);
	            }
	            if (spec.origin) {
	                item.mod.setOrigin(spec.origin);
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
	            if (spec.transform) {
	                item.mod.setTransform(spec.transform, item.options.hide.transition, callback);
	                callback = undefined;
	            }
	            if (spec.opacity !== undefined) {
	                item.mod.setOpacity(spec.opacity, item.options.hide.transition, callback);
	                callback = undefined;
	            }
	            if (callback) {
	                callback();
	            }
	        }
	    }
	
	    /**
	     * Sets the options for an item.
	     */
	    function _setItemOptions(item, options) {
	        item.options = {
	            show: {
	                transition: this.options.show.transition || this.options.transition,
	                animation: this.options.show.animation || this.options.animation
	            },
	            hide: {
	                transition: this.options.hide.transition || this.options.transition,
	                animation: this.options.hide.animation || this.options.animation
	            },
	            transfer: {
	                transition: this.options.transfer.transition || this.options.transition,
	                items: this.options.transfer.items || {},
	                zIndex: this.options.transfer.zIndex,
	                fastResize: this.options.transfer.fastResize
	            }
	        };
	        if (options) {
	            item.options.show.transition = (options.show ? options.show.transition : undefined) || options.transition || item.options.show.transition;
	            if (options && options.show && (options.show.animation !== undefined)) {
	                item.options.show.animation = options.show.animation;
	            }
	            else if (options && (options.animation !== undefined)) {
	                item.options.show.animation = options.animation;
	            }
	            item.options.transfer.transition = (options.transfer ? options.transfer.transition : undefined) || options.transition || item.options.transfer.transition;
	            item.options.transfer.items = (options.transfer ? options.transfer.items : undefined) || item.options.transfer.items;
	            item.options.transfer.zIndex = (options.transfer && (options.transfer.zIndex !== undefined)) ? options.transfer.zIndex : item.options.transfer.zIndex;
	            item.options.transfer.fastResize = (options.transfer && (options.transfer.fastResize !== undefined)) ? options.transfer.fastResize : item.options.transfer.fastResize;
	        }
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
	     * shown in that sequence. Use `.halt` to cancel any pending show
	     * operations from the queue.
	     *
	     * @param {Renderable} renderable View or surface to show
	     * @param {Object} [options] Options.
	     * @param {Object} [options.transition] Transition options for both show & hide.
	     * @param {Function} [options.animation] Animation function for both show & hide.
	     * @param {Object} [options.show] Show specific options.
	     * @param {Object} [options.show.transition] Show specific transition options.
	     * @param {Function} [options.show.animation] Show specific animation function.
	     * @param {Object} [options.hide] Hide specific options.
	     * @param {Object} [options.hide.transition] Hide specific transition options.
	     * @param {Function} [options.hide.animation] Hide specific animation function.
	     * @param {Object} [options.transfer] Transfer options.
	     * @param {Object} [options.transfer.transition] Transfer specific transition options.
	     * @param {Number} [options.transfer.zIndex] Z-index the tranferables are moved on top while animating.
	     * @param {Array} [options.transfer.items] Ids (key/value) pairs (source-id/target-id) of the renderables that should be transferred.
	     * @param {Function} [callback] Function that is called on completion.
	     * @return {AnimationController} this
	     */
	    AnimationController.prototype.show = function(renderable, options, callback) {
	        if (!renderable) {
	            return this.hide(options, callback);
	        }
	        var item = this._viewStack.length ? this._viewStack[this._viewStack.length - 1] : undefined;
	        if (item && (item.view === renderable)) {
	            item.hide = false;
	            if (item.state === ItemState.HIDE) {
	                item.state = ItemState.QUEUED;
	                _setItemOptions.call(this, item, options);
	                _updateState.call(this);
	            }
	            return this;
	        }
	        if (item && (item.state !== ItemState.HIDING) && options) {
	            item.options.hide.transition = (options.hide ? options.hide.transition : undefined) || options.transition || item.options.hide.transition;
	            if (options && options.hide && (options.hide.animation !== undefined)) {
	                item.options.hide.animation = options.hide.animation;
	            }
	            else if (options && (options.animation !== undefined)) {
	                item.options.hide.animation = options.animation;
	            }
	        }
	
	        item = {
	            view: renderable,
	            mod: new StateModifier(),
	            state: ItemState.QUEUED,
	            callback: callback,
	            transferables: [] // renderables currently being transfered
	        };
	        item.node = new RenderNode(item.mod);
	        item.node.add(renderable);
	        _setItemOptions.call(this, item, options);
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
	            this.layout.reflowLayout();
	        }.bind(this);
	        this._renderables.views.push(item.node);
	        this._viewStack.push(item);
	        _updateState.call(this);
	        return this;
	    };
	
	    /**
	     * Hides the current view with an animation.
	     *
	     * @param {Object} [options] Hide options
	     * @param {Object} [options.transition] Hide transition options.
	     * @param {Function} [options.animation] Hide animation function.
	     * @param {Function} [callback] Function that is called an completion.
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
	            if (options && options.hide && (options.hide.animation !== undefined)) {
	                item.options.hide.animation = options.hide.animation;
	            }
	            else if (options && (options.animation !== undefined)) {
	                item.options.hide.animation = options.animation;
	            }
	        }
	        item.hideCallback = function() {
	            var index = this._viewStack.indexOf(item);
	            this._renderables.views.splice(index, 1);
	            this._viewStack.splice(index, 1);
	            item.view = undefined;
	            _updateState.call(this);
	            this.layout.reflowLayout();
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
	        return this;
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/*!***************************************!*\
  !*** ../~/fastclick/lib/fastclick.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 15 */
/*!********************************!*\
  !*** ../~/famous/core/View.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 28);
	var OptionsManager = __webpack_require__(/*! ./OptionsManager */ 29);
	var RenderNode = __webpack_require__(/*! ./RenderNode */ 30);
	var Utility = __webpack_require__(/*! ../utilities/Utility */ 31);
	function View(options) {
	    this._node = new RenderNode();
	    this._eventInput = new EventHandler();
	    this._eventOutput = new EventHandler();
	    EventHandler.setInputHandler(this, this._eventInput);
	    EventHandler.setOutputHandler(this, this._eventOutput);
	    this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
	    this._optionsManager = new OptionsManager(this.options);
	    if (options)
	        this.setOptions(options);
	}
	View.DEFAULT_OPTIONS = {};
	View.prototype.getOptions = function getOptions(key) {
	    return this._optionsManager.getOptions(key);
	};
	View.prototype.setOptions = function setOptions(options) {
	    this._optionsManager.patch(options);
	};
	View.prototype.add = function add() {
	    return this._node.add.apply(this._node, arguments);
	};
	View.prototype._add = View.prototype.add;
	View.prototype.render = function render() {
	    return this._node.render();
	};
	View.prototype.getSize = function getSize() {
	    if (this._node && this._node.getSize) {
	        return this._node.getSize.apply(this._node, arguments) || this.options.size;
	    } else
	        return this.options.size;
	};
	module.exports = View;

/***/ },
/* 16 */
/*!***********************************!*\
  !*** ../~/famous/core/Surface.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var ElementOutput = __webpack_require__(/*! ./ElementOutput */ 36);
	function Surface(options) {
	    ElementOutput.call(this);
	    this.options = {};
	    this.properties = {};
	    this.attributes = {};
	    this.content = '';
	    this.classList = [];
	    this.size = null;
	    this._classesDirty = true;
	    this._stylesDirty = true;
	    this._attributesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._trueSizeCheck = true;
	    this._dirtyClasses = [];
	    if (options)
	        this.setOptions(options);
	    this._currentTarget = null;
	}
	Surface.prototype = Object.create(ElementOutput.prototype);
	Surface.prototype.constructor = Surface;
	Surface.prototype.elementType = 'div';
	Surface.prototype.elementClass = 'famous-surface';
	Surface.prototype.setAttributes = function setAttributes(attributes) {
	    for (var n in attributes) {
	        if (n === 'style')
	            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
	        this.attributes[n] = attributes[n];
	    }
	    this._attributesDirty = true;
	};
	Surface.prototype.getAttributes = function getAttributes() {
	    return this.attributes;
	};
	Surface.prototype.setProperties = function setProperties(properties) {
	    for (var n in properties) {
	        this.properties[n] = properties[n];
	    }
	    this._stylesDirty = true;
	    return this;
	};
	Surface.prototype.getProperties = function getProperties() {
	    return this.properties;
	};
	Surface.prototype.addClass = function addClass(className) {
	    if (this.classList.indexOf(className) < 0) {
	        this.classList.push(className);
	        this._classesDirty = true;
	    }
	    return this;
	};
	Surface.prototype.removeClass = function removeClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
	        this._classesDirty = true;
	    }
	    return this;
	};
	Surface.prototype.toggleClass = function toggleClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this.removeClass(className);
	    } else {
	        this.addClass(className);
	    }
	    return this;
	};
	Surface.prototype.setClasses = function setClasses(classList) {
	    var i = 0;
	    var removal = [];
	    for (i = 0; i < this.classList.length; i++) {
	        if (classList.indexOf(this.classList[i]) < 0)
	            removal.push(this.classList[i]);
	    }
	    for (i = 0; i < removal.length; i++)
	        this.removeClass(removal[i]);
	    for (i = 0; i < classList.length; i++)
	        this.addClass(classList[i]);
	    return this;
	};
	Surface.prototype.getClassList = function getClassList() {
	    return this.classList;
	};
	Surface.prototype.setContent = function setContent(content) {
	    if (this.content !== content) {
	        this.content = content;
	        this._contentDirty = true;
	    }
	    return this;
	};
	Surface.prototype.getContent = function getContent() {
	    return this.content;
	};
	Surface.prototype.setOptions = function setOptions(options) {
	    if (options.size)
	        this.setSize(options.size);
	    if (options.classes)
	        this.setClasses(options.classes);
	    if (options.properties)
	        this.setProperties(options.properties);
	    if (options.attributes)
	        this.setAttributes(options.attributes);
	    if (options.content)
	        this.setContent(options.content);
	    return this;
	};
	function _cleanupClasses(target) {
	    for (var i = 0; i < this._dirtyClasses.length; i++)
	        target.classList.remove(this._dirtyClasses[i]);
	    this._dirtyClasses = [];
	}
	function _applyStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = this.properties[n];
	    }
	}
	function _cleanupStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = '';
	    }
	}
	function _applyAttributes(target) {
	    for (var n in this.attributes) {
	        target.setAttribute(n, this.attributes[n]);
	    }
	}
	function _cleanupAttributes(target) {
	    for (var n in this.attributes) {
	        target.removeAttribute(n);
	    }
	}
	function _xyNotEquals(a, b) {
	    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
	}
	Surface.prototype.setup = function setup(allocator) {
	    var target = allocator.allocate(this.elementType);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (var i = 0; i < this.elementClass.length; i++) {
	                target.classList.add(this.elementClass[i]);
	            }
	        } else {
	            target.classList.add(this.elementClass);
	        }
	    }
	    target.style.display = '';
	    this.attach(target);
	    this._opacity = null;
	    this._currentTarget = target;
	    this._stylesDirty = true;
	    this._classesDirty = true;
	    this._attributesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._originDirty = true;
	    this._transformDirty = true;
	};
	Surface.prototype.commit = function commit(context) {
	    if (!this._currentTarget)
	        this.setup(context.allocator);
	    var target = this._currentTarget;
	    var size = context.size;
	    if (this._classesDirty) {
	        _cleanupClasses.call(this, target);
	        var classList = this.getClassList();
	        for (var i = 0; i < classList.length; i++)
	            target.classList.add(classList[i]);
	        this._classesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this._stylesDirty) {
	        _applyStyles.call(this, target);
	        this._stylesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this._attributesDirty) {
	        _applyAttributes.call(this, target);
	        this._attributesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this.size) {
	        var origSize = context.size;
	        size = [
	            this.size[0],
	            this.size[1]
	        ];
	        if (size[0] === undefined)
	            size[0] = origSize[0];
	        if (size[1] === undefined)
	            size[1] = origSize[1];
	        if (size[0] === true || size[1] === true) {
	            if (size[0] === true) {
	                if (this._trueSizeCheck || this._size[0] === 0) {
	                    var width = target.offsetWidth;
	                    if (this._size && this._size[0] !== width) {
	                        this._size[0] = width;
	                        this._sizeDirty = true;
	                    }
	                    size[0] = width;
	                } else {
	                    if (this._size)
	                        size[0] = this._size[0];
	                }
	            }
	            if (size[1] === true) {
	                if (this._trueSizeCheck || this._size[1] === 0) {
	                    var height = target.offsetHeight;
	                    if (this._size && this._size[1] !== height) {
	                        this._size[1] = height;
	                        this._sizeDirty = true;
	                    }
	                    size[1] = height;
	                } else {
	                    if (this._size)
	                        size[1] = this._size[1];
	                }
	            }
	            this._trueSizeCheck = false;
	        }
	    }
	    if (_xyNotEquals(this._size, size)) {
	        if (!this._size)
	            this._size = [
	                0,
	                0
	            ];
	        this._size[0] = size[0];
	        this._size[1] = size[1];
	        this._sizeDirty = true;
	    }
	    if (this._sizeDirty) {
	        if (this._size) {
	            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
	            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
	        }
	        this._eventOutput.emit('resize');
	    }
	    if (this._contentDirty) {
	        this.deploy(target);
	        this._eventOutput.emit('deploy');
	        this._contentDirty = false;
	        this._trueSizeCheck = true;
	    }
	    ElementOutput.prototype.commit.call(this, context);
	};
	Surface.prototype.cleanup = function cleanup(allocator) {
	    var i = 0;
	    var target = this._currentTarget;
	    this._eventOutput.emit('recall');
	    this.recall(target);
	    target.style.display = 'none';
	    target.style.opacity = '';
	    target.style.width = '';
	    target.style.height = '';
	    _cleanupStyles.call(this, target);
	    _cleanupAttributes.call(this, target);
	    var classList = this.getClassList();
	    _cleanupClasses.call(this, target);
	    for (i = 0; i < classList.length; i++)
	        target.classList.remove(classList[i]);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (i = 0; i < this.elementClass.length; i++) {
	                target.classList.remove(this.elementClass[i]);
	            }
	        } else {
	            target.classList.remove(this.elementClass);
	        }
	    }
	    this.detach(target);
	    this._currentTarget = null;
	    allocator.deallocate(target);
	};
	Surface.prototype.deploy = function deploy(target) {
	    var content = this.getContent();
	    if (content instanceof Node) {
	        while (target.hasChildNodes())
	            target.removeChild(target.firstChild);
	        target.appendChild(content);
	    } else
	        target.innerHTML = content;
	};
	Surface.prototype.recall = function recall(target) {
	    var df = document.createDocumentFragment();
	    while (target.hasChildNodes())
	        df.appendChild(target.firstChild);
	    this.setContent(df);
	};
	Surface.prototype.getSize = function getSize() {
	    return this._size ? this._size : this.size;
	};
	Surface.prototype.setSize = function setSize(size) {
	    this.size = size ? [
	        size[0],
	        size[1]
	    ] : null;
	    this._sizeDirty = true;
	    return this;
	};
	module.exports = Surface;

/***/ },
/* 17 */
/*!************************************************!*\
  !*** ../~/famous-flex/src/LayoutController.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/*global console*/
	/*eslint no-console: 0*/
	
	/**
	 * LayoutController lays out renderables according to a layout-
	 * function and a data-source.
	 *
	 * Events:
	 *
	 * |event      |description|
	 * |-----------|-----------|
	 * |layoutstart|Emitted before the layout function is executed.|
	 * |layoutend  |Emitted after the layout function has been executed.|
	 * |reflow     |Emitted after one or more renderables have been changed.|
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 31);
	    var Entity = __webpack_require__(/*! famous/core/Entity */ 37);
	    var ViewSequence = __webpack_require__(/*! famous/core/ViewSequence */ 38);
	    var OptionsManager = __webpack_require__(/*! famous/core/OptionsManager */ 29);
	    var EventHandler = __webpack_require__(/*! famous/core/EventHandler */ 28);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 39);
	    var LayoutNodeManager = __webpack_require__(/*! ./LayoutNodeManager */ 40);
	    var LayoutNode = __webpack_require__(/*! ./LayoutNode */ 41);
	    var FlowLayoutNode = __webpack_require__(/*! ./FlowLayoutNode */ 42);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 32);
	    __webpack_require__(/*! ./helpers/LayoutDockHelper */ 18);
	
	    /**
	     * @class
	     * @param {Object} options Options.
	     * @param {Function|Object} [options.layout] Layout function or layout-literal.
	     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
	     * @param {Bool} [options.flow] Enables flow animations when the layout changes (default: `false`).
	     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
	     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
	     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
	     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
	     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
	     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
	     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
	     * @param {Bool} [options.autoPipeEvents] When set to true, automatically calls .pipe on all renderables when inserted (default: `false`).
	     * @param {Object} [options.preallocateNodes] Optimisation option to improve initial scrolling/animation performance by pre-allocating nodes, e.g.: `{count: 50, spec: {size:[0, 0], transform: Transform.identity}}`.
	     * @alias module:LayoutController
	     */
	    function LayoutController(options, nodeManager) {
	
	        // Commit
	        this.id = Entity.register(this);
	        this._isDirty = true;
	        this._contextSizeCache = [0, 0];
	        this._commitOutput = {};
	
	        // Create an object to we can capture the famo.us cleanup call on
	        // LayoutController.
	        this._cleanupRegistration = {
	          commit: function() {
	              return undefined;
	          },
	          cleanup: function(context) {
	              this.cleanup(context);
	          }.bind(this)
	        };
	        this._cleanupRegistration.target = Entity.register(this._cleanupRegistration);
	        this._cleanupRegistration.render = function() {
	          return this.target;
	        }.bind(this._cleanupRegistration);
	
	        // Setup input event handler
	        this._eventInput = new EventHandler();
	        EventHandler.setInputHandler(this, this._eventInput);
	
	        // Setup event handlers
	        this._eventOutput = new EventHandler();
	        EventHandler.setOutputHandler(this, this._eventOutput);
	
	        // Data-source
	        //this._dataSource = undefined;
	        //this._nodesById = undefined;
	        //this._viewSequence = undefined;
	
	        // Layout
	        this._layout = {
	            //function: undefined,
	            //literal: undefined,
	            //capabilities: undefined,
	            options: Object.create({})
	        };
	        //this._direction = undefined;
	        this._layout.optionsManager = new OptionsManager(this._layout.options);
	        this._layout.optionsManager.on('change', function() {
	            this._isDirty = true;
	        }.bind(this));
	
	        // Create options
	        this.options = Object.create(LayoutController.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	
	        // Create node manager that manages (Flow)LayoutNode instances
	        if (nodeManager) {
	            this._nodes = nodeManager;
	        }
	        else if (options && options.flow) {
	            this._nodes = new LayoutNodeManager(FlowLayoutNode, _initFlowLayoutNode.bind(this));
	        }
	        else {
	            this._nodes = new LayoutNodeManager(LayoutNode);
	        }
	
	        // Set options
	        this.setDirection(undefined);
	        if (options) {
	            this.setOptions(options);
	        }
	    }
	
	    LayoutController.DEFAULT_OPTIONS = {
	        flow: false,
	        flowOptions: {
	            reflowOnResize: true,
	            properties: {
	                opacity: true,
	                align: true,
	                origin: true,
	                size: true,
	                translate: true,
	                skew: true,
	                rotate: true,
	                scale: true
	            },
	            spring: {
	                dampingRatio: 0.8,
	                period: 300
	            }
	            /*insertSpec: {
	                opacity: undefined,
	                size: undefined,
	                transform: undefined,
	                origin: undefined,
	                align: undefined
	            },
	            removeSpec: {
	                opacity: undefined,
	                size: undefined,
	                transform: undefined,
	                origin: undefined,
	                align: undefined
	            }*/
	        }
	    };
	
	    /**
	     * Called whenever a layout-node is created/re-used. Initializes
	     * the node with the `insertSpec` if it has been defined.
	     */
	    function _initFlowLayoutNode(node, spec) {
	        if (!spec && this.options.flowOptions.insertSpec) {
	            node.setSpec(this.options.flowOptions.insertSpec);
	        }
	    }
	
	    /**
	     * Patches the LayoutController instance's options with the passed-in ones.
	     *
	     * @param {Options} options An object of configurable options for the LayoutController instance.
	     * @param {Function|Object} [options.layout] Layout function or layout-literal.
	     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
	     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
	     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
	     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
	     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
	     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
	     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
	     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setOptions = function(options) {
	        if ((options.alignment !== undefined) && (options.alignment !== this.options.alignment)) {
	            this._isDirty = true;
	        }
	        this._optionsManager.setOptions(options);
	        if (options.nodeSpring) {
	            console.warn('nodeSpring options have been moved inside `flowOptions`. Use `flowOptions.spring` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    spring: options.nodeSpring
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.reflowOnResize !== undefined) {
	            console.warn('reflowOnResize options have been moved inside `flowOptions`. Use `flowOptions.reflowOnResize` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    reflowOnResize: options.reflowOnResize
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.insertSpec) {
	            console.warn('insertSpec options have been moved inside `flowOptions`. Use `flowOptions.insertSpec` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    insertSpec: options.insertSpec
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.removeSpec) {
	            console.warn('removeSpec options have been moved inside `flowOptions`. Use `flowOptions.removeSpec` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    removeSpec: options.removeSpec
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.dataSource) {
	            this.setDataSource(options.dataSource);
	        }
	        if (options.layout) {
	            this.setLayout(options.layout, options.layoutOptions);
	        }
	        else if (options.layoutOptions) {
	            this.setLayoutOptions(options.layoutOptions);
	        }
	        if (options.direction !== undefined) {
	            this.setDirection(options.direction);
	        }
	        if (options.flowOptions && this.options.flow) {
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.preallocateNodes) {
	            this._nodes.preallocateNodes(options.preallocateNodes.count || 0, options.preallocateNodes.spec);
	        }
	        return this;
	    };
	
	    /**
	     * Helper function to enumerate all the renderables in the datasource
	     */
	    function _forEachRenderable(callback) {
	        var dataSource = this._dataSource;
	        if (dataSource instanceof Array) {
	            for (var i = 0, j = dataSource.length; i < j; i++) {
	                callback(dataSource[i]);
	            }
	        }
	        else if (dataSource instanceof ViewSequence) {
	            var renderable;
	            while (dataSource) {
	                renderable = dataSource.get();
	                if (!renderable) {
	                    break;
	                }
	                callback(renderable);
	                dataSource = dataSource.getNext();
	            }
	        }
	        else {
	            for (var key in dataSource) {
	                callback(dataSource[key]);
	            }
	        }
	    }
	
	    /**
	     * Sets the collection of renderables which are layed out according to
	     * the layout-function.
	     *
	     * The data-source can be either an Array, ViewSequence or Object
	     * with key/value pairs.
	     *
	     * @param {Array|Object|ViewSequence} dataSource Array, ViewSequence or Object.
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setDataSource = function(dataSource) {
	        this._dataSource = dataSource;
	        this._initialViewSequence = undefined;
	        this._nodesById = undefined;
	        if (dataSource instanceof Array) {
	            this._viewSequence = new ViewSequence(dataSource);
	            this._initialViewSequence = this._viewSequence;
	        }
	        else if ((dataSource instanceof ViewSequence) || dataSource.getNext) {
	            this._viewSequence = dataSource;
	            this._initialViewSequence = dataSource;
	        }
	        else if (dataSource instanceof Object){
	            this._nodesById = dataSource;
	        }
	        if (this.options.autoPipeEvents) {
	            if (this._dataSource.pipe) {
	                this._dataSource.pipe(this);
	                this._dataSource.pipe(this._eventOutput);
	            }
	            else {
	                _forEachRenderable.call(this, function(renderable) {
	                    if (renderable && renderable.pipe) {
	                        renderable.pipe(this);
	                        renderable.pipe(this._eventOutput);
	                    }
	                }.bind(this));
	            }
	        }
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Get the data-source.
	     *
	     * @return {Array|ViewSequence|Object} data-source
	     */
	    LayoutController.prototype.getDataSource = function() {
	        return this._dataSource;
	    };
	
	    /**
	     * Set the new layout.
	     *
	     * @param {Function|Object} layout Layout function or layout-literal
	     * @param {Object} [options] Options to pass in to the layout-function
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setLayout = function(layout, options) {
	
	        // Set new layout funtion
	        if (layout instanceof Function) {
	            this._layout._function = layout;
	            this._layout.capabilities = layout.Capabilities;
	            this._layout.literal = undefined;
	
	        // If the layout is an object, treat it as a layout-literal
	        }
	        else if (layout instanceof Object) {
	            this._layout.literal = layout;
	            this._layout.capabilities = undefined; // todo - derive from literal somehow?
	            var helperName = Object.keys(layout)[0];
	            var Helper = LayoutUtility.getRegisteredHelper(helperName);
	            this._layout._function = Helper ? function(context, options2) {
	                var helper = new Helper(context, options2);
	                helper.parse(layout[helperName]);
	            } : undefined;
	        }
	        else {
	            this._layout._function = undefined;
	            this._layout.capabilities = undefined;
	            this._layout.literal = undefined;
	        }
	
	        // Update options
	        if (options) {
	            this.setLayoutOptions(options);
	        }
	
	        // Update direction
	        this.setDirection(this._configuredDirection);
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Get the current layout.
	     *
	     * @return {Function|Object} Layout function or layout literal
	     */
	    LayoutController.prototype.getLayout = function() {
	        return this._layout.literal || this._layout._function;
	    };
	
	    /**
	     * Set the options for the current layout. Use this function after
	     * `setLayout` to update one or more options for the layout-function.
	     *
	     * @param {Object} [options] Options to pass in to the layout-function
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setLayoutOptions = function(options) {
	        this._layout.optionsManager.setOptions(options);
	        return this;
	    };
	
	    /**
	     * Get the current layout options.
	     *
	     * @return {Object} Layout options
	     */
	    LayoutController.prototype.getLayoutOptions = function() {
	        return this._layout.options;
	    };
	
	    /**
	     * Calculates the actual in-use direction based on the given direction
	     * and supported capabilities of the layout-function.
	     */
	    function _getActualDirection(direction) {
	
	        // When the direction is configured in the capabilities, look it up there
	        if (this._layout.capabilities && this._layout.capabilities.direction) {
	
	            // Multiple directions are supported
	            if (Array.isArray(this._layout.capabilities.direction)) {
	                for (var i = 0; i < this._layout.capabilities.direction.length; i++) {
	                    if (this._layout.capabilities.direction[i] === direction) {
	                        return direction;
	                    }
	                }
	                return this._layout.capabilities.direction[0];
	            }
	
	            // Only one direction is supported, we must use that
	            else {
	                return this._layout.capabilities.direction;
	            }
	        }
	
	        // Use Y-direction as a fallback
	        return (direction === undefined) ? Utility.Direction.Y : direction;
	    }
	
	    /**
	     * Set the direction of the layout. When no direction is set, the default
	     * direction of the layout function is used.
	     *
	     * @param {Utility.Direction} direction Direction (e.g. Utility.Direction.X)
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setDirection = function(direction) {
	        this._configuredDirection = direction;
	        var newDirection = _getActualDirection.call(this, direction);
	        if (newDirection !== this._direction) {
	            this._direction = newDirection;
	            this._isDirty = true;
	        }
	    };
	
	    /**
	     * Get the direction (e.g. Utility.Direction.Y). By default, this function
	     * returns the direction that was configured by setting `setDirection`. When
	     * the direction has not been set, `undefined` is returned.
	     *
	     * When no direction has been set, the first direction is used that is specified
	     * in the capabilities of the layout-function. To obtain the actual in-use direction,
	     * use `getDirection(true)`. This method returns the actual in-use direction and
	     * never returns undefined.
	     *
	     * @param {Boolean} [actual] Set to true to obtain the actual in-use direction
	     * @return {Utility.Direction} Direction or undefined
	     */
	    LayoutController.prototype.getDirection = function(actual) {
	        return actual ? this._direction : this._configuredDirection;
	    };
	
	    /**
	     * Get the spec (size, transform, etc..) for the given renderable or
	     * Id.
	     *
	     * @param {Renderable|String} node Renderabe or Id to look for
	     * @param {Bool} [normalize] When set to `true` normalizes the origin/align into the transform translation (default: `false`).
	     * @param {Bool} [endState] When set to `true` returns the flowing end-state spec rather than the current spec.
	     * @return {Spec} spec or undefined
	     */
	    LayoutController.prototype.getSpec = function(node, normalize, endState) {
	        if (!node) {
	            return undefined;
	        }
	        if ((node instanceof String) || (typeof node === 'string')) {
	            if (!this._nodesById) {
	               return undefined;
	            }
	            node = this._nodesById[node];
	            if (!node) {
	                return undefined;
	            }
	
	            // If the result was an array, return that instead
	            if (node instanceof Array) {
	                return node;
	            }
	        }
	        if (this._specs) {
	            for (var i = 0; i < this._specs.length; i++) {
	                var spec = this._specs[i];
	                if (spec.renderNode === node) {
	                    if (endState && spec.endState) {
	                        spec = spec.endState;
	                    }
	                    // normalize align & origin into transform
	                    if (normalize && spec.transform && spec.size && (spec.align || spec.origin)) {
	                        var transform = spec.transform;
	                        if (spec.align && (spec.align[0] || spec.align[1])) {
	                            transform = Transform.thenMove(transform, [spec.align[0] * this._contextSizeCache[0], spec.align[1] * this._contextSizeCache[1], 0]);
	                        }
	                        if (spec.origin && (spec.origin[0] || spec.origin[1])) {
	                            transform = Transform.moveThen([-spec.origin[0] * spec.size[0], -spec.origin[1] * spec.size[1], 0], transform);
	                        }
	                        return {
	                            opacity: spec.opacity,
	                            size: spec.size,
	                            transform: transform
	                        };
	                    }
	                    return spec;
	                }
	            }
	        }
	        return undefined;
	    };
	
	    /**
	     * Forces a reflow of the layout the next render cycle.
	     *
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.reflowLayout = function() {
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Resets the current flow state, so that all renderables
	     * are immediately displayed in their end-state.
	     *
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.resetFlowState = function() {
	        if (this.options.flow) {
	            this._resetFlowState = true;
	        }
	        return this;
	    };
	
	    /**
	     * Inserts a renderable into the data-source.
	     *
	     * The optional argument `insertSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is inserted using an animation starting with
	     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
	     *
	     * @param {Number|String} indexOrId Index (0 = before first, -1 at end), within dataSource array or id (String)
	     * @param {Object} renderable Renderable to add to the data-source
	     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.insert = function(indexOrId, renderable, insertSpec) {
	
	        // Add the renderable in case of an id (String)
	        if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	
	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = {};
	                this._nodesById = this._dataSource;
	            }
	
	            // Insert renderable
	            if (this._nodesById[indexOrId] === renderable) {
	                return this;
	            }
	            this._nodesById[indexOrId] = renderable;
	        }
	
	        // Add the renderable using an index
	        else {
	
	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = [];
	                this._viewSequence = new ViewSequence(this._dataSource);
	                this._initialViewSequence = this._viewSequence;
	            }
	
	            // Insert into array
	            var dataSource = this._viewSequence || this._dataSource;
	            var array = _getDataSourceArray.call(this);
	            if (array && (indexOrId === array.length)) {
	                indexOrId = -1;
	            }
	            if (indexOrId === -1) {
	                dataSource.push(renderable);
	            }
	            else if (indexOrId === 0) {
	                if (dataSource === this._viewSequence) {
	                    dataSource.splice(0, 0, renderable);
	                    if (this._viewSequence.getIndex() === 0) {
	                        var nextViewSequence = this._viewSequence.getNext();
	                        if (nextViewSequence && nextViewSequence.get()) {
	                            this._viewSequence = nextViewSequence;
	                        }
	                    }
	                }
	                else {
	                    dataSource.splice(0, 0, renderable);
	                }
	            }
	            else {
	                dataSource.splice(indexOrId, 0, renderable);
	            }
	        }
	
	        // When a custom insert-spec was specified, store that in the layout-node
	        if (insertSpec) {
	            this._nodes.insertNode(this._nodes.createNode(renderable, insertSpec));
	        }
	
	        // Auto pipe events
	        if (this.options.autoPipeEvents && renderable && renderable.pipe) {
	            renderable.pipe(this);
	            renderable.pipe(this._eventOutput);
	        }
	
	        // Force a reflow
	        this._isDirty = true;
	
	        return this;
	    };
	
	    /**
	     * Adds a renderable to the end of a sequential data-source.
	     *
	     * The optional argument `insertSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is inserted using an animation starting with
	     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
	     *
	     * @param {Object} renderable Renderable to add to the data-source
	     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.push = function(renderable, insertSpec) {
	        return this.insert(-1, renderable, insertSpec);
	    };
	
	    /**
	     * Helper function for finding the view-sequence node at the given position.
	     */
	    function _getViewSequenceAtIndex(index, startViewSequence) {
	        var viewSequence = startViewSequence || this._viewSequence;
	        var i = viewSequence ? viewSequence.getIndex() : index;
	        if (index > i) {
	            while (viewSequence) {
	                viewSequence = viewSequence.getNext();
	                if (!viewSequence) {
	                    return undefined;
	                }
	                i = viewSequence.getIndex();
	                if (i === index) {
	                    return viewSequence;
	                }
	                else if (index < i) {
	                    return undefined;
	                }
	            }
	        }
	        else if (index < i) {
	            while (viewSequence) {
	                viewSequence = viewSequence.getPrevious();
	                if (!viewSequence) {
	                    return undefined;
	                }
	                i = viewSequence.getIndex();
	                if (i === index) {
	                    return viewSequence;
	                }
	                else if (index > i) {
	                    return undefined;
	                }
	            }
	        }
	        return viewSequence;
	    }
	
	    /**
	     * Helper that return the underlying array datasource if available.
	     */
	    function _getDataSourceArray() {
	      if (Array.isArray(this._dataSource)) {
	        return this._dataSource;
	      }
	      else if (this._viewSequence || this._viewSequence._) {
	        return this._viewSequence._.array;
	      }
	      return undefined;
	    }
	
	    /**
	     * Get the renderable at the given index or Id.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @return {Renderable} renderable or `undefined`
	     */
	    LayoutController.prototype.get = function(indexOrId) {
	      if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	        return this._nodesById[indexOrId];
	      }
	      var viewSequence = _getViewSequenceAtIndex.call(this, indexOrId);
	      return viewSequence ? viewSequence.get() : undefined;
	    };
	
	    /**
	     * Swaps two renderables at the given positions.
	     *
	     * This method is only supported for dataSources of type Array or ViewSequence.
	     *
	     * @param {Number} index Index of the renderable to swap
	     * @param {Number} index2 Index of the renderable to swap with
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.swap = function(index, index2) {
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	            throw '.swap is only supported for dataSources of type Array or ViewSequence';
	        }
	        if (index === index2) {
	          return this;
	        }
	        if ((index < 0) || (index >= array.length)) {
	          throw 'Invalid index (' + index + ') specified to .swap';
	        }
	        if ((index2 < 0) || (index2 >= array.length)) {
	          throw 'Invalid second index (' + index2 + ') specified to .swap';
	        }
	        var renderNode = array[index];
	        array[index] = array[index2];
	        array[index2] = renderNode;
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Replaces a renderable at the given index or id.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @param {Renderable} renderable renderable to replace with
	     * @param {Bool} [noAnimation] When set to `true`, replaces the renderable without any flowing animation.
	     * @return {Renderable} old renderable that has been replaced
	     */
	    LayoutController.prototype.replace = function(indexOrId, renderable, noAnimation) {
	        var oldRenderable;
	        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	            oldRenderable = this._nodesById[indexOrId];
	            if (oldRenderable !== renderable) {
	                if (noAnimation && oldRenderable) {
	                    var node = this._nodes.getNodeByRenderNode(oldRenderable);
	                    if (node) {
	                        node.setRenderNode(renderable);
	                    }
	                }
	                this._nodesById[indexOrId] = renderable;
	                this._isDirty = true;
	            }
	            return oldRenderable;
	        }
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	          return undefined;
	        }
	        if ((indexOrId < 0) || (indexOrId >= array.length)) {
	          throw 'Invalid index (' + indexOrId + ') specified to .replace';
	        }
	        oldRenderable = array[indexOrId];
	        if (oldRenderable !== renderable) {
	          array[indexOrId] = renderable;
	          this._isDirty = true;
	        }
	        return oldRenderable;
	    };
	
	    /**
	     * Moves a renderable to a new index.
	     *
	     * This method is only supported for dataSources of type Array or ViewSequence.
	     *
	     * @param {Number} index Index of the renderable to move.
	     * @param {Number} newIndex New index of the renderable.
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.move = function(index, newIndex) {
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	            throw '.move is only supported for dataSources of type Array or ViewSequence';
	        }
	        if ((index < 0) || (index >= array.length)) {
	          throw 'Invalid index (' + index + ') specified to .move';
	        }
	        if ((newIndex < 0) || (newIndex >= array.length)) {
	          throw 'Invalid newIndex (' + newIndex + ') specified to .move';
	        }
	        var item = array.splice(index, 1)[0];
	        array.splice(newIndex, 0, item);
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Removes a renderable from the data-source.
	     *
	     * The optional argument `removeSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is removed using an animation ending at
	     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
	     *
	     * @param {Number|String|Renderable} indexOrId Index, id (String) or renderable to remove.
	     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
	     * @return {Renderable} renderable that has been removed
	     */
	    LayoutController.prototype.remove = function(indexOrId, removeSpec) {
	        var renderNode;
	
	        // Remove the renderable in case of an id (String)
	        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	
	            // Find and remove renderable from data-source
	            if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	                renderNode = this._nodesById[indexOrId];
	                if (renderNode) {
	                    delete this._nodesById[indexOrId];
	                }
	            }
	            else {
	                for (var key in this._nodesById) {
	                    if (this._nodesById[key] === indexOrId) {
	                        delete this._nodesById[key];
	                        renderNode = indexOrId;
	                        break;
	                    }
	                }
	            }
	        }
	
	        // Remove the renderable using an index
	        else if ((indexOrId instanceof Number) || (typeof indexOrId === 'number')) {
	            var array = _getDataSourceArray.call(this);
	            if (!array || (indexOrId < 0) || (indexOrId >= array.length)) {
	                throw 'Invalid index (' + indexOrId + ') specified to .remove (or dataSource doesn\'t support remove)';
	            }
	            renderNode = array[indexOrId];
	            this._dataSource.splice(indexOrId, 1);
	        }
	
	        // Remove by renderable
	        else {
	            indexOrId = this._dataSource.indexOf(indexOrId);
	            if (indexOrId >= 0) {
	                this._dataSource.splice(indexOrId, 1);
	                renderNode = indexOrId;
	            }
	        }
	
	        // When a node is removed from the view-sequence, the current this._viewSequence
	        // node may not be part of the valid view-sequence anymore. This seems to be a bug
	        // in the famo.us ViewSequence implementation/concept. The following check was added
	        // to ensure that always a valid viewSequence node is selected into the ScrollView.
	        if (this._viewSequence && renderNode) {
	            var viewSequence = _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex(), this._initialViewSequence);
	            viewSequence = viewSequence || _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex() - 1, this._initialViewSequence);
	            viewSequence = viewSequence || this._dataSource;
	            this._viewSequence = viewSequence;
	        }
	
	        // When a custom remove-spec was specified, store that in the layout-node
	        if (renderNode && removeSpec) {
	            var node = this._nodes.getNodeByRenderNode(renderNode);
	            if (node) {
	                node.remove(removeSpec || this.options.flowOptions.removeSpec);
	            }
	        }
	
	        // Force a reflow
	        if (renderNode) {
	            this._isDirty = true;
	        }
	
	        return renderNode;
	    };
	
	    /**
	     * Removes all renderables from the data-source.
	     *
	     * The optional argument `removeSpec` is only used when `flow` mode is enabled.
	     * When specified, the renderables are removed using an animation ending at
	     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
	     *
	     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.removeAll = function(removeSpec) {
	        if (this._nodesById) {
	            var dirty = false;
	            for (var key in this._nodesById) {
	                delete this._nodesById[key];
	                dirty = true;
	            }
	            if (dirty) {
	                this._isDirty = true;
	            }
	        }
	        else if (this._dataSource){
	            this.setDataSource([]);
	        }
	        if (removeSpec) {
	            var node = this._nodes.getStartEnumNode();
	            while (node) {
	                node.remove(removeSpec || this.options.flowOptions.removeSpec);
	                node = node._next;
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Return size of contained element or `undefined` when size is not defined.
	     *
	     * @return {Array.Number} [width, height]
	     */
	    LayoutController.prototype.getSize = function() {
	        return this._size || this.options.size;
	    };
	
	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {Object} Render spec for this component
	     */
	    LayoutController.prototype.render = function render() {
	        return this.id;
	    };
	
	    /**
	     * Apply changes from this component to the corresponding document element.
	     * This includes changes to classes, styles, size, content, opacity, origin,
	     * and matrix transforms.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context commit context
	     */
	    LayoutController.prototype.commit = function commit(context) {
	        var transform = context.transform;
	        var origin = context.origin;
	        var size = context.size;
	        var opacity = context.opacity;
	
	        // Reset the flow-state when requested
	        if (this._resetFlowState) {
	            this._resetFlowState = false;
	            this._isDirty = true;
	            this._nodes.removeAll();
	        }
	
	        // When the size or layout function has changed, reflow the layout
	        if (size[0] !== this._contextSizeCache[0] ||
	            size[1] !== this._contextSizeCache[1] ||
	            this._isDirty ||
	            this._nodes._trueSizeRequested ||
	            this.options.alwaysLayout){
	
	            // Emit start event
	            var eventData = {
	                target: this,
	                oldSize: this._contextSizeCache,
	                size: size,
	                dirty: this._isDirty,
	                trueSizeRequested: this._nodes._trueSizeRequested
	            };
	            this._eventOutput.emit('layoutstart', eventData);
	
	            // When the layout has changed, and we are not just scrolling,
	            // disable the locked state of the layout-nodes so that they
	            // can freely transition between the old and new state.
	            if (this.options.flow) {
	                var lock = false;
	                if (!this.options.flowOptions.reflowOnResize) {
	                    if (!this._isDirty &&
	                        ((size[0] !== this._contextSizeCache[0]) ||
	                         (size[1] !== this._contextSizeCache[1]))) {
	                        lock = undefined;
	                    }
	                    else {
	                      lock = true;
	                    }
	                }
	                if (lock !== undefined) {
	                    var node = this._nodes.getStartEnumNode();
	                    while (node) {
	                        node.releaseLock(lock);
	                        node = node._next;
	                    }
	                }
	            }
	
	            // Update state
	            this._contextSizeCache[0] = size[0];
	            this._contextSizeCache[1] = size[1];
	            this._isDirty = false;
	
	            // Prepare for layout
	            var scrollEnd;
	            if (this.options.size && (this.options.size[this._direction] === true)) {
	                scrollEnd = 1000000; // calculate scroll-length
	            }
	            var layoutContext = this._nodes.prepareForLayout(
	                this._viewSequence,     // first node to layout
	                this._nodesById, {      // so we can do fast id lookups
	                    size: size,
	                    direction: this._direction,
	                    scrollEnd: scrollEnd
	                }
	            );
	
	            // Layout objects
	            if (this._layout._function) {
	                this._layout._function(
	                    layoutContext,          // context which the layout-function can use
	                    this._layout.options    // additional layout-options
	                );
	            }
	
	            // Mark non-invalidated nodes for removal
	            this._nodes.removeNonInvalidatedNodes(this.options.flowOptions.removeSpec);
	
	            // Cleanup any nodes in case of a VirtualViewSequence
	            this._nodes.removeVirtualViewSequenceNodes();
	
	            // Calculate scroll-length and use that as the true-size (height)
	            if (scrollEnd) {
	                scrollEnd = 0;
	                node = this._nodes.getStartEnumNode();
	                while (node) {
	                    if (node._invalidated && node.scrollLength) {
	                        scrollEnd += node.scrollLength;
	                    }
	                    node = node._next;
	                }
	                this._size = this._size || [0, 0];
	                this._size[0] = this.options.size[0];
	                this._size[1] = this.options.size[1];
	                this._size[this._direction] = scrollEnd;
	            }
	
	            // Update output and optionally emit event
	            var result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
	            this._specs = result.specs;
	            this._commitOutput.target = result.specs;
	            this._eventOutput.emit('layoutend', eventData);
	            this._eventOutput.emit('reflow', {
	                target: this
	            });
	        }
	        else if (this.options.flow) {
	
	            // Update output and optionally emit event
	            result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
	            this._specs = result.specs;
	            this._commitOutput.target = result.specs;
	            if (result.modified) {
	                this._eventOutput.emit('reflow', {
	                    target: this
	                });
	            }
	        }
	
	        // Render child-nodes every commit
	        var target = this._commitOutput.target;
	        for (var i = 0, j = target.length; i < j; i++) {
	            if (target[i].renderNode) {
	                target[i].target = target[i].renderNode.render();
	            }
	        }
	
	        // Add our cleanup-registration id also to the list, so that the
	        // cleanup function is called by famo.us when the LayoutController is
	        // removed from the render-tree.
	        if (!target.length || (target[target.length-1] !== this._cleanupRegistration)) {
	            target.push(this._cleanupRegistration);
	        }
	
	        // Translate dependent on origin
	        if (origin && ((origin[0] !== 0) || (origin[1] !== 0))) {
	            transform = Transform.moveThen([-size[0]*origin[0], -size[1]*origin[1], 0], transform);
	        }
	        this._commitOutput.size = size;
	        this._commitOutput.opacity = opacity;
	        this._commitOutput.transform = transform;
	        return this._commitOutput;
	    };
	
	    /**
	     * Called whenever the layout-controller is removed from the render-tree.
	     *
	     * @private
	     * @param {Context} context cleanup context
	     */
	    LayoutController.prototype.cleanup = function(context) {
	        if (this.options.flow) {
	            this._resetFlowState = true;
	        }
	    };
	
	    module.exports = LayoutController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/*!********************************************************!*\
  !*** ../~/famous-flex/src/helpers/LayoutDockHelper.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * LayoutDockHelper helps positioning nodes using docking principles.
	 *
	 * **Example:**
	 *
	 * ```javascript
	 * var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');
	 *
	 * function HeaderFooterLayout(context, options) {
	 *   var dock = new LayoutDockHelper(context);
	 *   dock.top('header', options.headerSize);
	 *   dock.bottom('footer', options.footerSize);
	 *   dock.fill('content');
	 * };
	 * ```
	 *
	 * You can also use layout-literals to create layouts using docking semantics:
	 *
	 * ```javascript
	 * var layoutController = new LayoutController({
	 *   layout: {dock: [
	 *     ['top', 'header', 40],
	 *     ['bottom', 'footer', 40, 1], // z-index +1
	 *     ['fill', 'content']
	 *   ]},
	 *   dataSource: {
	 *     header: new Surface({content: 'header'}),
	 *     footer: new Surface({content: 'footer'}),
	 *     content: new Surface({content: 'content'}),
	 *   }
	 * });
	 * ```
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutUtility = __webpack_require__(/*! ../LayoutUtility */ 39);
	
	    /**
	     * @class
	     * @param {LayoutContext} context layout-context
	     * @param {Object} [options] additional options
	     * @param {Object} [options.margins] margins to start out with (default: 0px)
	     * @param {Number} [options.translateZ] z-index to use when translating objects (default: 0)
	     * @alias module:LayoutDockHelper
	     */
	    function LayoutDockHelper(context, options) {
	        var size = context.size;
	        this._size = size;
	        this._context = context;
	        this._options = options;
	        this._z = (options && options.translateZ) ? options.translateZ : 0;
	        if (options && options.margins) {
	            var margins = LayoutUtility.normalizeMargins(options.margins);
	            this._left = margins[3];
	            this._top = margins[0];
	            this._right = size[0] - margins[1];
	            this._bottom = size[1] - margins[2];
	        }
	        else {
	            this._left = 0;
	            this._top = 0;
	            this._right = size[0];
	            this._bottom = size[1];
	        }
	    }
	
	    /**
	     * Parses the layout-rules based on a JSON data object.
	     * The object should be an array with the following syntax:
	     * `[[rule, node, value, z], [rule, node, value, z], ...]`
	     *
	     * **Example:**
	     *
	     * ```JSON
	     * [
	     *   ['top', 'header', 50],
	     *   ['bottom', 'footer', 50, 10], // z-index: 10
	     *   ['margins', [10, 5]], // marginate remaining space: 10px top/bottom, 5px left/right
	     *   ['fill', 'content']
	     * ]
	     * ```
	     *
	     * @param {Object} data JSON object
	     */
	    LayoutDockHelper.prototype.parse = function(data) {
	        for (var i = 0; i < data.length; i++) {
	            var rule = data[i];
	            var value = (rule.length >= 3) ? rule[2] : undefined;
	            if (rule[0] === 'top') {
	                this.top(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'left') {
	                this.left(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'right') {
	                this.right(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'bottom') {
	                this.bottom(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'fill') {
	                this.fill(rule[1], (rule.length >=3) ? rule[2] : undefined);
	            }
	            else if (rule[0] === 'margins') {
	                this.margins(rule[1]);
	            }
	        }
	    };
	
	    /**
	     * Dock the node to the top.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
	     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.top = function(node, height, z) {
	        if (height instanceof Array) {
	            height = height[1];
	        }
	        if (height === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            height = size[1];
	        }
	        this._context.set(node, {
	            size: [this._right - this._left, height],
	            origin: [0, 0],
	            align: [0, 0],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        this._top += height;
	        return this;
	    };
	
	    /**
	     * Dock the node to the left
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
	     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.left = function(node, width, z) {
	        if (width instanceof Array) {
	            width = width[0];
	        }
	        if (width === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            width = size[0];
	        }
	        this._context.set(node, {
	            size: [width, this._bottom - this._top],
	            origin: [0, 0],
	            align: [0, 0],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        this._left += width;
	        return this;
	    };
	
	    /**
	     * Dock the node to the bottom
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
	     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.bottom = function(node, height, z) {
	        if (height instanceof Array) {
	            height = height[1];
	        }
	        if (height === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            height = size[1];
	        }
	        this._context.set(node, {
	            size: [this._right - this._left, height],
	            origin: [0, 1],
	            align: [0, 1],
	            translate: [this._left, -(this._size[1] - this._bottom), (z === undefined) ? this._z : z]
	        });
	        this._bottom -= height;
	        return this;
	    };
	
	    /**
	     * Dock the node to the right.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
	     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.right = function(node, width, z) {
	        if (width instanceof Array) {
	            width = width[0];
	        }
	        if (node) {
	            if (width === undefined) {
	                var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	                width = size[0];
	            }
	            this._context.set(node, {
	                size: [width, this._bottom - this._top],
	                origin: [1, 0],
	                align: [1, 0],
	                translate: [-(this._size[0] - this._right), this._top, (z === undefined) ? this._z : z]
	            });
	        }
	        if (width) {
	            this._right -= width;
	        }
	        return this;
	    };
	
	    /**
	     * Fills the node to the remaining content.
	     *
	     * @param {LayoutNode|String} node layout-node to dock
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.fill = function(node, z) {
	        this._context.set(node, {
	            size: [this._right - this._left, this._bottom - this._top],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        return this;
	    };
	
	    /**
	     * Applies indent margins to the remaining content.
	     *
	     * @param {Number|Array} margins margins shorthand (e.g. '5', [10, 10], [5, 10, 5, 10])
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.margins = function(margins) {
	        margins = LayoutUtility.normalizeMargins(margins);
	        this._left += margins[3];
	        this._top += margins[0];
	        this._right -= margins[1];
	        this._bottom -= margins[2];
	        return this;
	    };
	
	    // Register the helper
	    LayoutUtility.registerHelper('dock', LayoutDockHelper);
	
	    module.exports = LayoutDockHelper;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/*!*************************************!*\
  !*** ../~/style-loader/addStyle.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		return function() {
			head.removeChild(styleElement);
		};
	}


/***/ },
/* 20 */
/*!******************************************!*\
  !*** ../~/famous-polyfills/classList.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 2011-06-15
	 *
	 * By Eli Grey, http://eligrey.com
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */
	
	/*global self, document, DOMException */
	
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
	
	if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {
	
	(function (view) {
	
	"use strict";
	
	var
	      classListProp = "classList"
	    , protoProp = "prototype"
	    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
	    , objCtr = Object
	    , strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	    }
	    , arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var
	              i = 0
	            , len = this.length
	        ;
	        for (; i < len; i++) {
	            if (i in this && this[i] === item) {
	                return i;
	            }
	        }
	        return -1;
	    }
	    // Vendors: please allow content code to instantiate DOMExceptions
	    , DOMEx = function (type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	    }
	    , checkTokenAndGetIndex = function (classList, token) {
	        if (token === "") {
	            throw new DOMEx(
	                  "SYNTAX_ERR"
	                , "An invalid or illegal string was specified"
	            );
	        }
	        if (/\s/.test(token)) {
	            throw new DOMEx(
	                  "INVALID_CHARACTER_ERR"
	                , "String contains an invalid character"
	            );
	        }
	        return arrIndexOf.call(classList, token);
	    }
	    , ClassList = function (elem) {
	        var
	              trimmedClasses = strTrim.call(elem.className)
	            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
	            , i = 0
	            , len = classes.length
	        ;
	        for (; i < len; i++) {
	            this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	            elem.className = this.toString();
	        };
	    }
	    , classListProto = ClassList[protoProp] = []
	    , classListGetter = function () {
	        return new ClassList(this);
	    }
	;
	// Most DOMException implementations don't allow calling DOMException's toString()
	// on non-DOMExceptions. Error's toString() is sufficient here.
	DOMEx[protoProp] = Error[protoProp];
	classListProto.item = function (i) {
	    return this[i] || null;
	};
	classListProto.contains = function (token) {
	    token += "";
	    return checkTokenAndGetIndex(this, token) !== -1;
	};
	classListProto.add = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.push(token);
	        this._updateClassName();
	    }
	};
	classListProto.remove = function (token) {
	    token += "";
	    var index = checkTokenAndGetIndex(this, token);
	    if (index !== -1) {
	        this.splice(index, 1);
	        this._updateClassName();
	    }
	};
	classListProto.toggle = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.add(token);
	    } else {
	        this.remove(token);
	    }
	};
	classListProto.toString = function () {
	    return this.join(" ");
	};
	
	if (objCtr.defineProperty) {
	    var classListPropDesc = {
	          get: classListGetter
	        , enumerable: true
	        , configurable: true
	    };
	    try {
	        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	    } catch (ex) { // IE 8 doesn't support enumerable:true
	        if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        }
	    }
	} else if (objCtr[protoProp].__defineGetter__) {
	    elemCtrProto.__defineGetter__(classListProp, classListGetter);
	}
	
	}(self));
	
	}


/***/ },
/* 21 */
/*!******************************************************!*\
  !*** ../~/famous-polyfills/functionPrototypeBind.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== "function") {
	            // closest thing possible to the ECMAScript 5 internal IsCallable function
	            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	        }
	
	        var aArgs = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP = function () {},
	        fBound = function () {
	            return fToBind.apply(this instanceof fNOP && oThis
	                ? this
	                : oThis,
	                aArgs.concat(Array.prototype.slice.call(arguments)));
	        };
	
	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();
	
	        return fBound;
	    };
	}


/***/ },
/* 22 */
/*!******************************************************!*\
  !*** ../~/famous-polyfills/requestAnimationFrame.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// adds requestAnimationFrame functionality
	// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/
	
	window.requestAnimationFrame || (window.requestAnimationFrame =
	  window.webkitRequestAnimationFrame ||
	  window.mozRequestAnimationFrame    ||
	  window.oRequestAnimationFrame      ||
	  window.msRequestAnimationFrame     ||
	  function(callback, element) {
	    return window.setTimeout(function() {
	      callback(+new Date());
	  }, 1000 / 60);
	});


/***/ },
/* 23 */
/*!****************************************************!*\
  !*** ../~/famous-bkimagesurface/BkImageSurface.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/*global define*/
	
	/**
	 * BkImageSurface adds support for sizing-strategies such as AspectFit and AspectFill for displaying images with famo.us.
	 * It uses a 'div' with a background-image rather than a 'img' tag.
	 *
	 * Can be used as a drop-in replacement for ImageSurface, in case the the size of the div is not derived
	 * from the image.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    'use strict';
	
	    // import dependencies
	    var Surface = __webpack_require__(/*! famous/core/Surface */ 16);
	
	    /**
	     * @enum
	     * @alias module:BkImageSurface.SizeMode
	     */
	    var SizeMode = {
	        AUTO: 'auto',
	        FILL: '100% 100%',
	        ASPECTFILL: 'cover',
	        ASPECTFIT: 'contain'
	    };
	
	    /**
	     * @enum
	     * @alias module:BkImageSurface.PositionMode
	     */
	    var PositionMode = {
	        CENTER: 'center center',
	        LEFT: 'left center',
	        RIGHT: 'right center',
	        TOP: 'center top',
	        BOTTOM: 'center bottom',
	        TOPLEFT: 'left top',
	        TOPRIGHT: 'right top',
	        BOTTOMLEFT: 'left bottom',
	        BOTTOMRIGHT: 'right bottom'
	    };
	
	    /**
	     * @enum
	     * @alias module:BkImageSurface.RepeatMode
	     */
	    var RepeatMode = {
	        NONE: 'no-repeat',
	        VERTICAL: 'repeat-x',
	        HORIZONTAL: 'repeat-y',
	        BOTH: 'repeat'
	    };
	
	    /**
	     * @class
	     * @param {Object} options Options.
	     * @param {String} [options.content] Image-url.
	     * @param {SizeMode|String} [options.sizeMode] Size-mode to use.
	     * @param {PositionMode|String} [options.positionMode] Position-mode to use.
	     * @param {RepeatMode|String} [options.repeatMode] Repeat-mode to use.
	     * @alias module:BkImageSurface
	     */
	    var BkImageSurface = function(options) {
	        Surface.apply(this, arguments);
	        this.content = undefined;
	        this._imageUrl = options ? options.content : undefined;
	        this._sizeMode = (options && options.sizeMode) ? options.sizeMode : SizeMode.FILL;
	        this._positionMode = (options && options.positionMode) ? options.positionMode : PositionMode.CENTER;
	        this._repeatMode = (options && options.repeatMode) ? options.repeatMode : RepeatMode.NONE;
	
	        this._updateProperties();
	    };
	    BkImageSurface.prototype = Object.create(Surface.prototype);
	    BkImageSurface.prototype.constructor = BkImageSurface;
	    BkImageSurface.prototype.elementType = 'div';
	    BkImageSurface.prototype.elementClass = 'famous-surface';
	    BkImageSurface.SizeMode = SizeMode;
	    BkImageSurface.PositionMode = PositionMode;
	    BkImageSurface.RepeatMode = RepeatMode;
	
	    /**
	     * Update the css-styles on the div.
	     *
	     * @private
	     */
	    BkImageSurface.prototype._updateProperties = function() {
	        var props = this.getProperties();
	        if (this._imageUrl) {
	            var imageUrl = this._imageUrl;
	            // url encode '(' and ')'
	            if ((imageUrl.indexOf('(') >= 0) || (imageUrl.indexOf(')') >= 0)) {
	                imageUrl = imageUrl.split('(').join('%28');
	                imageUrl = imageUrl.split(')').join('%29');
	            }
	            props.backgroundImage = 'url(' + imageUrl + ')';
	        } else {
	            props.backgroundImage = '';
	        }
	        props.backgroundSize = this._sizeMode;
	        props.backgroundPosition = this._positionMode;
	        props.backgroundRepeat = this._repeatMode;
	        this.setProperties(props);
	    };
	
	    /**
	     * @param {String} imageUrl Image-url, when set will cause re-rendering
	     */
	    BkImageSurface.prototype.setContent = function(imageUrl) {
	        this._imageUrl = imageUrl;
	        this._updateProperties();
	    };
	
	    /**
	     * @return {String} Image-url
	     */
	    BkImageSurface.prototype.getContent = function() {
	        return this._imageUrl;
	    };
	
	    /**
	     * @param {SizeMode|String} sizeMode Sizing-mode, when set will cause re-rendering
	     */
	    BkImageSurface.prototype.setSizeMode = function(sizeMode) {
	        this._sizeMode = sizeMode;
	        this._updateProperties();
	    };
	
	    /**
	     * @return {SizeMode|String} Size-mode
	     */
	    BkImageSurface.prototype.getSizeMode = function() {
	        return this._sizeMode;
	    };
	
	    /**
	     * @param {PositionMode|String} positionMode Position-mode, when set will cause re-rendering
	     */
	    BkImageSurface.prototype.setPositionMode = function(positionMode) {
	        this._positionMode = positionMode;
	        this._updateProperties();
	    };
	
	    /**
	     * @return {RepeatMode|String} Position-mode
	     */
	    BkImageSurface.prototype.getPositionMode = function() {
	        return this._positionMode;
	    };
	
	    /**
	     * @param {RepeatMode|String} repeatMode Repeat-mode, when set will cause re-rendering
	     */
	    BkImageSurface.prototype.setRepeatMode = function(repeatMode) {
	        this._repeatMode = repeatMode;
	        this._updateProperties();
	    };
	
	    /**
	     * @return {RepeatMode|String} Repeat-mode
	     */
	    BkImageSurface.prototype.getRepeatMode = function() {
	        return this._repeatMode;
	    };
	
	    /**
	     * Place the document element that this component manages into the document.
	     *
	     * NOTE: deploy and recall were added because famo.us removed the background-image
	     * after the surface was removed/re-added from the DOM.
	     *
	     * @private
	     * @param {Node} target document parent of this container
	     */
	    BkImageSurface.prototype.deploy = function deploy(target) {
	        if (this._imageUrl) {
	            target.style.backgroundImage = 'url(' + this._imageUrl + ')';
	        }
	    };
	
	    /**
	     * Remove this component and contained content from the document
	     *
	     * NOTE: deploy and recall were added because famo.us removed the background-image
	     * after the surface was removed/re-added from the DOM.
	     *
	     * @private
	     * @param {Node} target node to which the component was deployed
	     */
	    BkImageSurface.prototype.recall = function recall(target) {
	        target.style.backgroundImage = '';
	    };
	
	    module.exports = BkImageSurface;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/*!***********************************!*\
  !*** ../~/ismobilejs/isMobile.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * isMobile.js v0.3.5
	 *
	 * A simple library to detect Apple phones and tablets,
	 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
	 * and any kind of seven inch device, via user agent sniffing.
	 *
	 * @author: Kai Mallea (kmallea@gmail.com)
	 *
	 * @license: http://creativecommons.org/publicdomain/zero/1.0/
	 */
	(function (global) {
	
	    var apple_phone         = /iPhone/i,
	        apple_ipod          = /iPod/i,
	        apple_tablet        = /iPad/i,
	        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
	        android_tablet      = /Android/i,
	        windows_phone       = /IEMobile/i,
	        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
	        other_blackberry    = /BlackBerry/i,
	        other_blackberry_10 = /BB10/i,
	        other_opera         = /Opera Mini/i,
	        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
	        seven_inch = new RegExp(
	            '(?:' +         // Non-capturing group
	
	            'Nexus 7' +     // Nexus 7
	
	            '|' +           // OR
	
	            'BNTV250' +     // B&N Nook Tablet 7 inch
	
	            '|' +           // OR
	
	            'Kindle Fire' + // Kindle Fire
	
	            '|' +           // OR
	
	            'Silk' +        // Kindle Fire, Silk Accelerated
	
	            '|' +           // OR
	
	            'GT-P1000' +    // Galaxy Tab 7 inch
	
	            ')',            // End non-capturing group
	
	            'i');           // Case-insensitive matching
	
	    var match = function(regex, userAgent) {
	        return regex.test(userAgent);
	    };
	
	    var IsMobileClass = function(userAgent) {
	        var ua = userAgent || navigator.userAgent;
	
	        this.apple = {
	            phone:  match(apple_phone, ua),
	            ipod:   match(apple_ipod, ua),
	            tablet: match(apple_tablet, ua),
	            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
	        };
	        this.android = {
	            phone:  match(android_phone, ua),
	            tablet: !match(android_phone, ua) && match(android_tablet, ua),
	            device: match(android_phone, ua) || match(android_tablet, ua)
	        };
	        this.windows = {
	            phone:  match(windows_phone, ua),
	            tablet: match(windows_tablet, ua),
	            device: match(windows_phone, ua) || match(windows_tablet, ua)
	        };
	        this.other = {
	            blackberry:   match(other_blackberry, ua),
	            blackberry10: match(other_blackberry_10, ua),
	            opera:        match(other_opera, ua),
	            firefox:      match(other_firefox, ua),
	            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua)
	        };
	        this.seven_inch = match(seven_inch, ua);
	        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
	        // excludes 'other' devices and ipods, targeting touchscreen phones
	        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
	        // excludes 7 inch devices, classifying as phone or tablet is left to the user
	        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;
	
	        if (typeof window === 'undefined') {
	            return this;
	        }
	    };
	
	    var instantiate = function() {
	        var IM = new IsMobileClass();
	        IM.Class = IsMobileClass;
	        return IM;
	    };
	
	    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
	        //node
	        module.exports = IsMobileClass;
	    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
	        //browserify
	        module.exports = instantiate();
	    } else if (true) {
	        //AMD
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (global.isMobile = instantiate()), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        global.isMobile = instantiate();
	    }
	
	})(this);


/***/ },
/* 25 */
/*!***************************!*\
  !*** ./images/iphone.png ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/iphone.png"

/***/ },
/* 26 */
/*!*****************************!*\
  !*** ./images/scarlett.jpg ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/scarlett.jpg"

/***/ },
/* 27 */
/*!***********************************!*\
  !*** ../~/famous/core/Context.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var RenderNode = __webpack_require__(/*! ./RenderNode */ 30);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 28);
	var ElementAllocator = __webpack_require__(/*! ./ElementAllocator */ 43);
	var Transform = __webpack_require__(/*! ./Transform */ 32);
	var Transitionable = __webpack_require__(/*! ../transitions/Transitionable */ 44);
	var _zeroZero = [
	    0,
	    0
	];
	var usePrefix = !('perspective' in document.documentElement.style);
	function _getElementSize() {
	    var element = this.container;
	    return [
	        element.clientWidth,
	        element.clientHeight
	    ];
	}
	var _setPerspective = usePrefix ? function (element, perspective) {
	    element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
	} : function (element, perspective) {
	    element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
	};
	function Context(container) {
	    this.container = container;
	    this._allocator = new ElementAllocator(container);
	    this._node = new RenderNode();
	    this._eventOutput = new EventHandler();
	    this._size = _getElementSize.call(this);
	    this._perspectiveState = new Transitionable(0);
	    this._perspective = undefined;
	    this._nodeContext = {
	        allocator: this._allocator,
	        transform: Transform.identity,
	        opacity: 1,
	        origin: _zeroZero,
	        align: _zeroZero,
	        size: this._size
	    };
	    this._eventOutput.on('resize', function () {
	        this.setSize(_getElementSize.call(this));
	    }.bind(this));
	}
	Context.prototype.getAllocator = function getAllocator() {
	    return this._allocator;
	};
	Context.prototype.add = function add(obj) {
	    return this._node.add(obj);
	};
	Context.prototype.migrate = function migrate(container) {
	    if (container === this.container)
	        return;
	    this.container = container;
	    this._allocator.migrate(container);
	};
	Context.prototype.getSize = function getSize() {
	    return this._size;
	};
	Context.prototype.setSize = function setSize(size) {
	    if (!size)
	        size = _getElementSize.call(this);
	    this._size[0] = size[0];
	    this._size[1] = size[1];
	};
	Context.prototype.update = function update(contextParameters) {
	    if (contextParameters) {
	        if (contextParameters.transform)
	            this._nodeContext.transform = contextParameters.transform;
	        if (contextParameters.opacity)
	            this._nodeContext.opacity = contextParameters.opacity;
	        if (contextParameters.origin)
	            this._nodeContext.origin = contextParameters.origin;
	        if (contextParameters.align)
	            this._nodeContext.align = contextParameters.align;
	        if (contextParameters.size)
	            this._nodeContext.size = contextParameters.size;
	    }
	    var perspective = this._perspectiveState.get();
	    if (perspective !== this._perspective) {
	        _setPerspective(this.container, perspective);
	        this._perspective = perspective;
	    }
	    this._node.commit(this._nodeContext);
	};
	Context.prototype.getPerspective = function getPerspective() {
	    return this._perspectiveState.get();
	};
	Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
	    return this._perspectiveState.set(perspective, transition, callback);
	};
	Context.prototype.emit = function emit(type, event) {
	    return this._eventOutput.emit(type, event);
	};
	Context.prototype.on = function on(type, handler) {
	    return this._eventOutput.on(type, handler);
	};
	Context.prototype.removeListener = function removeListener(type, handler) {
	    return this._eventOutput.removeListener(type, handler);
	};
	Context.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};
	Context.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};
	module.exports = Context;

/***/ },
/* 28 */
/*!****************************************!*\
  !*** ../~/famous/core/EventHandler.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventEmitter = __webpack_require__(/*! ./EventEmitter */ 45);
	function EventHandler() {
	    EventEmitter.apply(this, arguments);
	    this.downstream = [];
	    this.downstreamFn = [];
	    this.upstream = [];
	    this.upstreamListeners = {};
	}
	EventHandler.prototype = Object.create(EventEmitter.prototype);
	EventHandler.prototype.constructor = EventHandler;
	EventHandler.setInputHandler = function setInputHandler(object, handler) {
	    object.trigger = handler.trigger.bind(handler);
	    if (handler.subscribe && handler.unsubscribe) {
	        object.subscribe = handler.subscribe.bind(handler);
	        object.unsubscribe = handler.unsubscribe.bind(handler);
	    }
	};
	EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
	    if (handler instanceof EventHandler)
	        handler.bindThis(object);
	    object.pipe = handler.pipe.bind(handler);
	    object.unpipe = handler.unpipe.bind(handler);
	    object.on = handler.on.bind(handler);
	    object.addListener = object.on;
	    object.removeListener = handler.removeListener.bind(handler);
	};
	EventHandler.prototype.emit = function emit(type, event) {
	    EventEmitter.prototype.emit.apply(this, arguments);
	    var i = 0;
	    for (i = 0; i < this.downstream.length; i++) {
	        if (this.downstream[i].trigger)
	            this.downstream[i].trigger(type, event);
	    }
	    for (i = 0; i < this.downstreamFn.length; i++) {
	        this.downstreamFn[i](type, event);
	    }
	    return this;
	};
	EventHandler.prototype.trigger = EventHandler.prototype.emit;
	EventHandler.prototype.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function)
	        return target.subscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index < 0)
	        downstreamCtx.push(target);
	    if (target instanceof Function)
	        target('pipe', null);
	    else if (target.trigger)
	        target.trigger('pipe', null);
	    return target;
	};
	EventHandler.prototype.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function)
	        return target.unsubscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index >= 0) {
	        downstreamCtx.splice(index, 1);
	        if (target instanceof Function)
	            target('unpipe', null);
	        else if (target.trigger)
	            target.trigger('unpipe', null);
	        return target;
	    } else
	        return false;
	};
	EventHandler.prototype.on = function on(type, handler) {
	    EventEmitter.prototype.on.apply(this, arguments);
	    if (!(type in this.upstreamListeners)) {
	        var upstreamListener = this.trigger.bind(this, type);
	        this.upstreamListeners[type] = upstreamListener;
	        for (var i = 0; i < this.upstream.length; i++) {
	            this.upstream[i].on(type, upstreamListener);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.addListener = EventHandler.prototype.on;
	EventHandler.prototype.subscribe = function subscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index < 0) {
	        this.upstream.push(source);
	        for (var type in this.upstreamListeners) {
	            source.on(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.unsubscribe = function unsubscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index >= 0) {
	        this.upstream.splice(index, 1);
	        for (var type in this.upstreamListeners) {
	            source.removeListener(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	module.exports = EventHandler;

/***/ },
/* 29 */
/*!******************************************!*\
  !*** ../~/famous/core/OptionsManager.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 28);
	function OptionsManager(value) {
	    this._value = value;
	    this.eventOutput = null;
	}
	OptionsManager.patch = function patchObject(source, data) {
	    var manager = new OptionsManager(source);
	    for (var i = 1; i < arguments.length; i++)
	        manager.patch(arguments[i]);
	    return source;
	};
	function _createEventOutput() {
	    this.eventOutput = new EventHandler();
	    this.eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this.eventOutput);
	}
	OptionsManager.prototype.patch = function patch() {
	    var myState = this._value;
	    for (var i = 0; i < arguments.length; i++) {
	        var data = arguments[i];
	        for (var k in data) {
	            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
	                if (!myState.hasOwnProperty(k))
	                    myState[k] = Object.create(myState[k]);
	                this.key(k).patch(data[k]);
	                if (this.eventOutput)
	                    this.eventOutput.emit('change', {
	                        id: k,
	                        value: this.key(k).value()
	                    });
	            } else
	                this.set(k, data[k]);
	        }
	    }
	    return this;
	};
	OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
	OptionsManager.prototype.key = function key(identifier) {
	    var result = new OptionsManager(this._value[identifier]);
	    if (!(result._value instanceof Object) || result._value instanceof Array)
	        result._value = {};
	    return result;
	};
	OptionsManager.prototype.get = function get(key) {
	    return key ? this._value[key] : this._value;
	};
	OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
	OptionsManager.prototype.set = function set(key, value) {
	    var originalValue = this.get(key);
	    this._value[key] = value;
	    if (this.eventOutput && value !== originalValue)
	        this.eventOutput.emit('change', {
	            id: key,
	            value: value
	        });
	    return this;
	};
	OptionsManager.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	OptionsManager.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};
	OptionsManager.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	OptionsManager.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};
	module.exports = OptionsManager;

/***/ },
/* 30 */
/*!**************************************!*\
  !*** ../~/famous/core/RenderNode.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Entity = __webpack_require__(/*! ./Entity */ 37);
	var SpecParser = __webpack_require__(/*! ./SpecParser */ 46);
	function RenderNode(object) {
	    this._object = null;
	    this._child = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = false;
	    this._isModifier = false;
	    this._resultCache = {};
	    this._prevResults = {};
	    this._childResult = null;
	    if (object)
	        this.set(object);
	}
	RenderNode.prototype.add = function add(child) {
	    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
	    if (this._child instanceof Array)
	        this._child.push(childNode);
	    else if (this._child) {
	        this._child = [
	            this._child,
	            childNode
	        ];
	        this._hasMultipleChildren = true;
	        this._childResult = [];
	    } else
	        this._child = childNode;
	    return childNode;
	};
	RenderNode.prototype.get = function get() {
	    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
	};
	RenderNode.prototype.set = function set(child) {
	    this._childResult = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = child.render ? true : false;
	    this._isModifier = child.modify ? true : false;
	    this._object = child;
	    this._child = null;
	    if (child instanceof RenderNode)
	        return child;
	    else
	        return this;
	};
	RenderNode.prototype.getSize = function getSize() {
	    var result = null;
	    var target = this.get();
	    if (target && target.getSize)
	        result = target.getSize();
	    if (!result && this._child && this._child.getSize)
	        result = this._child.getSize();
	    return result;
	};
	function _applyCommit(spec, context, cacheStorage) {
	    var result = SpecParser.parse(spec, context);
	    var keys = Object.keys(result);
	    for (var i = 0; i < keys.length; i++) {
	        var id = keys[i];
	        var childNode = Entity.get(id);
	        var commitParams = result[id];
	        commitParams.allocator = context.allocator;
	        var commitResult = childNode.commit(commitParams);
	        if (commitResult)
	            _applyCommit(commitResult, context, cacheStorage);
	        else
	            cacheStorage[id] = commitParams;
	    }
	}
	RenderNode.prototype.commit = function commit(context) {
	    var prevKeys = Object.keys(this._prevResults);
	    for (var i = 0; i < prevKeys.length; i++) {
	        var id = prevKeys[i];
	        if (this._resultCache[id] === undefined) {
	            var object = Entity.get(id);
	            if (object.cleanup)
	                object.cleanup(context.allocator);
	        }
	    }
	    this._prevResults = this._resultCache;
	    this._resultCache = {};
	    _applyCommit(this.render(), context, this._resultCache);
	};
	RenderNode.prototype.render = function render() {
	    if (this._isRenderable)
	        return this._object.render();
	    var result = null;
	    if (this._hasMultipleChildren) {
	        result = this._childResult;
	        var children = this._child;
	        for (var i = 0; i < children.length; i++) {
	            result[i] = children[i].render();
	        }
	    } else if (this._child)
	        result = this._child.render();
	    return this._isModifier ? this._object.modify(result) : result;
	};
	module.exports = RenderNode;

/***/ },
/* 31 */
/*!****************************************!*\
  !*** ../~/famous/utilities/Utility.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = {};
	Utility.Direction = {
	    X: 0,
	    Y: 1,
	    Z: 2
	};
	Utility.after = function after(count, callback) {
	    var counter = count;
	    return function () {
	        counter--;
	        if (counter === 0)
	            callback.apply(this, arguments);
	    };
	};
	Utility.loadURL = function loadURL(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function onreadystatechange() {
	        if (this.readyState === 4) {
	            if (callback)
	                callback(this.responseText);
	        }
	    };
	    xhr.open('GET', url);
	    xhr.send();
	};
	Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
	    var element = document.createElement('div');
	    element.innerHTML = html;
	    var result = document.createDocumentFragment();
	    while (element.hasChildNodes())
	        result.appendChild(element.firstChild);
	    return result;
	};
	Utility.clone = function clone(b) {
	    var a;
	    if (typeof b === 'object') {
	        a = b instanceof Array ? [] : {};
	        for (var key in b) {
	            if (typeof b[key] === 'object' && b[key] !== null) {
	                if (b[key] instanceof Array) {
	                    a[key] = new Array(b[key].length);
	                    for (var i = 0; i < b[key].length; i++) {
	                        a[key][i] = Utility.clone(b[key][i]);
	                    }
	                } else {
	                    a[key] = Utility.clone(b[key]);
	                }
	            } else {
	                a[key] = b[key];
	            }
	        }
	    } else {
	        a = b;
	    }
	    return a;
	};
	module.exports = Utility;

/***/ },
/* 32 */
/*!*************************************!*\
  !*** ../~/famous/core/Transform.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = {};
	Transform.precision = 0.000001;
	Transform.identity = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1
	];
	Transform.multiply4x4 = function multiply4x4(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
	        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
	        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
	        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
	        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
	    ];
	};
	Transform.multiply = function multiply(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
	        0,
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
	        0,
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
	        0,
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
	        1
	    ];
	};
	Transform.thenMove = function thenMove(m, t) {
	    if (!t[2])
	        t[2] = 0;
	    return [
	        m[0],
	        m[1],
	        m[2],
	        0,
	        m[4],
	        m[5],
	        m[6],
	        0,
	        m[8],
	        m[9],
	        m[10],
	        0,
	        m[12] + t[0],
	        m[13] + t[1],
	        m[14] + t[2],
	        1
	    ];
	};
	Transform.moveThen = function moveThen(v, m) {
	    if (!v[2])
	        v[2] = 0;
	    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
	    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
	    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.translate = function translate(x, y, z) {
	    if (z === undefined)
	        z = 0;
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        x,
	        y,
	        z,
	        1
	    ];
	};
	Transform.thenScale = function thenScale(m, s) {
	    return [
	        s[0] * m[0],
	        s[1] * m[1],
	        s[2] * m[2],
	        0,
	        s[0] * m[4],
	        s[1] * m[5],
	        s[2] * m[6],
	        0,
	        s[0] * m[8],
	        s[1] * m[9],
	        s[2] * m[10],
	        0,
	        s[0] * m[12],
	        s[1] * m[13],
	        s[2] * m[14],
	        1
	    ];
	};
	Transform.scale = function scale(x, y, z) {
	    if (z === undefined)
	        z = 1;
	    if (y === undefined)
	        y = x;
	    return [
	        x,
	        0,
	        0,
	        0,
	        0,
	        y,
	        0,
	        0,
	        0,
	        0,
	        z,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateX = function rotateX(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateY = function rotateY(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        0,
	        -sinTheta,
	        0,
	        0,
	        1,
	        0,
	        0,
	        sinTheta,
	        0,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateZ = function rotateZ(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotate = function rotate(phi, theta, psi) {
	    var cosPhi = Math.cos(phi);
	    var sinPhi = Math.sin(phi);
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    var cosPsi = Math.cos(psi);
	    var sinPsi = Math.sin(psi);
	    var result = [
	        cosTheta * cosPsi,
	        cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
	        sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
	        0,
	        -cosTheta * sinPsi,
	        cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
	        sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
	        0,
	        sinTheta,
	        -sinPhi * cosTheta,
	        cosPhi * cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.rotateAxis = function rotateAxis(v, theta) {
	    var sinTheta = Math.sin(theta);
	    var cosTheta = Math.cos(theta);
	    var verTheta = 1 - cosTheta;
	    var xxV = v[0] * v[0] * verTheta;
	    var xyV = v[0] * v[1] * verTheta;
	    var xzV = v[0] * v[2] * verTheta;
	    var yyV = v[1] * v[1] * verTheta;
	    var yzV = v[1] * v[2] * verTheta;
	    var zzV = v[2] * v[2] * verTheta;
	    var xs = v[0] * sinTheta;
	    var ys = v[1] * sinTheta;
	    var zs = v[2] * sinTheta;
	    var result = [
	        xxV + cosTheta,
	        xyV + zs,
	        xzV - ys,
	        0,
	        xyV - zs,
	        yyV + cosTheta,
	        yzV + xs,
	        0,
	        xzV + ys,
	        yzV - xs,
	        zzV + cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.aboutOrigin = function aboutOrigin(v, m) {
	    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
	    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
	    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.skew = function skew(phi, theta, psi) {
	    return [
	        1,
	        Math.tan(theta),
	        0,
	        0,
	        Math.tan(psi),
	        1,
	        0,
	        0,
	        0,
	        Math.tan(phi),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewX = function skewX(angle) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        Math.tan(angle),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewY = function skewY(angle) {
	    return [
	        1,
	        Math.tan(angle),
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.perspective = function perspective(focusZ) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        -1 / focusZ,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.getTranslate = function getTranslate(m) {
	    return [
	        m[12],
	        m[13],
	        m[14]
	    ];
	};
	Transform.inverse = function inverse(m) {
	    var c0 = m[5] * m[10] - m[6] * m[9];
	    var c1 = m[4] * m[10] - m[6] * m[8];
	    var c2 = m[4] * m[9] - m[5] * m[8];
	    var c4 = m[1] * m[10] - m[2] * m[9];
	    var c5 = m[0] * m[10] - m[2] * m[8];
	    var c6 = m[0] * m[9] - m[1] * m[8];
	    var c8 = m[1] * m[6] - m[2] * m[5];
	    var c9 = m[0] * m[6] - m[2] * m[4];
	    var c10 = m[0] * m[5] - m[1] * m[4];
	    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
	    var invD = 1 / detM;
	    var result = [
	        invD * c0,
	        -invD * c4,
	        invD * c8,
	        0,
	        -invD * c1,
	        invD * c5,
	        -invD * c9,
	        0,
	        invD * c2,
	        -invD * c6,
	        invD * c10,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
	    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
	    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
	    return result;
	};
	Transform.transpose = function transpose(m) {
	    return [
	        m[0],
	        m[4],
	        m[8],
	        m[12],
	        m[1],
	        m[5],
	        m[9],
	        m[13],
	        m[2],
	        m[6],
	        m[10],
	        m[14],
	        m[3],
	        m[7],
	        m[11],
	        m[15]
	    ];
	};
	function _normSquared(v) {
	    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	}
	function _norm(v) {
	    return Math.sqrt(_normSquared(v));
	}
	function _sign(n) {
	    return n < 0 ? -1 : 1;
	}
	Transform.interpret = function interpret(M) {
	    var x = [
	        M[0],
	        M[1],
	        M[2]
	    ];
	    var sgn = _sign(x[0]);
	    var xNorm = _norm(x);
	    var v = [
	        x[0] + sgn * xNorm,
	        x[1],
	        x[2]
	    ];
	    var mult = 2 / _normSquared(v);
	    if (mult >= Infinity) {
	        return {
	            translate: Transform.getTranslate(M),
	            rotate: [
	                0,
	                0,
	                0
	            ],
	            scale: [
	                0,
	                0,
	                0
	            ],
	            skew: [
	                0,
	                0,
	                0
	            ]
	        };
	    }
	    var Q1 = [
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q1[0] = 1 - mult * v[0] * v[0];
	    Q1[5] = 1 - mult * v[1] * v[1];
	    Q1[10] = 1 - mult * v[2] * v[2];
	    Q1[1] = -mult * v[0] * v[1];
	    Q1[2] = -mult * v[0] * v[2];
	    Q1[6] = -mult * v[1] * v[2];
	    Q1[4] = Q1[1];
	    Q1[8] = Q1[2];
	    Q1[9] = Q1[6];
	    var MQ1 = Transform.multiply(Q1, M);
	    var x2 = [
	        MQ1[5],
	        MQ1[6]
	    ];
	    var sgn2 = _sign(x2[0]);
	    var x2Norm = _norm(x2);
	    var v2 = [
	        x2[0] + sgn2 * x2Norm,
	        x2[1]
	    ];
	    var mult2 = 2 / _normSquared(v2);
	    var Q2 = [
	        1,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q2[5] = 1 - mult2 * v2[0] * v2[0];
	    Q2[10] = 1 - mult2 * v2[1] * v2[1];
	    Q2[6] = -mult2 * v2[0] * v2[1];
	    Q2[9] = Q2[6];
	    var Q = Transform.multiply(Q2, Q1);
	    var R = Transform.multiply(Q, M);
	    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
	    R = Transform.multiply(R, remover);
	    Q = Transform.multiply(remover, Q);
	    var result = {};
	    result.translate = Transform.getTranslate(M);
	    result.rotate = [
	        Math.atan2(-Q[6], Q[10]),
	        Math.asin(Q[2]),
	        Math.atan2(-Q[1], Q[0])
	    ];
	    if (!result.rotate[0]) {
	        result.rotate[0] = 0;
	        result.rotate[2] = Math.atan2(Q[4], Q[5]);
	    }
	    result.scale = [
	        R[0],
	        R[5],
	        R[10]
	    ];
	    result.skew = [
	        Math.atan2(R[9], result.scale[2]),
	        Math.atan2(R[8], result.scale[2]),
	        Math.atan2(R[4], result.scale[0])
	    ];
	    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
	        result.rotate[1] = Math.PI - result.rotate[1];
	        if (result.rotate[1] > Math.PI)
	            result.rotate[1] -= 2 * Math.PI;
	        if (result.rotate[1] < -Math.PI)
	            result.rotate[1] += 2 * Math.PI;
	        if (result.rotate[0] < 0)
	            result.rotate[0] += Math.PI;
	        else
	            result.rotate[0] -= Math.PI;
	        if (result.rotate[2] < 0)
	            result.rotate[2] += Math.PI;
	        else
	            result.rotate[2] -= Math.PI;
	    }
	    return result;
	};
	Transform.average = function average(M1, M2, t) {
	    t = t === undefined ? 0.5 : t;
	    var specM1 = Transform.interpret(M1);
	    var specM2 = Transform.interpret(M2);
	    var specAvg = {
	        translate: [
	            0,
	            0,
	            0
	        ],
	        rotate: [
	            0,
	            0,
	            0
	        ],
	        scale: [
	            0,
	            0,
	            0
	        ],
	        skew: [
	            0,
	            0,
	            0
	        ]
	    };
	    for (var i = 0; i < 3; i++) {
	        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
	        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
	        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
	        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
	    }
	    return Transform.build(specAvg);
	};
	Transform.build = function build(spec) {
	    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
	    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
	    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
	    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
	};
	Transform.equals = function equals(a, b) {
	    return !Transform.notEquals(a, b);
	};
	Transform.notEquals = function notEquals(a, b) {
	    if (a === b)
	        return false;
	    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
	};
	Transform.normalizeRotation = function normalizeRotation(rotation) {
	    var result = rotation.slice(0);
	    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
	        result[0] = -result[0];
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] > Math.PI * 0.5) {
	        result[0] = result[0] - Math.PI;
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] < -Math.PI * 0.5) {
	        result[0] = result[0] + Math.PI;
	        result[1] = -Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    while (result[1] < -Math.PI)
	        result[1] += 2 * Math.PI;
	    while (result[1] >= Math.PI)
	        result[1] -= 2 * Math.PI;
	    while (result[2] < -Math.PI)
	        result[2] += 2 * Math.PI;
	    while (result[2] >= Math.PI)
	        result[2] -= 2 * Math.PI;
	    return result;
	};
	Transform.inFront = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0.001,
	    1
	];
	Transform.behind = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    -0.001,
	    1
	];
	module.exports = Transform;

/***/ },
/* 33 */
/*!************************************!*\
  !*** ../~/famous/core/Modifier.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = __webpack_require__(/*! ./Transform */ 32);
	var Transitionable = __webpack_require__(/*! ../transitions/Transitionable */ 44);
	var TransitionableTransform = __webpack_require__(/*! ../transitions/TransitionableTransform */ 47);
	function Modifier(options) {
	    this._transformGetter = null;
	    this._opacityGetter = null;
	    this._originGetter = null;
	    this._alignGetter = null;
	    this._sizeGetter = null;
	    this._proportionGetter = null;
	    this._legacyStates = {};
	    this._output = {
	        transform: Transform.identity,
	        opacity: 1,
	        origin: null,
	        align: null,
	        size: null,
	        proportions: null,
	        target: null
	    };
	    if (options) {
	        if (options.transform)
	            this.transformFrom(options.transform);
	        if (options.opacity !== undefined)
	            this.opacityFrom(options.opacity);
	        if (options.origin)
	            this.originFrom(options.origin);
	        if (options.align)
	            this.alignFrom(options.align);
	        if (options.size)
	            this.sizeFrom(options.size);
	        if (options.proportions)
	            this.proportionsFrom(options.proportions);
	    }
	}
	Modifier.prototype.transformFrom = function transformFrom(transform) {
	    if (transform instanceof Function)
	        this._transformGetter = transform;
	    else if (transform instanceof Object && transform.get)
	        this._transformGetter = transform.get.bind(transform);
	    else {
	        this._transformGetter = null;
	        this._output.transform = transform;
	    }
	    return this;
	};
	Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
	    if (opacity instanceof Function)
	        this._opacityGetter = opacity;
	    else if (opacity instanceof Object && opacity.get)
	        this._opacityGetter = opacity.get.bind(opacity);
	    else {
	        this._opacityGetter = null;
	        this._output.opacity = opacity;
	    }
	    return this;
	};
	Modifier.prototype.originFrom = function originFrom(origin) {
	    if (origin instanceof Function)
	        this._originGetter = origin;
	    else if (origin instanceof Object && origin.get)
	        this._originGetter = origin.get.bind(origin);
	    else {
	        this._originGetter = null;
	        this._output.origin = origin;
	    }
	    return this;
	};
	Modifier.prototype.alignFrom = function alignFrom(align) {
	    if (align instanceof Function)
	        this._alignGetter = align;
	    else if (align instanceof Object && align.get)
	        this._alignGetter = align.get.bind(align);
	    else {
	        this._alignGetter = null;
	        this._output.align = align;
	    }
	    return this;
	};
	Modifier.prototype.sizeFrom = function sizeFrom(size) {
	    if (size instanceof Function)
	        this._sizeGetter = size;
	    else if (size instanceof Object && size.get)
	        this._sizeGetter = size.get.bind(size);
	    else {
	        this._sizeGetter = null;
	        this._output.size = size;
	    }
	    return this;
	};
	Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {
	    if (proportions instanceof Function)
	        this._proportionGetter = proportions;
	    else if (proportions instanceof Object && proportions.get)
	        this._proportionGetter = proportions.get.bind(proportions);
	    else {
	        this._proportionGetter = null;
	        this._output.proportions = proportions;
	    }
	    return this;
	};
	Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
	    if (transition || this._legacyStates.transform) {
	        if (!this._legacyStates.transform) {
	            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
	        }
	        if (!this._transformGetter)
	            this.transformFrom(this._legacyStates.transform);
	        this._legacyStates.transform.set(transform, transition, callback);
	        return this;
	    } else
	        return this.transformFrom(transform);
	};
	Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
	    if (transition || this._legacyStates.opacity) {
	        if (!this._legacyStates.opacity) {
	            this._legacyStates.opacity = new Transitionable(this._output.opacity);
	        }
	        if (!this._opacityGetter)
	            this.opacityFrom(this._legacyStates.opacity);
	        return this._legacyStates.opacity.set(opacity, transition, callback);
	    } else
	        return this.opacityFrom(opacity);
	};
	Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
	    if (transition || this._legacyStates.origin) {
	        if (!this._legacyStates.origin) {
	            this._legacyStates.origin = new Transitionable(this._output.origin || [
	                0,
	                0
	            ]);
	        }
	        if (!this._originGetter)
	            this.originFrom(this._legacyStates.origin);
	        this._legacyStates.origin.set(origin, transition, callback);
	        return this;
	    } else
	        return this.originFrom(origin);
	};
	Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
	    if (transition || this._legacyStates.align) {
	        if (!this._legacyStates.align) {
	            this._legacyStates.align = new Transitionable(this._output.align || [
	                0,
	                0
	            ]);
	        }
	        if (!this._alignGetter)
	            this.alignFrom(this._legacyStates.align);
	        this._legacyStates.align.set(align, transition, callback);
	        return this;
	    } else
	        return this.alignFrom(align);
	};
	Modifier.prototype.setSize = function setSize(size, transition, callback) {
	    if (size && (transition || this._legacyStates.size)) {
	        if (!this._legacyStates.size) {
	            this._legacyStates.size = new Transitionable(this._output.size || [
	                0,
	                0
	            ]);
	        }
	        if (!this._sizeGetter)
	            this.sizeFrom(this._legacyStates.size);
	        this._legacyStates.size.set(size, transition, callback);
	        return this;
	    } else
	        return this.sizeFrom(size);
	};
	Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {
	    if (proportions && (transition || this._legacyStates.proportions)) {
	        if (!this._legacyStates.proportions) {
	            this._legacyStates.proportions = new Transitionable(this._output.proportions || [
	                0,
	                0
	            ]);
	        }
	        if (!this._proportionGetter)
	            this.proportionsFrom(this._legacyStates.proportions);
	        this._legacyStates.proportions.set(proportions, transition, callback);
	        return this;
	    } else
	        return this.proportionsFrom(proportions);
	};
	Modifier.prototype.halt = function halt() {
	    if (this._legacyStates.transform)
	        this._legacyStates.transform.halt();
	    if (this._legacyStates.opacity)
	        this._legacyStates.opacity.halt();
	    if (this._legacyStates.origin)
	        this._legacyStates.origin.halt();
	    if (this._legacyStates.align)
	        this._legacyStates.align.halt();
	    if (this._legacyStates.size)
	        this._legacyStates.size.halt();
	    if (this._legacyStates.proportions)
	        this._legacyStates.proportions.halt();
	    this._transformGetter = null;
	    this._opacityGetter = null;
	    this._originGetter = null;
	    this._alignGetter = null;
	    this._sizeGetter = null;
	    this._proportionGetter = null;
	};
	Modifier.prototype.getTransform = function getTransform() {
	    return this._transformGetter();
	};
	Modifier.prototype.getFinalTransform = function getFinalTransform() {
	    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
	};
	Modifier.prototype.getOpacity = function getOpacity() {
	    return this._opacityGetter();
	};
	Modifier.prototype.getOrigin = function getOrigin() {
	    return this._originGetter();
	};
	Modifier.prototype.getAlign = function getAlign() {
	    return this._alignGetter();
	};
	Modifier.prototype.getSize = function getSize() {
	    return this._sizeGetter ? this._sizeGetter() : this._output.size;
	};
	Modifier.prototype.getProportions = function getProportions() {
	    return this._proportionGetter ? this._proportionGetter() : this._output.proportions;
	};
	function _update() {
	    if (this._transformGetter)
	        this._output.transform = this._transformGetter();
	    if (this._opacityGetter)
	        this._output.opacity = this._opacityGetter();
	    if (this._originGetter)
	        this._output.origin = this._originGetter();
	    if (this._alignGetter)
	        this._output.align = this._alignGetter();
	    if (this._sizeGetter)
	        this._output.size = this._sizeGetter();
	    if (this._proportionGetter)
	        this._output.proportions = this._proportionGetter();
	}
	Modifier.prototype.modify = function modify(target) {
	    _update.call(this);
	    this._output.target = target;
	    return this._output;
	};
	module.exports = Modifier;

/***/ },
/* 34 */
/*!**********************************************!*\
  !*** ../~/famous/modifiers/StateModifier.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Modifier = __webpack_require__(/*! ../core/Modifier */ 33);
	var Transform = __webpack_require__(/*! ../core/Transform */ 32);
	var Transitionable = __webpack_require__(/*! ../transitions/Transitionable */ 44);
	var TransitionableTransform = __webpack_require__(/*! ../transitions/TransitionableTransform */ 47);
	function StateModifier(options) {
	    this._transformState = new TransitionableTransform(Transform.identity);
	    this._opacityState = new Transitionable(1);
	    this._originState = new Transitionable([
	        0,
	        0
	    ]);
	    this._alignState = new Transitionable([
	        0,
	        0
	    ]);
	    this._sizeState = new Transitionable([
	        0,
	        0
	    ]);
	    this._proportionsState = new Transitionable([
	        0,
	        0
	    ]);
	    this._modifier = new Modifier({
	        transform: this._transformState,
	        opacity: this._opacityState,
	        origin: null,
	        align: null,
	        size: null,
	        proportions: null
	    });
	    this._hasOrigin = false;
	    this._hasAlign = false;
	    this._hasSize = false;
	    this._hasProportions = false;
	    if (options) {
	        if (options.transform)
	            this.setTransform(options.transform);
	        if (options.opacity !== undefined)
	            this.setOpacity(options.opacity);
	        if (options.origin)
	            this.setOrigin(options.origin);
	        if (options.align)
	            this.setAlign(options.align);
	        if (options.size)
	            this.setSize(options.size);
	        if (options.proportions)
	            this.setProportions(options.proportions);
	    }
	}
	StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {
	    this._transformState.set(transform, transition, callback);
	    return this;
	};
	StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
	    this._opacityState.set(opacity, transition, callback);
	    return this;
	};
	StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
	    if (origin === null) {
	        if (this._hasOrigin) {
	            this._modifier.originFrom(null);
	            this._hasOrigin = false;
	        }
	        return this;
	    } else if (!this._hasOrigin) {
	        this._hasOrigin = true;
	        this._modifier.originFrom(this._originState);
	    }
	    this._originState.set(origin, transition, callback);
	    return this;
	};
	StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
	    if (align === null) {
	        if (this._hasAlign) {
	            this._modifier.alignFrom(null);
	            this._hasAlign = false;
	        }
	        return this;
	    } else if (!this._hasAlign) {
	        this._hasAlign = true;
	        this._modifier.alignFrom(this._alignState);
	    }
	    this._alignState.set(align, transition, callback);
	    return this;
	};
	StateModifier.prototype.setSize = function setSize(size, transition, callback) {
	    if (size === null) {
	        if (this._hasSize) {
	            this._modifier.sizeFrom(null);
	            this._hasSize = false;
	        }
	        return this;
	    } else if (!this._hasSize) {
	        this._hasSize = true;
	        this._modifier.sizeFrom(this._sizeState);
	    }
	    this._sizeState.set(size, transition, callback);
	    return this;
	};
	StateModifier.prototype.setProportions = function setSize(proportions, transition, callback) {
	    if (proportions === null) {
	        if (this._hasProportions) {
	            this._modifier.proportionsFrom(null);
	            this._hasProportions = false;
	        }
	        return this;
	    } else if (!this._hasProportions) {
	        this._hasProportions = true;
	        this._modifier.proportionsFrom(this._proportionsState);
	    }
	    this._proportionsState.set(proportions, transition, callback);
	    return this;
	};
	StateModifier.prototype.halt = function halt() {
	    this._transformState.halt();
	    this._opacityState.halt();
	    this._originState.halt();
	    this._alignState.halt();
	    this._sizeState.halt();
	    this._proportionsState.halt();
	};
	StateModifier.prototype.getTransform = function getTransform() {
	    return this._transformState.get();
	};
	StateModifier.prototype.getFinalTransform = function getFinalTransform() {
	    return this._transformState.getFinal();
	};
	StateModifier.prototype.getOpacity = function getOpacity() {
	    return this._opacityState.get();
	};
	StateModifier.prototype.getOrigin = function getOrigin() {
	    return this._hasOrigin ? this._originState.get() : null;
	};
	StateModifier.prototype.getAlign = function getAlign() {
	    return this._hasAlign ? this._alignState.get() : null;
	};
	StateModifier.prototype.getSize = function getSize() {
	    return this._hasSize ? this._sizeState.get() : null;
	};
	StateModifier.prototype.getProportions = function getProportions() {
	    return this._hasProportions ? this._proportionsState.get() : null;
	};
	StateModifier.prototype.modify = function modify(target) {
	    return this._modifier.modify(target);
	};
	module.exports = StateModifier;

/***/ },
/* 35 */
/*!**************************************!*\
  !*** ../~/famous/utilities/Timer.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var FamousEngine = __webpack_require__(/*! ../core/Engine */ 7);
	var _event = 'prerender';
	var getTime = window.performance && window.performance.now ? function () {
	    return window.performance.now();
	} : function () {
	    return Date.now();
	};
	function addTimerFunction(fn) {
	    FamousEngine.on(_event, fn);
	    return fn;
	}
	function setTimeout(fn, duration) {
	    var t = getTime();
	    var callback = function () {
	        var t2 = getTime();
	        if (t2 - t >= duration) {
	            fn.apply(this, arguments);
	            FamousEngine.removeListener(_event, callback);
	        }
	    };
	    return addTimerFunction(callback);
	}
	function setInterval(fn, duration) {
	    var t = getTime();
	    var callback = function () {
	        var t2 = getTime();
	        if (t2 - t >= duration) {
	            fn.apply(this, arguments);
	            t = getTime();
	        }
	    };
	    return addTimerFunction(callback);
	}
	function after(fn, numTicks) {
	    if (numTicks === undefined)
	        return undefined;
	    var callback = function () {
	        numTicks--;
	        if (numTicks <= 0) {
	            fn.apply(this, arguments);
	            clear(callback);
	        }
	    };
	    return addTimerFunction(callback);
	}
	function every(fn, numTicks) {
	    numTicks = numTicks || 1;
	    var initial = numTicks;
	    var callback = function () {
	        numTicks--;
	        if (numTicks <= 0) {
	            fn.apply(this, arguments);
	            numTicks = initial;
	        }
	    };
	    return addTimerFunction(callback);
	}
	function clear(fn) {
	    FamousEngine.removeListener(_event, fn);
	}
	function debounce(func, wait) {
	    var timeout;
	    var ctx;
	    var timestamp;
	    var result;
	    var args;
	    return function () {
	        ctx = this;
	        args = arguments;
	        timestamp = getTime();
	        var fn = function () {
	            var last = getTime - timestamp;
	            if (last < wait) {
	                timeout = setTimeout(fn, wait - last);
	            } else {
	                timeout = null;
	                result = func.apply(ctx, args);
	            }
	        };
	        clear(timeout);
	        timeout = setTimeout(fn, wait);
	        return result;
	    };
	}
	module.exports = {
	    setTimeout: setTimeout,
	    setInterval: setInterval,
	    debounce: debounce,
	    after: after,
	    every: every,
	    clear: clear
	};

/***/ },
/* 36 */
/*!*****************************************!*\
  !*** ../~/famous/core/ElementOutput.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Entity = __webpack_require__(/*! ./Entity */ 37);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 28);
	var Transform = __webpack_require__(/*! ./Transform */ 32);
	var usePrefix = !('transform' in document.documentElement.style);
	var devicePixelRatio = window.devicePixelRatio || 1;
	function ElementOutput(element) {
	    this._matrix = null;
	    this._opacity = 1;
	    this._origin = null;
	    this._size = null;
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    this.eventForwarder = function eventForwarder(event) {
	        this._eventOutput.emit(event.type, event);
	    }.bind(this);
	    this.id = Entity.register(this);
	    this._element = null;
	    this._sizeDirty = false;
	    this._originDirty = false;
	    this._transformDirty = false;
	    this._invisible = false;
	    if (element)
	        this.attach(element);
	}
	ElementOutput.prototype.on = function on(type, fn) {
	    if (this._element)
	        this._element.addEventListener(type, this.eventForwarder);
	    this._eventOutput.on(type, fn);
	};
	ElementOutput.prototype.removeListener = function removeListener(type, fn) {
	    this._eventOutput.removeListener(type, fn);
	};
	ElementOutput.prototype.emit = function emit(type, event) {
	    if (event && !event.origin)
	        event.origin = this;
	    var handled = this._eventOutput.emit(type, event);
	    if (handled && event && event.stopPropagation)
	        event.stopPropagation();
	    return handled;
	};
	ElementOutput.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};
	ElementOutput.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};
	ElementOutput.prototype.render = function render() {
	    return this.id;
	};
	function _addEventListeners(target) {
	    for (var i in this._eventOutput.listeners) {
	        target.addEventListener(i, this.eventForwarder);
	    }
	}
	function _removeEventListeners(target) {
	    for (var i in this._eventOutput.listeners) {
	        target.removeEventListener(i, this.eventForwarder);
	    }
	}
	function _formatCSSTransform(m) {
	    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
	    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
	    var result = 'matrix3d(';
	    for (var i = 0; i < 15; i++) {
	        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
	    }
	    result += m[15] + ')';
	    return result;
	}
	var _setMatrix;
	if (usePrefix) {
	    _setMatrix = function (element, matrix) {
	        element.style.webkitTransform = _formatCSSTransform(matrix);
	    };
	} else {
	    _setMatrix = function (element, matrix) {
	        element.style.transform = _formatCSSTransform(matrix);
	    };
	}
	function _formatCSSOrigin(origin) {
	    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
	}
	var _setOrigin = usePrefix ? function (element, origin) {
	    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
	} : function (element, origin) {
	    element.style.transformOrigin = _formatCSSOrigin(origin);
	};
	var _setInvisible = usePrefix ? function (element) {
	    element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
	    element.style.opacity = 0;
	} : function (element) {
	    element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
	    element.style.opacity = 0;
	};
	function _xyNotEquals(a, b) {
	    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
	}
	ElementOutput.prototype.commit = function commit(context) {
	    var target = this._element;
	    if (!target)
	        return;
	    var matrix = context.transform;
	    var opacity = context.opacity;
	    var origin = context.origin;
	    var size = context.size;
	    if (!matrix && this._matrix) {
	        this._matrix = null;
	        this._opacity = 0;
	        _setInvisible(target);
	        return;
	    }
	    if (_xyNotEquals(this._origin, origin))
	        this._originDirty = true;
	    if (Transform.notEquals(this._matrix, matrix))
	        this._transformDirty = true;
	    if (this._invisible) {
	        this._invisible = false;
	        this._element.style.display = '';
	    }
	    if (this._opacity !== opacity) {
	        this._opacity = opacity;
	        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
	    }
	    if (this._transformDirty || this._originDirty || this._sizeDirty) {
	        if (this._sizeDirty)
	            this._sizeDirty = false;
	        if (this._originDirty) {
	            if (origin) {
	                if (!this._origin)
	                    this._origin = [
	                        0,
	                        0
	                    ];
	                this._origin[0] = origin[0];
	                this._origin[1] = origin[1];
	            } else
	                this._origin = null;
	            _setOrigin(target, this._origin);
	            this._originDirty = false;
	        }
	        if (!matrix)
	            matrix = Transform.identity;
	        this._matrix = matrix;
	        var aaMatrix = this._size ? Transform.thenMove(matrix, [
	            -this._size[0] * origin[0],
	            -this._size[1] * origin[1],
	            0
	        ]) : matrix;
	        _setMatrix(target, aaMatrix);
	        this._transformDirty = false;
	    }
	};
	ElementOutput.prototype.cleanup = function cleanup() {
	    if (this._element) {
	        this._invisible = true;
	        this._element.style.display = 'none';
	    }
	};
	ElementOutput.prototype.attach = function attach(target) {
	    this._element = target;
	    _addEventListeners.call(this, target);
	};
	ElementOutput.prototype.detach = function detach() {
	    var target = this._element;
	    if (target) {
	        _removeEventListeners.call(this, target);
	        if (this._invisible) {
	            this._invisible = false;
	            this._element.style.display = '';
	        }
	    }
	    this._element = null;
	    return target;
	};
	module.exports = ElementOutput;

/***/ },
/* 37 */
/*!**********************************!*\
  !*** ../~/famous/core/Entity.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var entities = [];
	function get(id) {
	    return entities[id];
	}
	function set(id, entity) {
	    entities[id] = entity;
	}
	function register(entity) {
	    var id = entities.length;
	    set(id, entity);
	    return id;
	}
	function unregister(id) {
	    set(id, null);
	}
	module.exports = {
	    register: register,
	    unregister: unregister,
	    get: get,
	    set: set
	};

/***/ },
/* 38 */
/*!****************************************!*\
  !*** ../~/famous/core/ViewSequence.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function ViewSequence(options) {
	    if (!options)
	        options = [];
	    if (options instanceof Array)
	        options = { array: options };
	    this._ = null;
	    this.index = options.index || 0;
	    if (options.array)
	        this._ = new this.constructor.Backing(options.array);
	    else if (options._)
	        this._ = options._;
	    if (this.index === this._.firstIndex)
	        this._.firstNode = this;
	    if (this.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = this;
	    if (options.loop !== undefined)
	        this._.loop = options.loop;
	    if (options.trackSize !== undefined)
	        this._.trackSize = options.trackSize;
	    this._previousNode = null;
	    this._nextNode = null;
	}
	ViewSequence.Backing = function Backing(array) {
	    this.array = array;
	    this.firstIndex = 0;
	    this.loop = false;
	    this.firstNode = null;
	    this.lastNode = null;
	    this.cumulativeSizes = [[
	            0,
	            0
	        ]];
	    this.sizeDirty = true;
	    this.trackSize = false;
	};
	ViewSequence.Backing.prototype.getValue = function getValue(i) {
	    var _i = i - this.firstIndex;
	    if (_i < 0 || _i >= this.array.length)
	        return null;
	    return this.array[_i];
	};
	ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
	    this.array[i - this.firstIndex] = value;
	};
	ViewSequence.Backing.prototype.getSize = function getSize(index) {
	    return this.cumulativeSizes[index];
	};
	ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
	    index = index || this.array.length;
	    var size = [
	        0,
	        0
	    ];
	    for (var i = 0; i < index; i++) {
	        var nodeSize = this.array[i].getSize();
	        if (!nodeSize)
	            return undefined;
	        if (size[0] !== undefined) {
	            if (nodeSize[0] === undefined)
	                size[0] = undefined;
	            else
	                size[0] += nodeSize[0];
	        }
	        if (size[1] !== undefined) {
	            if (nodeSize[1] === undefined)
	                size[1] = undefined;
	            else
	                size[1] += nodeSize[1];
	        }
	        this.cumulativeSizes[i + 1] = size.slice();
	    }
	    this.sizeDirty = false;
	    return size;
	};
	ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
	    if (!this.array[0])
	        return;
	    var i = 0;
	    var index = this.firstIndex;
	    var indexShiftAmount = insertCount - removeCount;
	    var node = this.firstNode;
	    while (index < start - 1) {
	        node = node.getNext();
	        index++;
	    }
	    var spliceStartNode = node;
	    for (i = 0; i < removeCount; i++) {
	        node = node.getNext();
	        if (node)
	            node._previousNode = spliceStartNode;
	    }
	    var spliceResumeNode = node ? node.getNext() : null;
	    spliceStartNode._nextNode = null;
	    node = spliceStartNode;
	    for (i = 0; i < insertCount; i++)
	        node = node.getNext();
	    index += insertCount;
	    if (node !== spliceResumeNode) {
	        node._nextNode = spliceResumeNode;
	        if (spliceResumeNode)
	            spliceResumeNode._previousNode = node;
	    }
	    if (spliceResumeNode) {
	        node = spliceResumeNode;
	        index++;
	        while (node && index < this.array.length + this.firstIndex) {
	            if (node._nextNode)
	                node.index += indexShiftAmount;
	            else
	                node.index = index;
	            node = node.getNext();
	            index++;
	        }
	    }
	    if (this.trackSize)
	        this.sizeDirty = true;
	};
	ViewSequence.prototype.getPrevious = function getPrevious() {
	    var len = this._.array.length;
	    if (!len) {
	        this._previousNode = null;
	    } else if (this.index === this._.firstIndex) {
	        if (this._.loop) {
	            this._previousNode = this._.lastNode || new this.constructor({
	                _: this._,
	                index: this._.firstIndex + len - 1
	            });
	            this._previousNode._nextNode = this;
	        } else {
	            this._previousNode = null;
	        }
	    } else if (!this._previousNode) {
	        this._previousNode = new this.constructor({
	            _: this._,
	            index: this.index - 1
	        });
	        this._previousNode._nextNode = this;
	    }
	    return this._previousNode;
	};
	ViewSequence.prototype.getNext = function getNext() {
	    var len = this._.array.length;
	    if (!len) {
	        this._nextNode = null;
	    } else if (this.index === this._.firstIndex + len - 1) {
	        if (this._.loop) {
	            this._nextNode = this._.firstNode || new this.constructor({
	                _: this._,
	                index: this._.firstIndex
	            });
	            this._nextNode._previousNode = this;
	        } else {
	            this._nextNode = null;
	        }
	    } else if (!this._nextNode) {
	        this._nextNode = new this.constructor({
	            _: this._,
	            index: this.index + 1
	        });
	        this._nextNode._previousNode = this;
	    }
	    return this._nextNode;
	};
	ViewSequence.prototype.indexOf = function indexOf(item) {
	    return this._.array.indexOf(item);
	};
	ViewSequence.prototype.getIndex = function getIndex() {
	    return this.index;
	};
	ViewSequence.prototype.toString = function toString() {
	    return '' + this.index;
	};
	ViewSequence.prototype.unshift = function unshift(value) {
	    this._.array.unshift.apply(this._.array, arguments);
	    this._.firstIndex -= arguments.length;
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.push = function push(value) {
	    this._.array.push.apply(this._.array, arguments);
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.splice = function splice(index, howMany) {
	    var values = Array.prototype.slice.call(arguments, 2);
	    this._.array.splice.apply(this._.array, [
	        index - this._.firstIndex,
	        howMany
	    ].concat(values));
	    this._.reindex(index, howMany, values.length);
	};
	ViewSequence.prototype.swap = function swap(other) {
	    var otherValue = other.get();
	    var myValue = this.get();
	    this._.setValue(this.index, otherValue);
	    this._.setValue(other.index, myValue);
	    var myPrevious = this._previousNode;
	    var myNext = this._nextNode;
	    var myIndex = this.index;
	    var otherPrevious = other._previousNode;
	    var otherNext = other._nextNode;
	    var otherIndex = other.index;
	    this.index = otherIndex;
	    this._previousNode = otherPrevious === this ? other : otherPrevious;
	    if (this._previousNode)
	        this._previousNode._nextNode = this;
	    this._nextNode = otherNext === this ? other : otherNext;
	    if (this._nextNode)
	        this._nextNode._previousNode = this;
	    other.index = myIndex;
	    other._previousNode = myPrevious === other ? this : myPrevious;
	    if (other._previousNode)
	        other._previousNode._nextNode = other;
	    other._nextNode = myNext === other ? this : myNext;
	    if (other._nextNode)
	        other._nextNode._previousNode = other;
	    if (this.index === this._.firstIndex)
	        this._.firstNode = this;
	    else if (this.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = this;
	    if (other.index === this._.firstIndex)
	        this._.firstNode = other;
	    else if (other.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = other;
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.get = function get() {
	    return this._.getValue(this.index);
	};
	ViewSequence.prototype.getSize = function getSize() {
	    var target = this.get();
	    return target ? target.getSize() : null;
	};
	ViewSequence.prototype.render = function render() {
	    if (this._.trackSize && this._.sizeDirty)
	        this._.calculateSize();
	    var target = this.get();
	    return target ? target.render.apply(target, arguments) : null;
	};
	module.exports = ViewSequence;

/***/ },
/* 39 */
/*!*********************************************!*\
  !*** ../~/famous-flex/src/LayoutUtility.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/*global console*/
	/*eslint no-console:0*/
	
	/**
	 * Utility class for famous-flex.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 31);
	
	    /**
	     * @class
	     * @alias module:LayoutUtility
	     */
	    function LayoutUtility() {
	    }
	    LayoutUtility.registeredHelpers = {};
	
	    var Capabilities = {
	        SEQUENCE: 1,
	        DIRECTION_X: 2,
	        DIRECTION_Y: 4,
	        SCROLLING: 8
	    };
	    LayoutUtility.Capabilities = Capabilities;
	
	    /**
	     *  Normalizes the margins argument.
	     *
	     *  @param {Array.Number} margins
	     */
	    LayoutUtility.normalizeMargins = function(margins) {
	        if (!margins) {
	            return [0, 0, 0, 0];
	        }
	        else if (!Array.isArray(margins)) {
	            return [margins, margins, margins, margins];
	        }
	        else if (margins.length === 0) {
	            return [0, 0, 0, 0];
	        }
	        else if (margins.length === 1) {
	            return [margins[0], margins[0], margins[0], margins[0]];
	        }
	        else if (margins.length === 2) {
	            return [margins[0], margins[1], margins[0], margins[1]];
	        }
	        else {
	            return margins;
	        }
	    };
	
	    /**
	     * Makes a (shallow) copy of a spec.
	     *
	     * @param {Spec} spec Spec to clone
	     * @return {Spec} cloned spec
	     */
	    LayoutUtility.cloneSpec = function(spec) {
	        var clone = {};
	        if (spec.opacity !== undefined) {
	            clone.opacity = spec.opacity;
	        }
	        if (spec.size !== undefined) {
	            clone.size = spec.size.slice(0);
	        }
	        if (spec.transform !== undefined) {
	            clone.transform = spec.transform.slice(0);
	        }
	        if (spec.origin !== undefined) {
	            clone.origin = spec.origin.slice(0);
	        }
	        if (spec.align !== undefined) {
	            clone.align = spec.align.slice(0);
	        }
	        return clone;
	    };
	
	    /**
	     * Compares two arrays for equality.
	     */
	    function _isEqualArray(a, b) {
	        if (a === b) {
	            return true;
	        }
	        if ((a === undefined) || (b === undefined)) {
	            return false;
	        }
	        var i = a.length;
	        if (i !== b.length){
	            return false;
	        }
	        while (i--) {
	            if (a[i] !== b[i]) {
	                return false;
	            }
	        }
	        return true;
	    }
	
	    /**
	     * Compares two specs for equality.
	     *
	     * @param {Spec} spec1 Spec to compare
	     * @param {Spec} spec2 Spec to compare
	     * @return {Boolean} true/false
	     */
	    LayoutUtility.isEqualSpec = function(spec1, spec2) {
	        if (spec1.opacity !== spec2.opacity) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.size, spec2.size)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.transform, spec2.transform)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.origin, spec2.origin)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.align, spec2.align)) {
	            return false;
	        }
	        return true;
	    };
	
	    /**
	     * Helper function that returns a string containing the differences
	     * between two specs.
	     *
	     * @param {Spec} spec1 Spec to compare
	     * @param {Spec} spec2 Spec to compare
	     * @return {String} text
	     */
	    LayoutUtility.getSpecDiffText = function(spec1, spec2) {
	        var result = 'spec diff:';
	        if (spec1.opacity !== spec2.opacity) {
	            result += '\nopacity: ' + spec1.opacity + ' != ' + spec2.opacity;
	        }
	        if (!_isEqualArray(spec1.size, spec2.size)) {
	            result += '\nsize: ' + JSON.stringify(spec1.size) + ' != ' + JSON.stringify(spec2.size);
	        }
	        if (!_isEqualArray(spec1.transform, spec2.transform)) {
	            result += '\ntransform: ' + JSON.stringify(spec1.transform) + ' != ' + JSON.stringify(spec2.transform);
	        }
	        if (!_isEqualArray(spec1.origin, spec2.origin)) {
	            result += '\norigin: ' + JSON.stringify(spec1.origin) + ' != ' + JSON.stringify(spec2.origin);
	        }
	        if (!_isEqualArray(spec1.align, spec2.align)) {
	            result += '\nalign: ' + JSON.stringify(spec1.align) + ' != ' + JSON.stringify(spec2.align);
	        }
	        return result;
	    };
	
	    /**
	     * Helper function to call whenever a critical error has occurred.
	     *
	     * @param {String} message error-message
	     */
	    LayoutUtility.error = function(message) {
	        console.log('ERROR: ' + message);
	        throw message;
	    };
	
	    /**
	     * Helper function to call whenever a warning error has occurred.
	     *
	     * @param {String} message warning-message
	     */
	    LayoutUtility.warning = function(message) {
	        console.log('WARNING: ' + message);
	    };
	
	    /**
	     * Helper function to log 1 or more arguments. All the arguments
	     * are concatenated to produce a single string which is logged.
	     *
	     * @param {String|Array|Object} args arguments to stringify and concatenate
	     */
	    LayoutUtility.log = function(args) {
	        var message = '';
	        for (var i = 0; i < arguments.length; i++) {
	            var arg = arguments[i];
	            if ((arg instanceof Object) || (arg instanceof Array)) {
	                message += JSON.stringify(arg);
	            }
	            else {
	                message += arg;
	            }
	        }
	        console.log(message);
	    };
	
	    /**
	     * Combines two sets of options into a single set.
	     *
	     * @param {Object} options1 base set of options
	     * @param {Object} options2 set of options to merge into `options1`
	     * @param {Bool} [forceClone] ensures that a clone is returned rather that one of the original options objects
	     * @return {Object} Combined options
	     */
	    LayoutUtility.combineOptions = function(options1, options2, forceClone) {
	        if (options1 && !options2 && !forceClone) {
	            return options1;
	        }
	        else if (!options1 && options2 && !forceClone) {
	            return options2;
	        }
	        var options = Utility.clone(options1 || {});
	        if (options2) {
	            for (var key in options2) {
	                options[key] = options2[key];
	            }
	        }
	        return options;
	    };
	
	    /**
	     * Registers a layout-helper so it can be used as a layout-literal for
	     * a layout-controller. The LayoutHelper instance must support the `parse`
	     * function, which is fed the layout-literal content.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * Layout.registerHelper('dock', LayoutDockHelper);
	     *
	     * var layoutController = new LayoutController({
	     *   layout: { dock: [,
	     *     ['top', 'header', 50],
	     *     ['bottom', 'footer', 50],
	     *     ['fill', 'content'],
	     *   ]},
	     *   dataSource: {
	     *     header: new Surface({content: 'Header'}),
	     *     footer: new Surface({content: 'Footer'}),
	     *     content: new Surface({content: 'Content'}),
	     *   }
	     * })
	     * ```
	     *
	     * @param {String} name name of the helper (e.g. 'dock')
	     * @param {Function} Helper Helper to register (e.g. LayoutDockHelper)
	     */
	    LayoutUtility.registerHelper = function(name, Helper) {
	        if (!Helper.prototype.parse) {
	            LayoutUtility.error('The layout-helper for name "' + name + '" is required to support the "parse" method');
	        }
	        if (this.registeredHelpers[name] !== undefined) {
	            LayoutUtility.warning('A layout-helper with the name "' + name + '" is already registered and will be overwritten');
	        }
	        this.registeredHelpers[name] = Helper;
	    };
	
	    /**
	     * Unregisters a layout-helper.
	     *
	     * @param {String} name name of the layout-helper
	     */
	    LayoutUtility.unregisterHelper = function(name) {
	        delete this.registeredHelpers[name];
	    };
	
	    /**
	     * Gets a registered layout-helper by its name.
	     *
	     * @param {String} name name of the layout-helper
	     * @return {Function} layout-helper or undefined
	     */
	    LayoutUtility.getRegisteredHelper = function(name) {
	        return this.registeredHelpers[name];
	    };
	
	    // Layout function
	    module.exports = LayoutUtility;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 40 */
/*!*************************************************!*\
  !*** ../~/famous-flex/src/LayoutNodeManager.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * LayoutNodeManager is a private class used internally by LayoutController, ScrollController
	 * and ScrollView. It manages the layout-nodes that are rendered and exposes the layout-context
	 * which is passed along to the layout-function.
	 *
	 * LayoutNodeManager keeps track of every rendered node through an ordered double-linked
	 * list. The first time the layout-function is called, the linked list is created.
	 * After that, the linked list is updated to reflect the output of the layout-function.
	 * When the layout is unchanged, then the linked-list exactly matches the order of the
	 * accessed nodes in the layout-function, and no layout-nodes need to be created or
	 * re-ordered.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutContext = __webpack_require__(/*! ./LayoutContext */ 48);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 39);
	
	    var MAX_POOL_SIZE = 100;
	
	    /**
	     * @class
	     * @param {LayoutNode} LayoutNode Layout-nodes to create
	     * @param {Function} initLayoutNodeFn function to use when initializing new nodes
	     * @alias module:LayoutNodeManager
	     */
	    function LayoutNodeManager(LayoutNode, initLayoutNodeFn) {
	        this.LayoutNode = LayoutNode;
	        this._initLayoutNodeFn = initLayoutNodeFn;
	        this._layoutCount = 0;
	        this._context = new LayoutContext({
	            next: _contextNext.bind(this),
	            prev: _contextPrev.bind(this),
	            get: _contextGet.bind(this),
	            set: _contextSet.bind(this),
	            resolveSize: _contextResolveSize.bind(this),
	            size: [0, 0]
	            //,cycle: 0
	        });
	        this._contextState = {
	            // enumation state for the context
	            //nextSequence: undefined,
	            //prevSequence: undefined,
	            //next: undefined
	            //prev: undefined
	            //start: undefined
	        };
	        this._pool = {
	            layoutNodes: {
	                size: 0
	                //first: undefined
	            },
	            resolveSize: [0, 0]
	        };
	        //this._first = undefined; // first item in the linked list
	        //this._nodesById = undefined;
	        //this._trueSizeRequested = false;
	    }
	
	    /**
	     * Prepares the manager for a new layout iteration, after which it returns the
	     * context which can be used by the layout-function.
	     *
	     * @param {ViewSequence} viewSequence first node to layout
	     * @param {Object} [nodesById] dictionary to use when looking up nodes by id
	     * @return {LayoutContext} context which can be passed to the layout-function
	     */
	    LayoutNodeManager.prototype.prepareForLayout = function(viewSequence, nodesById, contextData) {
	
	        // Reset all nodes
	        var node = this._first;
	        while (node) {
	            node.reset();
	            node = node._next;
	        }
	
	        // Prepare data
	        var context = this._context;
	        this._layoutCount++;
	        this._nodesById = nodesById;
	        this._trueSizeRequested = false;
	        this._reevalTrueSize =
	            contextData.reevalTrueSize ||
	            !context.size ||
	            (context.size[0] !== contextData.size[0]) ||
	            (context.size[1] !== contextData.size[1]);
	
	        // Prepare context for enumation
	        var contextState = this._contextState;
	        contextState.startSequence = viewSequence;
	        contextState.nextSequence = viewSequence;
	        contextState.prevSequence = viewSequence;
	        contextState.start = undefined;
	        contextState.nextGetIndex = 0;
	        contextState.prevGetIndex = 0;
	        contextState.nextSetIndex = 0;
	        contextState.prevSetIndex = 0;
	        contextState.addCount = 0;
	        contextState.removeCount = 0;
	        contextState.lastRenderNode = undefined;
	
	        // Prepare content
	        context.size[0] = contextData.size[0];
	        context.size[1] = contextData.size[1];
	        context.direction = contextData.direction;
	        context.reverse = contextData.reverse;
	        context.alignment = contextData.reverse ? 1 : 0;
	        context.scrollOffset = contextData.scrollOffset || 0;
	        context.scrollStart = contextData.scrollStart || 0;
	        context.scrollEnd = contextData.scrollEnd || context.size[context.direction];
	        //context.cycle++;
	        return context;
	    };
	
	    /**
	     * When the layout-function no longer lays-out the node, then it is not longer
	     * being invalidated. In this case the destination is set to the removeSpec
	     * after which the node is animated towards the remove-spec.
	     *
	     * @param {Spec} [removeSpec] spec towards which the no longer layed-out nodes are animated
	     */
	    LayoutNodeManager.prototype.removeNonInvalidatedNodes = function(removeSpec) {
	        var node = this._first;
	        while (node) {
	
	            // If a node existed, but it is no longer being layed out,
	            // then set it to the '_removing' state.
	            if (!node._invalidated && !node._removing) {
	                node.remove(removeSpec);
	            }
	
	            // Move to next node
	            node = node._next;
	        }
	    };
	
	    /**
	     * Cleans up any unaccessed virtual nodes that have been created by a VirtualViewSequence.
	     */
	    LayoutNodeManager.prototype.removeVirtualViewSequenceNodes = function() {
	        if (this._contextState.startSequence && this._contextState.startSequence.cleanup) {
	            this._contextState.startSequence.cleanup();
	        }
	    };
	
	    /**
	     * Builds the render-spec and destroy any layout-nodes that no longer
	     * return a render-spec.
	     *
	     * @return {Array.Spec} array of Specs
	     */
	    LayoutNodeManager.prototype.buildSpecAndDestroyUnrenderedNodes = function(translate) {
	        var specs = [];
	        var result = {
	            specs: specs,
	            modified: false
	        };
	        var node = this._first;
	        while (node) {
	            var modified = node._specModified;
	            var spec = node.getSpec();
	            if (spec.removed) {
	
	                // Destroy node
	                var destroyNode = node;
	                node = node._next;
	                _destroyNode.call(this, destroyNode);
	
	                // Mark as modified
	                result.modified = true;
	            }
	            else {
	
	                // Update stats
	                if (modified) {
	                    if (spec.transform && translate) {
	                        spec.transform[12] += translate[0];
	                        spec.transform[13] += translate[1];
	                        spec.transform[14] += translate[2];
	                        spec.transform[12] = Math.round(spec.transform[12] * 100000) / 100000;
	                        spec.transform[13] = Math.round(spec.transform[13] * 100000) / 100000;
	                        if (spec.endState) {
	                            spec.endState.transform[12] += translate[0];
	                            spec.endState.transform[13] += translate[1];
	                            spec.endState.transform[14] += translate[2];
	                            spec.endState.transform[12] = Math.round(spec.endState.transform[12] * 100000) / 100000;
	                            spec.endState.transform[13] = Math.round(spec.endState.transform[13] * 100000) / 100000;
	                        }
	                    }
	                    result.modified = true;
	                }
	
	                // Add node to result output
	                specs.push(spec);
	                node = node._next;
	            }
	        }
	        this._contextState.addCount = 0;
	        this._contextState.removeCount = 0;
	        return result;
	    };
	
	    /**
	     * Get the layout-node by its renderable.
	     *
	     * @param {Object} renderable renderable
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutNodeManager.prototype.getNodeByRenderNode = function(renderable) {
	        var node = this._first;
	        while (node) {
	            if (node.renderNode === renderable) {
	                return node;
	            }
	            node = node._next;
	        }
	        return undefined;
	    };
	
	    /**
	     * Inserts a layout-node into the linked-list.
	     *
	     * @param {LayoutNode} node layout-node to insert
	     */
	    LayoutNodeManager.prototype.insertNode = function(node) {
	        node._next = this._first;
	        if (this._first) {
	            this._first._prev = node;
	        }
	        this._first = node;
	    };
	
	    /**
	     * Sets the options for all nodes.
	     *
	     * @param {Object} options node options
	     */
	    LayoutNodeManager.prototype.setNodeOptions = function(options) {
	        this._nodeOptions = options;
	        var node = this._first;
	        while (node) {
	            node.setOptions(options);
	            node = node._next;
	        }
	        node = this._pool.layoutNodes.first;
	        while (node) {
	            node.setOptions(options);
	            node = node._next;
	        }
	    };
	
	    /**
	     * Pre-allocate layout-nodes ahead of using them.
	     *
	     * @param {Number} count number of nodes to pre-allocate with the given spec
	     * @param {Spec} [spec] render-spec (defined the node properties which to pre-allocate)
	     */
	    LayoutNodeManager.prototype.preallocateNodes = function(count, spec) {
	        var nodes = [];
	        for (var i = 0; i < count ; i++) {
	            nodes.push(this.createNode(undefined, spec));
	        }
	        for (i = 0; i < count ; i++) {
	            _destroyNode.call(this, nodes[i]);
	        }
	    };
	
	    /**
	     * Creates a layout-node
	     *
	     * @param {Object} renderNode render-node for whom to create a layout-node for
	     * @return {LayoutNode} layout-node
	     */
	    LayoutNodeManager.prototype.createNode = function(renderNode, spec) {
	        var node;
	        if (this._pool.layoutNodes.first) {
	            node = this._pool.layoutNodes.first;
	            this._pool.layoutNodes.first = node._next;
	            this._pool.layoutNodes.size--;
	            node.constructor.apply(node, arguments);
	        }
	        else {
	            node = new this.LayoutNode(renderNode, spec);
	            if (this._nodeOptions) {
	                node.setOptions(this._nodeOptions);
	            }
	        }
	        node._prev = undefined;
	        node._next = undefined;
	        node._viewSequence = undefined;
	        node._layoutCount = 0;
	        if (this._initLayoutNodeFn) {
	            this._initLayoutNodeFn.call(this, node, spec);
	        }
	        return node;
	    };
	
	    /**
	     * Removes all nodes.
	     */
	    LayoutNodeManager.prototype.removeAll = function() {
	        var node = this._first;
	        while (node) {
	          var next = node._next;
	          _destroyNode.call(this, node);
	          node = next;
	        }
	        this._first = undefined;
	    };
	
	    /**
	     * Destroys a layout-node
	     */
	    function _destroyNode(node) {
	
	        // Remove node from linked-list
	        if (node._next) {
	            node._next._prev = node._prev;
	        }
	        if (node._prev) {
	            node._prev._next = node._next;
	        }
	        else {
	            this._first = node._next;
	        }
	
	        // Destroy the node
	        node.destroy();
	
	        // Add node to pool
	        if (this._pool.layoutNodes.size < MAX_POOL_SIZE) {
	            this._pool.layoutNodes.size++;
	            node._prev = undefined;
	            node._next = this._pool.layoutNodes.first;
	            this._pool.layoutNodes.first = node;
	        }
	    }
	
	    /**
	     * Gets start layout-node for enumeration.
	     *
	     * @param {Bool} [next] undefined = all, true = all next, false = all previous
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutNodeManager.prototype.getStartEnumNode = function(next) {
	        if (next === undefined) {
	            return this._first;
	        }
	        else if (next === true) {
	            return (this._contextState.start && this._contextState.startPrev) ? this._contextState.start._next : this._contextState.start;
	        }
	        else if (next === false) {
	            return (this._contextState.start && !this._contextState.startPrev) ? this._contextState.start._prev : this._contextState.start;
	        }
	    };
	
	    /**
	     * Checks the integrity of the linked-list.
	     */
	    /*function _checkIntegrity() {
	        var node = this._first;
	        var count = 0;
	        var prevNode;
	        while (node) {
	            if (!node._prev && (node !== this._first)) {
	                throw 'No prev but not first';
	            }
	            if (node._prev !== prevNode) {
	                throw 'Bork';
	            }
	            prevNode = node;
	            node = node._next;
	            count++;
	        }
	    }
	
	    function _checkContextStateIntegrity() {
	        var node = this._contextState.start;
	        while (node) {
	            if (node === this._contextState.next) {
	                break;
	            }
	            if (!node._invalidated) {
	                throw 'WTF';
	            }
	            node = node._next;
	        }
	        node = this._contextState.start;
	        while (node) {
	            if (node === this._contextState.prev) {
	                break;
	            }
	            if (!node._invalidated) {
	                throw 'WTF';
	            }
	            node = node._prev;
	        }
	    }*/
	
	    /**
	     * Creates or gets a layout node.
	     */
	    function _contextGetCreateAndOrderNodes(renderNode, prev) {
	
	        // The first time this function is called, the current
	        // prev/next position is obtained.
	        var node;
	        var state = this._contextState;
	        if (!state.start) {
	            node = this._first;
	            while (node) {
	                if (node.renderNode === renderNode) {
	                    break;
	                }
	                node = node._next;
	            }
	            if (!node) {
	                node = this.createNode(renderNode);
	                node._next = this._first;
	                if (this._first) {
	                    this._first._prev = node;
	                }
	                this._first = node;
	            }
	            state.start = node;
	            state.startPrev = prev;
	            state.prev = node;
	            state.next = node;
	            return node;
	        }
	
	        // Check whether node already exist at the correct position
	        // in the linked-list. If so, return that node immediately
	        // and advance the prev/next pointer for the next/prev
	        // lookup operation.
	        if (prev) {
	            if (state.prev._prev && (state.prev._prev.renderNode === renderNode)) {
	                state.prev = state.prev._prev;
	                return state.prev;
	            }
	        }
	        else {
	            if (state.next._next && (state.next._next.renderNode === renderNode)) {
	                state.next = state.next._next;
	                return state.next;
	            }
	        }
	
	        // Lookup the node anywhere in the list..
	        node = this._first;
	        while (node) {
	            if (node.renderNode === renderNode) {
	                break;
	            }
	            node = node._next;
	        }
	
	        // Create new node if neccessary
	        if (!node) {
	            node = this.createNode(renderNode);
	        }
	
	        // Node existed, remove from linked-list
	        else {
	            if (node._next) {
	                node._next._prev = node._prev;
	            }
	            if (node._prev) {
	                node._prev._next = node._next;
	            }
	            else {
	                this._first = node._next;
	            }
	            node._next = undefined;
	            node._prev = undefined;
	        }
	
	        // Insert node into the linked list
	        if (prev) {
	            if (state.prev._prev) {
	                node._prev = state.prev._prev;
	                state.prev._prev._next = node;
	            }
	            else {
	                this._first = node;
	            }
	            state.prev._prev = node;
	            node._next = state.prev;
	            state.prev = node;
	        }
	        else {
	            if (state.next._next) {
	                node._next = state.next._next;
	                state.next._next._prev = node;
	            }
	            state.next._next = node;
	            node._prev = state.next;
	            state.next = node;
	        }
	
	        return node;
	    }
	
	    /**
	     * Get the next render-node
	     */
	    function _contextNext() {
	
	        // Get the next node from the sequence
	        if (!this._contextState.nextSequence) {
	            return undefined;
	        }
	        if (this._context.reverse) {
	            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
	            if (!this._contextState.nextSequence) {
	                return undefined;
	            }
	        }
	        var renderNode = this._contextState.nextSequence.get();
	        if (!renderNode) {
	            this._contextState.nextSequence = undefined;
	            return undefined;
	        }
	        var nextSequence = this._contextState.nextSequence;
	        if (!this._context.reverse) {
	            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
	        }
	        if (this._contextState.lastRenderNode === renderNode) {
	          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + nextSequence.getIndex();
	        }
	        this._contextState.lastRenderNode = renderNode;
	        return {
	            renderNode: renderNode,
	            viewSequence: nextSequence,
	            next: true,
	            index: ++this._contextState.nextGetIndex
	        };
	    }
	
	    /**
	     * Get the previous render-node
	     */
	    function _contextPrev() {
	
	        // Get the previous node from the sequence
	        if (!this._contextState.prevSequence) {
	            return undefined;
	        }
	        if (!this._context.reverse) {
	            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
	            if (!this._contextState.prevSequence) {
	                return undefined;
	            }
	        }
	        var renderNode = this._contextState.prevSequence.get();
	        if (!renderNode) {
	            this._contextState.prevSequence = undefined;
	            return undefined;
	        }
	        var prevSequence = this._contextState.prevSequence;
	        if (this._context.reverse) {
	            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
	        }
	        if (this._contextState.lastRenderNode === renderNode) {
	          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + prevSequence.getIndex();
	        }
	        this._contextState.lastRenderNode = renderNode;
	        return {
	            renderNode: renderNode,
	            viewSequence: prevSequence,
	            prev: true,
	            index: --this._contextState.prevGetIndex
	        };
	    }
	
	    /**
	     * Resolve id into a context-node.
	     */
	     function _contextGet(contextNodeOrId) {
	        if (this._nodesById && ((contextNodeOrId instanceof String) || (typeof contextNodeOrId === 'string'))) {
	            var renderNode = this._nodesById[contextNodeOrId];
	            if (!renderNode) {
	                return undefined;
	            }
	
	            // Return array
	            if (renderNode instanceof Array) {
	                var result = [];
	                for (var i = 0, j = renderNode.length; i < j; i++) {
	                    result.push({
	                        renderNode: renderNode[i],
	                        arrayElement: true
	                    });
	                }
	                return result;
	            }
	
	            // Create context node
	            return {
	                renderNode: renderNode,
	                byId: true
	            };
	        }
	        else {
	            return contextNodeOrId;
	        }
	    }
	
	    /**
	     * Set the node content
	     */
	    function _contextSet(contextNodeOrId, set) {
	        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
	        if (contextNode) {
	            var node = contextNode.node;
	            if (!node) {
	                if (contextNode.next) {
	                     if (contextNode.index < this._contextState.nextSetIndex) {
	                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
	                     }
	                     this._contextState.nextSetIndex = contextNode.index;
	                }
	                else if (contextNode.prev) {
	                     if (contextNode.index > this._contextState.prevSetIndex) {
	                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
	                     }
	                     this._contextState.prevSetIndex = contextNode.index;
	                }
	                node = _contextGetCreateAndOrderNodes.call(this, contextNode.renderNode, contextNode.prev);
	                node._viewSequence = contextNode.viewSequence;
	                node._layoutCount++;
	                if (node._layoutCount === 1) {
	                    this._contextState.addCount++;
	                }
	                contextNode.node = node;
	            }
	            node.usesTrueSize = contextNode.usesTrueSize;
	            node.trueSizeRequested = contextNode.trueSizeRequested;
	            node.set(set, this._context.size);
	            contextNode.set = set;
	        }
	        return set;
	    }
	
	    /**
	     * Resolve the size of the layout-node from the renderable itsself
	     */
	    function _contextResolveSize(contextNodeOrId, parentSize) {
	        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
	        var resolveSize = this._pool.resolveSize;
	        if (!contextNode) {
	            resolveSize[0] = 0;
	            resolveSize[1] = 0;
	            return resolveSize;
	        }
	
	        // Get in use size
	        var renderNode = contextNode.renderNode;
	        var size = renderNode.getSize();
	        if (!size) {
	            return parentSize;
	        }
	
	        // Check if true-size is used and it must be reavaluated.
	        // This particular piece of code specifically handles true-size Surfaces in famo.us.
	        // It contains portions that ensure that the true-size of a Surface is re-evaluated
	        // and also workaround code that backs up the size of a Surface, so that when the surface
	        // is re-added to the DOM (e.g. when scrolling) it doesn't temporarily have a size of 0.
	        var configSize = renderNode.size && (renderNode._trueSizeCheck !== undefined) ? renderNode.size : undefined;
	        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
	            contextNode.usesTrueSize = true;
	            var backupSize = renderNode._backupSize;
	            if (renderNode._contentDirty || renderNode._trueSizeCheck) {
	              this._trueSizeRequested = true;
	              contextNode.trueSizeRequested = true;
	            }
	            if (renderNode._trueSizeCheck) {
	
	                // Fix for true-size renderables. When true-size is used, the size
	                // is incorrect for one render-cycle due to the fact that Surface.commit
	                // updates the content after asking the DOM for the offsetHeight/offsetWidth.
	                // The code below backs the size up, and re-uses that when this scenario
	                // occurs.
	                if (backupSize && (configSize !== size)) {
	                    var newWidth = (configSize[0] === true) ? Math.max(backupSize[0], size[0]) : size[0];
	                    var newHeight = (configSize[1] === true) ? Math.max(backupSize[1], size[1]) : size[1];
	                    backupSize[0] = newWidth;
	                    backupSize[1] = newHeight;
	                    size = backupSize;
	                    renderNode._backupSize = undefined;
	                    backupSize = undefined;
	                }
	            }
	            if (this._reevalTrueSize || (backupSize && ((backupSize[0] !== size[0]) || (backupSize[1] !== size[1])))) {
	                renderNode._trueSizeCheck = true; // force request of true-size from DOM
	                renderNode._sizeDirty = true;
	                this._trueSizeRequested = true;
	            }
	
	            // Backup the size of the node
	            if (!backupSize) {
	                renderNode._backupSize = [0, 0];
	                backupSize = renderNode._backupSize;
	            }
	            backupSize[0] = size[0];
	            backupSize[1] = size[1];
	        }
	
	        // Ensure re-layout when a child layout-controller is using true-size and it
	        // has ben changed.
	        configSize = renderNode._nodes ? renderNode.options.size : undefined;
	        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
	            if (this._reevalTrueSize || renderNode._nodes._trueSizeRequested) {
	                contextNode.usesTrueSize = true;
	                contextNode.trueSizeRequested = true;
	                this._trueSizeRequested = true;
	            }
	        }
	
	        // Resolve 'undefined' to parent-size and true to 0
	        if ((size[0] === undefined) || (size[0] === true) || (size[1] === undefined) || (size[1] === true)) {
	            resolveSize[0] = size[0];
	            resolveSize[1] = size[1];
	            size = resolveSize;
	            if (size[0] === undefined) {
	                size[0] = parentSize[0];
	            }
	            else if (size[0] === true) {
	                size[0] = 0;
	                this._trueSizeRequested = true;
	                contextNode.trueSizeRequested = true;
	            }
	            if (size[1] === undefined) {
	                size[1] = parentSize[1];
	            }
	            else if (size[1] === true) {
	                size[1] = 0;
	                this._trueSizeRequested = true;
	                contextNode.trueSizeRequested = true;
	            }
	        }
	        return size;
	    }
	
	    module.exports = LayoutNodeManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 41 */
/*!******************************************!*\
  !*** ../~/famous-flex/src/LayoutNode.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * Internal LayoutNode class used by `LayoutController`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 32);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 39);
	
	    /**
	     * @class
	     * @param {Object} renderNode Render-node which this layout-node represents
	     * @alias module:LayoutNode
	     */
	    function LayoutNode(renderNode, spec) {
	        this.renderNode = renderNode;
	        this._spec = spec ? LayoutUtility.cloneSpec(spec) : {};
	        this._spec.renderNode = renderNode; // also store in spec
	        this._specModified = true;
	        this._invalidated = false;
	        this._removing = false;
	        //this.scrollLength = undefined;
	        //this.trueSizeRequested = false;
	    }
	
	    /**
	     * Called to update the underlying render-node
	     */
	    LayoutNode.prototype.setRenderNode = function(renderNode) {
	        this.renderNode = renderNode;
	        this._spec.renderNode = renderNode;
	    };
	
	    /**
	     * Called to update the options for the node
	     */
	    LayoutNode.prototype.setOptions = function(options) {
	        // override to implement
	    };
	
	    /**
	     * Called when the node is destroyed
	     */
	    LayoutNode.prototype.destroy = function() {
	        this.renderNode = undefined;
	        this._spec.renderNode = undefined;
	        this._viewSequence = undefined;
	    };
	
	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    LayoutNode.prototype.reset = function() {
	        this._invalidated = false;
	        this.trueSizeRequested = false;
	    };
	
	    /**
	     * Set the spec of the node
	     *
	     * @param {Object} spec
	     */
	    LayoutNode.prototype.setSpec = function(spec) {
	        this._specModified = true;
	        if (spec.align) {
	            if (!spec.align) {
	                this._spec.align = [0, 0];
	            }
	            this._spec.align[0] = spec.align[0];
	            this._spec.align[1] = spec.align[1];
	        }
	        else {
	            this._spec.align = undefined;
	        }
	        if (spec.origin) {
	            if (!spec.origin) {
	                this._spec.origin = [0, 0];
	            }
	            this._spec.origin[0] = spec.origin[0];
	            this._spec.origin[1] = spec.origin[1];
	        }
	        else {
	            this._spec.origin = undefined;
	        }
	        if (spec.size) {
	            if (!spec.size) {
	                this._spec.size = [0, 0];
	            }
	            this._spec.size[0] = spec.size[0];
	            this._spec.size[1] = spec.size[1];
	        }
	        else {
	            this._spec.size = undefined;
	        }
	        if (spec.transform) {
	            if (!spec.transform) {
	                this._spec.transform = spec.transform.slice(0);
	            }
	            else {
	                for (var i = 0; i < 16; i++) {
	                    this._spec.transform[i] = spec.transform[i];
	                }
	            }
	        }
	        else {
	            this._spec.transform = undefined;
	        }
	        this._spec.opacity = spec.opacity;
	    };
	
	    /**
	     * Set the content of the node
	     *
	     * @param {Object} set
	     */
	    LayoutNode.prototype.set = function(set, size) {
	        this._invalidated = true;
	        this._specModified = true;
	        this._removing = false;
	        var spec = this._spec;
	        spec.opacity = set.opacity;
	        if (set.size) {
	            if (!spec.size) {
	                spec.size = [0, 0];
	            }
	            spec.size[0] = set.size[0];
	            spec.size[1] = set.size[1];
	        }
	        else {
	            spec.size = undefined;
	        }
	        if (set.origin) {
	            if (!spec.origin) {
	                spec.origin = [0, 0];
	            }
	            spec.origin[0] = set.origin[0];
	            spec.origin[1] = set.origin[1];
	        }
	        else {
	            spec.origin = undefined;
	        }
	        if (set.align) {
	            if (!spec.align) {
	                spec.align = [0, 0];
	            }
	            spec.align[0] = set.align[0];
	            spec.align[1] = set.align[1];
	        }
	        else {
	            spec.align = undefined;
	        }
	
	        if (set.skew || set.rotate || set.scale) {
	            this._spec.transform = Transform.build({
	                translate: set.translate || [0, 0, 0],
	                skew: set.skew || [0, 0, 0],
	                scale: set.scale || [1, 1, 1],
	                rotate: set.rotate || [0, 0, 0]
	            });
	        }
	        else if (set.translate) {
	            this._spec.transform = Transform.translate(set.translate[0], set.translate[1], set.translate[2]);
	        }
	        else {
	            this._spec.transform = undefined;
	        }
	        this.scrollLength = set.scrollLength;
	    };
	
	    /**
	     * Creates the render-spec
	     */
	    LayoutNode.prototype.getSpec = function() {
	        this._specModified = false;
	        this._spec.removed = !this._invalidated;
	        return this._spec;
	    };
	
	    /**
	     * Marks the node for removal
	     */
	    LayoutNode.prototype.remove = function(removeSpec) {
	        this._removing = true;
	    };
	
	    module.exports = LayoutNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 42 */
/*!**********************************************!*\
  !*** ../~/famous-flex/src/FlowLayoutNode.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * Internal LayoutNode class used by `LayoutNodeManager`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var OptionsManager = __webpack_require__(/*! famous/core/OptionsManager */ 29);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 32);
	    var Vector = __webpack_require__(/*! famous/math/Vector */ 49);
	    var Particle = __webpack_require__(/*! famous/physics/bodies/Particle */ 50);
	    var Spring = __webpack_require__(/*! famous/physics/forces/Spring */ 51);
	    var PhysicsEngine = __webpack_require__(/*! famous/physics/PhysicsEngine */ 52);
	    var LayoutNode = __webpack_require__(/*! ./LayoutNode */ 41);
	    var Transitionable = __webpack_require__(/*! famous/transitions/Transitionable */ 44);
	
	    /**
	     * @class
	     * @extends LayoutNode
	     * @param {Object} renderNode Render-node which this layout-node represents
	     * @param {Spec} spec Initial state
	     * @param {Object} physicsEngines physics-engines to use
	     * @alias module:FlowLayoutNode
	     */
	    function FlowLayoutNode(renderNode, spec) {
	        LayoutNode.apply(this, arguments);
	
	        if (!this.options) {
	            this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	            this._optionsManager = new OptionsManager(this.options);
	        }
	
	        if (!this._pe) {
	            this._pe = new PhysicsEngine();
	            this._pe.sleep();
	        }
	
	        if (!this._properties) {
	            this._properties = {};
	        }
	        else {
	            for (var propName in this._properties) {
	                this._properties[propName].init = false;
	            }
	        }
	
	        if (!this._lockTransitionable) {
	            this._lockTransitionable = new Transitionable(1);
	        }
	        else {
	            this._lockTransitionable.halt();
	            this._lockTransitionable.reset(1);
	        }
	
	        this._specModified = true;
	        this._initial = true;
	        this._spec.endState = {};
	        if (spec) {
	            this.setSpec(spec);
	        }
	    }
	    FlowLayoutNode.prototype = Object.create(LayoutNode.prototype);
	    FlowLayoutNode.prototype.constructor = FlowLayoutNode;
	
	    FlowLayoutNode.DEFAULT_OPTIONS = {
	        spring: {
	            dampingRatio: 0.8,
	            period: 300
	        },
	        properties: {
	            opacity: true,
	            align: true,
	            origin: true,
	            size: true,
	            translate: true,
	            skew: true,
	            rotate: true,
	            scale: true
	        },
	        particleRounding: 0.001
	    };
	
	    /**
	     * Defaults
	     */
	    var DEFAULT = {
	        opacity: 1,
	        opacity2D: [1, 0],
	        size: [0, 0],
	        origin: [0, 0],
	        align: [0, 0],
	        scale: [1, 1, 1],
	        translate: [0, 0, 0],
	        rotate: [0, 0, 0],
	        skew: [0, 0, 0]
	    };
	
	    /**
	     * Verifies that the integrity of the layout-node is oke.
	     */
	    /*function _verifyIntegrity() {
	        var i;
	        for (var propName in this._properties) {
	            var prop = this._properties[propName];
	            if (prop.particle) {
	                if (isNaN(prop.particle.getEnergy())) {
	                    throw 'invalid particle energy: ' + propName;
	                }
	                var value = prop.particle.getPosition();
	                for (i = 0; i < value.length; i++) {
	                    if (isNaN(value[i])) {
	                       throw 'invalid particle value: ' + propName + '(' + i + ')';
	                    }
	                }
	                value = prop.endState.get();
	                for (i = 0; i < value.length; i++) {
	                    if (isNaN(value[i])) {
	                       throw 'invalid endState value: ' + propName + '(' + i + ')';
	                    }
	                }
	            }
	        }
	    }*/
	
	    /**
	     * Sets the configuration options
	     */
	    FlowLayoutNode.prototype.setOptions = function(options) {
	        this._optionsManager.setOptions(options);
	        var wasSleeping = this._pe.isSleeping();
	        for (var propName in this._properties) {
	            var prop = this._properties[propName];
	            if (options.spring && prop.force) {
	                prop.force.setOptions(this.options.spring);
	            }
	            if (options.properties && (options.properties[propName] !== undefined)) {
	                if (this.options.properties[propName].length) {
	                    prop.enabled = this.options.properties[propName];
	                }
	                else {
	                    prop.enabled = [
	                        this.options.properties[propName],
	                        this.options.properties[propName],
	                        this.options.properties[propName]
	                    ];
	                }
	            }
	        }
	        if (wasSleeping) {
	            this._pe.sleep();
	        }
	        return this;
	    };
	
	    /**
	     * Set the properties from a spec.
	     */
	    FlowLayoutNode.prototype.setSpec = function(spec) {
	        var set;
	        if (spec.transform) {
	            set = Transform.interpret(spec.transform);
	        }
	        if (!set) {
	            set = {};
	        }
	        set.opacity = spec.opacity;
	        set.size = spec.size;
	        set.align = spec.align;
	        set.origin = spec.origin;
	
	        var oldRemoving = this._removing;
	        var oldInvalidated = this._invalidated;
	        this.set(set);
	        this._removing = oldRemoving;
	        this._invalidated = oldInvalidated;
	    };
	
	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    FlowLayoutNode.prototype.reset = function() {
	        if (this._invalidated) {
	            for (var propName in this._properties) {
	                this._properties[propName].invalidated = false;
	            }
	            this._invalidated = false;
	        }
	        this.trueSizeRequested = false;
	        this.usesTrueSize = false;
	    };
	
	    /**
	     * Markes the node for removal.
	     */
	    FlowLayoutNode.prototype.remove = function(removeSpec) {
	
	        // Transition to the remove-spec state
	        this._removing = true;
	        if (removeSpec) {
	            this.setSpec(removeSpec);
	        }
	        else {
	            this._pe.sleep();
	            this._specModified = false;
	        }
	
	        // Mark for removal
	        this._invalidated = false;
	    };
	
	    /**
	     * Temporarily releases the flowing-lock that is applied to the node.
	     * E.g., when changing position, resizing, the lock should be released so that
	     * the renderables can smoothly transition to their new positions.
	     */
	    FlowLayoutNode.prototype.releaseLock = function(enable) {
	        this._lockTransitionable.halt();
	        this._lockTransitionable.reset(0);
	        if (enable) {
	          this._lockTransitionable.set(1, {
	              duration: this.options.spring.period || 1000
	          });
	        }
	    };
	
	    /**
	     * Helper function for getting the property value.
	     */
	    function _getRoundedValue3D(prop, def, precision, lockValue) {
	        if (!prop || !prop.init) {
	            return def;
	        }
	        return [
	            prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / precision) * precision) : prop.endState.x,
	            prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / precision) * precision) : prop.endState.y,
	            prop.enabled[2] ? (Math.round((prop.curState.z + ((prop.endState.z - prop.curState.z) * lockValue)) / precision) * precision) : prop.endState.z
	        ];
	    }
	
	    /**
	     * Creates the render-spec
	     */
	    FlowLayoutNode.prototype.getSpec = function() {
	
	        // When the end state was reached, return the previous spec
	        var endStateReached = this._pe.isSleeping();
	        if (!this._specModified && endStateReached) {
	            this._spec.removed = !this._invalidated;
	            return this._spec;
	        }
	        this._initial = false;
	        this._specModified = !endStateReached;
	        this._spec.removed = false;
	
	        // Step physics engine when not sleeping
	        if (!endStateReached) {
	            this._pe.step();
	        }
	
	        // Build fresh spec
	        var spec = this._spec;
	        var precision = this.options.particleRounding;
	        var lockValue = this._lockTransitionable.get();
	
	        // opacity
	        var prop = this._properties.opacity;
	        if (prop && prop.init) {
	            spec.opacity = prop.enabled[0] ? (Math.round(Math.max(0, Math.min(1, prop.curState.x)) / precision) * precision) : prop.endState.x;
	            spec.endState.opacity = prop.endState.x;
	        }
	        else {
	            spec.opacity = undefined;
	            spec.endState.opacity = undefined;
	        }
	
	        // size
	        prop = this._properties.size;
	        if (prop && prop.init) {
	            spec.size = spec.size || [0, 0];
	            spec.size[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.size[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.size = spec.endState.size || [0, 0];
	            spec.endState.size[0] = prop.endState.x;
	            spec.endState.size[1] = prop.endState.y;
	        }
	        else {
	            spec.size = undefined;
	            spec.endState.size = undefined;
	        }
	
	        // align
	        prop = this._properties.align;
	        if (prop && prop.init) {
	            spec.align = spec.align || [0, 0];
	            spec.align[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.align[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.align = spec.endState.align || [0, 0];
	            spec.endState.align[0] = prop.endState.x;
	            spec.endState.align[1] = prop.endState.y;
	        }
	        else {
	            spec.align = undefined;
	            spec.endState.align = undefined;
	        }
	
	        // origin
	        prop = this._properties.origin;
	        if (prop && prop.init) {
	            spec.origin = spec.origin || [0, 0];
	            spec.origin[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.origin[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.origin = spec.endState.origin || [0, 0];
	            spec.endState.origin[0] = prop.endState.x;
	            spec.endState.origin[1] = prop.endState.y;
	        }
	        else {
	            spec.origin = undefined;
	            spec.endState.origin = undefined;
	        }
	
	        // translate
	        var translate = this._properties.translate;
	        var translateX;
	        var translateY;
	        var translateZ;
	        if (translate && translate.init) {
	            translateX = translate.enabled[0] ? (Math.round((translate.curState.x + ((translate.endState.x - translate.curState.x) * lockValue)) / precision) * precision) : translate.endState.x;
	            translateY = translate.enabled[1] ? (Math.round((translate.curState.y + ((translate.endState.y - translate.curState.y) * lockValue)) / precision) * precision) : translate.endState.y;
	            translateZ = translate.enabled[2] ? (Math.round((translate.curState.z + ((translate.endState.z - translate.curState.z) * lockValue)) / precision) * precision) : translate.endState.z;
	        }
	        else {
	            translateX = 0;
	            translateY = 0;
	            translateZ = 0;
	        }
	
	        // scale, skew, scale
	        var scale = this._properties.scale;
	        var skew = this._properties.skew;
	        var rotate = this._properties.rotate;
	        if (scale || skew || rotate) {
	            spec.transform = Transform.build({
	                translate: [translateX, translateY, translateZ],
	                skew: _getRoundedValue3D.call(this, skew, DEFAULT.skew, this.options.particleRounding, lockValue),
	                scale: _getRoundedValue3D.call(this, scale, DEFAULT.scale, this.options.particleRounding, lockValue),
	                rotate: _getRoundedValue3D.call(this, rotate, DEFAULT.rotate, this.options.particleRounding, lockValue)
	            });
	            spec.endState.transform = Transform.build({
	                translate: translate ? [translate.endState.x, translate.endState.y, translate.endState.z] : DEFAULT.translate,
	                scale: scale ? [scale.endState.x, scale.endState.y, scale.endState.z] : DEFAULT.scale,
	                skew: skew ? [skew.endState.x, skew.endState.y, skew.endState.z] : DEFAULT.skew,
	                rotate: rotate ? [rotate.endState.x, rotate.endState.y, rotate.endState.z] : DEFAULT.rotate
	            });
	        }
	        else if (translate) {
	            if (!spec.transform) {
	                spec.transform = Transform.translate(translateX, translateY, translateZ);
	            }
	            else {
	                spec.transform[12] = translateX;
	                spec.transform[13] = translateY;
	                spec.transform[14] = translateZ;
	            }
	            if (!spec.endState.transform) {
	                spec.endState.transform = Transform.translate(translate.endState.x, translate.endState.y, translate.endState.z);
	            }
	            else {
	                spec.endState.transform[12] = translate.endState.x;
	                spec.endState.transform[13] = translate.endState.y;
	                spec.endState.transform[14] = translate.endState.z;
	            }
	        }
	        else {
	            spec.transform = undefined;
	            spec.endState.transform = undefined;
	        }
	        return this._spec;
	    };
	
	    /**
	     * Helper function to set the property of a node (e.g. opacity, translate, etc..)
	     */
	    function _setPropertyValue(prop, propName, endState, defaultValue, immediate, isTranslate) {
	
	        // Get property
	        prop = prop || this._properties[propName];
	
	        // Update the property
	        if (prop && prop.init) {
	            prop.invalidated = true;
	            var value = defaultValue;
	            if (endState !== undefined) {
	                value = endState;
	            }
	            else if (this._removing) {
	                value = prop.particle.getPosition();
	            }
	            //if (isTranslate && (this._lockDirection !== undefined) && (this._lockTransitionable.get() === 1)) {
	            //    immediate = true; // this is a bit dirty, it should check !_lockDirection for non changes as well before setting immediate to true
	            //}
	            // set new end state (the quick way)
	            prop.endState.x = value[0];
	            prop.endState.y = (value.length > 1) ? value[1] : 0;
	            prop.endState.z = (value.length > 2) ? value[2] : 0;
	            if (immediate) {
	                // set current state (the quick way)
	                prop.curState.x = prop.endState.x;
	                prop.curState.y = prop.endState.y;
	                prop.curState.z = prop.endState.z;
	                // reset velocity (the quick way)
	                prop.velocity.x = 0;
	                prop.velocity.y = 0;
	                prop.velocity.z = 0;
	            }
	            else if ((prop.endState.x !== prop.curState.x) ||
	                     (prop.endState.y !== prop.curState.y) ||
	                     (prop.endState.z !== prop.curState.z)) {
	                this._pe.wake();
	            }
	            return;
	        }
	        else {
	
	            // Create property if neccesary
	            var wasSleeping = this._pe.isSleeping();
	            if (!prop) {
	                prop = {
	                    particle: new Particle({
	                        position: (this._initial || immediate) ? endState : defaultValue
	                    }),
	                    endState: new Vector(endState)
	                };
	                prop.curState = prop.particle.position;
	                prop.velocity = prop.particle.velocity;
	                prop.force = new Spring(this.options.spring);
	                prop.force.setOptions({
	                    anchor: prop.endState
	                });
	                this._pe.addBody(prop.particle);
	                prop.forceId = this._pe.attach(prop.force, prop.particle);
	                this._properties[propName] = prop;
	            }
	            else {
	                prop.particle.setPosition((this._initial || immediate) ? endState : defaultValue);
	                prop.endState.set(endState);
	            }
	            if (!this._initial && !immediate) {
	                this._pe.wake();
	            }
	            else if (wasSleeping) {
	                this._pe.sleep(); // nothing has changed, put back to sleep
	            }
	            if (this.options.properties[propName] && this.options.properties[propName].length) {
	                prop.enabled = this.options.properties[propName];
	            }
	            else {
	                prop.enabled = [
	                  this.options.properties[propName],
	                  this.options.properties[propName],
	                  this.options.properties[propName]
	                ];
	            }
	            prop.init = true;
	            prop.invalidated = true;
	        }
	    }
	
	    /**
	     * Get value if not equals.
	     */
	    function _getIfNE2D(a1, a2) {
	        return ((a1[0] === a2[0]) && (a1[1] === a2[1])) ? undefined : a1;
	    }
	    function _getIfNE3D(a1, a2) {
	        return ((a1[0] === a2[0]) && (a1[1] === a2[1]) && (a1[2] === a2[2])) ? undefined : a1;
	    }
	
	    /**
	     * context.set(..)
	     */
	    FlowLayoutNode.prototype.set = function(set, defaultSize) {
	        if (defaultSize) {
	            this._removing = false;
	        }
	        this._invalidated = true;
	        this.scrollLength = set.scrollLength;
	        this._specModified = true;
	
	        // opacity
	        var prop = this._properties.opacity;
	        var value = (set.opacity === DEFAULT.opacity) ? undefined : set.opacity;
	        if ((value !== undefined) || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'opacity', (value === undefined) ? undefined : [value, 0], DEFAULT.opacity2D);
	        }
	
	        // set align
	        prop = this._properties.align;
	        value = set.align ? _getIfNE2D(set.align, DEFAULT.align) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'align', value, DEFAULT.align);
	        }
	
	        // set orgin
	        prop = this._properties.origin;
	        value = set.origin ? _getIfNE2D(set.origin, DEFAULT.origin) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'origin', value, DEFAULT.origin);
	        }
	
	        // set size
	        prop = this._properties.size;
	        value = set.size || defaultSize;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'size', value, defaultSize, this.usesTrueSize);
	        }
	
	        // set translate
	        prop = this._properties.translate;
	        value = set.translate;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'translate', value, DEFAULT.translate, undefined, true);
	        }
	
	        // set scale
	        prop = this._properties.scale;
	        value = set.scale ? _getIfNE3D(set.scale, DEFAULT.scale) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'scale', value, DEFAULT.scale);
	        }
	
	        // set rotate
	        prop = this._properties.rotate;
	        value = set.rotate ? _getIfNE3D(set.rotate, DEFAULT.rotate) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'rotate', value, DEFAULT.rotate);
	        }
	
	        // set skew
	        prop = this._properties.skew;
	        value = set.skew ? _getIfNE3D(set.skew, DEFAULT.skew) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'skew', value, DEFAULT.skew);
	        }
	    };
	
	    module.exports = FlowLayoutNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 43 */
/*!********************************************!*\
  !*** ../~/famous/core/ElementAllocator.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function ElementAllocator(container) {
	    if (!container)
	        container = document.createDocumentFragment();
	    this.container = container;
	    this.detachedNodes = {};
	    this.nodeCount = 0;
	}
	ElementAllocator.prototype.migrate = function migrate(container) {
	    var oldContainer = this.container;
	    if (container === oldContainer)
	        return;
	    if (oldContainer instanceof DocumentFragment) {
	        container.appendChild(oldContainer);
	    } else {
	        while (oldContainer.hasChildNodes()) {
	            container.appendChild(oldContainer.firstChild);
	        }
	    }
	    this.container = container;
	};
	ElementAllocator.prototype.allocate = function allocate(type) {
	    type = type.toLowerCase();
	    if (!(type in this.detachedNodes))
	        this.detachedNodes[type] = [];
	    var nodeStore = this.detachedNodes[type];
	    var result;
	    if (nodeStore.length > 0) {
	        result = nodeStore.pop();
	    } else {
	        result = document.createElement(type);
	        this.container.appendChild(result);
	    }
	    this.nodeCount++;
	    return result;
	};
	ElementAllocator.prototype.deallocate = function deallocate(element) {
	    var nodeType = element.nodeName.toLowerCase();
	    var nodeStore = this.detachedNodes[nodeType];
	    nodeStore.push(element);
	    this.nodeCount--;
	};
	ElementAllocator.prototype.getNodeCount = function getNodeCount() {
	    return this.nodeCount;
	};
	module.exports = ElementAllocator;

/***/ },
/* 44 */
/*!*************************************************!*\
  !*** ../~/famous/transitions/Transitionable.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var MultipleTransition = __webpack_require__(/*! ./MultipleTransition */ 53);
	var TweenTransition = __webpack_require__(/*! ./TweenTransition */ 54);
	function Transitionable(start) {
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	    this.state = 0;
	    this.velocity = undefined;
	    this._callback = undefined;
	    this._engineInstance = null;
	    this._currentMethod = null;
	    this.set(start);
	}
	var transitionMethods = {};
	Transitionable.register = function register(methods) {
	    var success = true;
	    for (var method in methods) {
	        if (!Transitionable.registerMethod(method, methods[method]))
	            success = false;
	    }
	    return success;
	};
	Transitionable.registerMethod = function registerMethod(name, engineClass) {
	    if (!(name in transitionMethods)) {
	        transitionMethods[name] = engineClass;
	        return true;
	    } else
	        return false;
	};
	Transitionable.unregisterMethod = function unregisterMethod(name) {
	    if (name in transitionMethods) {
	        delete transitionMethods[name];
	        return true;
	    } else
	        return false;
	};
	function _loadNext() {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    if (this.actionQueue.length <= 0) {
	        this.set(this.get());
	        return;
	    }
	    this.currentAction = this.actionQueue.shift();
	    this._callback = this.callbackQueue.shift();
	    var method = null;
	    var endValue = this.currentAction[0];
	    var transition = this.currentAction[1];
	    if (transition instanceof Object && transition.method) {
	        method = transition.method;
	        if (typeof method === 'string')
	            method = transitionMethods[method];
	    } else {
	        method = TweenTransition;
	    }
	    if (this._currentMethod !== method) {
	        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
	            this._engineInstance = new method();
	        } else {
	            this._engineInstance = new MultipleTransition(method);
	        }
	        this._currentMethod = method;
	    }
	    this._engineInstance.reset(this.state, this.velocity);
	    if (this.velocity !== undefined)
	        transition.velocity = this.velocity;
	    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
	}
	Transitionable.prototype.set = function set(endState, transition, callback) {
	    if (!transition) {
	        this.reset(endState);
	        if (callback)
	            callback();
	        return this;
	    }
	    var action = [
	        endState,
	        transition
	    ];
	    this.actionQueue.push(action);
	    this.callbackQueue.push(callback);
	    if (!this.currentAction)
	        _loadNext.call(this);
	    return this;
	};
	Transitionable.prototype.reset = function reset(startState, startVelocity) {
	    this._currentMethod = null;
	    this._engineInstance = null;
	    this._callback = undefined;
	    this.state = startState;
	    this.velocity = startVelocity;
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	};
	Transitionable.prototype.delay = function delay(duration, callback) {
	    var endValue;
	    if (this.actionQueue.length)
	        endValue = this.actionQueue[this.actionQueue.length - 1][0];
	    else if (this.currentAction)
	        endValue = this.currentAction[0];
	    else
	        endValue = this.get();
	    return this.set(endValue, {
	        duration: duration,
	        curve: function () {
	            return 0;
	        }
	    }, callback);
	};
	Transitionable.prototype.get = function get(timestamp) {
	    if (this._engineInstance) {
	        if (this._engineInstance.getVelocity)
	            this.velocity = this._engineInstance.getVelocity();
	        this.state = this._engineInstance.get(timestamp);
	    }
	    return this.state;
	};
	Transitionable.prototype.isActive = function isActive() {
	    return !!this.currentAction;
	};
	Transitionable.prototype.halt = function halt() {
	    return this.set(this.get());
	};
	module.exports = Transitionable;

/***/ },
/* 45 */
/*!****************************************!*\
  !*** ../~/famous/core/EventEmitter.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function EventEmitter() {
	    this.listeners = {};
	    this._owner = this;
	}
	EventEmitter.prototype.emit = function emit(type, event) {
	    var handlers = this.listeners[type];
	    if (handlers) {
	        for (var i = 0; i < handlers.length; i++) {
	            handlers[i].call(this._owner, event);
	        }
	    }
	    return this;
	};
	EventEmitter.prototype.on = function on(type, handler) {
	    if (!(type in this.listeners))
	        this.listeners[type] = [];
	    var index = this.listeners[type].indexOf(handler);
	    if (index < 0)
	        this.listeners[type].push(handler);
	    return this;
	};
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prototype.removeListener = function removeListener(type, handler) {
	    var listener = this.listeners[type];
	    if (listener !== undefined) {
	        var index = listener.indexOf(handler);
	        if (index >= 0)
	            listener.splice(index, 1);
	    }
	    return this;
	};
	EventEmitter.prototype.bindThis = function bindThis(owner) {
	    this._owner = owner;
	};
	module.exports = EventEmitter;

/***/ },
/* 46 */
/*!**************************************!*\
  !*** ../~/famous/core/SpecParser.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = __webpack_require__(/*! ./Transform */ 32);
	function SpecParser() {
	    this.result = {};
	}
	SpecParser._instance = new SpecParser();
	SpecParser.parse = function parse(spec, context) {
	    return SpecParser._instance.parse(spec, context);
	};
	SpecParser.prototype.parse = function parse(spec, context) {
	    this.reset();
	    this._parseSpec(spec, context, Transform.identity);
	    return this.result;
	};
	SpecParser.prototype.reset = function reset() {
	    this.result = {};
	};
	function _vecInContext(v, m) {
	    return [
	        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
	        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
	        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
	    ];
	}
	var _zeroZero = [
	    0,
	    0
	];
	SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
	    var id;
	    var target;
	    var transform;
	    var opacity;
	    var origin;
	    var align;
	    var size;
	    if (typeof spec === 'number') {
	        id = spec;
	        transform = parentContext.transform;
	        align = parentContext.align || _zeroZero;
	        if (parentContext.size && align && (align[0] || align[1])) {
	            var alignAdjust = [
	                align[0] * parentContext.size[0],
	                align[1] * parentContext.size[1],
	                0
	            ];
	            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
	        }
	        this.result[id] = {
	            transform: transform,
	            opacity: parentContext.opacity,
	            origin: parentContext.origin || _zeroZero,
	            align: parentContext.align || _zeroZero,
	            size: parentContext.size
	        };
	    } else if (!spec) {
	        return;
	    } else if (spec instanceof Array) {
	        for (var i = 0; i < spec.length; i++) {
	            this._parseSpec(spec[i], parentContext, sizeContext);
	        }
	    } else {
	        target = spec.target;
	        transform = parentContext.transform;
	        opacity = parentContext.opacity;
	        origin = parentContext.origin;
	        align = parentContext.align;
	        size = parentContext.size;
	        var nextSizeContext = sizeContext;
	        if (spec.opacity !== undefined)
	            opacity = parentContext.opacity * spec.opacity;
	        if (spec.transform)
	            transform = Transform.multiply(parentContext.transform, spec.transform);
	        if (spec.origin) {
	            origin = spec.origin;
	            nextSizeContext = parentContext.transform;
	        }
	        if (spec.align)
	            align = spec.align;
	        if (spec.size || spec.proportions) {
	            var parentSize = size;
	            size = [
	                size[0],
	                size[1]
	            ];
	            if (spec.size) {
	                if (spec.size[0] !== undefined)
	                    size[0] = spec.size[0];
	                if (spec.size[1] !== undefined)
	                    size[1] = spec.size[1];
	            }
	            if (spec.proportions) {
	                if (spec.proportions[0] !== undefined)
	                    size[0] = size[0] * spec.proportions[0];
	                if (spec.proportions[1] !== undefined)
	                    size[1] = size[1] * spec.proportions[1];
	            }
	            if (parentSize) {
	                if (align && (align[0] || align[1]))
	                    transform = Transform.thenMove(transform, _vecInContext([
	                        align[0] * parentSize[0],
	                        align[1] * parentSize[1],
	                        0
	                    ], sizeContext));
	                if (origin && (origin[0] || origin[1]))
	                    transform = Transform.moveThen([
	                        -origin[0] * size[0],
	                        -origin[1] * size[1],
	                        0
	                    ], transform);
	            }
	            nextSizeContext = parentContext.transform;
	            origin = null;
	            align = null;
	        }
	        this._parseSpec(target, {
	            transform: transform,
	            opacity: opacity,
	            origin: origin,
	            align: align,
	            size: size
	        }, nextSizeContext);
	    }
	};
	module.exports = SpecParser;

/***/ },
/* 47 */
/*!**********************************************************!*\
  !*** ../~/famous/transitions/TransitionableTransform.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transitionable = __webpack_require__(/*! ./Transitionable */ 44);
	var Transform = __webpack_require__(/*! ../core/Transform */ 32);
	var Utility = __webpack_require__(/*! ../utilities/Utility */ 31);
	function TransitionableTransform(transform) {
	    this._final = Transform.identity.slice();
	    this._finalTranslate = [
	        0,
	        0,
	        0
	    ];
	    this._finalRotate = [
	        0,
	        0,
	        0
	    ];
	    this._finalSkew = [
	        0,
	        0,
	        0
	    ];
	    this._finalScale = [
	        1,
	        1,
	        1
	    ];
	    this.translate = new Transitionable(this._finalTranslate);
	    this.rotate = new Transitionable(this._finalRotate);
	    this.skew = new Transitionable(this._finalSkew);
	    this.scale = new Transitionable(this._finalScale);
	    if (transform)
	        this.set(transform);
	}
	function _build() {
	    return Transform.build({
	        translate: this.translate.get(),
	        rotate: this.rotate.get(),
	        skew: this.skew.get(),
	        scale: this.scale.get()
	    });
	}
	function _buildFinal() {
	    return Transform.build({
	        translate: this._finalTranslate,
	        rotate: this._finalRotate,
	        skew: this._finalSkew,
	        scale: this._finalScale
	    });
	}
	TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
	    this._finalTranslate = translate;
	    this._final = _buildFinal.call(this);
	    this.translate.set(translate, transition, callback);
	    return this;
	};
	TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
	    this._finalScale = scale;
	    this._final = _buildFinal.call(this);
	    this.scale.set(scale, transition, callback);
	    return this;
	};
	TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
	    this._finalRotate = eulerAngles;
	    this._final = _buildFinal.call(this);
	    this.rotate.set(eulerAngles, transition, callback);
	    return this;
	};
	TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
	    this._finalSkew = skewAngles;
	    this._final = _buildFinal.call(this);
	    this.skew.set(skewAngles, transition, callback);
	    return this;
	};
	TransitionableTransform.prototype.set = function set(transform, transition, callback) {
	    var components = Transform.interpret(transform);
	    this._finalTranslate = components.translate;
	    this._finalRotate = components.rotate;
	    this._finalSkew = components.skew;
	    this._finalScale = components.scale;
	    this._final = transform;
	    var _callback = callback ? Utility.after(4, callback) : null;
	    this.translate.set(components.translate, transition, _callback);
	    this.rotate.set(components.rotate, transition, _callback);
	    this.skew.set(components.skew, transition, _callback);
	    this.scale.set(components.scale, transition, _callback);
	    return this;
	};
	TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
	    this.translate.setDefault(transition);
	    this.rotate.setDefault(transition);
	    this.skew.setDefault(transition);
	    this.scale.setDefault(transition);
	};
	TransitionableTransform.prototype.get = function get() {
	    if (this.isActive()) {
	        return _build.call(this);
	    } else
	        return this._final;
	};
	TransitionableTransform.prototype.getFinal = function getFinal() {
	    return this._final;
	};
	TransitionableTransform.prototype.isActive = function isActive() {
	    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
	};
	TransitionableTransform.prototype.halt = function halt() {
	    this.translate.halt();
	    this.rotate.halt();
	    this.skew.halt();
	    this.scale.halt();
	    this._final = this.get();
	    this._finalTranslate = this.translate.get();
	    this._finalRotate = this.rotate.get();
	    this._finalSkew = this.skew.get();
	    this._finalScale = this.scale.get();
	    return this;
	};
	module.exports = TransitionableTransform;

/***/ },
/* 48 */
/*!*********************************************!*\
  !*** ../~/famous-flex/src/LayoutContext.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * LayoutContext is the interface for a layout-function to access
	 * renderables in the data-source and set their size, position, tranformation, etc...
	 *
	 * The `next`, `prev` and `get` functions return an opaque object which represents
	 * the renderable that is to be layed out. To access the actual renderable, use the
	 * `.renderNode` property of this opaque object.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * @class
	     * @alias module:LayoutContext
	     */
	    function LayoutContext(methods) {
	        for (var n in methods) {
	            this[n] = methods[n];
	        }
	    }
	
	    /**
	     * {Property} Size in which to layout the renderables.
	     */
	    LayoutContext.prototype.size = undefined;
	
	    /**
	     * {Property} Direction in which to layout the renderables (0 = X, 1 = Y).
	     */
	    LayoutContext.prototype.direction = undefined;
	
	    /**
	     * {Property} {Number} Scrolling offset at which to start laying out next/prev renderables.
	     */
	    LayoutContext.prototype.scrollOffset = undefined;
	
	    /**
	     * {Property} {Number} Top/left boundary to which to layout renderables (default: 0).
	     */
	    LayoutContext.prototype.scrollStart = undefined;
	
	    /**
	     * {Property} {Number} Bottom/right boundary to which to continue laying out renderables.
	     */
	    LayoutContext.prototype.scrollEnd = undefined;
	
	    /**
	     * Get the context-node for the next renderable in the data-source. When
	     * the end of the data-source is reached, `undefined` is returned.
	     * Use this function to enumerate the contents of a data-source that is
	     * either an Array or a ViewSequence.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   var height = 0;
	     *   var node = context.next(); // get first next node
	     *   while (node) {
	     *     context.set(node, {
	     *       size: [context.size[0], 100],
	     *       translate: [0, height, 0]
	     *     });
	     *     height += 100;
	     *     node = context.next(); // get next node
	     *   }
	     * }
	     * ```
	     *
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.next = function() {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Get the context-node for the previous renderable in the data-source. When
	     * the start of the data-source is reached, `undefined` is returned.
	     * Use this function to enumerate the contents of a data-source that is
	     * either an Array or a ViewSequence.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   var height = 0;
	     *   var node = context.prev(); // get first previous
	     *   while (node) {
	     *     height -= 100;
	     *     context.set(node, {
	     *       size: [context.size[0], 100],
	     *       translate: [0, height, 0]
	     *     });
	     *     node = context.prev(); // get prev node
	     *   }
	     * }
	     * ```
	     *
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.prev = function() {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Get the context-node for a renderable with a specific id. This function
	     * should be used to access data-sources which are key-value collections.
	     * When a data-source is an Array or a ViewSequence, use `next()`.
	     * In many cases it is not neccesary to use `get()`, instead you can pass
	     * the id of the renderable straight to the `set` function.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var size = context.size;
	     *     var left = context.get('left');
	     *     context.set(left, { size: [100, size[1]] });
	     *
	     *     var right = context.get('right');
	     *     context.set(right, {
	     *       size: [100, size[1]],
	     *       translate: [size[1] - 100, 0, 0]
	     *     });
	     *
	     *     var middle = context.get('middle');
	     *     context.set(middle, {
	     *       size: [size[0] - 200, size[1]],
	     *       translate: [100, 0, 0]
	     *     });
	     *   },
	     *   dataSource: {
	     *     left: new Surface({content: 'left'}),
	     *     right: new Surface({content: 'right'}),
	     *     middle: new Surface({content: 'middle'})
	     *   }
	     * });
	     * ```
	     *
	     * **Arrays:**
	     *
	     * A value at a specific id in the datasource can also be an array. To access the
	     * context-nodes in the array use `get()` to get the array and the elements in the
	     * array:
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var size = context.size;
	     *     var left = 0;
	     *
	     *     // Position title
	     *     context.set('title', { size: [100, size[1]] });
	     *     left += 100;
	     *
	     *     // Position left-items (array)
	     *     var leftItems = context.get('leftItems');
	     *     for (var i = 0; i < leftItems.length; i++) {
	     *       var leftItem = context.get(leftItems[i]);
	     *       context.set(leftItem, {
	     *         size: [100, size[1]],
	     *         translate: [left, 0, 0]
	     *       });
	     *       left += 100;
	     *     }
	     *   },
	     *   dataSource: {
	     *     title: new Surface({content: 'title'}),
	     *     leftItems: [
	     *       new Surface({content: 'item1'}),
	     *       new Surface({content: 'item2'})
	     *     ]
	     *   }
	     * });
	     * ```
	     *
	     * @param {Object|String} node context-node or node-id
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.get = function(node) {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Set the size, origin, align, translation, scale, rotate, skew & opacity for a context-node.
	     *
	     * **Overview of all supported properties:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   context.set('mynode', {
	     *     size: [100, 20],
	     *     origin: [0.5, 0.5],
	     *     align: [0.5, 0.5],
	     *     translate: [50, 10, 0],
	     *     scale: [1, 1, 1],
	     *     skew: [0, 0, 0],
	     *     rotate: [Math.PI, 0, 0],
	     *     opacity: 1
	     *   })
	     * }
	     * ```
	     *
	     * @param {Object|String} node context-node or node-id
	     * @param {Object} set properties: size, origin, align, translate, scale, rotate, skew & opacity
	     */
	    LayoutContext.prototype.set = function(node, set) {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Resolve the size of a context-node by accessing the `getSize` function
	     * of the renderable.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var centerSize = context.resolveSize('center');
	     *     context.set('center', {origin: [0.5, 0.5]});
	     *     context.set('centerRight', {
	     *       origin: [0.5, 0.5],
	     *       translate: [centerSize[0] / 2, 0, 0]
	     *     });
	     *   },
	     *   dataSource: {
	     *     center: new Surface({content: 'center'}),
	     *     centerRight: new Surface({content: 'centerRight'}),
	     *   }
	     * });
	     * ```
	     *
	     * **When the size of the renderable is calculated by the DOM (`true` size)**
	     *
	     * When the layout-function performs its layout for the first time, it is
	     * possible that the renderable has not yet been rendered and its size
	     * is unknown. In this case, the LayoutController will cause a second
	     * reflow of the layout the next render-cycle, ensuring that the renderables
	     * are layed out as expected.
	     *
	     * @param {Object|String} node context-node, node-id or array-element
	     * @return {Size} size of the node
	     */
	    LayoutContext.prototype.resolveSize = function(node) {
	        // dummy implementation, override in constructor
	    };
	
	    module.exports = LayoutContext;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 49 */
/*!**********************************!*\
  !*** ../~/famous/math/Vector.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function Vector(x, y, z) {
	    if (arguments.length === 1 && x !== undefined)
	        this.set(x);
	    else {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	    }
	    return this;
	}
	var _register = new Vector(0, 0, 0);
	Vector.prototype.add = function add(v) {
	    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
	};
	Vector.prototype.sub = function sub(v) {
	    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
	};
	Vector.prototype.mult = function mult(r) {
	    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
	};
	Vector.prototype.div = function div(r) {
	    return this.mult(1 / r);
	};
	Vector.prototype.cross = function cross(v) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var vx = v.x;
	    var vy = v.y;
	    var vz = v.z;
	    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
	};
	Vector.prototype.equals = function equals(v) {
	    return v.x === this.x && v.y === this.y && v.z === this.z;
	};
	Vector.prototype.rotateX = function rotateX(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
	};
	Vector.prototype.rotateY = function rotateY(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
	};
	Vector.prototype.rotateZ = function rotateZ(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
	};
	Vector.prototype.dot = function dot(v) {
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	};
	Vector.prototype.normSquared = function normSquared() {
	    return this.dot(this);
	};
	Vector.prototype.norm = function norm() {
	    return Math.sqrt(this.normSquared());
	};
	Vector.prototype.normalize = function normalize(length) {
	    if (arguments.length === 0)
	        length = 1;
	    var norm = this.norm();
	    if (norm > 1e-7)
	        return _setFromVector.call(_register, this.mult(length / norm));
	    else
	        return _setXYZ.call(_register, length, 0, 0);
	};
	Vector.prototype.clone = function clone() {
	    return new Vector(this);
	};
	Vector.prototype.isZero = function isZero() {
	    return !(this.x || this.y || this.z);
	};
	function _setXYZ(x, y, z) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	}
	function _setFromArray(v) {
	    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
	}
	function _setFromVector(v) {
	    return _setXYZ.call(this, v.x, v.y, v.z);
	}
	function _setFromNumber(x) {
	    return _setXYZ.call(this, x, 0, 0);
	}
	Vector.prototype.set = function set(v) {
	    if (v instanceof Array)
	        return _setFromArray.call(this, v);
	    if (typeof v === 'number')
	        return _setFromNumber.call(this, v);
	    return _setFromVector.call(this, v);
	};
	Vector.prototype.setXYZ = function (x, y, z) {
	    return _setXYZ.apply(this, arguments);
	};
	Vector.prototype.set1D = function (x) {
	    return _setFromNumber.call(this, x);
	};
	Vector.prototype.put = function put(v) {
	    if (this === _register)
	        _setFromVector.call(v, _register);
	    else
	        _setFromVector.call(v, this);
	};
	Vector.prototype.clear = function clear() {
	    return _setXYZ.call(this, 0, 0, 0);
	};
	Vector.prototype.cap = function cap(cap) {
	    if (cap === Infinity)
	        return _setFromVector.call(_register, this);
	    var norm = this.norm();
	    if (norm > cap)
	        return _setFromVector.call(_register, this.mult(cap / norm));
	    else
	        return _setFromVector.call(_register, this);
	};
	Vector.prototype.project = function project(n) {
	    return n.mult(this.dot(n));
	};
	Vector.prototype.reflectAcross = function reflectAcross(n) {
	    n.normalize().put(n);
	    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
	};
	Vector.prototype.get = function get() {
	    return [
	        this.x,
	        this.y,
	        this.z
	    ];
	};
	Vector.prototype.get1D = function () {
	    return this.x;
	};
	module.exports = Vector;

/***/ },
/* 50 */
/*!**********************************************!*\
  !*** ../~/famous/physics/bodies/Particle.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(/*! ../../math/Vector */ 49);
	var Transform = __webpack_require__(/*! ../../core/Transform */ 32);
	var EventHandler = __webpack_require__(/*! ../../core/EventHandler */ 28);
	var Integrator = __webpack_require__(/*! ../integrators/SymplecticEuler */ 55);
	function Particle(options) {
	    options = options || {};
	    var defaults = Particle.DEFAULT_OPTIONS;
	    this.position = new Vector();
	    this.velocity = new Vector();
	    this.force = new Vector();
	    this._engine = null;
	    this._isSleeping = true;
	    this._eventOutput = null;
	    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
	    this.inverseMass = 1 / this.mass;
	    this.setPosition(options.position || defaults.position);
	    this.setVelocity(options.velocity || defaults.velocity);
	    this.force.set(options.force || [
	        0,
	        0,
	        0
	    ]);
	    this.transform = Transform.identity.slice();
	    this._spec = {
	        size: [
	            true,
	            true
	        ],
	        target: {
	            transform: this.transform,
	            origin: [
	                0.5,
	                0.5
	            ],
	            target: null
	        }
	    };
	}
	Particle.DEFAULT_OPTIONS = {
	    position: [
	        0,
	        0,
	        0
	    ],
	    velocity: [
	        0,
	        0,
	        0
	    ],
	    mass: 1
	};
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	var now = Date.now;
	Particle.prototype.isBody = false;
	Particle.prototype.isActive = function isActive() {
	    return !this._isSleeping;
	};
	Particle.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	Particle.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	    this._prevTime = now();
	    if (this._engine)
	        this._engine.wake();
	};
	Particle.prototype.setPosition = function setPosition(position) {
	    this.position.set(position);
	};
	Particle.prototype.setPosition1D = function setPosition1D(x) {
	    this.position.x = x;
	};
	Particle.prototype.getPosition = function getPosition() {
	    this._engine.step();
	    return this.position.get();
	};
	Particle.prototype.getPosition1D = function getPosition1D() {
	    this._engine.step();
	    return this.position.x;
	};
	Particle.prototype.setVelocity = function setVelocity(velocity) {
	    this.velocity.set(velocity);
	    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
	        this.wake();
	};
	Particle.prototype.setVelocity1D = function setVelocity1D(x) {
	    this.velocity.x = x;
	    if (x !== 0)
	        this.wake();
	};
	Particle.prototype.getVelocity = function getVelocity() {
	    return this.velocity.get();
	};
	Particle.prototype.setForce = function setForce(force) {
	    this.force.set(force);
	    this.wake();
	};
	Particle.prototype.getVelocity1D = function getVelocity1D() {
	    return this.velocity.x;
	};
	Particle.prototype.setMass = function setMass(mass) {
	    this.mass = mass;
	    this.inverseMass = 1 / mass;
	};
	Particle.prototype.getMass = function getMass() {
	    return this.mass;
	};
	Particle.prototype.reset = function reset(position, velocity) {
	    this.setPosition(position || [
	        0,
	        0,
	        0
	    ]);
	    this.setVelocity(velocity || [
	        0,
	        0,
	        0
	    ]);
	};
	Particle.prototype.applyForce = function applyForce(force) {
	    if (force.isZero())
	        return;
	    this.force.add(force).put(this.force);
	    this.wake();
	};
	Particle.prototype.applyImpulse = function applyImpulse(impulse) {
	    if (impulse.isZero())
	        return;
	    var velocity = this.velocity;
	    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
	};
	Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
	    Integrator.integrateVelocity(this, dt);
	};
	Particle.prototype.integratePosition = function integratePosition(dt) {
	    Integrator.integratePosition(this, dt);
	};
	Particle.prototype._integrate = function _integrate(dt) {
	    this.integrateVelocity(dt);
	    this.integratePosition(dt);
	};
	Particle.prototype.getEnergy = function getEnergy() {
	    return 0.5 * this.mass * this.velocity.normSquared();
	};
	Particle.prototype.getTransform = function getTransform() {
	    this._engine.step();
	    var position = this.position;
	    var transform = this.transform;
	    transform[12] = position.x;
	    transform[13] = position.y;
	    transform[14] = position.z;
	    return transform;
	};
	Particle.prototype.modify = function modify(target) {
	    var _spec = this._spec.target;
	    _spec.transform = this.getTransform();
	    _spec.target = target;
	    return this._spec;
	};
	function _createEventOutput() {
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Particle.prototype.emit = function emit(type, data) {
	    if (!this._eventOutput)
	        return;
	    this._eventOutput.emit(type, data);
	};
	Particle.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	Particle.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};
	Particle.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	Particle.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};
	module.exports = Particle;

/***/ },
/* 51 */
/*!********************************************!*\
  !*** ../~/famous/physics/forces/Spring.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Force = __webpack_require__(/*! ./Force */ 56);
	var Vector = __webpack_require__(/*! ../../math/Vector */ 49);
	function Spring(options) {
	    Force.call(this);
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this.disp = new Vector(0, 0, 0);
	    _init.call(this);
	}
	Spring.prototype = Object.create(Force.prototype);
	Spring.prototype.constructor = Spring;
	var pi = Math.PI;
	var MIN_PERIOD = 150;
	Spring.FORCE_FUNCTIONS = {
	    FENE: function (dist, rMax) {
	        var rMaxSmall = rMax * 0.99;
	        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
	        return r / (1 - r * r / (rMax * rMax));
	    },
	    HOOK: function (dist) {
	        return dist;
	    }
	};
	Spring.DEFAULT_OPTIONS = {
	    period: 300,
	    dampingRatio: 0.1,
	    length: 0,
	    maxLength: Infinity,
	    anchor: undefined,
	    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
	};
	function _calcStiffness() {
	    var options = this.options;
	    options.stiffness = Math.pow(2 * pi / options.period, 2);
	}
	function _calcDamping() {
	    var options = this.options;
	    options.damping = 4 * pi * options.dampingRatio / options.period;
	}
	function _init() {
	    _calcStiffness.call(this);
	    _calcDamping.call(this);
	}
	Spring.prototype.setOptions = function setOptions(options) {
	    if (options.anchor !== undefined) {
	        if (options.anchor.position instanceof Vector)
	            this.options.anchor = options.anchor.position;
	        if (options.anchor instanceof Vector)
	            this.options.anchor = options.anchor;
	        if (options.anchor instanceof Array)
	            this.options.anchor = new Vector(options.anchor);
	    }
	    if (options.period !== undefined) {
	        if (options.period < MIN_PERIOD) {
	            options.period = MIN_PERIOD;
	            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
	        }
	        this.options.period = options.period;
	    }
	    if (options.dampingRatio !== undefined)
	        this.options.dampingRatio = options.dampingRatio;
	    if (options.length !== undefined)
	        this.options.length = options.length;
	    if (options.forceFunction !== undefined)
	        this.options.forceFunction = options.forceFunction;
	    if (options.maxLength !== undefined)
	        this.options.maxLength = options.maxLength;
	    _init.call(this);
	    Force.prototype.setOptions.call(this, options);
	};
	Spring.prototype.applyForce = function applyForce(targets, source) {
	    var force = this.force;
	    var disp = this.disp;
	    var options = this.options;
	    var stiffness = options.stiffness;
	    var damping = options.damping;
	    var restLength = options.length;
	    var maxLength = options.maxLength;
	    var anchor = options.anchor || source.position;
	    var forceFunction = options.forceFunction;
	    var i;
	    var target;
	    var p2;
	    var v2;
	    var dist;
	    var m;
	    for (i = 0; i < targets.length; i++) {
	        target = targets[i];
	        p2 = target.position;
	        v2 = target.velocity;
	        anchor.sub(p2).put(disp);
	        dist = disp.norm() - restLength;
	        if (dist === 0)
	            return;
	        m = target.mass;
	        stiffness *= m;
	        damping *= m;
	        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
	        if (damping)
	            if (source)
	                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
	            else
	                force.add(v2.mult(-damping)).put(force);
	        target.applyForce(force);
	        if (source)
	            source.applyForce(force.mult(-1));
	    }
	};
	Spring.prototype.getEnergy = function getEnergy(targets, source) {
	    var options = this.options;
	    var restLength = options.length;
	    var anchor = source ? source.position : options.anchor;
	    var strength = options.stiffness;
	    var energy = 0;
	    for (var i = 0; i < targets.length; i++) {
	        var target = targets[i];
	        var dist = anchor.sub(target.position).norm() - restLength;
	        energy += 0.5 * strength * dist * dist;
	    }
	    return energy;
	};
	module.exports = Spring;

/***/ },
/* 52 */
/*!********************************************!*\
  !*** ../~/famous/physics/PhysicsEngine.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ../core/EventHandler */ 28);
	function PhysicsEngine(options) {
	    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._particles = [];
	    this._bodies = [];
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._buffer = 0;
	    this._prevTime = now();
	    this._isSleeping = false;
	    this._eventHandler = null;
	    this._currAgentId = 0;
	    this._hasBodies = false;
	    this._eventHandler = null;
	}
	var TIMESTEP = 17;
	var MIN_TIME_STEP = 1000 / 120;
	var MAX_TIME_STEP = 17;
	var now = Date.now;
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	PhysicsEngine.DEFAULT_OPTIONS = {
	    constraintSteps: 1,
	    sleepTolerance: 1e-7,
	    velocityCap: undefined,
	    angularVelocityCap: undefined
	};
	PhysicsEngine.prototype.setOptions = function setOptions(opts) {
	    for (var key in opts)
	        if (this.options[key])
	            this.options[key] = opts[key];
	};
	PhysicsEngine.prototype.addBody = function addBody(body) {
	    body._engine = this;
	    if (body.isBody) {
	        this._bodies.push(body);
	        this._hasBodies = true;
	    } else
	        this._particles.push(body);
	    body.on('start', this.wake.bind(this));
	    return body;
	};
	PhysicsEngine.prototype.removeBody = function removeBody(body) {
	    var array = body.isBody ? this._bodies : this._particles;
	    var index = array.indexOf(body);
	    if (index > -1) {
	        for (var agentKey in this._agentData) {
	            if (this._agentData.hasOwnProperty(agentKey)) {
	                this.detachFrom(this._agentData[agentKey].id, body);
	            }
	        }
	        array.splice(index, 1);
	    }
	    if (this.getBodies().length === 0)
	        this._hasBodies = false;
	};
	function _mapAgentArray(agent) {
	    if (agent.applyForce)
	        return this._forces;
	    if (agent.applyConstraint)
	        return this._constraints;
	}
	function _attachOne(agent, targets, source) {
	    if (targets === undefined)
	        targets = this.getParticlesAndBodies();
	    if (!(targets instanceof Array))
	        targets = [targets];
	    agent.on('change', this.wake.bind(this));
	    this._agentData[this._currAgentId] = {
	        agent: agent,
	        id: this._currAgentId,
	        targets: targets,
	        source: source
	    };
	    _mapAgentArray.call(this, agent).push(this._currAgentId);
	    return this._currAgentId++;
	}
	PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
	    this.wake();
	    if (agents instanceof Array) {
	        var agentIDs = [];
	        for (var i = 0; i < agents.length; i++)
	            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
	        return agentIDs;
	    } else
	        return _attachOne.call(this, agents, targets, source);
	};
	PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
	    _getAgentData.call(this, agentID).targets.push(target);
	};
	PhysicsEngine.prototype.detach = function detach(id) {
	    var agent = this.getAgent(id);
	    var agentArray = _mapAgentArray.call(this, agent);
	    var index = agentArray.indexOf(id);
	    agentArray.splice(index, 1);
	    delete this._agentData[id];
	};
	PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
	    var boundAgent = _getAgentData.call(this, id);
	    if (boundAgent.source === target)
	        this.detach(id);
	    else {
	        var targets = boundAgent.targets;
	        var index = targets.indexOf(target);
	        if (index > -1)
	            targets.splice(index, 1);
	    }
	};
	PhysicsEngine.prototype.detachAll = function detachAll() {
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._currAgentId = 0;
	};
	function _getAgentData(id) {
	    return this._agentData[id];
	}
	PhysicsEngine.prototype.getAgent = function getAgent(id) {
	    return _getAgentData.call(this, id).agent;
	};
	PhysicsEngine.prototype.getParticles = function getParticles() {
	    return this._particles;
	};
	PhysicsEngine.prototype.getBodies = function getBodies() {
	    return this._bodies;
	};
	PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
	    return this.getParticles().concat(this.getBodies());
	};
	PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
	    var particles = this.getParticles();
	    for (var index = 0, len = particles.length; index < len; index++)
	        fn.call(this, particles[index], dt);
	};
	PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
	    if (!this._hasBodies)
	        return;
	    var bodies = this.getBodies();
	    for (var index = 0, len = bodies.length; index < len; index++)
	        fn.call(this, bodies[index], dt);
	};
	PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
	    this.forEachParticle(fn, dt);
	    this.forEachBody(fn, dt);
	};
	function _updateForce(index) {
	    var boundAgent = _getAgentData.call(this, this._forces[index]);
	    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
	}
	function _updateForces() {
	    for (var index = this._forces.length - 1; index > -1; index--)
	        _updateForce.call(this, index);
	}
	function _updateConstraint(index, dt) {
	    var boundAgent = this._agentData[this._constraints[index]];
	    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
	}
	function _updateConstraints(dt) {
	    var iteration = 0;
	    while (iteration < this.options.constraintSteps) {
	        for (var index = this._constraints.length - 1; index > -1; index--)
	            _updateConstraint.call(this, index, dt);
	        iteration++;
	    }
	}
	function _updateVelocities(body, dt) {
	    body.integrateVelocity(dt);
	    if (this.options.velocityCap)
	        body.velocity.cap(this.options.velocityCap).put(body.velocity);
	}
	function _updateAngularVelocities(body, dt) {
	    body.integrateAngularMomentum(dt);
	    body.updateAngularVelocity();
	    if (this.options.angularVelocityCap)
	        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
	}
	function _updateOrientations(body, dt) {
	    body.integrateOrientation(dt);
	}
	function _updatePositions(body, dt) {
	    body.integratePosition(dt);
	    body.emit(_events.update, body);
	}
	function _integrate(dt) {
	    _updateForces.call(this, dt);
	    this.forEach(_updateVelocities, dt);
	    this.forEachBody(_updateAngularVelocities, dt);
	    _updateConstraints.call(this, dt);
	    this.forEachBody(_updateOrientations, dt);
	    this.forEach(_updatePositions, dt);
	}
	function _getParticlesEnergy() {
	    var energy = 0;
	    var particleEnergy = 0;
	    this.forEach(function (particle) {
	        particleEnergy = particle.getEnergy();
	        energy += particleEnergy;
	    });
	    return energy;
	}
	function _getAgentsEnergy() {
	    var energy = 0;
	    for (var id in this._agentData)
	        energy += this.getAgentEnergy(id);
	    return energy;
	}
	PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
	    var agentData = _getAgentData.call(this, agentId);
	    return agentData.agent.getEnergy(agentData.targets, agentData.source);
	};
	PhysicsEngine.prototype.getEnergy = function getEnergy() {
	    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
	};
	PhysicsEngine.prototype.step = function step() {
	    if (this.isSleeping())
	        return;
	    var currTime = now();
	    var dtFrame = currTime - this._prevTime;
	    this._prevTime = currTime;
	    if (dtFrame < MIN_TIME_STEP)
	        return;
	    if (dtFrame > MAX_TIME_STEP)
	        dtFrame = MAX_TIME_STEP;
	    _integrate.call(this, TIMESTEP);
	    this.emit(_events.update, this);
	    if (this.getEnergy() < this.options.sleepTolerance)
	        this.sleep();
	};
	PhysicsEngine.prototype.isSleeping = function isSleeping() {
	    return this._isSleeping;
	};
	PhysicsEngine.prototype.isActive = function isSleeping() {
	    return !this._isSleeping;
	};
	PhysicsEngine.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.forEach(function (body) {
	        body.sleep();
	    });
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	PhysicsEngine.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this._prevTime = now();
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	};
	PhysicsEngine.prototype.emit = function emit(type, data) {
	    if (this._eventHandler === null)
	        return;
	    this._eventHandler.emit(type, data);
	};
	PhysicsEngine.prototype.on = function on(event, fn) {
	    if (this._eventHandler === null)
	        this._eventHandler = new EventHandler();
	    this._eventHandler.on(event, fn);
	};
	module.exports = PhysicsEngine;

/***/ },
/* 53 */
/*!*****************************************************!*\
  !*** ../~/famous/transitions/MultipleTransition.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = __webpack_require__(/*! ../utilities/Utility */ 31);
	function MultipleTransition(method) {
	    this.method = method;
	    this._instances = [];
	    this.state = [];
	}
	MultipleTransition.SUPPORTS_MULTIPLE = true;
	MultipleTransition.prototype.get = function get() {
	    for (var i = 0; i < this._instances.length; i++) {
	        this.state[i] = this._instances[i].get();
	    }
	    return this.state;
	};
	MultipleTransition.prototype.set = function set(endState, transition, callback) {
	    var _allCallback = Utility.after(endState.length, callback);
	    for (var i = 0; i < endState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].set(endState[i], transition, _allCallback);
	    }
	};
	MultipleTransition.prototype.reset = function reset(startState) {
	    for (var i = 0; i < startState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].reset(startState[i]);
	    }
	};
	module.exports = MultipleTransition;

/***/ },
/* 54 */
/*!**************************************************!*\
  !*** ../~/famous/transitions/TweenTransition.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function TweenTransition(options) {
	    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._startTime = 0;
	    this._startValue = 0;
	    this._updateTime = 0;
	    this._endValue = 0;
	    this._curve = undefined;
	    this._duration = 0;
	    this._active = false;
	    this._callback = undefined;
	    this.state = 0;
	    this.velocity = undefined;
	}
	TweenTransition.Curves = {
	    linear: function (t) {
	        return t;
	    },
	    easeIn: function (t) {
	        return t * t;
	    },
	    easeOut: function (t) {
	        return t * (2 - t);
	    },
	    easeInOut: function (t) {
	        if (t <= 0.5)
	            return 2 * t * t;
	        else
	            return -2 * t * t + 4 * t - 1;
	    },
	    easeOutBounce: function (t) {
	        return t * (3 - 2 * t);
	    },
	    spring: function (t) {
	        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
	    }
	};
	TweenTransition.SUPPORTS_MULTIPLE = true;
	TweenTransition.DEFAULT_OPTIONS = {
	    curve: TweenTransition.Curves.linear,
	    duration: 500,
	    speed: 0
	};
	var registeredCurves = {};
	TweenTransition.registerCurve = function registerCurve(curveName, curve) {
	    if (!registeredCurves[curveName]) {
	        registeredCurves[curveName] = curve;
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
	    if (registeredCurves[curveName]) {
	        delete registeredCurves[curveName];
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.getCurve = function getCurve(curveName) {
	    var curve = registeredCurves[curveName];
	    if (curve !== undefined)
	        return curve;
	    else
	        throw new Error('curve not registered');
	};
	TweenTransition.getCurves = function getCurves() {
	    return registeredCurves;
	};
	function _interpolate(a, b, t) {
	    return (1 - t) * a + t * b;
	}
	function _clone(obj) {
	    if (obj instanceof Object) {
	        if (obj instanceof Array)
	            return obj.slice(0);
	        else
	            return Object.create(obj);
	    } else
	        return obj;
	}
	function _normalize(transition, defaultTransition) {
	    var result = { curve: defaultTransition.curve };
	    if (defaultTransition.duration)
	        result.duration = defaultTransition.duration;
	    if (defaultTransition.speed)
	        result.speed = defaultTransition.speed;
	    if (transition instanceof Object) {
	        if (transition.duration !== undefined)
	            result.duration = transition.duration;
	        if (transition.curve)
	            result.curve = transition.curve;
	        if (transition.speed)
	            result.speed = transition.speed;
	    }
	    if (typeof result.curve === 'string')
	        result.curve = TweenTransition.getCurve(result.curve);
	    return result;
	}
	TweenTransition.prototype.setOptions = function setOptions(options) {
	    if (options.curve !== undefined)
	        this.options.curve = options.curve;
	    if (options.duration !== undefined)
	        this.options.duration = options.duration;
	    if (options.speed !== undefined)
	        this.options.speed = options.speed;
	};
	TweenTransition.prototype.set = function set(endValue, transition, callback) {
	    if (!transition) {
	        this.reset(endValue);
	        if (callback)
	            callback();
	        return;
	    }
	    this._startValue = _clone(this.get());
	    transition = _normalize(transition, this.options);
	    if (transition.speed) {
	        var startValue = this._startValue;
	        if (startValue instanceof Object) {
	            var variance = 0;
	            for (var i in startValue)
	                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
	            transition.duration = Math.sqrt(variance) / transition.speed;
	        } else {
	            transition.duration = Math.abs(endValue - startValue) / transition.speed;
	        }
	    }
	    this._startTime = Date.now();
	    this._endValue = _clone(endValue);
	    this._startVelocity = _clone(transition.velocity);
	    this._duration = transition.duration;
	    this._curve = transition.curve;
	    this._active = true;
	    this._callback = callback;
	};
	TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    this.state = _clone(startValue);
	    this.velocity = _clone(startVelocity);
	    this._startTime = 0;
	    this._duration = 0;
	    this._updateTime = 0;
	    this._startValue = this.state;
	    this._startVelocity = this.velocity;
	    this._endValue = this.state;
	    this._active = false;
	};
	TweenTransition.prototype.getVelocity = function getVelocity() {
	    return this.velocity;
	};
	TweenTransition.prototype.get = function get(timestamp) {
	    this.update(timestamp);
	    return this.state;
	};
	function _calculateVelocity(current, start, curve, duration, t) {
	    var velocity;
	    var eps = 1e-7;
	    var speed = (curve(t) - curve(t - eps)) / eps;
	    if (current instanceof Array) {
	        velocity = [];
	        for (var i = 0; i < current.length; i++) {
	            if (typeof current[i] === 'number')
	                velocity[i] = speed * (current[i] - start[i]) / duration;
	            else
	                velocity[i] = 0;
	        }
	    } else
	        velocity = speed * (current - start) / duration;
	    return velocity;
	}
	function _calculateState(start, end, t) {
	    var state;
	    if (start instanceof Array) {
	        state = [];
	        for (var i = 0; i < start.length; i++) {
	            if (typeof start[i] === 'number')
	                state[i] = _interpolate(start[i], end[i], t);
	            else
	                state[i] = start[i];
	        }
	    } else
	        state = _interpolate(start, end, t);
	    return state;
	}
	TweenTransition.prototype.update = function update(timestamp) {
	    if (!this._active) {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        return;
	    }
	    if (!timestamp)
	        timestamp = Date.now();
	    if (this._updateTime >= timestamp)
	        return;
	    this._updateTime = timestamp;
	    var timeSinceStart = timestamp - this._startTime;
	    if (timeSinceStart >= this._duration) {
	        this.state = this._endValue;
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
	        this._active = false;
	    } else if (timeSinceStart < 0) {
	        this.state = this._startValue;
	        this.velocity = this._startVelocity;
	    } else {
	        var t = timeSinceStart / this._duration;
	        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
	    }
	};
	TweenTransition.prototype.isActive = function isActive() {
	    return this._active;
	};
	TweenTransition.prototype.halt = function halt() {
	    this.reset(this.get());
	};
	TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
	TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
	TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
	TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
	TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
	TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
	TweenTransition.customCurve = function customCurve(v1, v2) {
	    v1 = v1 || 0;
	    v2 = v2 || 0;
	    return function (t) {
	        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
	    };
	};
	module.exports = TweenTransition;

/***/ },
/* 55 */
/*!**********************************************************!*\
  !*** ../~/famous/physics/integrators/SymplecticEuler.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var SymplecticEuler = {};
	SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
	    var v = body.velocity;
	    var w = body.inverseMass;
	    var f = body.force;
	    if (f.isZero())
	        return;
	    v.add(f.mult(dt * w)).put(v);
	    f.clear();
	};
	SymplecticEuler.integratePosition = function integratePosition(body, dt) {
	    var p = body.position;
	    var v = body.velocity;
	    p.add(v.mult(dt)).put(p);
	};
	SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
	    var L = body.angularMomentum;
	    var t = body.torque;
	    if (t.isZero())
	        return;
	    L.add(t.mult(dt)).put(L);
	    t.clear();
	};
	SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
	    var q = body.orientation;
	    var w = body.angularVelocity;
	    if (w.isZero())
	        return;
	    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
	};
	module.exports = SymplecticEuler;

/***/ },
/* 56 */
/*!*******************************************!*\
  !*** ../~/famous/physics/forces/Force.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(/*! ../../math/Vector */ 49);
	var EventHandler = __webpack_require__(/*! ../../core/EventHandler */ 28);
	function Force(force) {
	    this.force = new Vector(force);
	    this._eventOutput = new EventHandler();
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Force.prototype.setOptions = function setOptions(options) {
	    this._eventOutput.emit('change', options);
	};
	Force.prototype.applyForce = function applyForce(targets) {
	    var length = targets.length;
	    while (length--) {
	        targets[length].applyForce(this.force);
	    }
	};
	Force.prototype.getEnergy = function getEnergy() {
	    return 0;
	};
	module.exports = Force;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map