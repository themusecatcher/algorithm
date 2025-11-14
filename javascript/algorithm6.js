/**
 * 有如下文本内容，每一行为一条日志：
 * 提取所有“action:login”日志中的时间、用户名（user:后面的内容）、IP地址（ip:后面的内容）
 * 
 * 试题输出结果：[['2024-06-01 12:00:01', 'alice', '192.168.1.10'], ['2024-06-01 12:04:59', 'bob', '10.0.0.5']]
 */
const logString = `
  [2024-06-01 12:00:01] INFO  user:alice  action:login  ip:192.168.1.10
  [2024-06-01 12:01:15] ERROR user:bob    action:delete ip:10.0.0.5
  [2024-06-01 12:02:30] INFO  user:carol  action:logout ip:172.16.0.2
  [2024-06-01 12:03:45] WARN  user:alice  action:update ip:192.168.1.10
  [2024-06-01 12:04:59] INFO  user:bob    action:login  ip:10.0.0.5
`;
function extractLoginLogs(logString) {
  const result = []
  const lines = logString.trim().split('\n')
  for (let line of lines) {
    if (line.includes('action:login')) {
      const parts = line.trim().replace(/\[|\]|INFO|user:|action:login|ip:/g, '').split(/\s+/)
      const time = `${parts[0]} ${parts[1]}` 
      const username = parts[2]
      const ip = parts[3]
      result.push([time, username, ip])
    }
  }
  return result
}
console.log('extractLoginLogs', extractLoginLogs(logString))


// 实现 Lodash 的 .get()
// 示例：
const object = { a: [{ b: { c: 3 } }] }
function get(obj, path, defaultValue = null) {
  const pathArr = path.replace(/['"\]]/g, '').replaceAll('[', '.').split('.')
  let res = obj
  for (let key of pathArr) {
    if (key in res) {
      res = res[key]
    } else {
      return defaultValue
    }
  }
  return res
}
console.log('a.0.b.c', get(object, 'a.0.b.c')) // 3
console.log('a[0]["b"]["c"]', get(object, 'a[0]["b"]["c"]')) // 3
console.log('a[100].b.c', get(object, 'a[100].b.c', 'default')) // 'default'
