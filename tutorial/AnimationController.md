AnimationController Tutorial
==========

Animating between famo.us views in awesome ways.

![Screenshot](../screenshot.gif)

[View the live demo here](https://rawgit.com/IjzerenHein/famous-flex-animationcontroller/master/dist/index.html)


# Index

- [Getting started](#getting-started)
- [API reference](https://github.com/IjzerenHein/famous-flex/blob/master/docs/AnimationController.md)
- [Code examples](../src/main.js)
- [Animations](#animations)
    - [Configuring animations](#configuring-animations)
    - [Creating your own animations](#creating-your-own-animations)
- [Showing & hiding renderables](#showing--hiding-renderables)
- [Getting the visible renderable](#getting-the-visible-renderable)
- [Transferring renderables between views](#transferring-renderables-between-views)
    - [How it works](#how-it-works)
    - [How to support it](#how-to-support-it)
    - [Configuring transferables](#configuring-transferables)
    - [The getTransferable function](#the-gettransferable-function)


# Getting started

To use AnimationController in your project, install famous-flex using npm or bower:

    npm install famous-flex

    bower install famous-flex


To create an AnimationController with for instance a slide effect, use:

```javascript
var AnimationController = require('famous-flex/AnimationController');
var Easing = require('famous/transitions/Easing');

var animationController = new AnimationController({
    animation: AnimationController.Animation.Slide.Left,
    transition: {duration: 500, curve: Easing.outBack}
});
this.add(animationController); // add to render-tree

// Show a view or surface with slide effect
animationController.show(new Surface());
```


# Animations

Out of the box, AnimationController supports the following animation functions:

|Animation|Options & defaults|Description|
|---------|-----|---|
|`Slide.Left`|-|Shows or hides a view by sliding to the left.|
|`Slide.Right`|-|Shows or hides a view by sliding to the right.|
|`Slide.Up`|-|Shows or hides a view by sliding upwards.|
|`Slide.Down`|-|Shows or hides a view by sliding downwards.|
|`Fade`|`{opacity: 0}`|Shows or hides a view by fading it.|
|`Zoom`|`{scale: 0.5}`|Shows or hides a view by zooming it.|
|`FadedZoom`|`{opacity: 0, showScale: 0.9, hideScale: 1.1}`|A fancy fade function with a subtle zoom effect.|

To use an animation function, just assign it to the `animation` option:

```javascript
var animationController = new AnimationController({
    animation: AnimationController.Animation.Slide.Left,
});
```

You can override any default options using the following construct:

```javascript
var animationController = new AnimationController({
    animation: AnimationController.Animation.FadedZoom.bind({
        opacity: 0.4,
        showScale: 0.8,
        hideScale: 2
    })
});
```


## Configuring animations

Use the constructor or `setOptions` to configure the animation effect and transition:

```javascript
var animationController = new AnimationController({
    animation: AnimationController.Animation.Slide.Left,
    transition: {duration: 500, curve: Easing.outBack}
});

animationController.setOptions({
   transition: {duration: 500, curve: Easing.inOutQuad} 
})
```

You can also configure the `show` and `hide` animations separately if you want different effects for them:

```javascript
var animationController = new AnimationController({
    show: {
        animation: AnimationController.Animation.Slide.Left,
        transition: {duration: 500, curve: Easing.outBack}
    }
    hide: {
        animation: AnimationController.Animation.Slide.Fade,
        transition: {duration: 500, curve: Easing.outBack}
    }
});
```


## Creating your own animations

Creating custom animations is very simple. An Animation is just a `Function` which returns an object containing a `transform` and/or `opacity` property.

The following example shows how to combine both a slide **and** fade effect:

```javascript
var animationController = new AnimationController({
    transition: {duration: 500, curve: Easing.outBack},
    animation: function(show, size) {
        return {
            // slide left & fade
            transform: Transform.translate(show ? size[0] : -size[0], 0, 0),
            opacity: 0
        };   
    }
});
animationController.show(...);
```


# Showing & hiding renderables

To show & hide renderables, use the following functions:

```javascript
animationController.show(renderable, options, callback);
animationController.hide(options, callback);
animationController.halt(); // clear any chained operations
```

When `.show` is called, a new show-animation is added to the end
of the animation chain. To for instance queue multiple show animations, use:

```javascript
animationController.show(...);
animationController.show(...);
animationController.show(...);
animationController.show(...);
animationController.hide();
```

If you want to immediately show the last renderable, then use `.halt` to 
clear the chained operations: *(If any animation is in progress it will be 
completed prior to showing the new renderable)*

```javascript
animationController.halt();
animationController.show(...);
```

To override the default animation and transition, use:

```javscript
animationController.show(myView, {
    animation: AnimationController.Animation.Zoom,
    transition: {duration: 500, curve: Easing.outBack},
});
```

Or specify separate animations for the `show` and `hide` phase:

```javscript
animationController.show(myView, {
    show: {
        animation: AnimationController.Animation.Zoom,
        transition: {duration: 500, curve: Easing.outBack}
    },
    hide: {
        animation: AnimationController.Animation.Fade,
        transition: {duration: 200}
    }
});
```


# Getting the visible renderable

To get the renderable that is currently visible (or is currently being shown), use:

```javascript
var renderable = animationController.get(); // get the visible renderable
```

# Transferring renderables between views

AnimationController contains a cool feature which allows you to seemingly migrate renderables from one view to another. This is called a `transferable`. 

## How it works

When hiding an existing view and showing a new view, both views
are scanned for any renderables that can be transferred from the old
to the new view. When a match is found, the renderable from the old 
view is "borrowed" from the view and the renderable on the new view is hidden (opacity = 0). The AnimationController then animates the "borrowed" renderable towards the position and size on the new view. Upon completion, the "borrowed" renderable is returned to the old view, and the renderable in the new view is made visible.

## How to support it

In order to support these transferables, a view must meet one of these criteria:
- support the `getTransferable` function
- is a `LayoutController` that uses an id-based dataSource
- is a View that contains the property `layout` which is an id-based LayoutController

The easiest way to support it, is to create your views using a LayoutController, like this:

```javascript
function ProfileView(options) {
    View.apply(this, arguments);

    _createLayout.call(this);
    _createRenderables.call(this);
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
        }.bind(this)
    });
    this.add(this.layout);
    this.layout.pipe(this._eventOutput);
}

function _createRenderables() {
    this._renderables = {
        background: new Surface({
            classes: this.options.classes.concat(['background'])
        }),
        image: new BkImageSurface({
            classes: this.options.classes.concat(['image']),
            content: 'http://scarlet.com/image.jpg',
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
    this.layout.setDataSource(this._renderables);
}
```

## Configuring transferables

To configure an AnimationController to transfer renderables, either use
the constructor or `setOptions`:

```javascript
var animationController = new AnimationController({
    transfer: {
        transition: {duration: 500, curve: Easing.inOutQuad},
        items: {
            'image': 'image' // transfer renderable if both views contain 'image'
        }
        zIndex: 100 // optional, z-index the renderable is lifted while transferring,
        fastResize: true // optional, when enabled using scaling i.s.o. resizing while transferring the renderable (default: true)
    }
});
```

Using `show` you can specify which renderables to transfer per view:

```javascript
animationController.show(view, {
    transfer: {
        items: {
            'header': 'header'
        }
    }
});
```

## The getTransferable function

Whenever the AnimationController wants to transfer renderables, it
calls `.getTransferable(id)` on the view. If the view supports the id, it should return a `Transferable` object which supports the following functions: `get`, `show` and `getSpec`.

```javascript
myView.prototype.getTransferable = function(id) {
    return {
        get: function() {
            // return current renderable that matches the given id
        },
        show: function(renderable) {
            // show given renderable
        }
        getSpec: function(callback, endState) {
            // when the view knows the size, position, etc... of the requested id,
            // it should call callback and pass along the render spec
        }
    };
};
```

*Note, you only need to implement this method if the view isn't inherited from LayoutController or doesn't have a property `.layout` which is a LayoutController.*



*© 2015 IjzerenHein*
