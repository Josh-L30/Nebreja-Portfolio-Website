import json, pathlib, unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
class ContentTests(unittest.TestCase):
 def setUp(self):self.content=json.loads((ROOT/'data/content.json').read_text(encoding='utf-8'))
 def test_current_project_inventory(self):
  ids=[i for g in self.content['projectGroups'] for i in g['projectIds']]
  self.assertCountEqual(ids,['cpc','dashboard','checkpoint','cinemabuddy','portfolio'])
  self.assertEqual(len(self.content['projectGroups']),4)
 def test_requested_replacements(self):
  projects={p['id']:p for p in self.content['projects']}
  self.assertEqual(len(projects['checkpoint']['gallery']),2)
  self.assertEqual(len(projects['cinemabuddy']['gallery']),1)
  self.assertEqual(projects['checkpoint']['liveUrl'],'https://onroute.cloud/')
  self.assertEqual(projects['cinemabuddy']['liveUrl'],'https://cinema-buddy.vercel.app/')
  self.assertEqual(projects['portfolio']['liveUrl'],'https://nebreja-portfolio-website.vercel.app/')
  self.assertEqual(len(projects['portfolio']['gallery']),1)
  self.assertFalse(any(p.get('video') for p in projects.values()))
  self.assertEqual(len(self.content['certificates']),5)
  for p in projects.values():
   for s in p['gallery']:self.assertTrue((ROOT/s['original']).is_file())
 def test_new_stack_tools(self):
  names={t['name'] for t in self.content['stack']}
  self.assertTrue({'Node.js','MongoDB','Tailwind CSS','Vite'}<=names)
 def test_privacy_stack_and_checkpoint_experience(self):
  for project in self.content['projects']:
   if project['id'] in ['cpc','dashboard']:self.assertIn('privacy',project['privacyNote'])
  self.assertFalse({'Leaflet','Motion'}&{t['name'] for t in self.content['stack']})
  self.assertFalse({'Leaflet','Motion'}&{n for g in self.content['stackGroups'] for n in g['tools']})
  entry=next(e for e in self.content['experience'] if e['company']=='Checkpoint')
  self.assertEqual(entry['date'],'2026')
  self.assertIn('QA Tester',entry['title'])
if __name__=='__main__':unittest.main()
