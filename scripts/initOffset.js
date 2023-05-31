// 获取页面上的所有元素
let allElements = document.body.getElementsByTagName("*");

// 创建一个Map来存储每个元素的初始位置
let initialPositions = new Map();

// 遍历所有元素，记录初始位置
for (let element of allElements) {
  let rect = element.getBoundingClientRect();
  initialPositions.set(element, rect.left);
}


// 遍历所有元素
for (let element of allElements) {
  // 跳过部分元素
  if (filterAllParents(element)) continue;

  // 获取元素的位置信息
  let rect = element.getBoundingClientRect();

  // 判断元素是否在需要检查的区域内
  if (rect.left < checkWidth) {
    // 检查元素的当前位置是否与初始位置一致
    let initialPosition = initialPositions.get(element);
    if (rect.left === initialPosition) {
      // 给元素添加 margin-left 样式
      element.style.marginLeft = "70px";
    }
  }
}

function filterAllParents(element) {
  let parent = element.parentElement;

  while (parent) {
    if(window.getComputedStyle(parent).getPropertyValue("display") === "none" || window.getComputedStyle(element).getPropertyValue("display") === "none"){
      // 一些初始被隐藏的元素，如ul下的li，这些元素不再需要加入样式调整偏移量
      return true;
    }else if (element.tagName === "YTD-VIDEO-PREVIEW" || parent.tagName === "YTD-VIDEO-PREVIEW") {
      // Youtube 网站偏好
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}