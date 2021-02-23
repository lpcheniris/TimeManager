export const hexToRgb = (hex, opacity) => {
    //16进制转rgb()或rgba()字符串 
    let rgb = [];
    hex = hex.substr(1);
    //去除前缀 # 号 
    if (hex.length === 3) {
        // 处理 "#abc" 成 "#aabbcc" 
        hex = hex.replace(/(.)/g, '$1$1');
    }
    hex.replace(/../g, (color) => {
        rgb.push(parseInt(color, 0x10));
        //按16进制将字符串转换为数字 
    });
    if (!opacity) {
        return "rgb(" + rgb.join(",") + ")";
    }
    return "rgba(" + rgb.join(",") + "," + opacity + ")";
}

