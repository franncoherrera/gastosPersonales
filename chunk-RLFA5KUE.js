import{c as x,d as S,g as k}from"./chunk-EAOQ4LPA.js";import{q as E}from"./chunk-235OK6Z2.js";import{Ba as u,I as f,Pa as p,bc as h,gb as t,gc as y,hb as n,ia as d,ib as a,kb as g,ma as s,pb as o,qb as v,rb as b,sc as D,tb as m}from"./chunk-YBZANQQV.js";var F=(()=>{let e=class e{getCurrentYear(){return new Date().getFullYear()}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=s({type:e,selectors:[["app-footer"]],standalone:!0,features:[m],decls:7,vars:1,consts:[[1,"footer"],[1,"container-fluid","clearfix"],[1,"text-muted","d-block","text-center","text-sm-left","d-sm-inline-block"],["href","franco-herrera-portfolio.web.app","target","_blank"]],template:function(i,c){i&1&&(t(0,"footer",0)(1,"div",1)(2,"span",2),o(3),t(4,"a",3),o(5,"Franco Herrera"),n(),o(6,"."),n()()()),i&2&&(p(3),b("Derechos reservados \xA9",c.getCurrentYear()," "))}});let r=e;return r})();var L=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=s({type:e,selectors:[["app-navbar"]],standalone:!0,features:[m],decls:9,vars:0,consts:[[1,"navbar","default-layout","col-sm-12","col-12","p-0","fixed-top","d-flex","flex-row"],[1,"text-center","navbar-brand-wrapper","d-flex","align-items-top","justify-content-center"],[1,"navbar-brand","brand-logo"],["src","assets/images/logo.svg","alt","logo"],[1,"navbar-brand","brand-logo-mini"],["src","assets/images/logo-mini.svg","alt","logo"],[1,"navbar-menu-wrapper","d-flex","align-items-center"],["type","button","data-toggle","offcanvas",1,"navbar-toggler","navbar-toggler-right","d-sm-none","align-self-center"],[1,"icon-menu"]],template:function(i,c){i&1&&(t(0,"nav",0)(1,"div",1)(2,"a",2),a(3,"img",3),n(),t(4,"a",4),a(5,"img",5),n()(),t(6,"div",6)(7,"button",7),a(8,"span",8),n()()())}});let r=e;return r})();var z=(()=>{let e=class e{constructor(){this.authService=d(E),this.router=d(x),this.store=d(D),this.destroy=d(u)}ngOnInit(){this.store.select("user").pipe(y(this.destroy),f(l=>l!==null)).subscribe(({user:l})=>this.nombre=l.nombre)}logOut(){this.authService.logOut().then(()=>this.router.navigate(["/login"]))}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=s({type:e,selectors:[["app-sidebar"]],standalone:!0,features:[m],decls:30,vars:1,consts:[[1,"sidebar","sidebar-offcanvas"],[1,"nav"],[1,"nav-item","nav-profile"],[1,"nav-link"],[1,"user-wrapper"],[1,"profile-image"],["src","assets/images/faces/face1.jpg","alt","profile image"],[1,"text-wrapper","d-flex","align-items-center"],[1,"profile-name","m-0"],[1,"nav-item"],["routerLink","/",1,"nav-link"],[1,"menu-icon","fa","fa-tachometer-alt"],[1,"menu-title"],["routerLink","/ingreso-egreso",1,"nav-link"],[1,"menu-icon","fa","fa-clipboard-list"],["routerLink","/detalle",1,"nav-link"],[1,"menu-icon","fa","fa-table"],["routerLink","/login",1,"nav-link","cursor"],[1,"menu-icon","fa","fa-sign-out-alt"],[1,"menu-title",3,"click"]],template:function(i,c){i&1&&(t(0,"nav",0)(1,"ul",1)(2,"li",2)(3,"div",3)(4,"div",4)(5,"div",5),a(6,"img",6),n(),t(7,"div",7)(8,"p",8),o(9),n()()()()(),t(10,"li",9)(11,"a",10),a(12,"i",11),t(13,"span",12),o(14,"Dashboard"),n()()(),t(15,"li",9)(16,"a",13),a(17,"i",14),t(18,"span",12),o(19,"Ingresos y Egresos"),n()()(),t(20,"li",9)(21,"a",15),a(22,"i",16),t(23,"span",12),o(24,"Detalle"),n()()(),t(25,"li",9)(26,"a",17),a(27,"i",18),t(28,"span",19),g("click",function(){return c.logOut()}),o(29,"Cerrar sesi\xF3n"),n()()()()()),i&2&&(p(9),v(c.nombre))},dependencies:[h,k,S]});let r=e;return r})();export{F as a,L as b,z as c};
