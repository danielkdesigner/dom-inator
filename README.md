# DOM-inator.js
A super lightweight DOM manipulation library for those who think jQuery is too much. Weighs in at 5kb minified and only 1kb minified and gzipped.

## Features
* __Lightweight__ - 5kb minified & 1kb minfied & gzipped
* __Chainable__ - Link dom manipulations of the same selector together for cleaner code
* __Perfect Blend of Vanilla JS and jQuery__ - uses some of the great features of jQuery for quick coding but implements more vanilla js method names for a better transition to vanilla js (because really vanilla's the best)
* __Supported In__ IE 9+, Chrome, Firefox, Safari

## Installation

   #### 1a. Clone from Github
   ```
   git clone https://github.com/danielkdesigner/dom-inator.git
   ```

   #### OR
   #### 1b. Install With Bower
   ```
   bower install dom-inator
   ```

    #### 2.Bring Script onto Page

   ```
   //Add this script tag just before all your other js (hopefully as close to the closing body tag as possible)
      //or concat it using your favorite task runner

   <script src='/bower_components/dom-inator/dist/dom-inator.min'></script>
   ```

## Selecting Elements
All selection is done through css-like query selectors. All selections are treated as a single unit like in jQuery so when you manipulate 1 you manipulate them all (just like in jQuery) (no looping! Hooray!)
```
dom(".query-selector-here");
```

## Traversing the DOM
How to move up and down the DOM tree to get the element you're looking for

### .closest(selector)
Go up the dom tree from selected elements until element matches selector
```
dom(".grandchild").closest(".great-grandpa") //Moves up through DOM tree until element with class of great-grandpa is found
```

### .parent()
Get the immediate parent of the selected elements
```
dom('.find-my-mommy').parent();
```

### .first()
Narrows selection down to first matching element
```
dom(".lots-of-me").first(); //Returns only the first element with class of "lots-of-me"
```

### .last()
Narrows selection down to last matching element
```
dom(".lots-of-me").last(); //Returns only the last element with class of "lots-of-me"
```

## DOM Manipulation
Making changes to the DOM is simple (and chainable too!).

### .prependChild(elemToPrepend)
Add a child element as the first child of your selected elements
```
dom("#mama").prependChild(".first-born");
```

### .appendChild(elemToAppend)
Add a child element as the last child of your selected elements
```
dom("#mama").appendChild(".the-baby");
```

### .style(attr, value)
Get or Set the style of selected elements
```
//Set bg color
dom(".sunset").style("background", "orange");

//Get bg color (only uses first element of selected for this information if is different between elements)
dom(".sky").style("background"); //Returns "blue" or the like
```

### .classList(action, value)
Add, remove, or check if contains a class
```
//Add class
dom('.page-header').classList('add', 'sticky');

//Remove Class
dom('.page-header').classList('remove', 'sticky');

//Check for presence of class
if(dom('.page-header').classList('contains', 'sticky')){
    console.log('Header is sticky');
}else{
    console.log('Header is NOT sticky');
}
```

### .attribute(attr, value)
Add or remove attributes
```
//Make all external links open in new tab
dom('[href ^= "http"]').attribute("target", "_blank");

//Get link (only uses first element of selected for this information if is different between elements)
dom("#facebook-link").attribute("href");
```

### .html(html)
Get or set html of selected elements (just like jQuery)
```
//Set html
dom(".alter-my-html").html("<div>Hello, new html here.</div>");

//Get html (only uses first element of selected for this information if is different between elements)
dom(".hello").html();
```

### .text(text)
Get or set text of selected elements (just like jQuery)
```
//Set text
dom(".alter-my-text").text("Hello, new text here.");

//Get text (only uses first element of selected for this information if is different between elements)
dom(".hello").text();
```

### .create()
Create a new element to be added the dom at the time of your choosing. Create the elements tag, classes, and/or id by using a query selector
```
dom('h3.test').create().text('Hello World').style('background', 'green')
```

### .remove()
Completely remove selected elements from DOM
```
dom('.she-gone').remove();
```

### .show()
Quickly show an element that's hidden with display none (will use elements initial display state (block, inline, etc) if got to display none state through dom-inator's .hide() method)
```
dom(".coming-out").show();
```

