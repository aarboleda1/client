export default function getTruthyKeys(obj) {
  let results = [];
  Object.keys(obj).forEach(function(key) {
    if (obj[key]) {
      results.push(key);
    }
  });
  return results;
};
