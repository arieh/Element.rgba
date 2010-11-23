Element.setRGBA
========
This package provides 2 ways of making Element set rgba background values in a cross browser fasion:

1. a `setRGBA` method
2. a monkey-patch to Element.setStyle and Element.getStyle
3. A bonus - rgba is added to Browser.Features

The 2 packages come in seperate files, so you can choose to use only the setRGBA method.


How to use
----------

#### setRGBA
    
    #JS
    el.setRGBA(1,230,25,0.75);
    
#### Monkey Patch

    #JS
    el.setStyle('background','rgba(1,2,3,0.5)');
    el.setStyle('background-color','rgba(2,340,5,0.88)');
    
    el.getStyle('background-color'); //rgba(2,340,5,0.88)
    
#### Browser.Features.rgba 
    
    if (Browser.Features.rgba) doSomthing();