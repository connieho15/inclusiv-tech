let projectConfig = {
    url: {
        data: 'http://data.hasura/v1/query',
        alex: 'http//data.hasura/v1/alex-text'
    }
}

if (process.env.ENVIRONMENT === 'dev') {
    projectConfig = {
        url: {
            data: 'https://data.' + process.env.CLUSTER_NAME + '.hasura-app.io/v1/query',
            alex: 'https://' + process.env.CLUSTER_NAME + '.hasura-app.io/v1/alex-text'
        }
    }
}

module.exports = {
  projectConfig
};
