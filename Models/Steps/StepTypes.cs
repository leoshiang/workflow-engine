namespace WorkflowEngine.Models.Steps;

public static class StepTypes
{
    public const string START = "START";
    public const string STOP = "STOP";
    public const string PROCESS = "PROCESS";
    public const string DECISION = "DECISION";
    public const string SEND_EMAIL = "SEND_EMAIL";
    public const string CSV_READER = "CSV_READER";
    public const string GET_HTML = "GET_HTML";
    public const string PROMPT = "PROMPT";
    public const string EXEC = "EXEC";
}