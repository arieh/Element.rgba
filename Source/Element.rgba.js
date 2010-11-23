/*
---
description: Adding Element.Style the abiity to set and get rgba background values in a cross-browser fashion.

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3: Core,Element
- Element.rgba/1.0.1 : Element.setRGBA

provides: [Element.setStyle,Element.עetStyle]

...
*/
(function(o_setStyle,o_getStyle){
    
    if (Browser.Features.rgba) return;
    
    var set_regex = /rgba\(([0-9a-fA-F]{1,3}),([0-9a-fA-F]{1,3}),([0-9a-fA-F]{1,3}),(.*)\)/
        , get_regex = /progid:DXImageTransform\.Microsoft\.gradient\(startColorstr=#(.{2,2})(.{6,6})/;
        
    Element.implement({
        setStyle : function setStyle(property,value){
            if (!property.test(/background/)) o_setStyle.apply(this,arguments);
            
            var match = value.match(set_regex);
            
            if (!match){
                o_setStyle.apply(this,arguments);
                return;  
            }
            
            match.shift();
            this.setRGBA.apply(this,match);
            
            return this;
        }
        , getStyle: function getStyle(property){
            if (!property.test(/background/)) old_gset.apply(this,arguments);
            
            var match = this.style.filter.match(get_regex);
            
            if (!match) return o_getStyle.apply(this,arguments);
            
            var rgb = match[2].hexToRgb(true);
            
            return 'rgba('+rgb.join(',')+','+parseInt(match[1],16)/100+')';
        }
    
    });
    
})(Element.prototype.setStyle,Element.prototype.setStyle);