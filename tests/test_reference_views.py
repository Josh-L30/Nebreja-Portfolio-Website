from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class ReferenceViewsTests(unittest.TestCase):
 def test_reference_views_exist_with_navigation_and_mocha(self):
  for page in ['project.html','works.html','stack.html','contact.html']:
   text=(ROOT/page).read_text(encoding='utf8')
   self.assertIn('Back to Home',text);self.assertIn('css/pages.css',text);self.assertIn('js/detail-pages.js',text)
 def test_home_uses_photography_and_destination_links(self):
  text=(ROOT/'index.html').read_text(encoding='utf8')
  self.assertIn('<em>help</em>',text)
  for role in ['design','development','prototype']:
   self.assertIn('assets/service-'+role+'.webp',text)
  self.assertIn('href="stack.html"',text);self.assertIn('href="contact.html"',text)
  self.assertNotIn('<portfolio-contact-form',text)
 def test_shared_form_and_viewer_are_present(self):
  for file in ['js/contact-form.js','js/media-viewer.js','js/page-transitions.js']:
   self.assertTrue((ROOT/file).is_file())
  form=(ROOT/'js/contact-form.js').read_text(encoding='utf8')
  self.assertIn('AbortSignal.timeout(15000)',form)
  self.assertIn('company',form);self.assertIn('service',form)
if __name__=='__main__':unittest.main()
