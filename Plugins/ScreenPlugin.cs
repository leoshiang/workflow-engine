using System.Drawing.Imaging;

namespace WorkflowEngine.Plugins;

public class ScreenPlugin : IPlugin
{
    public void Init()
    {
        // 初始化螢幕插件
    }

    public void Screenshot(string filePath)
    {
        var bounds = Screen.PrimaryScreen.Bounds;
        using var bitmap = new Bitmap(bounds.Width, bounds.Height);
        using var graphics = Graphics.FromImage(bitmap);

        graphics.CopyFromScreen(bounds.X, bounds.Y, 0, 0, bounds.Size, CopyPixelOperation.SourceCopy);
        bitmap.Save(filePath, ImageFormat.Png);

        Console.WriteLine($"螢幕截圖已儲存: {filePath}");
    }

    public Size GetScreenSize()
    {
        var bounds = Screen.PrimaryScreen.Bounds;
        return new Size(bounds.Width, bounds.Height);
    }

    public Color GetPixelColor(int x, int y)
    {
        using var bitmap = new Bitmap(1, 1);
        using var graphics = Graphics.FromImage(bitmap);

        graphics.CopyFromScreen(x, y, 0, 0, new Size(1, 1), CopyPixelOperation.SourceCopy);
        return bitmap.GetPixel(0, 0);
    }

    public Point? FindImage(string templatePath, double threshold = 0.8)
    {
        // 簡化的圖像搜索實現
        // 實際應用中可能需要更複雜的圖像比對演算法
        Console.WriteLine($"搜尋圖像: {templatePath} (閾值: {threshold})");

        // 這裡返回 null 表示未找到，實際實現需要圖像比對邏輯
        return null;
    }
}