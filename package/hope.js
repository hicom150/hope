/* hope v1.0.0 - 2013/3/26
   http://twitter.com/soyjavi
   Copyright (c) 2013 Javi Jiménez Villar - Licensed MIT */
(function(){(function(n){var t,e,r,i;e=function(){this._callbacks=[];return this};i=function(n){var t,r,i,u,o,s,c;t=n.length;r=0;s=new e;i=[];c=[];o=function(n){return function(e,u){r+=1;i[n]=e;c[n]=u;if(r===t){return s.done(i,c)}}};u=0;while(u<t){n[u]().then(o(u));u++}return s};r=function(n,t,i){var u;u=new e;if(n.length===0){u.done(t,i)}else{n[0](t,i).then(function(t,e){n.splice(0,1);return r(n,t,e).then(function(n,t){return u.done(n,t)})})}return u};e.prototype.then=function(n,t){var e;e=function(){return n.apply(t,arguments)};if(this._isdone){return e(this.error,this.result)}else{return this._callbacks.push(e)}};e.prototype.done=function(n,t){var e,r;this._isdone=true;this.error=n;this.result=t;e=0;r=this._callbacks.length;while(e<r){this._callbacks[e](n,t);e++}return this._callbacks=[]};t={Promise:e,join:i,chain:r};if(typeof define==="function"&&define.amd){return define(function(){return t})}else{return n.Hope=t}})(this)}).call(this);