// 监听来自background script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 如果消息是我们期待的类型
    if (request.type === 'ADD_WEBSITE_RESPONSE') {
        //添加到侧边栏
        addSidebarIcon(request);
    } else if (request.type === 'INIT_RESPONSE') {
        let websites = request.websites;
        for (let url in websites) {
            request.favicon = websites[url];
            request.url = url;
            //添加到侧边栏
            addSidebarIcon(request);
        }
    }
});
// 向background script发送初始化消息
chrome.runtime.sendMessage({ type: 'INIT' });

// chrome缓存改变监听，用于同步每个标签页
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'sync' && changes.websites) {
        let newWebsites = changes.websites.newValue;
        // 清空侧边栏
        let sidebar = document.getElementById('webList');
        while (sidebar.firstChild) {
            sidebar.removeChild(sidebar.firstChild);
        }
        // 重新初始化侧边栏
        for (let url in newWebsites) {
            let favicon = newWebsites[url];
            addSidebarIcon({
                url: url,
                favicon: favicon
            });
        }
    }
});