// 当点击"新增"图标时
document.getElementById('addIcon').onclick = function () {
    // 发送消息给background script
    chrome.runtime.sendMessage({ type: 'ADD_WEBSITE', url: window.location.href });
};

// 创建并添加侧边栏图标
function addSidebarIcon(request) {
    // 检查该网站是否已经存在于侧边栏中
    if (document.getElementById(request.url)) {
        return; // 如果已经存在，直接返回
    }
    // 添加到侧边栏
    let listItem = document.createElement('li');
    let newIcon = document.createElement('img');
    newIcon.src = request.favicon;
    newIcon.className = 'website-icon sidebar-icon';
    newIcon.alt = request.url;
    newIcon.draggable = true; // 让图标可以被拖拽
    newIcon.ondragend = onDragEnd; // 将 onDragEnd 方法添加到拖放事件监听器中
    newIcon.id = request.url; // 使用网站的URL作为ID

    // 添加拖拽相关的事件处理函数
    newIcon.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', this.id);
    });

    newIcon.onclick = function () {
        window.open(this.id);
    }
    listItem.appendChild(newIcon);
    document.getElementById('webList').appendChild(listItem);
}

// 在document对象上添加一些事件处理函数来处理拖拽结束的情况
document.addEventListener('dragover', function (event) {
    event.preventDefault();
});

// 鼠标拖拽事件移除元素
function onDragEnd(event) {
    let sidebarRect = document.getElementById('mySidebar').getBoundingClientRect();
    let isInSidebar = event.clientX >= sidebarRect.left && event.clientX <= sidebarRect.right && event.clientY >= sidebarRect.top && event.clientY <= sidebarRect.bottom;

    // 如果鼠标拖拽结束时，不在侧边栏内，才进行删除操作
    if (!isInSidebar) {
        let url = event.target.id;

        // 从存储中删除该网站
        chrome.storage.sync.get('websites', function (result) {
            let websites = result.websites || {};
            delete websites[url];
            chrome.storage.sync.set({ websites: websites }, function () {
                // 删除侧边栏上的图标
                event.target.remove();
            });
        });
    }
}