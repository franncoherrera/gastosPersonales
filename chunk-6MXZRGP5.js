import{e as d,g as f,h as l,i as c,j as h,k as n,q as m}from"./chunk-235OK6Z2.js";import{a as u,ca as a,ia as i}from"./chunk-YBZANQQV.js";var b=(()=>{let e=class e{constructor(){this.firestore=i(d),this.authService=i(m)}crearIngresoEgreso(t){delete t.uid;let r=this.authService.user.uid,o=n(this.firestore,`${r}/ingresos-egresos`),g=c(o,"items");return l(g,u({},t))}initIngresosEgresosListener(t){let r=c(this.firestore,`${t}/ingresos-egresos/items`);return f(r,{idField:"uid"})}borrarIngresoEgreso(t){let r=this.authService.user.uid,o=n(this.firestore,`${r}/ingresos-egresos/items/${t}`);return h(o)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"});let s=e;return s})();export{b as a};
