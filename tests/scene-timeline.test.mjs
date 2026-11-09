import {test} from 'node:test';
import assert from 'node:assert/strict';
import {serviceState, devicePose} from '../js/scene-timeline.js';
test('service expansion, two upward wipes and parallax reverse at the reference milestones',()=>{
 const a=serviceState(0),b=serviceState(1/3.4),c=serviceState(1.6/3.4),d=serviceState(2.2/3.4),e=serviceState(1);
 assert.equal(a.scale,.72); assert.equal(a.radius,24); assert.deepEqual(a.y.map(n=>n||0),[0,100,100]);
 assert.equal(b.scale,1); assert.equal(b.radius,0);
 assert.ok(Math.abs(c.y[0]+50)<.0001);assert.ok(Math.abs(c.y[1]-50)<.0001);
 assert.ok(Math.abs(c.mediaY[0]-9)<.0001);assert.ok(Math.abs(c.mediaY[1]+9)<.0001);
 assert.deepEqual(d.y,[-100,0,100]);assert.deepEqual(e.y.map(Math.round),[-100,-100,0]);
 assert.equal(e.active,2);assert.deepEqual(serviceState(-1),a);assert.deepEqual(serviceState(2),e);
 assert.deepEqual(serviceState(1/3.4),b);
});
test('laptop and keyboard rotate on all axes with scroll and retain bounded drag offsets',()=>{
 const a=devicePose(0),b=devicePose(1),k=devicePose(.5,'keyboard');
 assert.ok(b.x>a.x);assert.ok(b.y>a.y);assert.ok(b.z<a.z);
 assert.equal(k.x,.74);assert.equal(k.y,-.52);assert.equal(k.z,.06);
 assert.ok(Math.abs(devicePose(.5,'laptop',{x:9,y:.4}).x-(.52+.85))<.0001);
 assert.ok(Math.abs(devicePose(.5,'laptop',{x:0,y:.4}).y+.2)<.0001);
});
