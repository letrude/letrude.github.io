import{c as J,r,s as K,_ as T}from"./vendor-core-Dd8loSBg.js";import{D as C,u as P,T as Q,p as Z,S as I,U as ee,a as te,M as $,b as w,c as R,d as D,R as re,W as oe,H as ne,L as G,e as ae,F as ie,f as E,g as se,P as ce,V as b,B as le,C as _,O,A as ue,h as fe,i as me}from"./vendor-three-core-Be6rz_8P.js";import{G as j,D as de,M as F}from"./vendor-three-stdlib-BvhSRzvf.js";const ge="modulepreload",pe=function(e){return"/"+e},U={},Se=function(n,o,t){let l=Promise.resolve();if(o&&o.length>0){let u=function(c){return Promise.all(c.map(g=>Promise.resolve(g).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");l=u(o.map(c=>{if(c=pe(c),c in U)return;U[c]=!0;const g=c.endsWith(".css"),p=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const m=document.createElement("link");if(m.rel=g?"stylesheet":ge,g||(m.as="script"),m.crossOrigin="",m.href=c,s&&m.setAttribute("nonce",s),document.head.appendChild(m),g)return new Promise((d,v)=>{m.addEventListener("load",d),m.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function a(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return l.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return n().catch(a)})};let x=0;const Te=J(e=>(C.onStart=(n,o,t)=>{e({active:!0,item:n,loaded:o,total:t,progress:(o-x)/(t-x)*100})},C.onLoad=()=>{e({active:!1})},C.onError=n=>e(o=>({errors:[...o.errors,n]})),C.onProgress=(n,o,t)=>{o===t&&(x=t),e({active:!0,item:n,loaded:o,total:t,progress:(o-x)/(t-x)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0})),ze=r.forwardRef(({sdfGlyphSize:e=64,anchorX:n="center",anchorY:o="middle",font:t,fontSize:l=1,children:a,characters:i,onSync:s,...u},c)=>{const g=P(({invalidate:v})=>v),[p]=r.useState(()=>new Q),[m,d]=r.useMemo(()=>{const v=[];let h="";return r.Children.forEach(a,f=>{typeof f=="string"||typeof f=="number"?h+=f:v.push(f)}),[v,h]},[a]);return K(()=>new Promise(v=>Z({font:t,characters:i},v)),["troika-text",t,i]),r.useLayoutEffect(()=>void p.sync(()=>{g(),s&&s(p)})),r.useEffect(()=>()=>p.dispose(),[p]),r.createElement("primitive",T({object:p,ref:c,font:t,text:d,anchorX:n,anchorY:o,fontSize:l,sdfGlyphSize:e},u),m)});function ve(e,n,o,t){var l;return l=class extends I{constructor(a){super({vertexShader:n,fragmentShader:o,...a});for(const i in e)this.uniforms[i]=new ee(e[i]),Object.defineProperty(this,i,{get(){return this.uniforms[i].value},set(s){this.uniforms[i].value=s}});this.uniforms=te.clone(this.uniforms)}},l.key=$.generateUUID(),l}const A=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!="function";function B(e,n){const o=P(a=>a.gl),t=w(R,A(e)?Object.values(e):e);return r.useLayoutEffect(()=>{n?.(t)},[n]),r.useEffect(()=>{if("initTexture"in o){let a=[];Array.isArray(t)?a=t:t instanceof D?a=[t]:A(t)&&(a=Object.values(t)),a.forEach(i=>{i instanceof D&&o.initTexture(i)})}},[o,t]),r.useMemo(()=>{if(A(e)){const a={};let i=0;for(const s in e)a[s]=t[i++];return a}else return t},[e,t])}B.preload=e=>w.preload(R,e);B.clear=e=>w.clear(R,e);const he=()=>parseInt(re.replace(/\D+/g,"")),V=he();let S=null,H="https://www.gstatic.com/draco/versioned/decoders/1.5.5/";function W(e=!0,n=!0,o){return t=>{o&&o(t),e&&(S||(S=new de),S.setDecoderPath(typeof e=="string"?e:H),t.setDRACOLoader(S)),n&&t.setMeshoptDecoder(typeof F=="function"?F():F)}}const k=(e,n,o,t)=>w(j,e,W(n,o,t));k.preload=(e,n,o,t)=>w.preload(j,e,W(n,o,t));k.clear=e=>w.clear(j,e);k.setDecoderPath=e=>{H=e};function Pe(e,n,o){const t=P(d=>d.size),l=P(d=>d.viewport),a=typeof e=="number"?e:t.width*l.dpr,i=t.height*l.dpr,s=(typeof e=="number"?o:e)||{},{samples:u=0,depth:c,...g}=s,p=c??s.depthBuffer,m=r.useMemo(()=>{const d=new oe(a,i,{minFilter:G,magFilter:G,type:ne,...g});return p&&(d.depthTexture=new ae(a,i,ie)),d.samples=u,d},[]);return r.useLayoutEffect(()=>{m.setSize(a,i),u&&(m.samples=u)},[u,m,a,i]),r.useEffect(()=>()=>m.dispose(),[]),m}const we=e=>typeof e=="function",Fe=r.forwardRef(({envMap:e,resolution:n=256,frames:o=1/0,children:t,makeDefault:l,...a},i)=>{const s=P(({set:f})=>f),u=P(({camera:f})=>f),c=P(({size:f})=>f),g=r.useRef(null);r.useImperativeHandle(i,()=>g.current,[]);const p=r.useRef(null),m=Pe(n);r.useLayoutEffect(()=>{a.manual||g.current.updateProjectionMatrix()},[c,a]),r.useLayoutEffect(()=>{g.current.updateProjectionMatrix()}),r.useLayoutEffect(()=>{if(l){const f=u;return s(()=>({camera:g.current})),()=>s(()=>({camera:f}))}},[g,l,s]);let d=0,v=null;const h=we(t);return E(f=>{h&&(o===1/0||d<o)&&(p.current.visible=!1,f.gl.setRenderTarget(m),v=f.scene.background,e&&(f.scene.background=e),f.gl.render(f.scene,g.current),f.scene.background=v,f.gl.setRenderTarget(null),p.current.visible=!0,d++)}),r.createElement(r.Fragment,null,r.createElement("orthographicCamera",T({left:c.width/-2,right:c.width/2,top:c.height/2,bottom:c.height/-2,ref:g},a),!h&&t),r.createElement("group",{ref:p},h&&t(m.texture)))}),ye=ve({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new _,sectionColor:new _,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new b,worldPlanePosition:new b},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${V>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),Ae=r.forwardRef(({args:e,cellColor:n="#000000",sectionColor:o="#2080ff",cellSize:t=.5,sectionSize:l=1,followCamera:a=!1,infiniteGrid:i=!1,fadeDistance:s=100,fadeStrength:u=1,fadeFrom:c=1,cellThickness:g=.5,sectionThickness:p=1,side:m=le,...d},v)=>{se({GridMaterial:ye});const h=r.useRef(null);r.useImperativeHandle(v,()=>h.current,[]);const f=new ce,M=new b(0,1,0),z=new b(0,0,0);E(q=>{f.setFromNormalAndCoplanarPoint(M,z).applyMatrix4(h.current.matrixWorld);const L=h.current.material,X=L.uniforms.worldCamProjPosition,Y=L.uniforms.worldPlanePosition;f.projectPoint(q.camera.position,X.value),Y.value.set(0,0,0).applyMatrix4(h.current.matrixWorld)});const y={cellSize:t,sectionSize:l,cellColor:n,sectionColor:o,cellThickness:g,sectionThickness:p},N={fadeDistance:s,fadeStrength:u,fadeFrom:c,infiniteGrid:i,followCamera:a};return r.createElement("mesh",T({ref:h,frustumCulled:!1},d),r.createElement("gridMaterial",T({transparent:!0,"extensions-derivatives":!0,side:m},y,N)),r.createElement("planeGeometry",{args:e}))});function _e(e,n){const o=r.useRef(null),[t]=r.useState(()=>n?n instanceof O?{current:n}:n:o),[l]=r.useState(()=>new ue(void 0));r.useLayoutEffect(()=>{n&&(t.current=n instanceof O?n:n.current),l._root=t.current});const a=r.useRef({}),i=r.useMemo(()=>{const s={};return e.forEach(u=>Object.defineProperty(s,u.name,{enumerable:!0,get(){if(t.current)return a.current[u.name]||(a.current[u.name]=l.clipAction(u,t.current))},configurable:!0})),{ref:t,clips:e,actions:s,names:e.map(u=>u.name),mixer:l}},[e]);return E((s,u)=>l.update(u)),r.useEffect(()=>{const s=t.current;return()=>{a.current={},l.stopAllAction(),Object.values(i.actions).forEach(u=>{s&&l.uncacheAction(u,s)})}},[e]),i}const Re=r.forwardRef(({children:e,enabled:n=!0,speed:o=1,rotationIntensity:t=1,floatIntensity:l=1,floatingRange:a=[-.1,.1],autoInvalidate:i=!1,...s},u)=>{const c=r.useRef(null);r.useImperativeHandle(u,()=>c.current,[]);const g=r.useRef(Math.random()*1e4);return E(p=>{var m,d;if(!n||o===0)return;i&&p.invalidate();const v=g.current+p.clock.elapsedTime;c.current.rotation.x=Math.cos(v/4*o)/8*t,c.current.rotation.y=Math.sin(v/4*o)/8*t,c.current.rotation.z=Math.sin(v/4*o)/20*t;let h=Math.sin(v/4*o)/10;h=$.mapLinear(h,-.1,.1,(m=a?.[0])!==null&&m!==void 0?m:-.1,(d=a?.[1])!==null&&d!==void 0?d:.1),c.current.position.y=h*l,c.current.updateMatrix()}),r.createElement("group",s,r.createElement("group",{ref:c,matrixAutoUpdate:!1},e))});class xe extends I{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${V>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const be=e=>new b().setFromSpherical(new me(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),je=r.forwardRef(({radius:e=100,depth:n=50,count:o=5e3,saturation:t=0,factor:l=4,fade:a=!1,speed:i=1},s)=>{const u=r.useRef(null),[c,g,p]=r.useMemo(()=>{const d=[],v=[],h=Array.from({length:o},()=>(.5+.5*Math.random())*l),f=new _;let M=e+n;const z=n/o;for(let y=0;y<o;y++)M-=z*Math.random(),d.push(...be(M).toArray()),f.setHSL(y/o,t,.9),v.push(f.r,f.g,f.b);return[new Float32Array(d),new Float32Array(v),new Float32Array(h)]},[o,n,l,e,t]);E(d=>u.current&&(u.current.uniforms.time.value=d.clock.elapsedTime*i));const[m]=r.useState(()=>new xe);return r.createElement("points",{ref:s},r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[c,3]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[g,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[p,1]})),r.createElement("primitive",{ref:u,object:m,attach:"material",blending:fe,"uniforms-fade-value":a,depthWrite:!1,transparent:!0,vertexColors:!0}))});export{Re as F,Ae as G,Fe as O,je as S,ze as T,Se as _,B as a,k as b,_e as c,Te as u};
