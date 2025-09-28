namespace WorkflowEngine.Models.Steps;

public class PromptStep : Step
{
    public string Message { get; set; } = string.Empty;
    public string VariableName { get; set; } = string.Empty;

    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.Write($"{Message}: ");
        var input = Console.ReadLine();

        if (!string.IsNullOrEmpty(VariableName))
        {
            runner.SetVariable(VariableName, input);
        }

        await Task.CompletedTask;
        return GetNextStep();
    }
}