// ====== 全局随机数生成器 ======(AI code)
window.getFandomRandom = function(min, max, isInteger) {
  // 参数处理（支持单参数/多参数调用）
  const hasMin = (typeof min === 'number');
  const hasMax = (typeof max === 'number');
  const toInteger = (typeof isInteger === 'boolean') ? isInteger : false;
  
  // 范围校验与默认值
  const realMin = hasMin ? min : 0;
  const realMax = hasMax ? max : (hasMin ? min : 1);
  const [finalMin, finalMax] = realMin > realMax ? [realMax, realMin] : [realMin, realMax];
  
  // 核心算法（梅森旋转）
  const value = _mersenneTwister();
  
  // 结果转换
  if (toInteger) {
    return Math.floor(value * (finalMax - finalMin + 1)) + finalMin;
  }
  return value * (finalMax - finalMin) + finalMin;
};

// ====== 梅森旋转算法实现 ======
(function() {
  // 初始化状态（单例模式）
  if (window._mtState) return;
  
  const N = 624, M = 397;
  const state = new Array(N);
  let index = N + 1;
  const seed = new Date().getTime();

  // 初始化状态数组
  state = seed >>> 0;
  for (let i = 1; i < N; i++) {
    const s = state[i - 1] ^ (state[i - 1] >>> 30);
    state[i] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + 
               (s & 0x0000ffff) * 1812433253 + i;
    state[i] >>>= 0;
  }

  // 生成随机数（私有函数）
  window._mersenneTwister = function() {
    if (index >= N) {
      for (let k = 0; k < N - M; k++) {
        const y = (state[k] & 0x80000000) | (state[k + 1] & 0x7fffffff);
        state[k] = state[k + M] ^ (y >>> 1)^ ((y & 1) ? 0x9908b0df : 0);
      }
      for (let k = N - M; k < N - 1; k++) {
        const y = (state[k] & 0x80000000) | (state[k + 1] & 0x7fffffff);
        state[k] = state[k + M - N] ^ (y >>> 1)^ ((y & 1) ? 0x9908b0df : 0);
      }
      const y = (state[N - 1] & 0x80000000) | (state & 0x7fffffff);
      state[N - 1] = state[M - 1] ^ (y >>> 1)^ ((y & 1) ? 0x9908b0df : 0);
      index = 0;
    }

    let y = state[index++];
    y ^= y >>> 11;
    y^= (y << 7) & 0x9d2c5680;
    y^= (y << 15) & 0xefc60000;
    y^= y >>> 18;
    
    return (y >>> 0) / 4294967296; // 转换为[0,1)区间
  };
})();