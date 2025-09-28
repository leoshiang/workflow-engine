namespace WorkflowEngine.Models.Steps;

public class ProcessStep : Step
{
    public string Code { get; set; } = string.Empty;

    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine($"執行處理步驟: {Label}");

        if (!string.IsNullOrEmpty(Code))
        {
            await runner.ExecuteAsync(Code);
        }

        return GetNextStep();
    }
}