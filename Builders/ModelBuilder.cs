using System.Xml.Linq;
using WorkflowEngine.Models;

namespace WorkflowEngine.Builders;

public class ModelBuilder
{
    private Diagram _diagram = null!;

    public async Task<Model> BuildAsync(Diagram diagram)
    {
        _diagram = diagram;
        var model = new Model();

        await CreateStepsAsync(model);
        CreateConnections(model);

        return model;
    }

    private async Task CreateStepsAsync(Model model)
    {
        var objects = FindObjectsWithType();
        foreach (var obj in objects)
        {
            await CreateStepAsync(model, obj);
        }
    }

    private async Task CreateStepAsync(Model model, XElement obj)
    {
        var type = obj.Attribute("type")?.Value ?? "";
        var builder = StepBuilderManager.Get(type);
        var step = await builder.SetDiagram(_diagram)
            .SetObject(obj)
            .BuildAsync();
        model.AddStep(step);
    }

    private void CreateConnections(Model model)
    {
        var connectedLines = GetConnectedLines();
        foreach (var line in connectedLines)
        {
            CreateConnection(model, line);
        }
    }

    private void CreateConnection(Model model, XElement line)
    {
        var sourceId = line.Attribute("source")?.Value;
        var targetId = line.Attribute("target")?.Value;

        if (string.IsNullOrEmpty(sourceId) || string.IsNullOrEmpty(targetId))
            return;

        var source = model.FindStep(sourceId);
        var target = model.FindStep(targetId);

        if (source == null)
            throw new Exception($"找不到來源步驟: {sourceId}");

        if (target == null)
            throw new Exception($"找不到目標步驟: {targetId}");

        var lineId = line.Attribute("id")?.Value;
        var textCell = _diagram.Cells.FirstOrDefault(cell =>
            cell.Attribute("parent")?.Value == lineId);

        var text = textCell?.Attribute("value")?.Value ?? "";
        model.CreateConnection(source, target, text);
    }

    private List<XElement> FindObjectsWithType()
    {
        return _diagram.Objects.Where(obj => obj.Attribute("type") != null).ToList();
    }

    private List<XElement> GetConnectedLines()
    {
        return _diagram.Cells.Where(c =>
            c.Attribute("source") != null &&
            c.Attribute("target") != null).ToList();
    }
}