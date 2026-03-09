import { execSync } from 'child_process';

const files = [
  'src/pages/AttemptPage.scss',
  'src/pages/HomePage.scss',
  'src/components/SQLEditor/SQLEditor.scss',
  'src/components/ResultsPanel/ResultsPanel.scss',
  'src/components/HintPanel/HintPanel.scss',
  'src/components/SampleDataViewer/SampleDataViewer.scss',
  'src/components/AssignmentCard/AssignmentCard.scss'
];

files.forEach(file => {
  try {
    execSync(`npx sass ${file} tmp.css`, { stdio: 'pipe' });
    console.log(`${file} OK`);
  } catch (error) {
    console.log(`ERROR IN ${file}:`);
    console.log(error.stderr.toString());
  }
});
