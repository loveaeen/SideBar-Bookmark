let url = window.location.href;
// 获取视口的宽度
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;

// 获取需要检查的区域宽度（左侧四分之一）
let checkWidth = viewportWidth / 4;

if (url.includes('twitch.tv')) {
    // Twitch的处理逻辑
    document.body.style.width = viewportWidth - "70" + "px";
} else if (url.includes('huya.com')) {
    // todo
}