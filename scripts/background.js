// 监听来自content script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'ADD_WEBSITE') {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let tab = tabs[0];
            let url = tab.url;

            // 读取当前的网站列表
            chrome.storage.sync.get('websites', function (result) {
                let websites = result.websites || {};
                // 添加新网站
                websites[url] = tab.favIconUrl;

                // 存储更新后的网站列表
                chrome.storage.sync.set({ websites: websites }, function () {
                    // 发送消息给content script
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'ADD_WEBSITE_RESPONSE',
                        url: url,
                        favicon: tab.favIconUrl
                    });
                });
            });
        });

        return true; // 异步响应
    }
});

// 监听来自content script的初始化消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'INIT') {
        // 获取网站列表
        chrome.storage.sync.get('websites', function (result) {
            let websites = result.websites || {};
            console.log(websites);
            // 发送网站列表给content script
            chrome.tabs.sendMessage(sender.tab.id, {
                type: 'INIT_RESPONSE',
                websites: websites
            });
        });
    }
});
