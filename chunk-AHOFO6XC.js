import{a as O}from"./chunk-NZMGJ6BS.js";import{a as $}from"./chunk-6MXZRGP5.js";import"./chunk-235OK6Z2.js";import{$b as B,Ba as I,Pa as c,ac as P,bc as T,cb as b,d as j,eb as y,fb as C,gb as n,gc as M,hb as r,ia as m,ib as u,jb as _,kb as D,lb as w,ma as x,pa as E,pb as s,qb as f,rb as F,sc as V,tb as k,vb as l,wa as v,wb as d,xa as S}from"./chunk-YBZANQQV.js";var g=j(O());var U=(()=>{let e=class e{transform(o){return[...o].sort((p,h)=>p.tipo==="ingreso"&&h.tipo!=="ingreso"?-1:p.tipo!=="ingreso"&&h.tipo==="ingreso"?1:0)}};e.\u0275fac=function(i){return new(i||e)},e.\u0275pipe=E({name:"ordenIngreso",type:e,pure:!0,standalone:!0});let t=e;return t})();var q=(t,e)=>e.uid;function z(t,e){if(t&1){let a=_();n(0,"tr")(1,"td"),s(2),r(),n(3,"td"),s(4),l(5,"currency"),r(),n(6,"td"),s(7),l(8,"uppercase"),r(),n(9,"td")(10,"button",6),D("click",function(){let i=v(a).$implicit,p=w();return S(p.borrar(i.uid))}),u(11,"i",7),s(12," Borrar "),r()()()}if(t&2){let a=e.$implicit;c(2),f(a.descripcion),c(2),f(d(5,7,a.monto)),c(2),b("text-success",a.tipo==="ingreso")("text-danger",a.tipo==="egreso"),c(),F(" ",d(8,9,a.tipo)," ")}}var X=(()=>{let e=class e{constructor(){this.ingresosEgresosItems=[],this.store=m(V),this.destroy=m(I),this.ingresoEgresoService=m($)}ngOnInit(){this.store.select("ingresosEgresos").pipe(M(this.destroy)).subscribe(({items:o})=>this.ingresosEgresosItems=o)}borrar(o){this.ingresoEgresoService.borrarIngresoEgreso(o).then(()=>g.default.fire("Borrado","Item borrado","success")).catch(i=>g.default.fire("Error",i.message,"error"))}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=x({type:e,selectors:[["app-detalle"]],standalone:!0,features:[k],decls:20,vars:2,consts:[[1,"row"],[1,"col-12"],[1,"card"],[1,"card-body"],[1,"card-title"],[1,"table"],[1,"btn","btn-danger",3,"click"],[1,"fa","fa-trash"]],template:function(i,p){i&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h4",4),s(5,"Detalle de ingreso egreso"),r(),n(6,"table",5)(7,"thead")(8,"tr")(9,"th"),s(10,"Descripci\xF3n"),r(),n(11,"th"),s(12,"Monto"),r(),n(13,"th"),s(14,"Tipo"),r(),u(15,"th"),r()(),n(16,"tbody"),y(17,z,13,11,"tr",null,q),l(19,"ordenIngreso"),r()()()()()()),i&2&&(c(17),C(d(19,0,p.ingresosEgresosItems)))},dependencies:[T,B,P,U]});let t=e;return t})();export{X as DetalleComponent};
