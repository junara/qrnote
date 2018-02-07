export const rootUrl = `${location.protocol}//${location.host}`

export const itemUrl = (token) => {
  return (`${rootUrl}/items/${token}`)
}

const Url = {
  root: rootUrl,
  item: (token) => `${rootUrl}/items/${token}`,
  shareToLine: (sharedMessage) => `http://line.me/R/msg/text/?${encodeURIComponent(sharedMessage)}`,
}

export default Url