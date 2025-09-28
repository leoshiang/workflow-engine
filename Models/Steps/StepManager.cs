namespace WorkflowEngine.Models.Steps;

public static class StepManager
{
    private static readonly Dictionary<string, Type> StepTypes = new();

    public static void Init()
    {
        RegisterStep(Steps.StepTypes.START, typeof(StartStep));
        RegisterStep(Steps.StepTypes.STOP, typeof(StopStep));
        RegisterStep(Steps.StepTypes.PROCESS, typeof(ProcessStep));
        RegisterStep(Steps.StepTypes.DECISION, typeof(DecisionStep));
        RegisterStep(Steps.StepTypes.PROMPT, typeof(PromptStep));
        RegisterStep(Steps.StepTypes.SEND_EMAIL, typeof(SendEmailStep));
        RegisterStep(Steps.StepTypes.CSV_READER, typeof(CsvReaderStep));
        RegisterStep(Steps.StepTypes.GET_HTML, typeof(GetHtmlStep));
        RegisterStep(Steps.StepTypes.EXEC, typeof(ExecStep));
    }

    public static void RegisterStep(string typeName, Type stepType)
    {
        StepTypes[typeName] = stepType;
    }

    public static Step CreateStep(string typeName)
    {
        if (StepTypes.TryGetValue(typeName, out var stepType))
        {
            return (Step)(Activator.CreateInstance(stepType) ?? throw new Exception($"無法建立步驟類型: {typeName}"));
        }

        throw new Exception($"未知的步驟類型: {typeName}");
    }
}