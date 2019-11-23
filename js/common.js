// 因为很多页面都有购物车小气泡效果，所以写在一个单独的js文件中方便引用
// 实现购物车小气泡效果
// 选拔数据从本地中取出来
let arr = kits.loadData('cartListData');
let total = 0;
arr.forEach(e => {
  total += e.number;
})
// 修改气泡里面的内容
$('.count').text(total);