(this["webpackJsonpco-lab"]=this["webpackJsonpco-lab"]||[]).push([[0],{108:function(e,t){},110:function(e,t){},123:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(65),u=n.n(o),i=(n(74),n(39)),s=n(69),a=n(4),l=n(1),j=Object(c.createContext)(),b=function(e){var t=e.children,n=Object(c.useState)(null),r=Object(a.a)(n,2),o=r[0],u=r[1],i=Object(c.useCallback)((function(){fetch("/api/authUser").then((function(e){return e.json()})).then((function(e){"ok"===e.code&&u(e.user)})).catch((function(e){console.log("not logged in")}))}),[]);return Object(c.useEffect)(i,[]),Object(l.jsx)(j.Provider,{value:{user:o,setUser:u},children:t})},f=(n(76),n(29)),d=n.n(f),O=Object(c.createContext)(),h=function(e){var t=e.children,n=Object(c.useContext)(j).user,r=n?d()("/",{query:{username:n.username}}):null,o=n?d()("/call",{query:{username:n.username}}):null;return Object(l.jsx)(O.Provider,{value:{onlineSocket:r,callSocket:o},children:t})},p=n(67),m=function(e){return fetch(e).then((function(e){return e.json()}))},g=function(){var e=Object(c.useContext)(O),t=e.onlineSocket,n=(e.callSocket,Object(c.useContext)(j).user),r=Object(c.useState)(null),o=Object(a.a)(r,2),u=o[0],i=o[1],s=Object(c.useState)([]),b=Object(a.a)(s,2),f=b[0],d=b[1],h=Object(p.a)("/api/contacts",m),g=(h.err,h.data);return Object(c.useEffect)((function(){"ok"===(null===g||void 0===g?void 0:g.code)&&i(g.contacts)}),[g]),Object(c.useEffect)((function(){t.on("members_online",(function(e){d(e)}))}),[t]),Object(l.jsxs)("div",{children:[Object(l.jsx)("p",{children:"Contacts"}),Object(l.jsx)("ul",{children:u?u.map((function(e,c){return Object(l.jsx)("li",{children:Object(l.jsxs)("p",{children:[e.name,f.includes(e.username)&&Object(l.jsxs)(l.Fragment,{children:[" ",Object(l.jsx)("span",{children:"\u2022"}),Object(l.jsx)("span",{onClick:function(){t.emit("new_call",{host:n.username,guests:[e.username]})},children:Object(l.jsx)("ion-icon",{name:"call-outline"})})," "]})]})},c)})):Object(l.jsx)("li",{children:"Loading"})})]})},x=n(2),v=n(68),C=n(36),S=n.n(C),w=function(e){var t=e.peer,n=Object(c.useRef)();return Object(c.useEffect)((function(){var e;null===(e=t.peer)||void 0===e||e.on("stream",(function(e){n.current.srcObject=e}))}),[]),Object(l.jsxs)("div",{children:[t.username,Object(l.jsx)("audio",{autoPlay:!0,ref:n})]})},y=function(e){var t=Object(c.useContext)(j).user,n=Object(c.useContext)(O).onlineSocket,r=Object(c.useState)([]),o=Object(a.a)(r,2),u=o[0],i=o[1],s=Object(c.useRef)(),b=Object(c.useRef)(),f=Object(c.useRef)([]),d=e.match.params.roomID;return Object(c.useEffect)((function(){s.current=n,navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then((function(e){b.current.srcObject=e,s.current.emit("join room",JSON.stringify({roomID:d,username:t.username})),s.current.on("all users",(function(n){var c=[];n.forEach((function(n){var r=n.userID,o=n.username,u=function(e,n,c){var r=new S.a({initiator:!0,trickle:!1,stream:c});return r.on("signal",(function(c){s.current.emit("sending signal",{userToSignal:e,caller:{callerID:n,username:t.username},signal:c})})),r}(r,s.current.id,e);f.current.push({peerID:r,peer:u}),c.push({peer:u,username:o})})),i(c)})),s.current.on("user joined",(function(t){var n=t.caller,c=n.callerID,r=n.username,o=function(e,t,n){var c=new S.a({initiator:!1,trickle:!1,stream:n});return c.on("signal",(function(e){s.current.emit("returning signal",{signal:e,caller:{callerID:t}})})),c.signal(e),c}(t.signal,c,e);f.current.push({peerID:c,peer:o}),i((function(e){return[].concat(Object(v.a)(e),[{peer:o,username:r}])}))})),s.current.on("user_left",(function(e){i((function(t){return t.filter((function(t){return t.username===e}))}))})),s.current.on("receiving returned signal",(function(e){f.current.find((function(t){return t.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{children:["self",Object(l.jsx)("audio",{muted:!0,ref:b,autoPlay:!0})]}),u.map((function(e,t){return Object(l.jsx)(w,{peer:e},t)}))]})},k=n(125),D=function(){var e=Object(x.g)(),t=Object(c.useContext)(j).setUser,n=Object(c.useContext)(O),r=n.onlineSocket,o=n.callSocket;return Object(c.useEffect)((function(){return function(){return r.disconnect()}}),[]),Object(c.useEffect)((function(){o.on("call_request",(function(e){console.log(e,"is calling")}))}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Co-lab"}),Object(l.jsx)(g,{}),Object(l.jsx)("button",{onClick:function(){fetch("/api/logout").then((function(e){return e.json()})).then((function(n){var c=n.user;n.success&&(t(c),e.push("/login"))}))},children:"logout"}),Object(l.jsx)("button",{onClick:function(){e.push("/room/".concat(Object(k.a)()))},children:"Start room"}),Object(l.jsx)(x.b,{path:"/room/:roomID",component:y})]})},I=n(16),E=function(){var e,t=Object(x.g)(),n=Object(c.useContext)(j),r=n.user,o=n.setUser,u=Object(c.useState)(""),i=Object(a.a)(u,2),s=i[0],b=i[1],f=Object(c.useState)(""),d=Object(a.a)(f,2),O=d[0],h=d[1];return r?Object(l.jsx)(x.a,{to:(null===(e=t.location.state)||void 0===e?void 0:e.from.pathname)||"/"}):Object(l.jsxs)("div",{className:"container",children:[Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("/api/login",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({username:s,password:O})}).then((function(e){return e.json()})).then((function(e){var n,c=e.code,r=e.user;"ok"===c?(o(r),t.push((null===(n=t.location.state)||void 0===n?void 0:n.from.pathname)||"/")):alert("username/password did not match")})).catch((function(e){alert("something went wrong"),console.log(e)}))},children:[Object(l.jsx)("input",{onChange:function(e){return b(e.target.value)},value:s,type:"text",placeholder:"username",required:!0}),Object(l.jsx)("input",{onChange:function(e){return h(e.target.value)},value:O,type:"password",placeholder:"password",required:!0}),Object(l.jsx)("button",{type:"submit",children:"Login"})]}),Object(l.jsx)(I.b,{to:"/register",children:"Register"})]})},q=function(){var e=Object(x.g)(),t=Object(c.useContext)(j).setUser,n=Object(c.useState)(""),r=Object(a.a)(n,2),o=r[0],u=r[1],i=Object(c.useState)(""),s=Object(a.a)(i,2),b=s[0],f=s[1],d=Object(c.useState)(""),O=Object(a.a)(d,2),h=O[0],p=O[1],m=Object(c.useState)(""),g=Object(a.a)(m,2),v=g[0],C=g[1];return Object(l.jsxs)("div",{children:[Object(l.jsxs)("form",{onSubmit:function(n){n.preventDefault(),fetch("/api/register",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({name:o,username:b,email:h,pass:v})}).then((function(e){return e.json()})).then((function(n){var c=n.code,r=n.user,o=n.field;"ok"===c?(t(r),e.push("/")):11e3===c?alert("".concat(o," exists")):alert("something went wrong")})).catch((function(e){console.log(e),alert("something went wrong")}))},autoComplete:"off",children:[Object(l.jsx)("input",{onChange:function(e){return f(e.target.value)},value:b,type:"text",placeholder:"username",required:!0,autoComplete:"off"}),Object(l.jsx)("input",{onChange:function(e){return u(e.target.value)},value:o,type:"text",placeholder:"name",required:!0}),Object(l.jsx)("input",{onChange:function(e){return p(e.target.value)},value:h,type:"email",placeholder:"email",required:!0}),Object(l.jsx)("input",{onChange:function(e){return C(e.target.value)},value:v,type:"password",placeholder:"password",required:!0,autoComplete:"new-password"}),Object(l.jsx)("button",{type:"submit",children:"Register"})]}),Object(l.jsx)(I.b,{to:"/login",children:"Login"})]})};function P(){var e=.01*window.innerHeight;document.body.style.setProperty("--vh","".concat(e,"px"))}function L(e){var t=e.children,n=Object(s.a)(e,["children"]),r=Object(c.useContext)(j).user;return Object(l.jsx)(x.b,Object(i.a)(Object(i.a)({},n),{},{render:function(e){var n=e.location;return r?t:Object(l.jsx)(x.a,{to:{pathname:"/login",state:{from:n}}})}}))}var R=function(){return Object(c.useEffect)((function(){window.addEventListener("resize",(function(){return P()})),P()}),[]),Object(l.jsx)(I.a,{children:Object(l.jsxs)(x.d,{children:[Object(l.jsx)(x.b,{path:"/login",children:Object(l.jsx)(E,{})}),Object(l.jsx)(x.b,{path:"/register",children:Object(l.jsx)(q,{})}),Object(l.jsx)(L,{path:"/",children:Object(l.jsx)(D,{})})]})})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,126)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,u=t.getTTFB;n(e),c(e),r(e),o(e),u(e)}))};u.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(b,{children:Object(l.jsx)(h,{children:Object(l.jsx)(R,{})})})}),document.getElementById("root")),U()},74:function(e,t,n){},76:function(e,t,n){}},[[123,1,2]]]);
//# sourceMappingURL=main.ea94cff9.chunk.js.map