namespace WorkflowEngine.Plugins;

public class FilePlugin : IPlugin
{
    public void Init()
    {
        // 初始化檔案插件
    }

    public string ReadText(string filePath)
    {
        try
        {
            var content = File.ReadAllText(filePath);
            Console.WriteLine($"讀取文字檔案: {filePath}");
            return content;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"讀取檔案失敗: {ex.Message}");
            return "";
        }
    }

    public async Task<string> ReadTextAsync(string filePath)
    {
        try
        {
            var content = await File.ReadAllTextAsync(filePath);
            Console.WriteLine($"讀取文字檔案: {filePath}");
            return content;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"讀取檔案失敗: {ex.Message}");
            return "";
        }
    }

    public void WriteText(string filePath, string content)
    {
        try
        {
            File.WriteAllText(filePath, content);
            Console.WriteLine($"寫入文字檔案: {filePath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"寫入檔案失敗: {ex.Message}");
        }
    }

    public async Task WriteTextAsync(string filePath, string content)
    {
        try
        {
            await File.WriteAllTextAsync(filePath, content);
            Console.WriteLine($"寫入文字檔案: {filePath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"寫入檔案失敗: {ex.Message}");
        }
    }

    public bool Exists(string path)
    {
        return File.Exists(path) || Directory.Exists(path);
    }

    public void Copy(string sourcePath, string destinationPath)
    {
        try
        {
            File.Copy(sourcePath, destinationPath, true);
            Console.WriteLine($"複製檔案: {sourcePath} -> {destinationPath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"複製檔案失敗: {ex.Message}");
        }
    }

    public void Move(string sourcePath, string destinationPath)
    {
        try
        {
            File.Move(sourcePath, destinationPath);
            Console.WriteLine($"移動檔案: {sourcePath} -> {destinationPath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"移動檔案失敗: {ex.Message}");
        }
    }

    public void Delete(string path)
    {
        try
        {
            if (File.Exists(path))
            {
                File.Delete(path);
                Console.WriteLine($"刪除檔案: {path}");
            }
            else if (Directory.Exists(path))
            {
                Directory.Delete(path, true);
                Console.WriteLine($"刪除目錄: {path}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"刪除失敗: {ex.Message}");
        }
    }

    public string[] GetFiles(string directoryPath, string searchPattern = "*")
    {
        try
        {
            return Directory.GetFiles(directoryPath, searchPattern);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"取得檔案列表失敗: {ex.Message}");
            return Array.Empty<string>();
        }
    }

    public string[] GetDirectories(string directoryPath)
    {
        try
        {
            return Directory.GetDirectories(directoryPath);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"取得目錄列表失敗: {ex.Message}");
            return Array.Empty<string>();
        }
    }
}