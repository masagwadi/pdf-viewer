/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback.fs = false;
          config.resolve.fallback.child_process = false;
        }
    
        config.module.rules.push({
          test: /\.node$/,
          loader: 'node-loader',
        });
        
        config.resolve.alias.canvas = false;
    
        return config;
      },
}

module.exports = nextConfig
