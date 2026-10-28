param(
    [ValidateRange(1, 65535)]
    [int]$Port = 8080,
    [ValidateSet('acoustic', 'electric')]
    [string]$Theme = 'acoustic',
    [string]$Python
)

$ErrorActionPreference = 'Stop'

if (-not $Python) {
    foreach ($candidate in @('py', 'python', 'python3')) {
        $command = Get-Command $candidate -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
        if (-not $command) { continue }
        try {
            & $command.Source -c 'import sys; sys.exit(0 if sys.version_info >= (3, 7) else 1)' 2>$null
        } catch { continue }
        if ($LASTEXITCODE -eq 0) {
            $Python = $command.Source
            break
        }
    }
}

if (-not $Python) {
    throw 'Python 3.7+ is required. Install Python, or use -Python with the path to python.exe.'
}

& $Python -u (Join-Path $PSScriptRoot 'scripts/preview.py') --port $Port --theme $Theme
exit $LASTEXITCODE
