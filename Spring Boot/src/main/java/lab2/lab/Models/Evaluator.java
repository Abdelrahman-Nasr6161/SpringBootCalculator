package lab2.lab.Models;

import org.springframework.stereotype.Component;

import lab2.lab.IEvaluator;
import lombok.extern.java.Log;
import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

@Log
@Component
public class Evaluator implements IEvaluator {
    public String evaluate(ExpressionRequest request)
    {
        log.info(request.toString());
    String infixExpression = request.getExpression(); // Get the expression from the request

    if (infixExpression == null || infixExpression.trim().isEmpty()) {
        return "";
    }
    try {
        Expression expression = new ExpressionBuilder(infixExpression).build();
        double result = expression.evaluate();
        String response = (result % 1 == 0) ? String.valueOf((int) result) : String.valueOf(result);
        log.info(response);
        return response;
    } catch (Exception e) {
        return "E";
    }
    }
}
