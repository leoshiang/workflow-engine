using WorkflowEngine.Models.Steps;

namespace WorkflowEngine.Models;

public class ModelValidator
{
    public List<string> Validate(Model model)
    {
        var errors = new List<string>();

        // 檢查是否有開始節點
        if (!model.Steps.Any(s => s.Type == StepTypes.START))
        {
            errors.Add("找不到開始節點");
        }

        // 檢查是否有結束節點
        if (!model.Steps.Any(s => s.Type == StepTypes.STOP))
        {
            errors.Add("找不到結束節點");
        }

        // 檢查是否有孤立的節點
        foreach (var step in model.Steps)
        {
            if (step.Type != StepTypes.START && !model.Connections.Any(c => c.Target == step))
            {
                errors.Add($"節點 {step.Label} 沒有輸入連線");
            }

            if (step.Type != StepTypes.STOP && !model.Connections.Any(c => c.Source == step))
            {
                errors.Add($"節點 {step.Label} 沒有輸出連線");
            }
        }

        return errors;
    }
}