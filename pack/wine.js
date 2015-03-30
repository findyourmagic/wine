(function(){var t,e,i,n,r,a,s,o,h,u;i=function(t,e){var n,r,a,s,o;if("object"===$.type(t)&&"object"===$.type(e)){for(r in t)if(a=t[r],!i(a,e[r]))return!1}else if("array"===$.type(t)&&"array"===$.type(e)){for(n=s=0,o=t.length;o>s;n=++s)if(a=t[n],!i(t[n],e[n]))return!1}else if(t!==e)return!1;return!0},n=function(t){var e;return e=/[^\.\[\]]+/g,t.match(e)},a=function(t){var e,i,r,a,s;for(r=n(t),e=a=0,s=r.length;s>a;e=++a)i=r[e],/[0-9]\d*/.test(i)&&(r[e]="$");return r.join(".")},s=function(t,e){var i;return"checkbox"===t.attr("type")?t.prop("checked"):"radio"===t.attr("type")?(i=t.attr("name"),e.find(":radio:checked[name="+i+"]").val()):t.val()},o=function(t,e,i){var r,o,h,u,c,l,f,d,p;if(h=n(i),u=t.data,h.length){for(p=[],r=c=0,l=h.length;l>c;r=++c)o=h[r],r<h.length-1?p.push(u=u[o]):(d=u[o],u[o]=s(e,t.parent),f=a(i),t.validateActions[f]&&t.validateActions[f].call(t,f),p.push(t.actions[f]?t.actions[f].call(t,{$obj:e,old:d,value:u[o],path:h}):void 0));return p}},r=function(t,e){var i,r,a,s,o,h;if(a=n(t.attr("wine-bind")),a.length){for(s=e,i=o=0,h=a.length;h>o;i=++o)r=a[i],s=s[r];return s}},h=function(t,e,i,n,r){var a,s,o,u,c,l,f,d;if(u=i,t.indexOf("$")>=0){l=t.replace(/\$/g,"\\d+").replace(/\./g,"\\."),d=new RegExp(l);for(s in r)if(a=r[s],d.test(s)&&!h(s,e,i,n,a))return!1;return!0}for(o=t.split("."),c=0,f=o.length;f>c;c++)a=o[c],u=u[a];return e.rule.test(u)?(e.success.call(n,u,r[t]),!0):(e.fail.call(n,u,r[t]),!1)},u=function(t,e){return t.find("[wine-bind]").each(function(){var i,n,a;return i=$(this),a=r(i,e),"select"===i[0].nodeName.toLowerCase()?i.val(a):"input"===i[0].nodeName.toLowerCase()&&"checkbox"===i.attr("type")?i.prop("checked",a):"input"===i[0].nodeName.toLowerCase()&&"radio"===i.attr("type")?(n=i.attr("name"),t.find(":radio[name="+n+"][value="+a+"]").prop("checked",a)):i.val(a)})},e=function(){var t;return t=this,this.parent.off("change").on("change","[wine-bind]",function(){var e;return e=$(this),"radio"!==e.attr("type")||e.prop("checked")?o(t,e,e.attr("wine-bind")):void 0})},t=function(){function t(t,i){this.parent=t,this.initialize=i,this.data=null,this.filter=null,this.template=null,this.memorize=null,this.actions={},this.validateActions={},this.events={},this.watches={},this.validateRules={},this.bindElements={},this.initialized=!1,e.call(this)}return t.prototype.setTemplate=function(t){return this.template=t,this},t.prototype.setValidate=function(t){var e,i,r,a,s,o,h;for(o=this.validateRules,h=this.validateActions,i=r=0,a=t.length;a>r;i=++r)e=t[i],s=n(e.name).join("."),o[s]={rule:e.rule,success:e.success,fail:e.fail},e.auto&&(h[s]=function(t){return this.validate(t)});return this},t.prototype.validate=function(t){var e,i,n,r,a,s,o,u,c;if(n=this,c=this.validateRules,a=this.data,s=n.bindElements,!t){for(i in c)if(r=c[i],!h(i,r,a,n,s))return!1;return!0}if("string"===$.type(t))return h(t,c[t],a,n,s)?!0:!1;if("array"===$.type(t)){for(o=0,u=t.length;u>o;o++)if(e=t[o],!h(e,c[e],a,n,s))return!1;return!0}},t.prototype.value=function(t){return this.beforeValue(),this.data=t,$.extend(!0,t,this.memorize),this.afterValue(),this},t.prototype.beforeValue=function(t){var e;try{t.call(this)}catch(i){e=i}return this},t.prototype.afterValue=function(t){var e;try{t.call(this)}catch(i){e=i}return this},t.prototype.form=function(){var t,e,i;return e=this,t=this.parent,i=e.bindElements,this.initialized||(this.init(),this.initialized=!0),u(t,e.data),t.find("[wine-bind]").each(function(){var t,e;return t=$(this),e=n(t.attr("wine-bind")).join("."),i[e]=t}),this},t.prototype.render=function(){var t,e,i,r;i=this,this.initialized||(this.init(),this.initialized=!0);try{this.beforeRenderFn()}catch(a){e=a}t=$("<div></div>"),t.html(ejs.render(this.template,this.data)),u(t,i.data),this.parent.empty().append(t.children()),r=i.bindElements={},this.parent.find("[wine-bind]").each(function(){var t,e;return t=$(this),e=n(t.attr("wine-bind")).join("."),r[e]=t});try{this.afterRenderFn()}catch(a){e=a}return this},t.prototype.beforeRender=function(t){return this.beforeRenderFn=t,this},t.prototype.afterRender=function(t){return this.afterRenderFn=t,this},t.prototype.binding=function(t){var e,i,r,a;i=this;for(e in t)r=t[e],a=n(e),i.actions[a.join(".")]=r;return this},t.prototype.unbinding=function(t){var e,i,r;if(i=this,r=function(t){var e;return e=n(t),i.actions[e.join(".")]=null},$.type("string"===t))r(t);else for(e in t)r(e);return this},t.prototype.init=function(){var t;try{this.initialize()}catch(e){t=e}return this},t.prototype.watch=function(t){var e,i,n,r;i=this,r=[];for(e in t)n=t[e],i.events[e]=n,r.push($.Wine.subscribe(i,e));return r},t.prototype.detach=function(t){var e,i,n;i=this,n=[];for(e in t)delete i.events[e],n.push($.Wine.detach(i,e));return n},t}(),jQuery.fn.wine=function(e){var i;return i=$(this),new t(i,e)},jQuery.Wine={subscribers:{},extend:function(t,i){var n,r,a,s,o;s=this.subscribers,o=$.extend(!0,{},t),o.parent=$(i),a=t.watches;for(n in a)r=a[n],(r=!0&&s[n]&&s[n].length)&&(o.watches[n]=!0,s[n].push(o));return e.call(o),o},subscribe:function(t,e){return t.watches[e]||(this.subscribers[e]=this.subscribers[e]||[],this.subscribers[e].push(t)),t.watches[e]=!0},trigger:function(t,e){var i,n,r,a,s,o,h,u,c;for(c=this.subscribers[t]||[],a=0,o=c.length;o>a;a++){n=c[a];try{n.events[t].call(n,e)}catch(l){i=l}}for(r=this.subscribers["*"]||[],u=[],s=0,h=r.length;h>s;s++){n=r[s];try{u.push(n.events[t].call(n,e))}catch(l){i=l}}return u},detach:function(t,e){var i,n,r,a,s,o;if(t.watches[e]){for(t.watches[e]=null,o=this.subscribers[e]||[],s=[],n=r=0,a=o.length;a>r;n=++r){if(i=o[n],t===i){o.splice(n,1);break}s.push(void 0)}return s}}}}).call(this);