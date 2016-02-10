exports.getConfig = () => {
  const env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
  return require('./config/config.json')[env]
}