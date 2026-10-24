import {test} from 'node:test';import assert from 'node:assert/strict';
import * as motion from '../js/motion.js';
test('word reveal progress reverses with scroll position and clamps at the readable bounds',()=>{
 assert.equal(typeof motion.wordProgress,'function','continuous word progress must exist');
 assert.equal(motion.wordProgress(1100,1000),0);
 assert.equal(motion.wordProgress(900,1000),0);
 assert.equal(motion.wordProgress(625,1000),.5);
 assert.equal(motion.wordProgress(350,1000),1);
 assert.equal(motion.wordProgress(-100,1000),1);
 assert.equal(motion.wordProgress(590,1000,100,'statement'),.5);
 assert.equal(motion.wordProgress(450,1000,1000,'statement'),.5);
});
