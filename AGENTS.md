# AGENTS.md

## Repo purpose

Personal portfolio repo. Currently contains only the CV:
`Yugesh_Raj_Shilakar_Updated_CV.docx` (no code, no build tooling, no git repo).

Owner profile (from CV): Yugesh Raj Shilakar — mid-level software engineer, ASP.NET Core / C# / SQL Server / Dapper, enterprise ERP. Site: `yugeshshilakar.com.np` (portfolio); photography gallery: `yugesh.info.np`.

## Editing the CV

- `Yugesh_Raj_Shilakar_Updated_CV.docx` is a binary OOXML (zip) file — it **cannot** be edited with text-based file tools (Edit/Write). The `write` tool would corrupt it.
- To read the text: open the zip and parse `word/document.xml`, stripping XML tags and replacing `</w:p>` with newlines.
- To regenerate/edit programmatically, use a library (e.g. `python-docx`, `Open XML SDK`) rather than raw string edits.
- After regenerating the docx, verify it still opens and re-extract the text to confirm nothing was lost.

## Conventions to preserve

- Exact name spelling: **Yugesh Raj Shilakar**.
- Contact details (phone `+977-9860762545`, email `officialyugeshshilakar@gmail.com`, portfolio `yugeshshilakar.com.np`, photography gallery `yugesh.info.np`) must stay accurate if the CV is updated.
- CV structure: Summary → Experience → Projects → Skills → Education → Additional Projects → References.