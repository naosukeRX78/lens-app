(function(root){
 const DAY=86400000;
 function day(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw Error('Invalid date');const n=Date.parse(s+'T00:00:00Z');if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,10)!==s)throw Error('Invalid date');return n/DAY}
 function add(s,n){return new Date((day(s)+n)*DAY).toISOString().slice(0,10)}
 function today(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
 function status(open,now=today()){const elapsed=day(now)-day(open);if(elapsed<0)throw Error('Future date');return{due:add(open,14),remaining:14-elapsed,elapsed}}
 function valid(s,now=today()){try{return day(s)>=day('2000-01-01')&&day(s)<=day(now)}catch{return false}}
 const api={day,add,today,status,valid};if(typeof module!=='undefined')module.exports=api;else root.LensDates=api;
})(globalThis);
