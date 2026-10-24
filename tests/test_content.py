import json, pathlib, unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
class ContentTests(unittest.TestCase):
 def test_families_preserve_every_entry_once(self):
  content=json.loads((ROOT/'data/content.json').read_text(encoding='utf-8-sig'))
  groups=content.get('projectGroups',[])
  self.assertEqual(len(groups),3,'Three project families must be browsable')
  ids=[i for g in groups for i in g['projectIds']]
  self.assertCountEqual(ids,['cpc','dashboard','gamemechanics','cinemabuddy','cinemabuddyux'])
 def test_original_media_preserved(self):
  content=json.loads((ROOT/'data/content.json').read_text(encoding='utf-8-sig'))
  baseline=json.loads((ROOT/'docs/cinematic-content-baseline.json').read_text(encoding='utf-8-sig'))
  self.assertEqual(sorted({s['original'] for p in content['projects'] for s in p['gallery']}),sorted(baseline['originals']))
  self.assertEqual(len(content['certificates']),5)
  self.assertEqual(sorted(c['image'] for c in content['certificates']),sorted(baseline['certificates']))
  self.assertEqual(sorted(p['video'] for p in content['projects'] if p.get('video')),baseline['videos'])
if __name__=='__main__':unittest.main()

