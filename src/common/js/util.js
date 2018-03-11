export function shuffle(arr){
    let _arr = arr.slice()
    for(let i=0; i<_arr.length;i++){
        let j = getRandom(0,i)

        let temp = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = temp
    }
    return _arr
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

//封装延迟执行
export function debounce(fn ,delay){
    let timer //undefined
    return function(...args){
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this,args) //this没用到 传null也可以
        },delay)
    }
}