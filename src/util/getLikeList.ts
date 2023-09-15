/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import axios from "axios";

export const getLikeList = async (list) => {
  const urls = list.map(item => `https://api.bilibili.com/x/web-interface/view?aid=${item}`)
  const results = await concurrentRequests(urls, 3).then(res => res)
  return results
};
function concurrentRequests(urls, maxRequests) {
  const results = []
  const maxLength = urls.length
  let currentIndex = 0
  return new Promise(resolve => {
    function makeRequest(url: string, index) {
      const urlIndex = index
      axios.get(url).then(res => {
        results[urlIndex] = res.data
      }).catch(error => {
        results[urlIndex] = { status: 'rejected', reason: error }
      }).finally(() => {
        currentIndex++
        if (currentIndex < maxLength) {
          makeRequest(urls[currentIndex], currentIndex)
        } else if (results.length === maxLength) {
          resolve(results)
        }
      })
    }
    for (let i = 0; i < maxRequests && i < maxLength; i++) {
      makeRequest(urls[i], i)
    }
  })
}
