# Fonts

`Source Serif 4` (SIL Open Font License 1.1, https://github.com/adobe-fonts/source-serif),
weight 600, used for headings and the wordmark. Self-hosted rather than loaded
from a font CDN, for the same reason Font Awesome was dropped: a third-party
stylesheet on the critical path is not worth a handful of glyphs.

Two files, split by `unicode-range` so a visitor downloads only what a page uses:

- `source-serif-4-latin-600.woff2` -- Fontsource's `latin` subset, unmodified.
  Covers ASCII, the Latin-1 supplement (so Spanish accents and the inverted
  marks) and common punctuation.
- `source-serif-4-umacron-600.woff2` -- Fontsource's `latin-ext` subset, cut
  down with `pyftsubset --unicodes=U+016A,U+016B` to just the U-macron pair.
  The full latin-ext subset is 18K and the only glyph this site needs from it
  is the U in "Uterpret", so shipping all of it would nearly double the font
  payload for one character.

To regenerate the second file:

    npm pack @fontsource/source-serif-4@5 && tar xzf fontsource-*.tgz
    pyftsubset package/files/source-serif-4-latin-ext-600-normal.woff2 \
      --unicodes=U+016A,U+016B --flavor=woff2 --layout-features='*' \
      --output-file=source-serif-4-umacron-600.woff2
