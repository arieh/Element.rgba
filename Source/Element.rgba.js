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
 (function(){
    
    if (!Browser.ie) return;
    
    var old_set = Element.prototype.setStyle
        , old_get = Element.prototype.getStyle
        , set_regex = /rgba\(([0-9a-fA-F]{1,3}),([0-9a-fA-F]{1,3}),([0-9a-fA-F]{1,3}),(.*)\)/
        , get_regex = /progid:DXImageTransform\.Microsoft\.gradient\(startColorstr=#(.{2,2})(.{6,6})/;
        
    Element.implement({
        setStyle : function setStyle(property,value){
            if (!property.test(/background/)) old_set.apply(this,arguments);
            
            var match = value.match(set_regex);
            
            if (!match) old_set.apply(this,arguments);
            
            match.shift();
            match[3]*=100;
            
            for (var i = 0; i<4; i++){
                match[i] = match[i].toString(16);
                if (match[i].length==1) match[i] = "0" + match[i];
            }
            
            
            var alpha = match[3];
            match.pop();
            match.unshift(alpha);
            
            
            this.style.backgroundColor = "transparent";
            this.style.zoom = 1;                        
            this.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr=#"+match.join("")+",endColorstr=#"+match.join("")+");"
            
            return this;
        }
        , getStyle: function getStyle(property){
            if (!property.test(/background/)) old_gset.apply(this,arguments);
            
            var match = this.style.filter.match(get_regex);
            
            if (!match) return old_get.apply(this,arguments);
            
            var rgb = match[2].hexToRgb(true);
            
            return 'rgba('+rgb.join(',')+','+parseInt(match[1],16)/100+')';
        }
    
    });
    
    })();