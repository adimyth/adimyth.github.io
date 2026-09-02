<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Essay experiments live elsewhere

This repository contains the portfolio site and essay source. Do not add experimental, benchmark, prototype, demo, or research-implementation code for an essay here. Keep that work in a separate public repository and reference it from the relevant essay with direct, reproducible links.

The model is [`adimyth/llm-inference-experiments`](https://github.com/adimyth/llm-inference-experiments): the LLM inference essays live here, while their scripts, measurements, and experiment documentation live in that separate public repository. Site code required to render the portfolio remains in this repository.

## Git commit style
Commit messages follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- Types used here: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. The spec only mandates `feat` and `fix`; the rest are convention.
- Scope is optional and names a part of the codebase, for example `feat(essays):` or `fix(nav):`.
- The description is imperative and lowercase, with no trailing period. Write "add the dark mode toggle", not "Adds the dark mode toggle."
- Keep the description under 50 characters. Anything longer belongs in the body.
- The body explains what changed and why, wrapped at 72 characters. Keep using it; a bare one-line commit loses the reasoning.
- Breaking changes take a `!` before the colon, or a `BREAKING CHANGE:` footer.
- Do not add "Co-Authored-By: Claude" or any AI attribution in commit messages.
