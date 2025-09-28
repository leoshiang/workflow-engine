namespace WorkflowEngine.Models.Steps;

public class StopStep : Step
{
    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine("工作流程執行完成");
        await Task.CompletedTask;
        return null;
    }
}