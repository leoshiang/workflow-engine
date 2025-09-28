using WorkflowEngine.Models.Steps;

namespace WorkflowEngine.Models;

public class Model
{
    private readonly List<Connection> _connections = new();
    private readonly List<Step> _steps = new();

    public List<Step> Steps => _steps;
    public List<Connection> Connections => _connections;

    public void AddStep(Step step)
    {
        _steps.Add(step);
    }

    public Step? FindStep(string id)
    {
        return _steps.FirstOrDefault(s => s.Id == id);
    }

    public Step FindEntryPoint()
    {
        var entryPoint = _steps.FirstOrDefault(s => s.Type == StepTypes.START);
        return entryPoint ?? throw new Exception("找不到開始節點");
    }

    public void CreateConnection(Step source, Step target, string text = "")
    {
        var connection = new Connection(source, target, text);
        _connections.Add(connection);
        source.AddConnection(connection);
    }

    public List<Connection> GetConnectionsFrom(Step step)
    {
        return _connections.Where(c => c.Source == step).ToList();
    }
}