let projectConfig = {
    url: {
        data: 'http://data.hasura/v1/query',
        alex: 'http://data.hasura/v1/alex'
    }
}

if (process.env.ENVIRONMENT === 'dev') {
    projectConfig = {
        url: {
            alex: 'https://data.' + process.env.CLUSTER_NAME + '.hasura-app.io/v1/alex',
            data: 'https://data.' + process.env.CLUSTER_NAME + '.hasura-app.io/v1/query',
        }
    }
}

module.exports = {
  projectConfig
};
