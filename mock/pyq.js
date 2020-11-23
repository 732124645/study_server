const Mock = require("mockjs");
const Random = Mock.Random;
/**
 * mockjs中属性名‘|’符号后面的属性为随机属性，数组对象后面的随机属性为随机数组数量，正则表达式表示随机规则，+1代表自增
 */

function res(page = 1, limit = 10) {
  let detail = [];
  for (let i = 0; i < limit; i++) {
    let item = {};
    item["uName"] = Random.ctitle(2, 4);
    let images = [];
    for (let j = 0; j < Random.integer(0, 3); j++) {
      images.push(Random.image("200x200", Random.color(), Random.word(3, 8)));
    }
    item["portrait"] = Random.image(
      "200x200",
      Random.color(),
      Random.word(3, 8)
    );
    item["text"] = Random.cparagraph();
    item["images"] = images;
    detail.push(item);
  }
  return { page, limit, data: detail };
}

module.exports = res;
