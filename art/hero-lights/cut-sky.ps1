Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class SkyCut {
  public static void Cut(string srcPath, string dstPath, bool evening) {
    using (var loaded = new Bitmap(srcPath)) {
      var bmp = new Bitmap(loaded.Width, loaded.Height, PixelFormat.Format32bppArgb);
      using (var g = Graphics.FromImage(bmp)) {
        g.DrawImage(loaded, 0, 0, loaded.Width, loaded.Height);
      }
      int w = bmp.Width, h = bmp.Height;
      var rect = new Rectangle(0, 0, w, h);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = data.Stride;
      int bytes = stride * h;
      byte[] buf = new byte[bytes];
      Marshal.Copy(data.Scan0, buf, 0, bytes);
      bool[] sky = new bool[w * h];
      int[] queue = new int[w * h];
      int qh = 0, qt = 0;
      for (int x = 0; x < w; x++) {
        int i = x;
        if (IsSky(buf, stride, x, 0, evening)) {
          sky[i] = true;
          queue[qt++] = i;
        }
      }
      int[] dx = { 1, -1, 0, 0 };
      int[] dy = { 0, 0, 1, -1 };
      int limit = (int)(h * 0.64);
      int cloudLimit = (int)(h * 0.44);
      while (qh < qt) {
        int cur = queue[qh++];
        int cx = cur % w;
        int cy = cur / w;
        for (int k = 0; k < 4; k++) {
          int nx = cx + dx[k];
          int ny = cy + dy[k];
          if (nx < 0 || ny < 0 || nx >= w || ny >= h || ny > limit) continue;
          int ni = ny * w + nx;
          if (sky[ni]) continue;
          if (!IsSky(buf, stride, nx, ny, evening)) continue;
          sky[ni] = true;
          queue[qt++] = ni;
        }
      }
      if (evening) {
        qh = 0;
        qt = 0;
        for (int i = 0; i < sky.Length; i++) if (sky[i]) queue[qt++] = i;
        while (qh < qt) {
          int cur = queue[qh++];
          int cx = cur % w;
          int cy = cur / w;
          for (int k = 0; k < 4; k++) {
            int nx = cx + dx[k];
            int ny = cy + dy[k];
            if (nx < 0 || ny < 0 || nx >= w || ny >= cloudLimit) continue;
            int ni = ny * w + nx;
            if (sky[ni]) continue;
            if (!IsCloud(buf, stride, nx, ny)) continue;
            sky[ni] = true;
            queue[qt++] = ni;
          }
        }
      }
      // Eat a 2px fringe so the ridge does not keep a sky halo.
      bool[] grown = (bool[])sky.Clone();
      for (int pass = 0; pass < 2; pass++) {
        bool[] next = (bool[])grown.Clone();
        for (int y = 1; y < limit; y++) {
          for (int x = 1; x < w - 1; x++) {
            int i = y * w + x;
            if (grown[i]) continue;
            if (grown[i - 1] || grown[i + 1] || grown[i - w] || grown[i + w]) next[i] = true;
          }
        }
        grown = next;
      }
      for (int y = 0; y < h; y++) {
        for (int x = 0; x < w; x++) {
          if (!grown[y * w + x]) continue;
          int o = y * stride + x * 4;
          buf[o + 3] = 0;
        }
      }
      Marshal.Copy(buf, 0, data.Scan0, bytes);
      bmp.UnlockBits(data);
      bmp.Save(dstPath, ImageFormat.Png);
      bmp.Dispose();
    }
  }

  static bool IsSky(byte[] buf, int stride, int x, int y, bool evening) {
    int o = y * stride + x * 4;
    int b = buf[o];
    int g = buf[o + 1];
    int r = buf[o + 2];
    int max = Math.Max(r, Math.Max(g, b));
    int min = Math.Min(r, Math.Min(g, b));
    if (b > r + 35 && b >= 65 && g + 5 >= r) return true;
    if (!evening) return false;
    if (r > 155 && g > 95 && r > b + 20 && g + 5 > b && (r + g + b) > 400) return true;
    if (max - min < 36 && min > 110 && max < 225 && b + 25 >= r) return true;
    return false;
  }

  static bool IsCloud(byte[] buf, int stride, int x, int y) {
    int o = y * stride + x * 4;
    int b = buf[o];
    int g = buf[o + 1];
    int r = buf[o + 2];
    int max = Math.Max(r, Math.Max(g, b));
    int min = Math.Min(r, Math.Min(g, b));
    if (max - min < 80 && min > 70 && max < 250) return true;
    return r > 130 && g > 70 && r > b + 10 && g + 15 > b;
  }
}
"@

$root = "C:\Users\Ahmed\Desktop\Rklt\public\assets\hero\plates"
[SkyCut]::Cut("$root\day.jpg", "$root\day-fore.png", $false)
[SkyCut]::Cut("$root\evening.jpg", "$root\evening-fore.png", $true)
Get-Item "$root\day-fore.png", "$root\evening-fore.png" | Select-Object Name, Length
