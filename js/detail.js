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



  //获取加入购物车按钮，注册点击事件
  $('.addshopcar').on('click', function () {
    // 先获取加入购物车的商品件数
    let number = $('.choose-number').val();
    // 需要判断用户输入的数据的合理性
    // 不输入或输入空格、输入除数字外的其他字符、输入<=0的数字这几种情况都是不合理的
    if (number.trim().length === 0 || isNaN(number) || parseInt(number) <= 0) {
      // 如果用户输入的数据不合理，则提示用户
      alert('你输入的数据不正确，请重新输入');
      // 下面就不用执行了
      return;
    }

    // 把商品的相关信息都存到本地数据中
    let arr = kits.loadData('cartListData');
    // 有了数组之后就可以往里面存数据，因为商品的信息有很多，所以使用对象存
    let obj = {
      pID: target.pID,
      name: target.name,
      imgSrc: target.imgSrc,
      price: target.price,
      // 还应该有商品的件数，在点击加入购物车的时候就获取输入框中的件数
    }
    // 把商品信息存到数组中
    arr.push(obj);
    // 转换成符合json格式的字符串然后存到本地
    kits.saveData('cartListData', arr);
  })
})