import * as os from 'os';
import { Cluster } from 'cluster';
import { Logging } from '@common/providers/logging/logging';
import {
  customLogsColor,
  customLogsText,
} from '@common/providers/logging/customLogging';
const cluster = require('cluster') as Cluster;
const logging = new Logging();

export const inCluster = (callback: Function) => {
  if (cluster.isPrimary) {
    process.on('SIGINT', () => {
      for (let id in cluster.workers) {
        cluster.workers[id].kill();
      }
      process.exit(0);
    });

    // Lấy số lượng CPU cores
    const numCPUs = os.cpus().length;
    logging.debug(
      `${customLogsText.bold}${customLogsColor.pink}The total number of CPUs is ${numCPUs} 🚀`,
    );
    logging.debug(
      `${customLogsText.bold}${customLogsColor.pink}Primary pid = ${process.pid} 🚀`,
    );

    // Tạo các worker
    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on('online', (worker) => {
      logging.debug(
        `${customLogsText.bold}${customLogsColor.green}Worker ${worker.process.pid} is online 🟢`,
      );
    });

    // Lắng nghe sự kiện worker chết
    cluster.on('exit', (worker, code, signal) => {
      logging.debug(
        `${customLogsText.bold}${customLogsColor.red}Worker ${worker.process.pid} has been killed 💀`,
      );
      logging.debug(
        `${customLogsText.bold}${customLogsColor.red}Worker ${worker.process.pid} died with code ${code} and signal ${signal}`,
      );
      // Tạo lại worker mới khi worker chết
      cluster.fork();
    });
  } else {
    callback();
  }
};
