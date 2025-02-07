export const configuration = () => {
  return {
    // Sample config.
    "sample.name": process.env.SAMPLE_NAME,

    // db config
    "db.host": process.env.DB_HOST,
    "db.port": process.env.DB_PORT,
    "db.user_name": process.env.DB_USER,
    "db.password": process.env.DB_PASSWORD,
    "db.name": process.env.DB_NAME,
    "db.name_test": process.env.DB_NAME_TEST,
    "db.logger_options": process.env.ENV_NAME === 'development' ? true : ['warn', 'error', 'migration'],
    "db.slow_limit": Number(process.env.DB_SLOW_LIMIT) || 500, // ms

    //redis config
    "redis.host": process.env.REDIS_HOST,
    "redis.port": process.env.REDIS_PORT,

    // rabbitmq config
    "rabbitmq.host": process.env.RABBITMQ_HOST,
    "rabbitmq.port": process.env.RABBITMQ_PORT,
    "rabbitmq.user": process.env.RABBITMQ_USER ?? "guest",
    "rabbitmq.pass": process.env.RABBITMQ_PASS ?? "guest",
    "rabbitmq.exchange.name": process.env.RABBITMQ_EXCHANGE_NAME,
    "rabbitmq.exchange.dlx": `${process.env.RABBITMQ_EXCHANGE_NAME}-dlx`,

    // s3 config
    "aws.bucket": process.env.AWS_BUCKET,

    // slack webhook
    "slack.webhook_url": process.env.SLACK_NOTIFICATION_URL,
  };
};
