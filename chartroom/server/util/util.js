module.exports = {
  random() {
    return Math.floor(Math.random()*(10**10 - 10**7) + 10**7);
  },
  rules:{
    nickname:/[\u4e00-\u9fa5]{2,8}/,
    password:/^[A-Za-z]\S{5,}/,
    user:/[0-9]{7,10}/
  }
};
