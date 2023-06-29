module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: []
}

// Modifica el código anterior añadiendo una condición para el entorno de producción
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push('transform-remove-console');
}
