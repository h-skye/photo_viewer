export default (params) => {
  const stringParams = Object.keys(params).map((key) => (
    key + '=' + String(params[key])
  ))

  return '?' + stringParams.join('&')
}