function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

var light = function (timmer, cb) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      cb();
      resolve();
    }, timmer);
  });
};

var step = function () {
  Promise.resolve().then(function () {
    return light(3000, red);
  }).then(function () {
    return light(2000, green);
  }).then(function () {
    return light(1000, yellow);
  }).then(function () {
    step();
  });
}

step();


function debounce(fn, delay = 1000) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}
function throttle(fn, delay = 1000) {
  let valid = true
  return function(...args) {
    if (!valid) return false
    if (valid) {
      valid = false
      setTimeout(() => {
        fn(args)
        valid = true
      }, delay)
    }
  }
}

const promiseAll = function (promises) {
  return new Promise((resolve, reject) => {
    const len = promises.length
    if (!Array.isArray(promises) || len === 0) {
      return resolve([])
    }
    let num = 0
    const result = []
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        result[index] = res
        num++
        if (num === len) return result
      }).catch(err => {
        reject(err)
      })
    })
  })
}
const promiseRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises) || promises.length === 0) {
      return resolve([])
    }
    for (const promise of promises) {
      Promise.resolve(promise).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

// Input: pattern = "abba", s = "dog dog dog dog"
// Output: false

// Input: pattern = "abba", s = "dog cat cat dog"
// Output: true

function isMatch(pattern, s) {
  if (s === '' || pattern === '') return false
  let pArr = pattern.split('')
  let sArr = s.split(' ')
  if (pArr.length !== sArr.length) return false
}


for (let i = 0; i < 10; i++) {
  if (i === 2) {
    i = 5
  }
  console.log('i', i);
}