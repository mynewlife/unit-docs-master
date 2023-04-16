export const gdMapKey = '42376168c31dc1784f17fc155462597e';
export const tdUrl=(t)=>`http://${t}.tianditu.gov.cn`;
export const mapUrl=tdUrl('api');
export const version="4.0";

function loadJS(value,src){
	return new Promise((resolve, reject) => {
		let type;
		if(value.includes('.')){
			type=window[value];
		}else{
			const arr = value.split('.');
			let wVal;
			type=true;
			for(let val of arr){
				if(!wVal){
					wVal=window[val];
				}else{
					wVal=wVal[val]
				}
				if(!wVal){
					type=false;
					break;
				}
			}
		}
		if (type) {
			resolve(true);
		} else {
			var script = document.createElement('script');
			script.type = "text/javascript";
			script.async = true;
			script.src = src;
			script.onload = function(e){
				resolve(true);
			};
			script.onerror = function(err){
				reject(false);
			};
			document.head.appendChild(script);
		}
	})
}

export function MapLoader() {
	return loadJS('T',mapUrl+"/api?v="+version+"&tk="+gdMapKey)
}

export function D3SvgOverlay() {
	return loadJS('T.D3Overlay',tdUrl('lbs')+"/api/js"+version+"/opensource/openlibrary/D3SvgOverlay.js")
}

export function CarTrack() {
	return loadJS('T.CarTrack',tdUrl('lbs')+"/api/js"+version+"/opensource/openlibrary/CarTrack.js")
}

export function GetD3() {
	return loadJS('d3','http://cdn.bootcss.com/d3/3.5.17/d3.js')
}