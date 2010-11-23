/*
---
description: Adding Element.Style the abiity to set and get rgba background values in a cross-browser fashion.

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3: Core,Element

provides: [Element.setStyle,Element.getStyle]

...
*/
     Element.implement({
        setRGBA : function setStyle(r,g,b,a){
            if (!Browser.ie){
                this.setStyle('background-color','rgba('+arguments.join(',')+')');
                return;
            }
            var rgba = Array.from(arguments);
            rgba[3]*=100;
            
            for (var i = 0; i<4; i++){
                rgba[i] = rgba[i].toString(16);
                if (rgba[i].length==1) rgba[i] = "0" + rgba[i];
            }
            
            
            var alpha = rgba[3];
            rgba.pop();
            rgba.unshift(alpha);
                        
            this.style.backgroundColor = "transparent";
            this.style.zoom = 1;                        
            this.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr=#"+match.join("")+",endColorstr=#"+match.join("")+");"
            
            return this;
        }    
    });