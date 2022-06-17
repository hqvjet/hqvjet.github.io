//get data from localStorage
const data = JSON.parse(localStorage.getItem("data"));
const index = localStorage.getItem("id");



$(document).ready(() => {
    $("#topic-ctn").text(data[index].topic);
    $("#cate-ctn").text("Category: " + data[index].type);
    $("#un-ctn").text("Author: " + data[index].username);
   // $("#content-ctn").text(data[index].content);

});