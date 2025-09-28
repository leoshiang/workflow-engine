namespace WorkflowEngine.Models.Steps;

public abstract class Step
{
    private readonly List<Connection> _connections = new();

    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public Dictionary<string, string> Properties { get; set; } = new();

    public void AddConnection(Connection connection)
    {
        _connections.Add(connection);
    }

    public Step? GetNextStep(string condition = "")
    {
        if (!_connections.Any()) return null;

        if (string.IsNullOrEmpty(condition))
        {
            return _connections.First().Target;
        }

        var connection = _connections.FirstOrDefault(c =>
            string.Equals(c.Text.Trim(), condition.Trim(), StringComparison.OrdinalIgnoreCase));

        return connection?.Target;
    }

    public abstract Task<Step?> ExecuteAsync(ModelRunner runner);
}