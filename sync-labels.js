// sync-labels.js
const fs = require('fs');
const { Octokit } = require('@octokit/rest');

// Load labels JSON
const labels = JSON.parse(fs.readFileSync('labels.json', 'utf8'));

// Authenticate with a GitHub token (create one in Settings → Developer settings → Personal access tokens)
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function syncLabels() {
  const owner = 'triloksh07'; // replace with your GitHub username/org
  const repo = 'ai-chat-app-with-agents-v0'; // replace with your repo name

  for (const label of labels) {
    try {
      await octokit.issues.createLabel({ owner, repo, ...label });
      console.log(`Created label: ${label.name}`);
    } catch (err) {
      if (err.status === 422) {
        // Already exists → update instead
        await octokit.issues.updateLabel({ owner, repo, name: label.name, ...label });
        console.log(`Updated label: ${label.name}`);
      } else {
        console.error(`Error with ${label.name}:`, err);
      }
    }
  }
}

syncLabels();
