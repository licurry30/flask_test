function showInstance(src) {
  alert(src);
  $.ajax({
    type: "POST",
    url: '/InstanceResults/',
    data: JSON.stringify(src), // 将data转化为字符串
    contentType: 'application/json; charset=UTF-8', // 指定contentType
    dataType: "html",  // 注意：这里是指希望服务端返回的数据类型
    success: function (data) { // 返回数据根据结果进行相应的处理
      $("#myDiv").html(data);
    },
    error: function () {
      $("#myDiv").html("获取数据失败！");
    }
  });
}

