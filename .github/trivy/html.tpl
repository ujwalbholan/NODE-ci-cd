<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Trivy Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #1f2937; }
    h1 { margin-bottom: 4px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; vertical-align: top; }
    th { background: #f3f4f6; }
    .critical { color: #991b1b; font-weight: 700; }
    .high { color: #b45309; font-weight: 700; }
    .empty { padding: 16px; background: #ecfdf5; border: 1px solid #10b981; }
  </style>
</head>
<body>
  <h1>Trivy Security Report</h1>
  <p>Generated at {{ now }}</p>

  {{- if . }}
    {{- range . }}
      <h2>{{ escapeXML .Target }}</h2>
      {{- if .Vulnerabilities }}
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Vulnerability</th>
              <th>Severity</th>
              <th>Installed</th>
              <th>Fixed</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {{- range .Vulnerabilities }}
              <tr>
                <td>{{ escapeXML .PkgName }}</td>
                <td>{{ escapeXML .VulnerabilityID }}</td>
                <td>{{ escapeXML .Severity }}</td>
                <td>{{ escapeXML .InstalledVersion }}</td>
                <td>{{ escapeXML .FixedVersion }}</td>
                <td>{{ escapeXML .Title }}</td>
              </tr>
            {{- end }}
          </tbody>
        </table>
      {{- else }}
        <div class="empty">No vulnerabilities found for this target.</div>
      {{- end }}
    {{- end }}
  {{- else }}
    <div class="empty">Trivy returned an empty report.</div>
  {{- end }}
</body>
</html>
