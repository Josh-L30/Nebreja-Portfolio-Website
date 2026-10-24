import {test} from 'node:test';import assert from 'node:assert/strict';
let motion={};try{motion=await import('../js/motion.js')}catch{}
test('signature scene progress clamps to its resting bounds',()=>{assert.equal(typeof motion.sceneProgress,'function','sceneProgress must exist');assert.equal(motion.sceneProgress(1000,900),0);assert.equal(motion.sceneProgress(150,900),1);assert.equal(motion.sceneProgress(472.5,900),.5)});

