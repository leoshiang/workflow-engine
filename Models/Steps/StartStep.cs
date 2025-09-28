namespace WorkflowEngine.Models.Steps;

public class StartStep : Step
{
    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine("開始執行工作流程");
        await Task.CompletedTask;
        return GetNextStep();
    }
}