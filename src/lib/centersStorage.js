export function saveCenters(list){
  try{ localStorage.setItem('prmi_centers_v1', JSON.stringify(list)); }
  catch(e){ console.error('saveCenters error', e); }
}
export function loadCenters(){
  try{ const s = localStorage.getItem('prmi_centers_v1'); return s?JSON.parse(s):[]; }
  catch(e){ return []; }
}
