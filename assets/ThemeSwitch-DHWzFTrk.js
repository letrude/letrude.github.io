import{_ as z}from"./extends-CF3RwP-h.js";import{b as o}from"./react-vendor-B-TwoIBf.js";import{S as j,U as k,a as I,M as R,R as U,P as V,V as g,B,C as S,A as H,b as W}from"./three-core-Dw7HmUCS.js";import{e as N,u as _,m as C}from"./react-three-fiber.esm-CYxn8Aae.js";import{j as x}from"./index-DP9DRNoL.js";function O(e,r,t,c){var n;return n=class extends j{constructor(f){super({vertexShader:r,fragmentShader:t,...f});for(const i in e)this.uniforms[i]=new k(e[i]),Object.defineProperty(this,i,{get(){return this.uniforms[i].value},set(d){this.uniforms[i].value=d}});this.uniforms=I.clone(this.uniforms)}},n.key=R.generateUUID(),n}const $=()=>parseInt(U.replace(/\D+/g,"")),F=$(),D=O({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new S,sectionColor:new S,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new g,worldPlanePosition:new g},`
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
      #include <${F>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),Z=o.forwardRef(({args:e,cellColor:r="#000000",sectionColor:t="#2080ff",cellSize:c=.5,sectionSize:n=1,followCamera:f=!1,infiniteGrid:i=!1,fadeDistance:d=100,fadeStrength:m=1,fadeFrom:h=1,cellThickness:P=.5,sectionThickness:w=1,side:b=B,...l},p)=>{N({GridMaterial:D});const a=o.useRef(null);o.useImperativeHandle(p,()=>a.current,[]);const s=new V,v=new g(0,1,0),y=new g(0,0,0);_(T=>{s.setFromNormalAndCoplanarPoint(v,y).applyMatrix4(a.current.matrixWorld);const M=a.current.material,A=M.uniforms.worldCamProjPosition,G=M.uniforms.worldPlanePosition;s.projectPoint(T.camera.position,A.value),G.value.set(0,0,0).applyMatrix4(a.current.matrixWorld)});const u={cellSize:c,sectionSize:n,cellColor:r,sectionColor:t,cellThickness:P,sectionThickness:w},E={fadeDistance:d,fadeStrength:m,fadeFrom:h,infiniteGrid:i,followCamera:f};return o.createElement("mesh",z({ref:a,frustumCulled:!1},l),o.createElement("gridMaterial",z({transparent:!0,"extensions-derivatives":!0,side:b},u,E)),o.createElement("planeGeometry",{args:e}))});class L extends j{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${F>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const q=e=>new g().setFromSpherical(new W(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),ee=o.forwardRef(({radius:e=100,depth:r=50,count:t=5e3,saturation:c=0,factor:n=4,fade:f=!1,speed:i=1},d)=>{const m=o.useRef(null),[h,P,w]=o.useMemo(()=>{const l=[],p=[],a=Array.from({length:t},()=>(.5+.5*Math.random())*n),s=new S;let v=e+r;const y=r/t;for(let u=0;u<t;u++)v-=y*Math.random(),l.push(...q(v).toArray()),s.setHSL(u/t,c,.9),p.push(s.r,s.g,s.b);return[new Float32Array(l),new Float32Array(p),new Float32Array(a)]},[t,r,n,e,c]);_(l=>m.current&&(m.current.uniforms.time.value=l.clock.elapsedTime*i));const[b]=o.useState(()=>new L);return o.createElement("points",{ref:d},o.createElement("bufferGeometry",null,o.createElement("bufferAttribute",{attach:"attributes-position",args:[h,3]}),o.createElement("bufferAttribute",{attach:"attributes-color",args:[P,3]}),o.createElement("bufferAttribute",{attach:"attributes-size",args:[w,1]})),o.createElement("primitive",{ref:m,object:b,attach:"material",blending:H,"uniforms-fade-value":f,depthWrite:!1,transparent:!0,vertexColors:!0}))}),oe=({isDark:e,toggle:r,isMobile:t=!1})=>x.jsx("div",{onClick:r,style:t?{cursor:"pointer"}:{position:"absolute",top:"60px",right:"20px",zIndex:110,cursor:"pointer"},children:x.jsx(C.div,{layout:!0,whileHover:{scale:1.1,boxShadow:e?"0 0 15px rgba(255, 255, 255, 0.4)":"0 0 15px rgba(251, 191, 36, 0.6)"},whileTap:{scale:.9},transition:{type:"spring",stiffness:400,damping:17},style:{width:"70px",height:"36px",background:e?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.05)",borderRadius:"50px",display:"flex",alignItems:"center",padding:"4px",border:e?"1px solid rgba(255, 255, 255, 0.2)":"1px solid rgba(0, 0, 0, 0.1)",backdropFilter:"blur(10px)",justifyContent:e?"flex-end":"flex-start"},children:x.jsx(C.div,{layout:!0,transition:{type:"spring",stiffness:700,damping:30},style:{width:"28px",height:"28px",borderRadius:"50%",background:e?"linear-gradient(135deg, #4b5563, #1f2937)":"linear-gradient(135deg, #fbbf24, #d97706)",boxShadow:e?"0 2px 5px rgba(0,0,0,0.5)":"0 2px 5px rgba(217, 119, 6, 0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"},children:x.jsx(C.span,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{duration:.3},children:e?"🌙":"☀️"},e?"moon":"sun")})})});export{Z as G,ee as S,oe as T};
