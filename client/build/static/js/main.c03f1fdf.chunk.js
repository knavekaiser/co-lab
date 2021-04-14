(this["webpackJsonpco-lab"]=this["webpackJsonpco-lab"]||[]).push([[0],{108:function(e,t){},110:function(e,t){},123:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(65),i=n.n(o),u=(n(74),n(39)),a=n(69),s=n(4),l=n(1),j=Object(c.createContext)(),b=function(e){var t=e.children,n=Object(c.useState)(null),r=Object(s.a)(n,2),o=r[0],i=r[1],u=Object(c.useCallback)((function(){fetch("/api/authUser").then((function(e){return e.json()})).then((function(e){"ok"===e.code&&i(e.user)})).catch((function(e){console.log("not logged in")}))}),[]);return Object(c.useEffect)(u,[]),Object(l.jsx)(j.Provider,{value:{user:o,setUser:i},children:t})},d=(n(76),n(26)),f=n.n(d),O=Object(c.createContext)(),h=function(e){var t=e.children,n=Object(c.useContext)(j).user,r=n?f()("/",{query:{username:n.username}}):null,o=n?f()("/call",{query:{username:n.username}}):null;return Object(l.jsx)(O.Provider,{value:{onlineSocket:r,callSocket:o},children:t})},p=n(67),g=function(e){return fetch(e).then((function(e){return e.json()}))},m=function(){var e=Object(c.useContext)(O),t=e.onlineSocket,n=(e.callSocket,Object(c.useContext)(j).user),r=Object(c.useState)(null),o=Object(s.a)(r,2),i=o[0],u=o[1],a=Object(c.useState)([]),b=Object(s.a)(a,2),d=b[0],f=b[1],h=Object(p.a)("/api/contacts",g),m=(h.err,h.data);return Object(c.useEffect)((function(){"ok"===(null===m||void 0===m?void 0:m.code)&&u(m.contacts)}),[m]),Object(c.useEffect)((function(){t.on("members_online",(function(e){f(e)}))}),[t]),Object(l.jsxs)("div",{children:[Object(l.jsx)("p",{children:"Contacts"}),Object(l.jsx)("ul",{children:i?i.map((function(e,c){return Object(l.jsx)("li",{children:Object(l.jsxs)("p",{children:[e.name,d.includes(e.username)&&Object(l.jsxs)(l.Fragment,{children:[" ",Object(l.jsx)("span",{children:"\u2022"}),Object(l.jsx)("span",{onClick:function(){t.emit("new_call",{host:n.username,guests:[e.username]})},children:Object(l.jsx)("ion-icon",{name:"call-outline"})})," "]})]})},c)})):Object(l.jsx)("li",{children:"Loading"})})]})},x=n(2),v=n(68),C=n(36),w=n.n(C),S=function(e){var t=Object(c.useRef)();return Object(c.useEffect)((function(){e.peer.on("stream",(function(e){t.current.srcObject=e}))}),[]),Object(l.jsx)("video",{playsInline:!0,autoPlay:!0,ref:t})},y={height:window.innerHeight/2,width:window.innerWidth/2},k=function(e){var t=Object(c.useState)([]),n=Object(s.a)(t,2),r=n[0],o=n[1],i=Object(c.useRef)(),u=Object(c.useRef)(),a=Object(c.useRef)([]),j=e.match.params.roomID;return Object(c.useEffect)((function(){i.current=f.a.connect("/"),navigator.mediaDevices.getUserMedia({video:y,audio:!0}).then((function(e){u.current.srcObject=e,i.current.emit("join room",j),i.current.on("all users",(function(t){var n=[];t.forEach((function(t){var c=function(e,t,n){var c=new w.a({initiator:!0,trickle:!1,stream:n});return c.on("signal",(function(n){i.current.emit("sending signal",{userToSignal:e,callerID:t,signal:n})})),c}(t,i.current.id,e);a.current.push({peerID:t,peer:c}),n.push(c)})),o(n)})),i.current.on("user joined",(function(t){var n=function(e,t,n){var c=new w.a({initiator:!1,trickle:!1,stream:n});return c.on("signal",(function(e){i.current.emit("returning signal",{signal:e,callerID:t})})),c.signal(e),c}(t.signal,t.callerID,e);a.current.push({peerID:t.callerID,peer:n}),o((function(e){return[].concat(Object(v.a)(e),[n])}))})),i.current.on("receiving returned signal",(function(e){a.current.find((function(t){return t.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("video",{muted:!0,ref:u,autoPlay:!0,playsInline:!0}),r.map((function(e,t){return Object(l.jsx)(S,{peer:e},t)}))]})},D=n(125),I=function(){var e=Object(x.g)(),t=Object(c.useContext)(j).setUser,n=Object(c.useContext)(O),r=n.onlineSocket,o=n.callSocket;return Object(c.useEffect)((function(){return function(){return r.disconnect()}}),[]),Object(c.useEffect)((function(){o.on("call_request",(function(e){console.log(e,"is calling")}))}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Co-lab"}),Object(l.jsx)(m,{}),Object(l.jsx)("button",{onClick:function(){fetch("/api/logout").then((function(e){return e.json()})).then((function(n){var c=n.user;n.success&&(t(c),e.push("/login"))}))},children:"logout"}),Object(l.jsx)("button",{onClick:function(){e.push("/room/".concat(Object(D.a)()))},children:"Start room"}),Object(l.jsx)(x.b,{path:"/room/:roomID",component:k})]})},E=n(16),q=function(){var e,t=Object(x.g)(),n=Object(c.useContext)(j),r=n.user,o=n.setUser,i=Object(c.useState)(""),u=Object(s.a)(i,2),a=u[0],b=u[1],d=Object(c.useState)(""),f=Object(s.a)(d,2),O=f[0],h=f[1];return r?Object(l.jsx)(x.a,{to:(null===(e=t.location.state)||void 0===e?void 0:e.from.pathname)||"/"}):Object(l.jsxs)("div",{className:"container",children:[Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("/api/login",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({username:a,password:O})}).then((function(e){return e.json()})).then((function(e){var n,c=e.code,r=e.user;"ok"===c?(o(r),t.push((null===(n=t.location.state)||void 0===n?void 0:n.from.pathname)||"/")):alert("username/password did not match")})).catch((function(e){alert("something went wrong"),console.log(e)}))},children:[Object(l.jsx)("input",{onChange:function(e){return b(e.target.value)},value:a,type:"text",placeholder:"username",required:!0}),Object(l.jsx)("input",{onChange:function(e){return h(e.target.value)},value:O,type:"password",placeholder:"password",required:!0}),Object(l.jsx)("button",{type:"submit",children:"Login"})]}),Object(l.jsx)(E.b,{to:"/register",children:"Register"})]})},P=function(){var e=Object(x.g)(),t=Object(c.useContext)(j).setUser,n=Object(c.useState)(""),r=Object(s.a)(n,2),o=r[0],i=r[1],u=Object(c.useState)(""),a=Object(s.a)(u,2),b=a[0],d=a[1],f=Object(c.useState)(""),O=Object(s.a)(f,2),h=O[0],p=O[1],g=Object(c.useState)(""),m=Object(s.a)(g,2),v=m[0],C=m[1];return Object(l.jsxs)("div",{children:[Object(l.jsxs)("form",{onSubmit:function(n){n.preventDefault(),fetch("/api/register",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({name:o,username:b,email:h,pass:v})}).then((function(e){return e.json()})).then((function(n){var c=n.code,r=n.user,o=n.field;"ok"===c?(t(r),e.push("/")):11e3===c?alert("".concat(o," exists")):alert("something went wrong")})).catch((function(e){console.log(e),alert("something went wrong")}))},autoComplete:"off",children:[Object(l.jsx)("input",{onChange:function(e){return d(e.target.value)},value:b,type:"text",placeholder:"username",required:!0,autoComplete:"off"}),Object(l.jsx)("input",{onChange:function(e){return i(e.target.value)},value:o,type:"text",placeholder:"name",required:!0}),Object(l.jsx)("input",{onChange:function(e){return p(e.target.value)},value:h,type:"email",placeholder:"email",required:!0}),Object(l.jsx)("input",{onChange:function(e){return C(e.target.value)},value:v,type:"password",placeholder:"password",required:!0,autoComplete:"new-password"}),Object(l.jsx)("button",{type:"submit",children:"Register"})]}),Object(l.jsx)(E.b,{to:"/login",children:"Login"})]})};function L(){var e=.01*window.innerHeight;document.body.style.setProperty("--vh","".concat(e,"px"))}function R(e){var t=e.children,n=Object(a.a)(e,["children"]),r=Object(c.useContext)(j).user;return Object(l.jsx)(x.b,Object(u.a)(Object(u.a)({},n),{},{render:function(e){var n=e.location;return r?t:Object(l.jsx)(x.a,{to:{pathname:"/login",state:{from:n}}})}}))}var U=function(){return Object(c.useEffect)((function(){window.addEventListener("resize",(function(){return L()})),L()}),[]),Object(l.jsx)(E.a,{children:Object(l.jsxs)(x.d,{children:[Object(l.jsx)(x.b,{path:"/login",children:Object(l.jsx)(q,{})}),Object(l.jsx)(x.b,{path:"/register",children:Object(l.jsx)(P,{})}),Object(l.jsx)(R,{path:"/",children:Object(l.jsx)(I,{})})]})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,126)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),o(e),i(e)}))};i.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(b,{children:Object(l.jsx)(h,{children:Object(l.jsx)(U,{})})})}),document.getElementById("root")),F()},74:function(e,t,n){},76:function(e,t,n){}},[[123,1,2]]]);
//# sourceMappingURL=main.c03f1fdf.chunk.js.map