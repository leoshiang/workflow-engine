using System.Xml.Linq;
using WorkflowEngine.Models;
using WorkflowEngine.Models.Steps;

namespace WorkflowEngine.Builders;

public abstract class StepBuilder
{
    protected Diagram Diagram = null!;
    protected XElement Object = null!;

    public StepBuilder SetDiagram(Diagram diagram)
    {
        Diagram = diagram;
        return this;
    }

    public StepBuilder SetObject(XElement obj)
    {
        Object = obj;
        return this;
    }

    public abstract Task<Step> BuildAsync();

    protected void SetCommonProperties(Step step)
    {
        step.Id = Object.Attribute("id")?.Value ?? "";
        step.Type = Object.Attribute("type")?.Value ?? "";
        step.Label = Object.Attribute("label")?.Value ?? "";

        // 將所有屬性加入 Properties 字典
        foreach (var attr in Object.Attributes())
        {
            step.Properties[attr.Name.LocalName] = attr.Value;
        }
    }
}