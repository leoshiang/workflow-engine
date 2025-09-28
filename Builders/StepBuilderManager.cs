using WorkflowEngine.Models.Steps;

namespace WorkflowEngine.Builders;

public static class StepBuilderManager
{
    private static readonly Dictionary<string, Type> BuilderTypes = new();

    public static void Init()
    {
        RegisterBuilder(StepTypes.START, typeof(StartStepBuilder));
        RegisterBuilder(StepTypes.STOP, typeof(StopStepBuilder));
        RegisterBuilder(StepTypes.PROCESS, typeof(ProcessStepBuilder));
        RegisterBuilder(StepTypes.DECISION, typeof(DecisionStepBuilder));
        RegisterBuilder(StepTypes.PROMPT, typeof(PromptStepBuilder));
        RegisterBuilder(StepTypes.SEND_EMAIL, typeof(SendEmailStepBuilder));
        RegisterBuilder(StepTypes.CSV_READER, typeof(CsvReaderStepBuilder));
        RegisterBuilder(StepTypes.GET_HTML, typeof(GetHtmlStepBuilder));
        RegisterBuilder(StepTypes.EXEC, typeof(ExecStepBuilder));
    }

    public static void RegisterBuilder(string stepType, Type builderType)
    {
        BuilderTypes[stepType] = builderType;
    }

    public static StepBuilder Get(string stepType)
    {
        if (BuilderTypes.TryGetValue(stepType, out var builderType))
        {
            return (StepBuilder)(Activator.CreateInstance(builderType) ??
                                 throw new Exception($"無法建立建構器類型: {stepType}"));
        }

        throw new Exception($"未知的步驟類型: {stepType}");
    }
}

// 各種步驟建構器
public class StartStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new StartStep();
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class StopStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new StopStep();
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class ProcessStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new ProcessStep
        {
            Code = Object.Attribute("code")?.Value ?? ""
        };
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class DecisionStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new DecisionStep
        {
            Condition = Object.Attribute("condition")?.Value ?? ""
        };
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class PromptStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new PromptStep
        {
            Message = Object.Attribute("message")?.Value ?? "",
            VariableName = Object.Attribute("variable")?.Value ?? ""
        };
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class SendEmailStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new SendEmailStep
        {
            SmtpServer = Object.Attribute("smtp_server")?.Value ?? "",
            SmtpPort = int.TryParse(Object.Attribute("smtp_port")?.Value, out var port) ? port : 587,
            Username = Object.Attribute("username")?.Value ?? "",
            Password = Object.Attribute("password")?.Value ?? "",
            To = Object.Attribute("to")?.Value ?? "",
            Subject = Object.Attribute("subject")?.Value ?? "",
            Body = Object.Attribute("body")?.Value ?? ""
        };
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class CsvReaderStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new CsvReaderStep
        {
            FilePath = Object.Attribute("file_path")?.Value ?? "",
            VariableName = Object.Attribute("variable")?.Value ?? ""
        };
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class GetHtmlStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new GetHtmlStep
        {
            Url = Object.Attribute("url")?.Value ?? "",
            VariableName = Object.Attribute("variable")?.Value ?? ""
        };
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}

public class ExecStepBuilder : StepBuilder
{
    public override async Task<Step> BuildAsync()
    {
        var step = new ExecStep
        {
            Command = Object.Attribute("command")?.Value ?? "",
            Arguments = Object.Attribute("arguments")?.Value ?? "",
            VariableName = Object.Attribute("variable")?.Value ?? ""
        };
        SetCommonProperties(step);
        await Task.CompletedTask;
        return step;
    }
}