import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { uniqueGallery } from '../js/project-gallery.js';
test('CPC grouped project includes every unique system screen exactly once', async () => {
 const config=JSON.parse(await readFile(new URL('../data/content.json', import.meta.url)));
 const group=config.projectGroups.find(g=>g.projectIds.includes('cpc'));
 const sources=config.projects.filter(p=>group.projectIds.includes(p.id));
 const gallery=uniqueGallery(sources);
 assert.equal(gallery.length,13);
 assert.deepEqual(gallery.map(s=>s.original),sources[0].gallery.map(s=>s.original));
});
test('shared originals keep the first entry, while unique screens sharing a label survive',()=>{
 const first={original:'a.png',label:'Dashboard'},second={original:'a.png',label:'Other label'},third={original:'b.png',label:'Dashboard'};
 const projects=[{gallery:[first]},{gallery:[second,third]}];
 assert.deepEqual(uniqueGallery(projects),[first,third]);
 assert.equal(projects[1].gallery.length,2);
});
