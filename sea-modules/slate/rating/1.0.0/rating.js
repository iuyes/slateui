define("slate/rating/1.0.0/rating",["$"],function(a){var b=a("$");b.fn.rating=function(a){var c,d=b(this),e=d.selector||"",f=(new Date).getTime(),g=[],h=arguments[0],i="string"==typeof h,j=[].slice.call(arguments,1);return d.each(function(){var k,l=b.isPlainObject(a)?b.extend(!0,{},b.fn.rating.settings,a):b.extend({},b.fn.rating.settings),m=l.namespace,n=l.className,o=l.metadata,p=l.selector,q=(l.error,"."+m),r="module-"+m,s=this,t=b(this).data(r),u=b(this),v=u.find(p.icon);k={initialize:function(){k.verbose("Initializing rating module",l),l.interactive?k.enable():k.disable(),l.initialRating&&(k.debug("Setting initial rating"),k.setRating(l.initialRating)),u.data(o.rating)&&(k.debug("Rating found in metadata"),k.setRating(u.data(o.rating))),k.instantiate()},instantiate:function(){k.verbose("Instantiating module",l),t=k,u.data(r,k)},destroy:function(){k.verbose("Destroying previous instance",t),u.removeData(r),v.off(q)},event:{mouseenter:function(){var a=b(this);a.nextAll().removeClass(n.hover),u.addClass(n.hover),a.addClass(n.hover).prevAll().addClass(n.hover)},mouseleave:function(){u.removeClass(n.hover),v.removeClass(n.hover)},click:function(){var a=b(this),c=k.getRating(),d=v.index(a)+1;l.clearable&&c==d?k.clearRating():k.setRating(d)}},clearRating:function(){k.debug("Clearing current rating"),k.setRating(0)},getRating:function(){var a=v.filter("."+n.active).size();return k.verbose("Current rating retrieved",a),a},enable:function(){k.debug("Setting rating to interactive mode"),v.on("mouseenter"+q,k.event.mouseenter).on("mouseleave"+q,k.event.mouseleave).on("click"+q,k.event.click),u.removeClass(n.disabled)},disable:function(){k.debug("Setting rating to read-only mode"),v.off(q),u.addClass(n.disabled)},setRating:function(a){var c=a-1>=0?a-1:0,d=v.eq(c);u.removeClass(n.hover),v.removeClass(n.hover).removeClass(n.active),a>0&&(k.verbose("Setting current rating to",a),d.addClass(n.active).prevAll().addClass(n.active)),b.proxy(l.onRate,s)(a)},setting:function(a,c){if(b.isPlainObject(a))b.extend(!0,l,a);else{if(void 0===c)return l[a];l[a]=c}},internal:function(a,c){if(b.isPlainObject(a))b.extend(!0,k,a);else{if(void 0===c)return k[a];k[a]=c}},debug:function(){l.debug&&(l.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,l.name+":"),k.debug.apply(console,arguments)))},verbose:function(){l.verbose&&l.debug&&(l.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,l.name+":"),k.verbose.apply(console,arguments)))},error:function(){k.error=Function.prototype.bind.call(console.error,console,l.name+":"),k.error.apply(console,arguments)},performance:{log:function(a){var b,c,d;l.performance&&(b=(new Date).getTime(),d=f||b,c=b-d,f=b,g.push({Element:s,Name:a[0],Arguments:[].slice.call(a,1)||"","Execution Time":c})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,100)},display:function(){var a=l.name+":",c=0;f=!1,clearTimeout(k.performance.timer),b.each(g,function(a,b){c+=b["Execution Time"]}),a+=" "+c+"ms",e&&(a+=" '"+e+"'"),d.size()>1&&(a+=" ("+d.size()+")"),(void 0!==console.group||void 0!==console.table)&&g.length>0&&(console.groupCollapsed(a),console.table?console.table(g):b.each(g,function(a,b){console.log(b.Name+": "+b["Execution Time"]+"ms")}),console.groupEnd()),g=[]}},invoke:function(a,d,e){var f,g,h,i=t;return d=d||j,e=s||e,"string"==typeof a&&void 0!==i&&(a=a.split(/[\. ]/),f=a.length-1,b.each(a,function(c,d){var e=c!=f?d+a[c+1].charAt(0).toUpperCase()+a[c+1].slice(1):a;if(b.isPlainObject(i[e])&&c!=f)i=i[e];else{if(void 0!==i[e])return g=i[e],!1;if(!b.isPlainObject(i[d])||c==f)return void 0!==i[d]?(g=i[d],!1):!1;i=i[d]}})),b.isFunction(g)?h=g.apply(e,d):void 0!==g&&(h=g),b.isArray(c)?c.push(h):void 0!==c?c=[c,h]:void 0!==h&&(c=h),g}},i?(void 0===t&&k.initialize(),k.invoke(h)):(void 0!==t&&k.destroy(),k.initialize())}),void 0!==c?c:this},b.fn.rating.settings={name:"Rating",namespace:"rating",verbose:!0,debug:!1,performance:!0,initialRating:0,interactive:!0,clearable:!1,onRate:function(){},error:{method:"The method you called is not defined"},metadata:{rating:"rating"},className:{active:"active",disabled:"disabled",hover:"hover",loading:"loading"},selector:{icon:".icon"}}});