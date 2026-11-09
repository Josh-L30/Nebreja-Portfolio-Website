import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateActivity} from '../js/contributions.js';
const snapshot=JSON.parse(readFileSync(new URL('../data/github-contributions.json',import.meta.url),'utf8'));

test('verified GitHub snapshot has real sorted daily values and a calculated total',()=>{
  const result=validateActivity({...snapshot,contributions:[...snapshot.contributions].reverse(),total:-1});
  assert.equal(result.contributions.length,365);
  assert.equal(result.total,result.contributions.reduce((total,day)=>total+day.count,0));
  assert.ok(result.contributions[0].date<result.contributions.at(-1).date);
});
test('invalid dates, negative counts, duplicate days and wrong users cannot render activity',()=>{
  for(const value of [
    {...snapshot,updatedAt:'invalid'},
    {...snapshot,username:'someone-else'},
    {...snapshot,contributions:[{...snapshot.contributions[0],count:-1},...snapshot.contributions.slice(1)]},
    {...snapshot,contributions:[snapshot.contributions[1],...snapshot.contributions.slice(1)]}
  ])assert.throws(()=>validateActivity(value));
});
