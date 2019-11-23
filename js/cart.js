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
          <input type="checkbox" class="item-ck" ${e.isChecked ? 'checked' : ''}>
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
  if (arr.length !== 0) {
    // 如果有商品要把空空如也隐藏掉
    $('.empty-tip').hide();
    // 把表头显示
    $('.cart-header').show();
    // 把底部用于计算总件数和总价的div显示
    $('.total-of').show();
  }


  // -----------------实现全选和点选-------------------
  // 获取全选框注册点击事件
  $('.pick-all').on('click', function () {
    // 当勾选全按钮时，所有单选按钮也都勾选上
    let status = $(this).prop('checked');
    $('.item-ck').prop('checked', status);
    $('.pick-all').prop('checked', status);

    // 在全选的时候也要把勾选状态存进本地
    arr.forEach(e => {
      e.isChecked = status;
    })
    //把数据重新更新回本地
    kits.saveData('cartListData', arr);

    // 全选的时候也要计算商品总件数和总价格
    cartTotal();
  })

  $('.item-list').on('click', '.item-ck', function () {
    // 如果点选的个数跟所有商品的数量相等的话，说明全部勾选了
    let ckAll = $('.item-ck').length === $('.item-ck:checked').length;
    $('.pick-all').prop('checked', ckAll);

    // 在点选的同时，需要修改该商品在本地存储中的数据
    // 利用点击的id，找到对应的商品，修改它的isChecked的值
    let pID = $(this).parents('.item').attr('data-id');
    // 判断当前这个单选框是否被勾选
    let isChecked = $(this).prop('checked');
    // 修改它的isChecked
    arr.forEach(e => {
      // 判断如果数组有数据的id跟点击获取到的id相同，那就修改它的isChecked
      if (e.pID == pID) {
        e.isChecked = isChecked;
      }
    })
    // 然后再覆盖回本地
    kits.saveData('cartListData', arr);

    // 在点选的时候，也要计算商品总件数和总价格
    cartTotal();
  })


  // --------------实现计算商品总件数和总价格-------------------
  // 封装成一个函数，方便在其他地方使用
  function cartTotal() {
    // 我们需要从本地数据中获取到isChecked为true的商品，然后得到它的件数和单价，在计算出所有被勾选商品的总件数和总价格
    // 先定义变量来存放件数和总价格
    let totalCount = 0; // 总件数
    let totalMoney = 0; // 总价格
    arr.forEach(e => {
      // 判断数据中isChecked为true的商品
      if (e.isChecked) {
        totalCount += e.number;
        totalMoney += e.number * e.price;
      }
    })
    // 再把计算的到的总件数和总价格的数据更新到页面上
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
  }
  cartTotal();


  // ----------------------实现商品数量的加减------------------
  // 因为商品都是动态生成的，所以需要用事件委托来注册事件
  // 实现商品数量增加的功能
  $('.item-list').on('click', '.add', function () {
    // 当点击+时，修改输入框中的数据
    //prev（）方法可以获得当前元素的前面一个元素
    // 获取输入框中的内容
    let content = $(this).prev().val();
    content++;
    $(this).prev().val(content);
    // 还有将增加后的数据更新到本地存储的数据中
    // 根据id找到对应的商品
    // 获取到用户点击的那个+ 那一行商品的id
    let id = $(this).parents('.item').attr('data-id');
    // 利用find（）方法，找到pID跟id相同的商品
    let obj = arr.find(e => {
      return e.pID == id;
    })
    // 修改该商品的件数
    obj.number = content;
    // 再把修改完的数据保存到本地存储中
    kits.saveData('cartListData', arr);
    // 然后还需要再重新进行商品总件数和总价格的计算
    cartTotal();
    // 修改右边商品价格小计的计算
    // 根据当前点击的这个元素找到右边小计的元素，修改它的内容
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);
  })

  // 实现商品数量减少的功能
  $('.item-list').on('click', '.reduce', function () {
    // 点击-时，输入框中商品的数量会减少
    // next()方法可以找到当前元素的下一个元素
    // 获取输入框中的内容
    let content = $(this).next().val();
    content--;
    // 需要控制减少的商品的数量，在商品数量为1时，那就不允许用户再继续减了
    if (content < 1) {
      // 提示用户
      alert('该商品的数量不能再减少了');
      return;
    }
    $(this).next().val(content);
    // 还有将减少后的数据更新到本地存储的数据中
    // 根据id找到对应的商品
    // 获取到用户点击的那个+ 那一行商品的id
    let id = $(this).parents('.item').attr('data-id');
    // 利用find（）方法，找到pID跟id相同的商品
    let obj = arr.find(e => {
      return e.pID == id;
    })
    // 修改该商品的件数
    obj.number = content;
    // 再把修改完的数据保存到本地存储中
    kits.saveData('cartListData', arr);
    // 然后还需要再重新进行商品总件数和总价格的计算
    cartTotal();
  })


  // ----------------------实现让用户自己输入商品件数--------------------------

  // 在输入框获得焦点的时候，先把当前输入框中的内容存起来，在用户输入不正确数据时，可以在输入框中回复原来的数据
  $('.item-list').on('focus', '.number', function () {
    // 获取原本的数据
    let oldData = $(this).val();
    // 给当前元素添加一个自定义属性
    $(this).attr('data-old', oldData);
  });

  // 当输入框失焦的时候，把用户输入的内容存到本地
  $('.item-list').on('blur', '.number', function () {
    // 每次让用户输入的时候，都需要验证一下用户输入的数据是否合理
    let content = $(this).val();
    if (content.trim().length === 0 || isNaN(content) || parseInt(content) < 1) {
      // 如果用户输入的数据不合理，则提示用户
      alert('你输入的数据不正确，请重新输入');
      // 当用户输入不正确时，在输入框中回复原来的数据
      let oldData = $(this).attr('data-old');
      $(this).val(oldData);
      // 下面就不用执行了
      return;
    }
    // 如果验证通过了，就将数据保存到本地中
    let id = $(this).parents('.item').attr('data-id');
    // 数组中找到id相同的这个商品
    let obj = arr.find(e => {
      return e.pID == id;
    })
    // 修改该商品的件数
    // 注意：此时的content是一个字符串，所以要将它转为数字之后才可以计算
    obj.number = parseInt(content);
    // 然后再把数据更新到本地存储中
    kits.saveData('cartListData', arr);
    // 然后重新计算商品的总件数和总价格
    cartTotal();
    // 再把右边的小计更改
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);
  })


  // -----------------实现删除功能------------------
  $('.item-list').on('click','.item-del',function(){
    layer.confirm('你确定要删除吗?', {icon: 0, title:'警告'}, (index)=>{
      layer.close(index);
      // 点击确定后执行的代码
      // 先得到要删除的数据的id
      let id = $(this).parents('.item').attr('data-id');
      // 把当前点击的这个删除对应的这一行删掉
      $(this).parents('.item').remove();
      // 还要把本地存储里面的数据删除
      arr = arr.filter(e=>{
        return e.pID != id; //返回符合条件的元素
      });
      kits.saveData('cartListData',arr);
      // 重新计算总件数和总价
      calcTotal();
    });
  })
})