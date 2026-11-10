import json
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]


class RedesignContentTests(unittest.TestCase):
    def test_requested_sections_and_copy(self):
        html = (ROOT / 'index.html').read_text(encoding='utf-8')
        for text in ('aria-label="Brad Josh Nebreja"', 'Aspiring Full-Stack Developer', 'Currently building useful websites and learning AI.', 'UI/UX Design', 'Prototyping', 'GitHub Contributions', 'Josh-L30'):
            self.assertIn(text, html)
        for section in ('home', 'about', 'services', 'work', 'experience', 'workflow', 'stack', 'github', 'certifications', 'contact'):
            self.assertIn('id="' + section + '"', html)
        self.assertNotIn('id="education"', html)
        self.assertNotIn('Recent Edits', html)
        self.assertNotIn('The numbers behind my work', html)

    def test_preserved_content_and_caramel_palette(self):
        content = json.loads((ROOT / 'data/content.json').read_text(encoding='utf-8'))
        self.assertEqual(len(content['projectGroups']), 5)
        self.assertEqual(len(content['certificates']), 5)
        self.assertEqual(len(content['stack']), 34)
        css = (ROOT / 'css/style.css').read_text(encoding='utf-8')
        self.assertIn('--accent: #b87945', css)
        self.assertNotIn('#ff6421', css.lower())


if __name__ == '__main__':
    unittest.main()
