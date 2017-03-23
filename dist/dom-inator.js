'use strict';
/**
 * Matches Polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector;
}

/**
 * Animation Support
 */
document.write("<style>.animated-out{  display:none; }.fade-animating-out{ opacity:0; } </style>");

/**
 * Dom Instantiator
 * @param elem_or_selector
 * @returns {DOM}
 */
function dom(elem_or_selector){
    return new DOM(elem_or_selector);
}

/**
 * DDM constructor
 * @param elem_or_selector
 * @constructor
 */
function DOM(elem_or_selector){
    /*
     Properties
     * elem
     * initial_display
     */

    if(typeof elem_or_selector === "string"){
        this.elem = this.querySelectorAllToArray(elem_or_selector);
    } else if( Array.isArray(elem_or_selector) ){
        this.elem = elem_or_selector;
    }else{
        this.elem =  [elem_or_selector]
    }
}

/**
 * Loops through each element and applies callback
 * @param callback
 * @returns {DOM}
 */
DOM.prototype.each = function(callback){
    this.elem.forEach(function(value){
        callback.call(value);
    });
    return this;
};

/**
 * Prepend an Child Element
 * @param elem
 * @returns {DOM}
 */
DOM.prototype.prependChild = function(elemToPrepend){
    this.elem.forEach(function(elem){
        var parent = elem;
        if( Array.isArray(elemToPrepend) ){
            dom(elemToPrepend).each(function(){
                parent.insertBefore( elem.cloneNode(true),  parent.firstChild );
            });
        }else{
            parent.insertBefore( elemToPrepend.cloneNode(true),  elem.firstChild );
        }
    });
    return this;
};

/**
 * Append a Child Element
 * @param elemToAppend
 * @returns {DOM}
 */
DOM.prototype.appendChild = function(elemToAppend){
    this.elem.forEach(function(elem){
        var parent = elem;
        if( Array.isArray(elemToAppend) ){
            dom(elemToAppend).each(function(){
                parent.appendChild(this.cloneNode(true));
            });
        }else{
            parent.appendChild(elemToAppend.cloneNode(true));
        }
    });
    return this;
};

/**
 * Find all elements in another element
 * @param selector
 * @returns {DOM}
 */
DOM.prototype.find = function(selector){
    var all_children = [];

    this.elem.forEach(function(el){
        [].slice.call(el.querySelectorAll(selector)).forEach(function(e){
            all_children.push(e);
        });
    });
    this.elem = all_children;
    return this;
};

/**
 * Find the closest element going up the DOM that matches the selector
 * @param selector
 * @returns {DOM}
 */
DOM.prototype.closest = function (selector){
    var all_closest= [];
    this.elem.forEach(function(elem){
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) all_closest.push(elem);
        }
    });
    this.elem = all_closest;
    return this;
};

/**
 * Get the Immediate Parent of Selected Elements
 * @returns {DOM}
 */
DOM.prototype.parent = function(){
    var all_parents = [];
    this.elem.forEach(function(elem){
        all_parents.push(elem.parentNode);
    });
    this.elem = all_parents;
    return this;
};

/**
 * Remove element from dom
 * @returns {DOM}
 */
DOM.prototype.remove = function(){
    this.elem.forEach(function(elem){
        elem.parentNode.removeChild(elem);
    });
    return this;
};

/**
 * Get and Set style
 * @param attr
 * @param value
 * @returns {*}
 */
DOM.prototype.style = function(attr, value){
    if( !this.undefined(value) ){
        this.elem.forEach(function(elem){
            elem.style[attr] = value;
        });
        return this;
    }
    return  window.getComputedStyle(this.elem[0]).getPropertyValue(attr);
};

/**
 * Get an array from a selector instead of a node list
 * @param selector
 * @returns {Array.<T>}
 */
DOM.prototype.querySelectorAllToArray = function(selector){
    return [].slice.call(document.querySelectorAll(selector))
};

/**
 * Get matching element
 * @returns {DOM}
 */
DOM.prototype.first = function(){
    return dom(this.elem[0]);
};

/**
 * Get Last Matching element
 * @returns {DOM}
 */
