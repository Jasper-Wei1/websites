# Project maintenance

- This repository maintains the latest personal website on `main`, not a separately anonymized template. Keep the author's accepted portrait, email, social links and case content.
- Preserve the accepted layout and motion. Current design decisions are in `docs/DESIGN.md`; do not treat obsolete iterations as active requirements.
- Project backgrounds use local CSS gradients. Do not restore removed external backgrounds, obsolete screenshots or unused draft assets.
- Build React UI in `src/`. Keep `.openai/hosting.json`, Worker and Sites packaging intact; reuse the existing site identity for an authorized deployment.
- Do not publish credentials, private drafts, QA evidence, node_modules or dist. Personal content and generated artwork have separate rights in THIRD_PARTY_NOTICES.md.
- Run `npm run build` then `npm test` before pushing. Test UI changes in the browser when requested. Technical tests do not prove subjective visual acceptance.
- Keep the standard MIT text and third-party font/dependency notices. Repository maintenance does not automatically change visibility or deploy the website.
- The repository history was consolidated with the author's authorization. Do not merge old development history back into main.