### .hide()
Quickly hide and element by setting display to none
```
dom(".ahhhh").hide();
```

### .animateIn(type)
Both animate in and animate out read the transition duration from your css stylesheets and sets a timeout to set the element to display none just as your transition ends. This means it will be removed from the document flow but it will still have the chance to animate
```
//style.css
.box{
    transition:.4s all;
 }
 .box.animating-out{
     opacity:0;
     transform:scaleY(0);
     transform-origin:top;
 }

 //script.js
 dom('.box').animateIn();

 //If you want just a plane ol' fade in you don't have to set that in your styles just use the following
 dom('.box').animateIn('fade');
```

### .animateOut(type)
Both animate in and animate out read the transition duration from your css stylesheets and sets a timeout to set the element to display none just as your transition ends. This means it will be removed from the document flow but it will still have the chance to animate
```
//style.css (if you already did this in the animate in step, you don't have to do it again)
.box{
    transition:.4s all;
 }
 .box.animating-out{
     opacity:0;
     transform:scaleY(0);
     transform-origin:top;
 }

 //script.js
 dom('.box').animateOut();

 //If you want just a plane ol' fade in you don't have to set that in your styles just use the following
 dom('.box').animateOut('fade');
```

### .clone()
Create a deep clone in the virtual dom
```
var cloned = dom('.to-clone').clone();

//Then add it in the document where we want it
dom('.wants-clone-baby').appendChild(cloned);
```

## Events

### .addEventListener(event, delegated_elem_or_callback, callback)
Add an event listener to an element or use event delegation in cases where elements may or may not actually exist on the page yet (in cases of delegation, you would select an element that definitely exists with dom() and then pass the selector of the actual element you want to listen to as the second param of this method )

```
//regular event (no delegation)
dom('.box').addEventListener('click', function(){
    console.log('box clicked')
});

//Event Delegation
dom('.permanent').addEventListener('click', '.probably-dynamic', function(){
    console.log('probably dynamic clicked')
});
```

### e.preventDefault()
Prevent default action of event

```
dom('form').addEventListener('submit', function(e){
    e.preventDefault();
    console.log('form not submitted. do with it what you will');
});
```

### e.stopPropagation
Prevent event from bubbling up

```
dom('.inner-element').addEventListener('click', function(e){
    e.stopPropagation();
    console.log('any event on parents of this element will not fire');
});
```

### e.stopImmediatePropagation
Prevent an other events called on selected element after this event from occuring
```
dom('.common-element').addEventListener('click', function(e){
    e.stopImmediatePropagation();
    console.log('only this will log');
});

dom('.common-element').addEventListener('click', function(e){
    console.log('this will never happen');
});
```

## Utility

### .each()
Loop through each element selected to act on it individually
```

//Loop through all sodas and hide pepsi (you know because we can)
dom(".soda").each(function(){
    var currentElem = dom(this);
    if( currentElem.classList('contains', 'pepsi') ){
        currentElem.hide();
    }
});
```

### .vanilla()
Return the selected elements as a vanilla array
```
dom('div').vanilla() //returns array of elements
```

## Tips and Hints

### Chainable
Chain multiple manipulations onto a single selector for short clean code
```
dom('.bruce-banner').classList('add', 'the-hulk').style('background-color', 'green').style('font-weight', 'bold');
```

### $ Aliasing
If you'd like to shorten the 'dom' keyword to '$' then you can pass the dom function into a self invoking anonymous function like below. This has the nice side effect of keeping all code in the anonymous function out of the global scope and keeps it from conflicting with other code
```
(function($){
    'use strict';
    $('h3').style('background', 'green');
})(dom);
```

If you really need the '$' alias at the global scope for some reason you can do the below (just keep in mind if you are using any other library that's using the $ alias this might cause issues):
```
function $(selector){
    return dom(selector);
}
$('h3').style('background', 'green');
$('h1').classList('add', 'new-class');
```