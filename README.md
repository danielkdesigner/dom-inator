# DOM-Inator.js
A super lightweight DOM manipulation library for those who think jQuery is too much. Weighs in at 4kb minified and only 1kb minified and gzipped.

## Features
* __Lightweight__ - 4kb minified & 1kb minfied & gzipped
* __Chainable__ - Link dom manipulations of the same selector together for cleaner code
* __Perfect Blend of Vanilla JS and jQuery__ - uses some of the great features of jQuery for quick coding but implements more vanilla js method names for a better transition to vanilla js (because really vanilla's the best)

## Installation

   1. Clone from Github
   2. Bower coming soon

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

### .show()
Quickly show an element that's hidden with display none (will use elements initial display state (block, inline, etc) if got to display none state through dom-inator's .hide() method)
```
dom(".coming-out").show();
```

### .clone()
Create a deep clone in the virtual dom
```
var cloned = dom('.to-clone').clone();

//Then add it in the document where we want it
dom('.wants-clone-baby').appendChild(cloned);
```

### .hide()
Quickly hide and element by setting display to none
```
dom(".ahhhh").hide();
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
