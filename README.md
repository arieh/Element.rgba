Element.setRGBA
========
This package monkey-patches Element.getStyle and Element.setStyle to allow IE support for rgba background values.


How to use
----------
Just as you would use any other property:

    #JS
    el.setStyle('background','rgba(1,2,3,0.5)');
    el.setStyle('background-color','rgba(2,340,5,0.88)');
    
    el.getStyle('background-color'); //rgba(2,340,5,0.88)