using System.Diagnostics;

namespace WorkflowEngine.Plugins;

public class SystemPlugin : IPlugin
{
    public void Init()
    {
        // 初始化系統插件
    }

    public void Sleep(int milliseconds)
    {
        Thread.Sleep(milliseconds);
        Console.WriteLine($"等待 {milliseconds} 毫秒");
    }

    public async Task SleepAsync(int milliseconds)
    {
        await Task.Delay(milliseconds);
        Console.WriteLine($"等待 {milliseconds} 毫秒");
    }

    public void ShowMessage(string message, string title = "訊息")
    {
        MessageBox.Show(message, title);
        Console.WriteLine($"顯示訊息: {message}");
    }

    public bool ShowConfirm(string message, string title = "確認")
    {
        var result = MessageBox.Show(message, title,
            MessageBoxButtons.YesNo);

        Console.WriteLine($"確認對話框: {message} -> {result}");
        return result == DialogResult.Yes;
    }

    public Process? StartProcess(string fileName, string arguments = "")
    {
        try
        {
            var process = Process.Start(fileName, arguments);
            Console.WriteLine($"啟動程序: {fileName} {arguments}");
            return process;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"啟動程序失敗: {ex.Message}");
            return null;
        }
    }

    public void OpenUrl(string url)
    {
        try
        {
            Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            Console.WriteLine($"開啟網址: {url}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"開啟網址失敗: {ex.Message}");
        }
    }

    public string GetEnvironmentVariable(string name)
    {
        return Environment.GetEnvironmentVariable(name) ?? "";
    }

    public void SetEnvironmentVariable(string name, string value)
    {
        Environment.SetEnvironmentVariable(name, value);
        Console.WriteLine($"設定環境變數: {name} = {value}");
    }
}