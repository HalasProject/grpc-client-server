module.exports = {
    apps: [
      {
        name: 'Book Service',
        namespace:'app',
        script: 'npm',
        args: 'run start',
        cwd: 'book_service',
        autorestart: true,
        watch: true,
        env: {
          NODE_ENV: 'development',
          PORT: 8001
        },
        
      },
      {
        name: 'frontend',
        namespace:'app',
        script: 'npm',
        args: 'run start',
        cwd: 'frontend',
        // autorestart: true,
        watch: true,
        env: {
            REACT_APP_PROXY_URL:"http://127.0.0.1:7091"
        }
      },
      {
        name: 'envoy',
        namespace:'proxy',
        script: 'envoy',
        max_restarts: 5,
        args: ['-c','envoy.yaml'],
        autorestart: true,
        watch: true,
      }
    ]
  };