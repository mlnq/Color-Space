//color div
const colorContainer = document.getElementById('colorContainer');

//COLOR FUNCTIONS
var cmyk2rgb = function(c_, m_, y_, k_,normalized){
    let c = (c_ / 100);
    let m = (m_ / 100);
    let y = (y_ / 100);
    let k = (k_ / 100);
    
    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;
    
    var r = 1 - c;
    var g = 1 - m;
    var b = 1 - y;
    
    if(!normalized){
        r = Math.round(255 * r);
        g = Math.round(255 * g);
        b = Math.round(255 * b);
    }
    
    return {
        r: r,
        g: g,
        b: b
    }
}
var rgb2cmyk = function(r, g, b, normalized){
        var c = 1 - (r / 255);
        var m = 1 - (g / 255);
        var y = 1 - (b / 255);
        var k = Math.min(c, Math.min(m, y));
        
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
        
        if(!normalized){
            c = Math.round(c * 10000 / 100);
            m = Math.round(m * 10000 / 100);
            y = Math.round(y * 10000 / 100);
            k = Math.round(k * 10000 / 100);
        }
        
        c = isNaN(c) ? 0 : c;
        m = isNaN(m) ? 0 : m;
        y = isNaN(y) ? 0 : y;
        k = isNaN(k) ? 0 : k;
        
        return {
            c: c,
            m: m,
            y: y,
            k: k
        }
    }

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

let hexVal= document.querySelector('#hash');
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

function setCMYK(c,m,y,k)
{
    let cmykVal=cmyk2rgb(c||0,m||0,y||0,k||0);
    let rgbColor=`rgb(${cmykVal.r},${cmykVal.g},${cmykVal.b})`
    colorContainer.style.backgroundColor = rgbColor;
    hexVal.innerHTML = RGBToHex(rgbColor); 
    hexVal.style.color=invertColor(RGBToHex(rgbColor),true);
}
function setRBG(r,g,b){
    let rgbColor=`rgb(${r},${g},${b})`
    colorContainer.style.backgroundColor = rgbColor;
    hexVal.innerHTML = RGBToHex(rgbColor); 
    hexVal.style.color=invertColor(RGBToHex(rgbColor),true);
}



//SLIDERS
let sliderCMYK = document.querySelectorAll('#sliderCMYK');
let sliderCMYKLog = document.querySelectorAll('#sliderLogCMYK');

sliderCMYK = [...sliderCMYK];
sliderCMYKLog = [...sliderCMYKLog];
sliderCMYKLog.forEach(
    sl=>
    {
        console.log(sl.dataset.color)
        sl.addEventListener('keyup',updateValCMYKinput)
    }
);
sliderCMYK.forEach(
    s=>s.addEventListener('change',updateValCMYK)
);

function updateValCMYKinput(e){
    if (true) {
        
    if(e.target.dataset.color=="C")
    sliderCMYK[0].value = e.target.value;
    if(e.target.dataset.color=="M")
    sliderCMYK[1].value = e.target.value;
    if(e.target.dataset.color=="Y")
    sliderCMYK[2].value = e.target.value;
    if(e.target.dataset.color=="K")
    sliderCMYK[3].value = e.target.value;
    
    
    setCMYK(
        sliderCMYK[0].value,
        sliderCMYK[1].value,
        sliderCMYK[2].value,
        sliderCMYK[3].value,
        );

    setRGBinputFromCMYKinput(
            sliderCMYK[0].value,
            sliderCMYK[1].value,
            sliderCMYK[2].value,
            sliderCMYK[3].value,
            );
      
    
    }

}

function updateValCMYK(e){
    if(e.target.dataset.color=="C")
    sliderCMYKLog[0].value = e.target.value;
    if(e.target.dataset.color=="M")
    sliderCMYKLog[1].value = e.target.value;
    if(e.target.dataset.color=="Y")
    sliderCMYKLog[2].value = e.target.value;
    if(e.target.dataset.color=="K")
    sliderCMYKLog[3].value = e.target.value;
    
    setCMYK(
        sliderCMYK[0].value,
        sliderCMYK[1].value,
        sliderCMYK[2].value,
        sliderCMYK[3].value,
        );
    setRGBinputFromCMYKinput(
        sliderCMYK[0].value,
        sliderCMYK[1].value,
        sliderCMYK[2].value,
        sliderCMYK[3].value,
        );
       
}



let sliderRGB = document.querySelectorAll('#sliderRGB');
let sliderRGBLog = document.querySelectorAll('#sliderLogRGB');

sliderRGB = [...sliderRGB];
sliderRGBLog = [...sliderRGBLog];

sliderRGBLog.forEach(
    sl=>
    {
        console.log(sl.dataset.color)
        sl.addEventListener('keyup',updateValRGBinput)
    }
);
sliderRGB.forEach(
    s=>s.addEventListener('change',updateValRGB)
);

function updateValRGBinput(e){

    if (true) {
        
    if(e.target.dataset.color=="R")
    sliderRGB[0].value = e.target.value;
    if(e.target.dataset.color=="G")
    sliderRGB[1].value = e.target.value;
    if(e.target.dataset.color=="B")
    sliderRGB[2].value = e.target.value;

    setRBG(sliderRGB[0].value,
        sliderRGB[1].value, 
        sliderRGB[2].value,
        );

    setCMYKinputFromRGBinput(
        sliderRGB[0].value,
        sliderRGB[1].value, 
        sliderRGB[2].value)
}
}


function updateValRGB(e){



    if(e.target.dataset.color=="R")
    sliderRGBLog[0].value = e.target.value;
    if(e.target.dataset.color=="G")
    sliderRGBLog[1].value = e.target.value;
    if(e.target.dataset.color=="B")
    sliderRGBLog[2].value = e.target.value;

    setRBG(sliderRGB[0].value,
        sliderRGB[1].value, 
        sliderRGB[2].value,
        );
    setCMYKinputFromRGBinput(
        sliderRGB[0].value,
        sliderRGB[1].value, 
        sliderRGB[2].value)
}

function setCMYKinputFromRGBinput(r,g,b)
{
let cmyk=rgb2cmyk(r,g,b,false);

sliderCMYK[0].value = cmyk.c;
sliderCMYK[1].value = cmyk.m;
sliderCMYK[2].value = cmyk.y;
sliderCMYK[3].value = cmyk.k;

sliderCMYKLog[0].value = cmyk.c;
sliderCMYKLog[1].value = cmyk.m;
sliderCMYKLog[2].value = cmyk.y;
sliderCMYKLog[3].value = cmyk.k;
}
function setRGBinputFromCMYKinput(c,m,y,k)
{
let rgb=cmyk2rgb(c||0,m||0,y||0,k||0);
console.log(rgb);

sliderRGB[0].value = rgb.r;
sliderRGB[1].value = rgb.g;
sliderRGB[2].value = rgb.b;

sliderRGBLog[0].value = rgb.r;
sliderRGBLog[1].value = rgb.g;
sliderRGBLog[2].value = rgb.b;
}