const prompts = require('prompts');
const { fork } = require('child_process');

const choices = [
  { title: 'Launch Webpage', value: './Started/launchPage.js' },
  { title: 'Web Page Content', value: './Started/getContent.js' },
  { title: 'Web page Screnshot', value: './Started/screenshot.js' },
  { title: 'Access DOM', value: './Started/DOM.js' },
  { title: 'Create Webpage PDF', value: '.Started//generatePDF.js' },
  { title: 'Webpage Accessibility', value: './Started/accessibility.js' },
  { title: 'Mobile Emulation', value: './Started/mobile.js' },
  { title: 'Web Workers list', value: './Started/webworker.js' },
  { title: 'Frame(s)', value: './Started/frame.js' },
  { title: 'Color scheme change', value: './Started/dark-mode.js' },
  { title: 'Download File', value: './Started/download.js' },
  {
    title: 'Performance - Page load time(s)',
    value: './performance/pageLoadTime.js',
  },
  { title: 'Performance - Timeline', value: './performance/timeline-trace.js' },
  { title: 'Performance - Page Metrics', value: './performance/metrics.js' },
  {
    title: 'Performance - JS Code Coverage',
    value: './performance/codeCoverage.js',
  },
  { title: 'Performance - Frame rate', value: './performance/fps.js' },
  {
    title: 'Network - Intercept Newtwork',
    value: './network/networkIntercept.js',
  },
  { title: 'PWA - Disable Javascript', value: './pwa/jsDisable.js' },
  { title: 'PWA - Offline', value: './pwa/offline.js' },
  { title: 'PWA - Lighhouse / Audit', value: './pwa/lighthouse.js' },
  {
    title: 'Scraping - TodoMvc Meta Data',
    value: './Scraping/todoMvcMetaData.js',
  },
  { title: 'Scraping - IMDB Movie List', value: './Scraping/imdb.js' },
  {
    title: 'Scraping - Amazon Price Tracker',
    value: './Scraping/amazonPriceMonitor.js',
  },
  {
    title: 'Scraping - Infinite Scroll Data',
    value: './Scraping/InfiniteScrollItems.js',
  },
  { title: 'CDPSessions - Play back Rate', value: './playbackRate.js' },
  {
    title: 'Automation / E2E - Multi Step Form Submittion - ',
    value: './automate/formSubmit.js',
  },
];

const twirlTimer = () => {
  const P = ['\\', '|', '/', '-'];
  let x = 0;
  return setInterval(() => {
    process.stdout.write('\r' + P[x++]);
    x &= 3;
  }, 250);
};

async function start() {
  const response = await prompts([
    {
      type: 'select',
      name: 'runExample',
      message: '\n 您想执行哪一个？',
      choices,
    },
  ]);

  if (response.runExample) {
    const timer = twirlTimer();
    const proc = fork(response.runExample);
    proc.on('close', () => {
      process.stdout.write('');
      clearInterval(timer);
      start();
    });
  }
}

(async () => start())();
