'use strict';

var colors     = require('colors/safe'),
    os         = require('os'),
    httpServer = require(`${__dirname}/http-common`),
    portfinder = require('portfinder'),
    opener     = require('opener'),
    fs         = require('fs'),
    argv       = require('minimist')(process.argv.slice(2));
var ifaces = os.networkInterfaces();

process.title = 'http-server';

var port = '8385',
    host = '0.0.0.0',
    ssl = argv.S || argv.ssl,
    proxy = argv.P || argv.proxy,
    utc = argv.U || argv.utc,
    version = argv.v || argv.version,
    logger;

if (!argv.s && !argv.silent) {
  logger = {
    info: console.log,
    request: function (req, res, error) {
      var date = utc ? new Date().toUTCString() : new Date();
      var ip = argv['log-ip']
          ? req.headers['x-forwarded-for'] || '' +  req.connection.remoteAddress
          : '';
      if (error) {
        logger.info(
          '[%s] %s "%s %s" Error (%s): "%s"',
          date, ip, colors.red(req.method), colors.red(req.url),
          colors.red(error.status.toString()), colors.red(error.message)
        );
      }
      else {
        logger.info(
          '[%s] %s "%s %s" "%s"',
          date, ip, colors.cyan(req.method), colors.cyan(req.url),
          req.headers['user-agent']
        );
      }
    }
  };
}
else if (colors) {
  logger = {
    info: function () {},
    request: function () {}
  };
}

if (version) {
  logger.info('v' + require('../package.json').version);
  process.exit();
}

if (!port) {
  portfinder.basePort = 8080;
  portfinder.getPort(function (err, port) {
    if (err) { throw err; }
    listen(port);
  });
}
else {
  listen(port);
}

function listen(port) {
  var options = {
    root: argv._[0],
    cache: argv.c,
    timeout: argv.t,
    showDir: argv.d,
    autoIndex: argv.i,
    gzip: argv.g || argv.gzip,
    brotli: argv.b || argv.brotli,
    robots: argv.r || argv.robots,
    ext: argv.e || argv.ext,
    logFn: logger.request,
    proxy: proxy,
    showDotfiles: argv.dotfiles,
    username: argv.username || process.env.NODE_HTTP_SERVER_USERNAME,
    password: argv.password || process.env.NODE_HTTP_SERVER_PASSWORD
  };

  if (argv.cors) {
    options.cors = true;
    if (typeof argv.cors === 'string') {
      options.corsHeaders = argv.cors;
    }
  }

 

  var server = httpServer.createServer(options);
  server.listen(port, host, function () {
    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol      = ssl ? 'https://' : 'http://';

    logger.info([colors.yellow('Starting up http-server, serving '),
      colors.cyan(server.root),
      ssl ? (colors.yellow(' through') + colors.cyan(' https')) : '',
      colors.yellow('\nAvailable on:')
    ].join(''));

    if (argv.a && host !== '0.0.0.0') {
      logger.info(('  ' + protocol + canonicalHost + ':' + colors.green(port.toString())));
    }
    else {
      Object.keys(ifaces).forEach(function (dev) {
        ifaces[dev].forEach(function (details) {
          if (details.family === 'IPv4') {
            logger.info(('  ' + protocol + details.address + ':' + colors.green(port.toString())));
          }
        });
      });
    }

    // logger.info('Hit CTRL-C to stop the server');
    if (argv.o) {
      var openUrl = protocol + canonicalHost + ':' + port;
      if (typeof argv.o === 'string') {
        openUrl += argv.o[0] === '/' ? argv.o : '/' + argv.o;
      }
      logger.info('open: ' + openUrl);
      opener(openUrl);
    }
  });
}

if (process.platform === 'win32') {
  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('SIGINT', function () {
    process.emit('SIGINT');
  });
}

process.on('SIGINT', function () {
  // logger.info(colors.red('http-server stopped.'));
  process.exit();
});

process.on('SIGTERM', function () {
  // logger.info(colors.red('http-server stopped.'));
  process.exit();
});
