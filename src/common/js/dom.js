export function addClass(el,className){
    if(!hasClass(el,className)){
        let classArr = el.className.split(' ');
        classArr.push(className);
        el.className = classArr.join(' ');
    }
}

export function hasClass(el,className){
    let reg = new RegExp('(^|\\s)'+className+'(\\s|)');
    return reg.test(el.className)
}

export function getData(el,name,val){
    if(val){
        return el.setAttribute(name,val)
    }else{
        return el.getAttribute(name)
    }
}

let elementStyle = document.createElement('div').style
let vendor = (()=>{
    let transformNames = {
        webkit:'webkitTransform',
        Moz:'MozTransform',
        ms:'msTransform',
        O:'OTransform',
        standard:'transform'
    }
    for(let key in transformNames){
        if(elementStyle[transformNames[key]] !== undefined){
            return key
        }
    }
    return false
})()

export function prefixStyle(style){
    if (vendor === false) {
        return false;
    }else if (vendor === 'standard') {
        return style
    }else{
        return vendor + style.charAt(0).toUpperCase() + style.slice(1)
    }
}