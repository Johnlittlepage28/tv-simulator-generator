
const defs=[
{name:"Detail zoom",value:1,min:0,max:2},{name:"Aperture grill",value:0,min:0,max:1},{name:"Interlacing",value:0,min:0,max:1},{name:"Line sync",value:.1,min:0,max:1},{name:"Vertical sync",value:1,min:0,max:2},{name:"Scan phasing",value:0,min:0,max:1},{name:"Phosphorescence",value:0,min:0,max:1},{name:"Static",value:.096,min:0,max:1}
];
const root=document.getElementById("controls");
defs.forEach((d,i)=>{let w=document.createElement("div"),l=document.createElement("label"),t=document.createElement("div"),r=document.createElement("input"),n=document.createElement("input");w.className="param";l.htmlFor="n"+i;l.textContent=d.name+":";t.className="track";r.type="range";r.id="s"+i;r.min=d.min;r.max=d.max;r.step=.001;r.value=d.value;n.type="number";n.id="n"+i;n.step=.0001;n.value=Number(d.value).toFixed(4);n.setAttribute("aria-label",d.name+" value");r.addEventListener("input",()=>n.value=Number(r.value).toFixed(4));n.addEventListener("input",()=>{if(n.value!==""&&Number.isFinite(Number(n.value)))r.value=n.value});t.append(r);w.append(l,t,n);root.append(w)});
function apply(v,name){v.forEach((x,i)=>{document.getElementById("s"+i).value=x;document.getElementById("n"+i).value=Number(x).toFixed(4)});document.getElementById("presetName").value=name}
document.getElementById("tvLook").onclick=()=>apply([1,.316,.660,1,1,.15,.9,0],"TV Look");
document.getElementById("badSync").onclick=()=>apply([1,0,0,.1,1,0,0,.096],"Bad Sync");
document.getElementById("reset").onclick=()=>apply(defs.map(d=>d.value),"My TV Simulator Preset");
const aboutInfo=document.getElementById("about-info");
const aboutBtn=document.getElementById("aboutBtn");
function setAboutOpen(open){aboutInfo.hidden=!open;aboutBtn.setAttribute("aria-expanded",String(open));if(open)aboutInfo.scrollIntoView({behavior:"smooth",block:"nearest"});}
aboutBtn.addEventListener("click",()=>setAboutOpen(aboutInfo.hidden));
document.getElementById("closeAbout").addEventListener("click",()=>{setAboutOpen(false);aboutBtn.focus();});
document.getElementById("download").onclick=()=>{let name=(document.getElementById("presetName").value.trim()||"TV_Simulator_Preset").replace(/[\\/:*?"<>|]+/g,"_");let lines=["Windows Registry Editor Version 5.00","","; TV Simulator settings summary","; Preset name: "+name,...defs.map((d,i)=>"; "+d.name+"="+document.getElementById("n"+i).value),"; Not an importable VEGAS preset: the real DirectX binary preset data is required."];let blob=new Blob([lines.join("\r\n")+"\r\n"],{type:"application/registry"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name.replace(/\s+/g,"_")+".reg";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);document.getElementById("status").textContent="Downloaded "+a.download+" — settings summary only, not a verified VEGAS preset."};

