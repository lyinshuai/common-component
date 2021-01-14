/*
 * 两组数据对比，获取重复项 or 非重复项
 * dataSource 需要对比的列表
 * originSource 需要剔除掉重复项的列表
 * key 对比key
 * repeat 是否重复项
 */
export const operationArrayRepeat = (dataSource, originSource, key, repeat) => originSource.filter((item) => {
  const dataMap = dataSource.map((data) => data[key]);
  return repeat ? dataMap.includes(item[key]) : !dataMap.includes(item[key]);
});
