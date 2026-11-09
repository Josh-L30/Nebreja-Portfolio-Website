const {test} = require('node:test');
const assert = require('node:assert/strict');
const {parseContributions} = require('../api/github.js');
const cell = (date,id,level,count) => `<td data-date="${date}" id="${id}" data-level="${level}"></td><tool-tip for="${id}">${count ? count + ' contributions' : 'No contributions'} on a date.</tool-tip>`;

test('official GitHub cells are sorted by date with real counts and levels', () => {
  const result = parseContributions(cell('2026-11-08','b',3,4) + cell('2026-11-07','a',0,0), 2);
  assert.deepEqual(result.contributions.map(day => day.date), ['2026-11-07','2026-11-08']);
  assert.equal(result.total, 4);
  assert.equal(result.contributions[1].level, 3);
});
test('incomplete or malformed upstream HTML is rejected instead of inventing activity', () => {
  assert.throws(() => parseContributions('<html>Unavailable</html>'));
  assert.throws(() => parseContributions('<td data-date="2026-11-08" id="a" data-level="3"></td>', 1));
});
test('duplicate days cannot inflate contribution counts', () => {
  assert.throws(() => parseContributions(cell('2026-11-08','a',2,3) + cell('2026-11-08','b',2,3), 1));
});

function response() {
  return {headers:{},statusCode:200,setHeader(name,value){this.headers[name]=value;},end(value){this.body=value;}};
}
test('activity endpoint rejects mutations without contacting GitHub', async () => {
  const handler=require('../api/github.js'),res=response();
  await handler({method:'POST'},res);
  assert.equal(res.statusCode,405);assert.equal(res.headers.Allow,'GET, HEAD');
});
test('an upstream outage produces a recoverable non-cached 503', async () => {
  const handler=require('../api/github.js'),res=response(),originalFetch=global.fetch;
  try {
    global.fetch=async()=>{throw new Error('Unavailable');};
    await handler({method:'GET'},res);
    assert.equal(res.statusCode,503);assert.equal(res.headers['Cache-Control'],'no-store');
    assert.ok(JSON.parse(res.body).error);
  } finally {global.fetch=originalFetch;}
});
