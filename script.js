const defs=[
{name:"Detail zoom",value:1,min:0,max:2},{name:"Aperture grill",value:0,min:0,max:1},{name:"Interlacing",value:0,min:0,max:1},{name:"Line sync",value:.1,min:0,max:1},{name:"Vertical sync",value:1,min:0,max:2},{name:"Scan phasing",value:0,min:0,max:1},{name:"Phosphorescence",value:0,min:0,max:1},{name:"Static",value:.096,min:0,max:1}
];
const root=document.getElementById("controls");
defs.forEach((d,i)=>{const w=document.createElement("div"),l=document.createElement("label"),t=document.createElement("div"),r=document.createElement("input"),n=document.createElement("input");w.className="param";l.htmlFor="n"+i;l.textContent=d.name+":";t.className="track";r.type="range";r.id="s"+i;r.min=d.min;r.max=d.max;r.step=.001;r.value=d.value;n.type="number";n.id="n"+i;n.step=.0001;n.value=Number(d.value).toFixed(4);n.setAttribute("aria-label",d.name+" value");r.addEventListener("input",()=>n.value=Number(r.value).toFixed(4));n.addEventListener("input",()=>{if(n.value!==""&&Number.isFinite(Number(n.value)))r.value=n.value});t.append(r);w.append(l,t,n);root.append(w)});
function apply(v,name){v.forEach((x,i)=>{document.getElementById("s"+i).value=x;document.getElementById("n"+i).value=Number(x).toFixed(4)});document.getElementById("presetName").value=name}
document.getElementById("tvLook").onclick=()=>apply([1,.316,.660,1,1,.15,.9,0],"TV Look");
document.getElementById("badSync").onclick=()=>apply([1,0,0,.1,1,0,0,.096],"Bad Sync");
document.getElementById("reset").onclick=()=>apply(defs.map(d=>d.value),"My TV Simulator Preset");
const aboutInfo=document.getElementById("about-info"),aboutBtn=document.getElementById("aboutBtn");
function setAboutOpen(open){aboutInfo.hidden=!open;aboutBtn.setAttribute("aria-expanded",String(open));if(open)aboutInfo.scrollIntoView({behavior:"smooth",block:"nearest"});}
aboutBtn.addEventListener("click",()=>setAboutOpen(aboutInfo.hidden));
document.getElementById("closeAbout").addEventListener("click",()=>{setAboutOpen(false);aboutBtn.focus();});
let importedReg=null;const status=document.getElementById("status"),fileInput=document.getElementById("regFile");
document.getElementById("importReg").addEventListener("click",()=>fileInput.click());
fileInput.addEventListener("change",async()=>{
 const file=fileInput.files && fileInput.files[0]; if(!file)return;
 try{
  let text=await file.text(); if(text.includes("\u0000"))text=text.replace(/\u0000/g,"");
  if(!/Windows Registry Editor Version 5\.00|REGEDIT4/i.test(text))throw Error("This does not look like a .reg export.");
  const candidate=text.split(/\r?\n(?=\s*\[)/).find(b=>/\[HKEY_CURRENT_USER\\Software\\DXTransform\\Presets\\\{[^}]+\}\]/i.test(b)&&/=\s*hex:/i.test(b));
  if(!candidate)throw Error("No DXTransform preset key with binary hex data was found. Export the specific preset from Registry Editor.");
  const keyMatch=candidate.match(/^\s*(\[[^\]]+\])/m);
  const valueMatch=candidate.match(/^\s*"((?:[^"\\]|\\.)*)"\s*=\s*hex:([\s\S]*?)(?=\r?\n\s*\r?\n|\r?\n\s*\[|$)/mi);
  if(!keyMatch||!valueMatch)throw Error("Could not parse preset key and binary value.");
  importedReg={key:keyMatch[1],oldName:valueMatch[1],hex:valueMatch[2].replace(/\\\s*\r?\n\s*/g,"").replace(/\s/g,"")};
  document.getElementById("presetName").value=importedReg.oldName;
  status.textContent=`Loaded "${importedReg.oldName}". Export preserves the binary data; slider edits do not alter it.`;
 }catch(e){importedReg=null;status.textContent="Could not load preset: "+e.message;}
});
document.getElementById("download").onclick=()=>{
 if(!importedReg){status.textContent="Load a genuine VEGAS .reg preset first. Without one, this page cannot create a valid VEGAS binary preset.";return;}
 const name=(document.getElementById("presetName").value.trim()||"TV Simulator Preset").replace(/[\r\n"]/g,"_");
 const hex=importedReg.hex.match(/[0-9a-fA-F]{2}/g)||[];let rows=[];
 for(let i=0;i<hex.length;i+=16)rows.push("  "+hex.slice(i,i+16).join(","));
 const reg="Windows Registry Editor Version 5.00\r\n\r\n"+importedReg.key+"\r\n\""+name+"\"=hex:"+rows.join(",\\\r\n")+"\r\n";
 const blob=new Blob(["\uFEFF",reg],{type:"application/registry"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download=name.replace(/[\\/:*?<>|]+/g,"_").replace(/\s+/g,"_")+".reg";document.body.append(a);a.click();const fname=a.download;a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 status.textContent=`Exported ${fname} with the imported binary data. This duplicates/renames the source preset; slider values are not applied. Back up the registry before importing.`;
};
