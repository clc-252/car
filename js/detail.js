$(function () {
  // 先获取到点击商品时的id
  // 发现点击商品时跳转页面的网址中？id=XXX 我们可以通过location的search得到，然后再截取我们需要id值
  let id = location.search.substring(4);
  // console.log(id);
  // 然后把数据中的id取出来
  // phoneData.forEach(e => {
  //   // 判断取出来的id跟获取到的id是否相同
  //   if (e.pID == id) {
  //     console.log(e);
  //     // 可以得到我们点击的那个商品的所有数据
  //   }
  // })

  // 另一种获得点击的那个商品数据的方法
  // 获取指定条件的元素
  let target = phoneData.find(e => {
    // 返回符合条件的元素
    return e.pID == id;
  })

  // 修改商品详情页中相关数据
  // 修改图片,注意，修改的是图片的路径，所以要使用arrt方法修改
  $('.preview-img > img').attr('src', target.imgSrc);
  // 修改商品名字
  $('.sku-name').text(target.name);
  // 修改价格
  $('.summary-price em').text(`¥${target.price}`);
})