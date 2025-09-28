using System.Diagnostics;

namespace WorkflowEngine.Models.Steps;

public class ExecStep : Step
{
    public string Command { get; set; } = string.Empty;
    public string Arguments { get; set; } = string.Empty;
    public string VariableName { get; set; } = string.Empty;

    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine($"執行命令: {Command} {Arguments}");

        try
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = Command,
                Arguments = Arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = Process.Start(startInfo);
            if (process != null)
            {
                await process.WaitForExitAsync();
                var output = await process.StandardOutput.ReadToEndAsync();
                var error = await process.StandardError.ReadToEndAsync();

                if (!string.IsNullOrEmpty(VariableName))
                {
                    runner.SetVariable(VariableName,
                        new { Output = output, Error = error, ExitCode = process.ExitCode });
                }

                Console.WriteLine($"命令執行完成，退出代碼: {process.ExitCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"執行命令失敗: {ex.Message}");
        }

        return GetNextStep();
    }
}