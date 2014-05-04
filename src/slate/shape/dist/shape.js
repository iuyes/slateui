define("slate/shape/1.0.0/shape",["$"],function(a){var b=a("$");b.fn.shape=function(a){var c,d=b(this),e=b("body"),f=(new Date).getTime(),g=[],h=arguments[0],i="string"==typeof h,j=[].slice.call(arguments,1);return d.each(function(){var k,l,m,n=d.selector||"",o=b.extend(!0,{},b.fn.shape.settings,a),p=o.namespace,q=o.selector,r=o.error,s=o.className,t="."+p,u="module-"+p,v=b(this),w=v.find(q.sides),x=v.find(q.side),y=!1,z=this,A=v.data(u);m={initialize:function(){m.verbose("Initializing module for",z),m.set.defaultSide(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),A=m,v.data(u,A)},destroy:function(){m.verbose("Destroying previous module for",z),v.removeData(u).off(t)},refresh:function(){m.verbose("Refreshing selector cache for",z),v=b(z),w=b(this).find(q.shape),x=b(this).find(q.side)},repaint:function(){m.verbose("Forcing repaint event");var a=w.get(0)||document.createElement("div");a.offsetWidth},animate:function(a,c){m.verbose("Animating box with properties",a),c=c||function(a){m.verbose("Executing animation callback"),void 0!==a&&a.stopPropagation(),m.reset(),m.set.active()},b.proxy(o.beforeChange,l[0])(),m.get.transitionEvent()?(m.verbose("Starting CSS animation"),v.addClass(s.animating),m.repaint(),v.addClass(s.animating),k.addClass(s.hidden),w.css(a).one(m.get.transitionEvent(),c),m.set.duration(o.duration)):c()},queue:function(a){m.debug("Queueing animation of",a),w.one(m.get.transitionEvent(),function(){m.debug("Executing queued animation"),setTimeout(function(){v.shape(a)},0)})},reset:function(){m.verbose("Animating states reset"),v.removeClass(s.animating).attr("style","").removeAttr("style"),w.attr("style","").removeAttr("style"),x.attr("style","").removeAttr("style").removeClass(s.hidden),l.removeClass(s.animating).attr("style","").removeAttr("style")},is:{animating:function(){return v.hasClass(s.animating)}},set:{defaultSide:function(){k=v.find("."+o.className.active),l=k.next(q.side).size()>0?k.next(q.side):v.find(q.side).first(),y=!1,m.verbose("Active side set to",k),m.verbose("Next side set to",l)},duration:function(a){a=a||o.duration,a="number"==typeof a?a+"ms":a,m.verbose("Setting animation duration",a),w.add(x).css({"-webkit-transition-duration":a,"-moz-transition-duration":a,"-ms-transition-duration":a,"-o-transition-duration":a,"transition-duration":a})},stageSize:function(){var a=v.clone().addClass(s.loading),b=a.find("."+o.className.active),c=y?a.find(y):b.next(q.side).size()>0?b.next(q.side):a.find(q.side).first(),d={};b.removeClass(s.active),c.addClass(s.active),a.prependTo(e),d={width:c.outerWidth(),height:c.outerHeight()},a.remove(),v.css(d),m.verbose("Resizing stage to fit new content",d)},nextSide:function(a){y=a,l=v.find(a),0===l.size()&&m.error(r.side),m.verbose("Next side manually set to",l)},active:function(){m.verbose("Setting new side to active",l),x.removeClass(s.active),l.addClass(s.active),b.proxy(o.onChange,l[0])(),m.set.defaultSide()}},flip:{up:function(){m.debug("Flipping up",l),m.is.animating()?m.queue("flip up"):(m.set.stageSize(),m.stage.above(),m.animate(m.get.transform.up()))},down:function(){m.debug("Flipping down",l),m.is.animating()?m.queue("flip down"):(m.set.stageSize(),m.stage.below(),m.animate(m.get.transform.down()))},left:function(){m.debug("Flipping left",l),m.is.animating()?m.queue("flip left"):(m.set.stageSize(),m.stage.left(),m.animate(m.get.transform.left()))},right:function(){m.debug("Flipping right",l),m.is.animating()?m.queue("flip right"):(m.set.stageSize(),m.stage.right(),m.animate(m.get.transform.right()))},over:function(){m.debug("Flipping over",l),m.is.animating()?m.queue("flip over"):(m.set.stageSize(),m.stage.behind(),m.animate(m.get.transform.over()))},back:function(){m.debug("Flipping back",l),m.is.animating()?m.queue("flip back"):(m.set.stageSize(),m.stage.behind(),m.animate(m.get.transform.back()))}},get:{transform:{up:function(){var a={y:-((k.outerHeight()-l.outerHeight())/2),z:-(k.outerHeight()/2)};return{transform:"translateY("+a.y+"px) translateZ("+a.z+"px) rotateX(-90deg)"}},down:function(){var a={y:-((k.outerHeight()-l.outerHeight())/2),z:-(k.outerHeight()/2)};return{transform:"translateY("+a.y+"px) translateZ("+a.z+"px) rotateX(90deg)"}},left:function(){var a={x:-((k.outerWidth()-l.outerWidth())/2),z:-(k.outerWidth()/2)};return{transform:"translateX("+a.x+"px) translateZ("+a.z+"px) rotateY(90deg)"}},right:function(){var a={x:-((k.outerWidth()-l.outerWidth())/2),z:-(k.outerWidth()/2)};return{transform:"translateX("+a.x+"px) translateZ("+a.z+"px) rotateY(-90deg)"}},over:function(){var a={x:-((k.outerWidth()-l.outerWidth())/2)};return{transform:"translateX("+a.x+"px) rotateY(180deg)"}},back:function(){var a={x:-((k.outerWidth()-l.outerWidth())/2)};return{transform:"translateX("+a.x+"px) rotateY(-180deg)"}}},transitionEvent:function(){var a,b=document.createElement("element"),c={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(a in c)if(void 0!==b.style[a])return c[a]},nextSide:function(){return k.next(q.side).size()>0?k.next(q.side):v.find(q.side).first()}},stage:{above:function(){var a={origin:(k.outerHeight()-l.outerHeight())/2,depth:{active:l.outerHeight()/2,next:k.outerHeight()/2}};m.verbose("Setting the initial animation position as above",l,a),k.css({transform:"rotateY(0deg) translateZ("+a.depth.active+"px)"}),l.addClass(s.animating).css({display:"block",top:a.origin+"px",transform:"rotateX(90deg) translateZ("+a.depth.next+"px)"})},below:function(){var a={origin:(k.outerHeight()-l.outerHeight())/2,depth:{active:l.outerHeight()/2,next:k.outerHeight()/2}};m.verbose("Setting the initial animation position as below",l,a),k.css({transform:"rotateY(0deg) translateZ("+a.depth.active+"px)"}),l.addClass(s.animating).css({display:"block",top:a.origin+"px",transform:"rotateX(-90deg) translateZ("+a.depth.next+"px)"})},left:function(){var a={origin:(k.outerWidth()-l.outerWidth())/2,depth:{active:l.outerWidth()/2,next:k.outerWidth()/2}};m.verbose("Setting the initial animation position as left",l,a),k.css({transform:"rotateY(0deg) translateZ("+a.depth.active+"px)"}),l.addClass(s.animating).css({display:"block",left:a.origin+"px",transform:"rotateY(-90deg) translateZ("+a.depth.next+"px)"})},right:function(){var a={origin:(k.outerWidth()-l.outerWidth())/2,depth:{active:l.outerWidth()/2,next:k.outerWidth()/2}};m.verbose("Setting the initial animation position as left",l,a),k.css({transform:"rotateY(0deg) translateZ("+a.depth.active+"px)"}),l.addClass(s.animating).css({display:"block",left:a.origin+"px",transform:"rotateY(90deg) translateZ("+a.depth.next+"px)"})},behind:function(){var a={origin:(k.outerWidth()-l.outerWidth())/2,depth:{active:l.outerWidth()/2,next:k.outerWidth()/2}};m.verbose("Setting the initial animation position as behind",l,a),k.css({transform:"rotateY(0deg)"}),l.addClass(s.animating).css({display:"block",left:a.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(a,c){if(b.isPlainObject(a))b.extend(!0,o,a);else{if(void 0===c)return o[a];o[a]=c}},internal:function(a,c){if(b.isPlainObject(a))b.extend(!0,m,a);else{if(void 0===c)return m[a];m[a]=c}},debug:function(){o.debug&&(o.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,o.name+":"),m.debug.apply(console,arguments)))},verbose:function(){o.verbose&&o.debug&&(o.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,o.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,o.name+":"),m.error.apply(console,arguments)},performance:{log:function(a){var b,c,d;o.performance&&(b=(new Date).getTime(),d=f||b,c=b-d,f=b,g.push({Element:z,Name:a[0],Arguments:[].slice.call(a,1)||"","Execution Time":c})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var a=o.name+":",c=0;f=!1,clearTimeout(m.performance.timer),b.each(g,function(a,b){c+=b["Execution Time"]}),a+=" "+c+"ms",n&&(a+=" '"+n+"'"),d.size()>1&&(a+=" ("+d.size()+")"),(void 0!==console.group||void 0!==console.table)&&g.length>0&&(console.groupCollapsed(a),console.table?console.table(g):b.each(g,function(a,b){console.log(b.Name+": "+b["Execution Time"]+"ms")}),console.groupEnd()),g=[]}},invoke:function(a,d,e){var f,g,h,i=A;return d=d||j,e=z||e,"string"==typeof a&&void 0!==i&&(a=a.split(/[\. ]/),f=a.length-1,b.each(a,function(c,d){var e=c!=f?d+a[c+1].charAt(0).toUpperCase()+a[c+1].slice(1):a;if(b.isPlainObject(i[e])&&c!=f)i=i[e];else{if(void 0!==i[e])return g=i[e],!1;if(!b.isPlainObject(i[d])||c==f)return void 0!==i[d]?(g=i[d],!1):!1;i=i[d]}})),b.isFunction(g)?h=g.apply(e,d):void 0!==g&&(h=g),b.isArray(c)?c.push(h):void 0!==c?c=[c,h]:void 0!==h&&(c=h),g}},i?(void 0===A&&m.initialize(),m.invoke(h)):(void 0!==A&&m.destroy(),m.initialize())}),void 0!==c?c:this},b.fn.shape.settings={name:"Shape",debug:!1,verbose:!0,performance:!0,namespace:"shape",beforeChange:function(){},onChange:function(){},duration:700,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}});