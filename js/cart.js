$(function () {
  // 先把本地存储的数据读取出来
  let arr = kits.loadData('cartListData');
  // 先定义一个变量存储要添加到页面上的结构字符串
  let html = '';
  // 然后遍历数组
  arr.forEach(e => {
    html += `<div class="item" data-id="${e.pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" checked="">
        </div>
        <div class="cell col-4">
          <img src="${e.imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${e.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${e.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl ">-</a>
          <input autocomplete="off" type="text" class="number fl" value="${e.number}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${e.price * e.number}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`;
  })
  // 添加到页面结构中
  $('.item-list').append(html);
  
  // 判断购物车中有没有商品
  if(arr.length!==0){
  // 如果有商品要把空空如也隐藏掉
    $('.empty-tip').hide();
    // 把表头显示
    $('.cart-header').show();
    // 把底部用于计算总件数和总价的div显示
    $('.total-of').show();
  }
})