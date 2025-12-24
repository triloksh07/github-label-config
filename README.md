# github-label-config
Centralized configuration for GitHub issue labels, including JSON/YAML definitions and automated syncing via GitHub Actions. This repo ensures consistent labeling across projects, with industry-grade categories (bug, enhancement, refactor, discussion, etc.) and a workflow that applies updates automatically whenever configs change.

# Repository Configuration

This repo contains shared configuration files for project hygiene:

- `config/labels.json` → GitHub issue labels with colors and descriptions
- `config/labels.yaml` → Alternative YAML format
- `.github/workflows/label-sync.yml` → GitHub Action to automatically sync labels

## Usage
1. Update `labels.json` or `labels.yaml` with new labels.
2. Commit changes to `main`.
3. GitHub Actions will automatically apply labels to the repository using the GitHub API.
