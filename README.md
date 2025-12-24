
# 🔖 GitHub Label Sync

This repository uses [crazy-max/ghaction-github-labeler](https://github.com/crazy-max/ghaction-github-labeler) to automatically sync issue and pull request labels from a YAML configuration file.  
The goal is to keep labels consistent, descriptive, and easy to maintain across the project.

---

## 📂 File Structure
- **`config/labels.yml`** → Source of truth for all labels.
- **`.github/workflows/label-sync.yml`** → GitHub Actions workflow that applies labels to the repository.

---

## 📝 Labels File Format
The labels file is a **flat YAML list** of label objects.  
Each label must include:
- `name` → Label name (quoted if it contains colons or special characters).
- `color` → Six‑digit hex string (quoted to avoid YAML parsing issues).
- `description` → Short explanation of the label’s purpose.

Example:

```yaml
- name: bug
  color: "d73a4a"
  description: Something is broken or not working as intended

- name: "priority: critical"
  color: "b60205"
  description: Highest urgency; must be addressed immediately

- name: help wanted
  color: "008672"
  description: Extra attention is needed & contributions welcome
```

---

## ⚙️ Workflow Configuration
The workflow runs on pushes to `config/labels.yml` or the workflow file itself.

```yaml
name: Sync GitHub Labels

on:
  push:
    paths:
      - "config/labels.yml"
      - ".github/workflows/label-sync.yml"

jobs:
  sync-labels:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Sync labels
        uses: crazy-max/ghaction-github-labeler@v4
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          yaml-file: config/labels.yml
          skip-delete: true
```

---

## 🧪 Validation & Testing
Before committing changes:
1. **Lint YAML**  
   ```bash
   yamllint config/labels.yml
   ```
   Ensures indentation and syntax are correct.

2. **Local Dry Run (optional)**  
   Install [`act`](https://nektosact.com/) and run:
   ```bash
   act push -W .github/workflows/label-sync.yml
   ```
   Use `dry-run: true` in workflow inputs to preview changes without applying them.

---

## 🚨 Common Pitfalls & Fixes
- **Indentation errors** → Always use 2 spaces for `- name`, 4 spaces for nested keys.
- **Colons in names** → Quote them (`"priority: critical"`).
- **Hex colors misparsed** → Quote all color values (`"5319e7"`, `"008672"`).
- **Permission errors** → Ensure workflow includes:
  ```yaml
  permissions:
    contents: write
    issues: write
  ```

---

## 📚 Lessons Learned
- YAML parsers can misinterpret unquoted values (especially hex codes with leading zeros).
- GitHub Actions require explicit permissions for label management.
- Local testing with `act` helps catch issues early.
- Documenting workflow hygiene prevents repeated mistakes.

---

## 🚀 Next Steps
- Add CI checks to lint `labels.yml` automatically.
- Consider centralizing labels in a dedicated config repo for multi‑project consistency.
- Expand label taxonomy as the project grows (e.g., `UX`, `infra`, `release`).

---
