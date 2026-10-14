Add-Type -AssemblyName System.Drawing

function Generate-CalcProIcon {
    param([int]$size, [string]$outputPath)

    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Background gradient: deep dark violet
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $cTop = [System.Drawing.Color]::FromArgb(255, 30, 27, 75)
    $cBottom = [System.Drawing.Color]::FromArgb(255, 10, 10, 26)
    $linBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $cTop, $cBottom, 45.0)
    $g.FillRectangle($linBrush, $rect)

    # Outer rounded border squircle
    $pad = [int]($size * 0.04)
    $sqSize = $size - (2 * $pad)
    $radius = [int]($size * 0.22)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($pad, $pad, $radius, $radius, 180, 90)
    $path.AddArc($pad + $sqSize - $radius, $pad, $radius, $radius, 270, 90)
    $path.AddArc($pad + $sqSize - $radius, $pad + $sqSize - $radius, $radius, $radius, 0, 90)
    $path.AddArc($pad, $pad + $sqSize - $radius, $radius, $radius, 90, 90)
    $path.CloseFigure()

    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 139, 92, 246), [int]($size * 0.02))
    $g.DrawPath($pen, $path)

    # Accent Header Display Box
    $hdrX = [int]($size * 0.12)
    $hdrY = [int]($size * 0.12)
    $hdrW = [int]($size * 0.76)
    $hdrH = [int]($size * 0.20)
    $hdrBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 18, 18, 42))
    $g.FillRectangle($hdrBrush, $hdrX, $hdrY, $hdrW, $hdrH)
    $hdrPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 167, 139, 250), [int]($size * 0.01))
    $g.DrawRectangle($hdrPen, $hdrX, $hdrY, $hdrW, $hdrH)

    # Title in Header
    $fontSize = [float]($size * 0.09)
    $font = New-Object System.Drawing.Font("Arial", $fontSize, [System.Drawing.FontStyle]::Bold)
    $txtBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 240, 240, 255))
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $hdrRect = New-Object System.Drawing.RectangleF($hdrX, $hdrY, $hdrW, $hdrH)
    $g.DrawString("CalcPro", $font, $txtBrush, $hdrRect, $sf)

    # Draw 4x4 Grid of keys
    $gridY = [int]($size * 0.38)
    $keyW = [int]($size * 0.16)
    $keyH = [int]($size * 0.12)
    $gapX = [int]($size * 0.04)
    $gapY = [int]($size * 0.03)

    $numFont = New-Object System.Drawing.Font("Arial", [float]($size * 0.055), [System.Drawing.FontStyle]::Bold)
    $keyNumBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 25, 25, 55))
    $keyOpBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
    $keyEqBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 139, 92, 246))

    $labels = @(
        @("AC", "±", "%", "÷"),
        @("7", "8", "9", "×"),
        @("4", "5", "6", "−"),
        @("1", "2", "3", "+"),
        @("0", "0", ".", "=")
    )

    for ($row = 0; $row -lt 4; $row++) {
        for ($col = 0; $col -lt 4; $col++) {
            $kx = $hdrX + $col * ($keyW + $gapX)
            $ky = $gridY + $row * ($keyH + $gapY)

            $lbl = $labels[$row][$col]
            $b = $keyNumBrush
            $txtColor = [System.Drawing.Color]::FromArgb(255, 240, 240, 255)

            if ($col -eq 3) {
                $b = $keyOpBrush
                $txtColor = [System.Drawing.Color]::White
            } elseif ($row -eq 0) {
                $txtColor = [System.Drawing.Color]::FromArgb(255, 196, 181, 253)
            }

            if ($row -eq 3 -and $col -eq 3) {
                $b = $keyEqBrush
            }

            $g.FillRectangle($b, $kx, $ky, $keyW, $keyH)
            $kRect = New-Object System.Drawing.RectangleF($kx, $ky, $keyW, $keyH)
            $tb = New-Object System.Drawing.SolidBrush($txtColor)
            $g.DrawString($lbl, $numFont, $tb, $kRect, $sf)
            $tb.Dispose()
        }
    }

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    $linBrush.Dispose()
    $pen.Dispose()
    $hdrBrush.Dispose()
    $hdrPen.Dispose()
    $font.Dispose()
    $txtBrush.Dispose()
    $numFont.Dispose()
    $keyNumBrush.Dispose()
    $keyOpBrush.Dispose()
    $keyEqBrush.Dispose()
}

$iconDir = "C:\Users\DABELTECH\.gemini\antigravity-ide\scratch\calculator-app\icons"
if (!(Test-Path $iconDir)) { New-Item -ItemType Directory -Path $iconDir }

Generate-CalcProIcon 180 "$iconDir\icon-180.png"
Generate-CalcProIcon 192 "$iconDir\icon-192.png"
Generate-CalcProIcon 512 "$iconDir\icon-512.png"
Write-Output "Icons generated successfully!"
