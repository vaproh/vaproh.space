<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>RSS Feed | <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body { font-family: 'Inter', system-ui, -apple-system, sans-serif; line-height: 1.6; color: #111; background: #fff; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
          .header { margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
          .header h1 { font-size: 24px; margin: 0 0 10px 0; letter-spacing: -0.02em; }
          .header p { color: #666; margin: 0; }
          .post { margin-bottom: 40px; }
          .post h2 { font-size: 20px; margin: 0 0 5px 0; letter-spacing: -0.01em; }
          .post h2 a { color: #111; text-decoration: none; }
          .post h2 a:hover { text-decoration: underline; }
          .post-meta { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 13px; color: #888; margin-bottom: 10px; }
          .notice { background: #f7f7f7; padding: 16px; border: 1px solid #eee; margin-bottom: 40px; font-size: 15px; color: #555; }
          .notice a { color: #0645ad; }
          @media (prefers-color-scheme: dark) {
            body { color: #eee; background: #1c1c1c; }
            .header { border-bottom-color: #3a3a3a; }
            .header p { color: #aaa; }
            .post h2 a { color: #eee; }
            .notice { background: #242424; color: #aaa; border-color: #3a3a3a; }
            .notice a { color: #7babd4; }
          }
        </style>
      </head>
      <body>
        <div class="notice">
          <strong>This is an RSS feed.</strong> Subscribe by copying the URL into your RSS reader (like <a href="https://netnewswire.com/" target="_blank">NetNewsWire</a> or <a href="https://feedbin.com/" target="_blank">Feedbin</a>).
        </div>
        <div class="header">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
        </div>
        <div class="posts">
          <xsl:for-each select="/rss/channel/item">
            <div class="post">
              <h2>
                <a href="{link}" target="_blank"><xsl:value-of select="title"/></a>
              </h2>
              <div class="post-meta">
                <xsl:value-of select="pubDate"/>
              </div>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
