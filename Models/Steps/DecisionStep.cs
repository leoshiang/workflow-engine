namespace WorkflowEngine.Models.Steps;

public class DecisionStep : Step
{
    public string Condition { get; set; } = string.Empty;

    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine($"執行決策步驟: {Label}");

        if (string.IsNullOrEmpty(Condition))
        {
            return GetNextStep();
        }

        var result = await runner.ExecuteAsync(Condition);
        var condition = result?.ToString()?.ToLowerInvariant();

        return condition switch
        {
            "true" or "yes" or "是" => GetNextStep("是"),
            "false" or "no" or "否" => GetNextStep("否"),
            _ => GetNextStep(condition ?? "")
        };
    }
}