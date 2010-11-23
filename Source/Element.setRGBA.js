/*
---
description: Adding Element.Style the abiity to set and get rgba background values in a cross-browser fashion.

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3: Core,Element

provides: [Element.setRGBA,Browser.Features.rgba]

...
*/
(function(){
    var re = /^rgba/,
            supported = null;

    if(has("css-enabled")){
        try{
              el.style.color = "rgba(1,1,1,0.5)";
              supported = re.test(el.style.color);
              el.style.color = "";
        }catch(e){}
    }
        
    Browser.Features.rgba = supported;
    
     Element.implement({
        setRGBA : Browser.Features.rgba ?
            function setRGBA(r,g,b,a){
                this.setStyle('background-color','rgba('+arguments.join(',')+')');
                return this;`
            }  
            : function setRGBA(r,g,b,a){
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
    
})();