DOM.prototype.last = function(){
    return dom(this.elem[this.elem.length - 1]);
};

/**
 * Add a class or an attribute
 * @param type (add, remove, or toggle)
 * @param value
 * @returns {DOM}
 */
DOM.prototype.classList = function(action, value){
    var contains = true;
    this.elem.forEach(function(elem){
        if(action === 'contains'){
            if(!elem.classList.contains(value)){
                contains = false;
            }
        }else if(action === 'add'){
            elem.classList.add(value);
        }else if(action === 'remove'){
            elem.classList.remove(value);
        }else if(action === 'toggle'){
            if(elem.classList.contains(value)){
                elem.classList.remove(value);
            }else{
                elem.classList.add(value);
            }
        }
    });

    if(action === 'contains'){
        return contains;
    }
    return this;
};

/**
 * Get or Set Attribute
 * @param attr
 * @param value
 * @returns {*}
 */
DOM.prototype.attribute = function(attr, value){
    if( !this.undefined(value) ){
        this.elem.forEach(function(elem){
            elem.setAttribute(attr, value);
        });
        return this;
    }

    return this.elem[0].getAttribute(attr);
};

/**
 * Get or Set Inner HTML
 * @param html
 * @returns {*}
 */
DOM.prototype.html = function(html){
    if( !this.undefined(html) ){
        this.elem.forEach(function(elem){
            elem.innerHTML = html;
        });
        return this;
    }
    return this.elem[0].innerHTML;
};

/**
 * Get or Set Inner Text
 * @param text
 * @returns {*}
 */
DOM.prototype.text = function(text){
    if( !this.undefined(text) ){
        this.elem.forEach(function(elem){
            elem.innerText = text;
        });
        return this;
    }
    return this.elem[0].innerText;
};

/**
 * Deep clone an elements
 * @returns {Array}
 */
DOM.prototype.clone = function(){
    var clones = [];
    this.elem.forEach(function(elem){
        clones.push(elem.cloneNode(true));
    });
    return clones;
};

/**
 * Get Vanilla JS Elements as Array or Single Node (if just one)
 * @returns {Array.<T>|*|Array}
 */
DOM.prototype.vanilla = function(){
    return this.elem;
};

/**
 * Test if variable is undefined
 * @param variable
 * @returns {boolean}
 */
DOM.prototype.undefined = function(variable){
    return typeof variable === 'undefined';
};

/**
 * Show element(s)
 */
DOM.prototype.show = function(){
    this.elem.forEach(function(elem){
        var init_display = elem.getAttribute('data-init-display');
        elem.style.display = (init_display) ? init_display : "block";
    });
};

/**
 * Hide element(s)
 */
DOM.prototype.hide = function(){
    this.elem.forEach(function(elem){
        elem.setAttribute('data-init-display', window.getComputedStyle(elem).getPropertyValue('display'));
        elem.style.display = "none";

    });
};

/**
 * Animate In
 * @param type
 * @returns {DOM}
 */
DOM.prototype.animateIn = function(type){
    var obj = this;
    this.elem.forEach(function(elem){
        elem.classList.remove('animated-out');
        setTimeout(function(){
            if( obj.undefined(type) || type === 'custom'){
                elem.classList.remove('animating-out');
            }else{
                elem.classList.remove(type + "-animating-out");
            }
        }, 1);

    });
    return this;
};

/**
 * Animate Out
 * @param type
 * @returns {DOM}
 */
DOM.prototype.animateOut = function(type){
    var obj = this;
    this.elem.forEach(function(elem){
        var duration = window.getComputedStyle(elem).getPropertyValue('transition-duration');
        if(duration !== "0s"){
            var time = parseFloat(duration.replace("s", "")) * 1000;
        }else{
            elem.style.transitionDuration = ".4s";
            time = 400;
        }

        if( obj.undefined(type) || type === 'custom'){
            elem.classList.add('animating-out');
        }else{
            elem.classList.add(type + "-animating-out");
        }

        setTimeout(function(){
            elem.classList.add('animated-out');
        }, time);
    });

    return this;
};

/**
 * To String
 * @returns {string}
 */
DOM.prototype.toString = function(){
    return "[object DOM]";
};
