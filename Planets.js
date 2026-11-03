(function(){
const TW=256,TH=128,TX={},RS={Terre:.6,Mars:.58,Jupiter:1.4,Saturne:1.3,"V\u00e9nus":-.08,Mercure:.05,Uranus:-.7,Neptune:.8},ATM={Terre:[40,110,220],"V\u00e9nus":[120,90,30],Neptune:[20,40,120]};
const Pg=[[-168,66,-140,70,-120,70,-95,72,-80,70,-62,60,-55,50,-66,44,-76,35,-81,25,-97,26,-97,20,-87,21,-83,10,-78,8,-86,14,-105,20,-117,32,-124,40,-124,48,-135,58,-150,60,-165,60],[-73,78,-60,82,-30,83,-20,75,-22,68,-43,60,-52,66,-58,75],[-78,8,-62,11,-50,0,-35,-6,-40,-22,-48,-28,-58,-38,-66,-46,-68,-55,-75,-50,-73,-37,-71,-18,-81,-6,-80,0],[-17,21,-10,32,10,37,32,31,34,28,43,12,51,12,40,-3,40,-15,35,-25,20,-35,12,-17,9,-1,9,4,-8,4,-17,14],[-9,37,-9,43,-2,47,3,51,8,54,8,57,11,58,6,62,15,69,30,71,45,68,70,73,100,77,140,72,170,70,180,65,165,60,156,51,142,53,138,45,129,40,126,36,122,40,121,31,115,22,108,21,106,10,100,13,103,1,98,8,93,19,88,22,80,15,77,8,73,18,67,24,57,25,56,27,48,30,50,26,56,24,59,22,52,16,43,13,35,28,32,31,35,36,27,37,26,41,22,37,19,41,13,45,17,40,12,38,8,44,3,43,-1,37],[114,-22,122,-18,130,-12,142,-11,146,-19,153,-26,150,-37,140,-38,130,-32,115,-34],[-5,50,2,51,0,54,-3,58,-6,56],[130,31,141,36,142,44,140,41,135,34],[44,-25,50,-15,49,-12,44,-17],[109,1,117,7,119,1,116,-3,110,-3],[95,5,104,-4,106,-6,98,0],[172,-34,178,-38,174,-41,168,-46,171,-42]];
function hs(a,b){const s=Math.sin(a*127.1+b*311.7)*43758.5453;return s-Math.floor(s)}
function vn(a,b,w){const ai=Math.floor(a),bi=Math.floor(b),af=a-ai,bf=b-bi,u=af*af*(3-2*af),v=bf*bf*(3-2*bf),m=q=>((q%w)+w)%w;const p=hs(m(ai),bi),q=hs(m(ai+1),bi),r=hs(m(ai),bi+1),s=hs(m(ai+1),bi+1);return p+(q-p)*u+(r-p)*v+(p-q-r+s)*u*v}
function fbm(a,b,o){let s=0,am=.5,f=1;for(let i=0;i<o;i++){s+=am*vn(a*f,b*f,8*f);f*=2;am*=.5}return s}
function inP(P,lo,la){let c=false;for(let i=0,j=P.length-2;i<P.length;j=i,i+=2){const xi=P[i],yi=P[i+1],xj=P[j],yj=P[j+1];if((yi>la)!==(yj>la)&&lo<(xj-xi)*(la-yi)/(yj-yi)+xi)c=!c}return c}
function earth(u,v,la){const lo=u/8*360-180,lt=la*57.2958,lo2=lo+(fbm(u*3,v*3,3)-.5)*16,lt2=lt+(fbm(u*3+9,v*3+4,3)-.5)*10;let land=false;for(const P of Pg)if(inP(P,lo2,lt2)){land=true;break}
const dry=fbm(u+9,v+3,3),n=fbm(u*2,v*2,4);let c;
if(lt2<-66||lt2>78)c=[238,244,250];else if(land)c=(Math.abs(lt)<28&&dry>.52)?[196,168,108]:(n>.6?[135,125,105]:(Math.abs(lt)>58?[150,165,140]:[58+n*60,112+n*40,52]));
else{const k=Math.min(1,Math.max(0,(.5-n)*4));c=[14+44*(1-k),52+96*(1-k),108+92*(1-k)]}
const cl=Math.max(0,Math.min(.8,(fbm(u*1.3+20,v*1.3+5,5)-.5)*3.2));return c.map(a=>a+(255-a)*cl)}
const hex=c=>{const n=parseInt(c.slice(1),16);return[n>>16,(n>>8)&255,n&255]};
function pix(N,u,v,la,b){const L=Math.abs(la);let n,c,k;switch(N){
case"Terre":return earth(u,v,la);
case"Mars":n=fbm(u*1.5,v*1.5,5);c=[150+n*80,72+n*45,42+n*20];if(fbm(u+5,v+7,3)>.56)c=[c[0]*.6,c[1]*.6,c[2]*.65];if(L>1.35)c=[245,245,245];return c;
case"Jupiter":case"Saturne":{const jp=N==="Jupiter",s=Math.sin(la*(jp?11:8)+fbm(u*.5,v*2,3)*(jp?4:1.5));c=s>.35?[238,222,195]:s>-.2?(jp?[205,150,105]:[222,200,145]):(jp?[165,100,70]:[190,160,105]);if(jp){const du=u-2.6,dl=la+.38;if(du*du/.35+dl*dl/.01<1)c=[196,82,52]}return c}
case"V\u00e9nus":n=fbm(u*.8,v*1.5,4);k=.8+.3*n+.08*Math.sin(la*6+n*7);return[236*k,200*k,130*k];
case"Mercure":n=fbm(u*3,v*3,5);k=95+n*90;if(fbm(u*6+2,v*6,2)>.66)k*=.7;return[k,k*.97,k*.92];
case"Uranus":k=.9+.1*Math.sin(la*7);return[140*k,222*k,228*k];
case"Neptune":n=fbm(u,v*3,4);return[50+n*60,80+n*70,215+n*40];
default:n=fbm(u*1.5,v*1.5,5);k=.65+.7*n;return[b[0]*k,b[1]*k,b[2]*k]}}
function mkTex(p){const d=new Uint8ClampedArray(TW*TH*4),b=hex(p.c);for(let j=0;j<TH;j++){const la=Math.PI*(.5-j/TH);for(let i=0;i<TW;i++){const c=pix(p.n,i/TW*8,j/TH*4,la,b),o=(j*TW+i)*4;d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255}}return d}
const sc=document.createElement("canvas"),sx=sc.getContext("2d");let im=null;
window.drawPlanet=function(p,cx,cy,r){const N=p.n;if(!TX[N])TX[N]=mkTex(p);const T=TX[N];
const S=Math.max(24,Math.min(180,Math.round(2*r*zoom*(dpr||1))));if(sc.width!==S){sc.width=S;sc.height=S;im=sx.createImageData(S,S)}
const d=im.data;d.fill(0);const an=Math.atan2(H/2-cy,W/2-cx),lx=Math.cos(an)*.75,ly=Math.sin(an)*.75,lz=.66,rot=t*(RS[N]||.3),at=ATM[N];
for(let y=0;y<S;y++){const ny=(y+.5)/S*2-1;for(let xx=0;xx<S;xx++){const nx=(xx+.5)/S*2-1,q=nx*nx+ny*ny;if(q>1)continue;
const z=Math.sqrt(1-q);let u=(Math.atan2(nx,z)-rot+Math.PI)/6.2832;u-=Math.floor(u);const la=Math.asin(-ny),ti=Math.min(TW-1,Math.floor(u*TW)),tj=Math.min(TH-1,Math.floor((.5-la/Math.PI)*TH)),k=(tj*TW+ti)*4;
let sh=Math.max(0,nx*lx+ny*ly+z*lz);sh=.07+.93*Math.pow(sh,.9)*(.6+.4*z);const o=(y*S+xx)*4;d[o]=T[k]*sh;d[o+1]=T[k+1]*sh;d[o+2]=T[k+2]*sh;d[o+3]=255;
if(at){const rim=Math.pow(1-z,3)*Math.min(1,sh*1.4);d[o]+=at[0]*rim;d[o+1]+=at[1]*rim;d[o+2]+=at[2]*rim}}}
sx.putImageData(im,0,0);x.save();x.shadowColor=p.c;x.shadowBlur=r*.9;x.fillStyle=p.c;x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.restore();x.drawImage(sc,cx-r,cy-r,2*r,2*r)};
const bar=document.querySelector(".controls"),bt=document.createElement("button");bar.style.flexWrap="wrap";bt.textContent="Voir la surface";bt.hidden=true;bt.onclick=()=>{location.href="surface.html"};bar.appendChild(bt);
setInterval(()=>{bt.hidden=!(sel&&sel.n==="Terre")},300);
})();
