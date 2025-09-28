using WorkflowEngine.Models.Steps;

namespace WorkflowEngine.Models;

public class Connection
{
    public Connection(Step source, Step target, string text = "")
    {
        Source = source;
        Target = target;
        Text = text;
    }

    public Step Source { get; }
    public Step Target { get; }
    public string Text { get; }
}