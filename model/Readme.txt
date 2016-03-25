数据库操作规范
1.插入:
  <1>:主键方式
    success 返回insertID
    failed 抛出异常
  <2>:非主键方式
    success affectedNum == 1 返回code
    failed affectedNum ！= 1 返回code
2.删除
  success affectedNum == 1 返回code
  failed affectedNum ！= 1 返回code

3.更新
  success affectedNum == 1 返回code
  failed affectedNum ！= 1 返回code

4.查询
  success 返回record
  failed 返回record

查询相关:
单一性检测放在model层
主键模式不需要进行单一性检测

查询有两类
1主键类  有1条记录或者0条记录
2非主键类 存在0-N条记录

插入相关:
主键自增插入 如果回调则一定成功
没有主键插入 可能重复插入 需要自行检测