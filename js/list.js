// 根据data.js中的数据，创建商品列表
$(function () {
  // 准备一个字符串，用于把所有的商品结构以字符串的形式先表达出来
  let html = ``;
  // 遍历数组
  phoneData.forEach(e => {
    // 生成结构
    // 注意：进度条的长短是根据售出的百分比进行改变的，实际上是改变它的宽度，所以要把它的宽度修改成跟售出百分比一致
    html += `<li class="goods-list-item">
    <a href="detail.html?id=${e.pID}">
      <div class="item-img">
        <img src="${e.imgSrc}" alt="">
      </div>
      <div class="item-title">${e.name}</div>
      <div class="item-price">
        <span class="now">¥${e.price}</span>
      </div>
      <div class="sold">
        <span> 已售 <em>${e.percent}% </em></span>
        <div class="scroll">
          <div class="per" style="width:${e.percent}%"></div>
        </div>
        <span>剩余<i>${e.left}</i>件</span>
      </div>
    </a>
    <a href="#" class="buy">
      查看详情
    </a>
  </li>`;
  })
  // 然后放到ul中
  $('.goods-list > ul').append(html);
})