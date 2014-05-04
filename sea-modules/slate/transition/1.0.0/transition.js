define("slate/transition/1.0.0/transition",["$"],function(a){var b=a("$");b.fn.transition=function(){var a,c=b(this),d=c.selector||"",e=(new Date).getTime(),f=[],g=arguments,h=g[0],i=[].slice.call(arguments,1),j="string"==typeof h;return window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,0)},c.each(function(){var k,l,m,n,o,p,q,r,s,t,u=b(this),v=this;t={initialize:function(){k=t.get.settings.apply(v,g),t.verbose("Converted arguments into settings object",k),m=k.error,n=k.className,r=k.namespace,o=k.metadata,s="module-"+r,p=t.get.animationEvent(),q=t.get.animationName(),l=u.data(s)||t,j&&(j=t.invoke(h)),j===!1&&t.animate(),t.instantiate()},instantiate:function(){t.verbose("Storing instance of module",t),u.data(s,l)},destroy:function(){t.verbose("Destroying previous module for",v),u.removeData(s)},refresh:function(){t.verbose("Refreshing display type on next animation"),delete l.displayType},forceRepaint:function(){t.verbose("Forcing element repaint");var a=u.parent(),b=u.next();0===b.size()?u.detach().appendTo(a):u.detach().insertBefore(b)},repaint:function(){t.verbose("Repainting element"),v.offsetWidth},animate:function(a){return k=a||k,t.is.supported()?(t.debug("Preparing animation",k.animation),t.is.animating()&&k.queue?(!k.allowRepeats&&t.has.direction()&&t.is.occuring()&&l.queuing!==!0?t.error(m.repeated):t.queue(k.animation),!1):(t.can.animate?t.set.animating(k.animation):t.error(m.noAnimation,k.animation),void 0)):(t.error(m.support),!1)},reset:function(){t.debug("Resetting animation to beginning conditions"),u.off(p),t.restore.conditions(),t.hide(),t.remove.animating()},queue:function(a){t.debug("Queueing animation of",a),l.queuing=!0,u.one(p,function(){l.queuing=!1,t.repaint(),t.animate.apply(this,k)})},complete:function(){t.verbose("CSS animation complete",k.animation),t.is.looping()||(t.is.outward()?(t.verbose("Animation is outward, hiding element"),t.restore.conditions(),t.remove.display(),t.hide(),b.proxy(k.onHide,this)()):t.is.inward()?(t.verbose("Animation is outward, showing element"),t.restore.conditions(),t.show(),b.proxy(k.onShow,this)()):t.restore.conditions(),t.remove.duration(),t.remove.animating()),b.proxy(k.complete,this)()},has:{direction:function(a){return a=a||k.animation,-1!==a.search(n.inward)||-1!==a.search(n.outward)?(t.debug("Direction already set in animation"),!0):!1}},set:{animating:function(a){a=a||k.animation,t.save.conditions(),t.can.transition()&&!t.has.direction()&&t.set.direction(),t.remove.hidden(),t.set.display(),u.addClass(n.animating).addClass(n.transition).addClass(a).one(p,t.complete),t.set.duration(k.duration),t.debug("Starting tween",k.animation,u.attr("class"))},display:function(){var a=t.get.displayType();"block"!==a&&"none"!==a&&(t.verbose("Setting final visibility to",a),u.css({display:a}))},direction:function(){u.is(":visible")?(t.debug("Automatically determining the direction of animation","Outward"),u.removeClass(n.inward).addClass(n.outward)):(t.debug("Automatically determining the direction of animation","Inward"),u.removeClass(n.outward).addClass(n.inward))},looping:function(){t.debug("Transition set to loop"),u.addClass(n.looping)},duration:function(a){a=a||k.duration,a="number"==typeof a?a+"ms":a,t.verbose("Setting animation duration",a),u.css({"-webkit-animation-duration":a,"-moz-animation-duration":a,"-ms-animation-duration":a,"-o-animation-duration":a,"animation-duration":a})},hidden:function(){u.addClass(n.transition).addClass(n.hidden)},visible:function(){u.addClass(n.transition).addClass(n.visible)}},save:{displayType:function(a){l.displayType=a},transitionExists:function(a,c){b.fn.transition.exists[a]=c,t.verbose("Saving existence of transition",a,c)},conditions:function(){l.cache={className:u.attr("class"),style:u.attr("style")},t.verbose("Saving original attributes",l.cache)}},restore:{conditions:function(){return void 0===l.cache?!1:(l.cache.className?u.attr("class",l.cache.className):u.removeAttr("class"),l.cache.style?u.attr("style",l.cache.style):"block"===t.get.displayType()&&u.removeAttr("style"),t.is.looping()&&t.remove.looping(),t.verbose("Restoring original attributes",l.cache),void 0)}},remove:{animating:function(){u.removeClass(n.animating)},display:function(){void 0!==l.displayType&&u.css("display","")},duration:function(){u.css({"-webkit-animation-duration":"","-moz-animation-duration":"","-ms-animation-duration":"","-o-animation-duration":"","animation-duration":""})},hidden:function(){u.removeClass(n.hidden)},visible:function(){u.removeClass(n.visible)},looping:function(){t.debug("Transitions are no longer looping"),u.removeClass(n.looping),t.forceRepaint()}},get:{settings:function(a,c,d){return"object"==typeof a?b.extend(!0,{},b.fn.transition.settings,a):"function"==typeof d?b.extend({},b.fn.transition.settings,{animation:a,complete:d,duration:c}):"string"==typeof c||"number"==typeof c?b.extend({},b.fn.transition.settings,{animation:a,duration:c}):"object"==typeof c?b.extend({},b.fn.transition.settings,c,{animation:a}):"function"==typeof c?b.extend({},b.fn.transition.settings,{animation:a,complete:c}):b.extend({},b.fn.transition.settings,{animation:a})},displayType:function(){return void 0===l.displayType&&t.can.transition(),l.displayType},transitionExists:function(a){return b.fn.transition.exists[a]},animationName:function(){var a,b=document.createElement("div"),c={animation:"animationName",OAnimation:"oAnimationName",MozAnimation:"mozAnimationName",WebkitAnimation:"webkitAnimationName"};for(a in c)if(void 0!==b.style[a])return t.verbose("Determined animation vendor name property",c[a]),c[a];return!1},animationEvent:function(){var a,b=document.createElement("div"),c={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(a in c)if(void 0!==b.style[a])return t.verbose("Determined animation vendor end event",c[a]),c[a];return!1}},can:{animate:function(){return"none"!==u.css(k.animation)?(t.debug("CSS definition found",u.css(k.animation)),!0):(t.debug("Unable to find css definition",u.attr("class")),!1)},transition:function(){var a,c,d,e,f=u.attr("class"),g=k.animation,h=t.get.transitionExists(k.animation);return(void 0===h||void 0===l.displayType)&&(t.verbose("Determining whether animation exists"),a=b("<div>").addClass(f).appendTo(b("body")),c=a.removeClass(n.inward).removeClass(n.outward).addClass(n.animating).addClass(n.transition).addClass(g).css(q),d=a.addClass(n.inward).css(q),e=a.attr("class",f).show().css("display"),t.verbose("Determining final display state",e),c!=d?(t.debug("Transition exists for animation",g),h=!0):(t.debug("Static animation found",g,e),h=!1),a.remove(),t.save.displayType(e),t.save.transitionExists(g,h)),h}},is:{animating:function(){return u.hasClass(n.animating)},inward:function(){return u.hasClass(n.inward)},outward:function(){return u.hasClass(n.outward)},looping:function(){return u.hasClass(n.looping)},occuring:function(a){return a=a||k.animation,u.hasClass(a)},visible:function(){return u.is(":visible")},supported:function(){return q!==!1&&p!==!1}},hide:function(){t.verbose("Hiding element"),t.remove.visible(),t.set.hidden(),t.repaint()},show:function(a){t.verbose("Showing element",a),t.remove.hidden(),t.set.visible(),t.repaint()},start:function(){t.verbose("Starting animation"),u.removeClass(n.disabled)},stop:function(){t.debug("Stopping animation"),u.addClass(n.disabled)},toggle:function(){t.debug("Toggling play status"),u.toggleClass(n.disabled)},setting:function(a,c){if(b.isPlainObject(a))b.extend(!0,k,a);else{if(void 0===c)return k[a];k[a]=c}},internal:function(a,c){if(b.isPlainObject(a))b.extend(!0,t,a);else{if(void 0===c)return t[a];t[a]=c}},debug:function(){k.debug&&(k.performance?t.performance.log(arguments):(t.debug=Function.prototype.bind.call(console.info,console,k.name+":"),t.debug.apply(console,arguments)))},verbose:function(){k.verbose&&k.debug&&(k.performance?t.performance.log(arguments):(t.verbose=Function.prototype.bind.call(console.info,console,k.name+":"),t.verbose.apply(console,arguments)))},error:function(){t.error=Function.prototype.bind.call(console.error,console,k.name+":"),t.error.apply(console,arguments)},performance:{log:function(a){var b,c,d;k.performance&&(b=(new Date).getTime(),d=e||b,c=b-d,e=b,f.push({Element:v,Name:a[0],Arguments:[].slice.call(a,1)||"","Execution Time":c})),clearTimeout(t.performance.timer),t.performance.timer=setTimeout(t.performance.display,100)},display:function(){var a=k.name+":",g=0;e=!1,clearTimeout(t.performance.timer),b.each(f,function(a,b){g+=b["Execution Time"]}),a+=" "+g+"ms",d&&(a+=" '"+d+"'"),c.size()>1&&(a+=" ("+c.size()+")"),(void 0!==console.group||void 0!==console.table)&&f.length>0&&(console.groupCollapsed(a),console.table?console.table(f):b.each(f,function(a,b){console.log(b.Name+": "+b["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(c,d,e){var f,g,h,j=l;return d=d||i,e=v||e,"string"==typeof c&&void 0!==j&&(c=c.split(/[\. ]/),f=c.length-1,b.each(c,function(a,d){var e=a!=f?d+c[a+1].charAt(0).toUpperCase()+c[a+1].slice(1):c;if(b.isPlainObject(j[e])&&a!=f)j=j[e];else{if(void 0!==j[e])return g=j[e],!1;if(!b.isPlainObject(j[d])||a==f)return void 0!==j[d]?(g=j[d],!1):!1;j=j[d]}})),b.isFunction(g)?h=g.apply(e,d):void 0!==g&&(h=g),b.isArray(a)?a.push(h):void 0!==a?a=[a,h]:void 0!==h&&(a=h),g||!1}},t.initialize()}),void 0!==a?a:this},b.fn.transition.exists={},b.fn.transition.settings={name:"Transition",debug:!1,verbose:!0,performance:!0,namespace:"transition",complete:function(){},onShow:function(){},onHide:function(){},allowRepeats:!1,animation:"fade",duration:"700ms",queue:!0,className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"ui transition",visible:"visible"},error:{noAnimation:"There is no css animation matching the one you specified.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}});
