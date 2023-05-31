// 创建侧边栏元素
let sidebarElement = document.createElement('div');
sidebarElement.id = 'mySidebar';
sidebarElement.innerHTML = `
    <div class="sidebar-icon" id="addIcon">＋</div>
    <hr class="sidebar-divider">
    <ul id="webList"></ul>
  `;

// 将侧边栏元素插入到主体
document.body.parentNode.insertBefore(sidebarElement, document.body)